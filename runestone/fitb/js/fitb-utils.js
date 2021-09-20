// ********************************************************
// |docname| - grading-related utilities for FITB questions
// ********************************************************
// This code runs both on the server (for server-side grading) and on the client. It's placed here as a set of functions specifically for this purpose.


"use strict";

// Includes
// ========
// This is an edited copy of `EJS <https://ejs.co/>`_:
//
// -    It contains the improvement mentioned in `this issue <https://github.com/mde/ejs/issues/624>`_.
// -    It also contains a workaround for a `js2py v0.71 bug <https://github.com/PiotrDabkowski/Js2Py/pull/265>`_. The fix is merged, but not yet released.
//
// If both issues are merged and released, then use EJS from NPM.
import { render as ejs_render } from "./ejs/lib/ejs.js";


// Globals
// =======
// Standard options to use for EJS templates.
const EJS_OPTIONS = {
    strict: true,
    // Not needed, but might reduce confusion -- you can access the variable ``a`` as ``a`` or ``v.a``.
    localsName: "v",
    // Avoid the default delimiters of ``<`` and ``>``, which get translated to HTML entities by Sphinx.
    openDelimiter: "[",
    closeDelimiter: "]"
};


// Functions
// =========
// Update the problem's description based on dynamically-generated content.
export function renderDynamicContent(seed, dyn_vars, html_in) {
    // Initialize RNG with ``this.seed``. Taken from `SO <https://stackoverflow.com/a/47593316/16038919>`_.
    const rand = function mulberry32(a) {
        return function() {
            var t = a += 0x6D2B79F5;
            t = Math.imul(t ^ t >>> 15, t | 1);
            t ^= t + Math.imul(t ^ t >>> 7, t | 61);
            return ((t ^ t >>> 14) >>> 0) / 4294967296;
        }
    }(seed);

    // See `RAND_FUNC <RAND_FUNC>`_, which refers to ``rand`` above.
    const dyn_vars_eval = window.Function("v", "rand", `"use strict";\n${dyn_vars};\nreturn v;`)({}, RAND_FUNC);
    let html_out = "";
    try {
        html_out = ejs_render(html_in, dyn_vars_eval, EJS_OPTIONS);
    } catch (err) {
        html_out += `<pre style="color: red">${err}</pre>`;
    }

    return [html_out, dyn_vars_eval];
}

// Given student answers, grade them and provide feedback.
//
// Outputs:
//
// -    ``displayFeed`` is an array of HTML feedback.
// -    ``isCorrectArray`` is an array of true, false, or null (the question wasn't answered).
// -    ``correct`` is true, false, or null (the question wasn't answered).
// -    ``percent`` is the percentage of correct answers (from 0 to 1, not 0 to 100).
export function evaluateAnswersCore(
    // _`blankNamesDict`: An dict of {blank_name, blank_index} specifying the name for each (named) blank.
    blankNamesDict,
    // _`given_arr`: An array of strings containing student-provided answers for each blank.
    given_arr,
    // A 2-D array of strings giving feedback for each blank.
    feedbackArray,
    // _`dyn_vars_eval`: A dict produced by evaluating the JavaScript for a dynamic exercise.
    dyn_vars_eval,
    // True if this is running on the server, to work around a `js2py v0.71 bug <https://github.com/PiotrDabkowski/Js2Py/pull/266>`_ fixed in master. When a new version is released, remove this.
    is_server=false,
) {
    // Keep track if all answers are correct or not.
    let correct = true;
    let isCorrectArray = [];
    let displayFeed = [];
    for (var i = 0; i < given_arr.length; i++) {
        var given = given_arr[i];
        // If this blank is empty, provide no feedback for it.
        if (given === "") {
            isCorrectArray.push(null);
            // TODO: was $.i18n("msg_no_answer").
            displayFeed.push("No answer provided.");
            correct = false;
        } else {
            // Look through all feedback for this blank. The last element in the array always matches. If no feedback for this blank exists, use an empty list.
            var fbl = feedbackArray[i] || [];
            for (var j = 0; j < fbl.length; j++) {
                // The last item of feedback always matches.
                if (j === fbl.length - 1) {
                    displayFeed.push(fbl[j]["feedback"]);
                    break;
                }
                // If this is a dynamic solution...
                if (dyn_vars_eval) {
                    // Prepare the needed inputs for calling the grading function.
                    //
                    // Provide a dict of {blank_name, converter_answer_value}.
                    const blankValues = getBlankValues(given_arr, blankNamesDict, dyn_vars_eval);
                    // Compute an array of [blank_0_name, ...].
                    let given_arr_names = [];
                    for (const [k, v] of Object.entries(blankNamesDict)) {
                        given_arr_names[v] = k;
                    }
                    // Compute an array of [converted_blank_0_val, ...].
                    const given_arr_converted = given_arr.map((value, index) => type_convert(given_arr_names[index], value, index, dyn_vars_eval));
                    // Create a function to wrap the expression to evaluate. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/Function.
                    // Pass the answer, array of all answers, then all entries in ``this.dyn_vars_eval`` dict as function parameters.
                    let is_correct = window.Function(
                        "ans",
                        "ans_array",
                        // Not necessary, but allows access of a variable such as ``a`` using ``v.a`` (or as ``a``).
                        "v",
                        ...Object.keys(dyn_vars_eval),
                        ...Object.keys(blankValues),
                        `"use strict;"\nreturn ${fbl[j]["solution_code"]};`
                    )(
                        given_arr_converted[j],
                        given_arr_converted,
                        Object.assign({}, dyn_vars_eval, blankValues),
                        ...Object.values(dyn_vars_eval),
                        ...Object.values(blankValues)
                    );
                    if (is_correct) {
                        displayFeed.push(fbl[j]["feedback"]);
                        break;
                    }
                } else
                // If this is a regexp...
                if ("regex" in fbl[j]) {
                    var patt = RegExp(
                        fbl[j]["regex"],
                        fbl[j]["regexFlags"]
                    );
                    if (patt.test(given)) {
                        displayFeed.push(fbl[j]["feedback"]);
                        break;
                    }
                } else {
                    // This is a number.
                    console.assert("number" in fbl[j]);
                    var [min, max] = fbl[j]["number"];
                    // Convert the given string to a number. While there are `lots of ways <https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls>`_ to do this; this version supports other bases (hex/binary/octal) as well as floats.
                    var actual = +given;
                    if (actual >= min && actual <= max) {
                        displayFeed.push(fbl[j]["feedback"]);
                        break;
                    }
                }
            }

            // js2py seems to increment j in the for loop **after** encountering a break statement. Aargh. Work around this.
            if (is_server) {
                --j;
            }
            // The answer is correct if it matched the first element in the array. A special case: if only one answer is provided, count it wrong; this is a misformed problem.
            let is_correct = j === 0 && fbl.length > 1;
            isCorrectArray.push(is_correct);
            if (!is_correct) {
                correct = false;
            }
        }
    }

    const percent = isCorrectArray.filter(Boolean).length / isCorrectArray.length;
    return [displayFeed, correct, isCorrectArray, percent];
}


// Render the feedback for a dynamic problem.
export function renderDynamicFeedback(
    // See blankNamesDict_.
    blankNamesDict,
    // See given_arr_.
    given_arr,
    // The index of this blank in given_arr_.
    index,
    // The feedback for this blank, containing a template to be rendered.
    displayFeed_i,
    // See dyn_vars_eval_.
    dyn_vars_eval
) {
    // Use the answer, an array of all answers, the value of all named blanks, and all solution variables for the template.
    const blankValues = getBlankValues(given_arr, blankNamesDict, dyn_vars_eval);
    const sol_vars_plus = Object.assign({
        ans: given_arr[index],
        ans_array: given_arr
    },
        dyn_vars_eval,
        blankValues,
    );
    try {
        displayFeed_i = ejs_render(displayFeed_i, sol_vars_plus, EJS_OPTIONS);
    } catch (err) {
        displayFeed_i += `<pre style="color: red">${err}</pre>`;
    }

    return displayFeed_i;
}


// Utilities
// ---------
// For each named blank, get the value for the blank: the value of each ``blankName`` gives the index of the blank for that name.
function getBlankValues(given_arr, blankNamesDict, dyn_vars_eval) {
    let blankValues = {};
    for (let [blank_name, blank_index] of Object.entries(blankNamesDict)) {
        blankValues[blank_name] = type_convert(blank_name, given_arr[blank_index], blank_index, dyn_vars_eval);
    }
    return blankValues;
}


// Convert a value given its type.
function type_convert(name, value, index, dyn_vars_eval) {
    // The converter can be defined by index, name, or by a single value (which applies to all blanks). If not provided, just pass the data through.
    const types = dyn_vars_eval.types || pass_through;
    let converter = types[name] || types[index] || types;
    // ES5 hack: it doesn't support binary values, and js2py doesn't allow me to override the ``Number`` class. So, define the workaround class ``Number_`` and use it if available.
    console.log([converter, Number, converter === Number, typeof Number_, name, value, index, dyn_vars_eval]);
    if (converter === Number && typeof Number_ !== "undefined") {
        converter = Number_;
    }
    try {
        return converter(value);
    } catch (err) {
        console.log(`Error converting blank named "${name}" with value "${value}" at blank index ${index} using converter ${converter.name}: ${err}.`);
        return value;
    }
}


// A pass-through "converter".
function pass_through(val) {
    return val;
}
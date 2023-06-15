// ***********************************************
// |docname| -- fill-in-the-blank client-side code
// ***********************************************
// This file contains the JS for the Runestone fillintheblank component. It was created By Isaiah Mayerchak and Kirby Olson, 6/4/15 then revised by Brad Miller, 2/7/20.
//
// Data storage notes
// ==================
//
// Initial problem restore
// -----------------------
// In the constructor, this code (the client) restores the problem by calling ``checkServer``. To do so, either the server sends or local storage has:
//
// -    seed (used only for dynamic problems)
// -    answer
// -    displayFeed (server-side grading only; otherwise, this is generated locally by client code)
// -    correct (SSG)
// -    isCorrectArray (SSG)
// -    problemHtml (SSG with dynamic problems only)
//
// If any of the answers are correct, then the client shows feedback. This is implemented in restoreAnswers_.
//
// Grading
// -------
// When the user presses the "Check me" button, the logCurrentAnswer_ function:
//
// -    Saves the following to local storage:
//
//      -   seed
//      -   answer
//      -   timestamp
//      -   problemHtml
//
//      Note that there's no point in saving displayFeed, correct, or isCorrectArray, since these values applied to the previous answer, not the new answer just submitted.
//
// -    Sends the following to the server; stop after this for client-side grading:
//
//      -   seed (ignored for server-side grading)
//      -   answer
//      -   correct (ignored for SSG)
//      -   percent (ignored for SSG)
//
// -    Receives the following from the server:
//
//      -   timestamp
//      -   displayFeed
//      -   correct
//      -   isCorrectArray
//
// -    Saves the following to local storage:
//
//      -   seed
//      -   answer
//      -   timestamp
//      -   displayFeed (SSG only)
//      -   correct (SSG only)
//      -   isCorrectArray (SSG only)
//      -   problemHtml
//
// Randomize
// ---------
// When the user presses the "Randomize" button (which is only available for dynamic problems), the randomize_ function:
//
// -    For the client-side case, sets the seed to a new, random value. For the server-side case, requests a new seed and problemHtml from the server.
// -    Sets the answer to an array of empty strings.
// -    Saves the usual local data.

"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";
import {
    renderDynamicContent,
    checkAnswersCore,
    renderDynamicFeedback,
} from "./fitb-utils.js";
import "./fitb-i18n.en.js";
import "./fitb-i18n.pt-br.js";
import "../css/fitb.css";

// Object containing all instances of FITB that aren't a child of a timed assessment.
export var FITBList = {};

// FITB constructor
export default class FITB extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // entire <p> element
        this.useRunestoneServices = opts.useRunestoneServices;
        this.origElem = orig;
        this.divid = orig.id;
        this.correct = null;
        // See comments in fitb.py for the format of ``feedbackArray`` (which is identical in both files).
        //
        // Find the script tag containing JSON and parse it. See `SO <https://stackoverflow.com/questions/9320427/best-practice-for-embedding-arbitrary-json-in-the-dom>`__. If this tag doesn't exist, then no feedback is available; server-side grading will be performed.
        //
        // A destructuring assignment would be perfect, but they don't work with ``this.blah`` and ``with`` statements aren't supported in strict mode.
        const json_element = this.scriptSelector(this.origElem);
        const dict_ = JSON.parse(json_element.html());
        json_element.remove();
        this.problemHtml = dict_.problemHtml;
        this.dyn_vars = dict_.dyn_vars;
        this.blankNames = dict_.blankNames;
        this.feedbackArray = dict_.feedbackArray;

        this.createFITBElement();
        this.setupBlanks();
        this.caption = "Fill in the Blank";
        this.addCaption("runestone");

        // Define a promise which imports any libraries needed by dynamic problems.
        this.dyn_imports = {};
        let imports_promise = Promise.resolve();
        if (dict_.dyn_imports !== undefined) {
            // Collect all import promises.
            let import_promises = [];
            for (const import_ of dict_.dyn_imports) {
                switch (import_) {
                    // For imports known at webpack build, bring these in.
                    case "BTM":
                        import_promises.push(
                            import("btm-expressions/src/BTM_root.js")
                        );
                        break;
                    // Allow for local imports, usually from problems defined outside the Runestone Components.
                    default:
                        import_promises.push(
                            import(/* webpackIgnore: true */ import_)
                        );
                        break;
                }
            }

            // Combine the resulting module namespace objects when these promises resolve.
            imports_promise = Promise.all(import_promises)
                .then(
                    (module_namespace_arr) =>
                        (this.dyn_imports = Object.assign(
                            {},
                            ...module_namespace_arr
                        ))
                )
                .catch((err) => {
                    throw `Failed dynamic import: ${err}.`;
                });
        }

        // Resolve these promises.
        imports_promise.then(() => {
            this.checkServer("fillb", false).then(() => {
                // One option for a dynamic problem is to produce a static problem by providing a fixed seed value. This is typically used when the goal is to render the problem as an image for inclusion in static content (a PDF, etc.). To support this, consider the following cases:
                //
                /// Case  Has static seed?  Is a client-side, dynamic problem?  Has local seed?  Result
                /// 0     No                No                                  X                No action needed.
                /// 1     No                Yes                                 No               this.randomize().
                /// 2     No                Yes                                 Yes              No action needed -- problem already restored from local storage.
                /// 3     Yes               No                                  X                Warning: seed ignored.
                /// 4     Yes               Yes                                 No               Assign seed; this.renderDynamicContent().
                /// 5     Yes               Yes                                 Yes              If seeds differ, issue warning. No additional action needed -- problem already restored from local storage.

                const has_static_seed = dict_.static_seed !== undefined;
                const is_client_dynamic = typeof this.dyn_vars === "string";
                const has_local_seed = this.seed !== undefined;

                // Case 1
                if (!has_static_seed && is_client_dynamic && !has_local_seed) {
                    this.randomize();
                }
                // Case 3
                else if (has_static_seed && !is_client_dynamic) {
                    console.assert(
                        false,
                        "Warning: the provided static seed was ignored, because it only affects client-side, dynamic problems."
                    );
                }
                // Case 4
                else if (
                    has_static_seed &&
                    is_client_dynamic &&
                    !has_local_seed
                ) {
                    this.seed = dict_.static_seed;
                    this.renderDynamicContent();
                }
                // Case 5
                else if (
                    has_static_seed &&
                    is_client_dynamic &&
                    has_local_seed &&
                    this.seed !== dict_.static_seed
                ) {
                    console.assert(
                        false,
                        "Warning: the provided static seed was overridden by the seed found in local storage."
                    );
                }
                // Cases 0 and 2
                else {
                    // No action needed.
                }

                if (typeof Prism !== "undefined") {
                    Prism.highlightAllUnder(this.containerDiv);
                }

                this.indicate_component_ready();
            });
        });
    }

    // Find the script tag containing JSON in a given root DOM node.
    scriptSelector(root_node) {
        return $(root_node).find(`script[type="application/json"]`);
    }

    /*===========================================
    ====   Functions generating final HTML   ====
    ===========================================*/
    createFITBElement() {
        this.renderFITBInput();
        this.renderFITBButtons();
        this.renderFITBFeedbackDiv();
        // replaces the intermediate HTML for this component with the rendered HTML of this component
        $(this.origElem).replaceWith(this.containerDiv);
    }
    renderFITBInput() {
        // The text [input] elements are created by the template.
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        // Create another container which stores the problem description.
        this.descriptionDiv = document.createElement("div");
        this.containerDiv.appendChild(this.descriptionDiv);
        // Copy the original elements to the container holding what the user will see (client-side grading only).
        if (this.problemHtml) {
            this.descriptionDiv.innerHTML = this.problemHtml;
            // Save original HTML (with templates) used in dynamic problems.
            this.descriptionDiv.origInnerHTML = this.problemHtml;
        }
    }

    renderFITBButtons() {
        this.containerDiv.appendChild(document.createElement("br"));
        this.containerDiv.appendChild(document.createElement("br"));

        // "submit" button
        this.submitButton = document.createElement("button");
        this.submitButton.textContent = $.i18n("msg_fitb_check_me");
        $(this.submitButton).attr({
            class: "btn btn-success",
            name: "do answer",
            type: "button",
        });
        this.submitButton.addEventListener(
            "click",
            async function () {
                this.checkCurrentAnswer();
                await this.logCurrentAnswer();
            }.bind(this),
            false
        );
        this.containerDiv.appendChild(this.submitButton);

        // "compare me" button
        if (this.useRunestoneServices) {
            this.compareButton = document.createElement("button");
            $(this.compareButton).attr({
                class: "btn btn-default",
                id: this.origElem.id + "_bcomp",
                disabled: "",
                name: "compare",
            });
            this.compareButton.textContent = $.i18n("msg_fitb_compare_me");
            this.compareButton.addEventListener(
                "click",
                function () {
                    this.compareFITBAnswers();
                }.bind(this),
                false
            );
            this.containerDiv.appendChild(this.compareButton);
        }

        // Randomize button for dynamic problems.
        if (this.dyn_vars) {
            this.randomizeButton = document.createElement("button");
            $(this.randomizeButton).attr({
                class: "btn btn-default",
                id: this.origElem.id + "_bcomp",
                name: "randomize",
            });
            this.randomizeButton.textContent = $.i18n("msg_fitb_randomize");
            this.randomizeButton.addEventListener(
                "click",
                function () {
                    this.randomize();
                }.bind(this),
                false
            );
            this.containerDiv.appendChild(this.randomizeButton);
        }

        this.containerDiv.appendChild(document.createElement("div"));
    }
    renderFITBFeedbackDiv() {
        this.feedBackDiv = document.createElement("div");
        this.feedBackDiv.id = this.divid + "_feedback";
        this.containerDiv.appendChild(document.createElement("br"));
        this.containerDiv.appendChild(this.feedBackDiv);
    }

    clearFeedbackDiv() {
        // Setting the ``outerHTML`` removes this from the DOM. Use an alternative process -- remove the class (which makes it red/green based on grading) and content.
        this.feedBackDiv.innerHTML = "";
        this.feedBackDiv.className = "";
    }

    // Update the problem's description based on dynamically-generated content.
    renderDynamicContent() {
        // ``this.dyn_vars`` can be true; if so, don't render it, since the server does all the rendering.
        if (typeof this.dyn_vars === "string") {
            let html_nodes;
            [html_nodes, this.dyn_vars_eval] = renderDynamicContent(
                this.seed,
                this.dyn_vars,
                this.dyn_imports,
                this.descriptionDiv.origInnerHTML,
                this.divid,
                this.prepareCheckAnswers.bind(this)
            );
            this.descriptionDiv.replaceChildren(...html_nodes);

            if (typeof this.dyn_vars_eval.afterContentRender === "function") {
                try {
                    this.dyn_vars_eval.afterContentRender(this.dyn_vars_eval);
                } catch (err) {
                    console.assert(
                        false,
                        `Error in problem ${this.divid} invoking afterContentRender`
                    );
                    throw err;
                }
            }

            this.queueMathJax(this.descriptionDiv);
            this.setupBlanks();
        }
    }

    setupBlanks() {
        // Find and format the blanks. If a dynamic problem just changed the HTML, this will find the newly-created blanks.
        const ba = $(this.descriptionDiv).find(":input");
        ba.attr("class", "form form-control selectwidthauto");
        ba.attr("aria-label", "input area");
        this.blankArray = ba.toArray();
        for (let blank of this.blankArray) {
            $(blank).change(this.recordAnswered.bind(this));
        }
    }

    // This tells timed questions that the fitb blanks received some interaction.
    recordAnswered() {
        this.isAnswered = true;
    }

    /*===================================
    === Checking/loading from storage ===
    ===================================*/
    // _`restoreAnswers`: update the problem with data from the server or from local storage.
    restoreAnswers(data) {
        // Restore the seed first, since the dynamic render clears all the blanks.
        this.seed = data.seed;
        this.renderDynamicContent();

        var arr;
        // Restore answers from storage retrieval done in RunestoneBase.
        try {
            // The newer format encodes data as a JSON object.
            arr = JSON.parse(data.answer);
            // The result should be an array. If not, try comma parsing instead.
            if (!Array.isArray(arr)) {
                throw new Error();
            }
        } catch (err) {
            // The old format didn't.
            arr = (data.answer || "").split(",");
        }
        let hasAnswer = false;
        for (var i = 0; i < this.blankArray.length; i++) {
            $(this.blankArray[i]).attr("value", arr[i]);
            if (arr[i]) {
                hasAnswer = true;
            }
        }
        // Is this client-side grading, or server-side grading?
        if (this.feedbackArray) {
            // For client-side grading, re-generate feedback if there's an answer.
            if (hasAnswer) {
                this.checkCurrentAnswer();
            }
        } else {
            // For server-side grading, use the provided feedback from the server or local storage.
            this.displayFeed = data.displayFeed;
            this.correct = data.correct;
            this.isCorrectArray = data.isCorrectArray;
            // Only render if all the data is present; local storage might have old data missing some of these items.
            if (
                typeof this.displayFeed !== "undefined" &&
                typeof this.correct !== "undefined" &&
                typeof this.isCorrectArray !== "undefined"
            ) {
                this.renderFeedback();
            }
            // For server-side dynamic problems, show the rendered problem text.
            this.problemHtml = data.problemHtml;
            if (this.problemHtml) {
                this.descriptionDiv.innerHTML = this.problemHtml;
                this.queueMathJax(this.descriptionDiv);
                this.setupBlanks();
            }
        }
    }

    checkLocalStorage() {
        // Loads previous answers from local storage if they exist
        var storedData;
        if (this.graderactive) {
            return;
        }
        var len = localStorage.length;
        if (len > 0) {
            var ex = localStorage.getItem(this.localStorageKey());
            if (ex !== null) {
                try {
                    storedData = JSON.parse(ex);
                    var arr = storedData.answer;
                } catch (err) {
                    // error while parsing; likely due to bad value stored in storage
                    console.assert(false, err.message);
                    localStorage.removeItem(this.localStorageKey());
                    return;
                }
                this.restoreAnswers(storedData);
            }
        }
    }

    setLocalStorage(data) {
        let key = this.localStorageKey();
        localStorage.setItem(key, JSON.stringify(data));
    }

    checkCurrentAnswer() {
        // Start of the evaluation chain
        this.isCorrectArray = [];
        this.displayFeed = [];
        const pca = this.prepareCheckAnswers();

        if (this.useRunestoneServices) {
            if (eBookConfig.enableCompareMe) {
                this.enableCompareButton();
            }
        }

        // Grade locally if we can't ask the server to grade.
        if (this.feedbackArray) {
            [
                // An array of HTML feedback.
                this.displayFeed,
                // true, false, or null (the question wasn't answered).
                this.correct,
                // An array of true, false, or null (the question wasn't answered).
                this.isCorrectArray,
                this.percent,
            ] = checkAnswersCore(...pca);
            if (!this.isTimed) {
                this.renderFeedback();
            }
        }
    }

    // Inputs:
    //
    // - Strings entered by the student in ``this.blankArray[i].value``.
    // - Feedback in ``this.feedbackArray``.
    prepareCheckAnswers() {
        this.given_arr = [];
        for (var i = 0; i < this.blankArray.length; i++)
            this.given_arr.push(this.blankArray[i].value);
        return [
            this.blankNames,
            this.given_arr,
            this.feedbackArray,
            this.dyn_vars_eval,
        ];
    }

    // _`randomize`: This handles a click to the "Randomize" button.
    async randomize() {
        // Use the client-side case or the server-side case?
        if (this.feedbackArray) {
            // This is the client-side case.
            //
            this.seed = Math.floor(Math.random() * 2 ** 32);
            this.renderDynamicContent();
        } else {
            // This is the server-side case. Send a request to the `results <getAssessResults>` endpoint with ``new_seed`` set to True.
            const request = new Request("/assessment/results", {
                method: "POST",
                body: JSON.stringify({
                    div_id: this.divid,
                    course: eBookConfig.course,
                    event: "fillb",
                    sid: this.sid,
                    new_seed: true,
                }),
                headers: this.jsonHeaders,
            });
            const response = await fetch(request);
            if (!response.ok) {
                alert(`HTTP error getting results: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            const res = data.detail;
            this.seed = res.seed;
            this.descriptionDiv.innerHTML = res.problemHtml;
            this.queueMathJax(this.descriptionDiv);
            this.setupBlanks();
        }
        // When getting a new seed, clear all the old answers and feedback.
        this.given_arr = Array(this.blankArray.len).fill("");
        $(this.blankArray).attr("value", "");
        this.clearFeedbackDiv();
        this.saveAnswersLocallyOnly();
    }

    // Save the answers and associated data locally; don't save feedback provided by the server for this answer. It assumes that ``this.given_arr`` contains the current answers.
    saveAnswersLocallyOnly() {
        this.setLocalStorage({
            // The seed is used for client-side operation, but doesn't matter for server-side.
            seed: this.seed,
            answer: JSON.stringify(this.given_arr),
            timestamp: new Date(),
            // This is only needed for server-side grading with dynamic problems.
            problemHtml: this.descriptionDiv.innerHTML,
        });
    }

    // _`logCurrentAnswer`: Save the current state of the problem to local storage and the server; display server feedback.
    async logCurrentAnswer(sid) {
        let answer = JSON.stringify(this.given_arr);
        let feedback = true;
        // Save the answer locally.
        this.saveAnswersLocallyOnly();
        // Save the answer to the server.
        const is_dynamic = this.dyn_vars !== undefined;
        const data = {
            event: is_dynamic ? "dyn-fillb" : "fillb",
            div_id: this.divid,
            act: (is_dynamic ? this.dyn_vars_eval : answer) || "",
            seed: this.seed,
            answer: answer || "",
            correct: this.correct ? "T" : "F",
            percent: this.percent,
        };
        if (typeof sid !== "undefined") {
            data.sid = sid;
            feedback = false;
        }
        const server_data = await this.logBookEvent(data);
        if (!feedback) return;
        // Non-server side graded problems are done at this point; likewise, stop here if the server didn't respond.
        if (this.feedbackArray || !server_data) {
            return data;
        }
        // This is the server-side case. On success, update the feedback from the server's grade.
        const res = server_data.detail;
        this.timestamp = res.timestamp;
        this.displayFeed = res.displayFeed;
        this.correct = res.correct;
        this.isCorrectArray = res.isCorrectArray;
        this.setLocalStorage({
            seed: this.seed,
            answer: answer,
            timestamp: this.timestamp,
            problemHtml: this.descriptionDiv.innerHTML,
            displayFeed: this.displayFeed,
            correct: this.correct,
            isCorrectArray: this.isCorrectArray,
        });
        this.renderFeedback();
        return server_data;
    }

    /*==============================
    === Evaluation of answer and ===
    ===     display feedback     ===
    ==============================*/
    renderFeedback() {
        if (this.correct) {
            $(this.feedBackDiv).attr("class", "alert alert-info");
            for (let j = 0; j < this.blankArray.length; j++) {
                $(this.blankArray[j]).removeClass("input-validation-error");
            }
        } else {
            if (this.displayFeed === null) {
                this.displayFeed = "";
            }
            for (let j = 0; j < this.blankArray.length; j++) {
                if (this.isCorrectArray[j] !== true) {
                    $(this.blankArray[j]).addClass("input-validation-error");
                } else {
                    $(this.blankArray[j]).removeClass("input-validation-error");
                }
            }
            $(this.feedBackDiv).attr("class", "alert alert-danger");
        }
        var feedback_html = "<ul>";
        for (var i = 0; i < this.displayFeed.length; i++) {
            let df = this.displayFeed[i];
            // Render any dynamic feedback in the provided feedback, for client-side grading of dynamic problems.
            if (typeof this.dyn_vars === "string") {
                df = renderDynamicFeedback(
                    this.blankNames,
                    this.given_arr,
                    i,
                    df,
                    this.dyn_vars_eval
                );
                // Convert the returned NodeList into a string of HTML.
                df = df
                    ? df[0].parentElement.innerHTML
                    : "No feedback provided";
            }
            feedback_html += `<li>${df}</li>`;
        }
        feedback_html += "</ul>";
        // Remove the list if it's just one element.
        if (this.displayFeed.length == 1) {
            feedback_html = feedback_html.slice(
                "<ul><li>".length,
                -"</li></ul>".length
            );
        }
        this.feedBackDiv.innerHTML = feedback_html;
        this.queueMathJax(this.feedBackDiv);
    }

    /*==================================
    === Functions for compare button ===
    ==================================*/
    enableCompareButton() {
        this.compareButton.disabled = false;
    }
    // _`compareFITBAnswers`
    compareFITBAnswers() {
        var data = {};
        data.div_id = this.divid;
        data.course = eBookConfig.course;
        jQuery.get(
            `${eBookConfig.new_server_prefix}/assessment/gettop10Answers`,
            data,
            this.compareFITB
        );
    }
    compareFITB(data, status, whatever) {
        var answers = data.detail.res;
        var misc = data.detail.miscdata;
        var body = "<table>";
        body += "<tr><th>Answer</th><th>Count</th></tr>";
        for (var row in answers) {
            body +=
                "<tr><td>" +
                answers[row].answer +
                "</td><td>" +
                answers[row].count +
                " times</td></tr>";
        }
        body += "</table>";
        var html =
            "<div class='modal fade'>" +
            "    <div class='modal-dialog compare-modal'>" +
            "        <div class='modal-content'>" +
            "            <div class='modal-header'>" +
            "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
            "                <h4 class='modal-title'>Top Answers</h4>" +
            "            </div>" +
            "            <div class='modal-body'>" +
            body +
            "            </div>" +
            "        </div>" +
            "    </div>" +
            "</div>";
        var el = $(html);
        el.modal();
    }

    disableInteraction() {
        for (var i = 0; i < this.blankArray.length; i++) {
            this.blankArray[i].disabled = true;
        }
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).on("runestone:login-complete", function () {
    $("[data-component=fillintheblank]").each(function (index) {
        var opts = {
            orig: this,
            useRunestoneServices: eBookConfig.useRunestoneServices,
        };
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            try {
                FITBList[this.id] = new FITB(opts);
            } catch (err) {
                console.assert(
                    false,
                    `Error rendering Fill in the Blank Problem ${this.id}
                     Details: ${err}`
                );
            }
        }
    });
});

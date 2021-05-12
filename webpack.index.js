// ***********************************************************************************
// |docname| - A framework allowing a Runestone component to load only the JS it needs
// ***********************************************************************************
// The JavaScript required by all Runestone components is quite large and results in slow page loads. This approach enables a Runestone component to load only the JavaScript it needs, rather than loading JavaScript for all the components regardless of which are actually used.
//
// To accomplish this, webpack's split-chunks ability analyzes all JS, starting from this file. The dynamic imports below are transformed by webpack into the dynamic fetches of just the JS required by each file and all its dependencies. (If using static imports, webpack will assume that all files are already statically loaded via script tags, defeating the purpose of this framework.)
//
// However, this approach leads to complexity:
//
// -    The ``data-component`` attribute of each component must be kept in sync with the keys of the ``module_map`` below.
// -    The values in the ``module_map`` must be kept in sync with the JavaScript files which implement each of the components.

"use strict";

// Static imports
// ==============
// These imports are (we assume) needed by all pages. However, it would be much better to load these in the modules that actually use them.
//
// These are static imports; code in `dynamically loaded components`_ deals with dynamic imports.
import "./runestone/common/js/user-highlights.js";


// Dynamically loaded components
// =============================
// This provides a list of modules that components can dynamically import. Webpack will create a list of imports for each based on its analysis.
const module_map = {
    // Wrap each import in a function, so that it won't occur until the function is called. While something cleaner would be nice, webpack can't analyze things like ``import(expression)``.
    //
    // The keys must match the value of each component's ``data-component`` attribute -- the ``runestone_import`` and ``runestone_auto_import`` functions assume this.
    activecode: () => import("./runestone/activecode/js/acfactory.js"),
    ble: () => import("./runestone/cellbotics/js/ble.js"),
    // Always import the timed version of a component if available, since the timed components also define the component's factory and include the component as well. Note that ``acfactory`` imports the timed components of ActiveCode, so it follows this pattern.
    clickablearea: () => import("./runestone/clickableArea/js/timedclickable.js"),
    codelens: () => import("./runestone/codelens/js/codelens.js"),
    datafile: () => import("./runestone/datafile/js/datafile.js"),
    dragndrop: () => import("./runestone/dragndrop/js/timeddnd.js"),
    fillintheblank: () => import("./runestone/fitb/js/timedfitb.js"),
    lp_build: () => import("./runestone/lp/js/lp.js"),
    multiplechoice: () => import("./runestone/mchoice/js/timedmc.js"),
    parsons: () => import("./runestone/parsons/js/timedparsons.js"),
    poll: () => import("./runestone/poll/js/poll.js"),
    reveal: () => import("./runestone/reveal/js/reveal.js"),
    selectquestion: () => import("./runestone/selectquestion/js/selectone.js"),
    shortanswer: () => import("./runestone/shortanswer/js/timed_shortanswer.js"),
    showeval: () => import("./runestone/showeval/js/showEval.js"),
    simple_sensor: () => import("./runestone/cellbotics/js/simple_sensor.js"),
    spreadsheet: () => import("./runestone/spreadsheet/js/spreadsheet.js"),
    tabbedStuff: () => import("./runestone/tabbedStuff/js/tabbedstuff.js"),
    timedAssessment: () => import("./runestone/timed/js/timed.js"),
    // TODO: since this isn't in a ``data-component``, need to trigger an import of this code manually.
    webwork: () => import("./runestone/webwork/js/webwork.js"),
    youtube: () => import("./runestone/video/js/runestonevideo.js"),
}

// .. _dynamic import machinery:
//
// Dynamic import machinery
// ========================
// Fulfill a promise when the Runestone pre-login complete event occurs.
let pre_login_complete_promise = new Promise(resolve => $(document).bind("runestone:pre-login-complete", resolve));

// Provide a simple function to import the JS for all components on the page.
let runestone_auto_import = () => {
    // Create a set of ``data-component`` values, to avoid duplication.
    const s = new Set(
        // All Runestone components have a ``data-component`` attribute.
        $("[data-component]").map(
            // Extract the value of the data-component attribute.
            (index, element) => $(element).attr("data-component")
        // Switch from a jQuery object back to an array, passing that to the Set constructor.
        ).get()
    );

    // Load JS for each of the components found.
    const a = [...s].map(value =>
        // If there's no JS for this component, return an empty Promise.
        (module_map[value] || (() => Promise.resolve()))()
    );

    // Send the Runestone login complete event when all JS is loaded and the pre-login is also complete.
    Promise.all([pre_login_complete_promise, ...a]).then(() => $(document).trigger("runestone:login-complete"));
}

// Load component JS when the document is ready.
$(document).ready(runestone_auto_import);

// Provide a function to import one specific Runestone component.
let runestone_import = component_name => module_map[component_name]();

// Make these accessible from webpacked code, or even from code not in the webpack (hence the ``window`` assignments).
export { runestone_auto_import, runestone_import };
window.runestone_auto_import = runestone_auto_import;
window.runestone_import = runestone_import;

// Set the directory containing this script as the `path <https://webpack.js.org/guides/public-path/#on-the-fly>`_ for all webpacked scripts.
const script_src = document.currentScript.src;
__webpack_public_path__ = script_src.substring(0, script_src.lastIndexOf('/') + 1);

/**
 * Created by bmiller on 5/10/15.
 */

/*
 Since I don't want to modify the codelens code I'll attach the logging functionality this way.
 This actually seems like a better way to do it maybe across the board to separate logging
 from the real funcionality.  It would also allow a better way of turning off/on logging..
 As long as Philip doesn't go and change the id values for the buttons and slider this will
 continue to work.... In the best of all worlds we might add a function to the visualizer to
 return the buttons, but I'm having a hard time thinking of any other use for that besides mine.
 */

import RunestoneBase from "../../common/js/runestonebase.js";
import "./pytutor-embed.bundle.js";
import "./../css/pytutor.css";

function attachLoggers(codelens, divid) {
    let rb = new RunestoneBase();
    codelens.domRoot.find("#jmpFirstInstr").click(function () {
        rb.logBookEvent({ event: "codelens", act: "first", div_id: divid });
    });
    codelens.domRoot.find("#jmpLastInstr").click(function () {
        rb.logBookEvent({ event: "codelens", act: "last", div_id: divid });
    });
    codelens.domRoot.find("#jmpStepBack").click(function () {
        rb.logBookEvent({ event: "codelens", act: "back", div_id: divid });
    });
    codelens.domRoot.find("#jmpStepFwd").click(function () {
        rb.logBookEvent({ event: "codelens", act: "fwd", div_id: divid });
    });
    codelens.domRoot.find("#executionSlider").bind("slide", function (evt, ui) {
        rb.logBookEvent({ event: "codelens", act: "slide", div_id: divid });
    });
    // TODO: The component isn't quite fully initialized, but it also doesn't inherit from RunestoneBase. This is a convenient place to mark it ready for now, but it should be moved forward in time during a rewrite.
    rb.containerDiv = document.getElementById(divid);
    rb.indicate_component_ready();
}

function styleButtons(divid) {
    var myVis = $("#" + divid);
    $(myVis).find("#jmpFirstInstr").addClass("btn btn-default");
    $(myVis).find("#jmpStepBack").addClass("btn btn-danger");
    $(myVis).find("#jmpStepFwd").addClass("btn btn-success");
    $(myVis).find("#jmpLastInstr").addClass("btn btn-default");
}

if (typeof allVsualizers === "undefined") {
    window.allVisualizers = [];
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.codelens = function (opts) {
    // opts is an object that will contain a key referencing the orignal dom element
    // often it will also have a key for  useRunestoneServices
    let el = opts.orig;
    let vel = el.querySelector(".pytutorVisualizer");
    let divid = vel.id;
    let lang = JSON.parse(vel.dataset.params).lang;
    // addVisualizerToPage comes from pytutor-embed
    // allTraceData is created by a series of script tags that when loaded create this
    // as a global object containing trace information.
    try {
        let vis = addVisualizerToPage(allTraceData[divid], divid, {
            startingInstruction: 0,
            editCodeBaseURL: null,
            hideCode: false,
            lang: lang,
        });
        attachLoggers(vis, divid);
        styleButtons(divid);
        window.allVisualizers.push(vis);
    } catch (err) {
        console.log(`Error rendering CodeLens Problem ${divid}`);
        console.log(err);
    }

    window.addEventListener("codelens:answer", function (evt) {
        let rb = new RunestoneBase();
        rb.logBookEvent({
            event: "codelens",
            div_id: evt.detail.divid,
            act: `answer:${evt.detail.answer}`,
            correct: evt.detail.correct,
        });
        console.log(evt);
    });
};

// After all of the libraries are loaded...
$(document).on("runestone:login-complete", function () {
    if (typeof allTraceData !== "undefined") {
        for (let divid in allTraceData) {
            let cl = document.getElementById(divid);
            let lang = $(cl).data("params").lang;
            try {
                let vis = addVisualizerToPage(allTraceData[divid], divid, {
                    startingInstruction: 0,
                    editCodeBaseURL: null,
                    hideCode: false,
                    lang: lang,
                });
                attachLoggers(vis, divid);
                styleButtons(divid);
                window.allVisualizers.push(vis);
            } catch (err) {
                console.log(`Error rendering CodeLens Problem ${divid}`);
                console.log(err);
            }
        }
        window.addEventListener("codelens:answer", function (evt) {
            let rb = new RunestoneBase();
            rb.logBookEvent({
                event: "codelens",
                div_id: evt.detail.divid,
                act: `answer:${evt.detail.answer}`,
                correct: evt.detail.correct,
            });
            console.log(evt);
        });
    }
});

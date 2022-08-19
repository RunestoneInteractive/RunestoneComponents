/*
    Support functions for PreTeXt books running on Runestone

*/

import RunestoneBase from "./runestonebase.js";

function setupPTXEvents() {
    let rb = new RunestoneBase();
    // log an event when a knowl is opened.
    $("[data-knowl").on("click", function () {
        let div_id = $(this).data("refid");
        rb.logBookEvent({ event: "knowl", act: "click", div_id: div_id });
    });
    // log an event when a sage cell is evaluated
    $(".sagecell_evalButton").on("click", function () {
        // find parents
        let container = $(this).closest(".sagecell-sage");
        let code = $(container[0]).find(".sagecell_input")[0].textContent;
        rb.logBookEvent({ event: "sage", act: "run", div_id: container[0].id });
    });
    if (!eBookConfig.isInstructor) {
        $(".commentary").hide();
    }
}

window.addEventListener("load", function () {
    console.log("setting up pretext");
    setupPTXEvents();
    document.getElementById("primary-navbar-sticky-wrapper").style.overflow="visible"
});

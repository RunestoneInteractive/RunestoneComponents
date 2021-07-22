/*
__author__ = Ralph Morelli
__date__ = 5/4/2021  
*/

/* **********
  This script renders the khanex HTML code and sets up functions
  to process the exercise when the user clicks on the khanex 'Check Answer'
  button.  

  It gets the data it needs from the Khanex node created by khanex.py
  during the runestone build step.

  NOTE: An entry for khanex.js script must be added to the webpack.config.js.
  ************** */

"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";

var DEBUG = false;

export var khanexList = {};

export default class Khanex extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // Looks something like: {"orig":{"jQuery351095558298548049562":{"question_label":"1.1.2"}}}
        if (DEBUG) console.log("DEBUG: Khanex constructor, opts=" + JSON.stringify(opts));
        this.origElem = orig;
        this.divid = orig.id;
        this.resultsViewer = $(orig).data("results");
        this.getIFrameAndQuizname();
        this.renderKhanex(); //generates HTML
        // Checks localStorage to see if this khanex has already been completed by this user.
        //        this.checkKhanexStorage();
        this.caption = "Khanex";
        this.addCaption("runestone");
    }

    // The main content of the khanex node is the iframe. 
    getIFrameAndQuizname() {
        var html = $(this.origElem).html();
        var p1 = html.search('<iframe');
        var p2 = html.search('</iframe>');
        this.iframe = html.slice(p1, p2 + 8);
        if (DEBUG) console.log("DEBUG: getQuestionText() html = " + html);
        if (DEBUG) console.log("DEBUG: getQuestionText() iframe = " + this.iframe);
        p1 = html.search('khanex/qs/');
        p2 = html.search('.html');
        this.quizname = html.slice(p1 + 10, p2);  // Grab the quizname from iframe
        if (DEBUG) console.log("DEBUG quizname= ", this.quizname);
    }

    //generates the HTML that the user interacts with
    renderKhanex() {
        var _this = this;
        if (DEBUG) console.log("--------------------DEBUG: renderKhanex()");
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).html(this.iframe);
        $(this.origElem).replaceWith(this.containerDiv);
        if (DEBUG) console.log("DEBUG: renderKhanex(), this = " + JSON.stringify(this));
    }

    // This is what a khanex logging event looks like for a correct answer
    //  logging event {"event":"khanex","act":"answer:correct","answer":{"complete":1,"count_hints":0,"time_taken":87,"attempt_number":1,"attempt_content":"\"100011\"","sha1":"decimal-to-binary","seed":194953274,"problem_type":"0","review_mode":0},"correct":"T","div_id":"ex2","course":"mobilecsp","clientLoginStatus":false,"timezoneoffset":4}

    // Called when user clicks submit button
    // Checks for the result, sets localstorage and submits to the server
    submitKhanex(result) {
        if (DEBUG) console.log("DEBUG: submitKhanex result = " + JSON.stringify(result));
        var answer = result["complete"];
        if (DEBUG) console.log("DEBUG: submitKhanex answer = " + answer);
        var correct = (result["complete"] == 1 ? "T" : "F");
        var loganswer = "answer:" + (correct == "T" ? "correct" : "no"); // backward compatible
        var eventInfo = { event: "khanex", act: loganswer, answer: result, correct: correct, div_id: this.divid };
        // log the response to the database
        this.logBookEvent(eventInfo); // in bookfuncs.js
        if (DEBUG) console.log("DEBUG: submitkhanex logbookevent = " + JSON.stringify(eventInfo));
        // log the fact that the user has attempted this khanex exercise to local storage
        localStorage.setItem(this.divid, "true");
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    if (DEBUG) console.log("DEBUG: Khanex bind");
    $("[data-component=khanex").each(function (index) {
        if (DEBUG) console.log("DEBUG: Khanex rendering");
        try {
            var khanex = new Khanex({ orig: this });
            khanexList[this.id] = khanex;
            setupCallback(khanex, khanex.quizname);
        } catch (err) {
            console.log(`Error rendering Khanex Exercise ${this.id}
                          Details: ${err}`);
            console.log(err.stack);
        }
    });
});

// Sets up a call back function on the window containing the khanex component
// We need to pass a reference to this khanex object so that it can be use during callback.
function setupCallback(khanex, quizname) {
    if (typeof window.component_factory === "undefined") {
        window.component_factory = {};
    }
    var fn_name = "khanex_" + quizname;   // Unique function name
    window.component_factory[fn_name] = function (result) { khanex.submitKhanex(result); }
}


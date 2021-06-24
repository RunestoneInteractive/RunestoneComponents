/*
__author__ = Ralph Morelli
__date__ = 4/9/2021  */

/* **********
  This script renders the quizly HTML code and sets up functions
  to process the quiz when the user clicks on the quizly 'Check me'
  button.  

  It gets the data it needs from the Quizly node created by quizly.py
  during the runestone build step.

  NOTE: An entry for quizly.js script must be added to the webpack.config.js.
  ************** */

"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";
//import "../css/poll.css";

var DEBUG = false;

export var quizlyList = {};

export default class Quizly extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var orig = opts.orig; // Looks something like: {"orig":{"jQuery351095558298548049562":{"question_label":"1.1.2"}}}
	if (DEBUG) console.log("DEBUG: Quizly constructor, opts=" + JSON.stringify(opts));
        this.origElem = orig;
        this.divid = orig.id;
	if (DEBUG) console.log("DEBUG: Quizly constructor, divid= " + this.divid);
        this.resultsViewer = $(orig).data("results");
        this.getIFrameAndQuizname();
        this.renderQuizly(); //generates HTML
        // Checks localStorage to see if this quizly has already been completed by this user.
	//        this.checkQuizlyStorage();
        this.caption = "Quizly";
        this.addCaption("runestone");
    }

    // The main content of the quizly node is the iframe. 
    getIFrameAndQuizname() {
      var html = $(this.origElem).html();
      var p1 = html.search('<iframe');
      var p2 = html.search('</iframe>');
      this.iframe = html.slice(p1,p2+8);
      if (DEBUG) console.log("DEBUG: getIFrame() html = " + html);
      if (DEBUG) console.log("DEBUG: getIFrame() iframe = " + this.iframe);
      p1 = html.search('quizname=');
      p2 = html.search('hints');
      this.quizname = html.slice(p1+9,p2-5);  // Grab the quizname from iframe
      if (DEBUG) console.log("DEBUG quizname= ", this.quizname);
    }

    // Generates the HTML that the user interacts with
    renderQuizly() {
        var _this = this;
	if (DEBUG) console.log("DEBUG: renderQuizly()");
        this.containerDiv = document.createElement("div");
	//        this.quizlyFrame = document.createElement("iframe");
        this.containerDiv.id = this.divid;
        $(this.containerDiv).addClass(this.origElem.getAttribute("class"));
	$(this.containerDiv).html(this.iframe);
        $(this.origElem).replaceWith(this.containerDiv);
	if (DEBUG) console.log("DEBUG: renderQuizly(), this = " + JSON.stringify(this));
    }

  // Called from the exercise when user clicks submit button
  // Checks for the result, sets localstorage and submits to the server
   submitQuizly(result) {
      if (DEBUG) console.log("DEBUG: submitQuizly result = " + JSON.stringify(result));
      var answer = result["xml"];
      var correct = (result["result"] == true ? "T" : "F");
      var loganswer =  "answer:" + (correct == "T" ? "correct" : "no"); // backward compatible
      var eventInfo = { event: "quizly", act:loganswer, answer:answer, correct:correct, div_id: this.divid };
      // Log the response to the database
      this.logBookEvent(eventInfo); // in bookfuncs.js
      if (DEBUG) console.log("DEBUG: submitquizly logbookevent = " + JSON.stringify(eventInfo));
      // Log the fact that the user has attempted this quizly exercise to local storage
      localStorage.setItem(this.divid, "true");
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
 $(document).bind("runestone:login-complete", function () {
     $("[data-component=quizly").each(function (index) {
         try {
	     var quizly = new Quizly({ orig: this });
             quizlyList[this.id] = quizly;
     	     if (DEBUG) console.log("DEBUG: Quizly rendering, this.id = " + this.id);
	     setupCallback(quizly, quizly.quizname);
         } catch (err) {
             console.log(`Error rendering Quizly Exercise ${this.id}
                          Details: ${err}`);
             console.log(err.stack);
         }
     });
 });

// Sets up a unique callback function on the window containing the quizly component
// The quizly param is a reference to this quizly object so that it can be use during callback.
// The quizname param is used to construct a unique callback function name
function setupCallback(quizly, quizname) {
  if (typeof window.component_factory === "undefined") {
      window.component_factory = {};
  }
  var fn_name = "quizly_" + quizname;   // Unique function name
  window.component_factory[fn_name] = function(result) { quizly.submitQuizly(result); }
}


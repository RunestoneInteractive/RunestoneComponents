/*==========================================
=======     Master clickable.js     ========
============================================
===   This file contains the JS for the  ===
===  Runestone clickable area component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/1/15                ===
==========================================*/
function RunestoneBase () {   // Basic parent stuff

}
RunestoneBase.prototype.logBookEvent = function (info) {
    console.log("logging event " + this.divid);
};
RunestoneBase.prototype.logRunEvent = function (info) {
    console.log("running " + this.divid);
};

var CAList = {};    // Dictionary that contains all instances of ClickableArea objects


function ClickableArea (opts) {
    if (opts) {
        this.init(opts);
    }
}

ClickableArea.prototype = new RunestoneBase();

/*=============================================
== Initialize basic ClickableArea attributes ==
=============================================*/
ClickableArea.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <pre> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;

    this.correctArray = [];   // holds the IDs of all correct clickable span elements, used for eval
    this.incorrectArray = [];   // holds IDs of all incorrect clickable span elements, used for eval

    this.getQuestion();
    this.getFeedback();
    this.renderNewElements();
};

/*===========================
== Update basic attributes ==
===========================*/

ClickableArea.prototype.getQuestion = function () {
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).is("[data-question]")) {
            this.question = this.origElem.childNodes[i];
            break;
        }
    }
};

ClickableArea.prototype.getFeedback = function () {
    this.feedback = "";
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).is("[data-feedback]")) {
            this.feedback = this.origElem.childNodes[i];
        }
    }
    if (this.feedback !== "") {  // Get the feedback element out of the <pre> if the user has defined feedback
        $(this.feedback).remove();
        this.feedback = this.feedback.innerHTML;
    }
};

/*============================================
== Check local storage and replace old HTML ==
==  with our new elements that don't have   ==
==  data-correct/data-incorrect attributes  ==
============================================*/

ClickableArea.prototype.renderNewElements = function () {
    this.containerDiv = document.createElement("div");
    this.containerDiv.appendChild(this.question);
    $(this.containerDiv).addClass("alert alert-warning");

    this.newPre = document.createElement("pre");
    this.newPre.innerHTML = $(this.origElem).html();
    this.containerDiv.appendChild(this.newPre);

    this.checkLocalStorage();
    this.createButtons();
    this.createFeedbackDiv();

    $(this.origElem).replaceWith(this.containerDiv);

};

ClickableArea.prototype.checkLocalStorage = function () {
    this.hasStoredAnswers = false;
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(eBookConfig.email + ":" + this.divid + "-given");
        if (ex !== null) {
            this.hasStoredAnswers = true;
            this.clickedIndexArray = ex.split(";");
        }
    }
    this.replaceSpanElements();
};

ClickableArea.prototype.replaceSpanElements = function () {
    this.clickableArray = [];
    this.clickIndex = 0;   // Index of this.clickedIndexArray that we're checking against
    this.clickableCounter = 0;  // Index of the current clickable <span>
    for (var i = 0; i < this.newPre.childNodes.length; i++) {
        if ($(this.newPre.childNodes[i]).is("[data-correct]") || $(this.newPre.childNodes[i]).is("[data-incorrect]")) {

            var replaceSpan = document.createElement("span");   // our new <span> that doesn't have the obvious data-correct/data-incorrect attribute
            replaceSpan.innerHTML = this.newPre.childNodes[i].innerHTML;
            $(replaceSpan).addClass("clickable");

            if (this.hasStoredAnswers) {   // Check if the span we're about to append to the pre was in local storage as clicked via its index
                if (this.clickedIndexArray[this.clickIndex].toString() === this.clickableCounter.toString()) {
                    $(replaceSpan).addClass("clickable-clicked");
                    this.clickIndex++;
                    if (this.clickIndex === this.clickedIndexArray.length) {   // Stop checking this if the index array is used up
                        this.hasStoredAnswers = false;
                    }
                }
            }
            replaceSpan.onclick = function () {
                if ($(this).hasClass("clickable-clicked")) {
                    $(this).removeClass("clickable-clicked");
                } else {
                    $(this).addClass("clickable-clicked");
                }
            };

            if ($(this.newPre.childNodes[i]).is("[data-correct]")) {
                this.correctArray.push(replaceSpan);
            } else {
                this.incorrectArray.push(replaceSpan);
            }
            this.clickableArray.push(replaceSpan);
            $(this.newPre.childNodes[i]).replaceWith(replaceSpan);
            this.clickableCounter++;
        }
    }
};

ClickableArea.prototype.createButtons = function () {
    this.submitButton = document.createElement("button");    // Check me button
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer"
    });

    this.submitButton.onclick = function () {
        this.clickableEval();
    }.bind(this);

    this.containerDiv.appendChild(this.submitButton);
};

ClickableArea.prototype.createFeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.feedBackDiv);
};

/*========================================
== Evaluation and setting local storage ==
========================================*/

ClickableArea.prototype.clickableEval = function () {
    // Evaluation is done by iterating over the correct/incorrect arrays and checking by class
    this.setLocalStorage();
    this.correct = true;
    this.correctNum = 0;
    this.incorrectNum = 0;
    for (var i = 0; i < this.correctArray.length; i++) {
        if (!$(this.correctArray[i]).hasClass("clickable-clicked")) {
            this.correct = false;
        } else {
            this.correctNum++;
        }
    }
    for (var i = 0; i < this.incorrectArray.length; i++) {
        if ($(this.incorrectArray[i]).hasClass("clickable-clicked")) {
            this.correct = false;
            this.incorrectNum++;
        }
    }

    this.renderFeedback();
};

ClickableArea.prototype.setLocalStorage = function () {
    // Array of the indices of clicked span elements is passed to local storage
    this.givenIndexArray = [];
    for (var i = 0; i < this.clickableArray.length; i++) {
        if ($(this.clickableArray[i]).hasClass("clickable-clicked")) {
            this.givenIndexArray.push(i);
        }
    }
    localStorage.setItem(eBookConfig.email + ":" + this.divid + "-given", this.givenIndexArray.join(";"));
};

ClickableArea.prototype.renderFeedback = function () {

    if (this.correct) {
        $(this.feedBackDiv).html("You are Correct!");
        $(this.feedBackDiv).attr("class", "alert alert-success");

    } else {
        $(this.feedBackDiv).html("Incorrect. You clicked on " + this.correctNum + " of the " + this.correctArray.length.toString() + " correct elements and " + this.incorrectNum + " of the " + this.incorrectArray.length.toString() + " incorrect elements. " + this.feedback);

        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).ready(function () {
    $("[data-component=clickablearea]").each(function (index) {
        CAList[this.id] = new ClickableArea({"orig": this});
    });

});

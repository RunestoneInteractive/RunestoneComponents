/*==========================================
========       Master fitb.js      =========
============================================
===   This file contains the JS for the  ===
===  Runestone fillintheblank component. ===
============================================
===              Created By              ===
===           Isaiah Mayerchak           ===
===                 and                  ===
===             Kirby Olson              ===
===                6/4/15                ===
==========================================*/

var FITBList = {};    // Object containing all instances of FITB that aren't a child of a timed assessment.

// FITB constructor
function FITB (opts) {
    if (opts) {
        this.init(opts);
    }
}

FITB.prototype = new RunestoneBase();

/*===================================
===    Setting FITB variables     ===
===================================*/

FITB.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <p> element
    this.useRunestoneServices = opts.useRunestoneServices;
    this.origElem = orig;
    this.divid = orig.id;
    this.questionArray = [];
    this.correct = null;
    this.feedbackArray = [];
    /* this.feedbackArray is an array of array of arrays--each outside element is a blank. Each middle element is a different "incorrect" feedback
    that is tailored for how the question is incorrectly answered. Each inside array contains 2 elements: the regular expression, then text */
    this.children = [];   // this contains all of the child elements of the entire tag...
    this.correctAnswerArray = [];   // This array contains the regular expressions of the correct answers

    this.adoptChildren();
    this.populateCorrectAnswerArray();
    this.populateQuestionArray();

    this.casei = false;   // Case insensitive--boolean
    if ($(this.origElem).data("casei") === true) {
        this.casei = true;
    }
    this.populateFeedbackArray();
    this.createFITBElement();
    this.checkServer("fillb");
};

/*====================================
====    Functions parsing data    ====
====   out of intermediate HTML   ====
====================================*/

FITB.prototype.adoptChildren = function () {
    // populates this.children
    var children = this.origElem.childNodes;
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        if ($(this.origElem.childNodes[i]).is("[data-blank]")) {
            this.children.push(this.origElem.childNodes[i]);
        }
    }
};

FITB.prototype.populateCorrectAnswerArray = function () {
    for (var i = 0; i < this.children.length; i++) {
        for (var j=0; j < this.children[i].childNodes.length; j++) {
            if ($(this.children[i].childNodes[j]).is("[data-answer]")) {
                this.correctAnswerArray.push($([this.children[i].childNodes[j]]).text().replace(/\\\\/g,"\\"));
            }
        }
    }
};

FITB.prototype.populateQuestionArray = function () {
    for (var i = 0; i < this.children.length; i++) {
        for (var j = 0; j < this.children[i].childNodes.length; j++) {
            if ($(this.children[i].childNodes[j]).is("[data-answer]")) {
                var delimiter = this.children[i].childNodes[j].outerHTML;

                var fulltext = $(this.children[i]).html();
                var temp = fulltext.split(delimiter);
                this.questionArray.push(temp[0]);
                break;
            }
        }
    }
};

FITB.prototype.populateFeedbackArray = function () {
    for (var i = 0; i < this.children.length; i++) {
        var AnswerNodeList = [];
        var tmpContainArr = [];
        for (var j = 0; j < this.children[i].childNodes.length; j++) {
            if ($(this.children[i].childNodes[j]).is("[data-feedback=text]")) {

                AnswerNodeList.push(this.children[i].childNodes[j]);
                for (var k = 0; k < this.children[i].childNodes.length; k++) {
                    if ($(this.children[i].childNodes[k]).is("[data-feedback=regex]")) {
                        if ($(this.children[i].childNodes[j]).attr("for") === this.children[i].childNodes[k].id) {
                            var tempArr = [];
                            tempArr.push(this.children[i].childNodes[k].innerHTML.replace(/\\\\/g, "\\"));
                            tempArr.push(this.children[i].childNodes[j].innerHTML);
                            tmpContainArr.push(tempArr);
                            break;
                        }
                    }
                }
            }
        }
        this.feedbackArray.push(tmpContainArr);
    }
};

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

FITB.prototype.createFITBElement = function () {
    this.renderFITBInput();
    this.renderFITBButtons();
    this.renderFITBFeedbackDiv();

    // replaces the intermediate HTML for this component with the rendered HTML of this component
    $(this.origElem).replaceWith(this.containerDiv);
};


FITB.prototype.renderFITBInput = function () {
    // creates the blank and appends it to the parent div
    this.containerDiv = document.createElement("div");
    $(this.containerDiv).addClass("alert alert-warning");
    this.containerDiv.id = this.divid;

    this.blankArray = [];
    for (var i = 0; i < this.children.length; i++) {
        var question = document.createElement("span");
        question.innerHTML = this.questionArray[i];
        this.containerDiv.appendChild(question);

        var blank = document.createElement("input");
        $(blank).attr({
            "type": "text",
            "id": this.divid + "_blank" + i,
            "class": "form form-control selectwidthauto"
        });
        this.containerDiv.appendChild(blank);
        this.blankArray.push(blank);
    }

};

FITB.prototype.renderFITBButtons = function () {
    // "submit" button and "compare me" button
    this.submitButton = document.createElement("button");
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer"
    });
    this.submitButton.addEventListener("click", function () {
        this.startEvaluation(true);
    }.bind(this), false);
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.submitButton);
    if (this.useRunestoneServices) {
        this.compareButton = document.createElement("button");
        $(this.compareButton).attr({
            "class": "btn btn-default",
            "id": this.origElem.id + "_bcomp",
            "disabled": "",
            "name": "compare"
        });
        this.compareButton.textContent = "Compare Me";
        this.compareButton.addEventListener("click", function () {
            this.compareFITBAnswers();
        }.bind(this), false);
        this.containerDiv.appendChild(this.compareButton);
    }

    this.containerDiv.appendChild(document.createElement("div"));
};

FITB.prototype.renderFITBFeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.feedBackDiv.id = this.divid + "_feedback";
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.feedBackDiv);
};

/*===================================
=== Checking/loading from storage ===
===================================*/

FITB.prototype.restoreAnswers = function (data) {
    // Restore answers from storage retrieval done in RunestoneBase
    var arr = data.answer.split(",");
    for (var i = 0; i < this.blankArray.length; i++) {
        $(this.blankArray[i]).attr("value", arr[i]);
    }
};

FITB.prototype.checkLocalStorage = function () {
    // Loads previous answers from local storage if they exist
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(eBookConfig.email + ":" + this.divid + "-given");
        if (ex !== null) {
            var storedData = JSON.parse(ex);
            var arr = storedData.answer;
            for (var i = 0; i < this.blankArray.length; i++) {
                $(this.blankArray[i]).attr("value", arr[i]);
            }
            if (this.useRunestoneServices) {
                var answer = storedData.answer.join(",")
                this.logBookEvent({"event": "fillb", "act": answer, "answer": answer, "correct": storedData.correct, "div_id": this.divid});
                this.enableCompareButton();
            }
        }
    }
};

FITB.prototype.setLocalStorage = function (data) {
    // logs answer to local storage
    this.given_arr = [];
    for (var i = 0; i < this.blankArray.length; i++)
        this.given_arr.push(this.blankArray[i].value);

    var now = new Date();
    var correct = data.correct;
    var storageObject = {"answer": this.given_arr, "correct": correct, "timestamp": now};
    localStorage.setItem(eBookConfig.email + ":" + this.divid + "-given", JSON.stringify(storageObject));
};

/*==============================
=== Evaluation of answer and ===
===     display feedback     ===
==============================*/

FITB.prototype.startEvaluation = function (logFlag) {
    // Start of the evaulation chain
    this.isCorrectArray = [];
    this.displayFeed = [];
    this.evaluateAnswers();
    this.renderFITBFeedback();
    if (logFlag) {   // Sometimes we don't want to log the answer--for example, when timed exam questions are re-loaded
        var answer = this.given_arr.join(",");
        this.logBookEvent({"event": "fillb", "act": answer, "answer":answer, "correct": (this.correct ? "T" : "F"), "div_id": this.divid});
    }
    if (this.useRunestoneServices) {
        this.enableCompareButton();
    }
};

FITB.prototype.evaluateAnswers = function () {
    for (var i = 0; i < this.children.length; i++) {
        var given = this.blankArray[i].value;
        var modifiers = "";
        if (this.casei) {
            modifiers = "i";
        }

        var patt = RegExp(this.correctAnswerArray[i], modifiers);
        if (given !== "") {
            this.isCorrectArray.push(patt.test(given));
        } else {
            this.isCorrectArray.push("");
        }

        if (!this.isCorrectArray[i]) {
            this.populateDisplayFeed(i, given);
        }
    }
    if ($.inArray("", this.isCorrectArray) < 0 && $.inArray(false, this.isCorrectArray) < 0) {
        this.correct = true;
    } else if (this.isCompletelyBlank()) {
        this.correct = null;
    } else {
        this.correct = false;
    }
    this.setLocalStorage({"correct": (this.correct ? "T" : "F")});
};

FITB.prototype.isCompletelyBlank = function () {
    // Returns true if the user didn't fill in any of the blanks, else false
    for (var i = 0; i < this.isCorrectArray.length; i++) {
        if (this.isCorrectArray[i] !== "") {
            return false;
        }
    }
    return true;
};

FITB.prototype.populateDisplayFeed = function (index, given) {
    var fbl = this.feedbackArray[index];
    for (var j = 0; j < fbl.length; j++) {
        for (var k = 0; k < fbl[j].length; k++) {
            var patt = RegExp(fbl[j][k]);
            if (patt.test(given)) {
                this.displayFeed.push(fbl[j][1]);
                return 0;
            }
        }
    }
};

FITB.prototype.renderFITBFeedback = function () {
    if (this.correct) {
        $(this.feedBackDiv).html("You are Correct!");
        $(this.feedBackDiv).attr("class", "alert alert-success");
        for (var j = 0; j < this.blankArray.length; j++) {
            $(this.blankArray[j]).removeClass("input-validation-error");
        }
    } else {
        if (this.displayFeed === null) {
            this.displayFeed = "";
        }
        $(this.feedBackDiv).html("Incorrect.    ");
        for (var j = 0; j < this.blankArray.length; j++) {
            if (!this.isCorrectArray[j]) {
                $(this.blankArray[j]).addClass("input-validation-error");
            } else {
                $(this.blankArray[j]).removeClass("input-validation-error");
            }
        }
        for (var i = 0; i < this.displayFeed.length; i++) {
            this.feedBackDiv.innerHTML += this.displayFeed[i];
            this.feedBackDiv.appendChild(document.createElement("br"));
        }
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

/*==================================
=== Functions for compare button ===
==================================*/

FITB.prototype.enableCompareButton = function () {
    this.compareButton.disabled = false;
};

FITB.prototype.compareFITBAnswers = function () {
    var data = {};
    data.div_id = this.divid;
    data.course = eBookConfig.course;
    jQuery.get(eBookConfig.ajaxURL + "gettop10Answers", data, this.compareFITB);
};

FITB.prototype.compareFITB = function (data, status, whatever) {   // Creates a modal dialog
    var answers = eval(data)[0];
    var misc = eval(data)[1];

    var body = "<table>";
    body += "<tr><th>Answer</th><th>Count</th></tr>";

    for (var row in answers) {
        body += "<tr><td>" + answers[row].answer + "</td><td>" + answers[row].count + " times</td></tr>";
    }
    body += "</table>";
    if (misc["yourpct"] !== "unavailable") {
        body += "<br /><p>You have " + misc["yourpct"] + "% correct for all questions</p>";
    }

    var html = "<div class='modal fade'>" +
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
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=fillintheblank]").each(function (index) {
        var opts = {"orig" : this, "useRunestoneServices": eBookConfig.useRunestoneServices};
        if ($(this.parentNode).data("component") !== "timedAssessment") { // If this element exists within a timed component, don't render it here
            FITBList[this.id] = new FITB(opts);
        }
    });
});

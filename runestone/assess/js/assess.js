/*==========================================
========      Master Assess.js     =========
============================================
===     This file contains the JS for    ===
=== the Runestone assessment components. ===
============================================
===              Created By              ===
===           Isaiah Mayerchak           ===
===                 and                  ===
===             Kirby Olson              ===
===                6/4/15                ===
==========================================*/

// start with basic parent stuff

function RunestoneBase () {    // Parent function

}

RunestoneBase.prototype.logBookEvent = function (info) {
    console.log("logging event " + this.divid);
};

RunestoneBase.prototype.logRunEvent = function (info) {
    console.log("running " + this.divid);
};

/*=======================================
===         Global functions          ===
=== (used by more than one component) ===
=======================================*/

var feedBack = function (elem, correct, feedbackText) {        // Displays feedback on page--miscellaneous function that can be used by multple objects
    // elem is the Element in which to put the feedback
    if (correct) {
        $(elem).html("You are Correct!");
        $(elem).attr("class", "alert alert-success");
    } else {
        if (feedbackText === null) {
            feedbackText = "";
        }
        $(elem).html("Incorrect.    " + feedbackText);
        $(elem).attr("class", "alert alert-danger");
    }
};

var renderTimedIcon = function (component) {
    // renders the clock icon on timed components.    The component parameter
    // is the element that the icon should be appended to.
    var timeIconDiv = document.createElement("div");
    var timeIcon = document.createElement("img");
    $(timeIcon).attr({
        "src": "../_static/clock.png",
        "style": "width:15px;height:15px"
    });
    timeIconDiv.className = "timeTip";
    timeIconDiv.title = "";
    timeIconDiv.appendChild(timeIcon);
    component.appendChild(timeIconDiv);
};
/*==================================================
== Begin code for the Fill In The Blank component ==
==================================================*/

var FITBList = {};    // Object containing all instances of FITB that aren't a child of a timed assessment.

// FITB constructor
function FITB (opts) {
    if (opts) {
        this.init(opts);
    }
}
/*===================================
===    Setting FITB variables     ===
===================================*/
FITB.prototype = new RunestoneBase();

FITB.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <p> element
    this.origElem = orig;
    this.divid = orig.id;
    this.questionArray = [];
    this.correct = null;
    this.feedbackArray = [];
    /* this.feedbackArray is an array of array of arrays--each outside element is a blank. Each middle element is a different "incorrect" feedback
    that is tailored for how the question is incorrectly answered. Each inside array contains 2 elements: the regular expression, then text */
    this.children = [];   // this contains all of the child elements of the entire tag...
    this.correctAnswerArray = [];   // This array contains the regular expressions of the correct answers

    this.adoptChildren();   // Populates this.children
    this.populateCorrectAnswerArray();
    this.populateQuestionArray();

    this.casei = false;   // Case insensitive--boolean
    if ($(this.origElem).data("casei") === true) {
        this.casei = true;
    }
    this.timed = false;    // True if this is a child of a timed assessment component
    if ($(this.origElem).is("[data-timed]")) {
        this.timed = true;
    }
    this.populateFeedbackArray();
    this.createFITBElement();
    this.checkPreviousFIB();
};

/*====================================
==== Functions parsing variables  ====
====   out of intermediate HTML   ====
====================================*/
FITB.prototype.adoptChildren = function () {
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
        var firstAnswerId = null;
        for (var j = 0; j < this.children[i].childNodes.length; j++) {
            if ($(this.children[i].childNodes[j]).is("[data-answer]")) {
                firstAnswerId = this.children[i].childNodes[j].id;

                var delimiter = document.getElementById(firstAnswerId).outerHTML;
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
            }
        }

        for (var j = 0; j < AnswerNodeList.length; j++) {
            var tempArr = [];
            var tempFor = $(AnswerNodeList[j]).attr("for");
            var tempRegEx = document.getElementById(tempFor).innerHTML.replace(/\\\\/g,"\\");
            tempArr.push(tempRegEx);
            tempArr.push(AnswerNodeList[j].innerHTML);
            tmpContainArr.push(tempArr);
        }
        this.feedbackArray.push(tmpContainArr);

    }
};

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

FITB.prototype.createFITBElement = function () {
    this.renderFITBInput();
    if (!this.timed) {
        // don't render buttons if part of a timed assessment
        this.renderFITBButtons();
    }
    this.renderFITBFeedbackDiv();

    // replaces the intermediate HTML for this component with the rendered HTML of this component
    $(this.origElem).replaceWith(this.inputDiv);
};


FITB.prototype.renderFITBInput = function () {
    // creates the blank and appends it to the parent div
    this.inputDiv = document.createElement("div");
    $(this.inputDiv).addClass("alert alert-warning");
    this.inputDiv.id = this.divid;
    if (this.timed) {
        renderTimedIcon(this.inputDiv);
    }

    this.blankArray = [];
    for (var i = 0; i < this.children.length; i++) {
        var question = document.createElement("span");
        question.innerHTML = this.questionArray[i];
        this.inputDiv.appendChild(question);

        var blank = document.createElement("input");
        $(blank).attr({
            "type": "text",
            "id": this.divid + "_blank" + i,
            "class": "form form-control selectwidthauto"
        });
        this.inputDiv.appendChild(blank);
        this.blankArray.push(blank);
    }

};

FITB.prototype.renderFITBButtons = function () {
    var _this = this;
    this.submitButton = document.createElement("button");    // Check me button
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer"
    });
    this.submitButton.onclick = function () {
        _this.checkFITBStorage();
    };
    this.compareButton = document.createElement("button");    // Compare me button
    $(this.compareButton).attr({
        "class": "btn btn-default",
        "id": this.origElem.id + "_bcomp",
        "disabled": "",
        "name": "compare"
    });
    this.compareButton.textContent = "Compare Me";
    this.compareButton.onclick = function () {
        _this.compareFITBAnswers();
    };
    this.inputDiv.appendChild(document.createElement("br"));
    this.inputDiv.appendChild(document.createElement("br"));
    this.inputDiv.appendChild(this.submitButton);
    this.inputDiv.appendChild(this.compareButton);
    this.inputDiv.appendChild(document.createElement("div"));
};

FITB.prototype.renderFITBFeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.feedBackDiv.id = this.divid + "_feedback";
    this.inputDiv.appendChild(document.createElement("br"));
    this.inputDiv.appendChild(this.feedBackDiv);
};

/*==============================
=== Local storage & feedback ===
===============================*/

FITB.prototype.checkPreviousFIB = function () {
    // This function repoplulates FIB questions with a user"s previous answers,
    // which were stored into local storage
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(eBookConfig.email + ":" + this.divid + "-given");
        if (ex !== null) {
            var arr = ex.split(";");
            for (var i = 0; i < this.blankArray.length; i++) {
                $(this.blankArray[i]).attr("value", arr[i]);
                if (!this.timed) {
                    this.compareButton.disabled = false;
                }
            }

        } // end if ex not null
    } // end if len > 0
};

FITB.prototype.checkFITBStorage = function () {
    this.isCorrectArray = [];
    this.displayFeed = [];
    // Starts chain of functions which ends with feedBack() displaying feedback to user
    this.evaluateAnswers();
    this.renderFITBFeedback();
    var answerInfo = "answer:" + this.given_arr + ":" + (this.isCorrect ? "correct" : "no");
    logBookEvent({"event": "fillb", "act": answerInfo, "div_id": this.divid});
    if (!this.timed) {
        this.compareButton.disabled = false;
    }
};

FITB.prototype.evaluateAnswers = function () {
    this.given_arr = [];
    for (var i = 0; i < this.children.length; i++) {
        var given = this.blankArray[i].value;
		console.log(given)
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
        // store the answer in local storage
        this.given_arr.push(given);
    }
    if ($.inArray("", this.isCorrectArray) < 0 && $.inArray(false, this.isCorrectArray) < 0) {
        this.correct = true;
    } else if ($.inArray(false, this.isCorrectArray) >= 0 && $.inArray("", this.isCorrectArray) < 0) {
        this.correct = false;
    }
    localStorage.setItem(eBookConfig.email + ":" + this.divid + "-given", this.given_arr.join(";"));
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

FITB.prototype.compareFITBAnswers = function () {             // Called by compare me button--calls compareFITB
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

FITB.prototype.checkCorrectTimedFITB = function () {
    // Returns if the question was correct.    Used for timed assessment grading.
    return this.correct;
};


/*=======================================
=========================================
==== Begin Multiple Choice Component ====
=========================================
=======================================*/

var mcList = {};    // Multiple Choice dictionary

// constructor
function MultipleChoice (opts) {
    if (opts) {
        this.init(opts);
    }
}
MultipleChoice.prototype = new RunestoneBase();

/*===================================
===     Setting MC variables      ===
===================================*/

MultipleChoice.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <ul> element
    this.origElem = orig;

    this.multipleanswers = false;
    this.divid = orig.id;
    if ($(this.origElem).data("multipleanswers") === true) {
        this.multipleanswers = true;
    }

    this.children = this.origElem.childNodes;

    this.random = false;
    if ($(this.origElem).is("[data-random]")) {
        this.random = true;
    }
    this.timed = false;
    if ($(this.origElem).is("[data-timed]")) {
        this.timed = true;
    }

    this.correct = null; // used to inform timed instances if this question was answered correctly

    this.answerList = [];
    this.correctList = [];
    this.correctIndexList = [];
    this.feedbackList = [];
    this.question = null;

    this.findAnswers();
    this.findQuestion();
    this.findFeedbacks();
    this.createCorrectList();
    this.createMCForm();
    this.restoreLocalAnswers();
};

/*====================================
==== Functions parsing variables  ====
====  out of intermediate HTML    ====
====================================*/

MultipleChoice.prototype.findQuestion = function () {         // Takes full text
    var firstanswerid = this.answerList[0].id;
    var delimiter = document.getElementById(firstanswerid).outerHTML;
    var fulltext = $(this.origElem).html();
    var temp = fulltext.split(delimiter);
    this.question = temp[0];
};

MultipleChoice.prototype.findAnswers = function () {
    // Creates answer objects and pushes them to answerList
    // format: ID, Correct bool, Content (text)

    var _this = this;
    var ChildAnswerList = [];
    for (var i = 0; i < _this.children.length; i++) {
        if ($(_this.children[i]).is("[data-component=answer]")) {
            ChildAnswerList.push(_this.children[i]);
        }
    }
    for (var j = 0; j < ChildAnswerList.length; j++) {
        var answer_id = $(ChildAnswerList[j]).attr("id");
        var is_correct = false;
        if ($(ChildAnswerList[j]).is("[data-correct]")) {    // If data-correct attribute exists, answer is correct
            is_correct = true;
        }
        var answer_text = $(ChildAnswerList[j]).text();
        var answer_object = {id: answer_id, correct: is_correct, content: answer_text};
        _this.answerList.push(answer_object);
    }
};

MultipleChoice.prototype.findFeedbacks = function () {
    var _this = this;
    for (var i = 0; i < this.children.length; i++) {
        if ($(_this.children[i]).is("[data-component=feedback]")) {
            _this.feedbackList.push(_this.children[i].innerHTML);
        }
    }
};

MultipleChoice.prototype.createCorrectList = function () {
    // Creates array that holds the ID"s of correct answers
    // Also populates an array that holds the indeces of correct answers
    for (var i = 0; i < this.answerList.length; i++) {
        if (this.answerList[i].correct) {
            this.correctList.push(this.answerList[i].id);
            this.correctIndexList.push(i);
        }
    }
};

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

MultipleChoice.prototype.createMCForm = function () {
    this.renderMCContainer();
    if (this.timed) {
        renderTimedIcon(this.MCContainer);
    }
    this.renderMCForm();    // renders the form with options and buttons
    this.renderMCfeedbackDiv();

    // replaces intermediate HTML with rendered HTML
    $(this.origElem).replaceWith(this.MCContainer);
};

MultipleChoice.prototype.renderMCContainer = function () {
    this.MCContainer = document.createElement("div");
    $(this.MCContainer).text(this.question);
    $(this.MCContainer).addClass("alert alert-warning");
    this.MCContainer.id = this.divid;
};

MultipleChoice.prototype.renderMCForm = function () {
    this.optsForm = document.createElement("form");
    this.optsForm.id = this.divid + "_form";
    $(this.optsForm).attr({
        "method": "get",
        "action": "",
        "onsubmit": "return false;"
    });

    // generate form options
    this.renderMCFormOpts();

    // If timed, don"t render buttons
    if (!this.timed) {
        this.renderMCFormButtons();
    }

    // Append the form to the container
    this.MCContainer.appendChild(this.optsForm);
};

MultipleChoice.prototype.renderMCFormOpts = function () {
    this.optionArray = []; // array with an object for each option containing the input and label for that option
    var input_type = "radio";
    if (this.multipleanswers) {
        input_type = "checkbox";
    }
    // this.indexArray is used to index through the answers
    // it is just 0-n normally, but the order is shuffled if the random option is present
    this.indexArray = [];
    for (var i = 0; i < this.answerList.length; i++) {
        this.indexArray.push(i);
    }

    if (this.random) {
        this.randomizeAnswers();
    }

    for (var j = 0; j < this.answerList.length; j++) {
        var k = this.indexArray[j];
        var optid = this.divid + "_opt_" + k;

        // Create the input
        var input = document.createElement("input");
        input.type = input_type;
        input.name = "group1";
        input.value = String(k);
        input.id = optid;

        // Create the label for the input
        var label = document.createElement("label");
        $(label).attr("for", optid);
        $(label).text(this.answerList[k].content);

        // create the object to store in optionArray
        var optObj = {
            input: input,
            label: label
        };
        this.optionArray.push(optObj);

        // add the option to the form
        this.optsForm.appendChild(input);
        this.optsForm.appendChild(label);
        this.optsForm.appendChild(document.createElement("br"));

        // if timed, add a feedback Div for the option
        if (this.timed) {
            var feedBackEach = document.createElement("div");
            feedBackEach.id = this.divid + "_eachFeedback_" + k;
            feedBackEach.classList.add("eachFeedback");
            this.optsForm.appendChild(feedBackEach);
        }
    }
};

MultipleChoice.prototype.renderMCFormButtons = function () {
    var _this = this;    // used for defining onclick functions because of the different scope

    // Create submit button
    this.submitButton = document.createElement("button");
    this.submitButton.textContent = "Check Me";
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer"
    });
    if (this.multipleanswers) {
        this.submitButton.onclick = function () {
            _this.processMCMASubmission();
        };
    } else {
        this.submitButton.onclick = function () {
            _this.processMCMFSubmission();
        };
    } // end else
    this.optsForm.appendChild(this.submitButton);

    // Create compare button
    this.compareButton = document.createElement("button");
    $(this.compareButton).attr({
        "class": "btn btn-default",
        "id": this.divid + "_bcomp",
        "disabled": "",
        "name": "compare"
    });
    this.compareButton.textContent = "Compare me";
    this.compareButton.onclick = function () {
        _this.compareAnswers(_this.divid);
    };
    this.optsForm.appendChild(this.compareButton);
};

MultipleChoice.prototype.renderMCfeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.feedBackDiv.id = this.divid + "_feedback";
    this.MCContainer.appendChild(document.createElement("br"));
    this.MCContainer.appendChild(this.feedBackDiv);
};

MultipleChoice.prototype.randomizeAnswers = function () {
    var currentIndex = this.indexArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = this.indexArray[currentIndex];
        this.indexArray[currentIndex] = this.indexArray[randomIndex];
        this.indexArray[randomIndex] = temporaryValue;

        var temporaryFeedback = this.feedbackList[currentIndex];
        this.feedbackList[currentIndex] = this.feedbackList[randomIndex];
        this.feedbackList[randomIndex] = temporaryFeedback;
    }
};

/*====================================
=== Repopulation from localstorage ===
====================================*/

MultipleChoice.prototype.restoreLocalAnswers = function () {         // Handles local storage
    if (this.multipleanswers) {
        this.restoreMultipleSelect();
    } else {
        this.restoreRadio();
    }
};

MultipleChoice.prototype.restoreMultipleSelect = function () {
    // This function repopulates MCMA questions with a user"s previous answers,
    // which were stored into local storage.
    var _this = this;
    var len = localStorage.length;
    if (len > 0) {

        var ex = localStorage.getItem(eBookConfig.email + ":" + _this.divid);
        if (ex !== null) {
            var arr = ex.split(";");
            var answers = arr[0].split(",");
            for (var a = 0; a < answers.length; a++) {
                var index = answers[a];
                for (var b = 0; b < this.optionArray.length; b++) {
                    if (this.optionArray[b].input.value == index) {
                        $(this.optionArray[b].input).attr("checked", "true");
                    }
                }
                if (!_this.timed) {
                    this.compareButton.disabled = false;
                }
            } // end for
        } // end if
    } // end if len > 0
};

MultipleChoice.prototype.restoreRadio = function () {
    // This function repopulates a MCMF question with a user"s previous answer,
    // which was previously stored into local storage
    var _this = this;
    var len = localStorage.length;

    // retrieving data from local storage
    if (len > 0) {
        var ex = localStorage.getItem(eBookConfig.email + ":" + _this.divid);
        if (ex !== null) {
            var arr = ex.split(";");
            var index = arr[0];
            for (var b = 0; b < this.optionArray.length; b++) {
                if (this.optionArray[b].input.value == index) {
                    $(this.optionArray[b].input).attr("checked", "true");
                }
            }
            if (!_this.timed) {
                this.compareButton.disabled = false;
            }
        } // end if not null
    } // end if (len > 0)
};

/*===============================
=== Processing MC Submissions ===
===============================*/

MultipleChoice.prototype.processMCMASubmission = function () {
    // Called when the submit button is clicked
    this.getSubmittedOpts();
    this.scoreMCMASubmission();
    this.populateMCMALocalStorage();
    this.logMCMAsubmission();
    this.provideMCMAFeedback();
    this.enableMCcomparison();
};

MultipleChoice.prototype.getSubmittedOpts = function () {
    var given;
    this.singlefeedback = ""; // Used for MCMF questions
    this.feedbackString = ""; // Used for MCMA questions
    this.givenArray = [];
    this.givenlog = "";
    var buttonObjs = this.optsForm.elements.group1;
    for (var i = 0; i < buttonObjs.length; i++) {
        if (buttonObjs[i].checked) {
            given = buttonObjs[i].value;
            this.givenArray.push(given);
            this.feedbackString += given + ": " + this.feedbackList[i] + "<br />";
            this.givenlog += given + ",";
            this.singlefeedback = this.feedbackList[i];
        }
    }
    this.givenArray.sort();
};

MultipleChoice.prototype.scoreMCMASubmission = function () {
    this.correctCount = 0;
    var correctIndex = 0;
    var givenIndex = 0;
    while (correctIndex < this.correctIndexList.length && givenIndex < this.givenArray.length) {
        if (this.givenArray[givenIndex] < this.correctIndexList[correctIndex]) {
            givenIndex++;
        } else if (this.givenArray[givenIndex] == this.correctIndexList[correctIndex]) {
            this.correctCount++;
            givenIndex++;
            correctIndex++;
        } else {
            correctIndex++;
        }
    }
};

MultipleChoice.prototype.populateMCMALocalStorage = function () {
    var storage_arr = [];
    storage_arr.push(this.givenArray);
    storage_arr.push(this.correctIndexList);
    localStorage.setItem(eBookConfig.email + ":" + this.divid, storage_arr.join(";"));
};

MultipleChoice.prototype.logMCMAsubmission = function () {
    var answerInfo = "answer:" + this.givenlog.substring(0, this.givenlog.length - 1) + ":" + (this.correctCount == this.correctList.length ? "correct" : "no");
    logBookEvent({"event": "mChoice", "act": answerInfo, "div_id": this.divid});
};

MultipleChoice.prototype.provideMCMAFeedback = function () {
    if (!this.timed) {
        this.renderMCMAFeedBack();
    } else {
        this.feedBackTimedMC();
    }
};

MultipleChoice.prototype.renderMCMAFeedBack = function () {
    var answerStr = "answers";
    var numGiven = this.givenArray.length;
    if (numGiven === 1) {
        answerStr = "answer";
    }
    var numCorrect = this.correctCount;
    var numNeeded = this.correctList.length;
    var feedbackText = this.feedbackString;

    if (numCorrect === numNeeded && numNeeded === numGiven) {
        $(this.feedBackDiv).html("Correct!    <br />" + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-success");
    } else {
        $(this.feedBackDiv).html("Incorrect.    " + "You gave " + numGiven +
            " " + answerStr + " and got " + numCorrect + " correct of " +
            numNeeded + " needed.<br /> " + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

MultipleChoice.prototype.processMCMFSubmission = function () {
    // Called when the submit button is clicked
    this.getSubmittedOpts();
    this.populateMCMFLocalStorage();
    this.scoreMCMFSubmission();
    this.logMCMFsubmission();
    this.provideMCMFFeedback();
    this.enableMCcomparison();
};

MultipleChoice.prototype.scoreMCMFSubmission = function () {
    if (this.givenArray[0] == this.correctIndexList[0]) {
        this.correct = true;
    } else if (this.givenArray[0] != null) { // if given is null then the question wasn"t answered and should be counted as skipped
        this.correct = false;
    }
};

MultipleChoice.prototype.populateMCMFLocalStorage = function () {
    var storage_arr = [];
    storage_arr.push(this.givenArray[0]);
    storage_arr.push(this.correctIndexList[0]);
    localStorage.setItem(eBookConfig.email + ":" + this.divid, storage_arr.join(";"));
};

MultipleChoice.prototype.logMCMFsubmission = function () {
    var answerInfo = "answer:" + this.givenArray[0] + ":" + (this.givenArray[0] == this.correctIndexList[0] ? "correct" : "no");
    logBookEvent({"event": "mChoice", "act": answerInfo, "div_id": this.divid});
};

MultipleChoice.prototype.provideMCMFFeedback = function () {
    if (!this.timed) {
        this.renderMCMFFeedback(this.givenArray[0] == this.correctIndexList[0], this.singlefeedback);
    } else {
        this.feedBackTimedMC();
    }
};

MultipleChoice.prototype.renderMCMFFeedback = function (correct, feedbackText) {
    if (correct) {
        $(this.feedBackDiv).html("Correct!    " + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-success");
    } else {
        if (feedbackText == null) {
            feedbackText = "";
        }
        $(this.feedBackDiv).html("Incorrect.    " + feedbackText);
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
};

MultipleChoice.prototype.enableMCcomparison = function () {
    if (!this.timed) {
        this.compareButton.disabled = false;
    }
};

MultipleChoice.prototype.instructorMchoiceModal = function (data) {
    // data.reslist -- student and their answers
    // data.answerDict    -- answers and count
    // data.correct - correct answer
    var res = "<table><tr><th>Student</th><th>Answer(s)</th></tr>";
    for (var i in data) {
        res += "<tr><td>" + data[i][0] + "</td><td>" + data[i][1] + "</td></tr>";
    }
    res += "</table>";
    return res;
};

MultipleChoice.prototype.compareModal = function (data, status, whatever) {
    var datadict = eval(data)[0];
    var answers = datadict.answerDict;
    var misc = datadict.misc;
    var kl = Object.keys(answers).sort();

    var body = "<table>";
    body += "<tr><th>Answer</th><th>Percent</th></tr>";

    var theClass = "";
    for (var k in kl) {
        if (kl[k] === misc.correct) {
            theClass = "success";
        } else {
            theClass = "info";
        }

        body += "<tr><td>" + kl[k] + "</td><td class='compare-me-progress'>";
        var pct = answers[kl[k]] + "%";
        body += "<div class='progress'>";
        body += "    <div class='progress-bar progress-bar-" + theClass + "' style='width:" + pct + ";'>" + pct;
        body += "    </div>";
        body += "</div></td></tr>";
    }
    body += "</table>";

    if (misc["yourpct"] !== "unavailable") {
        body += "<br /><p>You have " + misc["yourpct"] + "% correct for all questions</p>";
    }

    if (datadict.reslist !== undefined) {
        body += this.instructorMchoiceModal(datadict.reslist);
    }

    var html = "<div class='modal fade'>" +
        "    <div class='modal-dialog compare-modal'>" +
        "        <div class='modal-content'>" +
        "            <div class='modal-header'>" +
        "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
        "                <h4 class='modal-title'>Distribution of Answers</h4>" +
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

MultipleChoice.prototype.compareAnswers = function () {
    var data = {};
    data.div_id = this.divid;
    data.course = eBookConfig.course;
    jQuery.get(eBookConfig.ajaxURL + "getaggregateresults", data, this.compareModal);
};

MultipleChoice.prototype.checkCorrectTimedMCMA = function () {
    if (this.correctCount === this.correctList.length && this.correctList.length === this.givenArray.length) {
        this.correct = true;
    } else if (this.givenArray.length !== 0) {
        this.correct = false;
    }
    return this.correct;
};

MultipleChoice.prototype.checkCorrectTimedMCMF = function () {
    return this.correct;
};

MultipleChoice.prototype.feedBackTimedMC = function () {
    var _this = this;
    for (var i = 0; i < this.indexArray.length; i++) {
        var tmpindex = this.indexArray[i];
        var feedbackobj = $("#" + _this.divid + "_eachFeedback_" + tmpindex);
        $(feedbackobj).text(_this.feedbackList[i]);
        var tmpid = _this.answerList[tmpindex].id;
        if (_this.correctList.indexOf(tmpid) >= 0) {
            feedbackobj[0].classList.add("alert", "alert-success");
        } else {
            feedbackobj[0].classList.add("alert", "alert-danger");
        }
    }
};

/*===================================
=====================================
==== Begin Timed Assessment Code ====
=====================================
===================================*/

var TimedList = {};    // Timed dictionary

// Timed constructor
function Timed (opts) {
    if (opts) {
        this.init(opts);
    }
}

Timed.prototype = new RunestoneBase();

/*====================================
=== Setting Timed Assess Variables ===
====================================*/

Timed.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;
    this.origElem = orig; // the entire element of this timed assessment and all it"s children
    this.divid = orig.id;
    this.children = this.origElem.childNodes;

    this.timeLimit = 0;
    this.limitedTime = false;
    if (!isNaN($(this.origElem).data("time"))) {
        this.timeLimit = parseInt($(this.origElem).data("time"), 10) * 60; // time in seconds to complete the exam
        this.limitedTime = true;
    }
    this.showFeedback = true;
    if ($(this.origElem).is("[data-no-feedback]")) {
        this.showFeedback = false;
    }
    this.showResults = true;
    if ($(this.origElem).is("[data-no-result]")) {
        this.showResults = false;
    }

    this.running = 0;
    this.paused = 0;
    this.done = 0;
    this.taken = 0;
    this.score = 0;
    this.incorrect = 0;
    this.skipped = 0;

    this.MCMFList = []; // list of MCMF problems
    this.MCMAList = []; // list of MCMA problems
    this.FITBArray = [];    // list of FIB problems

    this.renderTimedAssess();
};

/*===============================
=== Generating new Timed HTML ===
===============================*/

Timed.prototype.renderTimedAssess = function () {
    this.renderContainer();
    this.renderTimer();
    this.renderControlButtons();
    this.assessDiv.appendChild(this.timedDiv);    // This can"t be appended in renderContainer because then it renders above the timer and control buttons.
    this.renderMCMAquestions();
    this.renderMCMFquestions();
    this.renderFIBquestions();
    this.renderSubmitButton();
    this.renderFeedbackContainer();

    // Replace intermediate HTML with rendered HTML
    $(this.origElem).replaceWith(this.assessDiv);
};

Timed.prototype.renderContainer = function () {
    this.assessDiv = document.createElement("div"); // container for the entire Timed Component
    this.assessDiv.id = this.divid;
    this.timedDiv = document.createElement("div"); // div that will hold the questions for the timed assessment
    var elementHtml = $(this.origElem).html(); // take all of the tags that will generate the questions
    $(this.timedDiv).html(elementHtml); // place those tags in the div
    $(this.timedDiv).attr({ // set the id, and style the div to be hidden
        "id": "timed_Test",
        "style": "display:none"
    });
    this.newChildren = this.timedDiv.childNodes;    // These are the...
    // ...components that need to be rendered inside of the timed test
};

Timed.prototype.renderTimer = function () {
    this.wrapperDiv = document.createElement("div");
    this.timerContainer = document.createElement("P");
    this.wrapperDiv.id = "startWrapper";
    this.timerContainer.id = "output";
    this.wrapperDiv.appendChild(this.timerContainer);
};

Timed.prototype.renderControlButtons = function () {
    var _this = this;
    this.controlDiv = document.createElement("div");
    $(this.controlDiv).attr({
        "id": "controls",
        "style": "text-align: center"
    });
    this.startBtn = document.createElement("btn");
    this.pauseBtn = document.createElement("btn");
    $(this.startBtn).attr({
        "class": "btn btn-default",
        "id": "start"
    });
    this.startBtn.textContent = "Start";
    this.startBtn.onclick = function () {
        _this.startAssessment();
    };
    $(this.pauseBtn).attr({
        "class": "btn btn-default",
        "id": "pause",
        "disabled":"true"
    });
    this.pauseBtn.textContent = "Pause";
    this.pauseBtn.onclick = function () {
        _this.pauseAssessment();
    };
    this.controlDiv.appendChild(this.startBtn);
    this.controlDiv.appendChild(this.pauseBtn);
    this.assessDiv.appendChild(this.wrapperDiv);
    this.assessDiv.appendChild(this.controlDiv);
};

Timed.prototype.renderSubmitButton = function () {
    var _this = this;
    this.buttonContainer = document.createElement("div");
    $(this.buttonContainer).attr({"style": "text-align:center"});
    this.finishButton = document.createElement("button");
    $(this.finishButton).attr({
        "id": "finish",
        "class": "btn btn-inverse"
    });
    this.finishButton.textContent = "Submit answers";
    this.finishButton.onclick = function () {
        _this.finishAssessment();
    };
    this.buttonContainer.appendChild(this.finishButton);
    this.timedDiv.appendChild(this.buttonContainer);
};

Timed.prototype.renderFeedbackContainer = function () {
    this.scoreDiv = document.createElement("P");
    this.scoreDiv.id = this.divid + "results";
    this.scoreDiv.style.display = "none";
    this.timedDiv.appendChild(this.scoreDiv);
};

Timed.prototype.renderMCMFquestions = function () {
    // this finds all the MCMF questions in this timed assessment and calls their constructor method
    // Also adds them to MCMFList
    var _this = this;
    for (var i = 0; i < this.newChildren.length; i++) {
        var tmpChild = this.newChildren[i];
        if ($(tmpChild).is("[data-component=multiplechoice]")) {
            if ($(tmpChild).data("multipleanswers") !== true) {
                _this.MCMFList.push(new MultipleChoice({"orig": tmpChild}));
            }
        }
    }
};

Timed.prototype.renderMCMAquestions = function () {
    // this finds all the MCMA questions in this timed assessment and calls their constructor method
    // Also adds them to MCMAList
    var _this = this;
    for (var i = 0; i < this.newChildren.length; i++) {
        var tmpChild = this.newChildren[i];
        if ($(tmpChild).is("[data-component=multiplechoice]")) {
            if ($(tmpChild).data("multipleanswers") === true) {
                var newMCMA = new MultipleChoice({"orig": tmpChild});
                _this.MCMAList.push(newMCMA);
            }
        }
    }
};

Timed.prototype.renderFIBquestions = function () {
    // this finds all the FIB questions in this timed assessment and calls their constructor method
    // Also adds them to FIBList
    var _this = this;
    for (var i = 0; i < this.newChildren.length; i++) {
        var tmpChild = this.newChildren[i];
        if ($(tmpChild).is("[data-component=fillintheblank]")) {
            var newFITB = new FITB({"orig": tmpChild});
            _this.FITBArray.push(newFITB);
        }
    }
};


/*=================================
=== Timer and control Functions ===
=================================*/

Timed.prototype.startAssessment = function () {
    var _this = this;
    this.tookTimedExam();
    if (!_this.taken) {
        $(this.startBtn).attr("disabled", true);
        $(this.pauseBtn).attr("disabled", false);
        if (_this.running === 0 && _this.paused === 0) {
            _this.running = 1;
            $(this.timedDiv).show();
            _this.increment();
            var name = _this.getPageName();
            logBookEvent({"event": "timedExam", "act": "start", "div_id": name});
            localStorage.setItem(eBookConfig.email + ":timedExam:" + name, "started");
        }
    } else {
        $(this.startBtn).attr("disabled", true);
        $(this.pauseBtn).attr("disabled", true);
        $(this.finishButton).attr("disabled", true);
        _this.running = 0;
        _this.done = 1;
        $(this.timedDiv).show();
        $(this.time).text("Already completed");
        _this.submitTimedProblems();
    }
};

Timed.prototype.pauseAssessment = function () {
    if (this.done === 0) {
        if (this.running === 1) {
            this.running = 0;
            this.paused = 1;
            this.pauseBtn.innerHTML = "Resume";
            $(this.timedDiv).hide();
        } else {
            this.running = 1;
            this.paused = 0;
            this.increment();
            this.pauseBtn.innerHTML = "Pause";
            $(this.timedDiv).show();
        }
    }
};

Timed.prototype.showTime = function () { // displays the timer value
    var mins = Math.floor(this.timeLimit / 60);
    var secs = Math.floor(this.timeLimit) % 60;
    var minsString = mins;
    var secsString = secs;

    if (mins < 10) {
        minsString = "0" + mins;
    }
    if (secs < 10) {
        secsString = "0" + secs;
    }
    var begining = "Time Remaining    ";
    if (!this.limitedTime) {
        begining = "Time Taken    ";
    }
    var timeString =  begining + minsString + ":" + secsString;

    if (mins <= 0 && secs <= 0) {
        timeString = "Finished";
    }

    this.timerContainer.innerHTML = timeString;
    var timeTips = document.getElementsByClassName("timeTip");
    for (var i = 0; i <= timeTips.length - 1; i++) {
        timeTips[i].title = timeString;
    }
};

Timed.prototype.increment = function () { // increments the timer
    // if running (not paused) and not taken
    if (this.running === 1 && !this.taken) {
        var _this = this;
        setTimeout(function () {
            if (_this.limitedTime) {  // If there's a time limit, count down to 0
                _this.timeLimit--;
            } else {
                _this.timeLimit++; // Else count up to keep track of how long it took to complete
            }
            _this.showTime(_this.timeLimit);
            if (_this.timeLimit > 0) {
                _this.increment();
                // ran out of time
            } else {
                $(this.startBtn).attr({"disabled": "true"});
                $(this.finishButton).attr({"disabled": "true"});
                _this.running = 0;
                _this.done = 1;
                if (_this.taken === 0) {
                    _this.taken = 1;
                    _this.finishAssessment();
                }
            }
        }, 1000);
    }
};

Timed.prototype.checkIfFinished = function () {
    if (this.tookTimedExam()) {
        $(this.startBtn).attr("disabled", true);
        $(this.pauseBtn).attr("disabled", true);
        $(this.finishButton).attr("disabled", true);
        this.resetTimedMCMFStorage();
        //$(this.timedDiv).show();
    }
};

Timed.prototype.tookTimedExam = function () {
    // Checks if this exam has been taken before

    $("#output").css({
        "width": "50%",
        "margin": "0 auto",
        "background-color": "#DFF0D8",
        "text-align": "center",
        "border": "2px solid #DFF0D8",
        "border-radius": "25px"
    });

    $(this.scoreDiv).css({
        "width": "50%",
        "margin": "0 auto",
        "background-color": "#DFF0D8",
        "text-align": "center",
        "border": "2px solid #DFF0D8",
        "border-radius": "25px"
    });

    $(".tooltipTime").css({
        "margin": "0",
        "padding": "0",
        "background-color": "black",
        "color": "white"
    });

    var len = localStorage.length;
    var pageName = this.getPageName();
    var _this = this;
    if (len > 0) {
        if (localStorage.getItem(eBookConfig.email + ":timedExam:" + pageName) !== null) {
            _this.taken = 1;

        }else {
            _this.taken = 0;
        }
    }else {
        _this.taken = 0;
    }
};

Timed.prototype.getPageName = function () {
    var pageName = window.location.pathname.split("/").slice(-1);
    var name = pageName[0];
    return name;
};

Timed.prototype.finishAssessment = function () {
    this.timeLimit = 0;
    this.running = 0;
    this.done = 1;
    this.taken = 1;
    this.submitTimedProblems();
    this.checkScore();
    this.displayScore();
    $(this.pauseBtn).attr("disabled", true);
    this.finishButton.disabled = true;
};

Timed.prototype.submitTimedProblems = function () {
    var _this = this;
    for (var i = 0; i < this.MCMAList.length; i++) {
        _this.MCMAList[i].processMCMASubmission();
    }
    for (var j = 0; j < this.MCMFList.length; j++) {
        _this.MCMFList[j].processMCMFSubmission();
    }
    for (var k = 0; k < this.FITBArray.length; k++) {
        _this.FITBArray[k].checkFITBStorage();
    }
    if (!this.showFeedback) {
        this.hideTimedFeedback();
    }
};

Timed.prototype.hideTimedFeedback = function () {
    $(".eachFeedback").css("display", "none");
    for (var i = 0; i < this.FITBArray.length; i++) {
        var blanks = this.FITBArray[i].blankArray;
        for (var j = 0; j < blanks.length; j++) {
            (blanks[j]).removeClass("input-validation-error");
        }
        this.FITBArray[i].feedBackDiv.style.display = "none";
    }
};

Timed.prototype.checkScore = function () {
    var _this = this;

    // Gets the score of each MCMA problem
    for (var i = 0; i < this.MCMAList.length; i++) {
        var correctMCMA = _this.MCMAList[i].checkCorrectTimedMCMA();
        if (correctMCMA) {
            this.score++;
        } else if (correctMCMA == null) {
            this.skipped++;
        } else {
            this.incorrect++;
        }
    }

    // Gets the score of each MCMF problem
    for (var j = 0; j < this.MCMFList.length; j++) {
        var correctMCMF = _this.MCMFList[j].checkCorrectTimedMCMF();
        if (correctMCMF) {
            this.score++;
        } else if (correctMCMF == null) {
            this.skipped++;
        } else {
            this.incorrect++;
        }
    }

    // Gets the score of each FITB problem
    for (var k = 0; k < this.FITBArray.length; k++) {
        var correctFITB = _this.FITBArray[k].checkCorrectTimedFITB();
        if (correctFITB) {
            this.score++;
        } else if (correctFITB == null) {
            this.skipped++;
        } else {
            this.incorrect++;
        }
    }
};

Timed.prototype.displayScore = function () {
    if (this.showResults) {
        var scoreString = "Num Correct: " + this.score + " Num Wrong: " + this.incorrect + " Num Skipped: " + this.skipped;
        var numQuestions = this.MCMAList.length + this.MCMFList.length + this.FITBArray.length;
        var percentCorrect = (this.score / numQuestions) * 100;
        scoreString += "    Percent Correct: " + percentCorrect + "%";
        $(this.scoreDiv).text(scoreString);
        this.scoreDiv.style.display = "block";
    }
};

/*=======================================================
=== Function that calls the constructors on page load ===
=======================================================*/

$(document).ready(function () {
    $("[data-component=timedAssessment]").each(function (index) {
        TimedList[this.id] = new Timed({"orig": this});
    });
    for (var key in TimedList) {
        if (TimedList.hasOwnProperty(key)) {
            var TimedChildren = TimedList[key].origElem.childNodes;
        }
    }

    $("[data-component=fillintheblank]").each(function (index) {    // FITB
        if ($.inArray(this.id, TimedChildren) < 0) { // If the fillintheblank element exists within a timed component, don"t render it here
            FITBList[this.id] = new FITB({"orig": this});
        }
    });

    $("[data-component=multiplechoice]").each(function (index) {    // MC
        if ($.inArray(this.id, TimedChildren) < 0) { // If the MC element exists within a timed component, don"t render it here
            mcList[this.id] = new MultipleChoice({"orig": this});
        }
    });

});

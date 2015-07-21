/*==========================================
========      Master timed.js     =========
============================================
===     This file contains the JS for    ===
===     the Runestone timed component.   ===
============================================
===              Created By              ===
===             Kirby Olson              ===
===               6/11/15                ===
==========================================*/

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
    this.origElem = orig; // the entire element of this timed assessment and all of its children
    this.divid = orig.id;
    this.children = this.origElem.childNodes;

    this.timeLimit = 0;
    this.limitedTime = false;
    if (!isNaN($(this.origElem).data("time"))) {
        this.timeLimit = parseInt($(this.origElem).data("time"), 10) * 60; // time in seconds to complete the exam
        this.startingTime = this.timeLimit;
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
    this.random = false;
    if ($(this.origElem).is("[data-random]")) {
        this.random = true;
    }

    this.running = 0;
    this.paused = 0;
    this.done = 0;
    this.taken = 0;
    this.score = 0;
    this.incorrect = 0;
    this.skipped = 0;

    this.currentQuestionIndex = 0;   // Which question is currently displaying on the page
    this.renderedQuestionArray = []; // list of all problems

    this.getNewChildren();
    this.renderTimedAssess();
};

Timed.prototype.getNewChildren = function () {
    this.newChildren = [];
    for (var i = 0; i < this.origElem.childNodes.length; i++) {
        this.newChildren.push(this.origElem.childNodes[i]);
    }
};

/*===============================
=== Generating new Timed HTML ===
===============================*/

Timed.prototype.renderTimedAssess = function () {
    this.renderContainer();
    this.renderTimer();
    this.renderControlButtons();
    this.assessDiv.appendChild(this.timedDiv);    // This can't be appended in renderContainer because then it renders above the timer and control buttons.
    this.createRenderedQuestionArray();
    this.renderTimedQuestion();
    this.renderNavControls();
    this.renderSubmitButton();
    this.renderFeedbackContainer();

    // Replace intermediate HTML with rendered HTML
    $(this.origElem).replaceWith(this.assessDiv);
};

Timed.prototype.renderContainer = function () {
    this.assessDiv = document.createElement("div"); // container for the entire Timed Component
    this.assessDiv.id = this.divid;
    this.timedDiv = document.createElement("div"); // div that will hold the questions for the timed assessment
    this.navDiv = document.createElement("div"); // For navigation control
    $(this.navDiv).attr({"style": "text-align:center"});
    this.timedDiv.appendChild(this.navDiv);
    this.switchDiv = document.createElement("div"); // is replaced by the questions
    this.timedDiv.appendChild(this.switchDiv);
    $(this.timedDiv).attr({ // set the id, and style the div to be hidden
        "id": "timed_Test",
        "style": "display:none"
    });
};

Timed.prototype.renderTimer = function () {
    this.wrapperDiv = document.createElement("div");
    this.timerContainer = document.createElement("P");
    this.wrapperDiv.id = "startWrapper";
    this.timerContainer.id = "output";
    this.wrapperDiv.appendChild(this.timerContainer);
};

Timed.prototype.renderControlButtons = function () {
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
    this.startBtn.addEventListener("click", function () {
        this.startAssessment();
    }.bind(this), false);
    $(this.pauseBtn).attr({
        "class": "btn btn-default",
        "id": "pause",
        "disabled":"true"
    });
    this.pauseBtn.textContent = "Pause";
    this.pauseBtn.addEventListener("click", function () {
        this.pauseAssessment();
    }.bind(this), false);
    this.controlDiv.appendChild(this.startBtn);
    this.controlDiv.appendChild(this.pauseBtn);
    this.assessDiv.appendChild(this.wrapperDiv);
    this.assessDiv.appendChild(this.controlDiv);
};
Timed.prototype.renderNavControls = function () {
    var _this = this;
    this.pagNavList = document.createElement("ul");
    $(this.pagNavList).addClass("pagination");
    this.leftContainer = document.createElement("li");
    this.leftNavButton = document.createElement("a");
    this.leftNavButton.innerHTML = "&laquo";
    $(this.leftNavButton).attr("aria-label", "Previous");
    $(this.leftNavButton).css("cursor", "pointer");
    this.leftNavButton.addEventListener("click", function () {
        if ($(this.leftContainer).hasClass("disabled")) {
            return;
        }
        this.currentQuestionIndex--;
        this.renderTimedQuestion();
        this.ensureButtonSafety();
        for (var i = 0; i < _this.pagNavList.childNodes.length; i++) {
            $(this.pagNavList.childNodes[i]).removeClass("active");
        }
        $(this.pagNavList.childNodes[this.currentQuestionIndex + 1]).addClass("active");
    }.bind(this), false);
    this.leftContainer.appendChild(this.leftNavButton);
    this.pagNavList.appendChild(this.leftContainer);
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        var tmpLi = document.createElement("li");
        var tmpA = document.createElement("a");
        tmpA.innerHTML = i + 1;
        $(tmpA).css("cursor", "pointer");
        if (i === 0) {
            $(tmpLi).addClass("active");
        }
        tmpA.onclick = function () {
            _this.currentQuestionIndex = this.innerHTML - 1;
            _this.renderTimedQuestion();
            _this.ensureButtonSafety();
            for (var i = 0; i < _this.pagNavList.childNodes.length; i++) {
                $(_this.pagNavList.childNodes[i]).removeClass("active");
            }
            $(this.parentNode).addClass("active");
        };
        tmpLi.appendChild(tmpA);
        this.pagNavList.appendChild(tmpLi);
    }
    this.rightContainer = document.createElement("li");
    this.rightNavButton = document.createElement("a");
    $(this.rightNavButton).attr("aria-label", "Next");
    this.rightNavButton.innerHTML = "&raquo";
    $(this.rightNavButton).css("cursor", "pointer");
    this.rightNavButton.addEventListener("click", function () {
        if ($(this.rightContainer).hasClass("disabled")) {
            return;
        }
        this.currentQuestionIndex++;
        this.renderTimedQuestion();
        this.ensureButtonSafety();
        for (var i = 0; i < _this.pagNavList.childNodes.length; i++) {
            $(this.pagNavList.childNodes[i]).removeClass("active");
        }
        $(this.pagNavList.childNodes[this.currentQuestionIndex + 1]).addClass("active");
    }.bind(this), false);
    this.rightContainer.appendChild(this.rightNavButton);
    this.pagNavList.appendChild(this.rightContainer);
    this.ensureButtonSafety();
    this.navDiv.appendChild(this.pagNavList);

};
Timed.prototype.renderSubmitButton = function () {
    this.buttonContainer = document.createElement("div");
    $(this.buttonContainer).attr({"style": "text-align:center"});
    this.finishButton = document.createElement("button");
    $(this.finishButton).attr({
        "id": "finish",
        "class": "btn btn-inverse"
    });
    this.finishButton.textContent = "Submit answers";
    this.finishButton.addEventListener("click", function () {
        this.finishAssessment();
    }.bind(this), false);

    this.buttonContainer.appendChild(this.finishButton);
    this.timedDiv.appendChild(this.buttonContainer);
};

Timed.prototype.ensureButtonSafety = function () {  // Makes sure that user can't navigate past the range of this.renderedQuestionArray
    if (this.currentQuestionIndex === 0) {
        if (this.renderedQuestionArray.length != 1) {
            $(this.rightContainer).removeClass("disabled");
        }
        $(this.leftContainer).addClass("disabled");
    }
    if (this.currentQuestionIndex >= (this.renderedQuestionArray.length-1)) {
        if (this.renderedQuestionArray.length != 1) {
            $(this.leftContainer).removeClass("disabled");
        }
        $(this.rightContainer).addClass("disabled");
    }
    if (this.currentQuestionIndex > 0 && this.currentQuestionIndex < this.renderedQuestionArray.length-1) {
        $(this.rightContainer).removeClass("disabled");
        $(this.leftContainer).removeClass("disabled");
    }
};

Timed.prototype.renderFeedbackContainer = function () {
    this.scoreDiv = document.createElement("P");
    this.scoreDiv.id = this.divid + "results";
    this.scoreDiv.style.display = "none";
    this.timedDiv.appendChild(this.scoreDiv);
};

Timed.prototype.createRenderedQuestionArray = function () {
    // this finds all the assess questions in this timed assessment and calls their constructor method
    // Also adds them to this.renderedQuestionArray
    for (var i = 0; i < this.newChildren.length; i++) {
        var tmpChild = this.newChildren[i];
        if ($(tmpChild).is("[data-component=multiplechoice]")) {
            this.renderedQuestionArray.push(new TimedMC({"orig": tmpChild}));
        } else if ($(tmpChild).is("[data-component=fillintheblank]")) {
            var newFITB = new TimedFITB({"orig": tmpChild});
            this.renderedQuestionArray.push(newFITB);
        } else if ($(tmpChild).is("[data-component=dragndrop]")) {
            this.renderedQuestionArray.push(new TimedDragNDrop({"orig": tmpChild}));
        } else if ($(tmpChild).is("[data-component=clickablearea]")) {
            this.renderedQuestionArray.push(new TimedClickableArea({"orig":tmpChild}));
        }
    }
    if (this.random) {
        this.randomizeRQA();
    }
};
Timed.prototype.randomizeRQA = function () {
    var currentIndex = this.renderedQuestionArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = this.renderedQuestionArray[currentIndex];
        this.renderedQuestionArray[currentIndex] = this.renderedQuestionArray[randomIndex];
        this.renderedQuestionArray[randomIndex] = temporaryValue;

    }
};

Timed.prototype.renderTimedQuestion = function () {
    $(this.switchDiv).replaceWith(this.renderedQuestionArray[this.currentQuestionIndex].containerDiv);
    this.switchDiv = this.renderedQuestionArray[this.currentQuestionIndex].containerDiv;
};


/*=================================
=== Timer and control Functions ===
=================================*/

Timed.prototype.startAssessment = function () {
    this.tookTimedExam();
    if (!this.taken) {
        $(this.startBtn).attr("disabled", true);
        $(this.pauseBtn).attr("disabled", false);
        if (this.running === 0 && this.paused === 0) {
            this.running = 1;
            $(this.timedDiv).show();
            this.increment();
            this.logBookEvent({"event": "timedExam", "act": "start", "div_id": this.divid});
            localStorage.setItem(eBookConfig.email + ":" + this.divid, "started");
        }
    } else {
        $(this.startBtn).attr("disabled", true);
        $(this.pauseBtn).attr("disabled", true);
        $(this.finishButton).attr("disabled", true);
        this.running = 0;
        this.done = 1;
        $(this.timedDiv).show();
        this.submitTimedProblems();
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
    var beginning = "Time Remaining    ";
    if (!this.limitedTime) {
        beginning = "Time Taken    ";
    }
    var timeString =  beginning + minsString + ":" + secsString;

    if (this.done || this.taken) {
        var minutes = Math.floor(this.timeTaken / 60);
        var seconds = Math.floor(this.timeTaken % 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        timeString = "Time taken: " + minutes + ":" + seconds;
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
        setTimeout(function () {
            if (this.limitedTime) {  // If there's a time limit, count down to 0
                this.timeLimit--;
            } else {
                this.timeLimit++; // Else count up to keep track of how long it took to complete
            }
            this.showTime();
            if (this.timeLimit > 0) {
                this.increment();
                // ran out of time
            } else {
                $(this.startBtn).attr({"disabled": "true"});
                $(this.finishButton).attr({"disabled": "true"});
                this.running = 0;
                this.done = 1;
                if (this.taken === 0) {
                    this.taken = 1;
                    this.finishAssessment();
                }
            }
        }.bind(this), 1000);
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
    if (len > 0) {
        if (localStorage.getItem(eBookConfig.email + ":" + this.divid) !== null) {
            this.taken = 1;
            this.restoreFromStorage();

        } else {
            this.taken = 0;
        }
    } else {
        this.taken = 0;
    }
};

Timed.prototype.finishAssessment = function () {
    this.findTimeTaken();
    this.running = 0;
    this.done = 1;
    this.taken = 1;
    this.submitTimedProblems();
    this.checkScore();
    this.displayScore();
    this.storeScore();
    this.logScore();
    $(this.pauseBtn).attr("disabled", true);
    this.finishButton.disabled = true;
};

Timed.prototype.submitTimedProblems = function () {
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        this.renderedQuestionArray[i].processTimedSubmission();
    }
    if (!this.showFeedback) {
        this.hideTimedFeedback();
    }
};

Timed.prototype.hideTimedFeedback = function () {
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        this.renderedQuestionArray[i].hideFeedback();   // Defined in each timed class
    }
};

Timed.prototype.checkScore = function () {
    // Gets the score of each problem
    for (var i = 0; i < this.renderedQuestionArray.length; i++) {
        var correct = this.renderedQuestionArray[i].checkCorrectTimed();
        if (correct) {
            this.score++;
        } else if (correct === null) {
            this.skipped++;
        } else {
            this.incorrect++;
        }
    }
};

Timed.prototype.findTimeTaken = function () {
    if (this.limitedTime) {
        this.timeTaken = this.startingTime - this.timeLimit;
    } else {
        this.timeTaken = this.timeLimit;
    }
};

Timed.prototype.storeScore = function () {
    var storage_arr = [];
    storage_arr.push(this.score, this.incorrect, this.skipped, this.timeTaken);
    localStorage.setItem(eBookConfig.email + ":" + this.divid, storage_arr.join(";"));
};

Timed.prototype.logScore = function () {
    this.logBookEvent({"event": "timedExam", "act": "finish", "div_id": this.divid, "correct": this.score, "incorrect": this.incorrect, "skipped": this.skipped, "time": this.timeTaken});
};

Timed.prototype.restoreFromStorage = function () {
    var tmpArr = localStorage.getItem(eBookConfig.email + ":" + this.divid).split(";");
    this.score = tmpArr[0];
    this.incorrect = tmpArr[1];
    this.skipped = tmpArr[2];
    this.timeTaken = tmpArr[3];
    this.displayScore();
    this.showTime();
};

Timed.prototype.displayScore = function () {
    if (this.showResults) {
        var scoreString = "Num Correct: " + this.score + " Num Wrong: " + this.incorrect + " Num Skipped: " + this.skipped;
        var numQuestions = this.renderedQuestionArray.length;
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
});

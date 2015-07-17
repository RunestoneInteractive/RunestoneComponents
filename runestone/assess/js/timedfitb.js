function TimedFITB (opts) {
    if (opts) {
        this.timedInit(opts);
    }
}

TimedFITB.prototype = new FITB();

TimedFITB.prototype.timedInit = function (opts) {
    this.init(opts);
    this.renderTimedIcon(this.inputDiv);
    this.hideButtons();
};


TimedFITB.prototype.hideButtons = function () {
    $(this.submitButton).hide();
    $(this.compareButton).hide();
};

TimedFITB.prototype.renderTimedIcon = function (component) {
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
    $(component).prepend(timeIconDiv);
};

TimedFITB.prototype.checkCorrectTimed = function () {
    // Returns if the question was correct.    Used for timed assessment grading.
    return this.correct;
};

TimedFITB.prototype.hideFeedback = function () {
    for (var i = 0; i < this.blankArray.length; i++) {
        $(this.blankArray[i]).removeClass("input-validation-error");
    }
    this.feedBackDiv.style.display = "none";
};

TimedFITB.prototype.processTimedSubmission = function () {
    for (var i = 0; i < this.blankArray.length; i++) {
        this.blankArray[i].disabled = true;
    }
    this.checkFITBStorage();
};

function TimedClickableArea (opts) {
    if (opts) {
        this.timedInit(opts);
    }
}
TimedClickableArea.prototype = new ClickableArea();

TimedClickableArea.prototype.timedInit = function (opts) {
    this.init(opts);
    this.renderTimedIcon(this.containerDiv);
    this.hideButtons();
};


TimedClickableArea.prototype.hideButtons = function () {
    $(this.submitButton).hide();
};

TimedClickableArea.prototype.renderTimedIcon = function (component) {
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

TimedClickableArea.prototype.checkCorrectTimed = function () {
    // Returns if the question was correct.    Used for timed assessment grading.
    if (this.correctNum === 0 && this.incorrectNum === 0) {
        this.correct = null;
    }
    return this.correct;
};

TimedClickableArea.prototype.hideFeedback = function () {
    $(this.feedBackDiv).hide();
};

TimedClickableArea.prototype.processTimedSubmission = function () {
    for (var i = 0; i < this.clickableArray.length; i++) {
        $(this.clickableArray[i]).css("cursor", "initial");
        this.clickableArray[i].onclick = function () {
            return;
        }
    }
    this.clickableEval();
};

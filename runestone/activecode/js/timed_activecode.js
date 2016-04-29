function TimedActiveCode (opts) {
    if (opts) {
        this.timedInit(opts);
    }
}
TimedActiveCode.prototype = new ActiveCode();

TimedActiveCode.prototype.timedInit = function (opts) {
    this.init(opts);
    this.renderTimedIcon(this.containerDiv);
    this.hideButtons();
};


TimedActiveCode.prototype.hideButtons = function () {
    $(this.saveButton).hide();
    $(this.loadButton).hide();

};

TimedActiveCode.prototype.renderTimedIcon = function (component) {
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

TimedActiveCode.prototype.checkCorrectTimed = function () {
    return "I";   // we ignore this in the grading
};

TimedActiveCode.prototype.hideFeedback = function () {
    // no feedback to hide
};

TimedActiveCode.prototype.processTimedSubmission = function () {
    // Disable input & evaluate component
    this.saveEditor();
    this.runButton.disabled = true;
    $(this.codeDiv).addClass("ac-disabled");
};

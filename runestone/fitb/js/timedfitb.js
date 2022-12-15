import FITB from "./fitb.js";
export default class TimedFITB extends FITB {
    constructor(opts) {
        super(opts);
        this.renderTimedIcon(this.inputDiv);
        this.hideButtons();
        this.needsReinitialization = true;
    }
    hideButtons() {
        $(this.submitButton).hide();
        $(this.compareButton).hide();
    }
    renderTimedIcon(component) {
        // renders the clock icon on timed components.    The component parameter
        // is the element that the icon should be appended to.
        var timeIconDiv = document.createElement("div");
        var timeIcon = document.createElement("img");
        $(timeIcon).attr({
            src: "../_static/clock.png",
            style: "width:15px;height:15px",
        });
        timeIconDiv.className = "timeTip";
        timeIconDiv.title = "";
        timeIconDiv.appendChild(timeIcon);
        $(component).prepend(timeIconDiv);
    }
    checkCorrectTimed() {
        // Returns if the question was correct, incorrect, or skipped (return null in the last case)
        switch (this.correct) {
            case true:
                return "T";
            case false:
                return "F";
            default:
                return null;
        }
    }
    hideFeedback() {
        for (var i = 0; i < this.blankArray.length; i++) {
            $(this.blankArray[i]).removeClass("input-validation-error");
        }
        this.feedBackDiv.style.display = "none";
    }

    reinitializeListeners() {
        for (let blank of this.blankArray) {
            $(blank).change(this.recordAnswered.bind(this));
        }
    }
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory.fillintheblank = function (opts) {
    if (opts.timed) {
        return new TimedFITB(opts);
    }
    return new FITB(opts);
};

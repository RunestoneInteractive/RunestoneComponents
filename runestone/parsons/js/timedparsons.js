import Parsons from "./parsons";

export default class TimedParsons extends Parsons {
    constructor(opts) {
        super(opts);
        // todo -- make this configurable
        if (opts.timedfeedback) {
            this.showfeedback = true;
        } else {
            this.showfeedback = false;
        }
        this.grader.showfeedback = this.showfeedback;
        this.hideFeedback();
        $(this.checkButton).hide();
        $(this.helpButton).hide();
        $(this.resetButton).hide();
    }
    checkCorrectTimed() {
        return this.correct ? "T" : "F";
    }
    hideFeedback() {
        $(this.messageDiv).hide();
    }
    processTimedSubmission(logFlag) {
        if (logFlag) {
            this.setLocalStorage();
        }
        this.checkCurrentAnswer();
        if (logFlag) {
            this.logCurrentAnswer();
        }
        this.renderFeedback();
        this.correct = this.grade;
        this.disableInteraction();
    }
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory["parsons"] = function (opts) {
    if (opts.timed) {
        return new TimedParsons(opts);
    }
    return new Parsons(opts);
};

import Parsons from "./parsons";

export default class TimedParsons extends Parsons {
    constructor(opts) {
        super(opts);
        // todo -- make this configurable
        this.nofeedback = true;
        this.hideFeedback();
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
        this.correct = this.grader.grade() == "correct";
        this.disable();
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

import Parsons from "./parsons";

export default class TimedParsons extends Parsons {
    constructor(opts) {
        super(opts);
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

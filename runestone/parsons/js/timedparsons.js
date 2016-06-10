function TimedParsons (opts) {
    if (opts) {
        this.timedInit(opts);
    }
}

TimedParsons.prototype = new Parsons();

TimedParsons.prototype.timedInit = function (opts) {
    this.init(opts);
};

TimedParsons.prototype.checkCorrectTimed = function () {
    return this.correct ? "T" : "F";
};

TimedParsons.prototype.processTimedSubmission = function (logFlag) {
    // Disable input & evaluate component
    if (logFlag) {
    	var hash = this.pwidget.answerHash();
    	localStorage.setItem(this.storageId, hash);
    	hash = this.pwidget.sourceHash();
    	localStorage.setItem(this.storageId + "-source", hash);
    	var timeStamp = new Date();
    	localStorage.setItem(this.storageId + "-date", JSON.stringify(timeStamp));
    } else {
        this.loadingFromStorage = true;
    }
    this.pwidget.getFeedback();

    // Gross way to check if it's correct or not, but it's better than modifying the 3rd party parsons code to include a "correct" variable
    if ($(this.messageDiv).hasClass("alert-success")) {
        this.correct = true;
    } else {
        this.correct = false;
    }
    this.pwidget.disable();
};

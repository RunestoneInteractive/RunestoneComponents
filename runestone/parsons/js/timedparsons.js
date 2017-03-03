function TimedParsons (opts) {
	if (opts) {
		this.timedInit(opts);
	}
}

TimedParsons.prototype = new Parsons();

TimedParsons.prototype.timedInit = function (opts) {
	this.needsReinitialization = true;
	this.init(opts);
};

TimedParsons.prototype.reinitializeListeners = function () {
	if ($(this.checkButton).css("display") !== "none") {
		this.initializeInteractivity();
	}
};

TimedParsons.prototype.checkCorrectTimed = function () {
	return this.correct ? "T" : "F";
};

TimedParsons.prototype.hideFeedback = function () {
	$(this.messageDiv).hide();
};

TimedParsons.prototype.processTimedSubmission = function (logFlag) {
	if (logFlag) {
		this.setLocalStorage();
	}
	this.correct = this.grader.grade() == "correct";
	this.disable();
};
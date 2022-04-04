import HParsonsFeedback from "./hparsonsFeedback";
import BlockBasedGrader from "./blockGrader.js";

export default class BlockFeedback extends HParsonsFeedback {
    createOutput() {
        // Block based grading output
        this.hparsons.messageDiv = document.createElement("div");
        this.hparsons.outerDiv.appendChild(this.hparsons.messageDiv);
    }
    customizeUI() {
        $(this.hparsons.runButton).text('Check Me');
    }

    init() {
        this.hparsons.blockIndex = 0;
        this.hparsons.checkCount = 0;
        this.hparsons.numDistinct = 0;
        this.hparsons.hasSolved = false;
        // TODO: not sure what is the best way to do this
        this.hparsons.grader = new BlockBasedGrader();
        let solutionBlocks = [];
        for (let i = 0; i < this.hparsons.blockAnswer.length; ++i) {
            solutionBlocks.push(this.hparsons.originalBlocks[this.hparsons.blockAnswer[i]]);
        }
        this.hparsons.solution = solutionBlocks;
        this.hparsons.grader.solution = solutionBlocks;
    }

    // Called when check button clicked (block-based Feedback)
    async runButtonHandler() {
        this.checkCurrentAnswer();
        this.renderFeedback();
    }

    // Used for block-based feedback
    checkCurrentAnswer() {
        if (!this.hparsons.hasSolved) {
            this.hparsons.checkCount++;
            this.clearFeedback();
            this.hparsons.grader.answer = this.hparsons.hparsonsInput.getParsonsTextArray();
            this.hparsons.grade = this.hparsons.grader.grade();
            if (this.hparsons.grade == "correct") {
                this.hparsons.hasSolved = true;
                this.hparsons.correct = true;
                $(this.hparsons.runButton).prop("disabled", true);
            }
        }
    }

    renderFeedback() {
        this.hparsons.grade = this.hparsons.grader.graderState;
        var feedbackArea;
        var answerArea = $(this.hparsons.answerArea);
        feedbackArea = $(this.hparsons.messageDiv);

        if (this.hparsons.grade === "correct") {
            answerArea.addClass("correct");
            feedbackArea.fadeIn(100);
            feedbackArea.attr("class", "alert alert-info");
            if (this.hparsons.checkCount > 1) {
                feedbackArea.html(
                    $.i18n("msg_parson_correct", this.hparsons.checkCount)
                );
            } else {
                feedbackArea.html($.i18n("msg_parson_correct_first_try"));
            }
        }

        if (this.hparsons.grade === "incorrectTooShort") {
            // too little code
            answerArea.addClass("incorrect");
            feedbackArea.fadeIn(500);
            feedbackArea.attr("class", "alert alert-danger");
            feedbackArea.html($.i18n("msg_parson_too_short"));
        }

        if (this.hparsons.grade === "incorrectMoveBlocks") {
            var answerBlocks = this.hparsons.answerArea.children;
            var inSolution = [];
            var inSolutionIndexes = [];
            var notInSolution = [];
            for (let i = 0; i < answerBlocks.length; i++) {
                var block = answerBlocks[i];
                var index = this.hparsons.solution.indexOf(block.textContent);
                if (index == -1) {
                    notInSolution.push(block);
                } else {
                    inSolution.push(block);
                    inSolutionIndexes.push(index);
                }
            }
            var lisIndexes = this.hparsons.grader.inverseLISIndices(inSolutionIndexes);
            for (let i = 0; i < lisIndexes.length; i++) {
                notInSolution.push(inSolution[lisIndexes[i]]);
            }
            answerArea.addClass("incorrect");
            feedbackArea.fadeIn(500);
            feedbackArea.attr("class", "alert alert-danger");
            for (let i = 0; i < notInSolution.length; i++) {
                $(notInSolution[i]).addClass("incorrectPosition");
            }
            feedbackArea.html($.i18n("msg_parson_wrong_order"));
        }
    }

    // Feedback UI for Block-based Feedback
    clearFeedback() {
        $(this.hparsons.answerArea).removeClass("incorrect correct");
        var children = this.hparsons.answerArea.childNodes;
        for (var i = 0; i < children.length; i++) {
            $(children[i]).removeClass(
                "correctPosition incorrectPosition"
            );
        }
        $(this.hparsons.messageDiv).hide();

        // TODO: might need to change this
        $(this.runButton).prop("disabled", false);
        this.checkCount = 0;
        this.hasSolved = false;
    }

}
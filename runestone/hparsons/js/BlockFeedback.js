import HParsonsFeedback from "./hparsonsFeedback";
import BlockBasedGrader from "./blockGrader.js";
import "../../parsons/js/parsons-i18n.en.js";
import "../../parsons/js/parsons-i18n.pt-br.js";

export default class BlockFeedback extends HParsonsFeedback {
    createOutput() {
        // Block based grading output
        this.messageDiv = document.createElement("div");
        this.hparsons.outerDiv.appendChild(this.messageDiv);
    }
    customizeUI() {
        $(this.hparsons.runButton).text('Check Me');
    }

    init() {
        this.checkCount = 0;
        this.solved = false;
        // TODO: not sure what is the best way to do this
        this.grader = new BlockBasedGrader();
        let solutionBlocks = [];
        for (let i = 0; i < this.hparsons.blockAnswer.length; ++i) {
            solutionBlocks.push(this.hparsons.originalBlocks[this.hparsons.blockAnswer[i]]);
        }
        this.solution = solutionBlocks;
        this.grader.solution = solutionBlocks;
        this.answerArea = this.hparsons.hparsonsInput.shadowRoot.querySelector('.drop-area');
    }

    // Called when check button clicked (block-based Feedback)
    async runButtonHandler() {
        this.checkCurrentAnswer();
        this.renderFeedback();
    }

    // Used for block-based feedback
    checkCurrentAnswer() {
        if (!this.solved) {
            this.checkCount++;
            this.clearFeedback();
            this.grader.answer = this.hparsons.hparsonsInput.getParsonsTextArray();
            this.grade = this.grader.grade();
            if (this.grade == "correct") {
                this.solved = true;
                $(this.hparsons.runButton).prop("disabled", true);
            }
        }
    }

    renderFeedback() {
        this.grade = this.grader.graderState;
        var feedbackArea;
        var answerArea = $(this.answerArea);
        feedbackArea = $(this.messageDiv);

        if (this.grade === "correct") {
            answerArea.addClass("correct");
            feedbackArea.fadeIn(100);
            feedbackArea.attr("class", "alert alert-info");
            if (this.checkCount > 1) {
                feedbackArea.html(
                    $.i18n("msg_parson_correct", this.checkCount)
                );
            } else {
                feedbackArea.html($.i18n("msg_parson_correct_first_try"));
            }
            this.checkCount = 0;
        }

        if (this.grade === "incorrectTooShort") {
            // too little code
            answerArea.addClass("incorrect");
            feedbackArea.fadeIn(500);
            feedbackArea.attr("class", "alert alert-danger");
            feedbackArea.html($.i18n("msg_parson_too_short"));
        }

        if (this.grade === "incorrectMoveBlocks") {
            var answerBlocks = this.answerArea.children;
            var inSolution = [];
            var inSolutionIndexes = [];
            var notInSolution = [];
            for (let i = 0; i < answerBlocks.length; i++) {
                var block = answerBlocks[i];
                var index = this.solution.indexOf(block.textContent);
                if (index == -1) {
                    notInSolution.push(block);
                } else {
                    inSolution.push(block);
                    inSolutionIndexes.push(index);
                }
            }
            var lisIndexes = this.grader.inverseLISIndices(inSolutionIndexes);
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
        $(this.answerArea).removeClass("incorrect correct");
        var children = this.answerArea.childNodes;
        for (var i = 0; i < children.length; i++) {
            $(children[i]).removeClass(
                "correctPosition incorrectPosition"
            );
        }
        $(this.messageDiv).hide();

        // TODO: might need to change this
        $(this.hparsons.runButton).prop("disabled", false);
        // this.checkCount = 0;
        this.solved = false;
    }

}
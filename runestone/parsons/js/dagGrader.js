import LineBasedGrader from "./lineGrader";

export default class DAGGrader extends LineBasedGrader {

    inverseLISIndices(arr) {
        throw new Error("LIS algorithm for DAG grader not yet implemented.")
    }

    checkCorrectOrdering(solutionLines, answerLines) {
        let isCorrectOrder = true;
        this.correctLines = 0;
        this.solutionLength = solutionLines.length;
        let loopLimit = Math.min(solutionLines.length, answerLines.length);
        for (i = 0; i < loopLimit; i++) {
            if (answerLines[i].text !== solutionLines[i].text) {
                isCorrectOrder = false;
            } else {
                this.correctLines += 1;
            }
        }
        return isCorrectOrder
    }

}

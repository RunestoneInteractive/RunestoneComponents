import LineBasedGrader from "./lineGrader";

export default class DAGGrader extends LineBasedGrader {

    inverseLISIndices(arr) {
        // TODO implement this properly for the DAG grader so that it is the shortest edit distance
        // to ANY of the correct solutions instead of just to the model solution
        return super.inverseLISIndices(arr)
    }

    checkCorrectOrdering(solutionLines, answerLines) {
        let seen = new Set();
        let isCorrectOrder = true;
        this.correctLines = 0;
        this.solutionLength = solutionLines.length;
        let loopLimit = Math.min(solutionLines.length, answerLines.length);
        for (let i = 0; i < loopLimit; i++) {
            let line = answerLines[i];
            for (let j = 0; j < line.depends.length; j++) {
                if (!seen.has(line.depends[j])) {
                    isCorrectOrder = false;
                }
            }
            if (isCorrectOrder) {
                this.correctLines += 1;
            }
            seen.add(line.tag)
        }
        return isCorrectOrder
    }

}

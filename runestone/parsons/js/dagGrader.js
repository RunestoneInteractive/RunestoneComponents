import LineBasedGrader from "./lineGrader";
import { DiGraph } from "jsnetworkx/node/classes";
import { hasPath } from "jsnetworkx/node/algorithms/shortestPaths/generic";

function graphToNX(answerBlocks) {
    var graph = new DiGraph();
    for (let block of answerBlocks) {
        let line = block.lines[0]; // FIXME assume each block only has one line, won't work with adaptivity
        graph.addNode(line.tag);
        for (let line2 of line.depends) {
            // the depends graph lists the *incoming* edges of a node
            graph.addEdge(line2, line);
        }
    }
    return graph;
}

function isVertexCover(graph, vertexCover) {
    for (let edge of graph.edges()) {
        if (!(vertexCover.has(edge[0]) || vertexCover.has(edge[1]))) {
            return false;
        }
    }
    return true;
}

function allSubsets(arr) {
    let subsets = {};
    for (let i = 0; i <= arr.length; i++) {
        subsets[i] = [];
    }
    for (let i = 0; i < Math.pow(2, arr.length); i++) {
        let bin = i.toString(2);
        while (bin.length < arr.length) {
            bin = "0" + bin;
        }
        let subset = new Set();
        for (let j = 0; j < bin.length; j++) {
            if (bin[j] == '1') {
                subset.add(arr[j]);
            }
        }
        subsets[subset.size].push(subset);
    }
    return subsets;
}

export default class DAGGrader extends LineBasedGrader {


    inverseLISIndices(answerBlocks, solution) {
        // For more details and a proof of the correctness of the algorithm, see the paper: https://arxiv.org/abs/2204.04196
        let graph = graphToNX(answerBlocks);
        console.log(allSubsets([1,2,3]))

        let seen = new Set();
        let problematicSubgraph = new DiGraph();
        let distractors = [];
        for (let block of solution) {

            if (block.distractor) {
                distractors.push(block);
                continue;
            }

            for (let block2 of seen) {
                let problematic = hasPath(graph, block, block2);
                if (hasPath(graph, block, block2)) {
                    problematicSubgraph.addEdge(block, block2);
                }
            }

            seen.add(block);
        }

        console.log(problematicSubgraph);

        if (problematicSubgraph.numberOfNodes() == 0) {
            // just return the indices of the distractors, I guess???
        } else {
            let mvc = null;
            let subsets = allSubsets(problematicSubgraph.nodes());
            for (let i = 0; i <= problematicSubgraph.numberOfNodes(); i++) {
                for (let subset of subsets[i]) {
                    if (isVertexCover(problematicSubgraph, subset)) {
                        mvc = subset;
                        console.log(mvc)
                        break;
                    }
                }
                if (mvc != null) {
                    break;
                }
            }
        }

        // TODO implement the algorithm properly for the DAG grader so that it is the shortest edit distance
        // to ANY of the correct solutions instead of just to the model solution
        return super.inverseLISIndices(answerBlocks, solution)
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

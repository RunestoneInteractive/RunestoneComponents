import LineBasedGrader from "./lineGrader";
import { DiGraph } from "jsnetworkx/node/classes";
import { hasPath } from "jsnetworkx/node/algorithms/shortestPaths/generic";
import { isDirectedAcyclicGraph } from "jsnetworkx/node/algorithms/dag";

function graphToNX(answerLines) {
    var graph = new DiGraph();
    for (let line1 of answerLines) {
        graph.addNode(line1.tag);
        for (let line2tag of line1.depends) {
            // the depends graph lists the *incoming* edges of a node
            graph.addEdge(line2tag, line1.tag);
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

    inverseLISIndices(arr, inSolution) {
        // For more details and a proof of the correctness of the algorithm, see the paper: https://arxiv.org/abs/2204.04196

        var solution = this.problem.solution;
        var answerLines = inSolution.map(block => block.lines[0]); // assume NOT adaptive for DAG grading (for now)

        let graph = graphToNX(solution);

        let seen = new Set();
        let problematicSubgraph = new DiGraph();
        for (let line1 of answerLines) {
            for (let line2 of seen) {
                let problematic = hasPath(graph, {source: line1.tag, target: line2.tag});
                if (problematic) {
                    problematicSubgraph.addEdge(line1.tag, line2.tag);
                }
            }

            seen.add(line1);
        }

        let mvc = null;
        let subsets = allSubsets(problematicSubgraph.nodes());
        for (let i = 0; i <= problematicSubgraph.numberOfNodes(); i++) {
            for (let subset of subsets[i]) {
                if (isVertexCover(problematicSubgraph, subset)) {
                    mvc = subset;
                    break;
                }
            }
            if (mvc != null) {
                break;
            }
        }

        let indices = ([...mvc].map(tag => {
            for (let i = 0; i < answerLines.length; i++) {
                if (answerLines[i].tag === tag) return i;
            }
        }));
        return indices;
    }

    checkCorrectOrdering(solutionLines, answerLines) {
        if (!(isDirectedAcyclicGraph(graphToNX(solutionLines)))) {
            throw "Dependency between blocks does not form a Directed Acyclic Graph; Problem unsolvable."
        }

        let seen = new Set();
        let isCorrectOrder = true;
        this.correctLines = 0;
        this.solutionLength = solutionLines.length;
        let loopLimit = Math.min(solutionLines.length, answerLines.length);
        for (let i = 0; i < loopLimit; i++) {
            let line = answerLines[i];
            if (line.distractor) {
                isCorrectOrder = false;
            } else {
                for (let j = 0; j < line.depends.length; j++) {
                    if (!seen.has(line.depends[j])) {
                        isCorrectOrder = false;
                    }
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

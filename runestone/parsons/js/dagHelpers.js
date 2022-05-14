/**
 * This file adapted from JSNetworkX: https://github.com/fkling/JSNetworkX
 * Copyright (C) 2012 Felix Kling <felix.kling@gmx.net>
 * JSNetworkX is distributed with the BSD license
 */

function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

function isBoolean(value) {
  var boolTag = '[object Boolean]';
  return value === true || value === false || (isObjectLike(value) && Object.prototype.toString.call(value) == boolTag);
}

function nodesAreEqual(a, b) {
  return a === b || typeof a === 'object' && a.toString() === b.toString();
}

export function hasPath(G, {source, target}) {
    try {
      shortestPath(G, {source, target});
    } catch(error) {
      if (error instanceof JSNetworkXNoPath) {
        return false;
      }
      throw error;
    }
    return true;
  }

function shortestPath(G, {source, target, weight}={}) {
  return bidirectionalShortestPath(G, source, target);
}

function bidirectionalShortestPath(G, source, target) {
  // call helper to do the real work
  var [pred, succ, w] = bidirectionalPredSucc(G, source, target);

  // build path from pred+w+succ
  var path = [];
  // from source to w
  while (w != null) {
    path.push(w);
    w = pred.get(w);
  }
  w = succ.get(path[0]);
  path.reverse();
  // from w to target
  while (w != null) {
    path.push(w);
    w = succ.get(w);
  }
  return path;
}

function bidirectionalPredSucc(G, source, target) {
  // does BFS from both source and target and meets in the middle
  if (nodesAreEqual(source, target)) {
    return [new Map([[source, null]]), new Map([[target, null]]), source];
  }

  // handle either directed or undirected
  var gpred, gsucc;
  gpred = G.predecessorsIter.bind(G);
  gsucc = G.successorsIter.bind(G);

  // predecesssor and successors in search
  var pred = new Map([[source, null]]);
  var succ = new Map([[target, null]]);
  //
  // initialize fringes, start with forward
  var forwardFringe = [source];
  var reverseFringe = [target];
  var thisLevel;

  /*jshint newcap:false*/
  while (forwardFringe.length > 0 && reverseFringe.length > 0) {
    if (forwardFringe.length <= reverseFringe.length) {
      thisLevel = forwardFringe;
      forwardFringe = [];
      for (let v of thisLevel) {
        for (let w of gsucc(v)) {
          if (!pred.has(w)) {
            forwardFringe.push(w);
            pred.set(w, v);
          }
          if (succ.has(w)) {
            return [pred, succ, w]; // found path
          }
        }
      }
    }
    else {
      thisLevel = reverseFringe;
      reverseFringe = [];
      for (let v of thisLevel) {
        for (let w of gpred(v)) {
          if (!succ.has(w)) {
            reverseFringe.push(w);
            succ.set(w, v);
          }
          if (pred.has(w)) {
            return [pred, succ, w]; // found path
          }
        }
      }
    }
  }
  throw new JSNetworkXNoPath('No path between ' + source + ' and ' + target + ".");
}

function topologicalSort(G, optNbunch) {
  // nonrecursive version
  var seen = new Set();
  var orderExplored = []; // provide order and
  // fast search without more general priorityDictionary
  var explored = new Set();

  if (optNbunch == null) {
    optNbunch = G.nodesIter();
  }

  for (let v of optNbunch) { // process all vertices in G
    if (explored.has(v)) {
      return; // continue
    }

    var fringe = [v]; // nodes yet to look at
    while (fringe.length > 0) {
      var w = fringe[fringe.length - 1]; // depth first search
      if (explored.has(w)) { // already looked down this branch
        fringe.pop();
        continue;
      }
      seen.add(w); // mark as seen
      // Check successors for cycles for new nodes
      var newNodes = [];
      /*eslint-disable no-loop-func*/
      G.get(w).forEach(function(_, n) {
        if (!explored.has(n)) {
          if (seen.has(n)) { // CYCLE !!
            throw new JSNetworkXUnfeasible('Graph contains a cycle.');
          }
          newNodes.push(n);
        }
      });
      /*eslint-enable no-loop-func*/
      if (newNodes.length > 0) { // add new nodes to fringe
        fringe.push.apply(fringe, newNodes);
      }
      else {
        explored.add(w);
        orderExplored.unshift(w);
      }
    }
  }

  return orderExplored;
}

export function isDirectedAcyclicGraph(G) {
  try {
    topologicalSort(G);
    return true;
  }
  catch(ex) {
    if (ex instanceof JSNetworkXUnfeasible) {
      return false;
    }
    throw ex;
  }
}

export class DiGraph {

  constructor() {
    this.graph = {}; // dictionary for graph attributes
    this.node = new Map(); // dictionary for node attributes
    // We store two adjacency lists:
    // the predecessors of node n are stored in the dict self.pred
    // the successors of node n are stored in the dict self.succ=self.adj
    this.adj = new Map(); // empty adjacency dictionary
    this.pred = new Map(); // predecessor
    this.succ = this.adj; // successor

    this.edge = this.adj;
  }

  addNode(n) {
    if(!this.succ.has(n)) {
      this.succ.set(n, new Map());
      this.pred.set(n, new Map());
      this.node.set(n);
    }
  }

  addEdge(u, v) {
    // add nodes
    if (!this.succ.has(u)) {
      this.succ.set(u, new Map());
      this.pred.set(u, new Map());
      this.node.set(u, {});
    }

    if (!this.succ.has(v)) {
      this.succ.set(v, new Map());
      this.pred.set(v, new Map());
      this.node.set(v, {});
    }

    // add the edge
    var datadict = this.adj.get(u).get(v) || {};
    this.succ.get(u).set(v, datadict);
    this.pred.get(v).set(u, datadict);
  }

  nodes(optData=false) {
    return Array.from(optData ? this.node.entries() : this.node.keys());
  }

  edges(optNbunch, optData=false) {
    return Array.from(this.edgesIter(optNbunch, optData));
  }

  nodesIter(optData=false) {
    if (optData) {
      return toIterator(this.node);
    }
    return this.node.keys();
  }

  get(n) {
    var value = this.adj.get(n);
    if (typeof value === 'undefined') {
      throw new KeyError('Graph does not contain node ' + n + '.');
    }
    return value;
  }

  numberOfNodes() {
    return this.node.size;
  }

  *nbunchIter(optNbunch) {
    if (optNbunch == null) { // include all nodes
      /*jshint expr:true*/
      yield* this.adj.keys();
    }
    else if (this.hasNode(optNbunch)) { // if nbunch is a single node
      yield optNbunch;
    }
    else { // if nbunch is a sequence of nodes
      var adj = this.adj;

      try {
        for (var n of toIterator(optNbunch)) {
          if (adj.has(n)) {
            yield n;
          }
        }
      }
      catch(ex) {
        if (ex instanceof TypeError) {
          throw new JSNetworkXError(
            'nbunch is not a node or a sequence of nodes'
          );
        }
      }
    }
  }

  *edgesIter(optNbunch, optData=false) {
    // handle calls with opt_data being the only argument
    if (isBoolean(optNbunch)) {
      optData = optNbunch;
      optNbunch = undefined;
    }

    var nodesNbrs;

    if (optNbunch === undefined) {
      nodesNbrs = this.adj;
    }
    else {
      nodesNbrs = mapIterator(
        this.nbunchIter(optNbunch),
        n => tuple2(n, this.adj.get(n))
      );
    }

    for (var nodeNbrs of nodesNbrs) {
      for (var nbrData of nodeNbrs[1]) {
        var result = [nodeNbrs[0], nbrData[0]];
        if (optData) {
          result[2] = nbrData[1];
        }
        yield result;
      }
    }
  }


  reverse(optCopy=true) {
    var H;
    if(optCopy) {
      H = new this.constructor(null, {name: 'Reverse of (' + this.name + ')'});
      H.addNodesFrom(this);
      H.addEdgesFrom(mapIterator(
        this.edgesIter(null, true),
        edge => tuple3c(edge[1], edge[0], deepcopy(edge[2]), edge)
      ));
      H.graph = deepcopy(this.graph);
      H.node = deepcopy(this.node);
    }
    else {
      var thisPred = this.pred;
      var thisSucc = this.succ;

      this.succ = thisPred;
      this.pred = thisSucc;
      this.adj = this.succ;
      H = this;
    }
    return H;
  }

  successorsIter(n) {
    var nbrs = this.succ.get(n);
    if (nbrs !== undefined) {
      return nbrs.keys();
    }
    throw new JSNetworkXError(
      sprintf('The node "%j" is not in the digraph.', n)
    );
  }

  predecessorsIter(n) {
    var nbrs = this.pred.get(n);
    if (nbrs !== undefined) {
      return nbrs.keys();
    }
    throw new JSNetworkXError(
      sprintf('The node "%j" is not in the digraph.', n)
    );
  }

  successors(n) {
    return Array.from(this.successorsIter(n));
  }

  predecessors(n) {
    return Array.from(this.predecessorsIter(n));
  }

}

class JSNetworkXException {
  constructor(message) {
    this.name = 'JSNetworkXException';
    this.message = message;
  }
}

class JSNetworkXAlgorithmError extends JSNetworkXException {
  constructor(message) {
    super(message);
    this.name = 'JSNetworkXAlgorithmError';
  }
}

class JSNetworkXError extends JSNetworkXException {
  constructor(message) {
    super(message);
    this.name = 'JSNetworkXError';
  }
}

class JSNetworkXUnfeasible extends JSNetworkXAlgorithmError {
  constructor(message) {
    super(message);
    this.name = 'JSNetworkXUnfeasible';
  }
}

class JSNetworkXNoPath extends JSNetworkXUnfeasible {
  constructor(message) {
    super(message);
    this.name = 'JSNetworkXNoPath';
  }
}

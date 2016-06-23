/* parsons.js
=== This file contains the JS for the Runestone Parsons component
=== Contributors:
===== Isaiah Mayerchak
===== Barbara Ericson
===== Jeff Rick
=== Adapted from the original JS Parsons by
===== Ville Karavirta
===== Petri Ihantola
===== Juha Helminen
===== Mike Hewner
*/

// An object to grade the Parsons code
var LineBasedGrader = function(problem) {
	this.problem = problem;
};

// Use a LIS (Longest Increasing Subsequence) algorithm to return the indexes
// that are not part of that subsequence.
LineBasedGrader.prototype.inverseLISIndices = function(arr) {
	// Get all subsequences
	var allSubsequences = [];
	for (var i = 0; i < arr.length; i++){
		var subsequenceForCurrent = [arr[i]],
			current = arr[i],
			lastElementAdded = -1;
		for (var j = i; j < arr.length; j++) {
			var subsequent = arr[j];
			if ((subsequent > current) && (lastElementAdded < subsequent)) {
				subsequenceForCurrent.push(subsequent);
				lastElementAdded = subsequent;
			}
		}
		allSubsequences.push(subsequenceForCurrent);
	}
	// Figure out the longest one
	var longestSubsequenceLength = -1;
	var longestSubsequence;
    for (var i in allSubsequences) {
    	var subs = allSubsequences[i];
    	if (subs.length > longestSubsequenceLength) {
    		longestSubsequenceLength = subs.length;
            longestSubsequence = subs;
        }
    }
    // Create the inverse indexes
    var indexes = [];
    var lIndex = 0;
    for (var i = 0; i < arr.length; i++) {
    	if (lIndex > longestSubsequence.length) {
    		indexes.push(i);
    	} else {
    		if (arr[i] == longestSubsequence[lIndex]) {
    			lIndex += 1;
    		} else {
    			indexes.push(i);
    		}
    	}
    }
    return indexes;
};

// grade that element, returning the state
LineBasedGrader.prototype.grade = function() {
	var problem = this.problem;
	var correct = false;
	var answerArea = $("#" + problem.counterId + "-answer");
	var feedbackArea = $("#" + problem.counterId + "-message");
	var solutionLines = problem.solutionLines();
	var answerLines = problem.answerLines();
	var i;
	var state;
	
	if (answerLines.length < solutionLines.length) {
		state = "incorrectTooShort";
		// too little code
		answerArea.addClass("incorrect");
		feedbackArea.fadeIn(500);
		feedbackArea.attr("class", "alert alert-danger");
		feedbackArea.html("Your program is too short.");
	} else {
		// Determine whether the code is in the correct order
		var isCorrectOrder = false;
		if (answerLines.length == solutionLines.length) {
			isCorrectOrder = true;
			for (i = 0; i < solutionLines.length; i++) {
				if (answerLines[i].text !== solutionLines[i].text) {
					isCorrectOrder = false;
				}
			}
		}
		if (isCorrectOrder) {
			// Determine whether it is the correct indention
			var incorrectIndention = [];
			for (i = 0; i < solutionLines.length; i++) {
				if (answerLines[i].viewIndent() !== solutionLines[i].modelIndent()) {
					incorrectIndention.push(answerLines[i]);
				}
			}
			if (incorrectIndention.length == 0) {
				// Perfect
				state = "correct";
				answerArea.addClass("correct");
				feedbackArea.fadeIn(100);
				feedbackArea.attr("class", "alert alert-success");
				feedbackArea.html("Perfect!");
				correct = true;
			} else {
				// Incorrect Indention
				state = "incorrectIndentation";
				var incorrectBlocks = [];
				for (i = 0; i < incorrectIndention.length; i++) {
					block = incorrectIndention[i].block;
					if (incorrectBlocks.indexOf(block) == -1) {
						incorrectBlocks.push(block);
						block.markIncorrectIndent();
					}
				}
				answerArea.addClass("incorrect");
				feedbackArea.fadeIn(500);
				feedbackArea.attr("class", "alert alert-danger");
				if (incorrectBlocks.length == 1) {
					feedbackArea.html("This block is not indented correctly. Either indent it more by dragging it right or reduce the indention by dragging it left.");
				} else {
					feedbackArea.html("These blocks are not indented correctly. To indent a block more, drag it to the right. To reduce the indention, drag it to the left.");
				}
			}
		} else {
			// Incorrect: indicate which blocks to move
			state = "incorrectMoveBlocks";
			var answerBlocks = problem.answerBlocks();
			var inSolution = [];
			var inSolutionIndexes = [];
			var notInSolution = [];
			for (i = 0; i < answerBlocks.length; i++) {
				var block = answerBlocks[i];
				var index = solutionLines.indexOf(block.lines[0]);
				if (index == -1) {
					notInSolution.push(block);
				} else {
					inSolution.push(block);
					inSolutionIndexes.push(index);
				}
			}
			var lisIndexes = this.inverseLISIndices(inSolutionIndexes);
			for (i = 0; i < lisIndexes.length; i++) {
				notInSolution.push(inSolution[lisIndexes[i]]);
			}
			answerArea.addClass("incorrect");
			feedbackArea.fadeIn(500);
			feedbackArea.attr("class", "alert alert-danger");
			for (i = 0; i < notInSolution.length; i++) {
				notInSolution[i].markIncorrectPosition();
			}
			feedbackArea.html("Highlighted blocks in your program are wrong or are in the wrong order. This can be fixed by moving, removing, or replacing highlighted blocks.");
		}
	}
	return state;
};

// Create a line object with the following
//   problem: the Parsons problem
//   block: the block that this line is in
//   text: the text of the code line
//   indent: the indent level
//   index: the index of the line
//   id: the unique id
var ParsonsLine = function(codestring, block) {
	this.block = block;
	this.problem = block.problem;
	var trimmed = codestring.replace(/\s*$/, "");
	this.text = trimmed.replace(/^\s*/, "");
	this.indent = trimmed.length - this.text.length;
};

// Answer the indent of this codeline as determined by the view (answer)
ParsonsLine.prototype.viewIndent = function() {
	var indent = this.indent;
	if (this.problem.options.noindent) {
		indent += this.block.indent;
	} else {
		indent += this.block.viewIndent;
	}
	return indent;
}

// Answer the indent of this codeline as determined by the model (solution)
ParsonsLine.prototype.modelIndent = function() {
	return this.indent + this.block.indent;
}

// Answer an HTML representation of this codeline
ParsonsLine.prototype.asHTML = function() {
	var html, end;
	if (this.problem.options.language == "natural") {
		html = '<p id="' + this.id + '" class="';
		end = '<\/p>';
	} else {
		html = '<code id="' + this.id + '" class="' + this.problem.prettifyLanguage;
		end = '<\/code>';
	}
	var indent = this.indent;
	if (this.problem.options.noindent) {
		indent += this.block.indent;
	}
	if (indent > 0) {
		html += ' indent' + indent;
	}
	html += '">' + this.text + end;
	return html;
};

// Answer a text representation (i.e. code) of this codeline
ParsonsLine.prototype.asText = function() {
	var text = '';
	var indent = this.indent + this.block.indent;
	for (var i = 0; i < indent; i++) {
		// four spaces for each indent
		text += '    ';
	}
	text += this.text;
	return text;
};

// Create a code block object based on the codestring
//   problem: the Parsons problem
//   index: index of the block (could be an array)
//   lines: an array of ParsonsLine
//   indent: how indented is the code based on spaces
//   distractor: boolean as to whether it is not part of the solution
//   paired: boolean whether this distractor should be paired with last valid line
var ParsonsBlock = function(codestring, problem) {
	this.problem = problem;
	this.lines = [];
	this.indent = 0;
	if (codestring) {
		var code = codestring;
		var options = {};
		// Figure out options based on the #option and #option=value syntax
		// Remove the options from the code
		code = code.replace(/#(\w+)=(\w+)/, function(mystring, arg1, arg2) {
			options[arg1] = arg2;
			return ""
		});
		code = code.replace(/#(\w+)/, function(mystring, arg1) {
			options[arg1] = true;
			return ""
		});
		
		// Based on the options, determine the distractors
		if (options["paired"]) {
			// paired distractor
			delete options["paired"];
			this.distractor = true;
			this.paired = true;
		} else if (options["distractor"]) {
			// distractor
			delete options["distractor"];
			this.distractor = true;
			this.paired = false;
		} else {
			// This line is part of the solution
			this.distractor = false;
			this.paired = false;
		}
		
		//Report unused options
		for (var option in options) {
			console.log(option + " is not a valid #option for a code block");
		}
		
		code = code.split("\n");
		var lines = [];
		for (var i = 0; i < code.length; i++) {
			if (code[i].length > 0) {
				lines.push(new ParsonsLine(code[i], this));
			}
		}
		this.lines = lines;
	}
};

// Answer a string that represents this codeblock for saving
ParsonsBlock.prototype.hash = function() {
	var hash = "";
	if (this.index.constructor === Array) {
		for (var i = 0; i < this.index.length; i++) {
			hash += this.index[i] + "_";
		}
	} else {
		hash += this.index + "_";
	}
	hash += this.viewIndent;
	return hash;
};

// Answer an HTML representation of this codeblock
ParsonsBlock.prototype.asHTML = function() {
	var html = '<div id="' + this.id + '" class="block">';
	for (var i = 0; i < this.lines.length; i++) {
		html += this.lines[i].asHTML();
	}
	html += '<\/div>';
	return html;
};

// Answer a text representation (i.e. code) of this codeblock
ParsonsBlock.prototype.asText = function() {
	var text = this.lines[0].asText;
	for (var i = 1; i < this.lines.length; i++) {
		text += '\n' + this.lines[i].asText();
	}
	return text;
};

// Return the DOM element for the codeblock
ParsonsBlock.prototype.elem = function() {
	return $("#" + this.id);
};

// Mark the view for this codeblock as correct position
ParsonsBlock.prototype.markCorrect = function() {
	this.elem().addClass("correctPosition");
};

// Mark the view for this codeblock as incorrect position
ParsonsBlock.prototype.markIncorrectPosition = function() {
	this.elem().addClass("incorrectPosition");
};

// Mark the view for this codeblock as the incorrect indent
ParsonsBlock.prototype.markIncorrectIndent = function() {
	this.elem().addClass("incorrectIndent");
};

// expose the type for testing, extending etc
window.ParsonsBlock = ParsonsBlock;

var prsList = {};    // Parsons dictionary

// <pre> constructor
function Parsons (opts) {
    if (opts) {
        this.init(opts);
    }
}
Parsons.prototype = new RunestoneBase();
Parsons.counter = 0;

Parsons.prototype.init = function (opts) {
	RunestoneBase.apply(this, arguments);
	var orig = opts.orig;     // entire <pre> element that will be replaced by new HTML
	this.origElem = orig;
	this.useRunestoneServices = opts.useRunestoneServices;
	this.divid = orig.id;
	// Set the storageId (key for storing data)
	var storageId = eBookConfig.email;
	if (storageId == undefined) {
		storageId = this.divid;
	} else {
		storageId += this.divid;
	}
	this.storageId = storageId;
	
	this.children = this.origElem.childNodes;     // this contains all of the child elements of the entire tag...
	this.contentArray = [];
	Parsons.counter++;     //    Unique identifier
	this.counterId = "parsons-" + Parsons.counter;
	// Find the question text and store it in .question
	this.question = null;
	for (var i = 0; i < this.children.length; i++) {
		if ($(this.children[i]).is("[data-question]")) {
			this.question = this.children[i];
			break;
		}
	}

	this.createOptions();
 	this.feedback_exists = false;
	this.grader = new LineBasedGrader(this);
	this.prettifyLanguage = {
		"python" : "prettyprint lang-py",
		"java" : "prettyprint lang-java",
		"javascript" : "prettyprint lang-js",
		"html" : "prettyprint lang-html",
		"c" : "prettyprint lang-c",
		"c++" : "prettyprint lang-cpp",
		"ruby" : "prettyprint lang-rb"
	}[this.options["language"]];
	if (this.prettifyLanguage == undefined) {
		this.prettifyLanguage = "";
	}
    var fulltext = $(this.origElem).html();
    var delimiter = this.question.outerHTML;
    var temp = fulltext.split(delimiter);
    var content = temp[1];
    this.initializeBlocks(content);
    // Check the server for an answer to complete things
	this.checkServer("parsons");

	this.createHTML();
};

// Based on the data-fields in the original HTML, create the options
Parsons.prototype.createOptions = function() {
	var options = {
		"pixelsPerIndent" : 30
    };
    // add maxdist and order if present
    var maxdist = $(this.origElem).data('maxdist');
    var order = $(this.origElem).data('order');
    var noindent = $(this.origElem).data('noindent');
    if (maxdist !== undefined) {
	    options["maxdist"] = maxdist;
	}
	if (order !== undefined) {
		// convert order string to array of numbers
		order = order.match(/\d+/g);
		for (var i = 0; i < order.length; i++) {
			order[i] = parseInt(order[i]);
		}
		options["order"] = order;
	}
	if (noindent == undefined) {
		noindent = false;
	}
	options["noindent"] = noindent;
	// add locale and language
	var locale = eBookConfig.locale;
	if (locale == undefined) {
		locale = "en";
	}
	options["locale"] = locale;
	var language = $(this.origElem).data('language');
	if (language == undefined) {
		language = eBookConfig.language;
		if (language == undefined) {
			language = "python";
		}
	}
	options["language"] = language;
	this.options = options;
};

// Based on what is specified in the original HTML, create HTML
Parsons.prototype.createHTML = function () {
	var html = '\
<div id="' + this.counterId + '" class="parsons alert alert-warning">\
	<div class="parsons-text">' + this.question.innerHTML + '<\/div>\
	<div style="clear: left"><\/div>\
	<div id="' + this.counterId + '-orig" style="display: none">' + this.fmtCode + '<\/div>\
	<div class="sortable-code-container">\
		<div id="' + this.counterId + '-sourceRegion" class="sortable-code">\
			<p>Drag from here<\/p>\
			<div id="' + this.counterId + '-source" class="source"><\/div>\
		<\/div>\
		<div id="' + this.counterId + '-answerRegion" class="sortable-code">\
			<p>Drop blocks here<\/p>\
			<div id="' + this.counterId + '-answer"><\/div>\
		<\/div>\
	<\/div>\
	<div style="clear: left"><\/div>\
	<div class="parsons-controls">\
		<button id="' + this.counterId + '-check" class="btn btn-default">Check Me<\/button>\
		<button id="' + this.counterId + '-reset" class="btn btn-default">Reset<\/button>\
		<div id="' + this.counterId + '-message"><\/div>\
	<\/div>\
<\/div>';
	$('#' + this.counterId + '-message').hide();
	$(this.origElem).replaceWith(html);
	// Set the function of the buttons
	$('#' + this.counterId + '-reset').click(function (event) {
		this.clearFeedback();
		event.preventDefault();
		this.resetView();
		this.log("reset");
	}.bind(this));
	$('#' + this.counterId + '-check').click(function (event) {
		event.preventDefault();
		this.logAnswer(this.grader.grade());
		this.setLocalStorage();
	}.bind(this));	
};

// Will be implemented later to fix evaluation for parsons
Parsons.prototype.reInitialize = function () {
    // this.reInitialize()
    return null;
};

// Return a date from a timestamp (either mySQL or JS format)
Parsons.prototype.dateFromTimestamp = function(timestamp) {
	var date = new Date(timestamp);
	if (isNaN(date.getTime())) {
		var t = timestamp.split(/[- :]/);
		date = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
	}
	return date;
};

// Return the argument that is newer based on the timestamp
Parsons.prototype.newerData = function(dataA, dataB) {
	var dateA = dataA.timestamp;
	var dateB = dataB.timestamp;
	if (dateA == undefined) {
		return dateB;
	}
	if (dateB == undefined) {
		return dateA;
	}
	dateA = this.dateFromTimestamp(dateA);
	dateB = this.dateFromTimestamp(dateB);
	if (dateA > dateB) {
		return dataA;
	} else {
		return dataB;
	}
};

// Based on the data, load
Parsons.prototype.loadData = function(data) {
	var sourceHash = data.source;
	if (sourceHash == undefined) {
		// maintain backwards compatibility
		sourceHash = data.trash;
	}
	var answerHash = data.answer;
	if ((sourceHash == undefined) || (answerHash == undefined)) {
		// first time loading
		this.resetView();
	} else {
		this.createView(this.blocksFromHash(sourceHash), this.blocksFromHash(answerHash));
		this.grader.grade();
	}
};

// Return what is stored in local storage
Parsons.prototype.localData = function() {
	var data = localStorage.getItem(this.storageId);
	if (data !== null) {
		data = JSON.parse(data);
	} else {
		data = {};
	}
	return data;
};

// RunestoneBase: Sent when the server has data
Parsons.prototype.restoreAnswers = function(serverData) {
	this.loadData(this.newerData(this.localData(), serverData));
};

// RunestoneBase: Load what is in local storage
Parsons.prototype.checkLocalStorage = function () {
	this.loadData(this.localData());
};

// RunestoneBase: Set the state of the problem in local storage
Parsons.prototype.setLocalStorage = function(data) {
	var toStore;
	if (data == undefined) {
		toStore = {
			"source" : this.sourceHash(),
			"answer" : this.answerHash(),
			"timestamp" : new Date()
		};
	} else {
		toStore = data;
	}
	localStorage.setItem(this.storageId, JSON.stringify(toStore));
};

// Initialize Parsons problem with the following properties
//   blocks: an array of blocks as they are specified in the HTML text
//   solution: the array of codeblocks that is the solution
Parsons.prototype.initializeBlocks = function(text) {
	var that = this;
	var prefix = this.counterId + "-block-";
	
	// Create the initial blocks
    var textBlocks = text.split("---");
    if (textBlocks.length === 1) {
    	// If there are no ---, then every line is its own block
        textBlocks = text.split("\n");
    }

	var aBlock, blocks = [];
	$.each(textBlocks, function(index, item) {
		if (/\S/.test(item)) {
			aBlock = new ParsonsBlock(item, that);
			aBlock.index = index;
			aBlock.id = prefix + index;
			aBlock.viewIndent = 0;
			blocks.push(aBlock);
		}
	});
	// Normalize the indents & Add index / id to lines
	var indents = [];
	var linesIndex = 0;
	for (i = 0; i < blocks.length; i++) {
		aBlock = blocks[i];
		for (var j = 0; j < aBlock.lines.length; j++) {
			var aLine = aBlock.lines[j];
			aLine.index = linesIndex;
			aLine.id = this.counterId + "-line-" + linesIndex;
			linesIndex += 1;
			var value = aBlock.indent + aLine.indent;
			if ($.inArray(value, indents) == -1) {
				indents.push(value);
			}
		}
	}
	indents = indents.sort(function(a, b){return a-b});
	for (i = 0; i < blocks.length; i++) {
		aBlock = blocks[i];
		var minIndent = 1000;
		for (j = 0; j < aBlock.lines.length; j++) {
			aLine = aBlock.lines[j];
			value = aBlock.indent + aLine.indent;
			value = indents.indexOf(value);
			aLine.indent = value;
			minIndent = Math.min(minIndent, value);
		}
		aBlock.indent = minIndent;
		for (j = 0; j < aBlock.lines.length; j++) {
			aLine = aBlock.lines[j];
			aLine.indent -= minIndent;
		}
	}
	
	// For convenience sake, create the solution.
	// Note that this can always be reconstructed from the blocks
	var solution = [];
	$.each(blocks, function(index, item) {
		if (!item.distractor) {
			solution.push(item);
		}
	});
	this.blocks = blocks;
	this.solution = solution;
};

// Create a hash that identifies the block order and indention
Parsons.prototype.getHash = function(searchString) {
	var hash = [],
		divs = $(searchString)[0].getElementsByTagName('div'),
		block;
	for (var i = 0; i < divs.length; i++) {
		block = this.getBlockById(divs[i].id);
		if (block !== undefined) {
			hash.push(block.hash());
		}
	}
	//prefix with something to handle empty output situations
	if (hash.length === 0) {
		return "-";
	} else {
		return hash.join("-");
	}
};

// Answer the hash of the answer area
Parsons.prototype.answerHash = function() {
   return this.getHash("#" + this.counterId + "-answer");
};

// Answer the hash of the source area
Parsons.prototype.sourceHash = function() {
   return this.getHash("#" + this.counterId + "-source");
};

// Return a codeblock that corresponds to the hash
Parsons.prototype.blockFromHash = function(hash) {
	var split = hash.split("_");
	var block = this.blocks[Number(split[0])];
	if (this.options.noindent) {
		block.viewIndent = 0;
	} else {
		block.viewIndent = Number(split[1]);
	}
	return block;
};

// Return an array of codeblocks that corresponds to the hash
Parsons.prototype.blocksFromHash = function(hash) {
	var split;
	if (hash === "-" || hash === "" || hash === null) {
		split = [];
	} else {
		split = hash.split("-");
	}
	var blocks = [];
	for (var i = 0; i < split.length; i++) {
		blocks.push(this.blockFromHash(split[i]));
	}
	return blocks;
};

// Log the activity to the server:
//   start: the user started interacting with this problem
//   move: the user moved a block
//   reset: the reset button was pressed
Parsons.prototype.log = function(activity) {
	var act = activity + "|" + this.sourceHash() + "|" + this.answerHash();
	var divid = this.divid;
	this.logBookEvent({
		"event" : "parsons",
		"act" : act,
		"div_id" : divid
	});
};

// Log the activity based on the answer
//   correct: The answer given matches the solution
//   incorrect*: The answer is wrong for various reasons
Parsons.prototype.logAnswer = function(answer) {
	var answerHash = this.answerHash();
	var sourceHash = this.sourceHash();
	var act = sourceHash + "|" + answerHash;
	var correct;
	if (answer == "correct") {
		act = "correct|" + act;
		correct = "T";
	} else {
		act ="incorrect|" + act;
		correct = "F";
	}
	this.logBookEvent({
		"event" : "parsons", 
		"act" : act,
		"div_id" : this.divid, 
		"correct" : correct,
		"answer" : answerHash,
		"source" : sourceHash
	});
};

// Return a block object by the full id including id prefix
Parsons.prototype.getBlockById = function(id) {
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		if (block.id == id) {
			return block;
		}
	}
	return undefined;
};

// Retrieve the codelines based on what is in the DOM
Parsons.prototype.getModifiedCode = function(search_string) {
	var codeLines = [];
	var that = this;
	$(search_string + " div").each(function(idx, i) {
		var domItem = $(i);
		var lineItem = that.getBlockById(domItem[0].id);
		codeLines.push(lineItem);	
	});
	return codeLines;
};

// Return array of codeblocks based on what is in the answer field
Parsons.prototype.answerBlocks = function() {
	var that = this;
	var answerBlocks = [];
	$("#" + this.counterId + "-answer div").each(function(idx, i) {
		answerBlocks.push(that.getBlockById($(i)[0].id));
	});
	return answerBlocks;
};

// Return array of codelines based on what is in the answer field
Parsons.prototype.answerLines = function() {
	var that = this;
	var answerLines = [];
	var blocks = this.answerBlocks();
	for (var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		for (var j = 0; j < block.lines.length; j++) {
			answerLines.push(block.lines[j]);
		}
	}
	return answerLines;
};

// Return array of codelines based on what is in the solution
Parsons.prototype.solutionLines = function() {
	var solutionLines = [];
	for (var i = 0; i < this.solution.length; i++) {
		var lines = this.solution[i].lines;
		for (var j = 0; j < lines.length; j++) {
			solutionLines.push(lines[j]);
		}
	}
	return solutionLines;
};

// Clear any feedback from the answer area
Parsons.prototype.clearFeedback = function() {
	$("#" + this.counterId + "-answer").removeClass("incorrect correct");
	var blocks = $("#" + this.counterId + "-answer div");
	blocks.removeClass("correctPosition incorrectPosition incorrectIndent");
	$("#" + this.counterId + "-message").hide();
};

// A function for returning a shuffled version of an array
Parsons.prototype.shuffled = function(array) {
	var currentIndex = array.length;
	var returnArray = array.slice();
	var temporaryValue, randomIndex;
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		// And swap it with the current element.
		temporaryValue = returnArray[currentIndex];
		returnArray[currentIndex] = returnArray[randomIndex];
		returnArray[randomIndex] = temporaryValue;
	}
	return returnArray;
};

// Based on the movingId, etc., establish the moving state
//   rest: not moving
//   source: moving inside source area
//   answer: moving inside answer area
//   moving: moving outside areas
Parsons.prototype.movingState = function() {
	if (this.movingId == undefined) {
		return "rest";
	}
	var moving = $("#" + this.movingId);
	var x = this.movingX;
	var y = this.movingY;
	// Check if in answer area
	var left = this.answerArea.offset().left;
	var right = left + this.answerArea.outerWidth();
	var top = this.answerArea.offset().top;
	var bottom = top + this.answerArea.outerHeight();
	if (x >= left && (x <= right) && (y >= top) && (y <= bottom)) {
		return "answer";
	}
	// Check if in source area
	left = this.sourceArea.offset().left;
	right = left + this.sourceArea.outerWidth();
	top = this.sourceArea.offset().top;
	bottom = top + this.sourceArea.outerHeight();
	if (x >= left && (x <= right) && (y >= top) && (y <= bottom)) {
		return "source";
	}
	return "moving";
}

// Update the Parsons view
// This gets called when dragging a block
Parsons.prototype.updateView = function() {
	// Based on the new and the old state, figure out what to update
	var state = this.state;
	var newState = this.movingState();
	var updateSource = true;
	var updateAnswer = true;
	var updateMoving = newState == "moving";
	if (state == newState) {
		if (newState == "rest") {
			updateSource = false;
			updateAnswer = false;
		} else if (newState == "source") {
			updateAnswer = false;
		} else if (newState == "answer") {
			updateSource = false;
		} else if (newState == "moving") {
			updateAnswer = false;
			updateSource = false;
		}
	}
	var moving = undefined;
	var movingHeight;
	if (this.movingId !== undefined) {
		moving = $("#" + this.movingId);
		// Must get height here as detached items don't have height
		movingHeight = moving.outerHeight(true);
		moving.detach();
	}
	
	var positionTop, width;
	var that = this;
	var baseWidth = this.areaWidth - 22;
	
	// Update the Source Area
	if (updateSource) {
		positionTop = 0;
		if (newState == "source") {
			var hasInserted = false;
			var x = this.movingX - this.sourceArea.offset().left - baseWidth / 2 - 11;
			var y = this.movingY - this.sourceArea.offset().top;
			$("#" + this.counterId + "-source div").each(function(idx, i) {
				item = $(i);
				if (item[0].id !== "") {
					if (!hasInserted) {
						if (y - positionTop < (movingHeight + item.outerHeight(true)) / 2) {
							hasInserted = true;
							moving.insertBefore("#" + item[0].id);
							moving.css({
								'left' : x,
								'top' : y - movingHeight / 2,
								'width' : baseWidth,
								'z-index' : 2
							});
							positionTop = positionTop + movingHeight;
						}
					}
					item.css({
						'left' : 0,
						'top' : positionTop,
						'width' : baseWidth,
						'z-index' : 1
					});
					positionTop = positionTop + item.outerHeight(true);
				}
			});
			if (!hasInserted) {
				moving.appendTo("#" + this.counterId + "-source");
				moving.css({
					'left' : x,
					'top' : y - moving.outerHeight(true) / 2,
					'width' : baseWidth,
					'z-index' : 2
				});
			}
		} else {
			$("#" + this.counterId + "-source div").each(function(idx, i) {
				item = $(i);
				if (item[0].id !== "") {
					item.css({
						'left' : 0,
						'top' : positionTop,
						'width' : baseWidth,
						'z-index' : 1
					});
					positionTop = positionTop + item.outerHeight(true);
				}
			});
		}
	}
	
	// Update the Answer Area
	if (updateAnswer) {
		var block, indent;
		positionTop = 0;
		width = this.areaWidth + this.indent * this.options.pixelsPerIndent - 22;
		var that = this;
		if (newState == "answer") {
			var hasInserted = false;
			var x = this.movingX - this.answerArea.offset().left - baseWidth / 2 - 11;
			movingIndent = Math.round(x / this.options.pixelsPerIndent);
			if (movingIndent < 0) {
				movingIndent = 0;
			} else if (movingIndent > this.indent) {
				movingIndent = this.indent;
			} else {
				x = movingIndent * this.options.pixelsPerIndent;
			}
			var y = this.movingY - this.answerArea.offset().top;
			block = this.getBlockById(this.movingId);
			block.viewIndent = movingIndent;
			$("#" + this.counterId + "-answer div").each(function(idx, i) {
				item = $(i);
				if (item[0].id !== "") {
					if (!hasInserted) {
						if (y - positionTop < (movingHeight + item.outerHeight(true)) / 2) {
							hasInserted = true;
							moving.insertBefore("#" + item[0].id);
							moving.css({
								'left' : x,
								'top' : y - movingHeight / 2,
								'width' : baseWidth,
								'z-index' : 2
							});
							positionTop = positionTop + movingHeight;
						}
					}
					block = that.getBlockById(item[0].id);
					indent = block.viewIndent * that.options.pixelsPerIndent;
					item.css({
						'left' : indent,
						'top' : positionTop,
						'width' : width - indent,
						'z-index' : 1
					});
					positionTop = positionTop + item.outerHeight(true);
				}
			});
			if (!hasInserted) {				
				moving.appendTo("#" + this.counterId + "-answer");
				moving.css({
					'left' : x,
					'top' : y - moving.outerHeight(true) / 2,
					'width' : baseWidth,
					'z-index' : 2
				});
			}
		} else {
			$("#" + this.counterId + "-answer div").each(function(idx, i) {
				item = $(i);
				if (item[0].id !== "") {
					block = that.getBlockById(item[0].id);
					indent = block.viewIndent * that.options.pixelsPerIndent;
					item.css({
						'left' : indent,
						'top' : positionTop,
						'width' : width - indent,
						'z-index' : 1
					});
					positionTop = positionTop + item.outerHeight(true);
				}
			});
		}
	}

	// Update the Moving Area
	if (updateMoving) {
		moving.appendTo("#" + this.counterId + "-source");
		moving.css({
			'left' : this.movingX - this.sourceArea.offset().left - (moving.outerWidth(true) / 2),
			'top' : this.movingY - this.sourceArea.offset().top - (movingHeight / 2),
			'width' : baseWidth,
			'z-index' : 2
		});
	}
	
	state = newState;
	this.state = state;
};

// Reset the view based on this.blocks accounting for
//   * shorten to the distractors to maxdist size
//   * if an order is specified, then use that
//   * else shuffle the blocks randomly, accounting for paired distractors
//   * call createView with the shuffled blocks in the source field
Parsons.prototype.resetView = function() {
	var blocks = [], i, aBlock;
	for (i = 0; i < this.blocks.length; i++) {
		blocks.push(this.blocks[i]);
	}
	
	// Trim the distractors (if necessary)
	if (this.options.maxdist !== undefined) {
		var distractorIDs = [];
		for (i = 0; i < blocks.length; i++) {
			distractorIDs.push(blocks[i].id);
		}
		if (this.options.maxdist < distractorIDs.length) {
			distractorIDs = this.shuffled(distractorIDs);
			distractorIDs = distractorIDs.slice(0, this.options.maxdist - 1);
			var trimmed = [];
			for (i = 0; i < blocks.length; i++) {
				aBlock = blocks[i];
				if (aBlock.distractor) {
					if ($.inArray(aBlock.id, distractorIDs)) {
						trimmed.push(aBlock);
					}
				} else {
					trimmed.push(aBlock);
				}
			}
			blocks = trimmed;
		}
	}
	
	// Reorder the sourceBlock
	var sourceBlocks = [];
	if (this.options.order === undefined) {
		// Shuffle, respecting paired distractors
		var chunks = [], chunk = [];
		$.each(blocks, function(index, item) {
			if (item.paired) {
				chunk.push(item);
			} else {
				chunk = [];
				chunk.push(item);
				chunks.push(chunk);
			}
		});
		chunks = this.shuffled(chunks);
		for (var c = 0; c < chunks.length; c++) {
			chunk = chunks[c];
			if (chunk.length > 1) {
				// shuffle paired distractors
				chunk = this.shuffled(chunk);
				for (i = 0; i < chunk.length; i++) {
					sourceBlocks.push(chunk[i]);
				}
			} else {
				sourceBlocks.push(chunk[0]);
			}
		}
	} else {
		// Use the specified order to create the sourceBlocks
		// Note that any lines not specified in the order are deleted
		var order = this.options.order;
		for (i = 0; i < order.length; i++) {
			for (var j = 0; j < blocks.length; j++) {
				if (blocks[j].index === order[i]) {
					sourceBlocks.push(blocks[j]);
				}
			}
		}
	}
	this.createView(sourceBlocks, []);
};

// Go up the hierarchy until you get to a block; return the id
Parsons.prototype.getBlockIdFor = function(element) {
	var check = element;
	while (!check.classList.contains("block")) {
		check = check.parentElement;
	}
	return check.id;
};

// Based on the blocks, create the view and insert it into the DOM
Parsons.prototype.createView = function(sourceBlocks, answerBlocks) {
	var html, i;
	// Add blocks to source
	html = '';
	for (i = 0; i < sourceBlocks.length; i++) {
		html += sourceBlocks[i].asHTML();
	}	
	$("#" + this.counterId + "-source").html(html);
	// Add blocks to answer
	html = ''			
	for (i = 0; i < answerBlocks.length; i++) {
		html += answerBlocks[i].asHTML();
	}
	$("#" + this.counterId + "-answer").html(html);
	
	if (this.prettifyLanguage !== "") {
		prettyPrint();
	}
	
	// Determine how much indent should be possible in the answer area
	var indent = 0;
	if (!this.options.noindent) {
		// Set the indent so that the solution is possible
		if (this.options.language !== "natural") {
			// Even if no indent is required, have a minimum of 1 indent
			indent = 1;
		}
		for (var i = 0; i < this.solution.length; i++) {
			indent = Math.max(indent, this.solution[i].indent);
		}
	}
	this.indent = indent;

	var answerArea = $("#" + this.counterId + "-answer");
	var sourceArea = $("#" + this.counterId + "-source");
	this.answerArea = answerArea;
	this.sourceArea = sourceArea;
	// Set the size of the areas, but do it only
	// otherwise timedparsons will be wrong on reload
	var areaWidth, areaHeight;
	if (this.areaWidth == undefined) {
		// Establish the width and height of the droppable areas
		var item, maxFunction;
		areaHeight = 6;
		if (this.options.language == "natural") {
			areaWidth = 300;
			maxFunction = function(idx, i) {
				item = $(i);
				item.width(areaWidth - 22);
				areaHeight += item.outerHeight(true);
			};
		} else {
			areaWidth = 0;
			maxFunction = function(idx, i) {
				item = $(i);
				areaHeight += item.outerHeight(true);
				areaWidth = Math.max(areaWidth, item.outerWidth(true));			
			};
		}
		$("#" + this.counterId + "-source div").each(maxFunction);
		$("#" + this.counterId + "-answer div").each(maxFunction);
		this.areaWidth = areaWidth;
		this.areaHeight = areaHeight;
	} else {
		areaWidth = this.areaWidth;
		areaHeight = this.areaHeight;
	}
	sourceArea.css({
		'width' : areaWidth + 2,
		'height' : areaHeight
	});
	answerArea.css({
		'width' : this.options.pixelsPerIndent * indent + areaWidth + 2,
		'height' : areaHeight
	});
	if (indent > 0 && indent <= 4) {
		answerArea.addClass("answer" + indent);
	} else {
		answerArea.addClass("answer");
	}
	
	var that = this;
	that.state = undefined; // needs to be here for loading from storage
	that.updateView();

	var elements = [];
	for (var i = 0; i < sourceBlocks.length; i++) {
		elements.push(document.getElementById(sourceBlocks[i].id));
	}
	for (var i = 0; i < answerBlocks.length; i++) {
		elements.push(document.getElementById(answerBlocks[i].id));
	}

	// Add interactivity	
	var panStart = function(event) {
		that.clearFeedback();
		if (that.started == undefined) {
			// log the first time that something gets moved
			that.started = true;
			that.log("start");
		}
		that.movingId = that.getBlockIdFor(event.target);
		// Update the view
		that.movingX = event.srcEvent.pageX;
		that.movingY = event.srcEvent.pageY;
		that.updateView();
	};
	var panEnd = function(event) {
		delete that.movingId;
		delete that.movingX;
		delete that.movingY;
		that.updateView();
		that.log("move");
	};
	var panMove = function(event) {
		// Update the view
		that.movingX = event.srcEvent.pageX;
		that.movingY = event.srcEvent.pageY;
		that.updateView();
	};
	this.destroyHammers();
	var hammers = [];
	var mc;
	for (var i = 0; i < elements.length; i++) {
		var mc = new Hammer.Manager(elements[i], {
			"recognizers" : [
				[Hammer.Pan, {
					"direction" : Hammer.DIRECTION_ALL,
					"threshold" : 0,
					"pointers" : 1
				}]
			]
		});
		mc.on("panstart", panStart);
		mc.on("panend", panEnd);
		mc.on("panmove", panMove);
		hammers.push(mc);
	}
	this.hammers = hammers;
};

// Destroy hammers to disable interaction
Parsons.prototype.destroyHammers = function() {
	var hammers = this.hammers;
	if (hammers !== undefined) {
		for (var i = 0; i < hammers.length; i++) {
			hammers[i].destroy();
		}
	}
};

// Disable the interface
Parsons.prototype.disable = function() {
	this.destroyHammers();
	// Hide buttons
	$("#" + this.counterId + "-check").hide();
	$("#" + this.counterId + "-reset").hide();
};

$(document).bind("runestone:login-complete", function () {
	$("[data-component=parsons]").each(function (index) {
		if ($(this.parentNode).data("component") != "timedAssessment") {
			prsList[this.id] = new Parsons({"orig": this, "useRunestoneServices": eBookConfig.useRunestoneServices});
		}
	});
});
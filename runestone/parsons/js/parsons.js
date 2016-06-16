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
var LineBasedGrader = function(widget) {
	this.widget = widget;
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

// grade that element
LineBasedGrader.prototype.grade = function() {
	var widget = this.widget;
	var correct = false;
	var answerArea = $("#" + widget.options.answerId);
	var feedbackArea = $("#" + widget.options.feedbackId);
	var solutionLines = widget.solutionLines();
	var answerLines = widget.answerLines();
	var i;
	
	if (answerLines.length < solutionLines.length) {
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
				answerArea.addClass("correct");
				feedbackArea.fadeIn(100);
				feedbackArea.attr("class", "alert alert-success");
				feedbackArea.html("Perfect!");
				correct = true;
			} else {
				// Incorrect Indention
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
			var answerBlocks = widget.answerBlocks();
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
	// Log It
	// this extended format, with correct, answer and trash, is used for grading
	var answerHash = widget.answerHash();
	var sourceHash = widget.sourceHash();
	var act = sourceHash + "|" + answerHash;
	if (correct) {
		act = "correct|" + act;
		correct = "T";
	} else {
		act ="incorrect|" + act;
		correct = "F";
	}
	var divid = widget.problem.divid;
	widget.problem.logBookEvent({
		"event" : "parsons", 
		"act" : act,
		"div_id" : divid, 
		"correct" : correct,
		"answer" : answerHash,
		"trash" : sourceHash
	});
};

// Create a line object with the following
//   block = the block that this line is in
//   text = the text of the code line
//   indent = the indent level
var ParsonsCodeline = function(codestring, block) {
	this.block = block;
	var trimmed = codestring.replace(/\s*$/, "");
	this.text = trimmed.replace(/^\s*/, "");
	this.indent = trimmed.length - this.text.length;
};

// Answer the indent of this codeline as determined by the view (answer)
ParsonsCodeline.prototype.viewIndent = function() {
	var indent = this.indent;
	if (this.block.widget.options.noindent) {
		indent += this.block.indent;
	} else {
		indent += this.block.viewIndent;
	}
	return indent;
}

// Answer the indent of this codeline as determined by the model (solution)
ParsonsCodeline.prototype.modelIndent = function() {
	return this.indent + this.block.indent;
}

// Answer an HTML representation of this codeline
ParsonsCodeline.prototype.asHTML = function() {
	var html, end;
	if (this.block.widget.options.language == "natural") {
		html = '<p class="';
		end = '<\/p>';
	} else {
		html = '<code class="' + this.block.widget.prettifyLanguage;
		end = '<\/code>';
	}
	var indent = this.indent;
	if (this.block.widget.options.noindent) {
		indent += this.block.indent;
	}
	if (indent > 0) {
		html += ' indent' + indent;
	}
	html += '">' + this.text + end;
	return html;
};

// Answer a text representation (i.e. code) of this codeline
ParsonsCodeline.prototype.asText = function() {
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
//   widget: the ParsonsWidget
//   index: index of the block (could be an array)
//   lines: an array of ParsonsCodeline
//   indent: how indented is the code based on spaces
//   distractor: boolean as to whether it is not part of the solution
//   paired: boolean whether this distractor should be paired with last valid line
var ParsonsCodeblock = function(codestring, widget) {
	this.widget = widget;
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
		
		code = code.split(/\\n/);
		for (var i = 0; i < code.length; i++) {
			code[i] = new ParsonsCodeline(code[i], this);
		}
		this.lines = code;
	}
};

// Used to normalize indents
// Part of initialization
ParsonsCodeblock.prototype.addIndentsTo = function(array) {
	for (var i = 0; i < this.lines.length; i++) {
		var value = this.indent + this.lines[i].indent;
		if ($.inArray(value, array) == -1) {
			array.push(value);
		}			
	}
};

// Normalize indents based on array of indents
// Part of initialization
ParsonsCodeblock.prototype.normalizeIndents = function(array) {
	var minIndent = 1000;
	for (var i = 0; i < this.lines.length; i++) {
		var value = this.indent + this.lines[i].indent;
		value = array.indexOf(value);
		this.lines[i].indent = value;
		minIndent = Math.min(minIndent, value);
	}
	this.indent = minIndent;
	for (i = 0; i < this.lines.length; i++) {
		this.lines[i].indent = this.lines[i].indent - minIndent;
	}		
};

// Answer a string that represents this codeblock for saving
ParsonsCodeblock.prototype.hash = function() {
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
ParsonsCodeblock.prototype.asHTML = function() {
	var html = '<div id="' + this.id + '" class="block">';
	for (var i = 0; i < this.lines.length; i++) {
		html += this.lines[i].asHTML();
	}
	html += '<\/div>';
	return html;
};

// Answer a text representation (i.e. code) of this codeblock
ParsonsCodeblock.prototype.asText = function() {
	var text = this.lines[0].asText;
	for (var i = 1; i < this.lines.length; i++) {
		text += '\n' + this.lines[i].asText();
	}
	return text;
};

// Return the DOM element for the codeblock
ParsonsCodeblock.prototype.elem = function() {
	return $("#" + this.id);
};

// Mark the view for this codeblock as correct position
ParsonsCodeblock.prototype.markCorrect = function() {
	this.elem().addClass("correctPosition");
};

// Mark the view for this codeblock as incorrect position
ParsonsCodeblock.prototype.markIncorrectPosition = function() {
	this.elem().addClass("incorrectPosition");
};

// Mark the view for this codeblock as the incorrect indent
ParsonsCodeblock.prototype.markIncorrectIndent = function() {
	this.elem().addClass("incorrectIndent");
};

// expose the type for testing, extending etc
window.ParsonsCodeblock = ParsonsCodeblock;

// Creates a parsons widget. Init must be called after creating an object.
var ParsonsWidget = function(problem, options) {
	this.problem = problem;
	this.options = options;
	this.feedback_exists = false;
	this.id_prefix = options['codelineId'];
	this.grader = new LineBasedGrader(this);
	
	this.prettifyLanguage = {
		"python" : "prettyprint lang-py",
		"java" : "prettyprint lang-java",
		"javascript" : "prettyprint lang-js",
		"html" : "prettyprint lang-html",
		"c" : "prettyprint lang-c",
		"c++" : "prettyprint lang-cpp",
		"ruby" : "prettyprint lang-rb"
	}[options["language"]];
	if (this.prettifyLanguage == undefined) {
		this.prettifyLanguage = "";
	}
};

// Initialize the ParsonsWidget object with the following properties
//   blocks: an array of codeblocks as they are specified in the HTML text
//   solution: the array of codeblocks that is the solution
ParsonsWidget.prototype.init = function(text) {
	var that = this;
	var id_prefix = this.id_prefix;
	
	// Create the initial blocks
	var aBlock, blocks = [];
	$.each(text.split("\n"), function(index, item) {
		if (/\S/.test(item)) {
			aBlock = new ParsonsCodeblock(item, that);
			aBlock.index = index;
			aBlock.id = id_prefix + index;
			aBlock.viewIndent = 0;
			blocks.push(aBlock);
		}
	});
	// Normalize the indents
	var indents = [];
	for (i = 0; i < blocks.length; i++) {
		blocks[i].addIndentsTo(indents);
	}
	indents = indents.sort(function(a, b){return a-b});
	for (i = 0; i < blocks.length; i++) {
		blocks[i].normalizeIndents(indents);
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
	this.resetView();
	this.log("set");
};

// Create a hash that identifies the block order and indention
ParsonsWidget.prototype.getHash = function(searchString) {
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
ParsonsWidget.prototype.answerHash = function() {
   return this.getHash("#" + this.options.answerId);
};

// Answer the hash of the source area
ParsonsWidget.prototype.sourceHash = function() {
   return this.getHash("#" + this.options.sourceId);
};

// Return a codeblock that corresponds to the hash
ParsonsWidget.prototype.blockFromHash = function(hash) {
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
ParsonsWidget.prototype.blocksFromHash = function(hash) {
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

// Update the HTML based on hashes
// Called from local storage
ParsonsWidget.prototype.createHTMLFromHashes = function(sourceHash, answerHash) {
	var sourceBlocks = this.blocksFromHash(sourceHash);
	var answerBlocks = this.blocksFromHash(answerHash);
	this.createView(sourceBlocks, answerBlocks);
};

// Log the activity to the server
ParsonsWidget.prototype.log = function(activity) {
	var act = activity + "|" + this.sourceHash() + "|" + this.answerHash();
	var divid = this.problem.divid;
	this.problem.logBookEvent({
		"event" : "parsons",
		"act" : act,
		"div_id" : divid
	});
}

// Return a block object by the full id including id prefix
ParsonsWidget.prototype.getBlockById = function(id) {
	for (var i = 0; i < this.blocks.length; i++) {
		var block = this.blocks[i];
		if (block.id == id) {
			return block;
		}
	}
	return undefined;
};

// Retrieve the codelines based on what is in the DOM
ParsonsWidget.prototype.getModifiedCode = function(search_string) {
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
ParsonsWidget.prototype.answerBlocks = function() {
	var that = this;
	var answerBlocks = [];
	$("#" + this.options.answerId + " div").each(function(idx, i) {
		answerBlocks.push(that.getBlockById($(i)[0].id));
	});
	return answerBlocks;
};

// Return array of codelines based on what is in the answer field
ParsonsWidget.prototype.answerLines = function() {
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
ParsonsWidget.prototype.solutionLines = function() {
	var solutionLines = [];
	for (var i = 0; i < this.solution.length; i++) {
		var lines = this.solution[i].lines;
		for (var j = 0; j < lines.length; j++) {
			solutionLines.push(lines[j]);
		}
	}
	return solutionLines;
};

// Grade the answer compared to the solution
ParsonsWidget.prototype.getFeedback = function() {
	this.grader.grade();
	this.feedback_exists = true;
};

// Clear any feedback from the answer area
ParsonsWidget.prototype.clearFeedback = function() {
	if (this.feedback_exists) {
		$("#" + this.options.answerId).removeClass("incorrect correct");
		var blocks = $("#" + this.options.answerId + " div");
		blocks.removeClass("correctPosition incorrectPosition incorrectIndent");
		$("#" + this.options.feedbackId).hide();
	}
	this.feedback_exists = false;
};

// A function for returning a shuffled version of an array
ParsonsWidget.prototype.shuffled = function(array) {
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
//   rest = not moving
//   source = moving inside source area
//   answer = moving inside answer area
//   moving = moving outside areas
ParsonsWidget.prototype.movingState = function() {
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

// Update the ParsonsWidget view
// This occurs when dragging the moving tile
ParsonsWidget.prototype.updateView = function() {
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
			$("#" + this.options.sourceId + " div").each(function(idx, i) {
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
				moving.appendTo("#" + this.options.sourceId);
				moving.css({
					'left' : x,
					'top' : y - moving.outerHeight(true) / 2,
					'width' : baseWidth,
					'z-index' : 2
				});
			}
		} else {
			$("#" + this.options.sourceId + " div").each(function(idx, i) {
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
		width = this.areaWidth + this.indent * this.options.x_indent - 22;
		var that = this;
		if (newState == "answer") {
			var hasInserted = false;
			var x = this.movingX - this.answerArea.offset().left - baseWidth / 2 - 11;
			movingIndent = Math.round(x / this.options.x_indent);
			if (movingIndent < 0) {
				movingIndent = 0;
			} else if (movingIndent > this.indent) {
				movingIndent = this.indent;
			} else {
				x = movingIndent * this.options.x_indent;
			}
			var y = this.movingY - this.answerArea.offset().top;
			block = this.getBlockById(this.movingId);
			block.viewIndent = movingIndent;
			$("#" + this.options.answerId + " div").each(function(idx, i) {
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
					indent = block.viewIndent * that.options.x_indent;
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
				moving.appendTo("#" + this.options.answerId);
				moving.css({
					'left' : x,
					'top' : y - moving.outerHeight(true) / 2,
					'width' : baseWidth,
					'z-index' : 2
				});
			}
		} else {
			$("#" + this.options.answerId + " div").each(function(idx, i) {
				item = $(i);
				if (item[0].id !== "") {
					block = that.getBlockById(item[0].id);
					indent = block.viewIndent * that.options.x_indent;
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
		moving.appendTo("#" + this.options.sourceId);
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
//     * shorten to the distractors to maxdist size
//     * if an order is specified, then use that
//     * else shuffle the blocks randomly, accounting for paired distractors
//     * call createView with the shuffled blocks in the source field
ParsonsWidget.prototype.resetView = function() {
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
ParsonsWidget.prototype.getBlockIdFor = function(element) {
	var check = element;
	while (!check.classList.contains("block")) {
		check = check.parentElement;
	}
	return check.id;
};

// Based on the blocks, create the view and insert it into the DOM
ParsonsWidget.prototype.createView = function(sourceBlocks, answerBlocks) {
	var html, i;
	if (this.options.sourceId) {
		// Add source area
		html = '<p>Drag from here</p>';
		html += '<div id="' + this.options.sourceId + '" class="source">'
		for (i = 0; i < sourceBlocks.length; i++) {
			html += sourceBlocks[i].asHTML();
		}
		html += '<\/div>';
		$("#" + this.options.sourceRegionId).html(html);
		// Add answer area
		html = '<p>Drop blocks here</p>';
		html += '<div id="' + this.options.answerId + '">'			
		for (i = 0; i < answerBlocks.length; i++) {
			html += answerBlocks[i].asHTML();
		}
		html += '<\/div>';
		$("#" + this.options.answerRegionId).html(html);
	} else {
		// Add only the answer area
		html = '';
		html += '<div id="' + this.options.answerId + '">'			
		for (i = 0; i < answerBlocks.length; i++) {
			html += answerBlocks[i].asHTML();
		}
		html += '<\/div>';
		$("#" + this.options.answerRegionId).html(html);
	}
	
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

	var answerArea = $("#" + this.options.answerId);
	var sourceArea = $("#" + this.options.sourceId);
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
		$("#" + this.options.answerId + " div").each(maxFunction);
		$("#" + this.options.sourceId + " div").each(maxFunction);
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
		'width' : this.options.x_indent * indent + areaWidth + 2,
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
	
	var panStart = function(event) {
		that.clearFeedback();
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
		that.log("drop");
	};
	var panMove = function(event) {
		// Update the view
		that.movingX = event.srcEvent.pageX;
		that.movingY = event.srcEvent.pageY;
		that.updateView();
	};
	var mc;
	// destroy existing hammer functionality
	var hammers = this.hammers;
	if (hammers !== undefined) {
		for (var i = 0; i < hammers.length; i++) {
			hammers[i].destroy();
		}
	}
	// add new hammer functionality
	hammers = [];
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

// Disable the interface
ParsonsWidget.prototype.disable = function() {
	// Disable hammers
	var hammers = this.hammers;
	if (hammers !== undefined) {
		for (var i = 0; i < hammers.length; i++) {
			hammers[i].destroy();
		}
	}
	// Hide buttons
	$("#" + this.problem.checkButt.id).hide();
	$("#" + this.problem.resetButt.id).hide();
};

window['ParsonsWidget'] = ParsonsWidget;
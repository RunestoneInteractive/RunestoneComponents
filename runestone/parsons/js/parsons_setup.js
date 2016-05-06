/*==========================================
=======   Master parsons_setup.js   ========
============================================
===     This file contains the JS for    ===
===   the Runestone Parsons component.   ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                6/8/15                ===
==========================================*/

var prsList = {};    // Parsons dictionary


// <pre> constructor
function Parsons (opts) {
    if (opts) {
        this.init(opts);
    }
}
Parsons.prototype = new RunestoneBase();

/*=======================================
== Initialize basic Parsons attributes ==
=======================================*/
Parsons.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;     // entire <pre> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;
    
    this.children = this.origElem.childNodes;     // this contains all of the child elements of the entire tag...
    this.contentArray = [];
    this.question = null;
    Parsons.counter++;     //    Unique identifier
    this.counterId = Parsons.counter;

    this.getQuestion();
    this.formatCode();
    this.createParsonsView();
};

Parsons.counter = 0;     // Initialize counter

/*========================
== Update object values ==
========================*/
Parsons.prototype.getQuestion = function () {        // Finds question text and stores it in this.question
    for (var i = 0; i < this.children.length; i++) {
        if ($(this.children[i]).is("[data-question]")) {
            this.question = this.children[i];
            break;
        }
    }
};

Parsons.prototype.formatCode = function () {
    var fulltext = $(this.origElem).html();
    var delimiter = this.question.outerHTML;
    var temp = fulltext.split(delimiter);
    var content = temp[1];
    this.contentArray = content.split("---");
    if (this.contentArray.length === 1) {   // If there are no ---, then every line is its own block
        this.contentArray = content.split("\n");
    }
    // remove newline characters that precede and follow the --- delimiters
    for (var i = 0; i < this.contentArray.length; i++) {
        while (this.contentArray[i][0] === "\n") {
            this.contentArray[i] = this.contentArray[i].slice(1);
        }
        while (this.contentArray[i][this.contentArray[i].length - 1] === "\n") {
            this.contentArray[i] = this.contentArray[i].slice(0, -1);
        }
    }
    // Replace newline characters with the literal characters \n
    for (var i = 0; i < this.contentArray.length; i++) {
        if (this.contentArray[i].indexOf("\n") !== -1) {
            var newString = "";
            for (var j = 0; j < this.contentArray[i].length; j ++) {
                if (this.contentArray[i][j] === "\n") {
                    newString += "\\n";
                } else {
                    newString += this.contentArray[i][j];
                }
            }
            this.contentArray[i] = newString;
        }
    }
    this.fmtCode = this.contentArray.join("\n");
};

/*====================================
== Creating/appending new HTML tags ==
====================================*/
Parsons.prototype.createParsonsView = function () {         // Create DOM elements
    this.containingDiv = document.createElement("div");
    $(this.containingDiv).addClass("parsons alert alert-warning");
    this.containingDiv.id = "parsons-" + this.counterId;

    this.parsTextDiv = document.createElement("div");
    $(this.parsTextDiv).addClass("parsons-text");
    this.parsTextDiv.innerHTML = this.question.innerHTML;
    this.containingDiv.appendChild(this.parsTextDiv);

    this.leftClearDiv = document.createElement("div");
    this.leftClearDiv.style["clear"] = "left";
    this.containingDiv.appendChild(this.leftClearDiv);

    this.origDiv = document.createElement("div");
    this.origDiv.id = "parsons-orig-" + this.counterId;
    this.origDiv.style["display"] = "none";
    this.origDiv.innerHTML = this.fmtCode;
    this.containingDiv.appendChild(this.origDiv);

    this.sortContainerDiv = document.createElement("div");
    $(this.sortContainerDiv).addClass("sortable-code-container");
    this.containingDiv.appendChild(this.sortContainerDiv);

    this.sortTrashDiv = document.createElement("div");
    this.sortTrashDiv.id = "parsons-source-" + this.counterId;
    $(this.sortTrashDiv).addClass("sortable-code");
    this.sortContainerDiv.appendChild(this.sortTrashDiv);

    this.sortCodeDiv = document.createElement("div");
    this.sortCodeDiv.id = "parsons-answer-" + this.counterId;
    $(this.sortCodeDiv).addClass("sortable-code");
    this.sortContainerDiv.appendChild(this.sortCodeDiv);

    this.otherLeftClearDiv = document.createElement("div");
    this.otherLeftClearDiv.style["clear"] = "left";
    this.sortContainerDiv.appendChild(this.otherLeftClearDiv);

    this.parsonsControlDiv = document.createElement("div");
    $(this.parsonsControlDiv).addClass("parsons-controls");
    this.containingDiv.appendChild(this.parsonsControlDiv);

    this.checkButt = document.createElement("button");
    $(this.checkButt).attr("class", "btn btn-success");
    this.checkButt.textContent = "Check Me";
    this.checkButt.id = "checkMe" + this.counterId;
    this.parsonsControlDiv.appendChild(this.checkButt);

    this.resetButt = document.createElement("button");
    $(this.resetButt).attr("class", "btn btn-default");
    this.resetButt.textContent = "Reset";
    this.resetButt.id = "reset" + this.counterId;
    this.parsonsControlDiv.appendChild(this.resetButt);

    this.setButtonFunctions();

    this.messageDiv = document.createElement("div");
    this.messageDiv.id = "parsons-message-" + this.counterId;
    this.parsonsControlDiv.appendChild(this.messageDiv);
    $(this.messageDiv).hide();

    $(this.origElem).replaceWith(this.containingDiv);

    this.createParsonsWidget();
};

Parsons.prototype.setButtonFunctions = function () {
    $pjQ(this.resetButt).click(function (event) {
        event.preventDefault();
        this.pwidget.shuffleLines();
        $(this.messageDiv).hide();
    }.bind(this));
    $pjQ(this.checkButt).click(function (event) {
        event.preventDefault();
        var hash = this.pwidget.getHash("#ul-parsons-answer-" + this.counterId);
        localStorage.setItem(this.divid, hash);
        hash = this.pwidget.getHash("#ul-parsons-source-" + this.counterId);
        localStorage.setItem(this.divid + "-source", hash);

        this.pwidget.getFeedback();
        $(this.messageDiv).fadeIn(100);

    }.bind(this));
};

/*================================
== Create Parsons functionality ==
================================*/

Parsons.prototype.createParsonsWidget = function () {
    // First do animation stuff
    $("#parsons-" + this.counterId).not(".sortable-code").not(".parsons-controls").on("click", function () {
        $("html, body").animate({
            scrollTop: ($("#parsons-" + this.counterId).offset().top - 50)
        }, 700);
    }).find(".sortable-code, .parsons-controls").click(function (e) {
        return false;
    });

	var options = {
        "answerId": "parsons-answer-" + this.counterId,
        "sourceId": "parsons-source-" + this.counterId,
        "answerLabel": "Drop blocks here",
        "feedback_cb": this.displayErrors.bind(this)
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
	options["noindent"] = noindent === "true";
    
    this.pwidget = new ParsonsWidget(options);

    this.pwidget.init($pjQ(this.origDiv).text());
    this.pwidget.shuffleLines();
    this.tryLocalStorage();
};

Parsons.prototype.displayErrors = function (fb) {     // Feedback function
    if (fb.errors.length > 0) {
        var hash = this.pwidget.getHash("#ul-parsons-answer-" + this.counterId);
        $(this.messageDiv).fadeIn(500);
        $(this.messageDiv).attr("class", "alert alert-danger");
        $(this.messageDiv).html(fb.errors[0]);
        this.logBookEvent({"event": "parsons", "act": hash, "div_id": this.divid});
    } else {
        this.logBookEvent({"event": "parsons", "act": "yes", "div_id": this.divid});
        $(this.messageDiv).fadeIn(100);
        $(this.messageDiv).attr("class", "alert alert-success");
        $(this.messageDiv).html("Perfect!");
    }
};

Parsons.prototype.tryLocalStorage = function () {
    if (localStorage.getItem(this.divid) && localStorage.getItem(this.divid + "-source")) {
        try {
            var solution = localStorage.getItem(this.divid);
            var trash = localStorage.getItem(this.divid + "-source");
            this.pwidget.createHTMLFromHashes(solution, trash);
            this.pwidget.getFeedback();
        } catch(err) {
            var text = "An error occured restoring old " + this.divid + " state.    Error: ";
            console.log(text + err.message);
        }
    }
};

$(document).ready(function () {
    $pjQ("[data-component=parsons]").each(function (index) {
        if ($(this.parentNode).data("component") != "timedAssessment") {
           prsList[this.id] = new Parsons({"orig": this});
        }
    });

});

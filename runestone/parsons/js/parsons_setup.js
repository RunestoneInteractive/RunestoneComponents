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
    this.useRunestoneServices = opts.useRunestoneServices;
    this.divid = orig.id;
    var storageId = eBookConfig.email;
    if (storageId == undefined) {
    	storageId = this.divid;
    } else {
        storageId += this.divid;
    }
	this.storageId = storageId;
    this.maxdist = $(orig).data('maxdist');
    this.children = this.origElem.childNodes;     // this contains all of the child elements of the entire tag...
    this.contentArray = [];
    this.question = null;
    Parsons.counter++;     //    Unique identifier
    this.counterId = Parsons.counter;
    this.loadingFromStorage = true;   // See displayErrors() for use

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
    this.containerDiv = document.createElement("div");
    $(this.containerDiv).addClass("parsons alert alert-warning");
    this.containerDiv.id = "parsons-" + this.counterId;

    this.parsTextDiv = document.createElement("div");
    $(this.parsTextDiv).addClass("parsons-text");
    this.parsTextDiv.innerHTML = this.question.innerHTML;
    this.containerDiv.appendChild(this.parsTextDiv);

    this.leftClearDiv = document.createElement("div");
    this.leftClearDiv.style["clear"] = "left";
    this.containerDiv.appendChild(this.leftClearDiv);

    this.origDiv = document.createElement("div");
    this.origDiv.id = "parsons-orig-" + this.counterId;
    this.origDiv.style["display"] = "none";
    this.origDiv.innerHTML = this.fmtCode;
    this.containerDiv.appendChild(this.origDiv);

    this.sortContainerDiv = document.createElement("div");
    $(this.sortContainerDiv).addClass("sortable-code-container");
    this.containerDiv.appendChild(this.sortContainerDiv);

    this.sortTrashDiv = document.createElement("div");
    this.sortTrashDiv.id = "parsons-sourceRegion-" + this.counterId;
    $(this.sortTrashDiv).addClass("sortable-code");
    this.sortContainerDiv.appendChild(this.sortTrashDiv);

    this.sortCodeDiv = document.createElement("div");
    this.sortCodeDiv.id = "parsons-answerRegion-" + this.counterId;
    $(this.sortCodeDiv).addClass("sortable-code");
    this.sortContainerDiv.appendChild(this.sortCodeDiv);

    this.otherLeftClearDiv = document.createElement("div");
    this.otherLeftClearDiv.style["clear"] = "left";
    this.sortContainerDiv.appendChild(this.otherLeftClearDiv);

    this.parsonsControlDiv = document.createElement("div");
    $(this.parsonsControlDiv).addClass("parsons-controls");
    this.containerDiv.appendChild(this.parsonsControlDiv);

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

    $(this.origElem).replaceWith(this.containerDiv);

    this.createParsonsWidget();
};

Parsons.prototype.setButtonFunctions = function () {
    $pjQ(this.resetButt).click(function (event) {
        event.preventDefault();
        this.pwidget.resetView();
        this.pwidget.log("reset");
        $(this.messageDiv).hide();
  }.bind(this));
    $pjQ(this.checkButt).click(function (event) {
        event.preventDefault();
        var hash = this.pwidget.answerHash();
        localStorage.setItem(this.storageId, hash);
        hash = this.pwidget.sourceHash();
        localStorage.setItem(this.storageId + "-source", hash);
        this.pwidget.getFeedback();
    }.bind(this));
};

/*================================
== Create Parsons functionality ==
================================*/

Parsons.prototype.createParsonsWidget = function () {

	var options = {
		"x_indent" : 30,
        "answerId" : "parsons-answer-" + this.counterId,
        "answerRegionId" : "parsons-answerRegion-" + this.counterId,
        "sourceId" : "parsons-source-" + this.counterId,
        "sourceRegionId" : "parsons-sourceRegion-" + this.counterId,
        "codelineId" : "parsons-codeline-" + this.counterId + "-",
        "feedbackId" : "parsons-message-" + this.counterId,
        "answerLabel" : "Drop blocks here"
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
    this.pwidget = new ParsonsWidget(this, options);

    this.pwidget.init($pjQ(this.origDiv).text());
    this.checkServer();
};

Parsons.prototype.checkServer = function () {
    // Check if the server has stored answer
    if (this.useRunestoneServices) {
        var data = {};
        data.div_id = this.divid;
        data.course = eBookConfig.course;
        data.event = "parsons";
        
        jQuery.getJSON(eBookConfig.ajaxURL + "getAssessResults", data, this.repopulateFromStorage.bind(this)).error(this.checkLocalStorage.bind(this)).done(this.pwidget.resetView.bind(this));
     } else {
        this.checkLocalStorage();
        this.pwidget.resetView();
    }
};

Parsons.prototype.repopulateFromStorage = function (data, status, whatever) {
    // decide whether to use the server's answer (if there is one) or to load from storage
    if (data !== null) {
        if (this.shouldUseServer(data)) {
            var solution = data.answer;
            var trash = data.trash;
            this.pwidget.createHTMLFromHashes(trash, solution);
            this.pwidget.getFeedback();
            this.setLocalStorage();
        } else {
            this.checkLocalStorage();
        }
    } else {
        this.checkLocalStorage();
    }
};

Parsons.prototype.shouldUseServer = function (data) {
    // returns true if server data is more recent than local storage or if server storage is correct
    if (data.correct == "T" || localStorage.length === 0)
        return true;
    var storedAnswer = localStorage.getItem(this.storageId);
    var storedTrash = localStorage.getItem(this.storageId + "-source");
    var storedDate = localStorage.getItem(this.storageId + "-date");

    if (storedAnswer === null || storedTrash === null || storedDate === null)
        return true;
    if (data.answer == storedAnswer && data.trash == storedTrash)
        return true;
    var timeStamp = JSON.parse(storedDate);
    var storageDate = new Date(timeStamp);
    var serverDate = new Date(data.timestamp);
    if (serverDate < storageDate)
        return false;
    return true;
};
Parsons.prototype.checkLocalStorage = function () {
    if (localStorage.getItem(this.storageId) && localStorage.getItem(this.storageId + "-source")) {
        try {
            var solution = localStorage.getItem(this.storageId);
            var trash = localStorage.getItem(this.storageId + "-source");
            this.pwidget.createHTMLFromHashes(trash, solution);
            if (this.useRunestoneServices)
                this.loadingFromStorage = false;   // Admittedly a non-straightforward way to log, but it works well
            this.pwidget.getFeedback();
        } catch(err) {
            var text = "An error occured restoring old " + this.divid + " state.    Error: ";
            console.log(text + err.message);
        }
    } else {
        this.loadingFromStorage = false;
    }
};

// Will be implemented later to fix evaluation for parsons
Parsons.prototype.reInitialize = function () {
    // this.pwidget.reInitialize()
    return null;
};

Parsons.prototype.setLocalStorage = function() {
    var hash = this.pwidget.answerHash();
    localStorage.setItem(this.storageId, hash);
    hash = this.pwidget.sourceHash();
    localStorage.setItem(this.storageId + "-source", hash);
    var timeStamp = new Date();
    localStorage.setItem(this.storageId + "-date", JSON.stringify(timeStamp));
};

$(document).bind("runestone:login-complete", function () {
    $("[data-component=parsons]").each(function (index) {
        if ($(this.parentNode).data("component") != "timedAssessment") {
           prsList[this.id] = new Parsons({"orig": this, "useRunestoneServices": eBookConfig.useRunestoneServices});
        }
    });
});
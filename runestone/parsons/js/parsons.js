/*==========================================
=======     Master parsons.js       ========
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

    this.getQuestion();
    this.populateContentArray();
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

Parsons.prototype.populateContentArray = function () {
    var fulltext = $(this.origElem).html();
    var delimiter = this.question.outerHTML;
    var temp = fulltext.split(delimiter);
    var content = temp[1];
    this.contentArray = content.split("---");

    // remove newline characters that precede and follow the --- delimiters
    for (var i = 0; i < this.contentArray.length; i++) {
        if (this.contentArray[i][0] === "\n") {
            this.contentArray[i] = this.contentArray[i].slice(1);
        }
        if (this.contentArray[i][this.contentArray[i].length - 1] === "\n") {
            this.contentArray[i] = this.contentArray[i].slice(0, -1);
        }
    }
};

/*====================================
== Creating/appending new HTML tags ==
====================================*/
Parsons.prototype.createParsonsView = function () {         // Create DOM elements
    this.containingDiv = document.createElement("div");
    $(this.containingDiv).addClass("parsons alert alert-warning");
    this.containingDiv.id = "parsons-" + Parsons.counter;

    this.parsTextDiv = document.createElement("div");
    $(this.parsTextDiv).addClass("parsons-text");
    this.parsTextDiv.innerHTML = this.question.innerHTML;
    this.containingDiv.appendChild(this.parsTextDiv);

    this.leftClearDiv = document.createElement("div");
    this.leftClearDiv.style["clear"] = "left";
    this.containingDiv.appendChild(this.leftClearDiv);

    this.origDiv = document.createElement("div");
    this.origDiv.id = "parsons-orig-" + Parsons.counter;
    this.origDiv.style["display"] = "none";
    this.origDiv.innerHTML = this.contentArray.join("\n");
    this.containingDiv.appendChild(this.origDiv);

    this.sortContainerDiv = document.createElement("div");
    $(this.sortContainerDiv).addClass("sortable-code-container");
    this.containingDiv.appendChild(this.sortContainerDiv);

    this.sortTrashDiv = document.createElement("div");
    this.sortTrashDiv.id = "parsons-sortableTrash-" + Parsons.counter;
    $(this.sortTrashDiv).addClass("sortable-code");
    this.sortContainerDiv.appendChild(this.sortTrashDiv);

    this.sortCodeDiv = document.createElement("div");
    this.sortCodeDiv.id = "parsons-sortableCode-" + Parsons.counter;
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
    this.checkButt.id = "checkMe" + Parsons.counter;
    this.parsonsControlDiv.appendChild(this.checkButt);

    this.resetButt = document.createElement("button");
    $(this.resetButt).attr("class", "btn btn-default");
    this.resetButt.textContent = "Reset";
    this.resetButt.id = "reset" + Parsons.counter;
    this.parsonsControlDiv.appendChild(this.resetButt);

    this.setButtonFunctions();

    this.messageDiv = document.createElement("div");
    this.messageDiv.id = "parsons-message-" + Parsons.counter;
    this.parsonsControlDiv.appendChild(this.messageDiv);
    $(this.messageDiv).hide();

    $(this.origElem).replaceWith(this.containingDiv);

    this.createParsonsWidget();
};

Parsons.prototype.setButtonFunctions = function () {
    $(this.resetButt).click(function (event) {
        event.preventDefault();
        this.pwidget.shuffleLines();

        // set min width and height
        var sortableul = $("#ul-parsons-sortableCode-" + Parsons.counter);
        var trashul = $("#ul-parsons-sortableTrash-" + Parsons.counter);
        var sortableHeight = sortableul.height();
        var sortableWidth = sortableul.width();
        var trashWidth = trashul.width();
        var trashHeight = trashul.height();
        var minHeight = Math.max(trashHeight, sortableHeight);
        var minWidth = Math.max(trashWidth, sortableWidth);
        trashul.css("min-height", minHeight + "px");
        sortableul.css("min-height", minHeight + "px");
        trashul.css("min-width", minWidth + "px");
        sortableul.css("min-width", minWidth + "px");
        $(this.messageDiv).hide();
    }.bind(this));
    $(this.checkButt).click(function (event) {
        event.preventDefault();
        var hash = this.pwidget.getHash("#ul-parsons-sortableCode-" + Parsons.counter);
        localStorage.setItem(this.divid, hash);
        hash = this.pwidget.getHash("#ul-parsons-sortableTrash-" + Parsons.counter);
        localStorage.setItem(this.divid + "-trash", hash);

        this.pwidget.getFeedback();
        $(this.messageDiv).fadeIn(100);

    }.bind(this));
};

/*================================
== Create Parsons functionality ==
================================*/

Parsons.prototype.createParsonsWidget = function () {
    // First do animation stuff
    $("#parsons-" + Parsons.counter).not(".sortable-code").not(".parsons-controls").on("click", function () {
        $("html, body").animate({
            scrollTop: ($("#parsons-" + Parsons.counter).offset().top - 50)
        }, 700);
    }).find(".sortable-code, .parsons-controls").click(function (e) {
        return false;
    });

    this.styleNewHTML();
    this.pwidget = new ParsonsWidget({
        "sortableId": "parsons-sortableCode-" + Parsons.counter,
        "trashId": "parsons-sortableTrash-" + Parsons.counter,
        "max_wrong_lines": 1,
        "solution_label": "Drop blocks here",
        "feedback_cb": this.displayErrors.bind(this)
    });

    this.pwidget.init($(this.origDiv).text());
    this.pwidget.shuffleLines();
    this.tryLocalStorage();
};

Parsons.prototype.styleNewHTML = function () {
    $(window).load(function () {
        // set min width and height
        var sortableul = $("#ul-parsons-sortableCode-" + Parsons.counter);
        var trashul = $("#ul-parsons-sortableTrash-" + Parsons.counter);
        var sortableHeight = sortableul.height();
        var sortableWidth = sortableul.width();
        var trashWidth = trashul.width();
        var trashHeight = trashul.height();
        var minHeight = Math.max(trashHeight, sortableHeight);
        var minWidth = Math.max(trashWidth, sortableWidth);
        trashul.css("min-height", minHeight + "px");
        sortableul.css("min-height", minHeight + "px");
        sortableul.height(minHeight);
        trashul.css("min-width", minWidth + "px");
        sortableul.css("min-width", minWidth + "px");
    });
};

Parsons.prototype.displayErrors = function (fb) {     // Feedback function
    if (fb.errors.length > 0) {
        var hash = this.pwidget.getHash("#ul-parsons-sortableCode-" + Parsons.counter);
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
    if (localStorage.getItem(this.divid) && localStorage.getItem(this.divid + "-trash")) {
        try {
            var solution = localStorage.getItem(this.divid);
            var trash = localStorage.getItem(this.divid + "-trash");
            this.pwidget.createHTMLFromHashes(solution, trash);
            this.pwidget.getFeedback();
        } catch(err) {
            var text = "An error occured restoring old " + this.divid + " state.    Error: ";
            console.log(text + err.message);
        }
    }
};

$(document).ready(function () {
    $("[data-component=parsons]").each(function (index) {
        prsList[this.id] = new Parsons({"orig": this});
    });

});

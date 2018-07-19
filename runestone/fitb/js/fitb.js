/*==========================================
========       Master fitb.js      =========
============================================
===   This file contains the JS for the  ===
===  Runestone fillintheblank component. ===
============================================
===              Created By              ===
===           Isaiah Mayerchak           ===
===                 and                  ===
===             Kirby Olson              ===
===                6/4/15                ===
==========================================*/

var FITBList = {};    // Object containing all instances of FITB that aren't a child of a timed assessment.

// FITB constructor
function FITB (opts) {
    if (opts) {
        this.init(opts);
    }
}

FITB.prototype = new RunestoneBase();

/*===================================
===    Setting FITB variables     ===
===================================*/

FITB.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    RunestoneBase.prototype.init.apply(this, arguments);
    var orig = opts.orig;    // entire <p> element
    this.useRunestoneServices = opts.useRunestoneServices;
    this.origElem = orig;
    this.divid = orig.id;
    this.correct = null;
    // See comments in fitb.py for the format of ``feedbackArray`` (which is identical in both files).
    //
    // Find the script tag containing JSON and parse it. See `SO <https://stackoverflow.com/questions/9320427/best-practice-for-embedding-arbitrary-json-in-the-dom>`_.
    this.feedbackArray = JSON.parse(this.scriptSelector(this.origElem).html());

    this.createFITBElement();
    this.checkServer("fillb");
};

// Find the script tag containing JSON in a given root DOM node.
FITB.prototype.scriptSelector = function (root_node) {
    return $(root_node).find('script[type="application/json"]');
}

/*===========================================
====   Functions generating final HTML   ====
===========================================*/

FITB.prototype.createFITBElement = function () {
    this.renderFITBInput();
    this.renderFITBButtons();
    this.renderFITBFeedbackDiv();

    // replaces the intermediate HTML for this component with the rendered HTML of this component
    $(this.origElem).replaceWith(this.containerDiv);
};


FITB.prototype.renderFITBInput = function () {
    // creates the blank and appends it to the parent div
    this.containerDiv = document.createElement("div");
    $(this.containerDiv).addClass("alert alert-warning");
    this.containerDiv.id = this.divid;

    // Copy the original elements to the container holding what the user will see.
    $(this.origElem).children().clone().appendTo(this.containerDiv);
    // Remove the script tag.
    this.scriptSelector(this.containerDiv).remove();
    // Set the class for the text inputs, then store references to them.
    let ba = $(this.containerDiv).find(':input');
    ba.attr('class', 'form form-control selectwidthauto');
    this.blankArray = ba.toArray();
};

FITB.prototype.renderFITBButtons = function () {
    // "submit" button and "compare me" button
    this.submitButton = document.createElement("button");
    this.submitButton.textContent = $.i18n("msg_fitb_check_me");
    $(this.submitButton).attr({
        "class": "btn btn-success",
        "name": "do answer",
        "type": "button",
    });
    this.submitButton.addEventListener("click", function () {
        this.startEvaluation(true);
    }.bind(this), false);
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.submitButton);
    if (this.useRunestoneServices) {
        this.compareButton = document.createElement("button");
        $(this.compareButton).attr({
            "class": "btn btn-default",
            "id": this.origElem.id + "_bcomp",
            "disabled": "",
            "name": "compare"
        });
        this.compareButton.textContent = "Compare Me";
        this.compareButton.addEventListener("click", function () {
            this.compareFITBAnswers();
        }.bind(this), false);
        //this.containerDiv.appendChild(this.compareButton);
    }

    this.containerDiv.appendChild(document.createElement("div"));
};

FITB.prototype.renderFITBFeedbackDiv = function () {
    this.feedBackDiv = document.createElement("div");
    this.feedBackDiv.id = this.divid + "_feedback";
    this.containerDiv.appendChild(document.createElement("br"));
    this.containerDiv.appendChild(this.feedBackDiv);
};

/*===================================
=== Checking/loading from storage ===
===================================*/

FITB.prototype.restoreAnswers = function (data) {
    // Restore answers from storage retrieval done in RunestoneBase
    var arr = data.answer.split(",");
    for (var i = 0; i < this.blankArray.length; i++) {
        $(this.blankArray[i]).attr("value", arr[i]);
    }
    this.startEvaluation();
};

FITB.prototype.checkLocalStorage = function () {
    // Loads previous answers from local storage if they exist
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(eBookConfig.email + ":" + this.divid + "-given");
        if (ex !== null) {
            try {
                var storedData = JSON.parse(ex);
                var arr = storedData.answer;
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(eBookConfig.email + ":" + this.divid + "-given");
                return;
            }

            for (var i = 0; i < this.blankArray.length; i++) {
                $(this.blankArray[i]).attr("value", arr[i]);
            }
            if (this.useRunestoneServices) {
                var answer = storedData.answer.join(",")
                this.logBookEvent({"event": "fillb", "act": answer, "answer": answer, "correct": storedData.correct, "div_id": this.divid});
                this.enableCompareButton();
            }
        }
    }
};

FITB.prototype.setLocalStorage = function (data) {
    // logs answer to local storage
    this.given_arr = [];
    for (var i = 0; i < this.blankArray.length; i++)
        this.given_arr.push(this.blankArray[i].value);

    var now = new Date();
    var correct = data.correct;
    var storageObject = {"answer": this.given_arr, "correct": correct, "timestamp": now};
    localStorage.setItem(eBookConfig.email + ":" + this.divid + "-given", JSON.stringify(storageObject));
};

/*==============================
=== Evaluation of answer and ===
===     display feedback     ===
==============================*/

FITB.prototype.startEvaluation = function (logFlag) {
    // Start of the evaulation chain
    this.isCorrectArray = [];
    this.displayFeed = [];
    this.evaluateAnswers();
    this.renderFITBFeedback();
    if (logFlag) {   // Sometimes we don't want to log the answer--for example, when timed exam questions are re-loaded
        var answer = this.given_arr.join(",");
        this.logBookEvent({"event": "fillb", "act": answer, "answer":answer, "correct": (this.correct ? "T" : "F"), "div_id": this.divid});
    }
    if (this.useRunestoneServices) {
        this.enableCompareButton();
    }
};

FITB.prototype.evaluateAnswers = function () {
    for (var i = 0; i < this.blankArray.length; i++) {
        var given = this.blankArray[i].value;

        // If this blank is empty, provide no feedback for it.
        if (given === "") {
            this.isCorrectArray.push("");
            this.displayFeed.push($.i18n("msg_no_answer"));
        } else {
            // Look through all feedback for this blank. The last element in the array always matches.
            var fbl = this.feedbackArray[i];
            for (var j = 0; j < fbl.length; j++) {
                // The last item of feedback always matches.
                if (j === fbl.length - 1) {
                    this.displayFeed.push(fbl[j]['feedback']);
                    break;
                }
                // If this is a regexp...
                if ('regex' in fbl[j]) {
                    var patt = RegExp(fbl[j]['regex'], fbl[j]['regexFlags']);
                    if (patt.test(given)) {
                        this.displayFeed.push(fbl[j]['feedback']);
                        break;
                    }
                } else {
                    // This is a number.
                    console.assert('number' in fbl[j]);
                    var [min, max] = fbl[j]['number'];
                    // Convert the given string to a number. While there are `lots of ways <https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls>`_ to do this,, this version supports other bases (hex/binary/octal) as well as floats.
                    var actual = +given;
                    if (actual >= min && actual <= max) {
                        this.displayFeed.push(fbl[j]['feedback']);
                        break;
                    }
                }
            }
            // The answer is correct if it matched the first element in the array.
            this.isCorrectArray.push(j === 0);
        }
    }

    if ($.inArray("", this.isCorrectArray) < 0 && $.inArray(false, this.isCorrectArray) < 0) {
        this.correct = true;
    } else if (this.isCompletelyBlank()) {
        this.correct = null;
    } else {
        this.correct = false;
    }
    this.setLocalStorage({"correct": (this.correct ? "T" : "F")});
};

FITB.prototype.isCompletelyBlank = function () {
    // Returns true if the user didn't fill in any of the blanks, else false
    for (var i = 0; i < this.isCorrectArray.length; i++) {
        if (this.isCorrectArray[i] !== "") {
            return false;
        }
    }
    return true;
};

FITB.prototype.renderFITBFeedback = function () {
    if (this.correct) {
        $(this.feedBackDiv).attr("class", "alert alert-success");
        for (var j = 0; j < this.blankArray.length; j++) {
            $(this.blankArray[j]).removeClass("input-validation-error");
        }
    } else {
        if (this.displayFeed === null) {
            this.displayFeed = "";
        }
        for (var j = 0; j < this.blankArray.length; j++) {
            if (!this.isCorrectArray[j]) {
                $(this.blankArray[j]).addClass("input-validation-error");
            } else {
                $(this.blankArray[j]).removeClass("input-validation-error");
            }
        }
        $(this.feedBackDiv).attr("class", "alert alert-danger");
    }
    var feedback_html = '<ul>';
    for (var i = 0; i < this.displayFeed.length; i++) {
        feedback_html += '<li>' + this.displayFeed[i] + '</li>';
    }
    feedback_html += '</ul>';
    // Remove the list if it's just one element.
    if (this.displayFeed.length == 1) {
        feedback_html = feedback_html.slice('<ul><li>'.length, -('</li></ul>'.length))
    }
    this.feedBackDiv.innerHTML = feedback_html;
};

/*==================================
=== Functions for compare button ===
==================================*/

FITB.prototype.enableCompareButton = function () {
    this.compareButton.disabled = false;
};

FITB.prototype.compareFITBAnswers = function () {
    var data = {};
    data.div_id = this.divid;
    data.course = eBookConfig.course;
    jQuery.get(eBookConfig.ajaxURL + "gettop10Answers", data, this.compareFITB);
};

FITB.prototype.compareFITB = function (data, status, whatever) {   // Creates a modal dialog
    var answers = eval(data)[0];
    var misc = eval(data)[1];

    var body = "<table>";
    body += "<tr><th>Answer</th><th>Count</th></tr>";

    for (var row in answers) {
        body += "<tr><td>" + answers[row].answer + "</td><td>" + answers[row].count + " times</td></tr>";
    }
    body += "</table>";
    if (misc["yourpct"] !== "unavailable") {
        body += "<br /><p>You have " + misc["yourpct"] + "% correct for all questions</p>";
    }

    var html = "<div class='modal fade'>" +
        "    <div class='modal-dialog compare-modal'>" +
        "        <div class='modal-content'>" +
        "            <div class='modal-header'>" +
        "                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>" +
        "                <h4 class='modal-title'>Top Answers</h4>" +
        "            </div>" +
        "            <div class='modal-body'>" +
        body +
        "            </div>" +
        "        </div>" +
        "    </div>" +
        "</div>";
    var el = $(html);
    el.modal();
};

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
//$(document).bind("runestone:login-complete", function () {
$(document).ready(function () {
    $("[data-component=fillintheblank]").each(function (index) {
        var opts = {"orig" : this, "useRunestoneServices": eBookConfig.useRunestoneServices};
        if ($(this).closest('[data-component=timedAssessment]').length == 0) { // If this element exists within a timed component, don't render it here
            FITBList[this.id] = new FITB(opts);
        }
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['fillintheblank'] = function(opts) { return new FITB(opts)}

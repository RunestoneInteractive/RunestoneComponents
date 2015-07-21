/*==========================================
=======    Master shortanswer.js    ========
============================================
===     This file contains the JS for    ===
=== the Runestone shortanswer component. ===
============================================
===              Created by              ===
===           Isaiah Mayerchak           ===
===                7/2/15                ===
==========================================*/

var saList = {};    // Dictionary that contains all instances of shortanswer objects


function ShortAnswer (opts) {
    if (opts) {
        this.init(opts);
    }
}

ShortAnswer.prototype = new RunestoneBase();

/*========================================
== Initialize basic ShortAnswer attributes ==
========================================*/
ShortAnswer.prototype.init = function (opts) {
    RunestoneBase.apply(this, arguments);
    var orig = opts.orig;    // entire <p> element that will be replaced by new HTML
    this.origElem = orig;
    this.divid = orig.id;
    this.question = this.origElem.innerHTML;

    this.optional = false;
    if ($(this.origElem).is("[data-optional]")) {
        this.optional = true;
    }

    this.renderHTML();
    this.loadJournal();
};

ShortAnswer.prototype.renderHTML = function() {
    this.containerDiv = document.createElement("div");
    this.containerDiv.id = this.divid;
    if (this.optional) {
        $(this.containerDiv).addClass("journal alert alert-success");
    } else {
        $(this.containerDiv).addClass("journal alert alert-warning");
    }

    this.newForm = document.createElement("form");
    this.newForm.id = this.divid + "_journal";
    this.newForm.name = this.newForm.id;
    this.newForm.action = "";
    this.containerDiv.appendChild(this.newForm);

    this.fieldSet = document.createElement("fieldset");
    this.newForm.appendChild(this.fieldSet);

    this.legend = document.createElement("legend");
    this.legend.innerHTML = "Short Answer";
    this.fieldSet.appendChild(this.legend);

    this.firstLegendDiv = document.createElement("div");
    this.firstLegendDiv.innerHTML = this.question;
    $(this.firstLegendDiv).addClass("journal-question");
    this.fieldSet.appendChild(this.firstLegendDiv);

    this.jInputDiv = document.createElement("div");
    this.jInputDiv.id = this.divid + "_journal_input";
    this.fieldSet.appendChild(this.jInputDiv);

    this.jOptionsDiv = document.createElement("div");
    $(this.jOptionsDiv).addClass("journal-options");
    this.jInputDiv.appendChild(this.jOptionsDiv);

    this.jLabel = document.createElement("label");
    $(this.jLabel).addClass("radio-inline");
    this.jOptionsDiv.appendChild(this.jLabel);

    this.jTextArea = document.createElement("textarea");
    this.jTextArea.id = this.divid + "_solution";
    $(this.jTextArea).css("display:inline, width:530px");
    $(this.jTextArea).addClass("form-control");
    this.jTextArea.rows = 4;
    this.jTextArea.cols = 50;
    this.jLabel.appendChild(this.jTextArea);

    this.fieldSet.appendChild(document.createElement("br"));

    this.buttonDiv = document.createElement("div");
    this.fieldSet.appendChild(this.buttonDiv);

    this.submitButton = document.createElement("button");
    $(this.submitButton).addClass("btn btn-default");
    this.submitButton.textContent = "Save";
    this.submitButton.onclick = function () {
        this.submitJournal();
    }.bind(this);
    this.buttonDiv.appendChild(this.submitButton);

    this.randomSpan = document.createElement("span");
    this.randomSpan.innerHTML = "Instructor's Feedback";
    this.fieldSet.appendChild(this.randomSpan);

    this.otherOptionsDiv = document.createElement("div");
    $(this.otherOptionsDiv).css("padding-left:20px");
    $(this.otherOptionsDiv).addClass("journal-options");
    this.fieldSet.appendChild(this.otherOptionsDiv);

    this.feedbackDiv = document.createElement("div");
    $(this.feedbackDiv).addClass("bg-info form-control");
    $(this.feedbackDiv).css("width:530px, background-color:#eee, font-style:italic");
    this.feedbackDiv.id = this.divid + "_feedback";
    this.feedbackDiv.innerHTML = "There is no feedback yet.";
    this.otherOptionsDiv.appendChild(this.feedbackDiv);

    this.fieldSet.appendChild(document.createElement("br"));

    $(this.origElem).replaceWith(this.containerDiv);
};

ShortAnswer.prototype.submitJournal = function () {
    var value = $("#"+this.divid+"_solution").val();
    localStorage.setItem(this.divid, value);
    /*
    directiveRemoteCommand("set_journal_entry",  this.divid, {"solution": value},
                      function(data) {
                        storage.remove(this.divid);
                      },
                      function(data) {
                        console.log(data.message);
                      });  */
    logBookEvent({"event": "shortanswer", "act": JSON.stringify(value), "div_id": this.divid});
};

ShortAnswer.prototype.loadJournal = function () {
    var len = localStorage.length;
    if (len > 0) {
        var ex = localStorage.getItem(this.divid);
        if (ex !== null) {
            var solution = $("#" + this.divid + "_solution");
            solution.text(localStorage.getItem(this.divid));
        }
    }
};

/*

<div id='%(divid)s' class='journal alert alert-%(optional)s'>
    <form id='%(divid)s_journal' name='%(divid)s_journal' action="">
        <fieldset>
            <legend>Short Answer</legend>
            <div class='journal-question'>%(qnum)s: %(content)s</div>
            <div id='%(divid)s_journal_input'>
                <div class='journal-options'>
                    <label class='radio-inline'>
                        <textarea id='%(divid)s_solution' class="form-control" style="display:inline; width: 530px;"
                                  rows='4' cols='50'></textarea>
                    </label>
                </div><br />
                <div><button class="btn btn-default" onclick="submitJournal('%(divid)s');">Save</button></div>
                Instructor's Feedback:
                <div class='journal-options' style='padding-left:20px'>
                    <div class='bg-info form-control' style='width:530px; background-color: #eee; font-style:italic'
                         id='%(divid)s_feedback'>
                        There is no feedback yet.
                    </div>
                </div><br />
            </div>
        </fieldset>
    </form>
    <div id='%(divid)s_results'></div>
    <script type='text/javascript'>
        // check if the user has already answered this journal
        $(function() {
            loadJournal('%(divid)s');
        });
    </script>
</div>



*/







/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).ready(function () {
    $("[data-component=shortanswer]").each(function (index) {
        saList[this.id] = new ShortAnswer({"orig": this});
    });

});

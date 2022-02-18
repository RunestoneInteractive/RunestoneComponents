/*==========================================
=========    Master hanswers.js    =========
============================================
===     This file contains the JS for    ===
===  the Runestone hparsons component.   ===
============================================
===              Created by              ===
===               Zihan Wu               ===
===                2022                  ===
==========================================*/

import RunestoneBase from "../../common/js/runestonebase.js";
import "./../css/hparsons.css";
import "./regex-element.js";
import "../../activecode/js/skulpt.min.js";
import "../../activecode/js/skulpt-stdlib.js";

export var hpList;
// Dictionary that contains all instances of horizontal Parsons problem objects
if (hpList === undefined) hpList = {}; 

export default class HParsons extends RunestoneBase {
    constructor(opts) {
        super(opts);
        if (opts) {
            // TODO: what is orig?
            var orig = opts.orig; // entire <pre> element that will be replaced by new HTML
            this.containerDiv = orig;
            this.origElem = $(orig).find(".hparsons")[0];
            console.log(this.origElem)
            this.useRunestoneServices =
                opts.useRunestoneServices || eBookConfig.useRunestoneServices;
            this.divid = orig.id;

            // The element that is going to be replaced
            // Find the question text and store it in .question
            this.question = $(orig).find(`.hparsons_question`)[0];
            // TODO: idk what this is with shortanswer
            this.renderHTML();
            this.caption = "hparsons";
            this.addCaption("runestone");
            this.checkServer("hparsons", true);

            // Set the storageId (key for storing data)
            var storageId = super.localStorageKey();
            this.storageId = storageId;
            this.children = this.origElem.childNodes; // this contains all of the child elements of the entire tag...
            this.contentArray = [];
            HParsons.counter++; //    Unique identifier
            this.counterId = "hparsons-" + HParsons.counter;
        }
    }

    renderHTML() {
        // const div = document.createElement('regex-element');
        // div.setAttribute('input-type', 'parsons')
        // div.id = 'abcd';
        // console.log(this.origElem)
        let attributes = '';
        console.log($(this.origElem).data("textentry"))
        let settings = JSON.parse($(this.origElem).children()[0].innerText)
        attributes += ' input-type=' + ($(this.origElem).data("textentry") ? 'text' : 'parsons' );
        $(this.origElem).html('<regex-element' + attributes + '></regex-element>');
        let regexElement = $(this.origElem).children()[0];
        if ($(this.origElem).data("nostrictmatch")) {
            regexElement.unitTestTable.strictMatch = false;
        } else {
            regexElement.unitTestTable.strictMatch = true;
        }
        if ($(this.origElem).data("hidetests")) {
            regexElement.hidetests = false;
        } else {
            regexElement.unitTestTable.strictMatch = true;
        }

        if (settings.blocks) {
            regexElement.parsonsData = settings.blocks;
        }
        if (settings.explanations) {
            regexElement.parsonsExplanation = settings.explanations;
        }
        if (settings.positivetest) {
            regexElement.setPositiveInitialTestString(settings.positivetest);
        }
        if (settings.negativetest) {
            regexElement.setNegativeInitialTestString(settings.negativetest);
        }
        if (settings.testcases) {
            regexElement.setTestCases(settings.testcases);
        }

        // tool.parsonsExplanation = toolConfig.parsonsExplanation;
        // tool.parsonsData = toolConfig.parsonsData;
        regexElement.resetTool();
        // tool.setTestCases(toolConfig.testCases);
        // tool.setPositiveInitialTestString(toolConfig.positiveInitialTestString);
        // tool.setNegativeInitialTestString(toolConfig.negativeInitialTestString);

        // console.log(this.origElem)
        // $(this.origElem).replaceWith(document.createElement('regex-element'));
        // $(this.elem).innerHTML = `<regex-element input-type='parsons' id="abcd"></regex-element>`;
        // console.log(div)
    }

    checkCurrentAnswer() { }

    async logCurrentAnswer(sid) {
        console.log('hparsons, logcurrentanswer')
        // let value = $(document.getElementById(this.divid + "_solution")).val();
        // this.renderMath(value);
        // this.setLocalStorage({
        //     answer: value,
        //     timestamp: new Date(),
        // });
        // let data = {
        //     event: "shortanswer",
        //     act: value,
        //     answer: value,
        //     div_id: this.divid,
        // };
        // if (typeof sid !== "undefined") {
        //     data.sid = sid;
        // }
        // await this.logBookEvent(data);
    }

    renderFeedback() {
        console.log('hparsons, renderfeedback')
        // this.feedbackDiv.innerHTML = "Your answer has been saved.";
        // $(this.feedbackDiv).removeClass("alert-danger");
        // $(this.feedbackDiv).addClass("alert alert-success");
    }
    setLocalStorage(data) {
        console.log('hparsons, setlocalstorage')
        // if (!this.graderactive) {
        //     let key = this.localStorageKey();
        //     localStorage.setItem(key, JSON.stringify(data));
        // }
    }
    checkLocalStorage() {
        console.log('hparsons, checklocalstorage')
        // Repopulates the short answer text
        // which was stored into local storage.
        // var answer = "";
        // if (this.graderactive) {
        //     return;
        // }
        // var len = localStorage.length;
        // if (len > 0) {
        //     var ex = localStorage.getItem(this.localStorageKey());
        //     if (ex !== null) {
        //         try {
        //             var storedData = JSON.parse(ex);
        //             answer = storedData.answer;
        //         } catch (err) {
        //             // error while parsing; likely due to bad value stored in storage
        //             console.log(err.message);
        //             localStorage.removeItem(this.localStorageKey());
        //             return;
        //         }
        //         let solution = $("#" + this.divid + "_solution");
        //         solution.text(answer);
        //         this.renderMath(answer);
        //         this.feedbackDiv.innerHTML =
        //             "Your current saved answer is shown above.";
        //         $(this.feedbackDiv).removeClass("alert-danger");
        //         $(this.feedbackDiv).addClass("alert alert-success");
        //     }
        // }
    }
    restoreAnswers(data) {
        console.log('hparsons, restoreanswers')
        // Restore answers from storage retrieval done in RunestoneBase
        // sometimes data.answer can be null
        // if (!data.answer) {
        //     data.answer = "";
        // }
        // this.answer = data.answer;
        // this.jTextArea.value = this.answer;
        // this.renderMath(this.answer);

        // let p = document.createElement("p");
        // this.jInputDiv.appendChild(p);
        // var tsString = "";
        // if (data.timestamp) {
        //     tsString = new Date(data.timestamp).toLocaleString();
        // } else {
        //     tsString = "";
        // }
        // $(p).text(tsString);
        // if (data.last_answer) {
        //     this.current_answer = "ontime";
        //     let toggle_answer_button = document.createElement("button");
        //     toggle_answer_button.type = "button";
        //     $(toggle_answer_button).text("Show Late Answer");
        //     $(toggle_answer_button).addClass("btn btn-warning");
        //     $(toggle_answer_button).css("margin-left", "5px");

        //     $(toggle_answer_button).click(
        //         function () {
        //             var display_timestamp, button_text;
        //             if (this.current_answer === "ontime") {
        //                 this.jTextArea.value = data.last_answer;
        //                 this.answer = data.last_answer;
        //                 display_timestamp = new Date(
        //                     data.last_timestamp
        //                 ).toLocaleString();
        //                 button_text = "Show on-Time Answer";
        //                 this.current_answer = "late";
        //             } else {
        //                 this.jTextArea.value = data.answer;
        //                 this.answer = data.answer;
        //                 display_timestamp = tsString;
        //                 button_text = "Show Late Answer";
        //                 this.current_answer = "ontime";
        //             }
        //             this.renderMath(this.answer);
        //             $(p).text(`Submitted: ${display_timestamp}`);
        //             $(toggle_answer_button).text(button_text);
        //         }.bind(this)
        //     );

        //     this.buttonDiv.appendChild(toggle_answer_button);
        // }
        // let feedbackStr = "Your current saved answer is shown above.";
        // if (typeof data.score !== "undefined") {
        //     feedbackStr = `Score: ${data.score}`;
        // }
        // if (data.comment) {
        //     feedbackStr += ` -- ${data.comment}`;
        // }
        // this.feedbackDiv.innerHTML = feedbackStr;

        // $(this.feedbackDiv).removeClass("alert-danger");
        // $(this.feedbackDiv).addClass("alert alert-success");
    }

    disableInteraction() {
        console.log('hparsons, disableinteraction')
        // this.jTextArea.disabled = true;
    }
}
HParsons.counter = 0;
/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=hparsons]").each(function () {
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            // try {
                hpList[this.id] = new HParsons({
                    orig: this,
                    useRunestoneServices: eBookConfig.useRunestoneServices,
                });
            // } catch (err) {
            //     console.log(`Error rendering ShortAnswer Problem ${this.id}
            //     Details: ${err}`);
            // }
        }
    });
});

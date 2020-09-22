/*
This component is based on ...
ShowEval, a JS module for creating visualizations of expression evaluation. Mainly for programming tutorials.
0.9.1

Al Sweigart
al@inventwithpython.com
https://github.com/asweigart/
*/
"use strict";

import RunestoneBase from "../../common/js/runestonebase";
import "../css/showEval.css";

var seList = [];

export class ShowEval {
    constructor(opts) {
        this.divid = opts.orig.id;
        this.container = $(`#${this.divid}`);
        this.container.addClass("showEval");
        let steps = [];
        for (let s of opts.raw) {
            steps.push(s.replace(/\\/g, ""));
        }
        this.steps = steps.slice();
        this.currentStep = 0;
        this.createTrace = $(opts.orig).data("tracemode"); // TODO - reset doesn't work for traces
        this.rb = new RunestoneBase(opts);
        // create elements
        this.currentStepDiv = $("<div>").addClass("currentStepDiv");
        this.container.append(this.currentStepDiv);
        this.currentStepDiv.append($("<span>").addClass("pre"));
        this.currentStepDiv.append($("<span>").addClass("eval"));
        this.currentStepDiv.append($("<span>").addClass("post"));
        this.currentStepDiv.append($("<div>").addClass("anno"));
        this.setNextButton(`#${this.divid}_nextStep`);
        this.setResetButton(`#${this.divid}_reset`);

        // parse steps and turn into a 4-string array: ['pre', 'before eval', 'after eval', 'post']
        for (var i = 0; i < this.steps.length; i++) {
            var s = this.steps[i];
            let endpoint, pItem, comment;

            if (s.includes("##")) {
                // If there is an annotation
                endpoint = s.indexOf("##");
                comment = s.substring(endpoint + 2, s.length);
            } else {
                endpoint = s.length;
                comment = false;
            }
            this.steps[i] = [
                s.substring(0, s.indexOf("{{")), // 'pre'
                s.substring(s.indexOf("{{") + 2, s.indexOf("}}{{")), // 'before eval'
                s.substring(
                    s.indexOf("}}{{") + 4,
                    s.indexOf("}}", s.indexOf("}}{{") + 4)
                ), // 'after eval'
                s.substring(
                    s.indexOf("}}", s.indexOf("}}{{") + 4) + 2,
                    endpoint
                ),
            ]; // 'post'

            this.steps[i].push(comment); // 'anno'
        }
        this.reset();
        this.rb.caption = "ShowEval";
        this.rb.containerDiv = this.container[0].parentElement;
        this.rb.divid = this.container[0].id;
        this.rb.addCaption("runestone");
    }

    setNextButton(nextButtonSelector) {
        var thisObj = this; // uhg, javascript
        $(nextButtonSelector).click(function () {
            thisObj.evaluateStep(nextButtonSelector);
        });
    }

    setResetButton(resetButtonSelector) {
        var thisObj = this; // uhg, javascript
        $(resetButtonSelector).click(function () {
            thisObj.reset(0);
        });
    }

    reset() {
        this.container.find(".previousStep").remove();
        this.setStep(0);
        this.rb.logBookEvent({
            event: "showeval",
            act: "reset",
            div_id: this.container[0].id,
        });
    }

    setStep(step) {
        this.currentStep = step;
        let newWidth = this.getWidth(this.steps[this.currentStep][1]);
        if (this.steps[step][4]) {
            this.currentStepDiv.children(".anno").html(this.steps[step][4]);
            this.currentStepDiv.children(".anno").show();
        } else {
            this.currentStepDiv.children(".anno").hide();
        }
        this.currentStepDiv.children(".eval").width(newWidth);
        this.currentStepDiv.children(".pre").html(this.steps[step][0]);
        this.currentStepDiv.children(".eval").html(this.steps[step][1]);
        this.currentStepDiv.children(".post").html(this.steps[step][3]);
    }

    getWidth(text) {
        // TODO - class style must match or else width will be off.
        var newElem = $("<div>")
            .addClass("showEval evalCont")
            .hide()
            .html(text);
        $("body").append(newElem);
        var newWidth = newElem.width() + 1; // +1 is a hack
        newElem.remove();

        return newWidth;
    }

    createPreviousStepDiv(step) {
        this.currentStepDiv.before(
            $("<div>")
                .addClass("previousStep")
                .html(
                    this.steps[step][0] +
                        this.steps[step][1] +
                        this.steps[step][3]
                )
        );
    }

    evaluateStep(buttonId, step) {
        this.currentStepDiv.children(".anno").hide();
        $(buttonId).attr("disabled", true);
        if (step === undefined) {
            step = this.currentStep;
        }
        if (this.currentStep >= this.steps.length) {
            //this.currentStep = 0;
            //step = 0;
            $(buttonId).attr("disabled", false);
            return; // do nothing if on last step
        }
        //this.setStep(step);

        var fadeInSpeed = 0;
        if (this.createTrace) {
            this.createPreviousStepDiv(step);
            this.currentStepDiv.hide();
            fadeInSpeed = 200;
        }

        let newWidth = this.getWidth(this.steps[step][2]);
        var evalElem = this.currentStepDiv.children(".eval");

        var thisShowEval = this;

        evalElem.css("color", "red");

        this.currentStepDiv.fadeTo(fadeInSpeed, 1, function () {
            window.setTimeout(function () {
                evalElem.fadeTo(400, 0, function () {
                    //evalElem.css('overflow', 'hidden');
                    evalElem.animate(
                        { width: newWidth, duration: 400 },
                        function () {
                            evalElem.html(thisShowEval.steps[step][2]);
                            evalElem.fadeTo(400, 1, function () {
                                window.setTimeout(function () {
                                    //evalElem.css('overflow', 'visible');
                                    evalElem.css("color", "#333");
                                    thisShowEval.currentStep += 1;
                                    if (
                                        thisShowEval.currentStep <
                                        thisShowEval.steps.length
                                    ) {
                                        thisShowEval.setStep(
                                            thisShowEval.currentStep
                                        );
                                    }
                                    $(buttonId).attr("disabled", false);
                                }, 600);
                            });
                        }
                    );
                });
            }, 600);
        });

        this.rb.logBookEvent({
            event: "showeval",
            act: "next",
            div_id: this.container[0].id,
        });
    }
}

/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-childcomponent=showeval]").each(function (index) {
        // MC
        var opts = {
            orig: this,
            useRunestoneServices: eBookConfig.useRunestoneServices,
        };
        opts.raw = window.raw_steps[this.id];
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            seList[this.id] = new ShowEval(opts);
        }
    });
});

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory["showeval"] = function (opts) {
    return new ShowEval(opts);
};

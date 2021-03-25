/**
 * *******************************
 * |docname| - SelectOne Component
 * *******************************
 */
import {
    renderRunestoneComponent,
    createTimedComponent,
} from "../../common/js/renderComponent";
import RunestoneBase from "../../common/js/runestonebase";

export default class SelectOne extends RunestoneBase {
    /**
     * constructor --
     * Making an instance of a selectone is a bit more complicated because it is
     * a kind of meta directive.  That is, go to the server and randomly select
     * a question to display in this spot.  Or, if a student has already seen this question
     * in the context of an exam retrieve the question they saw in the first place.
     * Making an API call and waiting for the response is handled asynchronously.
     * But lots of code is not written with that assumption.  So we do the initialization in
     * two parts.
     * 1. Create the object with the usual constructor
     * 2. call initialize, which returns a promise.  When that promise is resolved
     * the "replacement" component will replace the original selectone component in the DOM.
     *
     * @param  {} opts
     */
    constructor(opts) {
        super(opts);
        this.origOpts = opts;
        this.questions = $(opts.orig).data("questionlist");
        this.proficiency = $(opts.orig).data("proficiency");
        this.minDifficulty = $(opts.orig).data("minDifficulty");
        this.maxDifficulty = $(opts.orig).data("maxDifficulty");
        this.points = $(opts.orig).data("points");
        this.autogradable = $(opts.orig).data("autogradable");
        this.not_seen_ever = $(opts.orig).data("not_seen_ever");
        this.selector_id = $(opts.orig).first().attr("id");
        this.primaryOnly = $(opts.orig).data("primary");
        this.ABExperiment = $(opts.orig).data("ab");
        this.toggle = $(opts.orig).data("toggle");
        opts.orig.id = this.selector_id;
    }
    /**
     * initialize --
     * initialize is used so that the constructor does not have to be async.
     * Constructors should definitely not return promises that would seriously
     * mess things up.
     * @return {Promise} Will resolve after component from DB is reified
     */
    async initialize() {
        let self = this;
        let data = { selector_id: this.selector_id };
        if (this.questions) {
            data.questions = this.questions;
        } else if (this.proficiency) {
            data.proficiency = this.proficiency;
        }
        if (this.minDifficulty) {
            data.minDifficulty = this.minDifficulty;
        }
        if (this.maxDifficulty) {
            data.maxDifficulty = this.maxDifficulty;
        }
        if (this.points) {
            data.points = this.points;
        }
        if (this.autogradable) {
            data.autogradable = this.autogradable;
        }
        if (this.not_seen_ever) {
            data.not_seen_ever = this.not_seen_ever;
        }
        if (this.primaryOnly) {
            data.primary = this.primaryOnly;
        }
        if (this.ABExperiment) {
            data.AB = this.ABExperiment;
        }
        if (this.toggle) {
            data.toggle = this.toggle;
        }
        let opts = this.origOpts;
        let selectorId = this.selector_id;
        console.log("getting question source");
        let request = new Request("/runestone/ajax/get_question_source", {
            method: "POST",
            headers: this.jsonHeaders,
            body: JSON.stringify(data),
        });
        let response = await fetch(request);
        let htmlsrc = await response.json();
        if (htmlsrc.indexOf("No preview") >= 0) {
            alert(
                `Error: Not able to find a question for ${selectorId} based on the criteria`
            );
            throw new Error(`Unable to find a question for ${selectorId}`);
        }
        let res;
        if (opts.timed) {
            // timed components are not rendered immediately, only when the student
            // starts the assessment and visits this particular entry.
            res = createTimedComponent(htmlsrc, {
                timed: true,
                selector_id: selectorId,
                assessmentTaken: opts.assessmentTaken,
            });
            // replace the entry in the timed assessment's list of components
            // with the component created by createTimedComponent
            for (let component of opts.rqa) {
                if (component.question == self) {
                    component.question = res.question;
                    break;
                }
            }
            self.realComponent = res.question;
            self.containerDiv = res.question.containerDiv;
            self.realComponent.selectorId = selectorId;
        } else {
            ///////////////////////////
            if (data.toggle) {
                var toggleQuestions = this.questions.split(", ");
                var toggleUI = "";
                if (!(document.getElementById("component-preview"))) {
                    toggleUI += '<div id="component-preview" class="col-md-6" style="z-index: 999;"></div>';
                }
                toggleUI += '<label for="' + selectorId + '-toggleQuestion">Toggle Question:</label><select id="' + selectorId + '-toggleQuestion">';
                var i;
                var toggleQuestionHTMLSrc;
                var toggleQuestionSubstring;
                var toggleQuestionType;
                for (i = 0; i < toggleQuestions.length; i++) {
                    toggleQuestionHTMLSrc = await this.getToggleSrc(toggleQuestions[i]);
                    toggleQuestionSubstring = toggleQuestionHTMLSrc.split('data-component="')[1];
                    switch (toggleQuestionSubstring.substring(0, toggleQuestionSubstring.indexOf('"'))) {
                        case ("activecode"):
                            toggleQuestionType = "Active Code";
                            break;
                        case ("clickablearea"):
                            toggleQuestionType = "Clickable Area";
                            break;
                        case ("dragndrop"):
                            toggleQuestionType = "Drag n Drop";
                            break;
                        case ("fillintheblank"):
                            toggleQuestionType = "Fill in the Blank";
                            break;
                        case ("multiplechoice"):
                            toggleQuestionType = "Multiple Choice";
                            break;
                        case ("parsons"):
                            toggleQuestionType = "Parsons";
                            break;
                        case ("shortanswer"):
                            toggleQuestionType = "Short Answer";
                            break;
                    }
                    toggleUI += '<option value="' + toggleQuestions[i] + '">' + toggleQuestionType + " - " + toggleQuestions[i] + '</option>';
                }
                toggleUI += '</select><div id="' + selectorId + '-toggleSelectedQuestion">';
                var toggleFirstID = htmlsrc.split('id="')[1];
                toggleFirstID = toggleFirstID.split('"')[0];
                htmlsrc = toggleUI + htmlsrc + '</div>';
            }
            ///////////////////////////
            // just render this component on the page in its usual place
            res = renderRunestoneComponent(htmlsrc, selectorId, {
                selector_id: selectorId,
                useRunestoneServices: true,
            });
            ///////////////////////////
            if (data.toggle) {
                var toggleQuestionSelect = document.getElementById(selectorId + "-toggleQuestion");
                for (i = 0; i < toggleQuestionSelect.options.length; i++) {
                    if (toggleQuestionSelect.options[i].value == toggleFirstID) {
                        toggleQuestionSelect.value = toggleFirstID;
                        $("#" + selectorId).data("toggle_current", toggleFirstID);
                        break;
                    }
                }
                toggleQuestionSelect.addEventListener("change", async function () {
                    await this.togglePreview(toggleQuestionSelect.parentElement.id);
                }.bind(this));
            }
            ///////////////////////////
        }
        return response;
    }
    
    async getToggleSrc(toggleQuestionID) {
        let request = new Request(
            "/runestone/admin/htmlsrc?acid=" + toggleQuestionID,
            {
                method: "GET",
            }
        );
        let response = await fetch(request);
        let htmlsrc = await response.json();
        return htmlsrc;
    }

    async togglePreview(parentID) {
        var parentDiv = document.getElementById(parentID);
        var toggleQuestionSelect =  parentDiv.getElementsByTagName("select")[0];
        var selectedQuestion = toggleQuestionSelect.options[toggleQuestionSelect.selectedIndex].value;
        var htmlsrc = await this.getToggleSrc(selectedQuestion);
        let res = renderRunestoneComponent(htmlsrc, "component-preview", {
            selector_id: "component-preview",
            useRunestoneServices: true,
        });
        // let pd = document.getElementById(preview_div);
        // pd.appendChild(renderGradingComponents(sid, selectedQuestion));

        let closeButton = document.createElement("button");
        $(closeButton).text("Close Preview");
        $(closeButton).addClass("btn btn-default");
        $(closeButton).click(function (event) {
            $("#component-preview").html("");
            toggleQuestionSelect.value = $("#" + parentID).data("toggle_current");
        });
        $("#component-preview").append(closeButton);

        let setButton = document.createElement("button");
        $(setButton).text("Select this Problem");
        $(setButton).addClass("btn btn-primary");
        $(setButton).click(async function () {
            await this.toggleSet(parentID, selectedQuestion, htmlsrc)
        }.bind(this));
        $("#component-preview").append(setButton);
    }

    async toggleSet(parentID, selectedQuestion, htmlsrc) {
        var selectorId = parentID + "-toggleSelectedQuestion";
        document.getElementById(selectorId).innerHTML = ""; // need to check whether this is even necessary
        let res = renderRunestoneComponent(htmlsrc, selectorId, {
            selector_id: selectorId,
            useRunestoneServices: true,
        });
        let request = new Request(
            "/runestone/ajax/update_selected_question?metaid=" + parentID + "&selected=" + selectedQuestion,
            {

            }
        );
        let response = await fetch(request);
        $("#component-preview").html("");
        $("#" + parentID).data("toggle_current", selectedQuestion);
    }
}

/*
 * When the page is loaded and the login checks are complete find and render
 * each selectquestion component that is not part of a timedAssessment.
 **/
$(document).bind("runestone:login-complete", async function () {
    let selQuestions = document.querySelectorAll(
        "[data-component=selectquestion]"
    );
    for (let cq of selQuestions) {
        try {
            if ($(cq).closest("[data-component=timedAssessment]").length == 0) {
                // If this element exists within a timed component, don't render it here
                let tmp = new SelectOne({ orig: cq });
                await tmp.initialize();
            }
        } catch (err) {
            console.log(`Error rendering New Exercise ${cq.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    }
});
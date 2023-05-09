import RunestoneBase from "../../common/js/runestonebase.js";
import "../css/hparsons.css";
import "../css/hljs-xcode.css";
import BlockFeedback from "./BlockFeedback.js";
import SQLFeedback from "./SQLFeedback.js";
import {InitMicroParsons} from 'micro-parsons/micro-parsons/micro-parsons.js';
import 'micro-parsons/micro-parsons/micro-parsons.css';
// If you need to debug something in the micro-parsons library then
// gh repo clone amy21206/micro-parsons-element
// run npm install and npm build
// copy everything from bin into the hparsons/js folder and build the components.
/*import {InitMicroParsons} from './micro-parsons.js';
import './micro-parsons.css';*/

export var hpList;
// Dictionary that contains all instances of horizontal Parsons problem objects
if (hpList === undefined) hpList = {};


export default class HParsons extends RunestoneBase {
    constructor(opts) {
        super(opts);
        // getting settings
        var orig = $(opts.orig).find("textarea")[0];
        this.reuse = $(orig).data("reuse") ? true : false;
        this.randomize = $(orig).data("randomize") ? true : false;
        this.isBlockGrading = $(orig).data("blockanswer") ? true : false;
        this.language = $(orig).data("language");
        this.renderRaw = false;
        if (this.isBlockGrading) {
            this.blockAnswer = $(orig).data("blockanswer").split(" ");
        }
        this.divid = opts.orig.id;
        this.containerDiv = opts.orig;
        this.useRunestoneServices = opts.useRunestoneServices;

        // Set the storageId (key for storing data)
        var storageId = super.localStorageKey();
        this.storageId = storageId;

        this.origElem = orig;
        this.origText = this.origElem.textContent;
        this.code = $(orig).text() || "\n\n\n\n\n";
        this.dburl = $(orig).data("dburl");
        this.runButton = null;
        this.saveButton = null;
        this.loadButton = null;
        this.outerDiv = null;
        this.controlDiv = null;
        this.processContent(this.code)

        // Change to factory when more execution based feedback is included
        if (this.isBlockGrading) {
            this.feedbackController = new BlockFeedback(this);
        } else {
            this.feedbackController = new SQLFeedback(this);
        }

        // creating UI components
        this.createEditor();
        this.createOutput();
        this.createControls();
        this.feedbackController.customizeUI();

        if ($(orig).data("caption")) {
            this.caption = $(orig).data("caption");
        } else {
            this.caption = "MicroParsons";
        }
        this.addCaption("runestone");
        this.indicate_component_ready();

        // initializing functionalities for different feedback
        this.feedbackController.init();
        this.checkServer('hparsonsAnswer', true);
    }

    processContent(code) {
        // todo: add errors when blocks are nonexistent (maybe in python)?
        this.hiddenPrefix = this.processSingleContent(code, '--hiddenprefix--');
        this.originalBlocks = this.processSingleContent(code, '--blocks--').split('\n').slice(1,-1);
        this.hiddenSuffix = this.processSingleContent(code, '--hiddensuffix--');
        this.unittest = this.processSingleContent(code, '--unittest--');
        // (for pretext) if all blocks can be parsed as html but language is not html,
        //               ask micro parsons to render raw
        if (this.language != 'html') {
            this.renderRaw = true;
            for (let i = 0; i < this.originalBlocks.length; ++i) {
                if (!this.isHTML(this.originalBlocks[i])) {
                    this.renderRaw = false;
                    break;
                }
            }
        }
    }

    isHTML(block) {
        let doc = new DOMParser().parseFromString(block, "text/html");
        return Array.from(doc.body.childNodes).some(node => node.nodeType === 1);
    }

    processSingleContent(code, delimitier) {
        let index = code.indexOf(delimitier);
        if (index > -1) {
            let content = code.substring(index + delimitier.length);
            let endIndex = content.indexOf("\n--");
            content =
                endIndex > -1
                    ? content.substring(0, endIndex + 1)
                    : content;
            return content;
        }
        return undefined;
    }

    // copied from activecode, already modified to add parsons
    createEditor() {
        this.outerDiv = document.createElement("div");
        $(this.origElem).replaceWith(this.outerDiv);
        this.outerDiv.id = `${this.divid}-container`;
        this.outerDiv.addEventListener("micro-parsons", (ev) => {
            const eventListRunestone = ['input', 'reset'];
            if (eventListRunestone.includes(ev.detail.type)) {
                // only log the events in the event list
                this.logHorizontalParsonsEvent(ev.detail);
                // when event is input or reset: clear previous feedback
                this.feedbackController.clearFeedback();
            }
        });
        const props = {
            selector: `#${this.divid}-container`,
            id: `${this.divid}-hparsons`,
            reuse: this.reuse,
            randomize: this.randomize,
            parsonsBlocks: [...this.originalBlocks],
            language: this.renderRaw ? 'raw' : this.language
        }
        InitMicroParsons(props);
        this.hparsonsInput = $(this.outerDiv).find("micro-parsons")[0];
    }

    createOutput() {
        this.feedbackController.createOutput();
    }

    createControls() {
        var ctrlDiv = document.createElement("div");
        $(ctrlDiv).addClass("hp_actions");

        // Run Button
        this.runButton = document.createElement("button");
        $(this.runButton).addClass("btn btn-success run-button");
        ctrlDiv.appendChild(this.runButton);
        $(this.runButton).attr("type", "button");
        $(this.runButton).text("Run");
        var that = this;
        this.runButton.onclick = () => {
            that.feedbackController.runButtonHandler();
            that.setLocalStorage();
        };

        // Reset button
        var resetBtn;
        resetBtn = document.createElement("button");
        $(resetBtn).text("Reset");
        $(resetBtn).addClass("btn btn-warning run-button");
        ctrlDiv.appendChild(resetBtn);
        this.resetButton = resetBtn;
        this.resetButton.onclick = () => {
            that.hparsonsInput.resetInput();
            that.setLocalStorage();
            that.feedbackController.reset();
        };
        $(resetBtn).attr("type", "button");

        $(this.outerDiv).prepend(ctrlDiv);
        this.controlDiv = ctrlDiv;
    }

    // Return previous answers in local storage
    //
    localData() {
        var data = localStorage.getItem(this.storageId);
        if (data !== null) {
            if (data.charAt(0) == "{") {
                data = JSON.parse(data);
            } else {
                data = {};
            }
        } else {
            data = {};
        }
        return data;
    }
    // RunestoneBase: Sent when the server has data
    restoreAnswers(serverData) {
        // TODO: not tested with server data yet.
        // Server side data should be:
        /*
            {
                answer: Array<string>, // list of answer block content
                count: ?number // number of previous attempts if block-based feedback
            }
        */
        if (serverData.answer){
            this.hparsonsInput.restoreAnswer(serverData.answer.blocks);
        }
        if (serverData.count) {
            this.feedbackController.checkCount = serverData.count;
        }
    }
    // RunestoneBase: Load what is in local storage
    checkLocalStorage() {
        if (this.graderactive) {
            // Zihan: I think this means the component is still loading?
            return;
        }
        let localData = this.localData();
        if (localData.answer) {
            this.hparsonsInput.restoreAnswer(localData.answer);
        }
        if (localData.count) {
            this.feedbackController.checkCount = localData.count;
        }
    }
    // RunestoneBase: Set the state of the problem in local storage
    setLocalStorage(data) {
        let currentState = {};
        if (data == undefined) {
            currentState = {
                answer: this.hparsonsInput.getParsonsTextArray()
            }
            if (this.isBlockGrading) {
                // if this is block grading, add number of previous attempts too
                currentState.count = this.feedbackController.checkCount;
            }
        } else {
            currentState = data;
        }
        localStorage.setItem(this.storageId, JSON.stringify(currentState));
    }

    logHorizontalParsonsEvent(hparsonsEvent) {
        let ev = {
            event: "hparsons",
            div_id: this.divid,
            act: JSON.stringify(hparsonsEvent),
        };
        this.logBookEvent(ev);
    }
}


/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).on("runestone:login-complete", function () {
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

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}
window.component_factory["hparsons"] = function (opts) {
    return new HParsons(opts);
};

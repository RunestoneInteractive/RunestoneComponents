// import 'handsontable/dist/handsontable.full.css';
import RunestoneBase from "../../common/js/runestonebase.js";
import "../css/hparsons.css";
import "../css/hljs-xcode.css";
import BlockFeedback from "./BlockFeedback.js";
import SQLFeedback from "./SQLFeedback.js";
// import "micro-parsons.j" from 'micro-parsons';
import {InitMicroParsons} from 'micro-parsons/micro-parsons/micro-parsons.js';
import 'micro-parsons/micro-parsons/micro-parsons.css';

export var hpList;
// Dictionary that contains all instances of horizontal Parsons problem objects
if (hpList === undefined) hpList = {};


export default class SQLHParsons extends RunestoneBase {
    constructor(opts) {
        super(opts);
        // copied from activecode
        var suffStart;
        // getting settings
        var orig = $(opts.orig).find("textarea")[0];
        this.reuse = $(orig).data("reuse") ? true : false;
        this.randomize = $(orig).data("randomize") ? true : false;
        this.isBlockGrading = $(orig).data("blockanswer") ? true : false;
        this.language = $(orig).data("language");
        if (this.isBlockGrading) {
            this.blockAnswer = $(orig).data("blockanswer").split(" ");
        }
        this.divid = opts.orig.id;
        this.containerDiv = opts.orig;
        this.useRunestoneServices = opts.useRunestoneServices;
        this.origElem = orig;
        this.origText = this.origElem.textContent;
        this.code = $(orig).text() || "\n\n\n\n\n";
        this.dburl = $(orig).data("dburl");
        this.runButton = null;
        this.saveButton = null;
        this.loadButton = null;
        this.outerDiv = null;
        this.controlDiv = null;
        let prefixEnd = this.code.indexOf("^^^^");
        if (prefixEnd > -1) {
            this.prefix = this.code.substring(0, prefixEnd);
            this.code = this.code.substring(prefixEnd + 5);
        }
        suffStart = this.code.indexOf("--unittest--");
        if (suffStart > -1) {
            this.suffix = this.code.substring(suffStart + 5);
            this.code = this.code.substring(0, suffStart);
        }

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
            this.caption = "HorizontalParsons";
        }
        this.addCaption("runestone");
        this.indicate_component_ready();

        // initializing functionalities for different feedback
        this.feedbackController.init();
    }

    // copied from activecode, already modified to add parsons
    createEditor() {
        this.outerDiv = document.createElement("div");
        $(this.origElem).replaceWith(this.outerDiv);
        this.outerDiv.id = `${this.divid}-container`;
        this.outerDiv.addEventListener("micro-parsons", (ev) => {
            this.logHorizontalParsonsEvent(ev.detail);
            this.feedbackController.clearFeedback();
        });
        let blocks = [];
        let blockIndex = this.code.indexOf("--blocks--");
        if (blockIndex > -1) {
            let blocksString = this.code.substring(blockIndex + 10);
            let endIndex = blocksString.indexOf("\n--");
            blocksString =
                endIndex > -1
                    ? blocksString.substring(0, endIndex)
                    : blocksString;
            blocks = blocksString.split("\n");
        }
        this.originalBlocks = blocks.slice(1, -1);
        const props = {
            selector: `#${this.divid}-container`,
            id: `${this.divid}-hparsons`,
            reuse: this.reuse,
            randomize: this.randomize,
            parsonsBlocks: blocks.slice(1, -1),
            language: this.language
        }
        InitMicroParsons(props);
        this.hparsonsInput = $(this.outerDiv).find("micro-parsons")[0];
    }

    createOutput() {
        this.feedbackController.createOutput();
    }

    // copied from activecode
    createControls() {
        var ctrlDiv = document.createElement("div");
        $(ctrlDiv).addClass("hp_actions");
        $(ctrlDiv).addClass("col-md-12");

        // Run Button
        this.runButton = document.createElement("button");
        $(this.runButton).addClass("btn btn-success run-button");
        ctrlDiv.appendChild(this.runButton);
        $(this.runButton).attr("type", "button");
        $(this.runButton).text("Run");
        this.runButton.onclick = () => {
            this.feedbackController.runButtonHandler();
        };

        // Reset button
        var resetBtn;
        resetBtn = document.createElement("button");
        $(resetBtn).text("Reset");
        $(resetBtn).addClass("btn btn-warning run-button");
        ctrlDiv.appendChild(resetBtn);
        this.resetButton = resetBtn;
        this.resetButton.onclick = () => {
            this.hparsonsInput.resetInput();
            this.feedbackController.reset();
        };
        $(resetBtn).attr("type", "button");

        $(this.outerDiv).prepend(ctrlDiv);
        this.controlDiv = ctrlDiv;
    }

    logHorizontalParsonsEvent(hparsonsEvent) {
        // TODO: might need to find another way to change "act".
        // The event string is probably too long.
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
            hpList[this.id] = new SQLHParsons({
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
    return new SQLHParsons(opts);
};

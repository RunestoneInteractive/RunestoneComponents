/*
The TimedActivecode classes are a great example of where multiple inheritance would be useful
But since Javascript does not suppport multiple inheritance we use the mixin pattern.

*/
import LiveCode from "./livecode";
import { ActiveCode } from "./activecode";
import JSActiveCode from "./activecode_js";
import HTMLActiveCode from "./activecode_html";
import SQLActiveCode from "./activecode_sql";

var TimedActiveCodeMixin = {
    timedInit: async function (opts) {
        this.isTimed = true;
        this.hideButtons();
        await this.addHistoryScrubber(true); // position last
        this.needsReinitialization = true; // the run button click listener needs to be reinitialized
        this.containerDiv.classList.add("timedComponent");
        window.edList[this.divid] = this;
        return true;
    },

    hideButtons: function () {
        var buttonList = [
            this.saveButton,
            this.loadButton,
            this.gradeButton,
            this.showHideButt,
            this.coachButton,
            this.atButton,
        ];
        for (var i = 0; i < buttonList.length; i++) {
            if (buttonList[i] !== undefined && buttonList[i] !== null)
                $(buttonList[i]).hide();
        }
    },

    // bje - not needed anymore
    renderTimedIcon: function (component) {
        // renders the clock icon on timed components.    The component parameter
        // is the element that the icon should be appended to.
        var timeIconDiv = document.createElement("div");
        var timeIcon = document.createElement("img");
        $(timeIcon).attr({
            src: "../_static/clock.png",
            style: "width:15px;height:15px",
        });
        timeIconDiv.className = "timeTip";
        timeIconDiv.title = "";
        timeIconDiv.appendChild(timeIcon);
        $(component).prepend(timeIconDiv);
    },

    checkCorrectTimed: function () {
        // pct_correct is set by the unittest/gui.py module in skulpt.
        // it relies on finding this object in the edList
        if (this.isAnswered) {
            if (this.pct_correct >= 100.0) {
                return "T";
            } else {
                return "F";
            }
        } else {
            return "I"; // we ignore this in the grading if no unittests
        }
    },

    hideFeedback: function () {
        $(this.output).css("visibility", "hidden");
    },

    reinitializeListeners: function (taken) {
        if (!this.runButton.onclick) {
            console.log("reattaching runbuttonhandler");
            this.runButton.onclick = this.runButtonHander.bind(this);
        }
        $(this.codeDiv).show();
        this.runButton.disabled = false;
        $(this.codeDiv).removeClass("ac-disabled");
        this.editor.refresh();
        $(this.histButton).click(this.addHistoryScrubber.bind(this));
        if (this.historyScrubber !== null) {
            $(this.historyScrubber).slider({
                max: this.history.length - 1,
                value: this.history.length - 1,
                slide: this.slideit.bind(this),
                change: this.slideit.bind(this),
            });
        }
        if (taken) {
            $(`#${this.divid}_unit_results`).show();
        }
    },
};

export class TimedLiveCode extends LiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}

Object.assign(TimedLiveCode.prototype, TimedActiveCodeMixin);

export class TimedActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInitComplete = this.timedInit(opts);
    }

    // for timed exams we need to call runProg and tell it that there is
    // no GUI for sliders or other things.
    // the answers.
    async checkCurrentAnswer() {
        let noUI = true;
        const result = await this.timedInitComplete;
        await this.runProg(noUI, false);
    }
}

Object.assign(TimedActiveCode.prototype, TimedActiveCodeMixin);

export class TimedJSActiveCode extends JSActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedJSActiveCode.prototype, TimedActiveCodeMixin);

export class TimedHTMLActiveCode extends HTMLActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedHTMLActiveCode.prototype, TimedActiveCodeMixin);

export class TimedSQLActiveCode extends SQLActiveCode {
    constructor(opts) {
        super(opts);
        this.timedInit(opts);
    }
}
Object.assign(TimedSQLActiveCode.prototype, TimedActiveCodeMixin);

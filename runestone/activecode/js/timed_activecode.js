import { ActiveCode } from "./activecode.js";

export default class TimedActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        //this.renderTimedIcon(this.containerDiv); - bje not needed anymore
        if (this.language == "javascript") {
            TimedActiveCode.prototype.runProg = JSActiveCode.prototype.runProg;
            TimedActiveCode.prototype.outputfun =
                JSActiveCode.prototype.outputfun;
        }
        this.hideButtons();
        this.addHistoryScrubber();
        this.isTimed = true;
        this.needsReinitialization = true; // the run button click listener needs to be reinitialized
        this.containerDiv.classList.add("timedComponent");
        window.edList[this.divid] = this;
    }

    hideButtons() {
        var buttonList = [
            this.saveButton,
            this.loadButton,
            this.gradeButton,
            this.showHideButt,
            this.coachButton,
            this.atButton
        ];
        for (var i = 0; i < buttonList.length; i++) {
            if (buttonList[i] !== undefined && buttonList[i] !== null)
                $(buttonList[i]).hide();
        }
    }
    // bje - not needed anymore
    renderTimedIcon(component) {
        // renders the clock icon on timed components.    The component parameter
        // is the element that the icon should be appended to.
        var timeIconDiv = document.createElement("div");
        var timeIcon = document.createElement("img");
        $(timeIcon).attr({
            src: "../_static/clock.png",
            style: "width:15px;height:15px"
        });
        timeIconDiv.className = "timeTip";
        timeIconDiv.title = "";
        timeIconDiv.appendChild(timeIcon);
        $(component).prepend(timeIconDiv);
    }
    checkCorrectTimed() {
        if (this.pct_correct) {
            if (this.pct_correct >= 100.0) {
                return "T";
            } else {
                return "F";
            }
        } else {
            return "I"; // we ignore this in the grading if no unittests
        }
    }
    hideFeedback() {
        $(this.output).css("visibility", "hidden");
    }
    processTimedSubmission(logFlag) {
        // Disable input & evaluate component
        /*    if (this.useRunestoneServices) {
                if (logFlag) {
                    if (this.historyScrubber !== null) {
                        $(this.historyScrubber).slider({
                            max: this.history.length-1,
                            value: this.history.length-1,
                            slide: this.slideit.bind(this),
                            change: this.slideit.bind(this)
                        });
                    }
                    this.runProg();
                } else {
                    this.loadEditor().done(this.runProg.bind(this));
                }
            } */
        $(this.runButton).hide();
        $(`#${this.divid}_unit_results`).show();
        $(this.codeDiv).addClass("ac-disabled");
    }
    reinitializeListeners() {
        // re-attach the run button listener
        $(this.runButton).click(this.runProg.bind(this));
        $(this.codeDiv).show();
        this.runButton.disabled = false;
        $(this.codeDiv).removeClass("ac-disabled");
        $(this.histButton).click(this.addHistoryScrubber.bind(this));
        if (this.historyScrubber !== null) {
            $(this.historyScrubber).slider({
                max: this.history.length - 1,
                value: this.history.length - 1,
                slide: this.slideit.bind(this),
                change: this.slideit.bind(this)
            });
        }
    }
}

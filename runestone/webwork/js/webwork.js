import RunestoneBase from "../../common/js/runestonebase";

window.wwList = {}; // Multiple Choice dictionary


class WebWork extends RunestoneBase {

    constructor(opts) {
        super(opts);
        this.useRunestoneServices = true;
        this.multipleanswers = false;
        this.divid = opts.orig.id;
        this.correct = null;
        this.answerList = [];
        this.correctList = [];
        this.question = null;
        this.caption = "WebWork";
        this.containerDiv = opts.orig
        //this.addCaption("runestone");
        if (this.divid !== "fakeww-ww-rs") {
            this.checkServer("webwork", true);
        }
    }

    restoreAnswers(data) {
        // Restore answers from storage retrieval done in RunestoneBase
        // sometimes data.answer can be null
        if (!data.answer) {
            data.answer = "";
        }
        // check:actual:3:expected:3:actual:1:expected:1:actual:3:expected:3:actual:1:expected:1:correct:4:count:4:pct:1
        this.answers = JSON.parse(data.answer);
    }

    checkLocalStorage() {
        // Repopulates MCMA questions with a user's previous answers,
        // which were stored into local storage.
        var storedData;
        var answers;
        if (this.graderactive) {
            return;
        }
        var len = localStorage.length;
        var ex = localStorage.getItem(this.localStorageKey());

        if (ex !== null) {
            try {
                storedData = JSON.parse(ex);
                answers = storedData.answer.split(":");
            } catch (err) {
                // error while parsing; likely due to bad value stored in storage
                console.log(err.message);
                localStorage.removeItem(this.localStorageKey());
                return;
            }
        }
    }

    setLocalStorage(data) {
        var timeStamp = new Date();
        var storageObj = {
            answer: data.answer,
            timestamp: timeStamp,
            correct: data.correct,
        };
        localStorage.setItem(
            this.localStorageKey(),
            JSON.stringify(storageObj)
        );
    }

    async logCurrentAnswer(sid) {
        // todo
    }

    checkCurrentAnswer() {

    }

}

// TODO - it would be better if we can get rid of this, and use the runestone object corresponding to the webwork question to make the logging calls.  Or this could be a tiny wrapper because we can look up the object using inputs_ref.problemUUID.replace("-ww-rs","")
let rb = new WebWork({orig:{id:"fakeww-ww-rs"}});

function logWebWork(e, data) {
    var correct = false;
    let correctCount = 0;
    let qCount = 0;
    let actString = "check:";
    let answerObj = {}
    for (let k of Object.keys(data.rh_result.answers).sort()) {
        qCount += 1;
        if (data.rh_result.answers[k].score == 1) {
            correctCount += 1;
        }
        answerObj[k] = `${data.rh_result.answers[k].original_student_ans}`
        actString += `actual:${data.rh_result.answers[k].original_student_ans}:expected:${data.rh_result.answers[k].correct_value}:`;
    }
    let pct = correctCount / qCount;
    actString += `correct:${correctCount}:count:${qCount}:pct:${pct}`;
    if (pct == 1.0) {
        correct = true;
    }
    rb.logBookEvent({
        event: "webwork",
        div_id: data.inputs_ref.problemUUID.replace("-ww-rs",""), //todo unmangle problemid
        act: actString,
        correct: correct,
        answer: JSON.stringify(answerObj),
    });
}

function logShowCorrect(e, data) {
    rb.logBookEvent({
        event: "webwork",
        div_id: data.inputs_ref.problemUUID,
        act: "show",
    });
}

async function getScores(sid, wwId) {

}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.webwork = function(opts) {
    return new WebWork();
};

$(function() {
    $("body").on("runestone_ww_check", logWebWork);
    $("body").on("runestone_show_correct", logShowCorrect);
});


$(document).on("runestone:login-complete", function () {
    $("[data-component=webwork]").each(function (index) {
        // MC
        var opts = {
            orig: this,
            useRunestoneServices: eBookConfig.useRunestoneServices,
        };
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            window.wwList[this.id] = new WebWork(opts);
        }
    });
});

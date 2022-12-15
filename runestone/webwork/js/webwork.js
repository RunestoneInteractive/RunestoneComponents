import RunestoneBase from "../../common/js/runestonebase";

class WebWork extends RunestoneBase {
    constructor(opts) {
        super(opts);
    }
}

let rb = new WebWork();

function logWebWork(e, data) {
    var correct = false;
    let correctCount = 0;
    let qCount = 0;
    let actString = "check:";
    for (let k of Object.keys(data.rh_result.answers)) {
        qCount += 1;
        if (data.rh_result.answers[k].score == 1) {
            correctCount += 1;
        }
        actString += `actual:${data.rh_result.answers[k].original_student_ans}:expected:${data.rh_result.answers[k].correct_value}:`;
    }
    let pct = correctCount / qCount;
    actString += `correct:${correctCount}:count:${qCount}:pct:${pct}`;
    if (pct == 1.0) {
        correct = true;
    }
    rb.logBookEvent({
        event: "webwork",
        div_id: data.inputs_ref.problemUUID,
        act: actString,
        correct: correct,
    });
}

function logShowCorrect(e, data) {
    rb.logBookEvent({
        event: "webwork",
        div_id: data.inputs_ref.problemUUID,
        act: "show",
    });
}

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.webwork = function (opts) {
    return new WebWork();
};

$(function () {
    $("body").on("runestone_ww_check", logWebWork);
    $("body").on("runestone_show_correct", logShowCorrect);
});

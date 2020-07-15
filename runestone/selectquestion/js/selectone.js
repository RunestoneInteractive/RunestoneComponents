import {
    renderRunestoneComponent,
    createTimedComponent,
} from "../../common/js/renderComponent";
import RunestoneBase from "../../common/js/runestonebase";

export default class SelectOne extends RunestoneBase {
    constructor(opts) {
        super(opts);
        this.questions = $(opts.orig).data("questionlist");
        let newid = `q_${Math.floor(Math.random() * 1000000)}`;
        opts.orig.id = newid;
        let data = { questions: this.questions };
        let self = this;
        $.getJSON("/runestone/ajax/get_question_source", data, function (
            htmlsrc
        ) {
            let res;
            if (opts.timed) {
                res = createTimedComponent(htmlsrc, { timed: true });
                // replace the entry in the timed exam's list of components
                // with the component created by createTimedComponent
                for (let component of opts.rqa) {
                    if (component.question == self) {
                        component.question = res;
                        break;
                    }
                }
                self.realComponent = res;
                self.containerDiv = res.containerDiv;
            } else {
                res = renderRunestoneComponent(htmlsrc, newid, {});
            }
        });
    }
}

$(document).bind("runestone:login-complete", function () {
    $("[data-component=selectquestion]").each(function (index) {
        try {
            if (
                $(this).closest("[data-component=timedAssessment]").length == 0
            ) {
                // If this element exists within a timed component, don't render it here
                new SelectOne({ orig: this });
            }
        } catch (err) {
            console.log(`Error rendering New Exercise ${this.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    });
});

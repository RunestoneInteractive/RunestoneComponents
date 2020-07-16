import {
    renderRunestoneComponent,
    createTimedComponent,
} from "../../common/js/renderComponent";
import RunestoneBase from "../../common/js/runestonebase";

export default class SelectOne extends RunestoneBase {
    constructor(opts) {
        super(opts);
        this.origOpts = opts;
        this.questions = $(opts.orig).data("questionlist");
        this.selector_id = $(opts.orig).first().attr("id");
        opts.orig.id = this.selector_id;
    }

    initialize() {
        let self = this;
        let data = { questions: this.questions, selector_id: this.selector_id };
        let opts = this.origOpts;
        let selectorId = this.selector_id;
        let myPromise = new Promise(
            function (resolve, reject) {
                $.getJSON(
                    "/runestone/ajax/get_question_source",
                    data,
                    function (htmlsrc) {
                        let res;
                        if (opts.timed) {
                            res = createTimedComponent(htmlsrc, {
                                timed: true,
                                selector_id: selectorId,
                            });
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
                            res = renderRunestoneComponent(
                                htmlsrc,
                                selectorId,
                                {
                                    selector_id: selectorId,
                                }
                            );
                        }
                        resolve("done");
                    }
                );
            }.bind(this)
        );
        return myPromise;
    }
}

$(document).bind("runestone:login-complete", function () {
    $("[data-component=selectquestion]").each(function (index) {
        try {
            if (
                $(this).closest("[data-component=timedAssessment]").length == 0
            ) {
                // If this element exists within a timed component, don't render it here
                let tmp = new SelectOne({ orig: this });
                tmp.initialize();
            }
        } catch (err) {
            console.log(`Error rendering New Exercise ${this.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    });
});

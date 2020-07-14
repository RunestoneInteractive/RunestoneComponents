import { renderRunestoneComponent } from "../../common/js/renderComponent";
import RunestoneBase from "../../common/js/runestonebase";

export default class SelectOne extends RunestoneBase {
    constructor(opts) {
        super(opts);
        this.questions = $(opts.orig).data("questionlist");
        let newid = `q_${Math.floor(Math.random() * 1000000)}`;
        opts.orig.id = newid;
        let data = { questions: this.questions };

        $.getJSON("/runestone/ajax/get_question_source", data, function (
            htmlsrc
        ) {
            //$(opts.orig).replaceWith(htmlsrc);
            renderRunestoneComponent(htmlsrc, newid, {});
        });
    }
}

$(document).bind("runestone:login-complete", function () {
    $("[data-component=selectquestion]").each(function (index) {
        try {
            new SelectOne({ orig: this });
        } catch (err) {
            console.log(`Error rendering New Exercise ${this.id}
                         Details: ${err}`);
            console.log(err.stack);
        }
    });
});

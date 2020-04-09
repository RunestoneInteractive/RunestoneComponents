import { ActiveCode } from "./activecode.js";
require("./skulpt.min.js");
require("./skulpt-stdlib.js");

export default class JSActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
    }
    outputfun(a) {
        $(this.output).css("visibility", "visible");
        var str = "[";
        if (typeof a == "object" && a.length) {
            for (var i = 0; i < a.length; i++)
                if (typeof a[i] == "object" && a[i].length) {
                    str += (i == 0 ? "" : " ") + "[";
                    for (var j = 0; j < a[i].length; j++)
                        str +=
                            a[i][j] +
                            (j == a[i].length - 1
                                ? "]" + (i == a.length - 1 ? "]" : ",") + "\n"
                                : ", ");
                } else str += a[i] + (i == a.length - 1 ? "]" : ", ");
        } else {
            try {
                str = JSON.stringify(a);
            } catch (e) {
                str = a;
            }
        }
        return str;
    }
    runProg() {
        var _this = this;
        var prog = this.buildProg(true);
        var einfo;
        var scrubber_dfd, history_dfd;
        var saveCode = "True";
        var write = function (str) {
            _this.output.innerHTML += _this.outputfun(str);
        };
        var writeln = function (str) {
            if (!str) str = "";
            _this.output.innerHTML += _this.outputfun(str) + "<br />";
        };
        var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
        history_dfd = __ret.history_dfd;
        saveCode = __ret.saveCode;
        $(this.eContainer).remove();
        $(this.output).text("");
        $(this.outDiv).show({ duration: 700, queue: false });
        try {
            eval(prog);
            einfo = "success";
        } catch (e) {
            this.addErrorMessage(e);
            einfo = e;
        }
        this.logRunEvent({
            div_id: this.divid,
            code: this.editor.getValue(),
            errinfo: einfo,
            lang: this.language,
            to_save: saveCode,
            prefix: this.pretext,
            suffix: this.suffix,
            partner: this.partner,
        }); // Log the run event
    }
}

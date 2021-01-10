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
    async runProg() {
        var _this = this;
        var prog = await this.buildProg(true);
        var saveCode = "True";
        var write = function (str) {
            _this.output.innerHTML += _this.outputfun(str);
        };
        var writeln = function (str) {
            if (!str) str = "";
            _this.output.innerHTML += _this.outputfun(str) + "<br />";
        };
        this.saveCode = await this.manage_scrubber(saveCode);
        $(this.eContainer).remove();
        $(this.output).text("");
        $(this.outDiv).show({ duration: 700, queue: false });
        try {
            eval(prog);
            this.errinfo = "success";
        } catch (e) {
            this.addErrorMessage(e);
            this.errinfo = e;
        }
    }
}

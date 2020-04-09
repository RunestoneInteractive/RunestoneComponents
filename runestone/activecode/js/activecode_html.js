import { ActiveCode } from "./activecode.js";

export default class HTMLActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        opts.alignVertical = true;
        this.code = $("<textarea />").html(this.origElem.innerHTML).text();
        $(this.runButton).text("Render");
        this.editor.setValue(this.code);
    }

    runProg() {
        var prog = this.buildProg(true);
        var scrubber_dfd, history_dfd, saveCode;
        saveCode = "True";
        var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
        history_dfd = __ret.history_dfd;
        saveCode = __ret.saveCode;
        //    $('#'+myDiv+'_iframe').remove();
        //    $('#'+myDiv+'_htmlout').show();
        //    $('#'+myDiv+'_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
        //        prog.replace(/"/g,"'") + '">' + '</iframe>');
        $(this.output).text("");
        if (!this.alignVertical) {
            $(this.codeDiv).switchClass("col-md-12", "col-md-6", {
                duration: 500,
                queue: false,
            });
        }
        $(this.outDiv).show({ duration: 700, queue: false });
        prog =
            "<script type=text/javascript>window.onerror = function(msg,url,line) {alert(msg+' on line: '+line);};</script>" +
            prog;
        this.output.srcdoc = prog;
        this.logRunEvent({
            div_id: this.divid,
            code: this.editor.getValue(),
            errinfo: "success",
            to_save: saveCode,
            prefix: this.pretext,
            suffix: this.suffix,
            lang: this.language,
            partner: this.partner,
        }); // Log the run event
    }
    createOutput() {
        this.alignVertical = true;
        var outDiv = document.createElement("div");
        $(outDiv).addClass("ac_output");
        if (this.alignVertical) {
            $(outDiv).addClass("col-md-12");
        } else {
            $(outDiv).addClass("col-md-5");
        }
        this.outDiv = outDiv;
        this.output = document.createElement("iframe");
        $(this.output).css("background-color", "white");
        $(this.output).css("position", "relative");
        $(this.output).css("height", "400px");
        $(this.output).css("width", "100%");
        outDiv.appendChild(this.output);
        this.outerDiv.appendChild(outDiv);
        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
    }
    enableSaveLoad() {
        $(this.runButton).text($.i18n("msg_activecode_render"));
    }
}

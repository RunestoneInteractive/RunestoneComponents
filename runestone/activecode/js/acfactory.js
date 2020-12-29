import { ActiveCode } from "./activecode.js";
import JSActiveCode from "./activecode_js.js";
import HTMLActiveCode from "./activecode_html.js";
import SQLActiveCode from "./activecode_sql.js";
import LiveCode from "./livecode.js";
import {
    TimedActiveCode,
    TimedLiveCode,
    TimedJSActiveCode,
    TimedHTMLActiveCode,
    TimedSQLActiveCode,
} from "./timed_activecode";

export default class ACFactory {
    constructor() {
        this.foo = "bar";
    }
    static createActiveCode(orig, lang, addopts) {
        var opts = {
            orig: orig,
            useRunestoneServices: eBookConfig.useRunestoneServices,
            python3: eBookConfig.python3,
        };
        if (addopts) {
            for (var attrname in addopts) {
                opts[attrname] = addopts[attrname];
            }
        }
        if (opts.timed == true) {
            if (lang === "python") {
                return new TimedActiveCode(opts);
            } else if (
                lang === "java" ||
                lang === "cpp" ||
                lang === "c" ||
                lang === "python3"
            ) {
                return new TimedLiveCode(opts);
            } else if (lang === "javascript") {
                return new TimedJSActiveCode(opts);
            } else if (lang === "htmlmixed") {
                return new TimedHTMLActiveCode(opts);
            } else if (lang === "sql") {
                return new TimedSQLActiveCode(opts);
            } else {
                return new TimedActiveCode(opts);
            }
        } else {
            if (lang === "javascript") {
                return new JSActiveCode(opts);
            } else if (lang === "htmlmixed") {
                return new HTMLActiveCode(opts);
            } else if (lang === "sql") {
                return new SQLActiveCode(opts);
            } else if (
                ["java", "cpp", "c", "python3", "python2", "octave"].indexOf(
                    lang
                ) > -1
            ) {
                return new LiveCode(opts);
            } else {
                // default is python
                return new ActiveCode(opts);
            }
        }
    }
    // used by web2py controller(s)
    static addActiveCodeToDiv(outerdivid, acdivid, sid, initialcode, language) {
        var thepre, newac;
        var acdiv = document.getElementById(acdivid);
        $(acdiv).empty();
        thepre = document.createElement("textarea");
        thepre["data-component"] = "activecode";
        thepre.id = outerdivid;
        $(thepre).data("lang", language);
        $(acdiv).append(thepre);
        var opts = {
            orig: thepre,
            useRunestoneServices: true,
        };
        var addopts = {
            sid: sid,
            graderactive: true,
        };
        if (language === "htmlmixed") {
            addopts["vertical"] = true;
        }
        newac = ACFactory.createActiveCode(thepre, language, addopts);
        var savediv = newac.divid;
        newac.divid = savediv;
        newac.editor.setSize(500, 300);
        setTimeout(function () {
            newac.editor.refresh();
        }, 500);
    }
    static createActiveCodeFromOpts(opts) {
        return ACFactory.createActiveCode(opts.orig, opts.lang, opts);
    }
    static createScratchActivecode() {
        /* set up the scratch Activecode editor in the search menu */
        // use the URL to assign a divid - each page should have a unique Activecode block id.
        // Remove everything from the URL but the course and page name
        // todo:  this could probably be eliminated and simply moved to the template file

        if (eBookConfig.enableScratchAC == false) return;

        var divid = eBookConfig.course + "_scratch_ac";
        divid = divid.replace(/[#.]/g, ""); // in case book title has characters that will mess up our selectors
        eBookConfig.scratchDiv = divid;
        let stdin = "";
        var lang = eBookConfig.acDefaultLanguage
            ? eBookConfig.acDefaultLanguage
            : "python";
        if (lang === "java" || lang === "cpp" || lang === "python3") {
            stdin = `data-stdin="text for stdin"`;
        }
        // generate the HTML
        var html = `<div id="ac_modal_${divid}" class="modal fade">
              <div class="modal-dialog scratch-ac-modal">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title">Scratch ActiveCode</h4>
                  </div>
                  <div class="modal-body">
                  <div data-component="activecode" id=${divid}>
                  <div id=${divid}_question class="ac_question"><p>Use this area for writing code or taking notes.</p></div>
                  <textarea data-codelens="true" data-lang="${lang}" ${stdin}>




                  </textarea>
                  </div>
                  </div>
                </div>
              </div>
            </div>`;
        var el = $(html);
        $("body").append(el);
        el.on("shown.bs.modal show.bs.modal", function () {
            el.find(".CodeMirror").each(function (i, e) {
                e.CodeMirror.refresh();
                e.CodeMirror.focus();
            });
        });
    }
    static toggleScratchActivecode() {
        var divid = "ac_modal_" + eBookConfig.scratchDiv;
        var div = $("#" + divid);
        $(`#${eBookConfig.scratchDiv}`).removeClass("ac_section");
        div.modal("toggle");
    }
}

//
// Page Initialization
//

$(document).ready(function () {
    ACFactory.createScratchActivecode();
    $("[data-component=activecode]").each(function (index) {
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            try {
                window.edList[this.id] = ACFactory.createActiveCode(
                    this,
                    $(this).find("textarea").data("lang")
                );
            } catch (err) {
                console.log(`Error rendering Activecode Problem ${this.id}
                Details: ${err}`);
            }
        }
    });
    if (loggedout) {
        for (let k in window.edList) {
            window.edList[k].disableSaveLoad();
        }
    } else {
        for (let k in window.edList) {
            window.edList[k].enableSaveLoad();
        }
    }
});

if (typeof window.component_factory === "undefined") {
    window.component_factory = {};
}

window.component_factory.activecode = ACFactory.createActiveCodeFromOpts;

// This is the easiest way to expose this outside the module.
window.ACFactory = ACFactory;

// This seems a bit hacky and possibly brittle, but its hard to know how long it will take to
// figure out the login/logout status of the user.  Sometimes its immediate, and sometimes its
// long.  So to be safe we'll do it both ways..
var loggedout;
$(document).bind("runestone:logout", function () {
    loggedout = true;
});
$(document).bind("runestone:logout", function () {
    for (let k in window.edList) {
        if (window.edList.hasOwnProperty(k)) {
            window.edList[k].disableSaveLoad();
        }
    }
});

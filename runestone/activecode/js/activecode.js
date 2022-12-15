/**
 *
 * Created by bmiller on 3/19/15.
 */
/* Define global variables for ESLint */
/* global Sk */

"use strict";

import RunestoneBase from "../../common/js/runestonebase.js";
import AudioTour from "./audiotour.js";
import "./activecode-i18n.en.js";
import "./activecode-i18n.pt-br.js";
import "./activecode-i18n.sr-Cyrl.js";
import CodeMirror from "codemirror";
import "codemirror/mode/python/python.js";
import "codemirror/mode/css/css.js";
import "codemirror/mode/htmlmixed/htmlmixed.js";
import "codemirror/mode/xml/xml.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/clike/clike.js";
import "codemirror/mode/octave/octave.js";
import "./../css/activecode.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/sql-hint.js";
import "codemirror/addon/hint/anyword-hint.js";
import "codemirror/addon/edit/matchbrackets.js";
import "./skulpt.min.js";
import "./skulpt-stdlib.js";
// Used by Skulpt.
import embed from "vega-embed";
// Adapt for use outside webpack -- see https://github.com/vega/vega-embed.
window.vegaEmbed = embed;

var isMouseDown = false;
document.onmousedown = function () {
    isMouseDown = true;
};

document.onmouseup = function () {
    isMouseDown = false;
};
window.edList = {};

var socket, connection, doc;
var chatcodesServer = "chat.codes";

CodeMirror.commands.autocomplete = function (cm) {
    cm.showHint({ hint: CodeMirror.hint.anyword });
};

// separate into constructor and init
export class ActiveCode extends RunestoneBase {
    constructor(opts) {
        super(opts);
        var suffStart;
        var orig = $(opts.orig).find("textarea")[0];
        this.containerDiv = opts.orig;
        this.useRunestoneServices = opts.useRunestoneServices;
        this.python3 = true;
        this.alignVertical = opts.vertical;
        this.origElem = orig;
        this.origText = this.origElem.textContent;
        this.divid = opts.orig.id;
        this.code = $(orig).text() || "\n\n\n\n\n";
        this.language = $(orig).data("lang");
        this.timelimit = $(orig).data("timelimit");
        this.includes = $(orig).data("include");
        this.hidecode = $(orig).data("hidecode");
        this.chatcodes = $(orig).data("chatcodes");
        this.hidehistory = $(orig).data("hidehistory");
        this.question = $(opts.orig).find(`#${this.divid}_question`)[0];
        this.tie = $(orig).data("tie");
        this.dburl = $(orig).data("dburl");
        this.runButton = null;
        this.enabledownload = $(orig).data("enabledownload");
        this.downloadButton = null;
        this.saveButton = null;
        this.loadButton = null;
        this.outerDiv = null;
        this.partner = "";
        this.runCount = 0;
        this.logResults = true;
        if (!eBookConfig.allow_pairs || $(orig).data("nopair")) {
            this.enablePartner = false;
        } else {
            this.enablePartner = true;
        }
        this.output = null; // create pre for output
        this.graphics = null; // create div for turtle graphics
        this.codecoach = null;
        this.codelens = null;
        this.controlDiv = null;
        this.historyScrubber = null;
        this.timestamps = ["Original"];
        this.autorun = $(orig).data("autorun");
        if (this.chatcodes && eBookConfig.enable_chatcodes) {
            if (!socket) {
                socket = new WebSocket("wss://" + chatcodesServer);
            }
            if (!connection) {
                connection = new window.sharedb.Connection(socket);
            }
            if (!doc) {
                doc = connection.get("chatcodes", "channels");
            }
        }
        if (this.graderactive || this.isTimed) {
            this.hidecode = false;
        }
        if (this.includes) {
            this.includes = this.includes.split(/\s+/);
        }
        let prefixEnd = this.code.indexOf("^^^^");
        if (prefixEnd > -1) {
            this.prefix = this.code.substring(0, prefixEnd);
            this.code = this.code.substring(prefixEnd + 5);
        }
        suffStart = this.code.indexOf("====");
        if (suffStart > -1) {
            this.suffix = this.code.substring(suffStart + 5);
            this.code = this.code.substring(0, suffStart);
        }
        this.history = [this.code];
        this.createEditor();
        this.createOutput();
        this.createControls();
        if ($(orig).data("caption")) {
            this.caption = $(orig).data("caption");
        } else {
            this.caption = "ActiveCode";
        }
        this.addCaption("runestone");
        setTimeout(
            function () {
                this.editor.refresh();
            }.bind(this),
            1000
        );
        if (this.autorun) {
            // Simulate pressing the run button, since this will also prevent the user from clicking it until the initial run is complete, and also help the user understand why they're waiting.
            $(this.runButtonHandler.bind(this));
        }
        this.indicate_component_ready();
        if (typeof Prism !== "undefined") {
            Prism.highlightAllUnder(this.containerDiv);
        }
    }

    createEditor(index) {
        this.outerDiv = document.createElement("div");
        var linkdiv = document.createElement("div");
        linkdiv.id = this.divid.replace(/_/g, "-").toLowerCase(); // :ref: changes _ to - so add this as a target
        var codeDiv = document.createElement("div");
        $(codeDiv).addClass("ac_code_div col-md-12");
        this.codeDiv = codeDiv;
        this.outerDiv.lang = this.language;
        $(this.origElem).replaceWith(this.outerDiv);
        if (linkdiv.id !== this.divid) {
            // Don't want the 'extra' target if they match.
            this.outerDiv.appendChild(linkdiv);
        }
        this.outerDiv.appendChild(codeDiv);
        var edmode = this.outerDiv.lang;
        if (edmode === "sql") {
            edmode = "text/x-sql";
        } else if (edmode === "java") {
            edmode = "text/x-java";
        } else if (edmode === "cpp") {
            edmode = "text/x-c++src";
        } else if (edmode === "c") {
            edmode = "text/x-csrc";
        } else if (edmode === "python3") {
            edmode = "python";
        } else if (edmode === "octave" || edmode === "MATLAB") {
            edmode = "text/x-octave";
        }
        var editor = CodeMirror(codeDiv, {
            value: this.code,
            lineNumbers: true,
            mode: edmode,
            indentUnit: 4,
            matchBrackets: true,
            autoMatchParens: true,
            extraKeys: {
                Tab: "indentMore",
                "Shift-Tab": "indentLess",
                "Ctrl-Space": "autocomplete",
            },
        });
        // Make the editor resizable
        $(editor.getWrapperElement()).resizable({
            resize: function () {
                editor.setSize($(this).width(), $(this).height());
                editor.refresh();
            },
        });
        // give the user a visual cue that they have changed but not saved
        editor.on(
            "change",
            function (ev) {
                if (
                    editor.acEditEvent == false ||
                    editor.acEditEvent === undefined
                ) {
                    // change events can come before any real changes for various reasons, some unknown
                    // this avoids unneccsary log events and updates to the activity counter
                    // offsetParent === null means that the element is not on the screen and so can't change
                    // this.controlDiv.offsetParent
                    if (
                        this.origText === editor.getValue() ||
                        this.addingScrubber
                    ) {
                        console.log("Fake change event, skipping the log");
                        return;
                    }
                    $(editor.getWrapperElement()).css(
                        "border-top",
                        "2px solid #b43232"
                    );
                    $(editor.getWrapperElement()).css(
                        "border-bottom",
                        "2px solid #b43232"
                    );
                    this.isAnswered = true;
                    // the first time the student types in the write-code box
                    this.logBookEvent({
                        event: "activecode",
                        act: "edit",
                        div_id: this.divid,
                    });
                }
                editor.acEditEvent = true;
            }.bind(this)
        ); // use bind to preserve *this* inside the on handler.
        //Solving Keyboard Trap of ActiveCode: If user use tab for navigation outside of ActiveCode, then change tab behavior in ActiveCode to enable tab user to tab out of the textarea
        $(window).keydown(function (e) {
            var code = e.keyCode ? e.keyCode : e.which;
            if (code == 9 && $("textarea:focus").length === 0) {
                editor.setOption("extraKeys", {
                    Tab: function (cm) {
                        $(document.activeElement)
                            .closest(".tab-content")
                            .nextSibling.focus();
                    },
                    "Shift-Tab": function (cm) {
                        $(document.activeElement)
                            .closest(".tab-content")
                            .previousSibling.focus();
                    },
                });
            }
        });
        this.editor = editor;
        if (this.hidecode) {
            $(this.codeDiv).css("display", "none");
        }
    }

    async runButtonHandler() {
        // Disable the run button until the run is finished.
        this.runButton.disabled = true;
        try {
            await this.runProg();
        } catch (e) {
            console.log(`there was an error ${e} running the code`);
        }
        if (this.logResults) {
            this.logCurrentAnswer();
        }
        this.renderFeedback();
        // The run is finished; re-enable the button.
        this.runButton.disabled = false;
        this.runCount += 1;
        this.toggleAlert();
    }

    createControls() {
        var ctrlDiv = document.createElement("div");
        var butt;
        $(ctrlDiv).addClass("ac_actions");
        $(ctrlDiv).addClass("col-md-12");
        // Run
        butt = document.createElement("button");
        $(butt).text($.i18n("msg_activecode_run_code"));
        $(butt).addClass("btn btn-success run-button");
        ctrlDiv.appendChild(butt);
        this.runButton = butt;
        // console.log("adding click function for run");
        this.runButton.onclick = this.runButtonHandler.bind(this);
        $(butt).attr("type", "button");

        if (this.enabledownload || eBookConfig.downloadsEnabled) {
            this.addDownloadButton(ctrlDiv);
        }
        if (!this.hidecode && !this.hidehistory) {
            this.addHistoryScrubber(true);
        }
        if ($(this.origElem).data("gradebutton") && !this.graderactive) {
            this.addFeedbackButton(ctrlDiv);
        }
        // Show/Hide Code
        if (this.hidecode) {
            this.enableHideShow(ctrlDiv);
        }
        // CodeLens
        if ($(this.origElem).data("codelens") && !this.graderactive) {
            this.enableCodeLens(ctrlDiv);
        }
        // Audio Tour
        if ($(this.origElem).data("audio")) {
            this.enableAudioTours(ctrlDiv);
        }
        if (eBookConfig.isInstructor) {
            this.enableInstructorSharing(ctrlDiv);
        }
        if (this.enablePartner) {
            this.setupPartner(ctrlDiv);
        }
        if (this.chatcodes && eBookConfig.enable_chatcodes) {
            this.enableChatCodes(ctrlDiv);
        }

        $(this.outerDiv).prepend(ctrlDiv);
        if (this.question) {
            if ($(this.question).html().match(/^\s+$/)) {
                $(this.question).remove();
            } else {
                $(this.outerDiv).prepend(this.question);
            }
        }
        this.controlDiv = ctrlDiv;
    }

    addFeedbackButton(ctrlDiv) {
        let butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_feedback"));
        $(butt).css("margin-left", "10px");
        $(butt).attr("type", "button");
        this.gradeButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.createGradeSummary.bind(this));
    }

    addDownloadButton(ctrlDiv) {
        let butt = document.createElement("button");
        $(butt).text("Download");
        $(butt).addClass("btn save-button");
        ctrlDiv.appendChild(butt);
        this.downloadButton = butt;
        $(butt).click(this.downloadFile.bind(this, this.language));
        $(butt).attr("type", "button");
    }

    enableHideShow(ctrlDiv) {
        $(this.runButton).attr("disabled", "disabled");
        let butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_code"));
        $(butt).css("margin-left", "10px");
        $(butt).attr("type", "button");
        this.showHideButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(
            function () {
                $(this.codeDiv).toggle();
                if (this.historyScrubber == null) {
                    this.addHistoryScrubber(true);
                } else {
                    $(this.historyScrubber.parentElement).toggle();
                }
                if (
                    $(this.showHideButt).text() ==
                    $.i18n("msg_activecode_show_code")
                ) {
                    $(this.showHideButt).text(
                        $.i18n("msg_activecode_hide_code")
                    );
                } else {
                    $(this.showHideButt).text(
                        $.i18n("msg_activecode_show_code")
                    );
                }
                if ($(this.runButton).attr("disabled")) {
                    $(this.runButton).removeAttr("disabled");
                } else {
                    $(this.runButton).attr("disabled", "disabled");
                }
            }.bind(this)
        );
    }

    enableCodeLens(ctrlDiv) {
        let butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_show_codelens"));
        $(butt).css("margin-left", "10px");
        this.clButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodelens.bind(this));
    }

    enableAudioTours(ctrlDiv) {
        let butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text($.i18n("msg_activecode_audio_tour"));
        $(butt).css("margin-left", "10px");
        this.atButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(
            function () {
                new AudioTour(
                    this.divid,
                    this.code,
                    1,
                    $(this.origElem).data("audio")
                );
            }.bind(this)
        );
    }

    enableInstructorSharing(ctrlDiv) {
        let butt = document.createElement("button");
        $(butt).addClass("btn btn-info");
        $(butt).text("Share Code");
        $(butt).css("margin-left", "10px");
        this.shareButt = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(
            async function () {
                if (
                    !confirm(
                        "You are about to share this code with ALL of your students.  Are you sure you want to continue?"
                    )
                ) {
                    return;
                }
                let data = {
                    divid: this.divid,
                    code: this.editor.getValue(),
                    lang: this.language,
                };
                let request = new Request(
                    eBookConfig.ajaxURL + "broadcast_code.json",
                    {
                        method: "POST",
                        headers: this.jsonHeaders,
                        body: JSON.stringify(data),
                    }
                );
                let post_promise = await fetch(request);
                let status = await post_promise.json();
                if (status.mess === "success") {
                    alert(`Shared Code with ${status.share_count} students`);
                } else {
                    alert("Sharing Failed");
                }
            }.bind(this)
        );
    }

    setupPartner(ctrlDiv) {
        var checkPartner = document.createElement("input");
        checkPartner.type = "checkbox";
        checkPartner.id = `${this.divid}_part`;
        ctrlDiv.appendChild(checkPartner);
        var plabel = document.createElement("label");
        plabel.for = `${this.divid}_part`;
        $(plabel).text("Pair?");
        ctrlDiv.appendChild(plabel);
        $(checkPartner).click(
            function () {
                if (this.partner) {
                    this.partner = false;
                    $(partnerTextBox).hide();
                    this.partner = "";
                    partnerTextBox.value = "";
                    $(plabel).text("Pair?");
                } else {
                    let didAgree = localStorage.getItem("partnerAgree");
                    if (!didAgree) {
                        didAgree = confirm(
                            "Pair Programming should only be used with the consent of your instructor." +
                                "Your partner must be a registered member of the class and have agreed to pair with you." +
                                "By clicking OK you certify that both of these conditions have been met."
                        );
                        if (didAgree) {
                            localStorage.setItem("partnerAgree", "true");
                        } else {
                            return;
                        }
                    }
                    this.partner = true;
                    $(plabel).text("with: ");
                    $(partnerTextBox).show();
                }
            }.bind(this)
        );
        var partnerTextBox = document.createElement("input");
        partnerTextBox.type = "text";
        ctrlDiv.appendChild(partnerTextBox);
        $(partnerTextBox).hide();
        $(partnerTextBox).change(
            function () {
                this.partner = partnerTextBox.value;
            }.bind(this)
        );
    }

    // This is probably obsolete.  Not sure if anyone at Michigan will come back
    // to working on this again.
    enableChatCodes(ctrlDiv) {
        var chatBar = document.createElement("div");
        var channels = document.createElement("span");
        var topic = window.location.host + "-" + this.divid;
        ctrlDiv.appendChild(chatBar);
        $(chatBar).text("Chat: ");
        $(chatBar).append(channels);
        let butt = document.createElement("a");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text("Create Channel");
        $(butt).css("margin-left", "10px");
        $(butt).attr("type", "button");
        $(butt).attr("target", "_blank");
        $(butt).attr(
            "href",
            "http://" +
                chatcodesServer +
                "/new?" +
                $.param({
                    topic: window.location.host + "-" + this.divid,
                    code: this.editor.getValue(),
                    lang: "Python",
                })
        );
        this.chatButton = butt;
        chatBar.appendChild(butt);
        var updateChatCodesChannels = function () {
            var data = doc.data;
            var i = 1;
            $(channels).html("");
            data["channels"].forEach(function (channel) {
                if (!channel.archived && topic === channel.topic) {
                    var link = $("<a />");
                    var href =
                        "http://" + chatcodesServer + "/" + channel.channelName;
                    link.attr({
                        href: href,
                        target: "_blank",
                    });
                    link.text(" " + channel.channelName + "(" + i + ") ");
                    $(channels).append(link);
                    i++;
                }
            });
            if (i === 1) {
                $(channels).text("(no active converstations on this problem)");
            }
        };
        doc.subscribe(updateChatCodesChannels);
        doc.on("op", updateChatCodesChannels);
    }

    enableSaveLoad() {
        $(this.runButton).text($.i18n("msg_activecode_save_run"));
    }

    // _`addHistoryScrubber`
    // ---------------------
    // Activecode -- If the code has not changed wrt the scrubber position value then don't save the code or reposition the scrubber
    //  -- still call runlog, but add a parameter to not save the code
    // add an initial load history button
    // if there is no edit then there is no append   to_save (True/False)
    async addHistoryScrubber(pos_last) {
        this.addingScrubber = true;
        let response;
        var reqData = {
            acid: this.divid,
        };
        if (this.sid !== undefined) {
            reqData["sid"] = this.sid;
        }
        console.log("before get hist");
        if (
            eBookConfig.practice_mode ||
            !eBookConfig.isLoggedIn ||
            (this.isTimed && !this.assessmentTaken)
        ) {
            // If this is timed and already taken we should restore history info
            this.renderScrubber();
        } else {
            let request = new Request(
                `${eBookConfig.new_server_prefix}/assessment/gethist`,
                {
                    method: "POST",
                    headers: this.jsonHeaders,
                    body: JSON.stringify(reqData),
                }
            );
            try {
                response = await fetch(request);
                let data = await response.json();
                if (!response.ok) {
                    throw new Error(
                        `Failed to get the history data: ${data.detail}`
                    );
                }
                data = data.detail;
                if (data.history !== undefined) {
                    this.history = this.history.concat(data.history);
                    for (let t in data.timestamps) {
                        this.timestamps.push(
                            new Date(data.timestamps[t]).toLocaleString()
                        );
                    }
                }
            } catch (e) {
                console.log(`unable to fetch history: ${e}`);
            }
            this.renderScrubber(pos_last);
        }
        this.addingScrubber = false;
        return "success";
    }

    renderScrubber(pos_last) {
        console.log("making a new scrubber");
        var scrubberDiv = document.createElement("div");
        $(scrubberDiv).css("display", "inline-block");
        $(scrubberDiv).css("margin-left", "10px");
        $(scrubberDiv).css("margin-right", "10px");
        $(scrubberDiv).css({
            "min-width": "200px",
            "max-width": "300px",
        });
        var scrubber = document.createElement("div");
        this.timestampP = document.createElement("span");
        this.slideit = function (ev, el) {
            this.editor.setValue(this.history[$(scrubber).slider("value")]);
            var curVal = this.timestamps[$(scrubber).slider("value")];
            let pos = $(scrubber).slider("value");
            let outOf = this.history.length;
            $(this.timestampP).text(`${curVal} - ${pos + 1} of ${outOf}`);
            // a slide will also result in a slidechange event we don't want to double
            // log these events.  So do not log the slide until it stops and creates the changed
            if (ev !== null && ev.type != "slide") {
                this.logBookEvent({
                    event: "activecode",
                    act: "slide:" + curVal,
                    div_id: this.divid,
                });
            }
        };
        $(scrubber).slider({
            max: this.history.length - 1,
            value: this.history.length - 1,
        });
        $(scrubber).css("margin", "10px");
        $(scrubber).on("slide", this.slideit.bind(this));
        $(scrubber).on("slidechange", this.slideit.bind(this));
        scrubberDiv.appendChild(scrubber);
        scrubberDiv.appendChild(this.timestampP);
        // If there is a deadline set then position the scrubber at the last submission
        // prior to the deadline
        if (this.deadline) {
            let i = 0;
            let done = false;
            while (i < this.history.length && !done) {
                if (new Date(this.timestamps[i]) > this.deadline) {
                    done = true;
                } else {
                    i += 1;
                }
            }
            i = i - 1;
            scrubber.value = Math.max(i, 0);
            this.editor.setValue(this.history[scrubber.value]);
            $(scrubber).slider("value", scrubber.value);
        } else if (pos_last) {
            scrubber.value = this.history.length - 1;
            this.editor.setValue(this.history[scrubber.value]);
        } else {
            scrubber.value = 0;
        }
        let pos = $(scrubber).slider("value");
        let outOf = this.history.length;
        let ts = this.timestamps[$(scrubber).slider("value")];
        $(this.timestampP).text(`${ts} - ${pos + 1} of ${outOf}`);
        this.historyScrubber = scrubber;
        $(scrubberDiv).insertAfter(this.runButton);
    } // end definition of helper

    createOutput() {
        // Create a parent div with two elements:  pre for standard output and a div
        // to hold turtle graphics output.  We use a div in case the turtle changes from
        // using a canvas to using some other element like svg in the future.
        var outDiv = document.createElement("div");
        $(outDiv).addClass("ac_output col-md-12");
        this.outDiv = outDiv;
        this.output = document.createElement("pre");
        this.output.id = this.divid + "_stdout";
        $(this.output).css("visibility", "hidden");
        this.graphics = document.createElement("div");
        this.graphics.id = this.divid + "_graphics";
        $(this.graphics).addClass("ac-canvas");
        // This bit of magic adds an event which waits for a canvas child to be created on our
        // newly created div.  When a canvas child is added we add a new class so that the visible
        // canvas can be styled in CSS.  Which a the moment means just adding a border.
        $(this.graphics).on(
            "DOMNodeInserted",
            "canvas",
            function () {
                $(this.graphics).addClass("visible-ac-canvas");
            }.bind(this)
        );
        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
        outDiv.appendChild(this.output);
        outDiv.appendChild(this.graphics);
        this.outerDiv.appendChild(outDiv);
        var lensDiv = document.createElement("div");
        lensDiv.id = `${this.divid}_codelens`;
        $(lensDiv).addClass("col-md-12");
        $(lensDiv).css("display", "none");
        this.codelens = lensDiv;
        this.outerDiv.appendChild(lensDiv);
        var coachDiv = document.createElement("div");
        $(coachDiv).addClass("col-md-12");
        $(coachDiv).css("display", "none");
        this.codecoach = coachDiv;
        this.outerDiv.appendChild(coachDiv);
        clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
    }

    disableSaveLoad() {
        $(this.saveButton).addClass("disabled");
        $(this.saveButton).attr("title", "Login to save your code");
        $(this.loadButton).addClass("disabled");
        $(this.loadButton).attr("title", "Login to load your code");
    }

    downloadFile(lang) {
        var fnb = this.divid;
        var d = new Date();
        var fileName =
            fnb +
            "_" +
            d
                .toJSON()
                .substring(0, 10) // reverse date format
                .split("-")
                .join("") +
            "." +
            languageExtensions[lang];
        var code = this.editor.getValue();
        if ("Blob" in window) {
            var textToWrite = code.replace(/\n/g, "\r\n");
            var textFileAsBlob = new Blob([textToWrite], {
                type: "text/plain",
            });
            if ("msSaveOrOpenBlob" in navigator) {
                navigator.msSaveOrOpenBlob(textFileAsBlob, fileName);
            } else {
                var downloadLink = document.createElement("a");
                downloadLink.download = fileName;
                downloadLink.innerHTML = "Download File";
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }
        } else {
            alert("Your browser does not support the HTML5 Blob.");
        }
    }

    async createGradeSummary() {
        // get grade and comments for this assignment
        // get summary of all grades for this student
        // display grades in modal window
        var data = {
            div_id: this.divid,
        };
        let request = new Request(eBookConfig.ajaxURL + "getassignmentgrade", {
            method: "POST",
            headers: this.jsonHeaders,
            body: JSON.stringify(data),
        });
        let response = await fetch(request);
        let report = await response.json();
        var body;
        // check for report['message']
        if (report) {
            if (report["version"] == 2) {
                // new version; would be better to embed this in HTML for the activecode
                body =
                    "<h4>Grade Report</h4>" +
                    "<p>This question: " +
                    report["grade"];
                if (report["released"]) {
                    body += " out of " + report["max"];
                }
                body += "</p> <p>";
                if (report["released"] == false) {
                    body += "Preliminary Comments: ";
                }
                body += report["comment"] + "</p>";
            } else {
                body =
                    "<h4>Grade Report</h4>" +
                    "<p>This assignment: " +
                    report["grade"] +
                    "</p>" +
                    "<p>" +
                    report["comment"] +
                    "</p>" +
                    "<p>Number of graded assignments: " +
                    report["count"] +
                    "</p>" +
                    "<p>Average score: " +
                    report["avg"] +
                    "</p>";
            }
        } else {
            body = "<h4>The server did not return any grade information</h4>";
        }
        var html = `<div class="modal fade">
                  <div class="modal-dialog compare-modal">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        <h4 class="modal-title">Assignment Feedback</h4>
                      </div>
                      <div class="modal-body">
                        ${body}
                      </div>
                    </div>
                  </div>
                </div>`;
        var el = $(html);
        el.modal();

        return response;
    }

    async showCodelens() {
        if (this.codelens.style.display == "none") {
            this.codelens.style.display = "block";
            this.clButton.innerText = $.i18n("msg_activecode_hide_codelens");
        } else {
            this.codelens.style.display = "none";
            this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
            return;
        }
        var cl = this.codelens.firstChild;
        if (cl) {
            this.codelens.removeChild(cl);
        }
        var code = await this.buildProg(false);
        var myVars = {};
        myVars.code = code;
        myVars.origin = "opt-frontend.js";
        myVars.cumulative = false;
        myVars.heapPrimitives = false;
        myVars.drawParentPointers = false;
        myVars.textReferences = false;
        myVars.showOnlyOutputs = false;
        myVars.rawInputLstJSON = JSON.stringify([]);
        if (this.language == "python") {
            if (this.python3) {
                myVars.py = 3;
            } else {
                myVars.py = 2;
            }
        } else if (this.langauge == "javascript") {
            myVars.py = "js";
        } else {
            myVars.py = this.language;
        }
        myVars.curInstr = 0;
        myVars.codeDivWidth = 350;
        myVars.codeDivHeight = 400;
        var srcURL = "https://pythontutor.com/iframe-embed.html";
        var srcVars = $.param(myVars);
        var embedUrlStr = `${srcURL}#${srcVars}`;
        var myIframe = document.createElement("iframe");
        myIframe.setAttribute("id", this.divid + "_codelens");
        myIframe.setAttribute("width", "100%");
        myIframe.setAttribute("height", "500");
        myIframe.setAttribute("style", "display:block");
        myIframe.style.background = "#fff";
        //myIframe.setAttribute("src",srcURL)
        myIframe.src = embedUrlStr;
        this.codelens.appendChild(myIframe);
        this.logBookEvent({
            event: "codelens",
            act: "view",
            div_id: this.divid,
        });
    }
    // <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
    // </iframe>
    showCodeCoach() {
        var myIframe;
        var srcURL;
        var cl;
        var div_id = this.divid;
        if (this.codecoach === null) {
            this.codecoach = document.createElement("div");
            this.codecoach.style.display = "block";
        }
        cl = this.codecoach.firstChild;
        if (cl) {
            this.codecoach.removeChild(cl);
        }
        srcURL = eBookConfig.app + "/admin/diffviewer?divid=" + div_id;
        myIframe = document.createElement("iframe");
        myIframe.setAttribute("id", div_id + "_coach");
        myIframe.setAttribute("width", "100%");
        myIframe.setAttribute("height", "500px");
        myIframe.setAttribute("style", "display:block");
        myIframe.style.background = "#fff";
        myIframe.style.width = "100%";
        myIframe.src = srcURL;
        this.codecoach.appendChild(myIframe);
        $(this.codecoach).show();
        this.logBookEvent({
            event: "coach",
            act: "view",
            div_id: this.divid,
        });
    }

    toggleEditorVisibility() {}

    addErrorMessage(err) {
        // Add the error message
        this.errLastRun = true;
        var errHead = $("<h3>").html("Error");
        this.eContainer = this.outerDiv.appendChild(
            document.createElement("div")
        );
        this.eContainer.className = "error alert alert-danger";
        this.eContainer.id = this.divid + "_errinfo";
        this.eContainer.appendChild(errHead[0]);
        var errText = this.eContainer.appendChild(
            document.createElement("pre")
        );
        // But, adjust the line numbers.  If the line number is <= pretextLines then it is in included code
        // if it is greater than the number of included lines but less than the pretext + current editor then it is in the student code.
        // adjust the line number we display by eliminating the pre-included code.
        if (err.traceback.length >= 1) {
            var errorLine = err.traceback[0].lineno;
            if (errorLine <= this.pretextLines) {
                errText.innerHTML =
                    "An error occurred in the hidden, included code. Sorry we can't give you a more helpful error message";
                return;
            } else if (errorLine > this.progLines + this.pretextLines) {
                errText.innerHTML = `An error occurred after the end of your code.
One possible reason is that you have an unclosed parenthesis or string.
Another possibility is that there is an error in the hidden test code.
Yet another is that there is an internal error.  The internal error message is: ${err.message}`;
                return;
            } else {
                if (this.pretextLines > 0) {
                    err.traceback[0].lineno =
                        err.traceback[0].lineno - this.pretextLines + 1;
                }
            }
        }
        var errString = err.toString();
        var to = errString.indexOf(":");
        var errName = errString.substring(0, to);
        errText.innerHTML = errString;
        $(this.eContainer).append("<h3>Description</h3>");
        var errDesc = this.eContainer.appendChild(document.createElement("p"));
        errDesc.innerHTML = errorText[errName];
        $(this.eContainer).append("<h3>To Fix</h3>");
        var errFix = this.eContainer.appendChild(document.createElement("p"));
        errFix.innerHTML = errorText[errName + "Fix"];
        var moreInfo = "../ErrorHelp/" + errName.toLowerCase() + ".html";
        //console.log("Runtime Error: " + err.toString());
    }
    setTimeLimit(timer) {
        var timelimit = this.timelimit;
        if (timer !== undefined) {
            timelimit = timer;
        }
        // set execLimit in milliseconds  -- for student projects set this to
        // 25 seconds -- just less than Chrome's own timer.
        if (
            this.code.indexOf("ontimer") > -1 ||
            this.code.indexOf("onclick") > -1 ||
            this.code.indexOf("onkey") > -1 ||
            this.code.indexOf("setDelay") > -1
        ) {
            Sk.execLimit = null;
        } else {
            if (timelimit === "off") {
                Sk.execLimit = null;
            } else if (timelimit) {
                Sk.execLimit = timelimit;
            } else {
                Sk.execLimit = 25000;
            }
        }
    }
    builtinRead(x) {
        if (
            Sk.builtinFiles === undefined ||
            Sk.builtinFiles["files"][x] === undefined
        )
            throw $.i18n("msg_activecode_file_not_found", x);
        return Sk.builtinFiles["files"][x];
    }
    fileReader(divid) {
        let elem = document.getElementById(divid);
        let data = "";
        let result = "";
        if (elem == null && Sk.builtinFiles.files.hasOwnProperty(divid)) {
            return Sk.builtinFiles["files"][divid];
        } else {
            // try remote file unless it ends with .js or .py -- otherwise we'll ask the server for all
            // kinds of modules that we are trying to import
            if (!(divid.endsWith(".js") || divid.endsWith(".py"))) {
                $.ajax({
                    async: false,
                    url: `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
                    success: function (data) {
                        result = JSON.parse(data).data;
                    },
                    error: function (err) {
                        result = null;
                    },
                });
                if (result) {
                    return result;
                }
            }
        }
        if (elem == null && result === null) {
            throw new Sk.builtin.IOError(
                $.i18n("msg_activecode_no_file_or_dir", divid)
            );
        } else {
            // for backward compatibility - early on we had textarea with the divid on it.
            // but later this switched to a runestone wrapper.  So we may need to dig for a pre
            // or a textarea?
            if (elem.nodeName.toLowerCase() == "textarea") {
                data = elem.value;
            } else {
                let pre = elem.querySelector("pre");
                if (pre) {
                    data = pre.textContent;
                } else {
                    data = elem.textContent;
                }
            }
        }
        return data;
    }
    outputfun(text) {
        // bnm python 3
        var pyStr = function (x) {
            if (x instanceof Array) {
                return "[" + x.join(", ") + "]";
            } else {
                return x;
            }
        };
        var x = text;
        if (!this.python3) {
            if (x.charAt(0) == "(") {
                x = x.slice(1, -1);
                x = "[" + x + "]";
                try {
                    var xl = eval(x);
                    xl = xl.map(pyStr);
                    x = xl.join(" ");
                } catch (err) {}
            }
        }
        $(this.output).css("visibility", "visible");
        text = x;
        text = text
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br/>");
        return Promise.resolve().then(
            function () {
                setTimeout(
                    function () {
                        $(this.output).append(text);
                    }.bind(this),
                    0
                );
            }.bind(this)
        );
    }

    filewriter(fobj, bytes) {
        let filecomponent = document.getElementById(fobj.name);
        if (!filecomponent) {
            let container = document.createElement("div");
            $(container).addClass("runestone");
            let tab = document.createElement("div");
            $(tab).addClass("datafile_caption");
            tab.innerHTML = `Data file: <code>${fobj.name}</code>`;
            filecomponent = document.createElement("textarea");
            filecomponent.rows = 10;
            filecomponent.cols = 50;
            filecomponent.id = fobj.name;
            $(filecomponent).css("margin-bottom", "5px");
            $(filecomponent).addClass("ac_output");
            container.appendChild(tab);
            container.appendChild(filecomponent);
            this.outerDiv.appendChild(container);
        } else {
            if (fobj.pos$ == 0) {
                $(filecomponent).val("");
            }
        }
        let current = $(filecomponent).val();
        current = current + bytes.v;
        $(filecomponent).val(current);
        $(filecomponent).css("display", "block");
        fobj.pos$ = current.length;
        return current.length;
    }

    async getIncludedCode(divid) {
        if (window.edList[divid]) {
            return window.edList[divid].editor.getValue();
        } else {
            let request = new Request(
                `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
                {
                    method: "GET",
                    headers: this.jsonHeaders,
                }
            );
            let wresult = await fetch(request);
            let obj = await wresult.json();
            return obj.data;
        }
    }

    async buildProg(useSuffix) {
        // assemble code from prefix, suffix, and editor for running.
        var pretext;
        var prog = this.editor.getValue() + "\n";
        if (this.prefix) {
            prog = this.prefix + prog;
        }
        this.pretext = "";
        this.pretextLines = 0;
        this.progLines = prog.match(/\n/g).length + 1;
        if (this.includes) {
            // iterate over the includes, in-order prepending to prog
            pretext = "";
            for (var x = 0; x < this.includes.length; x++) {
                let iCode = await this.getIncludedCode(this.includes[x]);
                pretext = pretext + iCode + "\n";
            }
            this.pretext = pretext;
            if (this.pretext) {
                this.pretextLines = (this.pretext.match(/\n/g) || "").length;
            }
            prog = pretext + prog;
        }
        if (useSuffix && this.suffix) {
            prog = prog + this.suffix;
        }
        return Promise.resolve(prog);
    }

    async manage_scrubber(saveCode) {
        if (this.historyScrubber === null && !this.autorun) {
            await this.addHistoryScrubber();
        }
        if (
            this.historyScrubber &&
            this.history[$(this.historyScrubber).slider("value")] !=
                this.editor.getValue()
        ) {
            saveCode = "True";
            this.history.push(this.editor.getValue());
            this.timestamps.push(new Date().toLocaleString());
            $(this.historyScrubber).slider(
                "option",
                "max",
                this.history.length - 1
            );
            $(this.historyScrubber).slider(
                "option",
                "value",
                this.history.length - 1
            );
            this.slideit(null);
        } else {
            saveCode = "False";
        }
        if (this.historyScrubber == null) {
            saveCode = "False";
        }
        return saveCode;
    }

    async checkCurrentAnswer() {
        try {
            await this.runProg();
        } catch (e) {
            console.log(`error running code ${e}`);
        }
    }

    // the sid parameter is optional and is used for group submissions
    async logCurrentAnswer(sid) {
        let data = {
            div_id: this.divid,
            code: this.editor.getValue(),
            language: this.language,
            errinfo: this.errinfo || "",
            to_save: this.saveCode || "F",
            prefix: this.pretext,
            suffix: this.suffix,
            partner: this.partner,
        }; // Log the run event
        if (typeof sid !== "undefined") {
            data.sid = sid;
        }
        await this.logRunEvent(data);
        // If unit tests were run there will be a unit_results
        if (this.unit_results) {
            let unitData = {
                act: this.unit_results,
                div_id: this.divid,
                event: "unittest",
            };
            if (typeof sid !== "undefined") {
                unitData.sid = sid;
            }
            await this.logBookEvent(unitData);
        }
    }

    renderFeedback() {
        // The python unit test code builds the table as it is running the tests
        // In "normal" usage this is displayed immediately.
        // However in exam mode we make a div which is offscreen
        if (this.unit_results_divid) {
            if (this.unit_results_divid.indexOf("_offscreen_") > 0) {
                let urDivid = `${this.divid}_offscreen_unit_results`;
                let unitFeedback = document.getElementById(urDivid);
                let tmp = document.body.removeChild(unitFeedback);
                if ($(this.outerDiv).find(`#${urDivid}`).length > 0) {
                    tmp = $(this.outerDiv).find(`#${urDivid}`)[0];
                } else {
                    this.outerDiv.appendChild(tmp);
                }
                $(tmp).show();
            } else {
                let urDivid = this.divid + "_unit_results";
                if (
                    $(this.outerDiv).find(`#${urDivid}`).length == 0 &&
                    $(this.outerDiv).find(`#${urDivid}_offscreen_unit_results`)
                        .length == 0
                ) {
                    let urResults = document.getElementById(urDivid);
                    this.outerDiv.appendChild(urResults);
                }
            }
        }
    }

    toggleAlert() {
        if (this.is_toggle && this.runCount == 3) {
            if (
                this.errinfo != "success" ||
                this.unit_results.substring(8, 11) != 100.0
            ) {
                setTimeout(function () {
                    alert(
                        "Help is Available Using the Toggle Question Selector! You can try the Mixed-up Question first."
                    );
                }, 500);
                this.logBookEvent({
                    event: "togglealert",
                    act: "Help is Available Using the Toggle Question Selector",
                    div_id: this.divid,
                });
            }
        }
    }

    /* runProg has several async elements to it.
     * 1. Skulpt runs the python program asynchronously
     * 2. The history is restored asynchronously
     * 3. Logging is asynchronous
     *
     * This method returns the skulpt Promise and so the promise will resolve when skulpt is finished.
     * when finished this.unit_results will contain the results of any unit tests that have been run.
     * The table of results is constructed and added to the DOM by the python unittest.gui module in skulpt.
     *
     */
    async runProg(noUI, logResults) {
        console.log("starting runProg");
        if (typeof logResults === "undefined") {
            this.logResults = true;
        } else {
            this.logResults = logResults;
        }
        if (typeof noUI !== "boolean") {
            noUI = false;
        }
        var prog = await this.buildProg(true);
        this.saveCode = "True";
        $(this.output).text("");
        while ($(`#${this.divid}_errinfo`).length > 0) {
            $(`#${this.divid}_errinfo`).remove();
        }
        //$(this.eContainer).remove();
        if (this.codelens) {
            this.codelens.style.display = "none";
        }
        if (this.clButton) {
            this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
        }
        Sk.configure({
            output: this.outputfun.bind(this),
            read: this.fileReader,
            filewrite: this.filewriter.bind(this),
            __future__: Sk.python3,
            nonreadopen: true,
            //        python3: this.python3,
            imageProxy: "http://image.runestone.academy:8080/320x",
            inputfunTakesPrompt: true,
            jsonpSites: ["https://itunes.apple.com"],
        });
        Sk.divid = this.divid;
        Sk.logResults = logResults;
        if (this.graderactive && this.outerDiv.closest(".loading")) {
            Sk.gradeContainer = this.outerDiv.closest(".loading").id;
        } else {
            Sk.gradeContainer = this.divid;
        }
        this.setTimeLimit();
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
        Sk.canvas = this.graphics.id; //todo: get rid of this here and in image
        if (!noUI) {
            this.saveCode = await this.manage_scrubber(this.saveCode);
            $(this.runButton).attr("disabled", "disabled");
            $(this.historyScrubber).off("slidechange");
            $(this.historyScrubber).slider("disable");
            $(this.outDiv).show({
                duration: 700,
                queue: false,
            });
        }
        try {
            await Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, prog, true);
            });
            if (!noUI) {
                if (this.slideit) {
                    $(this.historyScrubber).on(
                        "slidechange",
                        this.slideit.bind(this)
                    );
                }
                $(this.historyScrubber).slider("enable");
            }
            this.errLastRun = false;
            this.errinfo = "success";
        } catch (err) {
            if (!noUI) {
                $(this.historyScrubber).on(
                    "slidechange",
                    this.slideit.bind(this)
                );
                $(this.historyScrubber).slider("enable");
            }
            this.errinfo = err.toString();
            this.addErrorMessage(err);
        } finally {
            $(this.runButton).removeAttr("disabled");
            if (typeof window.allVisualizers != "undefined") {
                $.each(window.allVisualizers, function (i, e) {
                    e.redrawConnectors();
                });
            }
        }
    }

    disableInteraction() {
        $(this.runButton).hide();
        $(this.codeDiv).addClass("ac-disabled");
    }
}

var languageExtensions = {
    python: "py",
    html: "html",
    javascript: "js",
    java: "java",
    python2: "py",
    python3: "py",
    cpp: "cpp",
    c: "c",
    sql: "sql",
    octave: "m",
};

var errorText = {};

errorText.ParseError = $.i18n("msg_sctivecode_parse_error");
errorText.ParseErrorFix = $.i18n("msg_sctivecode_parse_error_fix");
errorText.TypeError = $.i18n("msg_activecode_type_error");
errorText.TypeErrorFix = $.i18n("msg_activecode_type_error_fix");
errorText.NameError = $.i18n("msg_activecode_name_error");
errorText.NameErrorFix = $.i18n("msg_activecode_name_error_fix");
errorText.ValueError = $.i18n("msg_activecode_value_error");
errorText.ValueErrorFix = $.i18n("msg_activecode_value_error_fix");
errorText.AttributeError = $.i18n("msg_activecode_attribute_error");
errorText.AttributeErrorFix = $.i18n("msg_activecode_attribute_error_fix");
errorText.TokenError = $.i18n("msg_activecode_token_error");
errorText.TokenErrorFix = $.i18n("msg_activecode_token_error_fix");
errorText.TimeLimitError = $.i18n("msg_activecode_time_limit_error");
errorText.TimeLimitErrorFix = $.i18n("msg_activecode_time_limit_error_fix");
errorText.Error = $.i18n("msg_activecode_general_error");
errorText.ErrorFix = $.i18n("msg_activecode_general_error_fix");
errorText.SyntaxError = $.i18n("msg_activecode_syntax_error");
errorText.SyntaxErrorFix = $.i18n("msg_activecode_syntax_error_fix");
errorText.IndexError = $.i18n("msg_activecode_index_error");
errorText.IndexErrorFix = $.i18n("msg_activecode_index_error_fix");
errorText.URIError = $.i18n("msg_activecode_uri_error");
errorText.URIErrorFix = $.i18n("msg_activecode_uri_error_fix");
errorText.ImportError = $.i18n("msg_activecode_import_error");
errorText.ImportErrorFix = $.i18n("msg_activecode_import_error_fix");
errorText.ReferenceError = $.i18n("msg_activecode_reference_error");
errorText.ReferenceErrorFix = $.i18n("msg_activecode_reference_error_fix");
errorText.ZeroDivisionError = $.i18n("msg_activecode_zero_division_error");
errorText.ZeroDivisionErrorFix = $.i18n(
    "msg_activecode_zero_division_error_fix"
);
errorText.RangeError = $.i18n("msg_activecode_range_error");
errorText.RangeErrorFix = $.i18n("msg_activecode_range_error_fix");
errorText.InternalError = $.i18n("msg_activecode_internal_error");
errorText.InternalErrorFix = $.i18n("msg_activecode_internal_error_fix");
errorText.IndentationError = $.i18n("msg_activecode_indentation_error");
errorText.IndentationErrorFix = $.i18n("msg_activecode_indentation_error_fix");
errorText.NotImplementedError = $.i18n("msg_activecode_not_implemented_error");
<<<<<<< HEAD
errorText.NotImplementedErrorFix = $.i18n("msg_activecode_not_implemented_error_fix");


ActiveCode.prototype.addJSONLibrary = function () {
    var jsonExternalLibInfo = {
            path : eBookConfig.app + '/static/' + eBookConfig.course + '/_static/json.sk-master/__init__.js',
            dependencies : [
                eBookConfig.app + '/static/' + eBookConfig.course + '/_static/json.sk-master/stringify.js'
            ]
        };
    if (Sk.externalLibraries) {
        Sk.externalLibraries.json = jsonExternalLibInfo;
    } else {
        Sk.externalLibraries = {
            json: jsonExternalLibInfo
        };
    }
};

ActiveCode.prototype.setTimeLimit = function (timer) {
    var timelimit = this.timelimit;
    if (timer !== undefined ) {
        timelimit = timer
    }
    // set execLimit in milliseconds  -- for student projects set this to
    // 25 seconds -- just less than Chrome's own timer.
    if (this.code.indexOf('ontimer') > -1 ||
        this.code.indexOf('onclick') > -1 ||
        this.code.indexOf('onkey') > -1  ||
        this.code.indexOf('setDelay') > -1 ) {
        Sk.execLimit = null;
    } else {
        if (timelimit === "off") {
            Sk.execLimit = null;
        } else if (timelimit) {
            Sk.execLimit = timelimit;
        } else {
            Sk.execLimit = 25000;
        }
    }

};

ActiveCode.prototype.builtinRead = function (x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw $.i18n("msg_activecode_file_not_found",x);
        return Sk.builtinFiles["files"][x];
};

ActiveCode.prototype.fileReader = function(divid) {
    let elem = document.getElementById(divid);
    let data = ""
    let result = ""
    if (elem == null && Sk.builtinFiles.files.hasOwnProperty(divid)) {
        return Sk.builtinFiles["files"][divid];
    } else {
        // try remote file unless it ends with .js or .py -- otherwise we'll ask the server for all
        // kinds of modules that we are trying to import
        if ( ! (divid.endsWith('.js') || divid.endsWith('.py')) ) {
            $.ajax({async: false,
                    url: `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
                    success: function(data) {
                        result = JSON.parse(data).data;
                        },
                    error: function(err) {
                        result = null;
                        }})
            if (result) {
                return result
            }
        }
    }
    if (elem == null && result === null) {
        throw new Sk.builtin.IOError($.i18n("msg_activecode_no_file_or_dir",divid));
    } else {
        if (elem.nodeName.toLowerCase() == "textarea") {
            data = elem.value;
        } else {
            data = elem.textContent;
        }
    }
    return data;
}

ActiveCode.prototype.outputfun = function(text) {
    // bnm python 3
    pyStr = function(x) {
        if (x instanceof Array) {
            return '[' + x.join(", ") + ']';
        } else {
            return x
        }
    };

    var x = text;
    if (! this.python3 ) {
        if (x.charAt(0) == '(') {
            x = x.slice(1, -1);
            x = '[' + x + ']';
            try {
                var xl = eval(x);
                xl = xl.map(pyStr);
                x = xl.join(' ');
            } catch (err) {
            }
        }
    }
    $(this.output).css("visibility","visible");
    text = x;
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        $(this.output).append(text);
    };

ActiveCode.prototype.filewriter = function(fobj, bytes) {
    let filecomponent = document.getElementById(fobj.name);
    if (! filecomponent) {
        let container = document.createElement('div')
        $(container).addClass('runestone')
        let tab = document.createElement('div');
        $(tab).addClass('datafile_caption');
        tab.innerHTML = `Data file: <code>${fobj.name}</code>`;
        filecomponent = document.createElement('textarea')
        filecomponent.rows = 10;
        filecomponent.cols = 50;
        filecomponent.id = fobj.name;
        $(filecomponent).css('margin-bottom','5px');
        $(filecomponent).addClass('ac_output');
        container.appendChild(tab);
        container.appendChild(filecomponent);
        this.outerDiv.appendChild(container)
    } else {
        if (fobj.pos$ == 0) {
            $(filecomponent).val("")
        }
    }

    let current = $(filecomponent).val()
    current = current + bytes.v;
    $(filecomponent).val(current);
    $(filecomponent).css('display', 'block');
    fobj.pos$ = current.length;

    return current.length;
}

ActiveCode.prototype.getIncludedCode = function(divid) {
    var wresult;
    if(edList[divid]) {
        return edList[divid].editor.getValue();
    } else {
        wresult = $.ajax({
            async: false,
            url: `/runestone/ajax/get_datafile?course_id=${eBookConfig.course}&acid=${divid}`,
            success: function(data) {
                result = JSON.parse(data).data;
                },
            error: function(err) {
                result = null;
            }})

        return result;
    }
}


ActiveCode.prototype.buildProg = function(useSuffix) {
    // assemble code from prefix, suffix, and editor for running.
    var pretext;
    var prog = this.editor.getValue() + "\n";
    this.pretext = "";
    this.pretextLines = 0
    this.progLines = prog.match(/\n/g).length + 1

    if (this.includes !== undefined) {
        // iterate over the includes, in-order prepending to prog

        pretext = "";
        for (var x=0; x < this.includes.length; x++) {
            let iCode = this.getIncludedCode(this.includes[x]);
            pretext = pretext + iCode + "\n";
        }
        this.pretext = pretext;
        if(this.pretext) {
            this.pretextLines = (this.pretext.match(/\n/g) || '').length
        }
        prog = pretext + prog
    }

    if(useSuffix && this.suffix) {
        prog = prog + this.suffix;
}

    return prog;
};

ActiveCode.prototype.manage_scrubber = function (scrubber_dfd, history_dfd, saveCode) {
    if (this.historyScrubber === null && !this.autorun) {
        scrubber_dfd = this.addHistoryScrubber();
    } else {
        scrubber_dfd = jQuery.Deferred();
        scrubber_dfd.resolve();
    }

    history_dfd = jQuery.Deferred();
    scrubber_dfd.done((function () {
        if (this.historyScrubber && (this.history[$(this.historyScrubber).slider("value")] != this.editor.getValue())) {
            saveCode = "True";
            this.history.push(this.editor.getValue());
            this.timestamps.push((new Date()).toLocaleString());
            $(this.historyScrubber).slider("option", "max", this.history.length - 1);
            $(this.historyScrubber).slider("option", "value", this.history.length - 1);
            this.slideit();
        } else {
            saveCode = "False";
        }

        if (this.historyScrubber == null) {
            saveCode = "False";
        }
        history_dfd.resolve();
    }).bind(this))
        .fail(function () {
            console.log("Scrubber deferred failed - this should not happen");
            history_dfd.resolve();
        });
    return {history_dfd: history_dfd, saveCode: saveCode};
};


ActiveCode.prototype.runProg = function () {
    var prog = this.buildProg(true);
    var saveCode = "True";
    var scrubber_dfd, history_dfd, skulpt_run_dfd;
    $(this.output).text('');

    $(this.eContainer).remove();
    if (this.codelens) {
        this.codelens.style.display = 'none';
    }
    if (this.clButton) {
        this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
    }
    Sk.configure({
        output: this.outputfun.bind(this),
        read: this.fileReader,
        filewrite: this.filewriter.bind(this),
        __future__: Sk.python3,
        nonreadopen : true,
//        python3: this.python3,
        imageProxy: 'http://image.runestone.academy:8080/320x',
        inputfunTakesPrompt: true,
        jsonpSites : ['https://itunes.apple.com'],
    });
    Sk.divid = this.divid;
    this.setTimeLimit();
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
    Sk.canvas = this.graphics.id; //todo: get rid of this here and in image
    $(this.runButton).attr('disabled', 'disabled');
    $(this.historyScrubber).off("slidechange");
    $(this.historyScrubber).slider("disable");
    $(this.codeDiv).switchClass("col-md-12", "col-md-7", {duration: 500, queue: false});
    $(this.outDiv).show({duration: 700, queue: false});

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;


    skulpt_run_dfd = Sk.misceval.asyncToPromise(function () {

        return Sk.importMainWithBody("<stdin>", false, prog, true);
    });

    // Make sure that the history scrubber is fully initialized AND the code has been run
    // before we start logging stuff.
    var self = this;

    Promise.all([skulpt_run_dfd, history_dfd]).then((function (mod) { // success
            $(this.runButton).removeAttr('disabled');
            if (this.slideit) {
                $(this.historyScrubber).on("slidechange", this.slideit.bind(this));
            }
            $(this.historyScrubber).slider("enable");
            this.logRunEvent({
                'div_id': this.divid,
                'code': this.editor.getValue(),
                'lang': this.language,
                'errinfo': 'success',
                'to_save': saveCode,
                'prefix': this.pretext,
                'suffix': this.suffix,
                'partner': this.partner
            }); // Log the run event
        }).bind(this),
        (function (err) {  // fail
            history_dfd.done(function () {
                $(self.runButton).removeAttr('disabled');
                $(self.historyScrubber).on("slidechange", self.slideit.bind(self));
                $(self.historyScrubber).slider("enable");
                self.logRunEvent({
                    'div_id': self.divid,
                    'code': self.editor.getValue(),
                    'lang': this.langauge,
                    'errinfo': err.toString(),
                    'to_save': saveCode,
                    'prefix': self.pretext,
                    'suffix': self.suffix
                }); // Log the run event
                self.addErrorMessage(err)
            });
        }));

    if (typeof(allVisualizers) != "undefined") {
        $.each(allVisualizers, function (i, e) {
            e.redrawConnectors();
        });
    }

};




JSActiveCode.prototype = new ActiveCode();

function JSActiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }

JSActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments)
    };

JSActiveCode.prototype.outputfun = function (a) {
    $(this.output).css("visibility","visible");
    var str = "[";
    if (typeof(a) == "object" && a.length) {
        for (var i = 0; i < a.length; i++)
            if (typeof(a[i]) == "object" && a[i].length) {
                str += (i == 0 ? "" : " ") + "[";
                for (var j = 0; j < a[i].length; j++)
                    str += a[i][j] + (j == a[i].length - 1 ?
                    "]" + (i == a.length - 1 ? "]" : ",") + "\n" : ", ");
            } else str += a[i] + (i == a.length - 1 ? "]" : ", ");
        } else {
    try {
            str = JSON.stringify(a);
    } catch (e) {
            str = a;
    }
    }
    return str;
};

JSActiveCode.prototype.runProg = function() {
    var _this = this;
    var prog = this.buildProg(true);
    var einfo;
    var scrubber_dfd, history_dfd;
    var saveCode = "True";


    var write = function(str) {
        _this.output.innerHTML += _this.outputfun(str);
    };

    var writeln = function(str) {
        if (!str) str="";
        _this.output.innerHTML += _this.outputfun(str)+"<br />";
            };

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

    $(this.eContainer).remove();
    $(this.output).text('');
    $(this.eContainer).remove();
    $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
    $(this.outDiv).show({duration:700,queue:false});

    try {
        eval(prog)
        einfo = "success";
    } catch(e) {
        this.addErrorMessage(e);
        einfo = e;
    }

    this.logRunEvent({
    'div_id': this.divid,
    'code': this.editor.getValue(),
    'errinfo': einfo,
    'to_save': saveCode,
    'prefix': this.pretext,
    'suffix': this.suffix
    }); // Log the run event


};


CljSActiveCode.prototype = new ActiveCode();

function CljSActiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }

CljSActiveCode.prototype.iniit = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments)
    }

CljSActiveCode.prototype.buildProg = function() {
    var prog = this.editor.getValue();
    if (this.includes !== undefined) {
        // iterate over the includes, in-order prepending to prog
        pretext = "";
        for (var x=0; x < this.includes.length; x++) {
            pretext = pretext + edList[this.includes[x]].editor.getValue();
            }
        prog = pretext + prog
    }

    if (this.suffix) {
        prog = prog + this.suffix;
    }
    return prog;
}

CljSActiveCode.prototype.addErrorMessage = function(err) {
    var errString = (err.cause) ? err.cause.message : err.message;
    var errName = (err.cause) ? err.cause.__proto__.name : "";
    var errHead;
    if (err.cause) {
        errHead = $('<h3>').html('Error');
    } else {
        errHead = $('<h3>').html('Warning');
    }
    this.eContainer = this.outerDiv.appendChild(document.createElement('div'));
    this.eContainer.className = 'error alert alert-danger';
    this.eContainer.id = this.divid + '_errinfo';
    this.eContainer.appendChild(errHead[0]);
    var errText = this.eContainer.appendChild(document.createElement('pre'));
    var description = "";
    var toFix = "";
    if (errName) {
        errText.innerHTML = errName + ": " + errString;
    }
    else {
        errText.innerHTML = errString;
    }
    var foundMatch = false;
    for (var index = 0; index < cljsErrorList.length && (! foundMatch); index += 2) {
        foundMatch = cljsErrorList[index].test(errString);
        if (foundMatch) {
            description = cljsErrorList[index + 1][0];
            toFix = cljsErrorList[index + 1][1];
        }
    }

    if (description !== "") {
        $(this.eContainer).append('<h3>Description</h3>');
        var errDesc = this.eContainer.appendChild(document.createElement('p'));
        errDesc.innerHTML = description;
    }
    if (toFix !== "") {
        $(this.eContainer).append('<h3>To Fix</h3>');
        var errFix = this.eContainer.appendChild(document.createElement('p'));
        errFix.innerHTML = toFix;
    }
    // var moreInfo = '../ErrorHelp/' + errName.toLowerCase() + '.html';
    //console.log("Runtime Error: " + err.toString());
};

/*
 * The ClojureScript error list is a array of regex patterns to match
 * against an error message, followed by a list of description/fix
 */
cljsErrorList = [
    /Unmatched delimiter/, ["This error means you may be missing an opening parenthesis.", ""],
    /EOF while reading/, ["This error means you may be missing a closing parenthesis.", ""],
    /identifier starts immediately after numeric literal/,
        ["This error means that you started with a number rather than a function.",
        "Remember, the function name has to be the first thing in the parentheses."],
    /\.call is not a function/,
        ["This error means the first thing in the parentheses is not the name of a function.", ""],
    /missing ; before statement/, ["You might have an expression without any parentheses.", ""],
    /cljs\.core\..* is not a function/, ["You might have an expression without any parentheses.", ""]
];

CljSActiveCode.prototype.outputfun = function(a) {
    // console.log('Outputfun: ' + a);
    $(this.output).css("visibility", "visible");
    return a;
};

CljSActiveCode.prototype.runProg = function() {
    var _this = this;
    var prog = this.buildProg();
    $(this.eContainer).remove();
    $(this.output).text('');
    $(this.codeDiv).switchClass("col-md-12", "col-md-6", {duration:500,queue:false});
    $(this.outDiv).show({duration:700,queue:false});
    
    var result = rune_cljs.core.eval_source(prog);
    
    /*
    console.log("---------run prog-------");
    console.log(prog);
    console.log("0 " + result[0]);
    console.log("1 " + result[1]);
    console.log("2 " + result[2]);
    console.log("3 " + result[3]);
    console.log("--------end run---------");
    */
    
    if (result[0] != null || result[2] != null) {
        if (result[0] == 'nil' && result[2] != null){
            msg = result[2];
        } else if (result[0] != null & result[2] != null) {
            msg = result[0] + "\n" + result[2];
        } else {
            msg = result[0];
        }
        $(this.output).text(_this.outputfun(msg));
    }
    if (result[1] != null) {
        this.addErrorMessage(result[1])
    }
    else if (result[3] != "") {
        this.addErrorMessage(
            { message: result[3], cause: null});
    }
}
    

HTMLActiveCode.prototype = new ActiveCode();

function HTMLActiveCode (opts) {
    if (opts) {
        this.init(opts);
    }
}

HTMLActiveCode.prototype.runProg = function () {
    var prog = this.buildProg(true);
    var scrubber_dfd, history_dfd, saveCode;

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

//    $('#'+myDiv+'_iframe').remove();
//    $('#'+myDiv+'_htmlout').show();
//    $('#'+myDiv+'_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
//        prog.replace(/"/g,"'") + '">' + '</iframe>');
    $(this.output).text('');
    if (! this.alignVertical ) {
        $(this.codeDiv).switchClass("col-md-12", "col-md-6", {duration: 500, queue: false});
    }
    $(this.outDiv).show({duration:700,queue:false});
    prog = "<script type=text/javascript>window.onerror = function(msg,url,line) {alert(msg+' on line: '+line);};</script>" + prog;
    this.output.srcdoc = prog;

    this.logRunEvent({
    'div_id': this.divid,
    'code': this.editor.getValue(),
    'errinfo': 'success',
    'to_save': saveCode,
    'prefix': this.pretext,
    'suffix': this.suffix
    }); // Log the run event


};

HTMLActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);
    this.code = $('<textarea />').html(this.origElem.innerHTML).text();
    $(this.runButton).text('Render');
    this.editor.setValue(this.code);
};

HTMLActiveCode.prototype.createOutput = function () {
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output");
    if(this.alignVertical) {
        $(outDiv).addClass("col-md-12");
    } else {
        $(outDiv).addClass("col-md-5");
    }
    this.outDiv = outDiv;
    this.output = document.createElement('iframe');
    $(this.output).css("background-color","white");
    $(this.output).css("position","relative");
    $(this.output).css("height","400px");
    $(this.output).css("width","100%");
    outDiv.appendChild(this.output);
    this.outerDiv.appendChild(outDiv);

    var clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};

=======
errorText.NotImplementedErrorFix = $.i18n(
    "msg_activecode_not_implemented_error_fix"
);
errorText.KeyError = $.i18n("msg_activecode_key_error");
errorText.KeyErrorFix = $.i18n("msg_activecode_key_error_fix");
errorText.AssertionError = $.i18n("msg_activecode_assertion_error");
errorText.AssertionErrorFix = $.i18n("msg_activecode_assertion_error_fix");
>>>>>>> 8bc48765c114176685b620cddff0375b35e1a25f

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};
<<<<<<< HEAD

AudioTour.prototype = new RunestoneBase();

// function to display the audio tours
function AudioTour (divid, code, bnum, audio_text) {
    this.audio_tour = null;
    this.audio_code = null;
    this.windowcode = null;
    this.first_audio = null;
    this.prev_audio = null;
    this.pause_audio = null;
    this.next_audio = null;
    this.last_audio = null;
    this.status = null;
    this.stop_button = null;
    this.tourButtons = [];
    this.elem = null; // current audio element playing
    this.currIndex = null; // current index
    this.len = null; // current length of audio files for tour
    this.buttonCount = null; // number of audio tour buttons
    this.aname = null; // the audio file name
    this.ahash = null; // hash of the audio file name to the lines to highlight
    this.theDivid = null; // div id
    this.afile = null; // file name for audio
    this.playing = false; // flag to say if playing or not
    this.tourName = "";
    // Replacing has been done here to make sure special characters in the code are displayed correctly
    code = code.replaceAll("*doubleq*", "\"");
    code = code.replaceAll("*singleq*", "'");
    code = code.replaceAll("*open*", "(");
    code = code.replaceAll("*close*", ")");
    code = code.replaceAll("*nline*", "<br/>");
    var codeArray = code.split("\n");
    var audio_hash = [];
    var bval = [];
    var atype = audio_text.replaceAll("*doubleq*", "\"");
    var audio_type = atype.split("*atype*");
    for (var i = 0; i < audio_type.length - 1; i++) {
        audio_hash[i] = audio_type[i];
        var aword = audio_type[i].split(";");
        bval.push(aword[0]);
    }
    var first = "<pre><div id='" + divid + "_l1'>" + "1.   " + codeArray[0] + "</div>";
    var num_lines = codeArray.length;
    for (var i = 1; i < num_lines; i++) {
        if (i < 9) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".   " + codeArray[i] + "</div>";
        }
        else if (i < 99) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".  " + codeArray[i] + "</div>";
        }
        else {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ". " + codeArray[i] + "</div>";
        }
    }
    first = first + "</pre>";

    //laying out the HTML content

    var bcount = 0;

    for (var i = 0; i < audio_type.length - 1; i++) {
        var newButton = document.createElement("button");
        newButton.className = "btn btn-success";
        newButton.innerHTML = bval[i].replace(/\"/g,"");
        this.tourButtons.push(newButton);
        bcount++;
    }
    this.audio_tour = document.createElement("div");
    this.audio_tour.align = "center";

    this.audio_code = document.createElement("p");

    this.windowcode = document.createElement("div");
    this.windowcode.align = "left";
    $(this.windowcode).html(first);

    this.first_audio = document.createElement("button");
    this.prev_audio = document.createElement("button");
    this.pause_audio = document.createElement("button");
    this.next_audio = document.createElement("button");
    this.last_audio = document.createElement("button");

    this.first_audio.className = "btn-default glyphicon glyphicon-fast-backward";
    this.prev_audio.className = "btn-default glyphicon glyphicon-step-backward";
    this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
    this.next_audio.className = "btn-default glyphicon glyphicon-step-forward";
    this.last_audio.className = "btn-default glyphicon glyphicon-fast-forward";

    this.first_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.prev_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.pause_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.next_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");
    this.last_audio.setAttribute("style", "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;");

    this.first_audio.name = "first_audio";
    this.prev_audio.name = "prev_audio";
    this.pause_audio.name = "pause_audio";
    this.next_audio.name = "next_audio";
    this.last_audio.name = "last_audio";

    this.first_audio.title = "Play first audio in tour";
    this.prev_audio.title = "Play previous audio in tour";
    this.pause_audio.title = "Pause current audio";
    this.next_audio.title = "Play next audio in tour";
    this.last_audio.title = "Play last audio in tour";

    this.first_audio.setAttribute("aria-label", "Play first audio in tour");
    this.prev_audio.setAttribute("aria-label", "Play previous audio in tour");
    this.pause_audio.setAttribute("aria-label", "Pause audio");
    this.next_audio.setAttribute("aria-label", "Play next audio in tour");
    this.last_audio.setAttribute("aria-label", "Play last audio in tour");

    this.first_audio.disabled = true;
    this.prev_audio.disabled = true;
    this.pause_audio.disabled = true;
    this.next_audio.disabled = true;
    this.last_audio.disabled = true;

    this.status = document.createElement("div");
    this.status.className = "alert alert-info";
    this.status.setAttribute("style", "display: none;");

    this.stop_button = document.createElement("button");
    this.stop_button.className = "btn btn-default";
    this.stop_button.innerHTML = "Stop tour";

    $(this.audio_tour).append(this.audio_code, this.windowcode, document.createElement("br"), this.first_audio, this.prev_audio, this.pause_audio, this.next_audio, this.last_audio, document.createElement("br"), this.status, document.createElement("br"), this.tourButtons, this.stop_button);
    $("#"+divid+" .ac_code_div").append(this.audio_tour);
    $("#"+divid+" .ac_code_div").css("width", "50%");
    $('#'+divid+' .CodeMirror.cm-s-default.ui-resizable').hide();
    $('#'+divid+' .ac_opt.btn.btn-default:last-child').hide();

    $(this.stop_button).click( (function () {
        if (this.playing) {
            this.elem.pause();
        }
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'closeWindow', 'div_id': divid});
        $(this.audio_tour).remove();
        $('#'+divid+' .CodeMirror.cm-s-default.ui-resizable').show();
        $('#'+divid+' .ac_opt.btn.btn-default:last-child').show();
        $("#"+divid+" .ac_code_div").css("width", "");
    }).bind(this));

    $(this.tourButtons[0]).click((function () {
        this.tour(divid, audio_hash[0], bcount);
    }).bind(this));
    $(this.tourButtons[1]).click((function () {
        this.tour(divid, audio_hash[1], bcount);
    }).bind(this));
    $(this.tourButtons[2]).click((function () {
        this.tour(divid, audio_hash[2], bcount);
    }).bind(this));
    $(this.tourButtons[3]).click((function () {
        this.tour(divid, audio_hash[3], bcount);
    }).bind(this));
    $(this.tourButtons[4]).click((function () {
        this.tour(divid, audio_hash[4], bcount);
    }).bind(this));

    // handle the click to go to the next audio
    $(this.first_audio).click((function () {
        this.firstAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $(this.prev_audio).click((function () {
        this.prevAudio();
    }).bind(this));

    // handle the click to pause or play the audio
    $(this.pause_audio).click((function () {
        this.pauseAndPlayAudio(divid);
    }).bind(this));

    // handle the click to go to the next audio
    $(this.next_audio).click((function () {
        this.nextAudio();
    }).bind(this));

    // handle the click to go to the next audio
    $(this.last_audio).click((function () {
        this.lastAudio();
    }).bind(this));

    // make the image buttons look disabled
    $(this.first_audio).css('opacity', 0.25);
    $(this.prev_audio).css('opacity', 0.25);
    $(this.pause_audio).css('opacity', 0.25);
    $(this.next_audio).css('opacity', 0.25);
    $(this.last_audio).css('opacity', 0.25);
}

AudioTour.prototype.tour = function (divid, audio_type, bcount) {
    // set globals
    this.buttonCount = bcount;
    this.theDivid = divid;

    this.status.setAttribute("style", "display: inline-block; margin-top: 7px; margin-bottom: 3px;");

    // enable prev, pause/play and next buttons and make visible
    $(this.first_audio).removeAttr('disabled');
    $(this.prev_audio).removeAttr('disabled');
    $(this.pause_audio).removeAttr('disabled');
    $(this.next_audio).removeAttr('disabled');
    $(this.last_audio).removeAttr('disabled');

    $(this.first_audio).css('opacity', 1.0);
    $(this.prev_audio).css('opacity', 1.0);
    $(this.pause_audio).css('opacity', 1.0);
    $(this.next_audio).css('opacity', 1.0);
    $(this.last_audio).css('opacity', 1.0);

    // disable tour buttons
    for (var i = 0; i < bcount; i++)
        $(this.tourButtons[i]).attr('disabled', 'disabled');

    var atype = audio_type.split(";");
    var name = atype[0].replaceAll("\"", " ");
    this.tourName = name;
    $(this.status).html($.i18n("msg_activecode_starting", name));

    //log tour type to db
    this.logBookEvent({'event': 'Audio', 'act': name, 'div_id': divid});

    var max = atype.length;
    var str = "";
    this.ahash = [];
    this.aname = [];
    for (i = 1; i < max - 1; i++) {
        var temp = atype[i].split(":");
        var temp_line = temp[0];
        var temp_aname = temp[1];

        var akey = temp_aname.substring(1, temp_aname.length);
        var lnums = temp_line.substring(1, temp_line.length);

        //alert("akey:"+akey+"lnum:"+lnums);

        // str+="<audio id="+akey+" preload='auto'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+
        // akey+".mp3' type='audio/mpeg'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+akey+
        // ".ogg' type='audio/ogg'>Your browser does not support the audio tag</audio>";

        var dir = "http://media.interactivepython.org/" + eBookConfig.basecourse.toLowerCase() + "/audio/";
        //var dir = "../_static/audio/"
        str += "<audio id=" + akey + " preload='auto' >";
        str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
        str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
        str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
        str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
        str +=  "<br />Your browser does not support the audio tag</audio>";
        this.ahash[akey] = lnums;
        this.aname.push(akey);
    }
    $(this.audio_code).html(str);
    this.len = this.aname.length; // set the number of audio file in the tour

    this.currIndex = 0;
    this.playCurrIndexAudio();
};

AudioTour.prototype.handlePlaying = function() {
    this.elem.pause();
    // unbind current ended
    $('#' + this.afile).unbind('ended');
    // unhighlight the prev lines
    this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);
};

AudioTour.prototype.firstAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'first', 'div_id': this.theDivid});


    // move to the first audio
    this.currIndex = 0;

    // start at the first audio
    this.playCurrIndexAudio();

};

AudioTour.prototype.prevAudio = function () {

    // if there is a previous audio
    if (this.currIndex > 0) {

        // if audio is this.playing handle it
        this.handlePlaying();

        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'prev', 'div_id': this.theDivid});


        // move to previous to the current (but the current index has moved to the next)
        this.currIndex = this.currIndex - 1;

        // start at the prev audio
        this.playCurrIndexAudio();
    }

};

AudioTour.prototype.nextAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'next', 'div_id': this.theDivid});

    // if not at the end
    if (this.currIndex < (this.len - 1)) {
        // start at the next audio
        this.currIndex = this.currIndex + 1;
        this.playCurrIndexAudio();
    }
    else if (this.currIndex == (this.len - 1)) {
        this.handleTourEnd();
    }
};

AudioTour.prototype.lastAudio = function () {

    // if audio is this.playing handle it
    this.handlePlaying();

    //log change to db
    this.logBookEvent({'event': 'Audio', 'act': 'last', 'div_id': this.theDivid});

    // move to the last audio
    this.currIndex = this.len - 1;

    // start at last
    this.playCurrIndexAudio();

};

// play the audio at the current index
AudioTour.prototype.playCurrIndexAudio = function () {

    // set this.playing to false
    this.playing = false;

    // play the current audio and highlight the lines
    this.playaudio(this.currIndex, this.aname, this.theDivid, this.ahash);

};

// handle the end of the tour
AudioTour.prototype.handleTourEnd = function () {
    $(this.status).html("The " + this.tourName + " has ended.");
    this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
    this.pause_audio.title = "Pause audio";
    this.pause_audio.setAttribute("aria-label", "Pause audio");

    $(this.first_audio).attr('disabled', 'disabled');
    $(this.prev_audio).attr('disabled', 'disabled');
    $(this.pause_audio).attr('disabled', 'disabled');
    $(this.next_audio).attr('disabled', 'disabled');
    $(this.last_audio).attr('disabled', 'disabled');

    $(this.first_audio).css('opacity', 0.25);
    $(this.prev_audio).css('opacity', 0.25);
    $(this.pause_audio).css('opacity', 0.25);
    $(this.next_audio).css('opacity', 0.25);
    $(this.last_audio).css('opacity', 0.25);

    // enable the tour buttons
    for (var j = 0; j < this.buttonCount; j++)
        $(this.tourButtons[j]).removeAttr('disabled');
};

// only call this one after the first time
AudioTour.prototype.outerAudio = function () {

    // unbind ended
    $('#' + this.afile).unbind('ended');

    // set this.playing to false
    this.playing = false;

    // unhighlight previous lines from the last audio
    this.unhighlightLines(this.theDivid, this.ahash[this.aname[this.currIndex]]);

    // increment the this.currIndex to point to the next one
    this.currIndex++;

    // if the end of the tour reset the buttons
    if (this.currIndex == this.len) {
        this.handleTourEnd();
    }

    // else not done yet so play the next audio
    else {

        // play the audio at the current index
        this.playCurrIndexAudio();
    }
};

// play the audio now that it is ready
AudioTour.prototype.playWhenReady = function (afile, divid, ahash) {
    // unbind current
    $('#' + afile).unbind('canplaythrough');
    this.elem.currentTime = 0;
    this.playing = true;
    //console.log("in playWhenReady " + elem.duration);
    this.highlightLines(divid, ahash[afile]);
    if (this.pause_audio.className === "btn-default glyphicon glyphicon-pause") {
        $(this.status).html($.i18n("msg_activecode_playing", this.tourName));
        $('#' + afile).bind('ended', (function () {
        this.outerAudio();
        }).bind(this));
        this.elem.play();
    }
    else {
        $('#' + afile).bind('ended', (function () {
        this.outerAudio();
        }).bind(this));
    }
};


// play the audio at the specified index i and set the duration and highlight the lines
AudioTour.prototype.playaudio = function (i, aname, divid, ahash) {
    this.afile = aname[i];
    this.elem = document.getElementById(this.afile);

    // if this isn't ready to play yet - no duration yet then wait
    //console.log("in playaudio " + elem.duration);
    if (isNaN(this.elem.duration) || this.elem.duration == 0) {
        // set the status
        $(this.status).html($.i18n("msg_activecode_loading_audio"));
        $('#' + this.afile).bind('canplaythrough', (function () {
            this.playWhenReady(this.afile, divid, ahash);
        }).bind(this));
    }
    // otherwise it is ready so play it
    else {
        this.playWhenReady(this.afile, divid, ahash);
    }
};

// pause if this.playing and play if paused
AudioTour.prototype.pauseAndPlayAudio = function (divid) {
    var btn = this.pause_audio;

    // if paused and clicked then continue from current
    if (this.elem.paused) {
        // calcualte the time left to play in milliseconds
        counter = (this.elem.duration - this.elem.currentTime) * 1000;
        this.elem.play(); // start the audio from current spot
        this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
        this.pause_audio.title = $.i18n("msg_activecode_pause_current_audio");
        this.pause_audio.setAttribute("aria-label", $.i18n("msg_activecode_pause_audio"));
        $(this.status).html($.i18n("msg_activecode_playing", this.tourName));
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'play', 'div_id': this.theDivid});
    }

    // if audio was this.playing pause it
    else if (this.playing) {
        this.elem.pause(); // pause the audio
        this.pause_audio.className = "btn-default glyphicon glyphicon-play";
        this.pause_audio.title = $.i18n("msg_activecode_play_paused_audio");
        this.pause_audio.setAttribute("aria-label", $.i18n("msg_activecode_play_paused_audio"));
        $(this.status).html($.i18n("msg_activecode_audio_paused", this.tourName));
        //log change to db
        this.logBookEvent({'event': 'Audio', 'act': 'pause', 'div_id': this.theDivid});
    }

};

// process the lines
AudioTour.prototype.processLines = function (divid, lnum, color) {
    var comma = lnum.split(",");

    if (comma.length > 1) {
        for (i = 0; i < comma.length; i++) {
            this.setBackgroundForLines(divid, comma[i], color);
        }
    }
    else {
        this.setBackgroundForLines(divid, lnum, color);
    }
};

// unhighlight the lines - set the background back to transparent
AudioTour.prototype.unhighlightLines = function (divid, lnum) {
    this.processLines(divid, lnum, 'transparent');
};

// highlight the lines - set the background to a yellow color
AudioTour.prototype.highlightLines = function (divid, lnum) {
    this.processLines(divid, lnum, '#ffff99');
};

// set the background to the passed color
AudioTour.prototype.setBackgroundForLines = function (divid, lnum, color) {
    var hyphen = lnum.split("-");

    // if a range of lines
    if (hyphen.length > 1) {
        var start = parseInt(hyphen[0]);
        var end = parseInt(hyphen[1]) + 1;
        for (var k = start; k < end; k++) {
            //alert(k);
            var str = "#" + divid + "_l" + k;
            if ($(str).text() != "") {
                $(str).css('background-color', color);
            }
            //$(str).effect("highlight",{},(dur*1000)+4500);
        }
    }
    else {
        //alert(lnum);
        var str = "#" + divid + "_l" + lnum;
        $(str).css('background-color', color);
        //$(str).effect("highlight",{},(dur*1000)+4500);
    }
};


LiveCode.prototype = new ActiveCode();

function LiveCode(opts) {
    if (opts) {
        this.init(opts)
        }
    }
function unescapeHtml(safe) {
    if (safe) {
        return safe.replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'");
    }
}
LiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments);

    var orig = opts.orig;
    this.stdin = $(orig).data('stdin');
    this.datafile = $(orig).data('datafile');
    this.sourcefile = $(orig).data('sourcefile');
    this.compileargs = unescapeHtml($(orig).data('compileargs'));
    this.linkargs = unescapeHtml($(orig).data('linkargs'));
    this.runargs = unescapeHtml($(orig).data('runargs'));
    this.interpreterargs = unescapeHtml($(orig).data('interpreterargs'));
    this.API_KEY = "67033pV7eUUvqo07OJDIV8UZ049aLEK1";
    this.USE_API_KEY = true;

    this.JOBE_SERVER = eBookConfig.jobehost || eBookConfig.host;
    this.resource = eBookConfig.proxyuri_runs ||  '/runestone/proxy/jobeRun';
    this.jobePutFiles = eBookConfig.proxyuri_files || '/runestone/proxy/jobePushFile/';
    this.jobeCheckFiles = eBookConfig.proxyuri_files || '/runestone/proxy/jobeCheckFile/';
    // TODO:  should add a proper put/check in pavement.tmpl as this is misleading and will break on runestone

    this.div2id = {};
    if (this.stdin) {
        this.createInputElement();
    }
    this.createErrorOutput();
    };

LiveCode.prototype.outputfun = function (a) {};

LiveCode.prototype.createInputElement = function () {

    var label = document.createElement('label');
    label.for = this.divid + "_stdin";
    $(label).text($.i18n("msg_activecode_input_prg"));
    var input = document.createElement('input');
    input.id = this.divid + "_stdin";
    input.type = "text";
    input.size = "35";
    input.value = this.stdin;
    this.outerDiv.appendChild(label);
    this.outerDiv.appendChild(input);
    this.stdin_el = input;
};

LiveCode.prototype.createErrorOutput = function () {

};

/**
 * Note:
 * In order to check for supplemental files in java and deal with asynchronicity
 * I split the original runProg into two functions: runProg and runProg_callback
 */
LiveCode.prototype.runProg = function() {
    var stdin;
    var scrubber_dfd, history_dfd;
    var saveCode = "True";
    var sfilemap = {java: '', cpp: 'test.cpp', c: 'test.c', python3: 'test.py', python2: 'test.py'};
    var source = this.editor.getValue();
    source = this.buildProg(true);

    var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
    history_dfd = __ret.history_dfd;
    saveCode = __ret.saveCode;

    var paramlist = ['compileargs','linkargs','runargs','interpreterargs'];
    var paramobj = {}
    for (param of paramlist) {
        if (this[param]) {
            paramobj[param] = eval(this[param]); // needs a list
        }
    }

    if (this.stdin) {
        stdin = $(this.stdin_el).val();
    }

    if (! this.sourcefile ) {
        this.sourcefile = sfilemap[this.language];
    }

    $(this.output).html($.i18n("msg_activecode_compiling_running"));

    var files = [];
    if(this.language === "java") {
        if (this.datafile != undefined) {
            var ids = this.datafile.split(",");
            for (var i = 0; i < ids.length; i++) {
                file = document.getElementById(ids[i].trim());
                if (file === null || file === undefined) {
                    // console.log("No file with given id");
                } else if (file.className === "javaFiles") {
                    files = files.concat(this.parseJavaClasses(file.textContent));
                } else if (file.className === "image") {
                    var fileName = file.id;
                    var extension = fileName.substring(fileName.indexOf('.') + 1);
                    var base64 = file.toDataURL('image/' + extension);
                    base64 = base64.substring(base64.indexOf(',') + 1);
                    files.push({name: fileName, content: base64});
                } else {
                    // if no className or un recognized className it is treated as an individual file
                    // this could be any type of file, .txt, .java, .csv, etc
                    files.push({name: file.id, content: file.textContent});
                }
            }
        }
    }

    runspec = {
            language_id: this.language,
            sourcecode: source,
            parameters: paramobj,
            sourcefilename: this.sourcefile
    };

    if (stdin) {
        runspec.input = stdin
    }


    if(this.language !== "java" || files.length === 0) {
        data = JSON.stringify({'run_spec': runspec});
        this.runProg_callback(data);
    } else {
        runspec['file_list'] = [];
        var promises = [];
        var instance = this;
        //todo: Not sure why this is loaded like this. It could be loaded once.
        $.getScript('https://cdn.rawgit.com/killmenot/webtoolkit.md5/master/md5.js', function()
        {
            for(var i = 0; i < files.length; i++) {
                var fileName = files[i].name;
                var fileContent = files[i].content;
                instance.div2id[fileName] = "runestone" + MD5(fileName + fileContent);
                runspec['file_list'].push([instance.div2id[fileName], fileName]);
                promises.push(new Promise((resolve, reject) => {
                     instance.checkFile(files[i], resolve, reject);
                }));
            }
            data = JSON.stringify({'run_spec': runspec});
            this.div2id = instance.div2id;
            Promise.all(promises).then(function() {
                // console.log("All files on Server");
                instance.runProg_callback(data);
            }).catch(function(err) {
                // console.log("Error: " + err);
            });
        });
    }

}
LiveCode.prototype.runProg_callback = function(data) {

        var xhr, stdin;
        var runspec = {};
        var scrubber_dfd, history_dfd;
        var host, source, editor;
        var saveCode = "True";
        var sfilemap = {java: '', cpp: 'test.cpp', c: 'test.c', python3: 'test.py', python2: 'test.py'};
        source = this.editor.getValue();

        xhr = new XMLHttpRequest();

        host = this.JOBE_SERVER + this.resource;

        var odiv = this.output;
        $(this.runButton).attr('disabled', 'disabled');
        $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
        $(this.outDiv).show({duration:700,queue:false});
        $(this.errDiv).remove();
        $(this.output).css("visibility","visible");

        xhr.open("POST", host, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.setRequestHeader('X-API-KEY', this.API_KEY);

        xhr.onload = (function () {
            var logresult;
            $(this.runButton).removeAttr('disabled');
            try {
                var result = JSON.parse(xhr.responseText);
            } catch (e) {
                result = {};
                result.outcome = -1;
            }

            if (result.outcome === 15) {
                logresult = 'success';
            } else {
                logresult = result.outcome;
            }
            this.logRunEvent({'div_id': this.divid, 'code': source, 'errinfo': logresult, 'to_save':saveCode, 'event':'livecode'});
            switch (result.outcome) {
                case 15:
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    break;
                case 11: // compiler error
                    $(odiv).html($.i18n("msg_activecode_were_compiling_err"));
                    this.addJobeErrorMessage(result.cmpinfo);
                    break;
                case 12:  // run time error
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    if (result.stderr) {
                        this.addJobeErrorMessage(result.stderr);
                    }
                    break;
                case 13:  // time limit
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    this.addJobeErrorMessage($.i18n("msg_activecode_time_limit_exc"));
                    break;
                default:
                    if(result.stderr){
                        $(odiv).html(result.stderr.replace(/\n/g, "<br>"));
                    } else {
                        this.addJobeErrorMessage($.i18n("msg_activecode_server_err", xhr.status, xhr.statusText));
                    }
            }
            // todo: handle server busy and timeout errors too
        }).bind(this);

        ///$("#" + divid + "_errinfo").remove();

        xhr.onerror = (function () {
            this.addJobeErrorMessage($.i18n("msg_activecode_server_comm_err"));
            $(this.runButton).removeAttr('disabled');
        }).bind(this);

        xhr.send(data);

    };
LiveCode.prototype.addJobeErrorMessage = function (err) {
        var errHead = $('<h3>').html('Error');
        var eContainer = this.outerDiv.appendChild(document.createElement('div'));
        this.errDiv = eContainer;
        eContainer.className = 'error alert alert-danger';
        eContainer.id = this.divid + '_errinfo';
        eContainer.appendChild(errHead[0]);
        var errText = eContainer.appendChild(document.createElement('pre'));
        errText.innerHTML = err;
    };


/**
 * Checks to see if file is on server
 * Places it on server if it is not on server
 * @param  {object{name, contents}} file    File to place on server
 * @param  {function} resolve promise resolve function
 * @param  {function} reject  promise reject function
 */
LiveCode.prototype.checkFile = function(file, resolve, reject) {
    var file_id = this.div2id[file.name];
    var resource = this.jobeCheckFiles + file_id;
    var host = this.JOBE_SERVER + resource;

    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", host, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'text/plain');
    xhr.setRequestHeader('X-API-KEY', this.API_KEY);

    xhr.onerror = function () {
        // console.log("error sending file" + xhr.responseText);
    };

    xhr.onload = (function () {
        switch(xhr.status) {
            case 208:
            case 404:
                // console.log("File not on Server");
                this.pushDataFile(file, resolve, reject);
                break;
            case 400:
                // console.log("Bad Request");
                reject();
                break;
            case 204:
                // console.log("File already on Server");
                resolve();
                break;
            default:
                //console.log("This case should never happen");
                reject();
            }
    }).bind(this);

    xhr.send();

};
/**
 * Places a file on a server
 */
LiveCode.prototype.pushDataFile = function (file, resolve, reject) {

    var fileName = file.name;
    var extension = fileName.substring(fileName.indexOf('.') + 1);

    var file_id = this.div2id[fileName];
    var contents = file.content;

    // File types being uploaded that come in already in base64 format
    var extensions = ['jar', 'zip', 'png', 'jpg', 'jpeg'];
    var contentsb64;

    if (extensions.indexOf(extension) === -1) {
        contentsb64 = btoa(contents);
    } else {
        contentsb64 = contents;
    }

    var data = JSON.stringify({ 'file_contents' : contentsb64 });

    var resource = this.jobePutFiles + file_id;
    var host = this.JOBE_SERVER + resource;

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", host, true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('Accept', 'text/plain');

    xhr.setRequestHeader('X-API-KEY', this.API_KEY);

    xhr.onload = (function () {
        switch(xhr.status) {
            case 403:
                // console.log("Forbidden");
                reject();
                break;
            case 400:
                // console.log("Bad Request");
                reject();
                break;
            case 204:
                //console.log("successfully sent file " + xhr.responseText);
                //console.log("File " + fileName +", " + file_id +" placed on server");
                resolve();
                break;
            default:
                // console.log("This case should never happen");
                reject();
            }
    }).bind(this);

    xhr.onerror = function () {
        // console.log("error sending file" + xhr.responseText);
        reject();
    };

    xhr.send(data);

};

/**
 * Seperates text into multiple .java files
 * @param  {String} text String with muliple java classes needed to be seperated
 * @return {array of objects}  .name gives the name of the java file with .java extension
 *                   .content gives the contents of the file
 */
 LiveCode.prototype.parseJavaClasses = function(text) {

     text = text.trim();

     var found = false;
     var stack = 0;
     var startIndex = 0;
     var classes = [];
     var importIndex = 0;

     var endOfLastCommentBeforeClassBegins = 0;

     for(var i = 0; i < text.length; i++) {

         var char = text.charAt(i);
         if(char === '/') {
             i++;
             if(text.charAt(i) === '/') {
                 i++;
                 while(text.charAt(i) !== '\n' && i < text.length) {
                     i++;
                 }
                 if(!found) {
                     endOfLastCommentBeforeClassBegins = i;
                 }
             } else if(text.charAt(i) == '*') {
                 i++;
                 while((text.charAt(i) !== '*' || text.charAt(i+1) !== '/') && i + 1 < text.length) {
                     i++;
                 }
                 if(!found) {
                     endOfLastCommentBeforeClassBegins = i;
                 }
             }

         } else if(char === '"') {

             i++;
             while(text.charAt(i) !== '"' && i < text.length) {
                 i++;
             }
         } else if(char === '\'') {
             while(text.charAt(i) !== '\'' && i < text.length) {
                 i++;
             }
         } else if(char === '(') {
             var pCount = 1;
             i++;
         	while(pCount > 0 && i < text.length){
                if(text.charAt(i) === '(') {
                    pCount++;
                } else if(text.charAt(i) === ')') {
                    pCount--;
                }
                 i++;
             }
         }


         if(!found && text.charAt(i) === '{') {
             startIndex = i;
             found = true;
             stack = 1;
         } else if(found) {
             if(text.charAt(i) === '{') {
                 stack++;
             }
             if(text.charAt(i) === '}') {
                 stack--;
             }
         }
         if(found && stack === 0) {
             endIndex = i+1;

             var words = text.substring(endOfLastCommentBeforeClassBegins, startIndex).trim().split(" ");
             var className = "";
             for (var w = 0; w < words.length; w++) {
                 className = words[w];
                 if(words[w] === "extends" || words[w] === "implements") {
                     className = words[w-1];
                     w = words.length;
                 }
             }
             className = className.trim() + ".java";

             classes.push({name: className, content: text.substring(importIndex, endIndex)});
             found = false;
             importIndex = endIndex;
             endOfLastCommentBeforeClassBegins = endIndex;
         }

     }
     return classes;
 }


ACFactory = {};

ACFactory.createActiveCode = function (orig, lang, addopts) {
    var opts = {'orig' : orig, 'useRunestoneServices': eBookConfig.useRunestoneServices, 'python3' : eBookConfig.python3 };
    if (addopts) {
        for (var attrname in addopts) {
            opts[attrname] = addopts[attrname];
        }
    }
    if (lang === "javascript") {
        return new JSActiveCode(opts);
    } else if (lang === 'clojurescript') {
        return new CljSActiveCode(opts);
    } else if (lang === 'htmlmixed') {
        return new HTMLActiveCode(opts);
    } else if (['java', 'cpp', 'c', 'python3', 'python2'].indexOf(lang) > -1) {
        return new LiveCode(opts);
    } else {   // default is python
        return new ActiveCode(opts);
    }

};

// used by web2py controller(s)
ACFactory.addActiveCodeToDiv = function(outerdivid, acdivid, sid, initialcode, language) {
    var  thepre, newac;

    var acdiv = document.getElementById(acdivid);
    $(acdiv).empty();
    thepre = document.createElement("textarea");
    thepre['data-component'] = "activecode";
    thepre.id = outerdivid;
    $(thepre).data('lang', language);
    $(acdiv).append(thepre);
    var opts = {'orig' : thepre, 'useRunestoneServices': true };
    var addopts = {'sid': sid, 'graderactive':true};
    if(language === 'htmlmixed') {
        addopts['vertical'] = true;
    }
    newac = ACFactory.createActiveCode(thepre,language,addopts);
    var savediv = newac.divid;
    newac.divid = savediv;
    newac.editor.setSize(500,300);
    setTimeout(function() {
            newac.editor.refresh();
        },500);

};

ACFactory.createActiveCodeFromOpts = function(opts) {
    return ACFactory.createActiveCode(opts.orig, opts.lang, opts)
}

ACFactory.createScratchActivecode = function() {
    /* set up the scratch Activecode editor in the search menu */
    // use the URL to assign a divid - each page should have a unique Activecode block id.
    // Remove everything from the URL but the course and page name
    // todo:  this could probably be eliminated and simply moved to the template file
    var divid = document.URL.split('#')[0];
    if (divid.indexOf('static') > -1) {
        divid = divid.split('static')[1];
    } else {
        divid = divid.split('/');
        divid = divid.slice(-2).join("");
    }
    divid = divid.split('?')[0];  // remove any query string (e.g ?lastPosition)
    divid = divid.replaceAll('/', '').replace('.html', '').replace(':', '');
    eBookConfig.scratchDiv = divid;
    var lang = eBookConfig.acDefaultLanguage ? eBookConfig.acDefaultLanguage : 'python'
    // generate the HTML
    var html = '<div id="ac_modal_' + divid + '" class="modal fade">' +
        '  <div class="modal-dialog scratch-ac-modal">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '        <h4 class="modal-title">Scratch ActiveCode</h4>' +
        '      </div> ' +
        '      <div class="modal-body">' +
        '      <textarea data-component="activecode" id="' + divid + '" data-lang="'+ lang +'">' +
        '\n' +
        '\n' +
        '\n' +
        '      </textarea>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    var el = $(html);
    $('body').append(el);

    el.on('shown.bs.modal show.bs.modal', function () {
        el.find('.CodeMirror').each(function (i, e) {
            e.CodeMirror.refresh();
            e.CodeMirror.focus();
        });
    });

    //$(document).bind('keypress', '\\', function(evt) {
    //    ACFactory.toggleScratchActivecode();
    //    return false;
    //});
};


ACFactory.toggleScratchActivecode = function () {
    var divid = "ac_modal_" + eBookConfig.scratchDiv;
    var div = $("#" + divid);

    div.modal('toggle');

};

$(document).ready(function() {
    ACFactory.createScratchActivecode();
    $('[data-component=activecode]').each( function(index ) {
        if ($(this).closest('[data-component=timedAssessment]').length == 0 ) {   // If this element exists within a timed component, don't render it here
            edList[this.id] = ACFactory.createActiveCode(this, $(this).data('lang'));
        }
    });
    if (loggedout) {
        for (k in edList) {
            edList[k].disableSaveLoad();
        }
    }

});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['activecode'] = ACFactory.createActiveCodeFromOpts;

$(document).bind("runestone:login", function() {
    $(".run-button").text($.i18n("msg_activecode_save_run"));
});

// This seems a bit hacky and possibly brittle, but its hard to know how long it will take to
// figure out the login/logout status of the user.  Sometimes its immediate, and sometimes its
// long.  So to be safe we'll do it both ways..
var loggedout;
$(document).bind("runestone:logout",function() { loggedout=true;});
$(document).bind("runestone:logout",function() {
    for (k in edList) {
        if (edList.hasOwnProperty(k)) {
            edList[k].disableSaveLoad();
        }
    }
});
=======
>>>>>>> 8bc48765c114176685b620cddff0375b35e1a25f

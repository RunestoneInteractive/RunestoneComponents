import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';
import initSqlJs from "sql.js/dist/sql-wasm.js";
import RunestoneBase from "../../common/js/runestonebase.js";

// temporary code mirror stuff copied from activecode
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

// copied from activecode
// Used by Skulpt.
import embed from "vega-embed";
// Adapt for use outside webpack -- see https://github.com/vega/vega-embed.
window.vegaEmbed = embed;

var allDburls = {};

export default class SQLHParons extends RunestoneBase {
    constructor(opts) {
        super(opts);
        // copied from activecode
        var suffStart;
        var orig = $(opts.orig).find("textarea")[0];
        this.containerDiv = opts.orig;
        this.useRunestoneServices = opts.useRunestoneServices;
        this.python3 = opts.python3;
        this.alignVertical = opts.vertical;
        this.origElem = orig;
        this.origText = this.origElem.textContent;
        this.divid = opts.orig.id;
        this.code = $(orig).text() || "\n\n\n\n\n";
        this.language = $(orig).data("lang");
        this.includes = $(orig).data("include");
        this.hidehistory = $(orig).data("hidehistory");
        this.question = $(opts.orig).find(`#${this.divid}_question`)[0];
        this.tie = $(orig).data("tie");
        this.dburl = $(orig).data("dburl");
        this.runButton = null;
        this.saveButton = null;
        this.loadButton = null;
        this.outerDiv = null;
        this.partner = "";
        this.logResults = true;
        this.output = null; // create pre for output
        this.controlDiv = null;
        this.historyScrubber = null;
        this.timestamps = ["Original"];
        this.autorun = $(orig).data("autorun");
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

        // copied from activecode-sql
        //  fnprefix sets the path to load the sql-wasm.wasm file
        var bookprefix;
        var fnprefix;
        if (eBookConfig.useRunestoneServices) {
            bookprefix = `${eBookConfig.app}/books/published/${eBookConfig.basecourse}`;
            fnprefix = bookprefix + "/_static";
        } else {
            bookprefix = "";
            fnprefix = "/_static";
        }
        this.config = {
            locateFile: (filename) => `${fnprefix}/${filename}`,
        };
        this.showLast = $(this.origElem).data("showlastsql");
        var self = this;
        initSqlJs(this.config).then(function (SQL) {
            // set up call to load database asynchronously if given
            if (self.dburl) {
                if (self.dburl.startsWith("/_static")) {
                    self.dburl = `${bookprefix}${self.dburl}`;
                }
                $(self.runButton).attr("disabled", "disabled");
                let buttonText = $(self.runButton).text();
                $(self.runButton).text($.i18n("msg_activecode_load_db"));
                if (!(self.dburl in allDburls)) {
                    allDburls[self.dburl] = {
                        status: "loading",
                        xWaitFor: jQuery.Deferred(),
                    };
                } else {
                    if (allDburls[self.dburl].status == "loading") {
                        allDburls[self.dburl].xWaitFor.done(function () {
                            self.db = allDburls[self.dburl].dbObject;
                            $(self.runButton).removeAttr("disabled");
                            $(self.runButton).text(buttonText);
                        });
                        return;
                    }
                    self.db = allDburls[self.dburl].dbObject;
                    $(self.runButton).removeAttr("disabled");
                    $(self.runButton).text(buttonText);
                    return;
                }
                var xhr = new XMLHttpRequest();
                // For example: https://github.com/lerocha/chinook-database/raw/master/ChinookDatabase/DataSources/Chinook_Sqlite.sqlite
                xhr.open("GET", self.dburl, true);
                xhr.responseType = "arraybuffer";
                xhr.onload = (e) => {
                    var uInt8Array = new Uint8Array(xhr.response);
                    self.db = new SQL.Database(uInt8Array);
                    allDburls[self.dburl].dbObject = self.db;
                    $(self.runButton).text(buttonText);
                    $(self.runButton).removeAttr("disabled");
                    allDburls[self.dburl].db = uInt8Array;
                    allDburls[self.dburl].status = "ready";
                    allDburls[self.dburl].xWaitFor.resolve();
                    // contents is now [{columns:['col1','col2',...], values:[[first row], [second row], ...]}]
                };
                xhr.send();
            } else {
                self.db = new SQL.Database();
            }
        });
    }
    // copied from activecode
    createEditor(index) {
        this.outerDiv = document.createElement("div");
        var linkdiv = document.createElement("div");
        linkdiv.id = this.divid.replace(/_/g, "-").toLowerCase(); // :ref: changes _ to - so add this as a target
        $(this.outerDiv).addClass("ac_section alert alert-warning");
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
                    if (this.origText === editor.getValue()) {
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
    }

    // copied from activecode
    createOutput() {
        // Create a parent div with two elements:  pre for standard output and a div
        // to hold turtle graphics output.  We use a div in case the turtle changes from
        var outDiv = document.createElement("div");
        $(outDiv).addClass("ac_output col-md-12");
        this.outDiv = outDiv;
        this.output = document.createElement("pre");
        this.output.id = this.divid + "_stdout";
        $(this.output).css("visibility", "hidden");
        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
        outDiv.appendChild(this.output);
        this.outerDiv.appendChild(outDiv);
        clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.outerDiv.appendChild(clearDiv);
    }

    // copied from activecode
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
        console.log("adding click function for run");
        this.runButton.onclick = this.runButtonHandler.bind(this);
        $(butt).attr("type", "button");

        if (!this.hidehistory) {
            this.addHistoryButton(ctrlDiv);
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

    async runProg(noUI, logResults) {
        if (typeof logResults === "undefined") {
            this.logResults = true;
        } else {
            this.logResults = logResults;
        }
        if (typeof noUI !== "boolean") {
            noUI = false;
        }
        // Clear any old results
        this.saveCode = "True";
        let divid = this.divid + "_sql_out";
        let respDiv = document.getElementById(divid);
        if (respDiv) {
            respDiv.parentElement.removeChild(respDiv);
        }
        $(this.output).text("");
        // Run this query
        let query = await this.buildProg(false); // false --> Do not include suffix
        if (!this.db) {
            $(this.output).text(
                `Error: Database not initialized! DBURL: ${this.dburl}`
            );
            return;
        }

        let it = this.db.iterateStatements(query);
        this.results = [];
        try {
            for (let statement of it) {
                let columns = statement.getColumnNames();
                if (columns.length > 0) {
                    // data! probably a SELECT
                    let data = [];
                    while (statement.step()) {
                        data.push(statement.get());
                    }
                    this.results.push({
                        status: "success",
                        columns: columns,
                        values: data,
                        rowcount: data.length,
                    });
                } else {
                    let nsql = statement.getNormalizedSQL();
                    let prefix = nsql.substr(0, 6).toLowerCase();
                    statement.step(); // execute the query
                    // Try to detect INSERT/UPDATE/DELETE to give friendly feedback
                    // on rows modified - unfortunately, this won't catch such queries
                    // if they use CTEs.  There seems to be no reliable way of knowing
                    // when a SQLite query actually modified data.
                    if (
                        prefix === "insert" ||
                        prefix === "update" ||
                        prefix === "delete"
                    ) {
                        this.results.push({
                            status: "success",
                            operation: prefix,
                            rowcount: this.db.getRowsModified(),
                        });
                    } else {
                        this.results.push({ status: "success" });
                    }
                }
            }
        } catch (e) {
            this.results.push({
                status: "failure",
                message: e.toString(),
                sql: it.getRemainingSQL(),
            });
        }

        if (this.results.length === 0) {
            this.results.push({
                status: "failure",
                message: "No queries submitted.",
            });
        }

        try {
            this.saveCode = await this.manage_scrubber(this.saveCode);
            if (this.slideit) {
                $(this.historyScrubber).on(
                    "slidechange",
                    this.slideit.bind(this)
                );
            }
            $(this.historyScrubber).slider("enable");
        } catch (e) {
            console.log(`Failed to update scrubber ${e}`);
        }

        respDiv = document.createElement("div");
        respDiv.id = divid;
        this.outDiv.appendChild(respDiv);
        $(this.outDiv).show();
        // Sometimes we don't want to show a bunch of intermediate results
        // like when we are including a bunch of previous statements from
        // other activecodes In that case the showlastsql flag can be set
        // so we only show the last result
        let resultArray = this.results;
        if (this.showLast) {
            resultArray = this.results.slice(-1);
        }
        for (let r of resultArray) {
            let section = document.createElement("div");
            section.setAttribute("class", "ac_sql_result");
            respDiv.appendChild(section);
            if (r.status === "success") {
                if (r.columns) {
                    let tableDiv = document.createElement("div");
                    section.appendChild(tableDiv);
                    let maxHeight = 350;
                    if (resultArray.length > 1) maxHeight = 200; // max height smaller if lots of results
                    createTable(r, tableDiv, maxHeight);
                    let messageBox = document.createElement("pre");
                    let rmsg = r.rowcount !== 1 ? " rows " : " row ";
                    let msg = "" + r.rowcount + rmsg + "returned";
                    if (r.rowcount > 100) {
                        msg = msg + " (only first 100 rows displayed)";
                    }
                    msg = msg + ".";
                    messageBox.textContent = msg;
                    messageBox.setAttribute("class", "ac_sql_result_success");
                    section.appendChild(messageBox);
                } else if (r.rowcount) {
                    let messageBox = document.createElement("pre");
                    let op = r.operation;
                    op = op + (op.charAt(op.length - 1) === "e" ? "d." : "ed.");
                    let rmsg = r.rowcount !== 1 ? " rows " : " row ";
                    messageBox.textContent = "" + r.rowcount + rmsg + op;
                    messageBox.setAttribute("class", "ac_sql_result_success");
                    section.appendChild(messageBox);
                } else {
                    let messageBox = document.createElement("pre");
                    messageBox.textContent = "Operation succeeded.";
                    messageBox.setAttribute("class", "ac_sql_result_success");
                    section.appendChild(messageBox);
                }
            } else {
                let messageBox = document.createElement("pre");
                messageBox.textContent = r.message;
                messageBox.setAttribute("class", "ac_sql_result_failure");
                section.appendChild(messageBox);
            }
        }

        // Now handle autograding
        if (this.suffix) {
            this.testResult = this.autograde(
                this.results[this.results.length - 1]
            );
        } else {
            $(this.output).css("visibility", "hidden");
        }

        return Promise.resolve("done");
    }

    async logCurrentAnswer(sid) {
        let data = {
            div_id: this.divid,
            code: this.editor.getValue(),
            language: this.language,
            errinfo: this.results[this.results.length - 1].status,
            to_save: this.saveCode,
            prefix: this.pretext,
            suffix: this.suffix,
            partner: this.partner,
        }; // Log the run event
        if (typeof sid !== "undefined") {
            data.sid = sid;
        }
        await this.logRunEvent(data);

        if (this.unit_results) {
            let unitData = {
                event: "unittest",
                div_id: this.divid,
                course: eBookConfig.course,
                act: this.unit_results,
            };
            if (typeof sid !== "undefined") {
                unitData.sid = sid;
            }
            await this.logBookEvent(unitData);
        }
    }

    renderFeedback() {
        if (this.testResult) {
            $(this.output).text(this.testResult);
            $(this.output).css("visibility", "visible");
        }
    }

    autograde(result_table) {
        var tests = this.suffix.split(/\n/);
        this.passed = 0;
        this.failed = 0;
        // Tests should be of the form
        // assert row,col oper value for example
        // assert 4,4 == 3
        var result = "";
        tests = tests.filter(function (s) {
            return s.indexOf("assert") > -1;
        });
        for (let test of tests) {
            let wlist = test.split(/\s+/);
            wlist.shift();
            let loc = wlist.shift();
            let oper = wlist.shift();
            let expected = wlist.join(" ");
            let [row, col] = loc.split(",");
            result += this.testOneAssert(
                row,
                col,
                oper,
                expected,
                result_table
            );
            result += "\n";
        }
        let pct = (100 * this.passed) / (this.passed + this.failed);
        pct = pct.toLocaleString(undefined, { maximumFractionDigits: 2 });
        result += `You passed ${this.passed} out of ${this.passed + this.failed
            } tests for ${pct}%`;
        this.unit_results = `percent:${pct}:passed:${this.passed}:failed:${this.failed}`;
        return result;
    }
    testOneAssert(row, col, oper, expected, result_table) {
        // make sure row and col are in bounds
        let actual;
        let output = "";
        try {
            actual = result_table.values[row][col];
        } catch (e) {
            output = `Failed Not enough data to check row ${row} or column ${col}`;
            return output;
        }
        const operators = {
            "==": function (operand1, operand2) {
                return operand1 == operand2;
            },
            "!=": function (operand1, operand2) {
                return operand1 != operand2;
            },
            ">": function (operand1, operand2) {
                return operand1 > operand2;
            },
            "<": function (operand1, operand2) {
                return operand1 > operand2;
            },
        };
        let res = operators[oper](actual, expected);
        if (res) {
            output = `Pass: ${actual} ${oper} ${expected} in row ${row} column ${result_table.columns[col]}`;
            this.passed++;
        } else {
            output = `Failed ${actual} ${oper} ${expected} in row ${row} column ${result_table.columns[col]}`;
            this.failed++;
        }
        return output;
    }
}

function createTable(tableData, container, maxHeight) {
    let data = tableData.values;
    let trimRows = undefined;
    if (data.length === 0) {
        // kludge: no column headers will show up unless we do this
        data = [tableData.columns.map((e) => null)];
        trimRows = [0];
    }

    var hot = new Handsontable(container, {
        data: data,
        trimRows: trimRows,
        width: "100%",
        height: maxHeight,
        autoRowSize: true,
        autoColumnSize: { useHeaders: true },
        rowHeaders: false,
        colHeaders: tableData.columns,
        editor: false,
        maxRows: 100,
        filters: false,
        dropdownMenu: false,
        licenseKey: "non-commercial-and-evaluation",
    });

    // calculate actual height and resize
    let actualHeight = 40; // header height + small margin
    if (tableData.values.length > 0) {
        for (let i = 0; i < data.length; i++) {
            actualHeight = actualHeight + hot.getRowHeight(i);
            if (actualHeight > maxHeight) break;
        }
    }

    hot.updateSettings({ height: actualHeight });

    return hot;
}


/*=================================
== Find the custom HTML tags and ==
==   execute our code on them    ==
=================================*/
$(document).bind("runestone:login-complete", function () {
    $("[data-component=sqlhparsons]").each(function () {
        if ($(this).closest("[data-component=timedAssessment]").length == 0) {
            // If this element exists within a timed component, don't render it here
            // try {
                hpList[this.id] = new SQLHParons({
                    orig: this,
                    useRunestoneServices: eBookConfig.useRunestoneServices,
                });
            // } catch (err) {
            //     console.log(`Error rendering ShortAnswer Problem ${this.id}
            //     Details: ${err}`);
            // }
        }
    });
});

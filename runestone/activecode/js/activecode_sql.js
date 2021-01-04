import { ActiveCode } from "./activecode.js";
//require("sql.js");

var allDburls = {};

export default class SQLActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
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
                            self.db = new SQL.Database(
                                allDburls[self.dburl].db
                            );
                            $(self.runButton).removeAttr("disabled");
                            $(self.runButton).text(buttonText);
                        });
                        return;
                    }
                    self.db = new SQL.Database(allDburls[self.dburl].db);
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
        for (let r of this.results) {
            let section = document.createElement("div");
            section.setAttribute("class", "ac_sql_result");
            respDiv.appendChild(section);
            if (r.status === "success") {
                if (r.columns) {
                    let tableDiv = document.createElement("div");
                    section.appendChild(tableDiv);
                    let maxHeight = 350;
                    if (this.results.length > 1) maxHeight = 200; // max height smaller if lots of results
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

    logCurrentAnswer() {
        this.logRunEvent({
            div_id: this.divid,
            code: this.editor.getValue(),
            lang: this.language,
            errinfo: this.results[this.results.length - 1].status,
            to_save: this.saveCode,
            prefix: this.pretext,
            suffix: this.suffix,
            partner: this.partner,
        }); // Log the run event

        if (this.unit_results) {
            this.logBookEvent({
                event: "unittest",
                div_id: this.divid,
                course: eBookConfig.course,
                act: this.unit_results,
            });
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
        result += `You passed ${this.passed} out of ${
            this.passed + this.failed
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

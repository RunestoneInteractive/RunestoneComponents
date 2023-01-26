import HParsonsFeedback from "./hparsonsFeedback";
import initSqlJs from "sql.js/dist/sql-wasm.js";
import Handsontable from "handsontable";
import 'handsontable/dist/handsontable.full.css';

var allDburls = {};

export default class SQLFeedback extends HParsonsFeedback {

    createOutput() {
        var outDiv = document.createElement("div");
        $(outDiv).addClass("hp_output col-md-12");
        this.outDiv = outDiv;
        this.output = document.createElement("pre");
        this.output.id = this.hparsons.divid + "_stdout";
        $(this.output).css("visibility", "hidden");
        var clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.hparsons.outerDiv.appendChild(clearDiv);
        outDiv.appendChild(this.output);
        this.hparsons.outerDiv.appendChild(outDiv);
        clearDiv = document.createElement("div");
        $(clearDiv).css("clear", "both"); // needed to make parent div resize properly
        this.hparsons.outerDiv.appendChild(clearDiv);
    }

    renderFeedback() {
        if (this.testResult) {
            $(this.output).text(this.testResult);
            $(this.output).css("visibility", "visible");
        }
        $(this.outDiv).show();
    }

    clearFeedback() {
        $(this.outDiv).hide();
    }

    reset() {
        this.clearFeedback();
    }

    init() {
        // adapted from activecode-sql
        // fnprefix sets the path to load the sql-wasm.wasm file
        var bookprefix;
        var fnprefix;
        if (
            eBookConfig.useRunestoneServices ||
            window.location.search.includes("mode=browsing")
        ) {
            bookprefix = `${eBookConfig.app}/books/published/${eBookConfig.basecourse}`;
            fnprefix = bookprefix + "/_static";
        } else {
            // The else clause handles the case where you are building for a static web browser
            bookprefix = "";
            fnprefix = "/_static";
        }
        let SQLconfig = {
            locateFile: (filename) => `${fnprefix}/${filename}`,
        };
        // this.showLast = $(this.origElem).data("showlastsql");
        var self = this.hparsons;
        initSqlJs(SQLconfig).then(function (SQL) {
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

    // adapted from activecode - SQL
    async runButtonHandler() {
        // Disable the run button until the run is finished.
        this.hparsons.runButton.disabled = true;
        try {
            await this.runProg();
        } catch (e) {
            console.log(`there was an error ${e} running the code`);
        }
        this.logCurrentAnswer();
        this.renderFeedback();
        // The run is finished; re-enable the button.
        this.hparsons.runButton.disabled = false;
    }

    // adapted from activecode-sql
    async runProg() {
        // Clear any old results
        let divid = this.hparsons.divid + "_sql_out";
        let respDiv = document.getElementById(divid);
        if (respDiv) {
            respDiv.parentElement.removeChild(respDiv);
        }
        $(this.output).text("");
        // creating new results div
        respDiv = document.createElement("div");
        respDiv.id = divid;
        this.outDiv.appendChild(respDiv);
        // show the output div
        $(this.outDiv).show();

        // Run this query
        let query = await this.buildProg();
        if (!this.hparsons.db) {
            $(this.output).text(
                `Error: Database not initialized! DBURL: ${this.hparsons.dburl}`
            );
            return;
        }

        let executionSuccessFlag = true;

        // executing hidden prefix if exist
        if (query.prefix) {
            this.prefixresults = this.executeIteratedStatements(this.hparsons.db.iterateStatements(query.prefix));
            if (this.prefixresults.at(-1).status == 'failure') {
                // if error occured in hidden prefix, log and stop executing the rest
                this.visualizeResults(respDiv, this.prefixresults, "Error executing hidden code in prefix");
                executionSuccessFlag = false;
            }
        }

        // executing student input in micro Parsons
        if (executionSuccessFlag) {
            this.results = this.executeIteratedStatements(this.hparsons.db.iterateStatements(query.input));
            // always render full execution results of student input regardless of success/failure
            this.visualizeResults(respDiv, this.results);
            if (this.results.at(-1).status == 'failure') {
                // if error occured in student input, stop executing suffix/unitttest 
                executionSuccessFlag = false;
            }
        }
        
        // executing hidden suffix if exist
        // In most cases the suffix is just "select * from x" to 
        //    see if the operations on the database is correct
        if (executionSuccessFlag && query.suffix) {
            this.suffixresults = this.executeIteratedStatements(this.hparsons.db.iterateStatements(query.suffix));
            if (this.suffixresults.at(-1).status == 'failure') {
                // if error occured in hidden suffix, visualize the results
                this.visualizeResults(respDiv, this.suffixresults, "Error executing hidden code in suffix");
            }
        }

        // Now handle autograding
        // autograding takes the results of the hidden suffix if exist
        // otherwise take the result of student input
        if (this.hparsons.unittest) {
            if (this.suffixresults) {
                this.testResult = this.autograde(
                    this.suffixresults[this.suffixresults.length - 1]
                );
            } else {
                this.testResult = this.autograde(
                    this.results[this.results.length - 1]
                );
            }
        } else {
            $(this.output).css("visibility", "hidden");
        }

        return Promise.resolve("done");
    }

    // Refactored from activecode-sql.
    // Takes iterated statements from db.iterateStatemnts(queryString)
    // Returns Array<result>:
    /* each result: {
        status: "success" or "faliure",
        // for SELECT statements (?):
        columns: number of columns,
        values: data,
        rowcount: number of rows in data,
        // for INSERT, UPDATE, DELETE:
        operation: "INSERT", "UPDATE", or "DELETE",
        rowcount: number of rows modified,
        // when error occurred (aside from status):
        message: error message,
        sql: remaining SQL (?)
        // when no queries were executed:
        message: "no queries submitted"
    }*/
    // If an error occurs it will stop executing the rest of queries in it.
    // Thus the error result will always be the last item.
    executeIteratedStatements(it) {
        let results = [];
        try {
            for (let statement of it) {
                let columns = statement.getColumnNames();
                if (columns.length > 0) {
                    // data! probably a SELECT
                    let data = [];
                    while (statement.step()) {
                        data.push(statement.get());
                    }
                    results.push({
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
                        results.push({
                            status: "success",
                            operation: prefix,
                            rowcount: this.hparsons.db.getRowsModified(),
                        });
                    } else {
                        results.push({ status: "success" });
                    }
                }
            }
        } catch (e) {
            results.push({
                status: "failure",
                message: e.toString(),
                sql: it.getRemainingSQL(),
            });
        }
        if (results.length === 0) {
            results.push({
                status: "failure",
                message: "No queries submitted.",
            });
        }
        return results;
    }

    // output the results in the resultArray(Array<results>).
    // container: the container that contains the results
    // resultArray (Array<result>): see executeIteratedStatements
    // Each result will be in a separate row.
    // devNote will be displayed in the top row if exist.
    // Current usage: "error executing hidden code in prefix/suffix"
    visualizeResults(container, resultArray, devNote) {
        if (devNote) {
            let section = document.createElement("div");
            section.setAttribute("class", "hp_sql_result");
            container.appendChild(section);
            let messageBox = document.createElement("pre");
            messageBox.textContent = devNote;
            messageBox.setAttribute("class", "hp_sql_result_failure");
            section.appendChild(messageBox);
        }
        for (let r of resultArray) {
            let section = document.createElement("div");
            section.setAttribute("class", "hp_sql_result");
            container.appendChild(section);
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
                    messageBox.setAttribute("class", "hp_sql_result_success");
                    section.appendChild(messageBox);
                } else if (r.rowcount) {
                    let messageBox = document.createElement("pre");
                    let op = r.operation;
                    op = op + (op.charAt(op.length - 1) === "e" ? "d." : "ed.");
                    let rmsg = r.rowcount !== 1 ? " rows " : " row ";
                    messageBox.textContent = "" + r.rowcount + rmsg + op;
                    messageBox.setAttribute("class", "hp_sql_result_success");
                    section.appendChild(messageBox);
                } else {
                    let messageBox = document.createElement("pre");
                    messageBox.textContent = "Operation succeeded.";
                    messageBox.setAttribute("class", "hp_sql_result_success");
                    section.appendChild(messageBox);
                }
            } else {
                let messageBox = document.createElement("pre");
                messageBox.textContent = r.message;
                messageBox.setAttribute("class", "hp_sql_result_failure");
                section.appendChild(messageBox);
            }
        }
    }
 
    // adapted from activecode
    async buildProg() {
        // assemble code from prefix, suffix, and editor for running.
        let prog = {};
        if (this.hparsons.hiddenPrefix) {
            prog.prefix = this.hparsons.hiddenPrefix;
        }
        prog.input = this.hparsons.hparsonsInput.getParsonsTextArray().join(' ') + "\n";
        if (this.hparsons.hiddenSuffix) {
            prog.suffix = this.hparsons.hiddenSuffix;
        }
        return Promise.resolve(prog);
    }

    // copied from activecode-sql
    async logCurrentAnswer() {
        if (this.unit_results) {
            let act = {
                scheme: "execution",
                correct: (this.failed === 0 && this.percent != null) ? "T" : "F",
                answer: this.hparsons.hparsonsInput.getParsonsTextArray(),
                percent: this.percent // percent is null if there is execution error
            }
            let logData = {
                event: "hparsonsAnswer",
                div_id: this.hparsons.divid,
                act: act
            }
            await this.hparsons.logBookEvent(logData);
        }
    }

    // might move to base class if used by multiple execution based feedback
    autograde(result_table) {
        var tests = this.hparsons.unittest.split(/\n/);
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
        this.percent = pct;
        pct = pct.toLocaleString(undefined, { maximumFractionDigits: 2 });
        result += `You passed ${this.passed} out of ${this.passed + this.failed
            } tests for ${pct}%`;
        this.unit_results = `percent:${pct}:passed:${this.passed}:failed:${this.failed}`;
        return result;
    }

    // might move to base class if used by multiple execution based feedback
    testOneAssert(row, col, oper, expected, result_table) {
        // make sure row and col are in bounds
        let actual;
        let output = "";
        try {
            actual = result_table.values[row][col];
        } catch (e) {
            if (expected == 'NO_DATA') {
                this.passed++;
                output = `Passed: No data in row ${row}, column ${col}`;
                return output;
            } else {
                output = `Failed: Not enough data to check row ${row} or column ${col}`;
                return output;
            }
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

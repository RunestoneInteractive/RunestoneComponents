import { ActiveCode } from "./activecode.js";
//require("sql.js");

var allDburls = {};

export default class SQLActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        var fnprefix;
        if (eBookConfig.useRunestoneServices) {
            fnprefix =
                "/runestone/books/published/" +
                eBookConfig.basecourse +
                "/_static";
        } else {
            fnprefix = "/_static";
        }
        this.config = {
            locateFile: (filename) => `${fnprefix}/${filename}`,
        };
        var self = this;
        initSqlJs(this.config).then(function (SQL) {
            // set up call to load database asynchronously if given
            if (self.dburl) {
                if (!self.dburl.startsWith("http")) {
                    self.dburl =
                        window.location.protocol +
                        "//" +
                        window.location.host +
                        self.dburl;
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
    runProg() {
        var result_mess = "success";
        var result;
        var scrubber_dfd, history_dfd, saveCode;
        // Clear any old results
        saveCode = "True";
        let divid = this.divid + "_sql_out";
        let respDiv = document.getElementById(divid);
        if (respDiv) {
            respDiv.parentElement.removeChild(respDiv);
        }
        $(this.output).text("");
        // Run this query
        let query = this.buildProg(false); // false --> Do not include suffix
        if (!this.db) {
            $(this.output).text(
                `Error: Database not initialized! DBURL: ${this.dburl}`
            );
            return;
        }

        // we need multiple outputs, not one - let's just hide this
        $(this.output).css("visibility", "hidden");

        let queries = parseSQL(query);
        let results = [];
        for (let q of queries) {
            try {
                let prefix = q.substr(0, 6).toLowerCase();
                if (prefix === "select") {
                    let stmt = this.db.prepare(q);
                    let columns = stmt.getColumnNames();
                    let data = [];
                    while (stmt.step()) {
                        data.push(stmt.get());
                    }
                    stmt.free();
                    results.push({ status: "success", columns: columns, values: data, rowcount: data.length });
                } else if (prefix === "insert" || prefix === "update" || prefix === "delete") {
                    this.db.run(q);
                    results.push({ status: "success", operation: prefix, rowcount: this.db.getRowsModified() });
                } else {
                    // DDL, presumably
                    this.db.run(q);
                    results.push({ status: "success" });
                }
            } catch (error) {
                results.push({ status: "failure", message: error.toString() });
            }
        }
        if (results.length === 0) {
            results.push({ status: "failure", message: "No queries submitted." });
        }

        this.logRunEvent({
            div_id: this.divid,
            code: this.editor.getValue(),
            lang: this.language,
            errinfo: results[results.length - 1].status,
            to_save: saveCode,
            prefix: this.pretext,
            suffix: this.suffix,
            partner: this.partner,
        }); // Log the run event
        var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
        history_dfd = __ret.history_dfd;
        saveCode = __ret.saveCode;
        history_dfd.then(function () {
            if (this.slideit) {
                $(this.historyScrubber).on(
                    "slidechange",
                    this.slideit.bind(this)
                );
            }
            $(this.historyScrubber).slider("enable");
        });

        respDiv = document.createElement("div");
        respDiv.id = divid;
        this.outDiv.appendChild(respDiv);
        $(this.outDiv).show();
        for (let r of results) {
            let section = document.createElement("div");
            section.setAttribute("class", "ac_sql_result");
            respDiv.appendChild(section);
            if (r.status === "success") {
                if (r.values) {
                    let tableDiv = document.createElement("div");
                    section.appendChild(tableDiv);
                    // kludge: approximate height of result
                    let height = (r.values.length + 2) * 24;
                    if (height > 350) height = 350;
                    if (results.length > 1 && height > 200) height = 200;
                    createTable(r, tableDiv, height);
                    let messageBox = document.createElement("pre");
                    messageBox.textContent = "" + r.rowcount + " rows returned.";
                    messageBox.setAttribute("class", "ac_sql_result_success");
                    section.appendChild(messageBox);
                } else if (r.rowcount) {
                    let messageBox = document.createElement("pre");
                    messageBox.textContent = "" + r.rowcount + " rows " + r.operation + "ed.";
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
            result = this.autograde(results[results.length - 1]);
            $(this.output).text(result);
        } else {
            $(this.output).css("visibility", "hidden");
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
        this.logBookEvent({
            event: "unittest",
            div_id: this.divid,
            course: eBookConfig.course,
            act: `percent:${pct}:passed:${this.passed}:failed:${this.failed}`,
        });
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

function createTable(tableData, container, height) {
    var hot = new Handsontable(container, {
        data: tableData.values,
        rowHeaders: false,
        colHeaders: tableData.columns,
        editor: false,
        height: height,
        width: "100%",
        maxRows: 100,
        filters: false,
        dropdownMenu: false,
        licenseKey: "non-commercial-and-evaluation",
    });

    return hot;
}

// sql-js exec() method is currently inadequate for effective reporting
// of multiple query results.  So, parse the input ourselves to split
// into individual queries where we can control the reporting.
// ** THIS MAY NOT BE AS EQUIVALENT TO LETTING SQLITE DO THE PARSING. **
function parseSQL(sql) {
    let multiline_comment = /\/\*[\s\S]*?\*\//m;
    let single_line_comment = /--.*/;

    // First, strip out all comments (avoids some nasty edge cases)
    while (true) {
        // earliest start of comment wins
        let mm = multiline_comment.exec(sql);
        let sm = single_line_comment.exec(sql);
        let match = mm;
        if (mm && sm) {
            if (sm.index < mm.index) match = sm;
        } else if (sm) {
            match = sm;
        }
        if (match) {
            sql = sql.substr(0, match.index) + " " + sql.substr(match.index + match[0].length);
        }
        else {
            break;
        }
    }

    return sql.split(";").map(q => q.trim()).filter(q => q.length !== 0);
}

ssList = {};

class SpreadSheet extends RunestoneBase {
    constructor(opts) {
        super(SpreadSheet);
        let orig = opts.orig;
        this.div_id = orig.id;
        this.sheet_id = `${this.div_id}_sheet`;
        this.data = eval(`${this.div_id}_data`);
        this.autograde = $(orig).data("autograde");
        this.suffix = window[`${this.div_id}_asserts`];
        this.renderSheet();

        if (this.autograde) {
            this.addAutoGradeButton();
            this.addOutput();
        }
    }

    renderSheet() {
        let div = document.getElementById(this.sheet_id);
        this.table = jexcel(div, {data:this.data});
    }

    addAutoGradeButton() {
        let div = document.getElementById(this.div_id);
        var butt = document.createElement("button");
        $(butt).text("Check");
        $(butt).addClass("btn btn-success run-button");
        div.appendChild(butt);
        this.gradeButton = butt;
        $(butt).click(this.doAutoGrade.bind(this));
        $(butt).attr("type","button");
    }

    addOutput() {
        this.output = document.createElement('pre');
        this.output.id = this.divid+'_stdout';
        $(this.output).css("visibility","hidden");
        let div = document.getElementById(this.div_id);
        div.appendChild(this.output);
    }

    doAutoGrade () {
        let tests = this.suffix;
        this.passed = 0;
        this.failed = 0;
        // Tests should be of the form
        // assert row,col oper value for example
        // assert 4,4 == 3
        let result = "";
        tests = tests.filter(function(s) {
            return s.indexOf('assert') > -1;
        });
        for (let test of tests) {
            let assert, loc, oper, expected;
            [assert, loc, oper, expected] = test.split(/\s+/);
            result += this.testOneAssert(loc, oper, expected);
            result += "\n";
        }
        let pct = 100 * this.passed / (this.passed + this.failed);
        pct = pct.toLocaleString(undefined, { maximumFractionDigits: 2});
        result += `You passed ${this.passed} out of ${this.passed+this.failed} tests for ${pct}%`;
        this.logBookEvent({event: 'unittest',
                           div_id: this.divid,
                           course: eBookConfig.course,
                           act: `percent:${pct}:passed:${this.passed}:failed:${this.failed}`
                        });
        $(this.output).css("visibility","visible");
        $(this.output).text(result);
    }

    testOneAssert(cell, oper, expected) {
        let actual  = this.getCellDisplayValue(cell);
        const operators = {
            "==" : function (operand1, operand2) {
                return operand1 == operand2;
            },
            "!=" : function (operand1, operand2) {
                return operand1 != operand2;
            },
            ">" : function (operand1, operand2) {
                return operand1 > operand2;
            },
            "<" : function (operand1, operand2) {
                return operand1 > operand2;
            }
        };

        let res = operators[oper](actual, expected);
        let output = "";
        if (res) {
            output = `Pass: ${actual} ${oper} ${expected} in ${cell}`;
            this.passed++;
        } else {
            output = `Failed ${actual} ${oper} ${expected} in cell ${cell}`;
            this.failed++;
        }
        return output;
    }



    // If the cell contains a formula, this call will return the formula not the computed value
    getCellSource(cell) {
        return this.table.getValue(cell);
    }

    // If the cell contains a formula this call will return the computed value
    getCellDisplayValue(cell) {
        let parts = cell.match(/\$?([A-Z]+)\$?([0-9]+)/);
        let x = this.columnToIndex(parts[1]);
        let y = parts[2] - 1;
        let res = this.table.el.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        return res.innerText;
    }

    columnToIndex(colName) {
        // Convert the column name to a number A = 0 AA = 26 BA = 52, etc
        let base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = 0;

        for (let i = 0, j = colName.length - 1; i < colName.length; i += 1, j -= 1) {
          result += Math.pow(base.length, j) * (base.indexOf(colName[i]) + 1);
        }

        return result - 1;
      }

}

$(document).bind("runestone:login-complete", function () {
    $("[data-component=spreadsheet]").each(function (index) {    // MC
        var opts = {"orig": this, 'useRunestoneServices':eBookConfig.useRunestoneServices};
        ssList[this.id] = new SpreadSheet(opts);
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {};
}
component_factory.spreadsheet = function(opts) { return new SpreadSheet(opts);};

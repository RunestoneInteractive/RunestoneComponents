var testString = `Starting Tests
Expected: Answer                   Actual: Answer                   Message: Checking method printAnswer()                     Passed: true
Expected: 6 line(s) of text        Actual: 0 line(s) of text        Message: Checking main method                              Passed: false
Hello World
Expected: String String            Actual: String String            Message: Checking Instance Variable Type(s)                Passed: true
Expected: Question                 Actual: Question                 Message: Checking method printQuestion()                   Passed: true
Debugging output
More debug output
Expected: 2 Private                Actual: 2 Private                Message: Checking Private Instance Variable(s)             Passed: true
Expected: pass                     Actual: pass                     Message: Checking constructor with parameters              Passed: true
Expected: fail                     Actual: fail                     Message: Checking default constructor                      Passed: true
Ending Tests
You got 6 out of 7 correct. 85.71%`;

export default class JUnitTestParser {
    constructor(output, parentId) {
        let patt = new RegExp(
            "Expected:\\s+(.*?)Actual:\\s+(.*?)Message:\\s+(.*?)Passed:\\s+(true|false)",
            "g"
        );
        this.textResults = "";
        let matches = output.matchAll(patt);
        let parent = document.createElement("div");
        parent.classList.add("unittest-results");
        let tbl = document.createElement("table");
        tbl.classList.add("ac-feedback");
        parent.appendChild(tbl);
        parent.setAttribute("id", `${parentId}_unit_results`);
        let tr = document.createElement("tr");
        tr.innerHTML =
            '<th class="ac-feedback">Result</th><th class="ac-feedback">Expected</th><th class="ac-feedback">Actual</th><th class="ac-feedback">Notes</th>';
        tbl.appendChild(tr);
        for (const match of matches) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            td.classList.add("ac-feedback");
            if (match[match.length - 1] == "true") {
                td.innerHTML = "Pass";
                td.style =
                    "background-color: rgb(131, 211, 130); text-align: center;";
            } else {
                td.innerHTML = "Fail";
                td.style =
                    "background-color: rgb(222, 142, 150); text-align: center;";
            }
            tr.appendChild(td);
            tbl.appendChild(tr);
            for (let i = 1; i < match.length - 1; i++) {
                let td = document.createElement("td");
                td.innerHTML = match[i];
                td.classList.add("ac-feedback");
                tr.appendChild(td);
            }
            tbl.appendChild(tr);
            this.table = parent;
            this.textResults += match[0] + "\n";
            output = output.replace(match[0], "");
        }
        let match = output.match(
            /You got\s+(\d+) out of (\d+) correct.\s+(\d+\.\d+)%/
        );
        if (match) {
            output = output.replace(match[0], "");
            let pctString = document.createElement("span");
            pctString.innerHTML = match[0];
            this.pctString = pctString;
            this.pct = match[3];
            this.passed = match[1];
            this.failed = match[2] - match[1];
        }
        output = output.replace("Starting Tests", "");
        output = output.replace("Ending Tests", "");
        output = output.replace(/\n/g, "<br>");
        output = output.replace(/(<br>)+/g, "<br>");
        output = output.replaceAll("&lt;img", "<img");
        this.stdout = output;
    }
}

// let x = new ResultsToTable(testString);
// console.log(x.stdout);
// console.log(x.table);

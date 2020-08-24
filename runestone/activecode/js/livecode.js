import { ActiveCode } from "./activecode.js";
import MD5 from "./md5.js";
import ResultsToTable from "./extractUnitResults.js";
import JUnitTestParser from "./extractUnitResults.js";

export default class LiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        var orig = opts.orig;
        this.stdin = $(orig).data("stdin");
        this.datafile = $(orig).data("datafile");
        this.sourcefile = $(orig).data("sourcefile");
        this.compileargs = unescapeHtml($(orig).data("compileargs"));
        this.linkargs = unescapeHtml($(orig).data("linkargs"));
        this.runargs = unescapeHtml($(orig).data("runargs"));
        this.interpreterargs = unescapeHtml($(orig).data("interpreterargs"));
        this.API_KEY = "67033pV7eUUvqo07OJDIV8UZ049aLEK1";
        this.USE_API_KEY = true;
        this.JOBE_SERVER = eBookConfig.jobehost || eBookConfig.host;
        this.resource = eBookConfig.proxyuri_runs || "/runestone/proxy/jobeRun";
        this.jobePutFiles =
            eBookConfig.proxyuri_files || "/runestone/proxy/jobePushFile/";
        this.jobeCheckFiles =
            eBookConfig.proxyuri_files || "/runestone/proxy/jobeCheckFile/";
        // TODO:  should add a proper put/check in pavement.tmpl as this is misleading and will break on runestone
        this.div2id = {};
        if (this.stdin) {
            this.createInputElement();
        }
        this.createErrorOutput();
    }
    outputfun(a) {}
    createInputElement() {
        var label = document.createElement("label");
        label.for = this.divid + "_stdin";
        $(label).text($.i18n("msg_activecode_input_prg"));
        var input = document.createElement("input");
        input.id = this.divid + "_stdin";
        input.type = "text";
        input.size = "35";
        input.value = this.stdin;
        this.outerDiv.appendChild(label);
        this.outerDiv.appendChild(input);
        this.stdin_el = input;
    }
    createErrorOutput() {}
    /**
     * Note:
     * In order to check for supplemental files in java and deal with asynchronicity
     * I split the original runProg into two functions: runProg and runProg_callback
     */
    runProg() {
        var stdin;
        var scrubber_dfd, history_dfd;
        var source;
        var saveCode = "True";
        var sfilemap = {
            java: "",
            cpp: "test.cpp",
            c: "test.c",
            python3: "test.py",
            python2: "test.py",
        };
        var sourcefilename = "";
        var testdrivername = "";

        if (this.suffix && this.language == "java") {
            let classMatch = new RegExp(/public class\s+(\w+)[\s+\{]/);
            source = this.buildProg(false);
            let m = source.match(classMatch);
            if (m) {
                sourcefilename = m[1] + ".java";
            }
            // this will be unit test code
            m = this.suffix.match(classMatch);
            if (m) {
                testdrivername = m[1] + ".java";
            }
        } else {
            source = this.buildProg(true);
        }
        // Validate the data is convertable to Base64. If not then error out now
        try {
            let contentsb64 = btoa(source);
        } catch (e) {
            alert(
                "Error: Bad Characters in the activecode window. Likely a quote character that has been copy/pasted. 🙁"
            );
            return;
        }
        var __ret = this.manage_scrubber(scrubber_dfd, history_dfd, saveCode);
        history_dfd = __ret.history_dfd;
        saveCode = __ret.saveCode;
        var paramlist = [
            "compileargs",
            "linkargs",
            "runargs",
            "interpreterargs",
        ];
        var paramobj = {};
        for (let param of paramlist) {
            if (this[param]) {
                paramobj[param] = eval(this[param]); // needs a list
            }
        }
        if (this.stdin) {
            stdin = $(this.stdin_el).val();
        }
        if (!this.sourcefile) {
            this.sourcefile = sfilemap[this.language];
        }
        $(this.output).html($.i18n("msg_activecode_compiling_running"));
        var files = [];
        var content, base64;
        if (this.datafile != undefined) {
            var ids = this.datafile.split(",");
            for (var i = 0; i < ids.length; i++) {
                let fileName = ids[i].trim();
                let file = document.getElementById(fileName);
                let fileExtension = fileName.substring(
                    fileName.lastIndexOf(".") + 1
                );
                if (file === null || file === undefined) {
                    // console.log("No file with given id");
                    // check to see if file is in db
                    content = this.fileReader(fileName);
                } else {
                    content = file.textContent;
                    // may be undefined at this point if file is an image
                }
                if (fileExtension === "jar") {
                    files = files.concat(this.parseJavaClasses(content));
                } else if (["jpg", "png", "gif"].indexOf(fileExtension) > -1) {
                    if (file) {
                        if (file.toDataURL) {
                            base64 = file.toDataURL("image/" + fileExtension);
                            base64 = base64.substring(base64.indexOf(",") + 1);
                        } else {
                            base64 = file.src.substring(
                                file.src.indexOf(",") + 1
                            );
                        }
                    } else {
                        base64 = content;
                    }
                    files.push({ name: fileName, content: base64 });
                } else {
                    // if no className or un recognized className it is treated as an individual file
                    // this could be any type of file, .txt, .java, .csv, etc
                    files.push({ name: fileName, content: content });
                }
            }
        }
        // If we are running unit tests we need to substitute the test driver for the student
        // code and send the student code as a file.  We'll do that here.
        this.junitDriverCode = `
        import org.junit.runner.JUnitCore;
        import org.junit.runner.Result;
        import org.junit.runner.notification.Failure;

        public class TestRunner {
            public static void main(String[] args) {
                CodeTestHelper.resetFinalResults();
                Result result = JUnitCore.runClasses(${testdrivername.replace(
                    ".java",
                    ".class"
                )});
                System.out.println(CodeTestHelper.getFinalResults());

                int total = result.getRunCount();
                int fails = result.getFailureCount();
                int corr  = total - fails;
                System.out.println("You got " + corr + " out of " + total + " correct. " + String.format("%.2f", (100.0 * corr / total)) + "%");
            }
        }

        `;
        if (this.suffix && this.language == "java") {
            files.push({ name: sourcefilename, content: source });
            files.push({ name: testdrivername, content: this.suffix });
            source = this.junitDriverCode;
            if (paramobj.compileargs) {
                paramobj.compileargs.push(sourcefilename);
            } else {
                paramobj.compileargs = [sourcefilename];
            }
        }
        let runspec = {
            language_id: this.language,
            sourcecode: source,
            parameters: paramobj,
            sourcefilename: this.sourcefile,
        };

        if (stdin) {
            runspec.input = stdin;
        }
        if (files.length === 0) {
            let data = JSON.stringify({ run_spec: runspec });
            this.runProg_callback(data);
        } else {
            runspec["file_list"] = [];
            var promises = [];
            var instance = this;

            for (let i = 0; i < files.length; i++) {
                var fileName = files[i].name;
                var fileContent = files[i].content;
                instance.div2id[fileName] =
                    "runestone" + MD5(fileName + fileContent);
                runspec["file_list"].push([
                    instance.div2id[fileName],
                    fileName,
                ]);
                promises.push(
                    new Promise((resolve, reject) => {
                        instance.checkFile(files[i], resolve, reject);
                    })
                );
            }
            let data = JSON.stringify({ run_spec: runspec });
            this.div2id = instance.div2id;
            Promise.all(promises)
                .then(function () {
                    // console.log("All files on Server");
                    instance.runProg_callback(data);
                })
                .catch(function (err) {
                    // console.log("Error: " + err);
                });
        }
    }
    runProg_callback(data) {
        var xhr, stdin;
        var runspec = {};
        var scrubber_dfd, history_dfd;
        var host, source, editor;
        var saveCode = "True";
        var sfilemap = {
            java: "",
            cpp: "test.cpp",
            c: "test.c",
            python3: "test.py",
            python2: "test.py",
        };
        source = this.editor.getValue();
        xhr = new XMLHttpRequest();
        var result;
        host = this.JOBE_SERVER + this.resource;
        var odiv = this.output;
        var pdiv = this.outDiv;
        $(this.runButton).attr("disabled", "disabled");
        $(this.outDiv).show({ duration: 700, queue: false });
        $(this.errDiv).remove();
        $(this.output).css("visibility", "visible");
        xhr.open("POST", host, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("X-API-KEY", this.API_KEY);
        xhr.onload = function () {
            var logresult;
            $(this.runButton).removeAttr("disabled");
            try {
                result = JSON.parse(xhr.responseText);
            } catch (e) {
                result = {};
                result.outcome = -1;
            }
            if (result.outcome === 15) {
                logresult = "success";
            } else {
                logresult = result.outcome;
            }
            this.logRunEvent({
                div_id: this.divid,
                code: source,
                errinfo: logresult,
                to_save: saveCode,
                lang: this.language,
                event: "livecode",
                partner: this.partner,
            });
            switch (result.outcome) {
                case 15:
                    let parsedOutput = new JUnitTestParser(
                        result.stdout,
                        this.divid
                    );
                    $(odiv).html(parsedOutput.stdout);
                    let rdiv = document.getElementById(
                        `${this.divid}_unit_results`
                    );
                    if (rdiv) {
                        rdiv.remove();
                    }
                    if (parsedOutput.table) {
                        pdiv.appendChild(parsedOutput.table);
                    }
                    rdiv = document.getElementById(
                        `${this.divid}_unit_results`
                    );
                    if (rdiv) {
                        rdiv.appendChild(parsedOutput.pctString);
                    }
                    if (this.suffix) {
                        if (parsedOutput.pct === undefined) {
                            parsedOutput.pct = parsedOutput.passed = parsedOutput.failed = 0;
                        }
                        this.logBookEvent({
                            event: "unittest",
                            act: `percent:${parsedOutput.pct}:passed:${parsedOutput.passed}:failed:${parsedOutput.failed}`,
                            div_id: this.divid,
                        });
                    }
                    break;
                case 11: // compiler error
                    $(odiv).html($.i18n("msg_activecode_were_compiling_err"));
                    this.addJobeErrorMessage(result.cmpinfo);
                    break;
                case 12: // run time error
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    if (result.stderr) {
                        this.addJobeErrorMessage(result.stderr);
                    }
                    break;
                case 13: // time limit
                    $(odiv).html(result.stdout.replace(/\n/g, "<br>"));
                    this.addJobeErrorMessage(
                        $.i18n("msg_activecode_time_limit_exc")
                    );
                    break;
                default:
                    if (result.stderr) {
                        $(odiv).html(result.stderr.replace(/\n/g, "<br>"));
                    } else {
                        this.addJobeErrorMessage(
                            $.i18n(
                                "msg_activecode_server_err",
                                xhr.status,
                                xhr.statusText
                            )
                        );
                    }
            }
            // todo: handle server busy and timeout errors too
        }.bind(this);
        ///$("#" + divid + "_errinfo").remove();
        xhr.onerror = function () {
            this.addJobeErrorMessage($.i18n("msg_activecode_server_comm_err"));
            $(this.runButton).removeAttr("disabled");
        }.bind(this);
        xhr.send(data);
    }
    addJobeErrorMessage(err) {
        var errHead = $("<h3>").html("Error");
        var eContainer = this.outerDiv.appendChild(
            document.createElement("div")
        );
        this.errDiv = eContainer;
        eContainer.className = "error alert alert-danger";
        eContainer.id = this.divid + "_errinfo";
        eContainer.appendChild(errHead[0]);
        var errText = eContainer.appendChild(document.createElement("pre"));
        errText.innerHTML = err;
    }
    /**
     * Checks to see if file is on server
     * Places it on server if it is not on server
     * @param  {object{name, contents}} file    File to place on server
     * @param  {function} resolve promise resolve function
     * @param  {function} reject  promise reject function
     */
    checkFile(file, resolve, reject) {
        var file_id = this.div2id[file.name];
        var resource = this.jobeCheckFiles + file_id;
        var host = this.JOBE_SERVER + resource;
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", host, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accept", "text/plain");
        xhr.setRequestHeader("X-API-KEY", this.API_KEY);
        xhr.onerror = function () {
            // console.log("error sending file" + xhr.responseText);
        };
        xhr.onload = function () {
            switch (xhr.status) {
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
        }.bind(this);
        xhr.send();
    }
    /**
     * Places a file on a server
     */
    pushDataFile(file, resolve, reject) {
        var fileName = file.name;
        var extension = fileName.substring(fileName.indexOf(".") + 1);
        var file_id = this.div2id[fileName];
        var contents = file.content;
        // File types being uploaded that come in already in base64 format
        var extensions = ["jar", "zip", "png", "jpg", "jpeg"];
        var contentsb64;
        if (extensions.indexOf(extension) === -1) {
            contentsb64 = btoa(contents);
        } else {
            contentsb64 = contents;
        }
        var data = JSON.stringify({ file_contents: contentsb64 });
        var resource = this.jobePutFiles + file_id;
        var host = this.JOBE_SERVER + resource;
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", host, true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("Accept", "text/plain");
        xhr.setRequestHeader("X-API-KEY", this.API_KEY);
        xhr.onload = function () {
            switch (xhr.status) {
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
        }.bind(this);
        xhr.onerror = function () {
            // console.log("error sending file" + xhr.responseText);
            reject();
        };
        xhr.send(data);
    }

    showCodelens() {
        let clMess = "";
        if (this.codelens.style.display == "none") {
            this.codelens.style.display = "block";
            clMess = "Building your visualization";
            this.codelens.innerHTML = clMess;
            this.clButton.innerText = $.i18n("msg_activecode_hide_codelens");
        } else {
            this.codelens.style.display = "none";
            this.clButton.innerText = $.i18n("msg_activecode_show_in_codelens");
            return;
        }
        var cl = this.codelens.firstChild;
        if (cl) {
            this.codelens.removeChild(cl);
            this.codelens.innerHTML = clMess;
        }
        var code = this.buildProg(false);
        if (code.match(/System.exit/)) {
            alert(
                "Sorry... System.exit breaks the visualizer temporarily removing"
            );
            code = code.replace(/System.exit\(\d+\);/, "");
        }
        var myVars = {};
        myVars.code = code;
        myVars.lang = this.language;
        if (this.stdin) {
            myVars.stdin = $(this.stdin_el).val();
        }
        var targetDiv = this.codelens.id;

        $.getJSON("/runestone/proxy/pytutor_trace", myVars, function (data) {
            let vis = addVisualizerToPage(data, targetDiv, {
                startingInstruction: 0,
                editCodeBaseURL: null,
                hideCode: false,
                lang: myVars.lang,
            });
        }).fail(function (jqxhr, textStatus, error) {
            let targetDivError = document.getElementById(targetDiv);
            targetDivError.innerHTML =
                "Sorry, an error occurred while creating your visualization.";
            console.log("Get Trace Failed -- ");
            console.log(error);
        });
        this.logBookEvent({
            event: "codelens",
            act: "view",
            div_id: this.divid,
        });
    }

    /**
     * Seperates text into multiple .java files
     * @param  {String} text String with muliple java classes needed to be seperated
     * @return {array of objects}  .name gives the name of the java file with .java extension
     *                   .content gives the contents of the file
     */
    parseJavaClasses(text) {
        text = text.trim();
        var found = false;
        var stack = 0;
        var startIndex = 0;
        var classes = [];
        var importIndex = 0;
        var endOfLastCommentBeforeClassBegins = 0;
        for (var i = 0; i < text.length; i++) {
            var char = text.charAt(i);
            if (char === "/") {
                i++;
                if (text.charAt(i) === "/") {
                    i++;
                    while (text.charAt(i) !== "\n" && i < text.length) {
                        i++;
                    }
                    if (!found) {
                        endOfLastCommentBeforeClassBegins = i;
                    }
                } else if (text.charAt(i) == "*") {
                    i++;
                    while (
                        (text.charAt(i) !== "*" ||
                            text.charAt(i + 1) !== "/") &&
                        i + 1 < text.length
                    ) {
                        i++;
                    }
                    if (!found) {
                        endOfLastCommentBeforeClassBegins = i;
                    }
                }
            } else if (char === '"') {
                i++;
                while (text.charAt(i) !== '"' && i < text.length) {
                    i++;
                }
            } else if (char === "'") {
                while (text.charAt(i) !== "'" && i < text.length) {
                    i++;
                }
            } else if (char === "(") {
                var pCount = 1;
                i++;
                while (pCount > 0 && i < text.length) {
                    if (text.charAt(i) === "(") {
                        pCount++;
                    } else if (text.charAt(i) === ")") {
                        pCount--;
                    }
                    i++;
                }
            }
            if (!found && text.charAt(i) === "{") {
                startIndex = i;
                found = true;
                stack = 1;
            } else if (found) {
                if (text.charAt(i) === "{") {
                    stack++;
                }
                if (text.charAt(i) === "}") {
                    stack--;
                }
            }
            if (found && stack === 0) {
                let endIndex = i + 1;
                var words = text
                    .substring(endOfLastCommentBeforeClassBegins, startIndex)
                    .trim()
                    .split(" ");
                var className = "";
                for (var w = 0; w < words.length; w++) {
                    className = words[w];
                    if (words[w] === "extends" || words[w] === "implements") {
                        className = words[w - 1];
                        w = words.length;
                    }
                }
                className = className.trim() + ".java";
                classes.push({
                    name: className,
                    content: text.substring(importIndex, endIndex),
                });
                found = false;
                importIndex = endIndex;
                endOfLastCommentBeforeClassBegins = endIndex;
            }
        }
        return classes;
    }
}
function unescapeHtml(safe) {
    if (safe) {
        return safe
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#x27;/g, "'");
    }
}

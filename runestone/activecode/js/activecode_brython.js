import { ActiveCode } from "./activecode.js";

export default class BrythonActiveCode extends ActiveCode {
    constructor(opts) {
        super(opts);
        opts.alignVertical = true;
        this.python3_interpreter = $(orig).data("python3_interpreter");
        $(this.runButton).text("Render");
        this.editor.setValue(this.code);
    }

    async runProg() {
        var prog = await this.buildProg(true);
        let saveCode = "True";
        this.saveCode = await this.manage_scrubber(saveCode);
        $(this.output).text("");
        if (!this.alignVertical) {
            $(this.codeDiv).switchClass("col-md-12", "col-md-6", {
                duration: 500,
                queue: false,
            });
        }
        $(this.outDiv).show({ duration: 700, queue: false });
        prog = `
        <html>
        <head>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.9.4/brython.min.js"></script>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/brython@3.9.4/brython_stdlib.min.js"></script>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/styles/default.min.css">
            <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.0.1/highlight.min.js"></script>
            <style>
                pre {
                    position: absolute; font-size: 13px; width: 94%; padding: 9.5px; line-height: 1.42857143; border: 1px ; border-radius: 4px;
                }
                code{
                    border: 1px solid #ccc; border-radius: 4px;
                }
            </style>
        </head>
        <body onload='brython()' >
            <pre id="consolePre">
                <code id="consoleCode"></code>
            </pre>
            <script type='text/python'>
import sys
from browser import document, html
logger = document['consoleCode']
preElem = document['consolePre']
class NewOut:
    def write(self, data):
        logger.innerHTML += str(data)
sys.stderr = sys.stdout = NewOut()
            </script>
            <script type="text/python3">
from browser import document, html
import sys
import traceback
def my_exec(code):
    try:
        exec(code, locals())
        preElem = document['consolePre']
        preElem.style.visibility = "visible"
        preElem.style.bottom = "5px"
        document['consoleCode'].classList.add("plaintext")
    except SyntaxError as err:
        error_class = err.__class__.__name__
        detail = err.args[0]
        line_number = f"at line {err.lineno}"
    except BaseException as err:
        error_class = err.__class__.__name__
        detail = err.args[0]
        cl, exc, tb = sys.exc_info()
        # When errors don't specify a line
        try:
            line_number = f"at line {traceback.extract_tb(tb)[-1][1]}"
        except:
            line_number = ""
    else:
        return
    
    # This is only done if an Exception was catched
    result = f"'{error_class}': {detail} {line_number}"
    print(result)
    logger = document['consoleCode']
    preElem = document['consolePre']
    # Styling the pre element for error
    error_header = document.createElement("h3")
    error_header.innerHTML = "Error"
    error_header.style.font = "24px 'Arial'"
    preElem.prepend(error_header)
    preElem.style.visibility = "visible"
    preElem.style.top = "5px"
    preElem.style.backgroundColor = "#f2dede"
    preElem.style.border = "1px solid #ebccd1"
    logger.classList.add("python")
my_exec("""${prog}
""")
document <= html.SCRIPT("hljs.highlightAll();")
            </script>
        </body>
        </html>
        `;
        this.output.srcdoc = prog;
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
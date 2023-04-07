$.i18n().load({
    en: {
        msd_pyflakes_coach_line: "Line",
    },
});

export default class PyflakesCoach {
    async check(code) {
        let promise = new Promise(function (resolve, reject) {
            fetch('/ns/coach/python_check', {
                method: 'POST',
                body: code
            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.trim() !== '') {
                    let message = "";
                    //clean up returned text
                    let errorLines = data.split("\n");
                    let codeLines = code.split("\n");
                    for(let line of errorLines) {
                        if(line.indexOf(".py:") != -1) {
                            //old pyflakes returns "file:line:col error"
                            //new pyflakes returns "file:line:col: error"
                            //handle either
                            const cleaner = /[^.]*.py:(\d+):(\d+):? (.*)/i;
                            let lineParts = line.match(cleaner);  //[1]: line, [2]: col, [3]: error
                            
                            //for now, filter messages about star imports
                            if(!lineParts[3].includes("defined from star imports") 
                            && !lineParts[3].includes("*' used; unable to detect undefined names"))
                            {
                                message += $.i18n("msd_pyflakes_coach_line") + lineParts[1] + ": " + lineParts[3] + "\n";
                                message += codeLines[lineParts[1] - 1] + "\n";
                                message += " ".repeat(lineParts[2] - 1) + "^\n";
                            }
                        } else {
                            message += line + "\n";
                        }
                    }
                    message = message.slice(0,-1);  //remove trailing newline
                    resolve(message);
                }
                resolve(null);
            })
            .catch(err => {
                reject("Error in Pyflakes Coach: " + err);
            })
        });
        return promise;
    }
}


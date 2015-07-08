/**
 * Created by bmiller on 3/19/15.
 */

function RunestoneBase() {

}

RunestoneBase.prototype.logBookEvent = function(info) {
    console.log("logging event " + this.divid);
};

RunestoneBase.prototype.logRunEvent = function(info) {
    console.log("running " + this.divid);
};

var edList = {};

ActiveCode.prototype = new RunestoneBase();

// separate into constructor and init

function ActiveCode(opts) {
    if (opts) {
        this.init(opts);
        }
    }

ActiveCode.prototype.init = function(opts) {
    RunestoneBase.apply( this, arguments );  // call parent constructor
    var _this = this;
    var suffStart = -1;
    var orig = opts.orig
    this.origElem = orig;
    this.divid = orig.id;
    this.code = $(orig).text();
    this.language = $(orig).data('lang');
    this.timelimit = $(orig).data('timelimit');
    this.includes = $(orig).data('include');
    this.runButton = null;
    this.saveButton = null;
    this.loadButton = null;
    this.outerDiv = null;
    this.output = null; // create pre for output
    this.graphics = null; // create div for turtle graphics
    this.codecoach = null;
    this.codelens = null;

    if(this.includes !== undefined) {
        this.includes = this.includes.split(/\s+/);
    }

    suffStart = this.code.indexOf('====');
    if (suffStart > -1) {
        this.suffix = this.code.substring(suffStart+5);
        this.code = this.code.substring(0,suffStart);
    }

    this.createEditor();
    this.createOutput();
    this.createControls();

        }

ActiveCode.prototype.createEditor = function (index) {
    var newdiv = document.createElement('div');
    $(newdiv).addClass("ac_section alert alert-warning");
    var codeDiv = document.createElement("div");
    $(codeDiv).addClass("ac_code_div col-md-12");
    this.codeDiv = codeDiv;
    newdiv.id = this.divid;
    newdiv.lang = this.language;
    this.outerDiv = newdiv;

    $(this.origElem).replaceWith(newdiv);
    newdiv.appendChild(codeDiv);
    var editor = CodeMirror(codeDiv, {value: this.code, lineNumbers: true, mode: newdiv.lang});

    // Make the editor resizable
    $(editor.getWrapperElement()).resizable({
        resize: function() {
            editor.setSize($(this).width(), $(this).height());
            editor.refresh();
        }
    });

    // give the user a visual cue that they have changed but not saved
    editor.on('change', (function () {
        if (editor.acEditEvent == false || editor.acEditEvent === undefined) {
            $(editor.getWrapperElement()).css('border-top', '2px solid #b43232');
            $(editor.getWrapperElement()).css('border-bottom', '2px solid #b43232');
            this.logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': this.divid});
    }
        editor.acEditEvent = true;
        }).bind(this));  // use bind to preserve *this* inside the on handler.

    this.editor = editor;
};

ActiveCode.prototype.createControls = function () {
    var ctrlDiv = document.createElement("div");
    $(ctrlDiv).addClass("ac_actions");

    // Run
    var butt = document.createElement("button");
    $(butt).text("Run");
    $(butt).addClass("btn btn-success");
    ctrlDiv.appendChild(butt);
    this.runButton = butt;
    $(butt).click(this.runProg.bind(this));

    // Save
    butt = document.createElement("button");
    $(butt).addClass("ac_opt btn btn-default");
    $(butt).text("Save");
    $(butt).css("margin-left","10px");
    this.saveButton = butt;
    ctrlDiv.appendChild(butt);

    // Load
    butt = document.createElement("button");
    $(butt).addClass("ac_opt btn btn-default");
    $(butt).text("Load");
    $(butt).css("margin-left","10px");
    this.loadButton = butt;
    ctrlDiv.appendChild(butt);

    // CodeLens
    if ($(this.origElem).data("codelens")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text("Show CodeLens");
        $(butt).css("margin-left", "10px");
        this.clButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodelens.bind(this));
    }
    // CodeCoach
    if ($(this.origElem).data("coach")) {
        butt = document.createElement("button");
        $(butt).addClass("ac_opt btn btn-default");
        $(butt).text("Code Coach");
        $(butt).css("margin-left", "10px");
        this.clButton = butt;
        ctrlDiv.appendChild(butt);
        $(butt).click(this.showCodeCoach.bind(this));
    }

    $(this.outerDiv).prepend(ctrlDiv);

};

ActiveCode.prototype.createOutput = function () {
    // Create a parent div with two elements:  pre for standard output and a div
    // to hold turtle graphics output.  We use a div in case the turtle changes from
    // using a canvas to using some other element like svg in the future.
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output col-md-6");
    this.outDiv = outDiv;
    this.output = document.createElement('pre');

    this.graphics = document.createElement('div');
    $(this.graphics).addClass("ac-canvas");
    // This bit of magic adds an event which waits for a canvas child to be created on our
    // newly created div.  When a canvas child is added we add a new class so that the visible
    // canvas can be styled in CSS.  Which a the moment means just adding a border.
    $(this.graphics).on("DOMNodeInserted", 'canvas', (function(e) {
        $(this.graphics).addClass("visible-ac-canvas")
    }).bind(this));

    outDiv.appendChild(this.output);
    outDiv.appendChild(this.graphics);
    this.outerDiv.appendChild(outDiv);

    clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};

ActiveCode.prototype.saveEditor = function () {

};

ActiveCode.prototype.loadEditor = function () {

};


ActiveCode.prototype.hideCodelens = function (button, div_id) {
    this.codelens.style.display = 'none'
}

ActiveCode.prototype.showCodelens = function (button, div_id) {
    if (this.codelens === null) {
        var lensDiv = document.createElement("div");
        $(lensDiv).addClass("col-md-6");
        $(lensDiv).css("display","none");
        this.codelens = lensDiv;
        this.outerDiv.appendChild(lensDiv);
    }

    if (this.codelens.style.display == 'none') {
        this.codelens.style.display = 'block';
        button.innerText = "Hide Codelens";
    } else {
        this.codelens.style.display = "none";
        button.innerText = "Show in Codelens";
        return;
    }

    var cl = this.codelens.firstChild
    if (cl) {
        div.removeChild(cl)
    }
    var code = this.editor.getValue()
    var myVars = {}
    myVars.code = code
    myVars.origin = "opt-frontend.js"
    myVars.cumulative = false
    myVars.heapPrimitives = false
    myVars.drawParentPointers = false
    myVars.textReferences = false
    myVars.showOnlyOutputs = false
    myVars.rawInputLstJSON = JSON.stringify([])
    myVars.py = 2
    myVars.curInstr = 0
    myVars.codeDivWidth = 350
    myVars.codeDivHeight = 400
    var srcURL = '//pythontutor.com/iframe-embed.html'
    var embedUrlStr = $.param.fragment(srcURL, myVars, 2 /* clobber all */)
    var myIframe = document.createElement('iframe')
    myIframe.setAttribute("id", div_id + '_codelens')
    myIframe.setAttribute("width", "800")
    myIframe.setAttribute("height", "500")
    myIframe.setAttribute("style", "display:block")
    myIframe.style.background = '#fff'
    //myIframe.setAttribute("src",srcURL)
    myIframe.src = embedUrlStr
    this.codelens.appendChild(myIframe)
    this.logBookEvent({
        'event': 'codelens',
        'act': 'view',
        'div_id': this.divid
    });

};

// <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
// </iframe>


ActiveCode.prototype.showCodeCoach = function (div_id) {
    var myIframe;
    var srcURL;
    var cl;
    if (this.codecoach === null) {
        this.codecoach = document.createElement("div");
        this.codecoach.style.display = 'block'
    }

    cl = this.codecoach.firstChild;
    if (cl) {
        this.codecoach.removeChild(cl)
    }

    srcURL = eBookConfig.app + '/admin/diffviewer?divid=' + div_id;
    myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", div_id + '_coach');
    myIframe.setAttribute("width", "800px");
    myIframe.setAttribute("height", "500px");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    myIframe.style.width = "100%"
    myIframe.src = srcURL;
    this.codecoach.appendChild(myIframe);
    logBookEvent({
        'event': 'coach',
        'act': 'view',
        'div_id': this.divid
    });
};


ActiveCode.prototype.toggleEditorVisibility = function () {

};

ActiveCode.prototype.addErrorMessage = function (err) {
    //logRunEvent({'div_id': this.divid, 'code': this.prog, 'errinfo': err.toString()}); // Log the run event
    console.log(err.toString());
};

ActiveCode.prototype.setTimeLimit = function (timer) {
    var timelimit = this.timeLimit;
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
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
};

ActiveCode.prototype.outputfun = function(text) {
    // bnm python 3
        var x = text;
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
    text = x;
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>");
        $(this.output).append(text);
    };

ActiveCode.prototype.buildProg = function() {
    // assemble code from prefix, suffix, and editor for running.
    var pretext;
    var prog = this.editor.getValue();
    if (this.includes !== undefined) {
        // iterate over the includes, in-order prepending to prog
        pretext = "";
        for (var x=0; x < this.includes.length; x++) {
            pretext = pretext + edList[this.includes[x]].editor.getValue();
            }
        prog = pretext + prog
    }

    if(this.suffix) {
        prog = prog + this.suffix;
}

    return prog;
};

ActiveCode.prototype.runProg = function() {
        var prog = this.buildProg()

        $(this.output).text('');


        Sk.configure({output : this.outputfun.bind(this),
              read   : this.builtinRead,
              python3: true,
              imageProxy : 'http://image.runestone.academy:8080/320x'
        });
        this.setTimeLimit();
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = this.graphics;
        $(this.runButton).attr('disabled', 'disabled');
        $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
        $(this.outDiv).show({duration:700,queue:false});
        var myPromise = Sk.misceval.asyncToPromise(function() {

            return Sk.importMainWithBody("<stdin>", false, prog, true);
        });

        myPromise.then((function(mod) { // success
            $(this.runButton).removeAttr('disabled');
            this.logRunEvent({'div_id': this.id, 'code': prog, 'errinfo': 'success'}); // Log the run event
        }).bind(this),
            function(err) {  // fail
            this.addErrorMessage(err)
                });

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
    }

JSActiveCode.prototype.outputfun = function (a) {
    var str = "["
    if (typeof(a) == "object" && a.length) {
        for (var i = 0; i < a.length; i++)
            if (typeof(a[i]) == "object" && a[i].length) {
                str += (i == 0 ? "" : " ") + "["
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
}

JSActiveCode.prototype.runProg = function() {
    var _this = this;
    var prog = this.buildProg();

    var write = function(str) {
        _this.output.innerHTML += _this.outputfun(str);
    };

    var writeln = function(str) {
        if (!str) str="";
        _this.output.innerHTML += _this.outputfun(str)+"<br />";
            };

    $(this.output).text('')
    $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
    $(this.outDiv).show({duration:700,queue:false});

    try {
        eval(prog)
    } catch(e) {
        this.addErrorMessage(e);
    }

};

HTMLActiveCode.prototype = new ActiveCode();

function HTMLActiveCode (opts) {
    if (opts) {
        this.init(opts);
    }
}

HTMLActiveCode.prototype.runProg = function () {
    var prog = this.buildProg();

//    $('#'+myDiv+'_iframe').remove();
//    $('#'+myDiv+'_htmlout').show();
//    $('#'+myDiv+'_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
//        prog.replace(/"/g,"'") + '">' + '</iframe>');
    $(this.output).text('');
    $(this.codeDiv).switchClass("col-md-12","col-md-6",{duration:500,queue:false});
    $(this.outDiv).show({duration:700,queue:false});

    $(this.output).html(prog)
};

HTMLActiveCode.prototype.init = function(opts) {
    ActiveCode.prototype.init.apply(this,arguments)
    this.code = $(this.origElem).html();
    this.editor.setValue(this.code);
        };

HTMLActiveCode.prototype.createOutput = function () {
    // Create a parent div with two elements:  pre for standard output and a div
    // to hold turtle graphics output.  We use a div in case the turtle changes from
    // using a canvas to using some other element like svg in the future.
    console.log("creating html output")
    var outDiv = document.createElement("div");
    $(outDiv).addClass("ac_output col-md-6");
    this.outDiv = outDiv;
    this.output = document.createElement('div');
    $(this.output).css("background-color","white");

    outDiv.appendChild(this.output);
    this.outerDiv.appendChild(outDiv);

    clearDiv = document.createElement("div");
    $(clearDiv).css("clear","both");  // needed to make parent div resize properly
    this.outerDiv.appendChild(clearDiv);

};


$(document).ready(function() {
    $('[data-component=activecode]').each( function(index ) {
        if ($(this).data('lang') === "javascript") {
            edList[this.id] = new JSActiveCode({'orig': this});
        } else if ($(this).data('lang') === 'htmlmixed') {
            edList[this.id] = new HTMLActiveCode({'orig': this});
        } else {   // default is python
            edList[this.id] = new ActiveCode({'orig': this});
}
    });
    });


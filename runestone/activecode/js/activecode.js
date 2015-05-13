var elem; // current audio element playing
var currIndex; // current index
var len; // current length of audio files for tour
var buttonCount; // number of audio tour buttons
var aname; // the audio file name
var ahash; // hash of the audio file name to the lines to highlight
var theDivid; // div id 
var afile; // file name for audio
var playing = false; // flag to say if playing or not
var tourName;

String.prototype.replaceAll = function (target, replacement) {
    return this.split(target).join(replacement);
};

// function to display the audio tours
var createAudioTourHTML = function (divid, code, bnum, audio_text) {

    // Replacing has been done here to make sure special characters in the code are displayed correctly
    code = code.replaceAll("*doubleq*", "\"");
    code = code.replaceAll("*singleq*", "'");
    code = code.replaceAll("*open*", "(");
    code = code.replaceAll("*close*", ")");
    code = code.replaceAll("*nline*", "<br/>");
    var codeArray = code.split("<br/>");

    var audio_hash = new Array();
    var bval = new Array();
    var atype = audio_text.replaceAll("*doubleq*", "\"");
    var audio_type = atype.split("*atype*");
    for (var i = 0; i < audio_type.length - 1; i++) {
        audio_hash[i] = audio_type[i];
        var aword = audio_type[i].split(";");
        bval.push(aword[0]);
    }

    var first = "<pre><div id='" + divid + "_l1'>" + "1.   " + codeArray[0] + "</div>";
    num_lines = codeArray.length;
    for (var i = 1; i < num_lines; i++) {
        if (i < 9) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".   " + codeArray[i] + "</div>";
        }
        else if (i < 99) {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ".  " + codeArray[i] + "</div>";
        }
        else {
            first = first + "<div id='" + divid + "_l" + (i + 1) + "'>" + (i + 1) + ". " + codeArray[i] + "</div>";
        }
    }
    first = first + "</pre>"

    //laying out the HTML content

    var bcount = 0;
    var html_string = "<div class='modal-lightsout'></div><div class='modal-profile'><h3>Take an audio tour!</h3><div class='modal-close-profile'></div><p id='windowcode'></p><p id='" + divid + "_audiocode'></p>";
    html_string += "<p id='status'></p>";
    html_string += "<input type='image' src='../_static/first.png' width='25' id='first_audio' name='first_audio' title='Play first audio in tour' alt='Play first audio in tour' disabled/>" + "<input type='image' src='../_static/prev.png' width='25' id='prev_audio' name='prev_audio' title='Play previous audio in tour' alt='Play previous audio in tour' disabled/>" + "<input type='image' src='../_static/pause.png' width='25' id='pause_audio' name='pause_audio' title='Pause current audio' alt='Pause current audio' disabled/><input type='image' src='../_static/next.png' width ='25' id='next_audio' name='next_audio' title='Play next audio in tour' alt='Play next audio in tour' disabled/><input type='image' src='../_static/last.png' width ='25' id='last_audio' name='last_audio' title='Play last audio in tour' alt='Play last audio in tour' disabled/><br/>";
    for (var i = 0; i < audio_type.length - 1; i++) {
        html_string += "<input type='button' style='margin-right:5px;' class='btn btn-default btn-sm' id='button_audio_" + i + "' name='button_audio_" + i + "' value=" + bval[i] + " />";
        bcount++;
    }
    //html_string += "<p id='hightest'></p><p id='hightest1'></p><br/><br/><p id='test'></p><br/><p id='audi'></p></div>";
    html_string += "</div>";

    $('#cont').html(html_string);
    $('#windowcode').html(first);

    // Position modal box 
    $.fn.center = function () {
        this.css("position", "absolute");
        // y position
        this.css("top", ($(window).scrollTop() + $(navbar).height() + 10 + "px"));
        // show window on the left so that you can see the output from the code still
        this.css("left", ($(window).scrollLeft() + "px"));
        return this;
    }

    $(".modal-profile").center();
    $('.modal-profile').fadeIn("slow");
    //$('.modal-lightsout').css("height", $(document).height());
    $('.modal-lightsout').fadeTo("slow", .5);
    $('.modal-close-profile').show();

    // closes modal box once close link is clicked, or if the lights out divis clicked
    $('.modal-close-profile, .modal-lightsout').click(function () {
        if (playing) {
            elem.pause();
        }
        //log change to db
        logBookEvent({'event': 'Audio', 'change': 'closeWindow', 'div_id': divid});
        $('.modal-profile').fadeOut("slow");
        $('.modal-lightsout').fadeOut("slow");
    });

    // Accommodate buttons for a maximum of five tours 

    $('#' + 'button_audio_0').click(function () {
        tour(divid, audio_hash[0], bcount);
    });
    $('#' + 'button_audio_1').click(function () {
        tour(divid, audio_hash[1], bcount);
    });
    $('#' + 'button_audio_2').click(function () {
        tour(divid, audio_hash[2], bcount);
    });
    $('#' + 'button_audio_3').click(function () {
        tour(divid, audio_hash[3], bcount);
    });
    $('#' + 'button_audio_4').click(function () {
        tour(divid, audio_hash[4], bcount);
    });

    // handle the click to go to the next audio
    $('#first_audio').click(function () {
        firstAudio();
    });

    // handle the click to go to the next audio
    $('#prev_audio').click(function () {
        prevAudio();
    });

    // handle the click to pause or play the audio
    $('#pause_audio').click(function () {
        pauseAndPlayAudio();
    });

    // handle the click to go to the next audio
    $('#next_audio').click(function () {
        nextAudio();
    });

    // handle the click to go to the next audio
    $('#last_audio').click(function () {
        lastAudio();
    });

    // make the image buttons look disabled
    $("#first_audio").css('opacity', 0.25);
    $("#prev_audio").css('opacity', 0.25);
    $("#pause_audio").css('opacity', 0.25);
    $("#next_audio").css('opacity', 0.25);
    $("#last_audio").css('opacity', 0.25);

};

var tour = function (divid, audio_type, bcount) {
    // set globals
    buttonCount = bcount;
    theDivid = divid;

    // enable prev, pause/play and next buttons and make visible
    $('#first_audio').removeAttr('disabled');
    $('#prev_audio').removeAttr('disabled');
    $('#pause_audio').removeAttr('disabled');
    $('#next_audio').removeAttr('disabled');
    $('#last_audio').removeAttr('disabled');
    $("#first_audio").css('opacity', 1.0);
    $("#prev_audio").css('opacity', 1.0);
    $("#pause_audio").css('opacity', 1.0);
    $("#next_audio").css('opacity', 1.0);
    $("#last_audio").css('opacity', 1.0);

    // disable tour buttons
    for (var i = 0; i < bcount; i++)
        $('#button_audio_' + i).attr('disabled', 'disabled');

    var atype = audio_type.split(";");
    var name = atype[0].replaceAll("\"", " ");
    tourName = name;
    $('#status').html("Starting the " + name);

    //log tour type to db
    logBookEvent({'event': 'Audio', 'tour type': name, 'div_id': divid});

    var max = atype.length;
    var str = "";
    ahash = new Array();
    aname = new Array();
    for (i = 1; i < max - 1; i++) {
        var temp = atype[i].split(":");
        var temp_line = temp[0];
        var temp_aname = temp[1];

        var akey = temp_aname.substring(1, temp_aname.length);
        var lnums = temp_line.substring(1, temp_line.length);

        //alert("akey:"+akey+"lnum:"+lnums);

        // str+="<audio id="+akey+" preload='auto'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+
        // akey+".mp3' type='audio/mpeg'><source src='http://ice-web.cc.gatech.edu/ce21/audio/"+akey+
        // ".ogg' type='audio/ogg'>Your browser does not support the audio tag</audio>";
        str += "<audio id=" + akey + " preload='auto' ><source src='../_static/audio/" + akey +
            ".wav' type='audio/wav'><source src='../_static/audio/" +
            akey + ".mp3' type='audio/mpeg'><br />Your browser does not support the audio tag</audio>";
        ahash[akey] = lnums;
        aname.push(akey);
    }
    var ahtml = "#" + divid + "_audiocode";
    $(ahtml).html(str); // set the html to the audio tags
    len = aname.length; // set the number of audio file in the tour

    // start at the first audio
    currIndex = 0;

    // play the first audio in the tour
    playCurrIndexAudio();
};

function handlePlaying() {

    // if playing audio pause it 
    if (playing) {

        elem.pause();

        // unbind current ended
        $('#' + afile).unbind('ended');

        // unhighlight the prev lines
        unhighlightLines(theDivid, ahash[aname[currIndex]]);
    }

}

var firstAudio = function () {

    // if audio is playing handle it
    handlePlaying();

    //log change to db
    logBookEvent({'event': 'Audio', 'change': 'first', 'div_id': theDivid});


    // move to the first audio
    currIndex = 0;

    // start at the first audio
    playCurrIndexAudio();

};

var prevAudio = function () {

    // if there is a previous audio
    if (currIndex > 0) {

        // if audio is playing handle it
        handlePlaying();

        //log change to db
        logBookEvent({'event': 'Audio', 'change': 'prev', 'div_id': theDivid});


        // move to previous to the current (but the current index has moved to the next)
        currIndex = currIndex - 1;

        // start at the prev audio
        playCurrIndexAudio();
    }

};

var nextAudio = function () {

    // if audio is playing handle it
    handlePlaying();

    //log change to db
    logBookEvent({'event': 'Audio', 'change': 'next', 'div_id': theDivid});

    // if not at the end
    if (currIndex < (len - 1)) {
        // start at the next audio
        currIndex = currIndex + 1;
        playCurrIndexAudio();
    }
    else if (currIndex == (len - 1)) {
        handleTourEnd();
    }
};

var lastAudio = function () {

    // if audio is playing handle it
    handlePlaying();

    //log change to db
    logBookEvent({'event': 'Audio', 'change': 'last', 'div_id': theDivid});

    // move to the last audio
    currIndex = len - 1;

    // start at last
    playCurrIndexAudio();

};

// play the audio at the current index
var playCurrIndexAudio = function () {

    // set playing to false
    playing = false;

    // play the current audio and highlight the lines
    playaudio(currIndex, aname, theDivid, ahash);

};

// handle the end of the tour
var handleTourEnd = function () {

    $('#status').html(" The " + tourName + " Ended");

    // disable the prev, pause/play, and next buttons and make them more invisible
    $('#first_audio').attr('disabled', 'disabled');
    $('#prev_audio').attr('disabled', 'disabled');
    $('#pause_audio').attr('disabled', 'disabled');
    $('#next_audio').attr('disabled', 'disabled');
    $('#last_audio').attr('disabled', 'disabled');
    $("#first_audio").css('opacity', 0.25);
    $("#prev_audio").css('opacity', 0.25);
    $("#pause_audio").css('opacity', 0.25);
    $("#next_audio").css('opacity', 0.25);
    $("#last_audio").css('opacity', 0.25);

    // enable the tour buttons
    for (var j = 0; j < buttonCount; j++)
        $('#button_audio_' + j).removeAttr('disabled');
};

// only call this one after the first time
var outerAudio = function () {

    // unbind ended
    $('#' + afile).unbind('ended');

    // set playing to false
    playing = false;

    // unhighlight previous lines from the last audio
    unhighlightLines(theDivid, ahash[aname[currIndex]]);

    // increment the currIndex to point to the next one
    currIndex++;

    // if the end of the tour reset the buttons
    if (currIndex == len) {
        handleTourEnd();
    }

    // else not done yet so play the next audio
    else {

        // play the audio at the current index
        playCurrIndexAudio();
    }
};

// play the audio now that it is ready
var playWhenReady = function (afile, divid, ahash) {
    // unbind current
    $('#' + afile).unbind('canplaythrough');
    //console.log("in playWhenReady " + elem.duration);

    $('#status').html("Playing the " + tourName);
    elem.currentTime = 0;
    highlightLines(divid, ahash[afile]);
    $('#' + afile).bind('ended', function () {
        outerAudio();
    });
    playing = true;
    elem.play();

};


// play the audio at the specified index i and set the duration and highlight the lines
var playaudio = function (i, aname, divid, ahash) {
    afile = aname[i];
    elem = document.getElementById(afile);

    // if this isn't ready to play yet - no duration yet then wait
    //console.log("in playaudio " + elem.duration);
    if (isNaN(elem.duration) || elem.duration == 0) {
        // set the status
        $('#status').html("Loading audio.  Please wait.");
        $('#' + afile).bind('canplaythrough', function () {
            playWhenReady(afile, divid, ahash);
        });
    }
    // otherwise it is ready so play it
    else {
        playWhenReady(afile, divid, ahash);
    }
};

// pause if playing and play if paused
var pauseAndPlayAudio = function () {
    var btn = document.getElementById('pause_audio');

    // if paused and clicked then continue from current
    if (elem.paused) {
        // calcualte the time left to play in milliseconds
        counter = (elem.duration - elem.currentTime) * 1000;
        elem.play(); // start the audio from current spot
        document.getElementById("pause_audio").src = "../_static/pause.png";
        document.getElementById("pause_audio").title = "Pause current audio";
        //log change to db
        logBookEvent({'event': 'Audio', 'change': 'play', 'div_id': theDivid});
    }

    // if audio was playing pause it
    else if (playing) {
        elem.pause(); // pause the audio
        document.getElementById("pause_audio").src = "../_static/play.png";
        document.getElementById("pause_audio").title = "Play paused audio";
        //log change to db
        logBookEvent({'event': 'Audio', 'change': 'pause', 'div_id': theDivid});
    }

};

// process the lines
var processLines = function (divid, lnum, color) {
    var comma = lnum.split(",");

    if (comma.length > 1) {
        for (i = 0; i < comma.length; i++) {
            setBackroundForLines(divid, comma[i], color);
        }
    }
    else {
        setBackroundForLines(divid, lnum, color);
    }
};

// unhighlight the lines - set the background back to transparent
var unhighlightLines = function (divid, lnum) {
    processLines(divid, lnum, 'transparent');
};

// highlight the lines - set the background to a yellow color
var highlightLines = function (divid, lnum) {
    processLines(divid, lnum, '#ffff99');
};

// set the background to the passed color
var setBackroundForLines = function (divid, lnum, color) {
    var hyphen = lnum.split("-");

    // if a range of lines
    if (hyphen.length > 1) {
        var start = parseInt(hyphen[0]);
        var end = parseInt(hyphen[1]) + 1;
        for (var k = start; k < end; k++) {
            //alert(k);
            var str = "#" + divid + "_l" + k;
            if ($(str).text() != "") {
                $(str).css('background-color', color);
            }
            //$(str).effect("highlight",{},(dur*1000)+4500);
        }
    }
    else {
        //alert(lnum);
        var str = "#" + divid + "_l" + lnum;
        $(str).css('background-color', color);
        //$(str).effect("highlight",{},(dur*1000)+4500);
    }
};


function showChange(ed, b) {
    if (ed.acEditEvent == false || ed.acEditEvent === undefined) {
        $('#' + ed.parentDiv + ' .CodeMirror').css('border-top', '2px solid #b43232');
        $('#' + ed.parentDiv + ' .CodeMirror').css('border-bottom', '2px solid #b43232');
    }
    ed.acEditEvent = true;
}

cm_editors = {};

function pyStr(x) {
    if (x instanceof Array) {
        return '[' + x.join(", ") + ']';
    } else {
        return x
    }
}

function outf(text) {
    var mypre = document.getElementById(Sk.pre);
    // bnm python 3
    x = text;
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
    mypre.innerHTML = mypre.innerHTML + text;
}


JSoutput = function (a) {

    var str = "["

    if (typeof(a) == "object" && a.length) {

        for (var i = 0; i < a.length; i++)

            if (typeof(a[i]) == "object" && a[i].length) {

                str += (i == 0 ? "" : " ") + "["

                for (var j = 0; j < a[i].length; j++)

                    str += a[i][j] + (j == a[i].length - 1 ?

                        "]" + (i == a.length - 1 ? "]" : ",") + "\n" : ", ");

            } else {
                str += a[i] + (i == a.length - 1 ? "]" : ", ");
            }

    } else {
        try {
            str = JSON.stringify(a);
        } catch (e) {
            str = a;
        }
    }
    return str;

}


write = function (str) {

    var outnode = document.getElementById(Sk.pre);

    outnode.innerHTML += JSoutput(str);

}


writeln = function (str) {

    if (!str) {
        str = "";
    }

    var outnode = document.getElementById(Sk.pre);

    outnode.innerHTML += JSoutput(str) + "<br />";

}


var keymap = {
    "Ctrl-Enter": function (editor) {
        runit(editor.parentDiv);
        $("#" + editor.parentDiv).children('.ac_output').show();
    },
    "Tab": "indentMore",
    "Shift-Tab": "indentLess"
}


function createEditors() {
    var edList = new Array();
    edList = document.getElementsByClassName("active_code");
    for (var i = 0; i < edList.length; i++) {
        newEdId = edList[i].id;
        var includes = edList[i].getAttribute('prefixcode');
        var lang = edList[i].getAttribute('lang') || "python";
        var first_line = 1;
        if (includes !== "undefined") {
            includes = eval(includes)
            for (var j in includes) {
                var edinclude = document.getElementById(includes[j] + '_code')
                first_line = first_line + edinclude.textContent.match(/\n/g).length + 1;
            }
        } else {
            first_line = 1;
        }
        var theMode = {name: 'python', version: 2, singleLineStringErrors: false};
        if (lang == 'html') {
            theMode = {name: 'htmlmixed'};
        } else if (lang == 'java') {
            theMode = {name: 'text/x-java'};
        }
        cm_editors[newEdId] = CodeMirror.fromTextArea(edList[i], {
                mode: theMode,
                lineNumbers: true,
                firstLineNumber: first_line,
                indentUnit: 4,
                indentWithTabs: false,
                matchBrackets: true,
                autoMatchParens: true,
                extraKeys: keymap
            }
        );
        cm_editors[newEdId].on('change', showChange);
        cm_editors[newEdId].parentDiv = edList[i].parentNode.parentNode.id;
        //requestCode(edList[i].parentNode.id) // populate with user's code
    }

    // allow ActiveCode editors to be dynamically resized by user
    $('.CodeMirror').each(function (_, cmNode) {
        $(cmNode).resizable({
            resize: function () {
                cmNode.CodeMirror.setSize($(this).width(), $(this).height());
                cmNode.CodeMirror.refresh();
            }
        });
    });
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined) {
        throw "File not found: '" + x + "'";
    }
    return Sk.builtinFiles["files"][x];
}

function createActiveCode(divid, suppliedSource, sid, language) {
    var edNode;
    var acblockid;
    if (sid !== undefined) {
        acblockid = divid + "_" + sid;
    } else {
        acblockid = divid;
    }

    edNode = document.getElementById(acblockid);
    edNode.lang = edNode.lang || 'python'
    if (language !== undefined && language !== "None") {
        edNode.lang = language;
    }
    if (edNode.children.length == 0) {
        //edNode.style.display = 'none';
        edNode.style.backgroundColor = "white";
        var editor;
        editor = CodeMirror(edNode, {
            mode: {
                name: "python",
                version: 2,
                singleLineStringErrors: false
            },
            lineNumbers: true,
            indentUnit: 4,
            tabMode: "indent",
            matchBrackets: true,
            autoMatchParens: true,
            extraKeys: keymap
        });

        editor.setSize(null, 250);


        var myRun = function () {
            runit(acblockid);
        };
        var mySave = function () {
            saveEditor(divid);
        };
        var myLoad = function () {
            requestCode(divid, sid);
        };
        cm_editors[acblockid + "_code"] = editor;
        editor.parentDiv = acblockid;
        var runButton = document.createElement("button");
        runButton.appendChild(document.createTextNode('Run'));
        runButton.className = runButton.className + ' btn btn-success';
        runButton.onclick = myRun;
        edNode.appendChild(runButton);
        edNode.appendChild(document.createElement('br'));
        if (sid === undefined) { // We don't need load and save buttons for grading
            if (isLoggedIn() == true) {
                var saveButton = document.createElement("input");
                saveButton.setAttribute('type', 'button');
                saveButton.setAttribute('value', 'Save');
                saveButton.className = saveButton.className + ' btn btn-default';
                saveButton.onclick = mySave;
                edNode.appendChild(saveButton);

                var loadButton = document.createElement("input");
                loadButton.setAttribute('type', 'button');
                loadButton.setAttribute('value', 'Load');
                loadButton.className = loadButton.className + ' btn btn-default';
                loadButton.onclick = myLoad;
                edNode.appendChild(loadButton);
            } else {
                var saveButton = document.createElement("input");
                saveButton.setAttribute('type', 'button');
                saveButton.setAttribute('value', 'Save');
                saveButton.className = saveButton.className + ' btn btn-default disabled';
                saveButton.setAttribute('data-toggle', 'tooltip');
                saveButton.setAttribute('title', 'Register or log in to save your code');
                edNode.appendChild(saveButton);
                $jqTheme(saveButton).tooltip({
                    'selector': '',
                    'placement': 'bottom'
                });

                var loadButton = document.createElement("input");
                loadButton.setAttribute('type', 'button');
                loadButton.setAttribute('value', 'Load');
                loadButton.className = loadButton.className + ' btn btn-default disabled';
                loadButton.setAttribute('data-toggle', 'tooltip');
                loadButton.setAttribute('title', 'Register or log in to load your saved code');
                edNode.appendChild(loadButton);
                $jqTheme(loadButton).tooltip({
                    'selector': '',
                    'placement': 'bottom'
                });
            }
        }
        edNode.appendChild(document.createElement('br'));
        var newCanvas = edNode.appendChild(document.createElement("div"));
        newCanvas.id = acblockid + "_canvas";
        newCanvas.height = 400;
        newCanvas.width = 400;
        newCanvas.style.border = '2px solid black';
        newCanvas.style.display = 'block';
        var newPre = edNode.appendChild(document.createElement("pre"));
        newPre.id = acblockid + "_pre";
        newPre.className = "active_out";

        myLoad();
        if (!suppliedSource) {
            suppliedSource = '\n\n\n\n\n';
        }
        if (!editor.getValue()) {
            suppliedSource = suppliedSource.replace(new RegExp('%22', 'g'), '"');
            suppliedSource = suppliedSource.replace(new RegExp('%27', 'g'), "'");
            editor.setValue(suppliedSource);
        }
        editor.refresh()
    }
}

function runit(myDiv, theButton, includes, suffix) {
    //var prog = document.getElementById(myDiv + "_code").value;

    Sk.divid = myDiv;
    $(theButton).attr('disabled', 'disabled');
    Sk.isTurtleProgram = false;
    if (theButton !== undefined) {
        Sk.runButton = theButton;
    }
    $("#" + myDiv + "_errinfo").remove();
    $("#" + myDiv + "_coach_div").hide();

    var editor = cm_editors[myDiv + "_code"];
    if (editor.acEditEvent) {
        logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': myDiv}); // Log the edit event
        editor.acEditEvent = false;
    }
    var prog = "";
    var text = "";
    if (includes !== undefined) {
        // iterate over the includes, in-order prepending to prog
        for (var x in includes) {
            text = cm_editors[includes[x] + "_code"].getValue();
            prog = prog + text + "\n"
        }
    }
    prog = prog + editor.getValue();

    var suffix;
    suffix = $('#' + myDiv + '_suffix').text() || '';

    prog = prog + '\n' + suffix;

    var mypre = document.getElementById(myDiv + "_pre");
    if (mypre) {
        mypre.innerHTML = '';
    }
    Sk.canvas = myDiv + "_canvas";
    Sk.pre = myDiv + "_pre";
    var can = document.getElementById(Sk.canvas);
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = Sk.canvas;

    // The following lines reset the canvas so that each time the run button
    // is pressed the turtle(s) get a clean canvas.
    if (can) {
        can.width = can.width;
        if (Sk.tg) {
            Sk.tg.canvasInit = false;
            Sk.tg.turtleList = [];
        }
    }
    var timelimit = $("#" + myDiv).attr("time")
    // set execLimit in milliseconds  -- for student projects set this to
    // 25 seconds -- just less than Chrome's own timer.
    if (prog.indexOf('ontimer') > -1 ||
        prog.indexOf('onclick') > -1 ||
        prog.indexOf('onkey') > -1 ||
        prog.indexOf('setDelay') > -1) {
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
    // configure Skulpt output function, and module reader
    Sk.configure({
        output: outf,
        read: builtinRead,
        python3: true,
        imageProxy: 'http://image.runestone.academy:8080/320x'
    });
    var lang = document.getElementById(myDiv).lang;
    try {
        if (lang === 'python') {
            var myPromise = Sk.misceval.asyncToPromise(function () {
                return Sk.importMainWithBody("<stdin>", false, prog, true);
            });
            myPromise.then(function (mod) {
            }, function (err) {
                logRunEvent({'div_id': myDiv, 'code': prog, 'errinfo': err.toString()}); // Log the run event
                addErrorMessage(err, myDiv)
            });
        } else if (lang === 'javascript') {
            eval(prog);
        } else {
            // html
            $('#' + myDiv + '_iframe').remove();
            $('#' + myDiv + '_htmlout').show();
            $('#' + myDiv + '_htmlout').append('<iframe class="activehtml" id="' + myDiv + '_iframe" srcdoc="' +
                prog.replace(/"/g, "'") + '">' + '</iframe>');
        }
        logRunEvent({'div_id': myDiv, 'code': prog, 'errinfo': 'success'}); // Log the run event
    } catch (e) {
        logRunEvent({'div_id': myDiv, 'code': prog, 'errinfo': e.toString()}); // Log the run event
        //alert(e);
        addErrorMessage(e, myDiv)
    }
    if (!Sk.isTurtleProgram) {
        $(theButton).removeAttr('disabled');
    }
    if (typeof(allVisualizers) != "undefined") {
        $.each(allVisualizers, function (i, e) {
            e.redrawConnectors();
        });
    }
}

function addErrorMessage(err, myDiv) {
    var errHead = $('<h3>').html('Error')
    var divEl = document.getElementById(myDiv)
    var eContainer = divEl.appendChild(document.createElement('div'))
    eContainer.className = 'error alert alert-danger';
    eContainer.id = myDiv + '_errinfo';
    eContainer.appendChild(errHead[0]);
    var errText = eContainer.appendChild(document.createElement('pre'))
    var errString = err.toString()
    var to = errString.indexOf(":")
    var errName = errString.substring(0, to);
    errText.innerHTML = errString;
    $(eContainer).append('<h3>Description</h3>');
    var errDesc = eContainer.appendChild(document.createElement('p'));
    errDesc.innerHTML = errorText[errName];
    $(eContainer).append('<h3>To Fix</h3>');
    var errFix = eContainer.appendChild(document.createElement('p'));
    errFix.innerHTML = errorText[errName + 'Fix'];
    var moreInfo = '../ErrorHelp/' + errName.toLowerCase() + '.html';
}

var errorText = {};

errorText.ParseError = "A parse error means that Python does not understand the syntax on the line the error message points out.  Common examples are forgetting commas beteween arguments or forgetting a : on a for statement";
errorText.ParseErrorFix = "To fix a parse error you just need to look carefully at the line with the error and possibly the line before it.  Make sure it conforms to all of Python's rules.";
errorText.TypeError = "Type errors most often occur when an expression tries to combine two objects with types that should not be combined.  Like raising a string to a power";
errorText.TypeErrorFix = "To fix a type error you will most likely need to trace through your code and make sure the variables have the types you expect them to have.  It may be helpful to print out each variable along the way to be sure its value is what you think it should be.";
errorText.NameError = "A name error almost always means that you have used a variable before it has a value.  Often this may be a simple typo, so check the spelling carefully.";
errorText.NameErrorFix = "Check the right hand side of assignment statements and your function calls, this is the most likely place for a NameError to be found.";
errorText.ValueError = "A ValueError most often occurs when you pass a parameter to a function and the function is expecting one type and you pass another.";
errorText.ValueErrorFix = "The error message gives you a pretty good hint about the name of the function as well as the value that is incorrect.  Look at the error message closely and then trace back to the variable containing the problematic value.";
errorText.AttributeError = "This error message is telling you that the object on the left hand side of the dot, does not have the attribute or method on the right hand side.";
errorText.AttributeErrorFix = "The most common variant of this message is that the object undefined does not have attribute X.  This tells you that the object on the left hand side of the dot is not what you think. Trace the variable back and print it out in various places until you discover where it becomes undefined.  Otherwise check the attribute on the right hand side of the dot for a typo.";
errorText.TokenError = "Most of the time this error indicates that you have forgotten a right parenthesis or have forgotten to close a pair of quotes.";
errorText.TokenErrorFix = "Check each line of your program and make sure that your parenthesis are balanced.";
errorText.TimeLimitError = "Your program is running too long.  Most programs in this book should run in less than 10 seconds easily. This probably indicates your program is in an infinite loop.";
errorText.TimeLimitErrorFix = "Add some print statements to figure out if your program is in an infinte loop.  If it is not you can increase the run time with sys.setExecutionLimit(msecs)";
errorText.Error = "Your program is running for too long.  Most programs in this book should run in less than 30 seconds easily. This probably indicates your program is in an infinite loop.";
errorText.ErrorFix = "Add some print statements to figure out if your program is in an infinte loop.  If it is not you can increase the run time with sys.setExecutionLimit(msecs)";
errorText.SyntaxError = "This message indicates that Python can't figure out the syntax of a particular statement.  Some examples are assigning to a literal, or a function call";
errorText.SyntaxErrorFix = "Check your assignment statments and make sure that the left hand side of the assignment is a variable, not a literal or a function.";
errorText.IndexError = "This message means that you are trying to index past the end of a string or a list.  For example if your list has 3 things in it and you try to access the item at position 3 or more.";
errorText.IndexErrorFix = "Remember that the first item in a list or string is at index position 0, quite often this message comes about because you are off by one.  Remember in a list of length 3 the last legal index is 2";
errorText.URIError = "";
errorText.URIErrorFix = "";
errorText.ImportError = "This error message indicates that you are trying to import a module that does not exist";
errorText.ImportErrorFix = "One problem may simply be that you have a typo.  It may also be that you are trying to import a module that exists in 'real' Python, but does not exist in this book.  If this is the case, please submit a feature request to have the module added.";
errorText.ReferenceError = "This is most likely an internal error, particularly if the message references the console.";
errorText.ReferenceErrorFix = "Try refreshing the webpage, and if the error continues, submit a bug report along with your code";
errorText.ZeroDivisionError = "This tells you that you are trying to divide by 0. Typically this is because the value of the variable in the denominator of a division expression has the value 0";
errorText.ZeroDivisionErrorFix = "You may need to protect against dividing by 0 with an if statment, or you may need to rexamine your assumptions about the legal values of variables, it could be an earlier statment that is unexpectedly assigning a value of zero to the variable in question.";
errorText.RangeError = "This message almost always shows up in the form of Maximum call stack size exceeded.";
errorText.RangeErrorFix = "This always occurs when a function calls itself.  Its pretty likely that you are not doing this on purpose. Except in the chapter on recursion.  If you are in that chapter then its likely you haven't identified a good base case.";
errorText.InternalError = "An Internal error may mean that you've triggered a bug in our Python";
errorText.InternalErrorFix = "Report this error, along with your code as a bug.";
errorText.IndentationError = "This error occurs when you have not indented your code properly.  This is most likely to happen as part of an if, for, while or def statement.";
errorText.IndentationErrorFix = "Check your if, def, for, and while statements to be sure the lines are properly indented beneath them.  Another source of this error comes from copying and pasting code where you have accidentally left some bits of code lying around that don't belong there anymore.";
errorText.NotImplementedError = "This error occurs when you try to use a builtin function of Python that has not been implemented in this in-browser version of Python.";
errorText.NotImplementedErrorFix = "For now the only way to fix this is to not use the function.  There may be workarounds.  If you really need this builtin function then file a bug report and tell us how you are trying to use the function.";


function saveSuccess(data, status, whatever) {
    if (data.redirect) {
        alert("Did not save!  It appears you are not logged in properly")
    } else if (data == "") {
        alert("Error:  Program not saved");
    }
    else {
        var acid = eval(data)[0];
        if (acid.indexOf("ERROR:") == 0) {
            alert(acid);
        } else {
            // use a tooltip to provide some success feedback
            var save_btn = $("#" + acid + "_saveb");
            save_btn.attr('title', 'Saved your code.');
            opts = {
                'trigger': 'manual',
                'placement': 'bottom',
                'delay': {show: 100, hide: 500}
            };
            save_btn.tooltip(opts);
            save_btn.tooltip('show');
            setTimeout(function () {
                save_btn.tooltip('destroy')
            }, 4000);

            $('#' + acid + ' .CodeMirror').css('border-top', '2px solid #aaa');
            $('#' + acid + ' .CodeMirror').css('border-bottom', '2px solid #aaa');
        }
    }
}

function saveEditor(divName) {
    // get editor from div name
    var editor = cm_editors[divName + "_code"];
    var data = {acid: divName, code: editor.getValue()};
    data.lang = $('#' + divName).attr('lang');
    $(document).ajaxError(function (e, jqhxr, settings, exception) {
        alert("Request Failed for" + settings.url)
    });
    jQuery.post(eBookConfig.ajaxURL + 'saveprog', data, saveSuccess);
    if (editor.acEditEvent) {
        logBookEvent({'event': 'activecode', 'act': 'edit', 'div_id': divName}); // Log the run event
        editor.acEditEvent = false;
    }
    logBookEvent({'event': 'activecode', 'act': 'save', 'div_id': divName}); // Log the run event

}

function requestCode(divName, sid) {
    var editor = cm_editors[divName + "_code"];

    var data = {acid: divName};
    if (sid !== undefined) {
        data['sid'] = sid;
    }
    logBookEvent({'event': 'activecode', 'act': 'load', 'div_id': divName}); // Log the run event
    jQuery.get(eBookConfig.ajaxURL + 'getprog', data, loadEditor);
}

function loadEditor(data, status, whatever) {
    // function called when contents of database are returned successfully
    var res = eval(data)[0];
    var editor;
    if (res.sid) {
        editor = cm_editors[res.acid + "_" + res.sid + "_code"];
    } else {
        editor = cm_editors[res.acid + "_code"];
    }

    var loadbtn = $("#" + res.acid + "_loadb");
    if (res.source) {
        editor.setValue(res.source);
        loadbtn.tooltip({
            'placement': 'bottom',
            'title': "Loaded your saved code.",
            'trigger': 'manual'
        });
    } else {
        loadbtn.tooltip({
            'placement': 'bottom',
            'title': "No saved code.",
            'trigger': 'manual'
        });
    }
    loadbtn.tooltip('show');
    setTimeout(function () {
        loadbtn.tooltip('destroy')
    }, 4000);
}

function disableAcOpt() {
    $jqTheme('button.ac_opt').each(function (index, value) {
        value.className = value.className + ' disabled';
        $jqTheme(value).attr('onclick', 'return false;');
        $jqTheme(value).attr('data-toggle', 'tooltip');
        if ($jqTheme(value).text() == 'Save') {
            $jqTheme(value).attr('title', 'Register or log in to save your code');
        } else if ($jqTheme(value).text() == 'Load') {
            $jqTheme(value).attr('title', 'Register or log in to load your saved code');
        } else if ($jqTheme(value).text() == 'Code Coach') {
            $jqTheme(value).attr('title', 'Register or log in to use Code Coach');
        }
        $jqTheme(value).tooltip({
            'selector': '',
            'delay': {show: 100, hide: 50},
            'placement': 'bottom',
            'animation': true
        });
    });
}

/* Listen for changes to/addition of a div containing unittest results
 (which are generated by Skulpt) and add some nice styles to it*/
function styleUnittestResults() {
    $(document).on("DOMNodeInserted", '.unittest-results', function (ev) {
        // select the target node
        var unittest_results_target = ev.target;
        // create an observer instance
        var observer = new MutationObserver(function (mutations) {
            $(mutations).each(function () {
                if (this.type == "attributes") {
                    var target = $(this.target);
                    // apply the .alert classes
                    if (target.text().indexOf("Fail") === -1) {
                        target.removeClass('alert-danger');
                        target.addClass('alert alert-success');
                    } else if (target.text().indexOf('Fail') >= 0) {
                        target.removeClass('alert-success');
                        target.addClass('alert alert-danger');
                    }
                    // add the progress bar indicating the percent of tests passed
                    var paragraph = target.find('p');
                    var result_text = paragraph.text().split(" ");
                    var pct = '';
                    $(result_text).each(function () {
                        if (this.indexOf("%") !== -1) {
                            pct = this;
                            var html = 'You passed:' +
                                '<div class="progress unittest-results-progress">';
                            if (pct == '100.0%') {
                                html += '  <div class="progress-bar progress-bar-success" style="width:' + pct + ';">';
                            } else {
                                html += '  <div class="progress-bar progress-bar-warning" style="width:' + pct + ';">';
                            }
                            html += pct +
                                '  </div>' +
                                '</div>';
                            paragraph.html(html);
                        }
                    });
                }
            });
        });
        // configuration of the observer:
        var config = {
            attributes: true,
            attributeFilter: ['style'],
            childList: true,
            characterData: true,
            subtree: false
        };
        // pass in the target node, as well as the observer options
        observer.observe($(unittest_results_target).get(0), config);
    });
}

function createScratchActivecode() {
    /* set up the scratch Activecode editor in the search menu */

    // use the URL to assign a divid - each page should have a unique Activecode block id.
    // Remove everything from the URL but the course and page name
    var divid = document.URL.split('#')[0];
    divid = divid.substr(divid.lastIndexOf('/')+1);
    divid = eBookConfig.course + divid;
    divid = divid.split('?')[0];  // remove any query string (e.g ?lastPosition)
    divid = divid.replaceAll('/', '').replace('.html', '');
    divid = divid.replaceAll(':','');
    eBookConfig.scratchId = divid;

    // generate the HTML
    var html = '<div id="ac_modal_' + divid + '" class="modal fade">' +
        '  <div class="modal-dialog scratch-ac-modal">' +
        '    <div class="modal-content">' +
        '      <div class="modal-header">' +
        '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '        <h4 class="modal-title">Scratch ActiveCode</h4>' +
        '      </div> ' +
        '      <div class="modal-body">' +
        '        <div id="' + divid + '" lang="python">' +
        '          <div id="' + divid + '_code_div" style="display: block">' +
        '            <textarea cols="50" rows="12" lang="python" id="' + divid + '_code" class="active_code">\n\n\n\n\n</textarea>' +
        '          </div>' +
        '          <p class="ac_caption"><span class="ac_caption_text">Scratch Editor</span> </p>' +

        '          <button class="btn btn-success" id="' + divid + '_runb" onclick="runit(\'' + divid + '\',this, undefined);">Run</button>' +

        '          <div id="cont"></div>' +

        '          <button class="ac_opt btn btn-default" style="display: inline-block" id="' + divid + '_saveb" onclick="saveEditor(\'' + divid + '\');">Save</button>' +
        '          <button class="ac_opt btn btn-default" style="display: inline-block" id="' + divid + '_loadb" onclick="requestCode(\'' + divid + '\');">Load</button>' +

        '          <div style="text-align: center">' +
        '            <div id="' + divid + '_canvas" class="ac-canvas" height="400" width="400" style="border-style: solid; display: block; text-align: center"></canvas>' +
        '          </div>' +
        '          <pre id="' + divid + '_suffix" style="display:none">' +
        '          </pre>' +
        '          <pre id="' + divid + '_pre" class="active_out">' +
        '          </pre>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';
    el = $(html);
    $('body').append(el);

    el.on('shown.bs.modal show.bs.modal', function () {
        el.find('.CodeMirror').each(function (i, e) {
            e.CodeMirror.refresh();
            e.CodeMirror.focus();
        });
    });

    $(document).bind('keypress', '\\', function (evt) {
        toggleScratchActivecode();
        return false;
    });
}

function toggleScratchActivecode() {
//    var divid = "ac_modal_" + document.URL.split('#')[0].split('static')[1].split('?')[0].replaceAll('/', '').replace('.html', '');
    var divid = "ac_modal_" + eBookConfig.scratchId;
    var div = $("#" + divid);

    div.modal('toggle');

}


function hideCodelens(button, div_id) {
    var div = document.getElementById(div_id + '_codelens_div')
    div.style.display = 'none'

}

function injectCodelens(button, div_id) {
    var div = document.getElementById(div_id + '_codelens_div')
    if (div.style.display == 'none') {
        div.style.display = 'block';
        button.innerText = "Hide Codelens";
    } else {
        div.style.display = "none";
        button.innerText = "Show in Codelens";
        return;
    }

    var cl = document.getElementById(div_id + '_codelens')
    if (cl) {
        div.removeChild(cl)
    }
    var editor = cm_editors[div_id + "_code"]
    var code = editor.getValue()
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
    div.appendChild(myIframe)
    logBookEvent({
        'event': 'codelens',
        'act': 'view',
        'div_id': div_id
    });

}

// <iframe id="%(divid)s_codelens" width="800" height="500" style="display:block"src="#">
// </iframe>


function injectCodeCoach(div_id) {
    var myIframe;
    var srcURL;
    var cl;
    var div = document.getElementById(div_id + '_coach_div')
    div.style.display = 'block'
    cl = document.getElementById(div_id + '_coach')
    if (cl) {
        div.removeChild(cl)
    }

    srcURL = eBookConfig.app + '/admin/diffviewer?divid=' + div_id;
    myIframe = document.createElement('iframe');
    myIframe.setAttribute("id", div_id + '_coach');
    myIframe.setAttribute("width", "800px");
    myIframe.setAttribute("height", "500px");
    myIframe.setAttribute("style", "display:block");
    myIframe.style.background = '#fff';
    myIframe.style.width = "100%"
    //myIframe.setAttribute("src",srcURL)
    myIframe.src = srcURL;
    div.appendChild(myIframe);
    logBookEvent({
        'event': 'coach',
        'act': 'view',
        'div_id': div_id
    });
}


$(document).ready(createEditors);
$(document).ready(createScratchActivecode);
$(document).ready(styleUnittestResults);

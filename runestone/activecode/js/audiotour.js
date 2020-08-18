import RunestoneBase from "../../common/js/runestonebase.js";

// function to display the audio tours
export default class AudioTour extends RunestoneBase {
    constructor(divid, code, bnum, audio_text) {
        // Bug Fix: If a class extends another class, this is undefined UNTIL super is called
        super();
        this.audio_tour = null;
        this.audio_code = null;
        this.windowcode = null;
        this.first_audio = null;
        this.prev_audio = null;
        this.pause_audio = null;
        this.next_audio = null;
        this.last_audio = null;
        this.status = null;
        this.stop_button = null;
        this.tourButtons = [];
        this.elem = null; // current audio element playing
        this.currIndex = null; // current index
        this.len = null; // current length of audio files for tour
        this.buttonCount = null; // number of audio tour buttons
        this.aname = null; // the audio file name
        this.ahash = null; // hash of the audio file name to the lines to highlight
        this.theDivid = null; // div id
        this.afile = null; // file name for audio
        this.playing = false; // flag to say if playing or not
        this.tourName = "";
        // Replacing has been done here to make sure special characters in the code are displayed correctly
        code = code.replaceAll("*doubleq*", '"');
        code = code.replaceAll("*singleq*", "'");
        code = code.replaceAll("*open*", "(");
        code = code.replaceAll("*close*", ")");
        code = code.replaceAll("*nline*", "<br/>");
        var codeArray = code.split("\n");
        var audio_hash = [];
        var bval = [];
        var atype = audio_text.replaceAll("*doubleq*", '"');
        var audio_type = atype.split("*atype*");
        for (let i = 0; i < audio_type.length - 1; i++) {
            audio_hash[i] = audio_type[i];
            var aword = audio_type[i].split(";");
            bval.push(aword[0]);
        }
        var first =
            "<pre><div id='" +
            divid +
            "_l1'>" +
            "1.   " +
            codeArray[0] +
            "</div>";
        var num_lines = codeArray.length;
        for (let i = 1; i < num_lines; i++) {
            if (i < 9) {
                first =
                    first +
                    "<div id='" +
                    divid +
                    "_l" +
                    (i + 1) +
                    "'>" +
                    (i + 1) +
                    ".   " +
                    codeArray[i] +
                    "</div>";
            } else if (i < 99) {
                first =
                    first +
                    "<div id='" +
                    divid +
                    "_l" +
                    (i + 1) +
                    "'>" +
                    (i + 1) +
                    ".  " +
                    codeArray[i] +
                    "</div>";
            } else {
                first =
                    first +
                    "<div id='" +
                    divid +
                    "_l" +
                    (i + 1) +
                    "'>" +
                    (i + 1) +
                    ". " +
                    codeArray[i] +
                    "</div>";
            }
        }
        first = first + "</pre>";
        //laying out the HTML content
        var bcount = 0;
        for (var i = 0; i < audio_type.length - 1; i++) {
            var newButton = document.createElement("button");
            newButton.className = "btn btn-success";
            newButton.innerHTML = bval[i].replace(/\"/g, "");
            this.tourButtons.push(newButton);
            bcount++;
        }
        this.audio_tour = document.createElement("div");
        this.audio_tour.align = "center";
        this.audio_code = document.createElement("p");
        this.windowcode = document.createElement("div");
        this.windowcode.align = "left";
        $(this.windowcode).html(first);
        this.first_audio = document.createElement("button");
        this.prev_audio = document.createElement("button");
        this.pause_audio = document.createElement("button");
        this.next_audio = document.createElement("button");
        this.last_audio = document.createElement("button");
        this.first_audio.className =
            "btn-default glyphicon glyphicon-fast-backward";
        this.prev_audio.className =
            "btn-default glyphicon glyphicon-step-backward";
        this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
        this.next_audio.className =
            "btn-default glyphicon glyphicon-step-forward";
        this.last_audio.className =
            "btn-default glyphicon glyphicon-fast-forward";
        this.first_audio.setAttribute(
            "style",
            "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;"
        );
        this.prev_audio.setAttribute(
            "style",
            "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;"
        );
        this.pause_audio.setAttribute(
            "style",
            "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;"
        );
        this.next_audio.setAttribute(
            "style",
            "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;"
        );
        this.last_audio.setAttribute(
            "style",
            "height: 22px; width: 25px; border-radius: 4px; margin-right:2px;"
        );
        this.first_audio.name = "first_audio";
        this.prev_audio.name = "prev_audio";
        this.pause_audio.name = "pause_audio";
        this.next_audio.name = "next_audio";
        this.last_audio.name = "last_audio";
        this.first_audio.title = "Play first audio in tour";
        this.prev_audio.title = "Play previous audio in tour";
        this.pause_audio.title = "Pause current audio";
        this.next_audio.title = "Play next audio in tour";
        this.last_audio.title = "Play last audio in tour";
        this.first_audio.setAttribute("aria-label", "Play first audio in tour");
        this.prev_audio.setAttribute(
            "aria-label",
            "Play previous audio in tour"
        );
        this.pause_audio.setAttribute("aria-label", "Pause audio");
        this.next_audio.setAttribute("aria-label", "Play next audio in tour");
        this.last_audio.setAttribute("aria-label", "Play last audio in tour");
        this.first_audio.disabled = true;
        this.prev_audio.disabled = true;
        this.pause_audio.disabled = true;
        this.next_audio.disabled = true;
        this.last_audio.disabled = true;
        this.status = document.createElement("div");
        this.status.className = "alert alert-info";
        this.status.setAttribute("style", "display: none;");
        this.stop_button = document.createElement("button");
        this.stop_button.className = "btn btn-default";
        this.stop_button.innerHTML = "Stop tour";
        $(this.audio_tour).append(
            this.audio_code,
            this.windowcode,
            document.createElement("br"),
            this.first_audio,
            this.prev_audio,
            this.pause_audio,
            this.next_audio,
            this.last_audio,
            document.createElement("br"),
            this.status,
            document.createElement("br"),
            this.tourButtons,
            this.stop_button
        );
        $("#" + divid + " .ac_code_div").append(this.audio_tour);
        $("#" + divid + " .ac_code_div").css("width", "100%");
        $("#" + divid + " .CodeMirror.cm-s-default.ui-resizable").hide();
        $("#" + divid + " .ac_opt.btn.btn-default:last-child").hide();
        $(this.stop_button).click(
            function () {
                if (this.playing) {
                    this.elem.pause();
                }
                //log change to db
                this.logBookEvent({
                    event: "Audio",
                    act: "closeWindow",
                    div_id: divid,
                });
                $(this.audio_tour).remove();
                $(
                    "#" + divid + " .CodeMirror.cm-s-default.ui-resizable"
                ).show();
                $("#" + divid + " .ac_opt.btn.btn-default:last-child").show();
                $("#" + divid + " .ac_code_div").css("width", "");
            }.bind(this)
        );
        $(this.tourButtons[0]).click(
            function () {
                this.tour(divid, audio_hash[0], bcount);
            }.bind(this)
        );
        $(this.tourButtons[1]).click(
            function () {
                this.tour(divid, audio_hash[1], bcount);
            }.bind(this)
        );
        $(this.tourButtons[2]).click(
            function () {
                this.tour(divid, audio_hash[2], bcount);
            }.bind(this)
        );
        $(this.tourButtons[3]).click(
            function () {
                this.tour(divid, audio_hash[3], bcount);
            }.bind(this)
        );
        $(this.tourButtons[4]).click(
            function () {
                this.tour(divid, audio_hash[4], bcount);
            }.bind(this)
        );
        // handle the click to go to the next audio
        $(this.first_audio).click(
            function () {
                this.firstAudio();
            }.bind(this)
        );
        // handle the click to go to the next audio
        $(this.prev_audio).click(
            function () {
                this.prevAudio();
            }.bind(this)
        );
        // handle the click to pause or play the audio
        $(this.pause_audio).click(
            function () {
                this.pauseAndPlayAudio(divid);
            }.bind(this)
        );
        // handle the click to go to the next audio
        $(this.next_audio).click(
            function () {
                this.nextAudio();
            }.bind(this)
        );
        // handle the click to go to the next audio
        $(this.last_audio).click(
            function () {
                this.lastAudio();
            }.bind(this)
        );
        // make the image buttons look disabled
        $(this.first_audio).css("opacity", 0.25);
        $(this.prev_audio).css("opacity", 0.25);
        $(this.pause_audio).css("opacity", 0.25);
        $(this.next_audio).css("opacity", 0.25);
        $(this.last_audio).css("opacity", 0.25);
    }
    tour(divid, audio_type, bcount) {
        // set globals
        this.buttonCount = bcount;
        this.theDivid = divid;
        this.status.setAttribute(
            "style",
            "display: inline-block; margin-top: 7px; margin-bottom: 3px;"
        );
        // enable prev, pause/play and next buttons and make visible
        $(this.first_audio).removeAttr("disabled");
        $(this.prev_audio).removeAttr("disabled");
        $(this.pause_audio).removeAttr("disabled");
        $(this.next_audio).removeAttr("disabled");
        $(this.last_audio).removeAttr("disabled");
        $(this.first_audio).css("opacity", 1.0);
        $(this.prev_audio).css("opacity", 1.0);
        $(this.pause_audio).css("opacity", 1.0);
        $(this.next_audio).css("opacity", 1.0);
        $(this.last_audio).css("opacity", 1.0);
        // disable tour buttons
        for (var i = 0; i < bcount; i++)
            $(this.tourButtons[i]).attr("disabled", "disabled");
        var atype = audio_type.split(";");
        var name = atype[0].replaceAll('"', " ");
        this.tourName = name;
        $(this.status).html($.i18n("msg_activecode_starting", name));
        //log tour type to db
        this.logBookEvent({ event: "Audio", act: name, div_id: divid });
        var max = atype.length;
        var str = "";
        this.ahash = [];
        this.aname = [];
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
            //var dir =
            //    "http://media.interactivepython.org/" +
            //    eBookConfig.basecourse.toLowerCase() +
            //    "/audio/";
            var dir = "../_static/audio/"
            str += "<audio id=" + akey + " preload='auto' >";
            str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
            str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
            str += "<source src='" + dir + akey + ".wav' type='audio/wav'>";
            str += "<source src='" + dir + akey + ".mp3' type='audio/mpeg'>";
            str += "<br />Your browser does not support the audio tag</audio>";
            this.ahash[akey] = lnums;
            this.aname.push(akey);
        }
        $(this.audio_code).html(str);
        this.len = this.aname.length; // set the number of audio file in the tour
        this.currIndex = 0;
        this.playCurrIndexAudio();
    }
    handlePlaying() {
        this.elem.pause();
        // unbind current ended
        $("#" + this.afile).unbind("ended");
        // unhighlight the prev lines
        this.unhighlightLines(
            this.theDivid,
            this.ahash[this.aname[this.currIndex]]
        );
    }
    firstAudio() {
        // if audio is this.playing handle it
        this.handlePlaying();
        //log change to db
        this.logBookEvent({
            event: "Audio",
            act: "first",
            div_id: this.theDivid,
        });
        // move to the first audio
        this.currIndex = 0;
        // start at the first audio
        this.playCurrIndexAudio();
    }
    prevAudio() {
        // if there is a previous audio
        if (this.currIndex > 0) {
            // if audio is this.playing handle it
            this.handlePlaying();
            //log change to db
            this.logBookEvent({
                event: "Audio",
                act: "prev",
                div_id: this.theDivid,
            });
            // move to previous to the current (but the current index has moved to the next)
            this.currIndex = this.currIndex - 1;
            // start at the prev audio
            this.playCurrIndexAudio();
        }
    }
    nextAudio() {
        // if audio is this.playing handle it
        this.handlePlaying();
        //log change to db
        this.logBookEvent({
            event: "Audio",
            act: "next",
            div_id: this.theDivid,
        });
        // if not at the end
        if (this.currIndex < this.len - 1) {
            // start at the next audio
            this.currIndex = this.currIndex + 1;
            this.playCurrIndexAudio();
        } else if (this.currIndex == this.len - 1) {
            this.handleTourEnd();
        }
    }
    lastAudio() {
        // if audio is this.playing handle it
        this.handlePlaying();
        //log change to db
        this.logBookEvent({
            event: "Audio",
            act: "last",
            div_id: this.theDivid,
        });
        // move to the last audio
        this.currIndex = this.len - 1;
        // start at last
        this.playCurrIndexAudio();
    }
    // play the audio at the current index
    playCurrIndexAudio() {
        // set this.playing to false
        this.playing = false;
        // play the current audio and highlight the lines
        this.playaudio(this.currIndex, this.aname, this.theDivid, this.ahash);
    }
    // handle the end of the tour
    handleTourEnd() {
        $(this.status).html("The " + this.tourName + " has ended.");
        this.pause_audio.className = "btn-default glyphicon glyphicon-pause";
        this.pause_audio.title = "Pause audio";
        this.pause_audio.setAttribute("aria-label", "Pause audio");
        $(this.first_audio).attr("disabled", "disabled");
        $(this.prev_audio).attr("disabled", "disabled");
        $(this.pause_audio).attr("disabled", "disabled");
        $(this.next_audio).attr("disabled", "disabled");
        $(this.last_audio).attr("disabled", "disabled");
        $(this.first_audio).css("opacity", 0.25);
        $(this.prev_audio).css("opacity", 0.25);
        $(this.pause_audio).css("opacity", 0.25);
        $(this.next_audio).css("opacity", 0.25);
        $(this.last_audio).css("opacity", 0.25);
        // enable the tour buttons
        for (var j = 0; j < this.buttonCount; j++)
            $(this.tourButtons[j]).removeAttr("disabled");
    }
    // only call this one after the first time
    outerAudio() {
        // unbind ended
        $("#" + this.afile).unbind("ended");
        // set this.playing to false
        this.playing = false;
        // unhighlight previous lines from the last audio
        this.unhighlightLines(
            this.theDivid,
            this.ahash[this.aname[this.currIndex]]
        );
        // increment the this.currIndex to point to the next one
        this.currIndex++;
        // if the end of the tour reset the buttons
        if (this.currIndex == this.len) {
            this.handleTourEnd();
        }
        // else not done yet so play the next audio
        else {
            // play the audio at the current index
            this.playCurrIndexAudio();
        }
    }
    // play the audio now that it is ready
    playWhenReady(afile, divid, ahash) {
        // unbind current
        $("#" + afile).unbind("canplaythrough");
        this.elem.currentTime = 0;
        this.playing = true;
        //console.log("in playWhenReady " + elem.duration);
        this.highlightLines(divid, ahash[afile]);
        if (
            this.pause_audio.className ===
            "btn-default glyphicon glyphicon-pause"
        ) {
            $(this.status).html(
                $.i18n("msg_activecode_playing", this.tourName)
            );
            $("#" + afile).bind(
                "ended",
                function () {
                    this.outerAudio();
                }.bind(this)
            );
            this.elem.play();
        } else {
            $("#" + afile).bind(
                "ended",
                function () {
                    this.outerAudio();
                }.bind(this)
            );
        }
    }
    // play the audio at the specified index i and set the duration and highlight the lines
    playaudio(i, aname, divid, ahash) {
        this.afile = aname[i];
        this.elem = document.getElementById(this.afile);
        // if this isn't ready to play yet - no duration yet then wait
        //console.log("in playaudio " + elem.duration);
        if (isNaN(this.elem.duration) || this.elem.duration == 0) {
            // set the status
            $(this.status).html($.i18n("msg_activecode_loading_audio"));
            $("#" + this.afile).bind(
                "canplaythrough",
                function () {
                    this.playWhenReady(this.afile, divid, ahash);
                }.bind(this)
            );
        }
        // otherwise it is ready so play it
        else {
            this.playWhenReady(this.afile, divid, ahash);
        }
    }
    // pause if this.playing and play if paused
    pauseAndPlayAudio(divid) {
        var btn = this.pause_audio;
        // if paused and clicked then continue from current
        if (this.elem.paused) {
            // calcualte the time left to play in milliseconds
            let counter = (this.elem.duration - this.elem.currentTime) * 1000;
            this.elem.play(); // start the audio from current spot
            this.pause_audio.className =
                "btn-default glyphicon glyphicon-pause";
            this.pause_audio.title = $.i18n(
                "msg_activecode_pause_current_audio"
            );
            this.pause_audio.setAttribute(
                "aria-label",
                $.i18n("msg_activecode_pause_audio")
            );
            $(this.status).html(
                $.i18n("msg_activecode_playing", this.tourName)
            );
            //log change to db
            this.logBookEvent({
                event: "Audio",
                act: "play",
                div_id: this.theDivid,
            });
        }
        // if audio was this.playing pause it
        else if (this.playing) {
            this.elem.pause(); // pause the audio
            this.pause_audio.className = "btn-default glyphicon glyphicon-play";
            this.pause_audio.title = $.i18n("msg_activecode_play_paused_audio");
            this.pause_audio.setAttribute(
                "aria-label",
                $.i18n("msg_activecode_play_paused_audio")
            );
            $(this.status).html(
                $.i18n("msg_activecode_audio_paused", this.tourName)
            );
            //log change to db
            this.logBookEvent({
                event: "Audio",
                act: "pause",
                div_id: this.theDivid,
            });
        }
    }
    // process the lines
    processLines(divid, lnum, color) {
        var comma = lnum.split(",");
        if (comma.length > 1) {
            for (let i = 0; i < comma.length; i++) {
                this.setBackgroundForLines(divid, comma[i], color);
            }
        } else {
            this.setBackgroundForLines(divid, lnum, color);
        }
    }
    // unhighlight the lines - set the background back to transparent
    unhighlightLines(divid, lnum) {
        this.processLines(divid, lnum, "transparent");
    }
    // highlight the lines - set the background to a yellow color
    highlightLines(divid, lnum) {
        this.processLines(divid, lnum, "#ffff99");
    }
    // set the background to the passed color
    setBackgroundForLines(divid, lnum, color) {
        var hyphen = lnum.split("-");
        var str;
        // if a range of lines
        if (hyphen.length > 1) {
            var start = parseInt(hyphen[0]);
            var end = parseInt(hyphen[1]) + 1;
            for (var k = start; k < end; k++) {
                //alert(k);
                str = "#" + divid + "_l" + k;
                if ($(str).text() != "") {
                    $(str).css("background-color", color);
                }
                //$(str).effect("highlight",{},(dur*1000)+4500);
            }
        } else {
            //alert(lnum);
            str = "#" + divid + "_l" + lnum;
            $(str).css("background-color", color);
            //$(str).effect("highlight",{},(dur*1000)+4500);
        }
    }
}

/**
  * Runestone Base Class
  * All runestone components should inherit from RunestoneBase
  *
  * In addition all runestone components should do the following things:
  * 1. Ensure that they are wrapped in a div with the class runestone
  * 2. Write their source AND their generated html to the database if the database is configured
  * 3. properly save and restore their answers using the checkServer mechanism in this base class.
  *    Each component must provide an implementation of
  *    - checkLocalStorage
  *    - setLocalStorage
  *    - restoreAnswers
  *
  * 4. provide a Selenium based unit test
  *
 **/

function RunestoneBase () {   // Basic parent stuff

}

RunestoneBase.prototype.init = function(opts) {

    this.sid = opts.sid;
    this.graderactive = opts.graderactive;

    if (opts.enforceDeadline) {
        this.deadline = opts.deadline;
    }

};

RunestoneBase.prototype.logBookEvent = function (eventInfo) {
    eventInfo.course = eBookConfig.course;
    if (eBookConfig.useRunestoneServices && eBookConfig.logLevel > 0) {
        jQuery.get(eBookConfig.ajaxURL + 'hsblog', eventInfo); // Log the run event
    }
    console.log("logging event " + JSON.stringify(eventInfo));
};

RunestoneBase.prototype.logRunEvent = function (eventInfo) {
    eventInfo.course = eBookConfig.course;
    if ( this.forceSave || (! 'to_save' in eventInfo) ) {
        eventInfo.save_code = "True"
    }
    if (eBookConfig.useRunestoneServices && eBookConfig.logLevel > 0) {
        jQuery.post(eBookConfig.ajaxURL + 'runlog', eventInfo) // Log the run event
            .done((function() {this.forceSave = false; }).bind(this))
            .fail((function() {alert("WARNING:  Your code was not saved!  Please Try again.");
                this.forceSave = true; }).bind(this))
    }
    console.log("running " + JSON.stringify(eventInfo));
};

/* Checking/loading from storage */

RunestoneBase.prototype.checkServer = function (eventInfo) {
    // Check if the server has stored answer
    if (this.useRunestoneServices || this.graderactive) {
        let data = {};
        data.div_id = this.divid;
        data.course = eBookConfig.course;
        data.event = eventInfo;
        if (this.sid) {
            data.sid = this.sid
        }
        if (!eBookConfig.practice_mode){
            jQuery.getJSON(eBookConfig.ajaxURL + "getAssessResults", data, this.repopulateFromStorage.bind(this)).error(this.checkLocalStorage.bind(this));
        }
        else{
            this.loadData({});
        }
    } else {
        this.checkLocalStorage();   // just go right to local storage
    }
};

RunestoneBase.prototype.loadData = function (data){
    // for most classes, loadData doesn't do anything. But for Parsons, and perhaps others in the future,
    // initialization can happen even when there's no history to be loaded
    return null;
}

RunestoneBase.prototype.repopulateFromStorage = function (data, status, whatever) {
    // decide whether to use the server's answer (if there is one) or to load from storage
    if (data !== null && this.shouldUseServer(data)) {
        this.restoreAnswers(data);
        this.setLocalStorage(data);
    } else {
        this.checkLocalStorage();
    }
};

RunestoneBase.prototype.shouldUseServer = function (data) {
    // returns true if server data is more recent than local storage or if server storage is correct
    if (data.correct === "T" || localStorage.length === 0 || this.graderactive === true) {
        return true;
    }
    let ex = localStorage.getItem(eBookConfig.email + ":" + this.divid + "-given");
    if (ex === null) {
        return true;
    }
    let storedData;
    try {
        storedData = JSON.parse(ex);
    } catch (err){
        // error while parsing; likely due to bad value stored in storage
        console.log(err.message);
        localStorage.removeItem(eBookConfig.email + ":" + this.divid + "-given");
        // definitely don't want to use local storage here
        return true;
    }
    if (data.answer == storedData.answer)
        return true;
    let storageDate = new Date(storedData.timestamp);
    let serverDate = new Date(data.timestamp);

    return serverDate >= storageDate;

};

function RunestoneBase () {   // Basic parent stuff

}

RunestoneBase.prototype.logBookEvent = function (info) {
    console.log("logging event " + this.divid);
};

RunestoneBase.prototype.logRunEvent = function (info) {
    console.log("running " + this.divid);
};

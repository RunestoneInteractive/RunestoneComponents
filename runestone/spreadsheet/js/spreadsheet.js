ssList = {};

class SpreadSheet {
    constructor(opts) {
        let orig = opts.orig;
        this.div_id = orig.id;
        this.sheet_id = `${this.div_id}_sheet`;
        this.data = eval(`${this.div_id}_data`);

        this.renderSheet()
    }

    renderSheet() {
        let div = document.getElementById(this.sheet_id)
        this.table = jexcel(div, {data:this.data})
    }
}

$(document).bind("runestone:login-complete", function () {
    $("[data-component=spreadsheet]").each(function (index) {    // MC
        var opts = {"orig": this, 'useRunestoneServices':eBookConfig.useRunestoneServices};
        ssList[this.id] = new SpreadSheet(opts);
    });
});

if (typeof component_factory === 'undefined') {
    component_factory = {}
}
component_factory['spreadsheet'] = function(opts) { return new SpreadSheet(opts)}

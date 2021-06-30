
$(document).on("runestone:login-complete", function () {
    // $("[data-component=sage]").each(function (index) {
    //     sagecell.makeSagecell({inputLocation: `#${this.id}`,
    //                            evalButtonText: "Evaluate"});
    // });
    // sagecell.makeSagecell({inputLocation: `#sage_test_1`,
    // evalButtonText: "Evaluate"});

    sagecell.makeSagecell({inputLocation: `div.runestone-sage`,
                               linked: true,
                               evalButtonText: "Evaluate"});

});

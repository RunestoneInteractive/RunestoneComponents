// import "./embedded_sagecell";

$(document).on("runestone:login-complete", function () {
  // $("[data-component=sage]").each(function (index) {
  //     sagecell.makeSagecell({inputLocation: `#${this.id}`,
  //                            evalButtonText: "Evaluate"});
  // });
  // sagecell.makeSagecell({inputLocation: `#sage_test_1`,
  // evalButtonText: "Evaluate"});

  fetch("https://sagecell.sagemath.org/static/embedded_sagecell.js")
    .then((response) => response.text())
    .then((text) => Function(text)())
    .then(function () {
      console.log("ready to make cells...");
      sagecell.root = "https://sagecell.sagemath.org/";
      sagecell.makeSagecell({
        inputLocation: `div.runestone-sage`,
        linked: true,
        evalButtonText: "Evaluate",
      });
    });

  //   let sc = document.createElement("script");
  //   sc.type = "text/javscript";
  //   sc.src = "https://sagecell.sagemath.org/static/embedded_sagecell.js";
  //   document.body.appendChild(sc);
  //   eval(sc);
  //   if (typeof sagecell === "undefined") {
  //     setTimeout(function () {
  //       console.log("ready to make cells...");
  //       sagecell.makeSagecell({
  //         inputLocation: `div.runestone-sage`,
  //         linked: true,
  //         evalButtonText: "Evaluate",
  //       });
  //     }, 2000);
  //   }
});

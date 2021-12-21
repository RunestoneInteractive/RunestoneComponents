// ***********************************************
// |docname| - JavaScript for the WaveDrom library
// ***********************************************
"use strict";

// This took a fair amount of experimenting to figure out how to make this work with NPM and Webpack. Sigh. Here's the working result.
//
// This has already been packaged for the web with browserify, so we can just import it for the side effects (it defines ``window.WaveDrom``. Importing from the ``lib/`` folder produces a lot of unsatisfied imports when using webpack.
import "wavedrom/wavedrom.min.js";

// WaveSkin isn't defined globally, so import the default export to get access to it. It defines a single variable, assuming that the variable will be assigned to the ``window``. Here, it's not. So...
import WaveSkin from "wavedrom/skins/default.js";
// ...make the required WaveSkin (needed by WaveDrom) available globally.
window.WaveSkin = WaveSkin;

// Run the render after the dynamic load is done.
$(document).on("runestone:login-complete", window.WaveDrom.ProcessAll);

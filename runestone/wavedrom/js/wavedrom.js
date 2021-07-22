// ***********************************************
// |docname| - JavaScript for the WaveDrom library
// ***********************************************
'use strict';

// This took a fair amount of experimenting to figure out how to make this work with NPM and Webpack. Sigh. Here's the working result.
//
// All we need is the ability to call the default export of ``ProcessAll`` in order to render timing diagrams.
import ProcessAll from "wavedrom/lib/process-all.js";

// WaveSkin isn't defined globally, so import the default export to get access to it.
import WaveSkin from "wavedrom/lib/wave-skin.js";
// Make the required WaveSkin (needed by WaveDrom) available globally.
window.WaveSkin = WaveSkin;

// Run the render after the dynamic load is done.
$(document).on("runestone:login-complete", ProcessAll);

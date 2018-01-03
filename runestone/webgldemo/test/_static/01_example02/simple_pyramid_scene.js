/**
 * simple_program_scene.js, By Wayne Brown, Fall 2017
 */

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2017 C. Wayne Brown
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

"use strict";

//-------------------------------------------------------------------------
/** Initialize and build a scene; render the scene.
 * @param id - the webglinteractive id; prefix of all HTML tags
 * @param download - an instance of SceneDownload
 * @param vshaders_dictionary - a set of vertex shaders, indexed by file name
 * @param fshaders_dictionary - a set of fragment shaders, indexed by file name
 * @param models - an array of models
 * @constructor
 */
window.SimplePyramidScene = function (id, download, vshaders_dictionary,
                                fshaders_dictionary, models) {

  let self = this;

  // Private variables
  let canvas_id = download.canvas_id;
  let out = download.out;

  let gl = null;
  let program = null;

  let matrix = new GlMatrix4x4();
  let transform = matrix.create();
  let projection = matrix.createOrthographic(-1,1,-1,1,-1,1);
  let rotate_x_matrix = matrix.create();
  let rotate_y_matrix = matrix.create();
  let pyramid = null;
  let events = null;

  // Public variables that will possibly be used or changed by event handlers.
  self.canvas = null;
  self.angle_x = 0.0;
  self.angle_y = 0.0;
  self.animate_active = true;

  //-----------------------------------------------------------------------
  self.render = function () {

    // Clear the entire canvas window background with the clear color
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Build individual transforms
    matrix.rotate(rotate_x_matrix, self.angle_x, 1, 0, 0);
    matrix.rotate(rotate_y_matrix, self.angle_y, 0, 1, 0);

    // Combine the transforms into a single transformation
    matrix.multiplySeries(transform, projection, rotate_x_matrix, rotate_y_matrix);

    // Render the model
    pyramid.render(gl, transform);
  };

  //-----------------------------------------------------------------------
  self.delete = function () {

    // Clean up shader programs
    gl.deleteShader(program.vShader);
    gl.deleteShader(program.fShader);
    gl.deleteProgram(program);

    // Delete each model's VOB
    pyramid.delete(gl);

    // Remove all event handlers
    events.removeAllEventHandlers();

    // Disable any animation
    self.animate_active = false;
  };

  //-----------------------------------------------------------------------
  // Object constructor. One-time initialization of the scene.

  // Get the rendering context for the canvas
  self.canvas = download.getCanvas(canvas_id);
  if (self.canvas) {
    gl = download.getWebglContext(self.canvas);
  }
  if (!gl) {
    return;
  }

  // Set up the rendering program and set the state of webgl
  program = download.createProgram(gl, vshaders_dictionary["uniform_color"], fshaders_dictionary["uniform_color"]);

  gl.useProgram(program);

  gl.enable(gl.DEPTH_TEST);

  // Create a simple model of a pyramid
  let pyramid_model = CreatePyramid();
  let pyramid_color = new Float32Array([1.0, 0.0, 0.0, 1.0]);

  // Create Buffer Objects for the model
  pyramid = new SimpleModelRender(gl, program, pyramid_model, pyramid_color, out);

  // Set up callbacks for user and timer events
  events = new SimplePyramidEvents(id, self);
  events.animate();
};


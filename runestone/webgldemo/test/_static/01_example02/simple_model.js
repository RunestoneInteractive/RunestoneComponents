/**
 * simple_model.js, By Wayne Brown, Fall 2017
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
/**
 * A simple triangle composed of 3 vertices.
 * @param vertices Array An array of 3 vertices.
 * @constructor
  */
window.Triangle = function (vertices) {
  let self = this;
  self.vertices = vertices;
};

//-------------------------------------------------------------------------
/**
 * A simple model composed of an array of triangles.
 * @param name String The name of the model.
 * @constructor
 */
window.SimpleModel = function (name, array_of_triangles) {
  let self = this;
  self.name = name;
  self.triangles = array_of_triangles;
};

//-------------------------------------------------------------------------
/**
 * Create a Simple_model of 4 triangles that forms a pyramid.
 * @return SimpleModel
 */
window.CreatePyramid = function () {
  let vertices, triangle1, triangle2, triangle3, triangle4;

  // Vertex data
  vertices = [  [ 0.0, -0.25, -0.50],
                [ 0.0,  0.25,  0.00],
                [ 0.5, -0.25,  0.25],
                [-0.5, -0.25,  0.25] ];

  // Create 4 triangles
  triangle1 = new Triangle([vertices[2], vertices[1], vertices[3]]);
  triangle2 = new Triangle([vertices[3], vertices[1], vertices[0]]);
  triangle3 = new Triangle([vertices[0], vertices[1], vertices[2]]);
  triangle4 = new Triangle([vertices[0], vertices[2], vertices[3]]);

  // Create a model that is composed of 4 triangles
  let model = new SimpleModel("simple", [ triangle1, triangle2, triangle3, triangle4 ] );

  return model;
};

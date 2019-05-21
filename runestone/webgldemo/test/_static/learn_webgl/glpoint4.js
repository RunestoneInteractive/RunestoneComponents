/**
 * glpoint4.js, By Wayne Brown, Fall 2017
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

/** -----------------------------------------------------------------------
 * A GlPoint4 object contains functions to create and operate on (x,y,z,w) points.
 * @constructor
 */
window.GlPoint4 = function () {

  let self = this;

  /** ---------------------------------------------------------------------
   * Create an (x,y,z,w) point. Defaults to (0,0,0,1).
   * @param x {Number} The value of the x component. Defaults to 0.
   * @param y {Number} The value of the y component. Defaults to 0.
   * @param z {Number} The value of the z component. Defaults to 0.
   * @param w {Number} The value of the w component. Defaults to 1.
   * @return Float32Array A new 4-component vector
   */
  self.create = function (x=0, y=0, z=0, w=1) {
    let p = new Float32Array(4);
    p[0] = x;
    p[1] = y;
    p[2] = z;
    p[3] = w;
    return p;
  };

  /** ---------------------------------------------------------------------
   * Create an (x,y,z,w) point given an existing point.
   * @param from {Float32Array} An existing point.
   * @return {Float32Array} A new 4-component point that has the same
   *         values as the input argument.
   */
  self.createFrom = function (from) {
    let p = new Float32Array(4);
    p[0] = from[0];
    p[1] = from[1];
    p[2] = from[2];
    p[3] = (from.length >= 4) ? from[3] : 1.0;
    return p;
  };

  /** ---------------------------------------------------------------------
   * Copy the 2nd argument point into the first argument point. (to = from)
   * @param to {Float32Array} An existing point.
   * @param from {Float32Array} An existing point.
   */
  self.copy = function (to, from) {
    to[0] = from[0];
    to[1] = from[1];
    to[2] = from[2];
    to[3] = (from.length >= 4) ? from[3] : 1.0;
  };

  /** ---------------------------------------------------------------------
   * Add a point and a vector.
   * @param result {Float32Array} result = p + v  An existing GlPoint4.
   * @param p {Float32Array} An existing GlPoint4.
   * @param v {Float32Array} An existing GlVector3.
   */
  self.addVector = function (result, p, v) {
    result[0] = p[0] + v[0];
    result[1] = p[1] + v[1];
    result[2] = p[2] + v[2];
    result[3] = 1;
  };

  /** ---------------------------------------------------------------------
   * Subtract a vector from a point.
   * @param result {Float32Array} result = p + v   An existing GlPoint4.
   * @param p {Float32Array} An existing GlPoint4.
   * @param v {Float32Array} An existing GlVector3.
   */
  self.subtractVector = function (result, p, v) {
    result[0] = p[0] - v[0];
    result[1] = p[1] - v[1];
    result[2] = p[2] - v[2];
    result[3] = 1;
  };

  /** ---------------------------------------------------------------------
   * Calculate the distance between two points.
   * @param p1 {Float32Array} An existing point.
   * @param p2 {Float32Array} An existing point.
   * @return {Number} The distance between points p1 and p2.
   */
  self.distanceBetween = function (p1, p2) {
    let dx = p1[0] - p2[0];
    let dy = p1[1] - p2[1];
    let dz = p1[2] - p2[2];
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  };

  /** ---------------------------------------------------------------------
   * Print the vector on the console.
   * @param name {String} A description of the point.
   * @param p {Float32Array} An existing point.
   */
  self.print = function (name, p) {
    let maximum = Math.max(p[0], p[1], p[2], p[3]);
    let order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
    let digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

    console.log("GlPoint4: " + name + ": "
        + p[0].toFixed(digits) + " "
        + p[1].toFixed(digits) + " "
        + p[2].toFixed(digits) + " "
        + p[3].toFixed(digits));
  };
};



/**
 * glvector3.js, By Wayne Brown, Fall 2017
 *
 * GlVector3 is a set of functions that perform standard operations
 * on 3-component vectors - (dx, dy, dz), which are stored as
 * 3-element arrays.
 *
 * The functions do not create new objects to minimize garbage collection.
 *
 * The functions are defined inside an object to prevent pollution of
 * JavaScript's global address space.
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
 * A GlVector3 object knows how to create and manipulate 3D vectors.
 *
 * @constructor
 */
window.GlVector3 = function () {

  let self = this;

  /** ---------------------------------------------------------------------
   * Create a new 3-component vector.
   * @param dx {number} The change in x of the vector.
   * @param dy {number} The change in y of the vector.
   * @param dz {number} The change in z of the vector.
   * @return {Float32Array} A new 3-component vector
   */
  self.create = function (dx=0, dy=0, dz=0) {
    let v = new Float32Array(3);
    v[0] = dx;
    v[1] = dy;
    v[2] = dz;
    return v;
  };

  /** ---------------------------------------------------------------------
   * Create a new 3-component vector and set its components equal to an
   * existing vector.
   * @param from {Float32Array} An existing vector.
   * @return {Float32Array} A new 3-component vector with the same values as "from"
   */
  self.createFrom = function (from) {
    let v = new Float32Array(3);
    v[0] = from[0];
    v[1] = from[1];
    v[2] = from[2];
    return v;
  };

  /** ---------------------------------------------------------------------
   * Create a vector using two existing points.
   * @param tail {Float32Array} A 3-component point.
   * @param head {Float32Array} A 3-component point.
   * @return {Float32Array} A new 3-component vector defined by 2 points.
   */
  self.createFrom2Points = function (tail, head) {
    let v = new Float32Array(3);
    self.subtract(v, head, tail);
    return v;
  };

  /** ---------------------------------------------------------------------
   * Copy a 3-component vector into another 3-component vector
   * @param to {Float32Array} A 3-component vector that you want changed.
   * @param from {Float32Array} A 3-component vector that is the source of data.
   * @returns {Float32Array} The "to" 3-component vector.
   */
  self.copy = function (to, from) {
    to[0] = from[0];
    to[1] = from[1];
    to[2] = from[2];
    return to;
  };

  /** ---------------------------------------------------------------------
   * Set the components of a 3-component vector.
   * @param v {Float32Array} The vector to change.
   * @param dx {number} The change in x of the vector.
   * @param dy {number} The change in y of the vector.
   * @param dz {number} The change in z of the vector.
   */
  self.set = function (v, dx, dy, dz) {
    v[0] = dx;
    v[1] = dy;
    v[2] = dz;
  };

  /** ---------------------------------------------------------------------
   * Calculate the length of a vector.
   * @param v {Float32Array} A 3-component vector.
   * @return {number} The length of a vector
   */
  self.length = function (v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  };

  /** ---------------------------------------------------------------------
   * Make a vector have a length of 1.
   * @param v {Float32Array} A 3-component vector.
   * @return {Float32Array} The input vector normalized to unit length.
   *                        Or null if the vector is zero length.
   */
  self.normalize = function (v) {
    let length, percent;

    length = self.length(v);
    if (Math.abs(length) < 0.0000001) {
      return null; // Invalid vector
    }

    percent = 1.0 / length;
    v[0] = v[0] * percent;
    v[1] = v[1] * percent;
    v[2] = v[2] * percent;
    return v;
  };

  /** ---------------------------------------------------------------------
   * Add two vectors:  result = v0 + v1
   * @param result {Float32Array} A 3-component vector.
   * @param v0 {Float32Array} A 3-component vector.
   * @param v1 {Float32Array} A 3-component vector.
   */
  self.add = function (result, v0, v1) {
    result[0] = v0[0] + v1[0];
    result[1] = v0[1] + v1[1];
    result[2] = v0[2] + v1[2];
  };

  /** ---------------------------------------------------------------------
   * Subtract two vectors:  result = v0 - v1
   * @param result {Float32Array} A 3-component vector.
   * @param v0 {Float32Array} A 3-component vector.
   * @param v1 {Float32Array} A 3-component vector.
   */
  self.subtract = function (result, v0, v1) {
    result[0] = v0[0] - v1[0];
    result[1] = v0[1] - v1[1];
    result[2] = v0[2] - v1[2];
  };

  /** ---------------------------------------------------------------------
   * Scale a vector:  result = s * v0
   * @param result {Float32Array} A 3-component vector.
   * @param v0 {Float32Array} A 3-component vector.
   * @param s {number} A scale factor.
   */
  self.scale = function (result, v0, s) {
    result[0] = v0[0] * s;
    result[1] = v0[1] * s;
    result[2] = v0[2] * s;
  };

  /** ---------------------------------------------------------------------
   * Calculate the cross product of 2 vectors: result = v0 x v1 (order matters)
   * @param result {Float32Array} A 3-component vector.
   * @param v0 {Float32Array} A 3-component vector.
   * @param v1 {Float32Array} A 3-component vector.
   */
  self.crossProduct = function (result, v0, v1) {
    result[0] = v0[1] * v1[2] - v0[2] * v1[1];
    result[1] = v0[2] * v1[0] - v0[0] * v1[2];
    result[2] = v0[0] * v1[1] - v0[1] * v1[0];
  };

  /** ---------------------------------------------------------------------
   * Calculate the dot product of 2 vectors
   * @param v0 {Float32Array} A 3-component vector.
   * @param v1 {Float32Array} A 3-component vector.
   * @return {number} The dot product of v0 and v1.
   */
  self.dotProduct = function (v0, v1) {
    return v0[0] * v1[0] + v0[1] * v1[1] + v0[2] * v1[2];
  };

  /** ---------------------------------------------------------------------
   * Print a vector to the console.
   * @param name {string} A description of the vector to be printed.
   * @param v {Float32Array} A 3-component vector.
   */
  self.print = function (name, v) {
    let maximum, order, digits;

    maximum = Math.max(v[0], v[1], v[2]);
    order = Math.floor(Math.log(maximum) / Math.LN10 + 0.000000001);
    digits = (order <= 0) ? 5 : (order > 5) ? 0 : (5 - order);

    window.console.log("Vector3: " + name + ": "
      + v[0].toFixed(digits) + " "
      + v[1].toFixed(digits) + " "
      + v[2].toFixed(digits));
  };
};



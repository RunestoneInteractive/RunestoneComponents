/**
 * models_arrays_gpu.js, By Wayne Brown, Fall 2017
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

/**------------------------------------------------------------------------
 * Copy arrays that define a model to the GPU.
 * @param gl {WebGLRenderingContext} WebGL context
 * @param model_arrays {ModelArrays} array data for a model
 * @param out - an object that can display messages to the web page
 * @constructor
 */
window.ModelArraysGPU = function (gl, model_arrays, out) {

  let self = this;

  self.points    = null;  // {GpuPointsData} if the model contains points
  self.lines     = null;  // {GpuLinesData} if the model contains lines
  self.triangles = null;  // {GpuTrianglesData} if the model contains triangles
  self.wireframe = null;  // {Float32Array} if the model has a wireframe definition

  let color_components;

  /**----------------------------------------------------------------------
   * Create a GPU buffer object and transfer data into the buffer.
   * @param data {Float32Array} the array of data to be put into the buffer object.
   * @param components_per_vertex {number}
   * @private
   */
  function _createBufferObject(data, components_per_vertex) {
    let buffer_id, buffer_info;

    // Don't create a gpu buffer object if there is no data.
    if (data === null) return null;

    // Create a buffer object
    buffer_id = gl.createBuffer();
    if (!buffer_id) {
      out.displayError('Failed to create the buffer object for ' + model_arrays.name);
      return null;
    }

    // Make the buffer object the active buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);

    // Upload the data for this buffer object to the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    buffer_info = new ObjectBufferInfo();
    buffer_info.id = buffer_id;
    buffer_info.number_values = data.length;
    buffer_info.components_per_vertex = components_per_vertex;

    return buffer_info;
  }

  /**----------------------------------------------------------------------
   * Remove the Buffer Objects used by this model on the GPU
   */
  self.delete = function () {
    if (self.points !== null && self.points.number > 0) {
      gl.deleteBuffer(self.points.vertices.id);
      gl.deleteBuffer(self.points.colors.id);
    }
    if (self.lines !== null && self.lines.number > 0) {
      gl.deleteBuffer(self.lines.vertices.id);
      gl.deleteBuffer(self.lines.colors.id);
      gl.deleteBuffer(self.lines.textures.id);
    }
    if (self.triangles !== null && self.triangles.number > 0) {
      gl.deleteBuffer(self.triangles.vertices.id);
      gl.deleteBuffer(self.triangles.colors.id);
      gl.deleteBuffer(self.triangles.flat_normals.id);
      gl.deleteBuffer(self.triangles.smooth_normals.id);
      gl.deleteBuffer(self.triangles.textures.id);
    }
    if (self.wireframe !== null && self.wireframe.number > 0) {
      gl.deleteBuffer(self.wireframe.vertices.id);
    }
  };

  //-----------------------------------------------------------------------
  // Constructor

  if (model_arrays.rgba) {
    color_components = 4;
  } else {
    color_components = 3;
  }

  // Build the buffers for the points
  if (model_arrays.points !== null && model_arrays.points.vertices.length > 0) {
    self.points = new GpuPointsData();
    self.points.number = model_arrays.points.vertices.length / 3;
    self.points.vertices = _createBufferObject(model_arrays.points.vertices, 3);
    self.points.colors   = _createBufferObject(model_arrays.points.vertices, color_components);
    self.points.material = model_arrays.points.material;
  }

  // Build the buffers for the lines
  if (model_arrays.lines !== null && model_arrays.lines.vertices.length > 0) {
    self.lines = new GpuLinesData();

    self.lines.number   = model_arrays.lines.vertices.length / 3 / 2;
    self.lines.vertices = _createBufferObject(model_arrays.lines.vertices, 3);
    self.lines.colors   = _createBufferObject(model_arrays.lines.colors, color_components);
    self.lines.textures = _createBufferObject(model_arrays.lines.textures, 2);
    self.lines.material = model_arrays.lines.material;
  }

  // Build the buffers for the triangles
  if (model_arrays.triangles !== null && model_arrays.triangles.vertices.length > 0) {
    self.triangles = new GpuTrianglesData();

    self.triangles.number         = model_arrays.triangles.vertices.length / 3 / 3;
    self.triangles.vertices       = _createBufferObject(model_arrays.triangles.vertices, 3);
    self.triangles.colors         = _createBufferObject(model_arrays.triangles.colors, color_components);
    self.triangles.flat_normals   = _createBufferObject(model_arrays.triangles.flat_normals, 3);
    self.triangles.smooth_normals = _createBufferObject(model_arrays.triangles.smooth_normals, 3);
    self.triangles.textures       = _createBufferObject(model_arrays.triangles.textures, 2);
    self.triangles.material       = model_arrays.triangles.material;
  }

  if (model_arrays.wireframe !== null && model_arrays.wireframe.vertices.length > 0) {
    self.wireframe = new GpuWireframeData();

    self.wireframe.number = model_arrays.triangles.vertices.length / 3;
    self.wireframe.vertices = _createBufferObject(model_arrays.wireframe.vertices, 3);
  }

  // Constructor initialization
  model_arrays.gpu_model_arrays = self;
};

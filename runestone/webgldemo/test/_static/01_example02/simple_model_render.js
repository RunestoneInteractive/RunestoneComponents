/**
 * simple_model_render_01.js, By Wayne Brown, Fall 2015
 */

/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 C. Wayne Brown
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
 * Given a model description, create the buffer objects needed to render
 * the model. This is very closely tied to the shader implementations.
 * @param gl Object The WebGL state and API
 * @param program Object The shader program the will render the model.
 * @param model Simple_model The model data.
 * @param model_color The color of the model faces.
 * @param out Object Can display messages to the webpage.
 * @constructor
 */
window.SimpleModelRender = function (gl, program, model, model_color, out) {

  let self = this;

  // Variables to remember so the model can be rendered.
  let number_triangles = 0;
  let triangles_vertex_buffer_id = null;

  // Shader variable locations
  let a_Vertex_location = null;
  let u_Color_location = null;
  let u_Transform_location = null;

  let edge_color = new Float32Array( [0.0, 0.0, 0.0, 1.0]); // BLACK

  //-----------------------------------------------------------------------
  /**
   * Create a Buffer Object in the GPU's memory and upload data into it.
   * @param gl Object The WebGL state and API
   * @param data TypeArray An array of data values.
   * @returns Number a unique ID for the Buffer Object
   * @private
   */
  function _createBufferObject(gl, data) {
    // Create a buffer object
    let buffer_id;

    buffer_id = gl.createBuffer();
    if (!buffer_id) {
      out.displayError('Failed to create the buffer object for ' + model.name);
      return null;
    }

    // Make the buffer object the active buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_id);

    // Upload the data for this buffer object to the GPU.
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    return buffer_id;
  }

  //-----------------------------------------------------------------------
  /**
   * Using the model data, build a 1D array for the Buffer Object
   * @private
   */
  function _buildBufferObjectData() {
    let j, k, m, nv, numberVertices, triangle, vertex, vertices3;

    // Create a 1D array that holds all of the  for the triangles
    if (model.triangles.length > 0) {
      number_triangles = model.triangles.length;
      numberVertices = number_triangles * 3;
      vertices3 = new Float32Array(numberVertices * 3);

      nv = 0;
      for (j = 0; j < model.triangles.length; j += 1) {
        triangle = model.triangles[j];

        for (k = 0; k < 3; k += 1) {
          vertex = triangle.vertices[k];

          for (m = 0; m < 3; m += 1, nv += 1) {
            vertices3[nv] = vertex[m];
          }
        }
      }

      triangles_vertex_buffer_id = _createBufferObject(gl, vertices3);
    }

    // Release the temporary vertex array so the memory can be reclaimed.
    vertices3 = null;
  }

  //-----------------------------------------------------------------------
  /**
   * Get the location of the shader variables in the shader program.
   * @private
   */
  function _getLocationOfShaderVariables() {
    // Get the location of the shader variables
    u_Color_location     = gl.getUniformLocation(program, 'u_Color');
    u_Transform_location = gl.getUniformLocation(program, 'u_Transform');
    a_Vertex_location    = gl.getAttribLocation(program,  'a_Vertex');
  }

  //-----------------------------------------------------------------------
  // These one-time tasks set up the rendering of the models.
  _buildBufferObjectData();
  _getLocationOfShaderVariables();

  //-----------------------------------------------------------------------
  /**
   * Delete the Buffer Objects associated with this model.
   * @param gl Object The WebGL state and API.
   */
  self.delete = function (gl) {
    if (number_triangles > 0) {
      gl.deleteBuffer(triangles_vertex_buffer_id);
    }
  };

  //-----------------------------------------------------------------------
  /**
   * Render the model.
   * @param gl Object The WebGL state and API.
   * @param transform 4x4Matrix The transformation to apply to the model vertices.
   */
  self.render = function (gl, transform) {
    let j, start;

    // 1. Render the triangles:

    // Set the transform for all the triangle vertices
    gl.uniformMatrix4fv(u_Transform_location, false, transform);

    // Set the color for all of the triangle faces
    gl.uniform4fv(u_Color_location, model_color);

    // Activate the model's vertex Buffer Object
    gl.bindBuffer(gl.ARRAY_BUFFER, triangles_vertex_buffer_id);

    // Bind the vertices Buffer Object to the 'a_Vertex' shader variable
    gl.vertexAttribPointer(a_Vertex_location, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Vertex_location);

    // Draw all of the triangles
    gl.drawArrays(gl.TRIANGLES, 0, number_triangles * 3);

    // 2. Render the edges around each triangle:

    // Set the color for all of the edges
    gl.uniform4fv(u_Color_location, edge_color);

    // Draw a line_loop around each of the triangles
    for (j = 0, start = 0; j < number_triangles; j += 1, start += 3) {
      gl.drawArrays(gl.LINE_LOOP, start, 3);
    }

  };

};

/**
 * models_definitions.js, By Wayne Brown, Fall 2017
 *
 * These definitions are designed for rendering model data while optimizing
 * speed. For a single model, points, lines, and triangles are stored in
 * single arrays with the goal of rendering them using a single call
 * to gl.drawArrays().
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

/**------------------------------------------------------------------------
 * The definition of a material surface Object.
 * @param {string} material_name
 * @constructor
 */
function ModelMaterial(material_name) {
  let self = this;
  self.name = material_name;
  self.index = -1;   // matches a material to an array index.
  self.Ns = null;    // the specular exponent for the current material
  self.Ka = null;    // the ambient reflectivity using RGB values
  self.Kd = null;    // the diffuse reflectivity using RGB values
  self.Ks = null;    // the specular reflectivity using RGB values
  self.Ni = null;    // the optical density for the surface; index of refraction
  self.d = null;     // the dissolve for the current material; transparency
  self.illum = null; // illumination model code
  self.map_Kd = null;// specifies a color texture filename
  self.textureMap = null; // the image used for a texture map
}

/**------------------------------------------------------------------------
 * Defines a set of points, suitable for rendering using gl.POINTS mode.
 * @constructor
 */
function PointsData() {
  let self = this;
  self.vertices = null; // {Float32Array} 3 components per vertex (x,y,z)
  self.colors   = null; // {Float32Array} 3 or 4 components per vertex RGB or RGBA
  self.material = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * Defines a set of lines, suitable for rendering using gl.LINES mode.
 * @constructor
 */
function LinesData() {
  let self = this;
  self.vertices = null; // {Float32Array} 3 components per vertex (x,y,z)
  self.colors   = null; // {Float32Array} 3 or 4 components per vertex RGB or RGBA
  self.textures = null; // {Float32Array} 1 component per vertex
  self.material = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * Defines a set of triangles, suitable for rendering using gl.TRIANGLES mode.
 * @constructor
 */
function TrianglesData() {
  let self = this;
  self.vertices       = null; // {Float32Array} 3 components per vertex (x,y,z)
  self.colors         = null; // {Float32Array} 3 or 4 components per vertex RGB or RGBA
  self.flat_normals   = null; // {Float32Array} 3 components per vertex <dx,dy,dz>
  self.smooth_normals = null; // {Float32Array} 3 components per vertex <dx,dy,dz>
  self.textures       = null; // {Float32Array} 2 components per vertex (s,t)
  self.material       = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * Defines a set of triangle edges, suitable for rendering using gl.LINES mode.
 * @constructor
 */
function WireframeData() {
  let self = this;
  self.vertices = null; // {Float32Array} 3 components per vertex (x,y,z)
}

/**------------------------------------------------------------------------
 * Defines one model. A model can contain points, lines, and triangles.
 * @constructor
 */
function ModelArrays(name) {
  let self = this;
  self.name      = name;  // {string} The name of this model
  self.points    = null;  // {PointsData} if the model contains points
  self.lines     = null;  // {LinesData} if the model contains lines
  self.triangles = null;  // {TrianglesData} if the model contains triangles
  self.wireframe = null;  // {WireframeData} if the model has a wireframe definition
  self.rgba      = false; // {boolean} if true, the colors arrays holds 4 components per color
  self.gpu_model_arrays = null; // {GpuModelArrays} GPU buffers
}

//=========================================================================
// Track GPU object buffers for a model.
//=========================================================================

/**------------------------------------------------------------------------
 * Description of a GPU object-buffer
 * @constructor
 */
function ObjectBufferInfo() {
  let self = this;
  self.id = 0; // Vertex-object-buffer id
  self.number_values = 0; // Number of floats in the object-buffer
  self.components_per_vertex = 0; // Number of values per vertex
}

/**------------------------------------------------------------------------
 * GPU object-buffers for points, suitable for rendering using gl.POINTS mode.
 * @constructor
 */
function GpuPointsData() {
  let self = this;
  self.number   = 0;
  self.vertices = null; // {ObjectBufferInfo}
  self.colors   = null; // {ObjectBufferInfo}
  self.material = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * GPU object-buffers for lines, suitable for rendering using gl.LINES mode.
 * @constructor
 */
function GpuLinesData() {
  let self = this;
  self.number   = 0;
  self.vertices = null; // {ObjectBufferInfo}
  self.colors   = null; // {ObjectBufferInfo}
  self.textures = null; // {ObjectBufferInfo}
  self.material = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * GPU object-buffers for triangles, suitable for rendering using gl.TRIANGLES mode.
 * @constructor
 */
function GpuTrianglesData() {
  let self = this;
  self.number         = 0;
  self.vertices       = null; // {ObjectBufferInfo}
  self.colors         = null; // {ObjectBufferInfo}
  self.flat_normals   = null; // {ObjectBufferInfo}
  self.smooth_normals = null; // {ObjectBufferInfo} 3 components per vertex <dx,dy,dz>
  self.textures       = null; // {ObjectBufferInfo} 2 components per vertex (s,t)
  self.material       = null; // {ModelMaterial}
}

/**------------------------------------------------------------------------
 * GPU object-buffers for triangles, suitable for rendering using gl.TRIANGLES mode.
 * @constructor
 */
function GpuWireframeData() {
  let self = this;
  self.number         = 0;
  self.vertices       = null; // {ObjectBufferInfo}
}



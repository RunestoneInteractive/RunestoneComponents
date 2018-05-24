// Vertex Shader
precision mediump int;
precision mediump float;

uniform mat4 u_Transform;
uniform vec4 u_Color;

attribute vec3 a_Vertex;

void main() {
  // Transform the location of the vertex
  gl_Position = u_Transform * vec4(a_Vertex, 1.0);
}

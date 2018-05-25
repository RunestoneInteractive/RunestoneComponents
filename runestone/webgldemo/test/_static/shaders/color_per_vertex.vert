// Vertex Shader
precision mediump int;
precision mediump float;

uniform mat4 u_Transform;

attribute vec3 a_Vertex;
attribute vec4 a_Color;

varying vec4 v_Color;

void main() {
  // Transform the location of the vertex
  gl_Position = u_Transform * vec4(a_Vertex, 1.0);

  // Set the color of the vertex from the attribute VOB
  v_Color = a_Color;
}
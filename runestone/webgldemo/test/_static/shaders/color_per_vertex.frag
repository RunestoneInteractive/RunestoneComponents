// Fragment shader program
precision mediump int;
precision mediump float;

varying vec4 v_Color;

void main() {
  gl_FragColor = v_Color;
}

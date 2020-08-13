<template>
  <div class="page">
    <h3>WebGL</h3>
    <canvas class="canvas sqaure" ref="canvas"></canvas>
  </div>
</template>

<script>
import webglMixin from '../../mixins/webgl.js';

const vertexShaderSource = `
  attribute vec2 position;
  varying vec3 color;
  void main() {
    gl_PointSize = 1.0;
    color = vec3(0.5 + position * 0.5, 0.0);
    gl_Position = vec4(position, 1.0, 2.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec3 color;
  void main() {
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default {
  mixins: [webglMixin],
  mounted() {
    const canvas = this.$refs.canvas;
    this.gl = this.init(canvas);
    const vertexShader = this.compileVertexShader(vertexShaderSource, this.gl);
    const fragmentShader = this.compileFragmentShader(fragmentShaderSource, this.gl);
    this.program = this.createProgram(this.gl, vertexShader, fragmentShader);
    // this.drawTriangle(this.gl);
    this.drawRect(this.gl);
  },
  methods: {
    drawTriangle(gl) {
      const points = new Float32Array([
        0, 1,
        -1, -1,
        1, -1
      ]);
      this.bindArrayBufferData(gl, points);
      const vPosition = gl.getAttribLocation(this.program, 'position');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
    },
    drawRect(gl) {
      const points = new Float32Array([
        -1, 1,
        1, -1,
        1, 1,
        -1, 1,
        1, -1,
        -1, -1,
      ]);
      this.bindArrayBufferData(gl, points);
      const vPosition = gl.getAttribLocation(this.program, 'position');
      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
    }
  }
}
</script>

<style scoped>
</style>
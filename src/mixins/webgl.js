export const VIEWBOX_WIDTH =  window.innerHeight * 0.7;
export const VIEWBOX_HEIGHT = window.innerHeight * 0.7;
export default {
  methods: {
    init(canvas) {
      canvas.width = VIEWBOX_WIDTH;
      canvas.height = VIEWBOX_HEIGHT;
      const ctx = canvas.getContext('webgl');
      return ctx;
    },
    compileVertexShader(source, gl) {
      return this.compileShader(source, gl, gl.VERTEX_SHADER);
    },
    compileFragmentShader(source, gl) {
      return this.compileShader(source, gl, gl.FRAGMENT_SHADER);
    },
    compileShader(source, gl, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    },
    createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
      return program;
    },
    bindArrayBufferData(gl, data) {
      const bufferId = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      return bufferId;
    }
  },
}
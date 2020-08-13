<template>
  <div class="page">
    <h3>Canvas Hierarchy</h3>
    <canvas class="canvas square" :class="{ 'node--crossed': crossedNode }" ref="canvas"></canvas>
  </div>
</template>

<script>
import hierarchyMixin, { VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from '../mixins/hierarchy';

export default {
  mixins: [hierarchyMixin],
  data() {
    return {
      mouse: {
        x: VIEWBOX_WIDTH, // 初始化设置足够大
        y: VIEWBOX_HEIGHT, // 初始化设置足够大
      },
      crossedNode: undefined,
      leafNodes: [],
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    async draw() {
      const data = await this.fetchData();
      this.root = this.pack(data);
      this.ctx = this.init();
      this.drawHierarchy(this.ctx, this.root);
      this.attachEventListeners();
    },
    drawHierarchy(ctx, node, { fillStyle = 'rgba(0, 0, 0,0.2)', activeFillStyle = 'red', textColor = 'white' } = {}) {
      const { x, y, r, children } = node;
      const isMouseover = node === this.crossedNode;
      ctx.save();
      ctx.fillStyle = isMouseover ? activeFillStyle : fillStyle;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, 2 * Math.PI);
      ctx.fill();
      if (Array.isArray(children)) {
        children.forEach(childNode => this.drawHierarchy(ctx, childNode));
      } else {
        const name = node.data.name;
        const fillStyle = textColor;
        ctx.fillStyle = fillStyle;
        ctx.font = '1.5em Arial';
        ctx.textAlign = 'center'; // 文本水平居中
        ctx.textBaseline = 'middle'; // 文本垂直居中
        ctx.fillText(name, x, y);
        this.leafNodes.push(node);
      }
      ctx.restore();
    },
    init() {
      const canvas = this.$refs.canvas;
      if (canvas) {
        canvas.width = VIEWBOX_WIDTH;
        canvas.height = VIEWBOX_HEIGHT;
        const ctx = canvas.getContext('2d');
        return ctx;
      }
    },
    attachEventListeners() {
      const { canvas } = this.ctx;
      const { x, y, width, height } = canvas.getBoundingClientRect();
      canvas.addEventListener('mousemove', e => {
        const { x: mouseX, y: mouseY } = e;
        // 鼠标与canvas交叉时才进行计算
        if (e.path.includes(canvas)) {
          if (mouseX > x && mouseX < (x + width) && mouseY > y && mouseY < (y + height)) {
            this.mouse.x = mouseX;
            this.mouse.y = mouseY;
            const mouseCanvasCoords = this.screenToCanvas(this.mouse, canvas);
            const crossedNode = this.isCrossNodes(this.leafNodes, mouseCanvasCoords);
            if (crossedNode !== this.crossedNode) {
              this.crossedNode = crossedNode;
              // 交叉节点改变，重绘
              this.ctx.clearRect(0, 0, VIEWBOX_WIDTH, VIEWBOX_HEIGHT);
              this.drawHierarchy(this.ctx, this.root);
            }
          }
        }
      });
    },
    isCrossNodes(nodes, coord) {
      const foundNode = nodes.find(node => {
        return this.isCross(coord, node);
      });
      return foundNode;
    },
    screenToCanvas(point, canvas) {
      const { width: canvasWidth, height: canvasHeight } = canvas;
      const { x, y, width, height } = canvas.getBoundingClientRect();
      const ratioX = width / canvasWidth;
      const ratixY = height / canvasHeight;
      return {
        x: (point.x - x) / ratioX,
        y: (point.y - y) / ratixY,
      }
    },
    isCross(coord, node) {
      const { x, y, r } = node;
      const { x: xCoord, y: yCoord } = coord;
      const d = Math.sqrt((xCoord - x) ** 2 + (yCoord - y) ** 2);
      return d < r;
    }
  }
}
</script>

<style scoped>
  .node--crossed {
    cursor: pointer;
  }
</style>
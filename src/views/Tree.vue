<template>
  <div>
    <h3>Tree(Canvas)</h3>
    <canvas class="canvas a4" ref="canvas"></canvas>
  </div>
</template>

<script>
import Vector2D from '../utils/Vector2D';

export default {
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const canvas = this.$refs.canvas;
      canvas.width = 425;
      canvas.height = 250;
      if (canvas) {
        const v0 = new Vector2D(0, 0);
        const thickness = 10;
        const dir = Math.PI / 2;
        const length = 36;
        const bais = 3;
        const ctx = canvas.getContext('2d');
        ctx.translate(canvas.width / 2, canvas.height);
        ctx.scale(1, -1);
        ctx.lineCap = 'round';
        this.drawBranchs(ctx, v0, dir, length, thickness, bais);
      }
    },
    drawBranchs(ctx, v0, dir, length, thickness, bais) {
      const v = new Vector2D(1, 0).rotate(dir).scale(length);
      const v1 = v0.copy().add(v);
      ctx.save();
      ctx.lineWidth = thickness;
      ctx.strokeStyle = '#795a14'
      ctx.beginPath();
      ctx.moveTo(v0.x, v0.y);
      ctx.lineTo(v1.x, v1.y);
      ctx.stroke();
      ctx.restore();
      if (thickness > 2) {
        const left = (dir + 0.2) * 0.5 + Math.PI / 4 + bais * (Math.random() - 0.5);
        this.drawBranchs(ctx, v1, left, length * 0.9, thickness * 0.8, bais * 0.9);
        const right = (dir - 0.2) * 0.5 + Math.PI / 4 + bais * (Math.random() - 0.5);
        this.drawBranchs(ctx, v1, right, length * 0.9, thickness * 0.8, bais * 0.9);
      }
      
      if(thickness < 4 && Math.random() < 0.3) {
        ctx.save();
        ctx.strokeStyle = '#c72c35';
        const th = Math.random() * 6 + 3;
        ctx.lineWidth = th;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v1.x, v1.y - 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}
</script>
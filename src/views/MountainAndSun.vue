<template>
  <div class="page">
    <h3>Mountain And Sun(Canvas)</h3>
    <canvas class="canvas a4" ref="canvas"></canvas>
  </div>
</template>

<script>
import rough from 'roughjs/bundled/rough.esm';

export default {
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      const canvas = this.$refs.canvas;
      canvas.width = 425;
      canvas.height = 250;
      console.log(rough);
      
      const rc = rough.canvas(canvas);
      const ctx = rc.ctx;
      // 坐标原点定位到中下
      ctx.translate(canvas.width / 2, canvas.height);
      // y轴反向朝上
      ctx.scale(1, -1);

      rc.path('M-180 0L-80 100L20 0', { fill: 'rgb(0, 155, 0)', roughness: 1.8 });
      rc.path('M180 0L80 100L-20 0', { fill: 'rgb(0, 255, 0)', roughness: 2.8 });
      rc.circle(0, 150, 100, { fill: 'yellow', roughness: 1.8 })
    }
  }
}
</script>

<style scoped>
</style>
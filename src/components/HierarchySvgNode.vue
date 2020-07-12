<template>
  <g class="hierarchy-svg-node" :class="{ 'is-leaf': !hasChildren }">
    <circle :cx="node.x" :cy="node.y" :r="node.r">
    </circle>
    <template v-if="hasChildren">
      <hierarchy-svg-node v-for="(child, index) in node.children" :key="index" :node="child"></hierarchy-svg-node>
    </template>
    <text class="text" v-else :x="node.x" :y="node.y">{{ node.data.name }}</text>
  </g>
</template>

<script>
export default {
  name: 'HierarchySvgNode',
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasChildren() {
      return Array.isArray(this.node.children);
    }
  }
}
</script>

<style>
  .hierarchy-svg-node.is-leaf {
    cursor: pointer;
  }
  .hierarchy-svg-node.is-leaf:hover {
    fill: red;
  }
  .text {
    font-size: 1.5em;
    font-family: Arial, Helvetica, sans-serif;
    fill: white;
    /* 文本水平居中 */
    text-anchor: middle;
    /* 文本垂直居中 */
    dominant-baseline: middle;
  }
</style>
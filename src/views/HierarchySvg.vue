<template>
  <div class="page">
    <h3>Svg Hierarchy</h3>
    <svg class="svg square" :viewBox="`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`" :width="VIEWBOX_WIDTH" :height="VIEWBOX_HEIGHT" xmlns="http://www.w3.org/2000/svg" fill="rgba(0,0,0,0.2)">
      <hierarchy-svg-node v-if="root" :node="root"></hierarchy-svg-node>
    </svg>
  </div>
</template>

<script>
import hierarchyMixin, { VIEWBOX_WIDTH, VIEWBOX_HEIGHT } from '../mixins/hierarchy';
import HierarchySvgNode from '../components/HierarchySvgNode';

export default {
  mixins: [hierarchyMixin],
  components: {
    HierarchySvgNode,
  },
  data() {
    return {
      VIEWBOX_WIDTH,
      VIEWBOX_HEIGHT,
      data: null,
      root: null,
    };
  },
  async created() {
    this.data = await this.fetchData();
    this.root = this.pack(this.data);
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
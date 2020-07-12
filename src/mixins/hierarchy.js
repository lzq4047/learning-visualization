import { hierarchy, pack as d3Pack } from 'd3-hierarchy';
export const VIEWBOX_WIDTH = 1600;
export const VIEWBOX_HEIGHT = 1600;
export default {
  methods: {
    async fetchData() {
      const dataSource = 'https://s5.ssl.qhres.com/static/b0695e2dd30daa64.json'
      const res = await fetch(dataSource);
      const json = await res.json();
      console.log(json);
      return json;
    },
    pack(data) {
      const regions = hierarchy(data)
        .sum(() => 1)
        .sort((a, b) => b.value - a.value);
      const pack = d3Pack()
        .size([VIEWBOX_WIDTH, VIEWBOX_HEIGHT])
        .padding(3);
      const root = pack(regions);
      return root;
    },
  },
}
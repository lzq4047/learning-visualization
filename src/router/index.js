import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import HierarchyCanvas from "../views/HierarchyCanvas.vue";
import HierarchySvg from "../views/HierarchySvg.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/hierarchy/canvas",
    name: "hierarchyCanvas",
    component: HierarchyCanvas,
  },
  {
    path: "/hierarchy/svg",
    name: "HierarchySvg",
    component: HierarchySvg,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

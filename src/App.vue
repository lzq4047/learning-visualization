<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> | -->
      <router-link to="/hierarchy/canvas">Canvas Hierarchy</router-link> |
      <router-link to="/hierarchy/svg">Svg Hierarchy</router-link> |
      <router-link to="/webgl/base-render">WebGL Base Render</router-link> |
      <router-link to="/mountaion-and-sun/canvas">Mountain And Sun</router-link> |
      <router-link to="/tree/canvas">Tree</router-link> |
      <!-- <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.canvas.a4,
.svg.a4 {
  width: 842px;
  height: 595px;
}

.canvas.square,
.svg.square {
  width: 80vh;
  height: 80vh;
}
</style>

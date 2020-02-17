<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body,
html {
  height: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  padding: 0;
  margin: 0;
}
body {
  width: 100%;
  font-size: 12px;
  -webkit-user-select: none;
  box-sizing: border-box;
  font-family: "微软雅黑";
  overflow: hidden;
}
h1,
h2 {
  font-weight: normal;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
    <!-- v-show="$route.meta.showFooter" -->
    <FooterGuide></FooterGuide>
  </div>
</template>

<script>
// 底部tab组件
import FooterGuide from "./components/FooterGuide.vue";

export default {
  components: {
    FooterGuide,
  },
};
</script>

<style lang="less" scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
}
</style>

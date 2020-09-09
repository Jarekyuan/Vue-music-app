<template>
  <div id="app" @touchmove.prevent>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <!-- v-show="$route.meta.showFooter" -->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>

    <Player></Player>
  </div>
</template>

<script>
// 底部tab组件
import FooterGuide from "./components/FooterGuide.vue";
import Player from './components/Player/Player'

export default {
  components: {
    FooterGuide,
    Player
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

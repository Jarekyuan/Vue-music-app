<template>
  <transition name="slide">
    <div class="detail">
      <SingerSongs :title="title" :bg-img="bgImg" :singersongs="singersongs"></SingerSongs>
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import SingerSongs from "./SingerSongs";

export default {
  computed: {
    // 读取歌手歌曲
    ...mapState(["singersongs"]),
    // 获取歌手名字
    title() {
      return this.$route.params.name;
    },
    // 获取歌手图片
    bgImg() {
      return this.$route.params.bgImg;
    },
    // id
    id() {
      return this.$route.params.id;
    },
  },

  mounted() {
    // 初始化获取歌手歌曲
    // let mid = this.id;
    // this.$store.dispatch("getSingerSongs", mid);
  },

  // 监听点击的这个title有值，则获取该title歌曲
  watch: {
    title(val) {
      clearTimeout(this.timer)
      let mid = this.id;
      this.timer = setTimeout(() => {
        this.$store.dispatch("getSingerSongs", mid);
      },20);
    },
  },
  components: {
    SingerSongs,
  },
};
</script>

<style lang="less" scoped>
&.slide-enter-active,
&.slide-leave-active {
  transition: all 0.2s;
}
&.slide-enter,
&.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.detail {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>


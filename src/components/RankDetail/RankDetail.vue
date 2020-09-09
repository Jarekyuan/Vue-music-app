<template>
  <div class="detail">
    <SingerSongs :title="title" :bgImg="pic" :singersongs="disc" :rank="rank"></SingerSongs>
  </div>
</template>


<script>
import { mapState } from "vuex";
import SingerSongs from "../SingerDetail/SingerSongs";

export default {
  data() {
    return {
      // 定义打开的是排行榜的详情页，传rank，得到该详情页的样式
      rank: true,
    };
  },
  computed: {
    // 读取歌手歌曲
    ...mapState(["disc"]),
    title() {
      return this.$route.params.name;
    },
    pic() {
      return this.$route.params.pic;
    },
    // id
    id() {
      return this.$route.params.id;
    },
  },

  mounted() {
    // 初始化
    let id = this.id;
    this.$store.dispatch("getDiscSongs", id);
  },

  watch: {
    title(val) {
      let id = this.id;
      this.$store.dispatch("getDiscSongs", id);
    },
  },
  components: {
    SingerSongs,
  },
};
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 998;
  top: 0px;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #fafafa;
}
</style>


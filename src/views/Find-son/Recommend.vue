<template>
  <div>
    <div class="wrapper-sroll">
      <div class="first">
        <!-- ----------------------轮播图部分 --------------------------->
        <nav class="wrapper">
          <swiper :options="swiperOption" v-if="banners.length > 0">
            <swiper-slide :key="index" v-for="(banner, index) in banners">
              <img :src="banner.imageUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </nav>

        <!-- ------------------------推荐歌单部分---------------------- -->
        <Songs :songList="songList" :newSongs="newSongs"></Songs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";


// 轮播图
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "../../../node_modules/swiper/swiper-bundle.min.css";

import Songs from "../../components/Recommend/Songs.vue";

export default {
  data() {
    return {
      observer: true,
      // 轮播图组件
      swiperOptions: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: true,
      },
    };
  },

  computed: {
    ...mapState(["banners", "songList", "newSongs"]),
  },

  mounted() {
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getSongLists");
    this.$store.dispatch("getNewSongs");
  },

 /*  watch: {
    newSongs(val) {
      this.$nextTick(() => {
        new BScroll('.wrapper-sroll',{
          click: true
        })
      })
    }
  }, */

  components: {
    Swiper,
    SwiperSlide,
    Songs,
  },
};
</script>

<style lang="stylus" scoped>
// 穿透 所有在.wrapper下面的.swiper-pagination-bullet-active更改小圆点的背景颜色
.wrapper {
  margin-top: 20px;
  height: auto;
  background: #fff;
}

.wrapper>>> .swiper-pagination-bullet-active {
  background: #fff;
}

img {
  width: 100%;
  height: auto;
}
</style>

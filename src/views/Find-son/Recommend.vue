<template>
  <div>
    <!-- BScroll -->
    <div class="scroll-con">
      <div class="first">
        <!-- ----------------------轮播图部分 --------------------------->
        <nav class="banner">
          <swiper :options="swiperOptions" v-if="banners.length > 0">
            <swiper-slide :key="index" v-for="(banner, index) in banners">
              <img :src="banner.imageUrl" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </nav>

        <!-- ---------------------推荐歌单部分-------------------------- -->
        <div>
          <!-- 歌单部分 -->
          <div class="gedan">
            <div class="text-header">
              <span class="left">推荐歌单</span>
              <span class="right fr">更多></span>
            </div>
            <div class="gedan-con">
              <ul>
                <li
                  class="gedan-con-item"
                  v-for="(item, index) in songList"
                  :key="index"
                  @click="selectItem(item)"
                >
                  <img v-lazy="item.picUrl" />
                  <span>{{item.name}}</span>
                  <div class="play-number">{{item.playCount | formatCount}}</div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 新碟部分 -->
          <div class="newsong">
            <div class="text-header">
              <span class="left">新碟</span>
              <span class="right fr">更多></span>
            </div>
            <div class="gedan-con">
              <ul>
                <li
                  class="gedan-con-item"
                  v-for="(item, index) in newSongs"
                  :key="index"
                  @click="selectItem(item)"
                >
                  <img v-lazy="item.blurPicUrl" />
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- mv部分 -->
        <div class="homemv">
          <div class="text-header">
            <span class="left">推荐MV</span>
            <span class="right fr">更多></span>
          </div>
          <div class="mv-con">
            <ul>
              <li class="mv-con-item" v-for="(item, index) in homeMv" :key="index">
                <img v-lazy="item.picUrl" />
                <span>{{item.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 当还数据没全的时候显示loading组件 -->
      <div class="loading-con" v-show="!newSongs.length">
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

// 轮播图
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "../../../node_modules/swiper/swiper-bundle.min.css";
// Bs滑动
import BScroll from "better-scroll";
// loading
import Loading from "../../components/base/Loading";

export default {
  data() {
    return {
      // 轮播图组件
      swiperOptions: {
        pagination: ".swiper-pagination",
        loop: true,
        autoplay: true,
      },
    };
  },

  computed: {
    ...mapState(["banners", "songList", "newSongs", "homeMv"]),
  },

  mounted() {
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getSongLists");
    this.$store.dispatch("getNewSongs");
    this.$store.dispatch("getHomeMv");
  },

  methods: {
    // 点击跳转详情页
    selectItem(item) {
      this.$router.push({
        name: "discDetail",
        params: {
          id: item.id,
          name: item.name,
          pic: item.picUrl
        },
      });
    },
  },

  // 过滤 播放量数量变为‘万’计数
  filters: {
    formatCount(v) {
      if (v < 9999) {
        return v;
      } else if (10000 < v && v < 99999999) {
        return (v / 10000).toFixed(0) + "万";
      } else {
        return (v / 100000000).toFixed(0) + "亿";
      }
    },
  },

  watch: {
    songList(val) {
      this.$nextTick(() => {
        this.bs1 = new BScroll(".scroll-con", {
          click: true,
        });
      });
    },
  },

  components: {
    Swiper,
    SwiperSlide,
    Loading,
  },
};
</script>

<style lang="less" scoped>
// 穿透 所有在.wrapper下面的.swiper-pagination-bullet-active更改小圆点的背景颜色

// 记得给外层的加大小
.scroll-con {
  width: 100%;
  position: fixed;
  top: 95px;
  bottom: 50px;
  // height: auto;
  overflow: hidden;
}
// 内层的大小
.first {
  width: 100%;
  height: auto;
}

.banner {
  width: 90%;
  // height: 140px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  img {
    width: 100%;
    height: auto;
  }
}

.text-header {
  margin-top: 18px;
  .left {
    font-weight: 600;
    padding-left: 10px;
  }
  .right {
    font-size: 14px;
    padding-right: 10px;
  }
}

.gedan-con {
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 10px 0 0 0;
    li {
      justify-content: space-around;
      margin-bottom: 7px;
      position: relative;

      img {
        width: 117px;
        height: 117px;
      }
      span {
        display: block;
        width: 114px;
        line-height: 16px;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        font-size: 12px;
      }
      .play-number {
        position: absolute;
        top: 0;
        left: 0;
        width: 117px;
        height: 24px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        text-align: right;
        font-size: 12px;
        line-height: 24px;
      }
    }
  }
}

.mv-con {
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 10px 0 0 6px;
    li {
      width: 50%;
      justify-content: space-around;
      margin-bottom: 7px;
      position: relative;

      img {
        margin: 0 auto;
        width: 175px;
        height: 110px;
      }
      span {
        display: block;
        width: 114px;
        line-height: 16px;
        white-space: pre-wrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        font-size: 12px;
      }
    }
  }
}

// loading
.loading-con {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>

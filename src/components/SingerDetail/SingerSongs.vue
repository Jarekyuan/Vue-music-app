<template>
  <div>
    <!-- 头部歌手信息 -->
    <div class="header">
      <div class="back iconfont icon-fanhui" @click="goBack"></div>
      <h1 class="title" v-html="title"></h1>
    </div>

    <!-- 歌手歌曲列表 -->
    <Scroll :list="singersongs" :top="0" :bottom="8" v-show="singersongs.length > 0">
      <div class="con-wrapper" ref="conwrapper">
        <div class="cover"></div>
        <!-- 图片 -->
        <div class="bgimg" :style="bgStyle"></div>
        <!-- 全部播放 -->
        <div class="play-model" v-show="singersongs">
          <div class="play-content" @click="playAll">
            <span class="iconfont icon-bofang"></span>
            <span class="text">播放全部</span>
          </div>
        </div>
        <!-- 歌曲列表 -->
        <ComSongList :singersongs="singersongs" :rank="rank" @select="selectItem"></ComSongList>
      </div>
    </Scroll>

    
    <!-- 当还数据没全的时候显示loading组件 -->
    <div class="loading-con" v-show="singersongs.length === 0">
      <Loading></Loading>
    </div>
  </div>
</template>


<script>
import Loading from "../base/Loading";
import { mapActions } from "vuex";
import ComSongList from "../base/ComSongList";
import Scroll from "../base/Scroll";

export default {
  // 获取父组件数据
  props: ["title", "bgImg", "singersongs", "rank"],

  computed: {
    // 处理背景图片
    bgStyle() {
      return `background-image: url(${this.bgImg})`;
    },
  },

  methods: {
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    // 全部播放
    playAll() {
      this.allPlay({
        playList: this.singersongs,
        positiveList: this.singersongs,
      });
    },

    // ***点击进入播放器，为“selectPlay”传参数 playList, positiveList, currentIndex
    //         item为这首歌，  index为正序这首歌的序号
    selectItem(item, index) {
      this.selectPlay({
        playList: this.singersongs,
        positiveList: this.singersongs,
        currentIndex: index,
      });
    },
    // 获取 selectPlay
    ...mapActions(["selectPlay", "allPlay"]),
  },

  components: {
    ComSongList,
    Scroll,
    Loading,
  },
};
</script>


<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  z-index: 99;
  background-color: #aaa;
  opacity: 0.8;
  .back {
    position: absolute;
    top: 10px;
    left: 15px;
    font-size: 20px;
    font-weight: 900;
    color: #1a3bf9;
    z-index: 101;
  }
  .title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%);
    z-index: 40;
    width: 60%;
    text-align: center;
    line-height: 40px;
    font-size: 20px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
    z-index: 101;
  }
}

.con-wrapper {
  margin-top: 0px;
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 262px;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 10;
  }
  .bgimg {
    width: 100%;
    height: auto;
    background-size: cover;
    padding-top: 70%;
  }
  .play-model {
    margin-top: 15px;
    margin-bottom: 15px;
    height: 30px;
    display: flex;
    justify-content: center;
    text-align: center;
    line-height: 30px;
    .play-content {
      width: 150px;
      height: 30px;
      color: #1a73e8;
      border: 1px solid #1a73e8;
      border-radius: 10px;
      .iconfont {
        font-size: 18px;
      }
      .text {
        display: inline-block;
        margin-left: 8px;
        font-size: 18px;
      }
    }
  }
}
// loading
.loading-con {
  position: absolute;
  width: 100%;
  top: 70%;
  z-index: 999;
}
</style>

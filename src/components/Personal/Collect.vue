<template>
  <div>
    <transition name="slide">
      <div class="collect-detail" v-show="showFlag">
        <!-- 头部 -->
        <div class="header">
          <h1 class="title">我的喜欢</h1>
          <i class="iconfont icon-fanhui" @click.stop="hide"></i>
        </div>
        <!-- 全部播放 -->
        <div class="play-model" v-show="collects.length>0">
          <div class="play-content" @click.stop="playAll">
            <span class="iconfont icon-bofang"></span>
            <span class="text">播放全部</span>
          </div>
        </div>
        <!-- 数量 -->
        <div class="num">
          <span>共 {{collects.length}} 首喜欢的音乐</span>
        </div>
        <!-- 列表 -->
        <div class="shortcut" @click.stop>
          <div class="list-wrapper">
            <div class="list-scroll">
              <Scroll :list="collects" :top="135">
                <ul class="list-inner">
                  <li
                    class="item"
                    v-for="(item,index) in collects"
                    :key="index"
                    @click="selectItem(item,index)"
                  >
                    <h2>{{item.name}}</h2>
                    <p v-if="item.ar">{{item.ar[0].name}}</p>
                    <p v-if="item.artists">{{item.artists[0].name}}</p>
                  </li>
                </ul>
              </Scroll>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import {mapActions} from "vuex"
import Scroll from "../base/Scroll";

export default {
  props: ["collects"],
  data() {
    return {
      showFlag: false,
    };
  },
  computed: {},
  mounted() {},
  methods: {
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },

    // 选择
    selectItem(item, index) {
      this.selectPlay({
        playList: this.collects,
        positiveList: this.collects,
        currentIndex: index,
      });
    },
    // 全部播放
    playAll() {
      this.allPlay({
        playList: this.collects,
        positiveList: this.collects,
      });
    },

    // ----------------------获取
    ...mapActions(["selectPlay", "allPlay"]),
  },
  components: {
    Scroll,
  },
};
</script>


<style scoped lang="less">
&.slide-enter-active,
&.slide-leave-active {
  transition: all 0.3s;
}
&.slide-enter,
&.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

.collect-detail {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 998;
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  .header {
    width: 100%;
    height: 50px;
    margin: 0, auto;
    position: relative;
    z-index: 999;
    .title {
      text-align: center;
      line-height: 50px;
      font-size: 20px;
      color: #1a73e8;
      font-weight: 600;
    }
    .iconfont {
      position: absolute;
      top: 16px;
      left: 15px;
      font-size: 20px;
      color: #1a73e8;
      font-weight: 600;
    }
  }

  .play-model {
    margin-top: 15px;
    margin-bottom: 8px;
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
        margin-left: 17px;
        font-size: 18px;
      }
    }
  }
  .num {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 20px;
    font-size: 14px;
    color: #444;
  }

  .shortcut {
    width: 100%;
    margin-top: 30px;

    .list-wrapper {
      overflow: hidden;
      .list-scroll {
        width: 100%;
        height: auto;

        .item {
          width: 80%;
          padding: 7px 0 7px 30px;

          h2 {
            font-size: 17px;
            margin-bottom: 6px;
            color: #000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p {
            font-size: 14px;
            color: #999;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

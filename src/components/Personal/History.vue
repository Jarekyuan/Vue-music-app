<template>
  <div>
    <transition name="slide">
      <!-- 加动画 -->
      <div class="history-detail" v-show="showFlag">
        <div class="header">
          <h1 class="title">历史记录</h1>
          <i class="iconfont icon-fanhui" @click.stop="hide"></i>
        </div>

        <div class="switche">
          <div class="play" @click="playIndex" :class="{on:currentIndex===0}">最近播放</div>
          <div class="search" @click="searchIndex" :class="{on:currentIndex===1}">搜索历史</div>
        </div>

        <div class="shortcut" @click.stop>
          <div class="list-wrapper">
            <!-- 播放历史 -->
            <div class="list-scroll" v-if="currentIndex === 0">
              <Scroll :list="playHistory" :top="100">
                <ul class="list-inner">
                  <li
                    class="item"
                    v-for="(item,index) in playHistory"
                    :key="index"
                    @click="selectItem(item,index)"
                  >
                    <h2>{{item.name}}</h2>
                    <!-- 数据结构问题 -->
                    <p v-if="item.ar">{{item.ar[0].name}}</p>
                    <p v-if="item.artists">{{item.artists[0].name}}</p>
                    <!-- <p v-if="item.al">{{item.al.name}}</p> -->
                  </li>
                </ul>
              </Scroll>
            </div>

            <!-- 搜索历史 -->
            <div class="list-scroll" v-if="currentIndex === 1">
              <ul class="list-inner">
                <li class="item" v-for="(item,index) in searchHistory" :key="index">
                  <div class="search-content">
                    <span class="text">{{item}}</span>
                    <i class="iconfont icon-shanchu1" @click.stop="deleteOne(item)"></i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
import { mapActions } from "vuex";
import Scroll from "../base/Scroll";

export default {
  // 接收父组件数据
  props: ["playHistory", "searchHistory"],

  data() {
    return {
      showFlag: false,
      currentIndex: 0,
    };
  },
  computed: {
    // 歌手详情
    // getName(item) {
    //   return `${} . ${item.al.name}`;
    // },
  },

  methods: {
    // 标志位控制显示隐藏
    show() {
      this.showFlag = true;
    },
    hide() {
      this.showFlag = false;
    },
    playIndex() {
      this.currentIndex = 0;
    },
    searchIndex() {
      this.currentIndex = 1;
    },

    // 选择
    selectItem(item, index) {
      this.selectPlay({
        playList: this.playHistory,
        positiveList: this.playHistory,
        currentIndex: index,
      });
    },

    // 删除历史
    deleteOne(item) {
      this.delSearchHistory(item);
    },
    // 获取 selectPlay
    ...mapActions(["selectPlay", "delSearchHistory"]),
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

.history-detail {
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

  .switche {
    width: 100%;
    height: 30px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    .play {
      width: 100px;
      height: 22px;
      border: 2px solid #aaa;
      text-align: center;
      line-height: 22px;
      border-radius: 7px 0 0 7px;
      color: #666;
      font-weight: 600;
    }
    .play {
      border-right: 0;
    }
    .search {
      width: 100px;
      height: 22px;
      border: 2px solid #aaa;
      text-align: center;
      line-height: 22px;
      border-radius: 0 7px 7px 0;
      color: #666;
      font-weight: 600;
    }
    .on {
      background-color: #bbb;
      color: #333;
    }
  }

  .shortcut {
    width: 100%;
    margin-top: 20px;

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
          .icon-shanchu1 {
            float: right;
            font-weight: 600;
            color: #333;
          }
        }
      }
    }
  }
}
</style>

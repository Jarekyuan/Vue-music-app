<template>
  <!-- 播放器 -->
  <div class="player" v-show="playList">
    <transition name="normal">
      <!-- 全屏播放器 -->
      <div class="normal-player" v-show="fullPlay">
        <!-- 1.背景 -->
        <div class="background" v-if="currentSong.al">
          <img class="image" :src="currentSong.al.picUrl" />
        </div>
        <div class="background" v-else>
          <img class="image" src="../../assets/img/bgimg.png" />
        </div>

        <!-- 2.上部分 -->
        <div class="top">
          <div class="back" @click="back">
            <i class="iconfont icon-xia"></i>
          </div>
          <div class="share">
            <i class="iconfont icon-fenxiang"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <div class="singer" v-if="currentSong.ar">
            <!-- ：点击歌手跳转到歌手歌曲页 -->
            <h2 class="subtitle" v-html="currentSong.ar[0].name"></h2>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div class="singer" v-else-if="currentSong.artists">
            <!-- ：点击歌手跳转到歌手歌曲页 -->
            <h2 class="subtitle" v-html="currentSong.artists[0].name"></h2>
            <i class="iconfont icon-youjiantou"></i>
          </div>
        </div>

        <!-- 3.中间部分 -->
        <div class="middle" @click="changeShow">
          <!-- ------左 cd旋转碟片 ------ -->
          <transition name="show">
            <div class="middle-l" ref="middleL" v-show="currentShowCD === true">
              <div class="cd-wrapper" ref="cdWrapper">
                <!-- 1 -->
                <div class="cd" :class="cdCls" v-if="currentSong.al">
                  <img class="image" :src="currentSong.al.picUrl" />
                </div>
                <!-- 2 -->
                <div class="cd" :class="cdCls" v-else-if="currentSong.artists">
                  <img class="image" :src="currentSong.artists[0].img1v1Url" />
                </div>
                <div class="playing-lyric-wrapper">
                  <div class="playing-lyric">{{playingWords}}</div>
                </div>
              </div>
            </div>
          </transition>

          <!-- -----右 歌词部分 ------ -->
          <transition name="show">
            <BScroll
              class="middle-r"
              ref="lyricList"
              :data="currentWords && currentWords.lines"
              v-show="currentShowCD === false"
            >
              <div class="lyric-wrapper">
                <div v-if="currentWords">
                  <p
                    ref="lyricLine"
                    class="text"
                    :class="{'high-current': currentLineNum === index}"
                    v-for="(line,index) in currentWords.lines"
                    :key="index"
                  >{{line.txt}}</p>
                </div>
              </div>
            </BScroll>
          </transition>
        </div>

        <!-- 4.下部分 -->
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShowCD=== true}"></span>
            <span class="dot" :class="{'active':currentShowCD=== false}"></span>
          </div>

          <!-- 进度条 -->
          <div class="progress-wrapper">
            <!-- 播放的进度时间 -->
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <!-- ***Progress-bar: 传百分比 percent； -->
              <ProgressBar :percent="percent"></ProgressBar>
            </div>
            <span class="time time-r">{{formatII(currentSong.dt)}}</span>
          </div>

          <!-- 操作 -->
          <div class="operators">
            <!-- 顺序/随机 -->
            <div class="icon i-left">
              <i class="iconfont" :class="iconMode" @click="changeMode"></i>
            </div>
            <!-- 上一首 -->
            <div class="icon i-left">
              <i class="iconfont icon-shangyishou" @click="prev"></i>
            </div>
            <!-- 播放/暂停 -->
            <div class="icon i-center">
              <i class="iconfont play" @click="playingChange" :class="playIcon"></i>
            </div>
            <!-- 下一首 -->
            <div class="icon i-right">
              <i class="iconfont icon-xiayishou" @click="next"></i>
            </div>
            <!-- 收藏  icon-like-fill  icon-xihuan-->
            <div class="icon i-right">
              <i
                class="iconfont"
                :class="getlikeIcon(currentSong)"
                @click="toggleCollect(currentSong)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <!-- 小播放器 -->
      <div class="mini-player" v-show="!fullPlay" @click="openFullplay">
        <div class="content" :class="cdCls" v-if="currentSong.al">
          <img :src="currentSong.al.picUrl" />
        </div>
        <div class="content" :class="cdCls" v-else>
          <img src="../../assets/img/bgimg.png" />
        </div>
      </div>
    </transition>

    <!-- ***播放器 audio: 1.ref控制watch中播放 2.src控制音乐url 3.@canplay 4.@error  -->
    <audio ref="audio" :src="songURL[0].url" v-if="songURL" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>


<script>
import { mapGetters, mapState, mapMutations } from "vuex";
// 进度条组件
import ProgressBar from "../base/Progress-bar";
// 歌词解析
import Lyric from "lyric-parser";
import BScroll from "../base/Scroll";

import { shuffle } from "../../assets/js/util";

export default {
  data() {
    return {
      // 播放经过的时间
      currentTime: 0,
      // 歌词
      currentWords: null,
      // 第n行歌词高亮
      currentLineNum: 0,
      // 切换cd和歌词显示
      currentShowCD: true,
      // cd页单行歌词
      playingWords: "",
    };
  },

  created() {
    // 定义移动端滑动变量
    this.touch = {};
  },

  computed: {
    ...mapState([
      "fullPlay",
      "playList",
      "playing",
      "mode",
      "positiveList",
      "songURL",
      "currentIndex",
      "songWords",
      "collects",
    ]),
    ...mapGetters(["currentSong"]),

    // 判断播放/暂停时候的 cd旋转或者静止
    cdCls() {
      return this.playing ? "play" : "play pause";
    },
    // 判断播放/暂停时候的 图标的样式
    playIcon() {
      return this.playing ? "icon-zanting" : "icon-bofang1";
    },
    // 判断播放模式， 0顺序，1循环，2随机
    iconMode() {
      return this.mode === 0
        ? "icon-liebiaoshunxu"
        : this.mode === 1
        ? "icon-xunhuan"
        : "icon-suijibofang";
    },
    // 计算播放的百分比
    percent() {
      return (this.currentTime * 1000) / this.currentSong.dt;
    },
  },

  methods: {
    // 1.------返回/打开  隐藏全局播放
    back() {
      this.setFullPlay({ flag: false });
    },
    openFullplay() {
      this.setFullPlay({ flag: true });
    },

    // 2.--------播放/暂停 状态
    playingChange() {
      this.setPlaying({ flag: !this.playing });
      if (this.currentWords) {
        this.currentWords.togglePlay();
      }
    },

    // 3.--------上一首/下一首
    prev() {
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playList.length - 1;
      }
      // 改变currentIndex的值
      this.setCurrentIndex({ currentIndex: index });
      //  bug：改变播放暂停状态
      if (!this.playing) {
        this.playingChange();
      }
    },
    next() {
      let index = this.currentIndex + 1;
      if (index === this.playList.length) {
        index = 0;
      }
      this.setCurrentIndex({ currentIndex: index });
      if (!this.playing) {
        this.playingChange();
      }
    },
    end() {
      this.next();
    },

    // 4.-----------播放时间进度
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    // 过滤时间
    format(interval) {
      interval = interval | 0; //取整
      const m = (interval / 60) | 0;
      const s = this.pad(interval % 60);
      return `${m}:${s}`;
    },
    formatII(interval) {
      interval = interval | 0; //取整
      const m = (interval / 60000) | 0;
      const s = this.pad(interval % 60);
      return `${m}:${s}`;
    },
    // 补全时间的0
    pad(num, n = 2) {
      let len = num.toString().length;
      while (len < n) {
        num = "0" + num;
        len++;
      }
      return num;
    },

    // 5.----------显示解析后的歌词  new Lyric 对象
    getWords() {
      // Lyric解析歌词
      this.currentWords = new Lyric(this.songWords.lyric, this.handleWords);
      // play()
      if (this.playing) {
        this.currentWords.play();
      }
    },
    // 歌词每一行结束后，回调函数显示高亮的行数
    handleWords({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      // 前5行不滚动，保证正在播放的行在屏幕中间
      if (lineNum > 5) {
        let P = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(P, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
      this.playingWords = txt;
    },

    // 6.---------点击显示cd碟片或者歌词
    changeShow() {
      this.currentShowCD = !this.currentShowCD;
    },

    // 7----------点击切换播放模式
    changeMode() {
      let mode = (this.mode + 1) % 3;
      this.setMode({ mode: mode });
    },

    // 8---------喜欢的图标样式
    isLike(currentSong) {
      const index = this.collects.findIndex((item) => {
        return item.id === currentSong.id;
      });
      return index >= 0;
    },
    getlikeIcon(currentSong) {
      if (this.isLike(currentSong)) {
        return "icon-like-fill";
      } else {
        return "icon-xihuan";
      }
    },
    toggleCollect(currentSong) {
      if (this.isLike(currentSong)) {
        this.$store.dispatch("delCollect", currentSong);
      } else {
        this.$store.dispatch("saveCollect", currentSong);
      }
    },

    // --------------------------------------------------------------------------------
    // --------------在方法最后更改 fullPlay 的值来隐藏全局播放 [注意] 参数类型 {flag:false}
    ...mapMutations({
      setFullPlay: "SET_FULLPLAY",
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX",
      setMode: "SET_MODE",
    }),
  },

  // =======================================================================================
  watch: {
    // 监听点击歌曲后，currentSong有值时，传id获取songURL和songWords
    currentSong(val) {
      let id = this.currentSong.id;
      let currentSong = this.currentSong;
      this.$nextTick(() => {
        // 获取歌曲id，获取音乐url
        this.$store.dispatch("getSongsURL", id);
        // 获取歌曲id，获取音乐歌词
        this.$store.dispatch("getSongsWords", id);
        // 播放历史
        this.$store.dispatch("savePlayHistory", currentSong);
      });
    },

    // 获取到音乐时，播放音乐
    songURL(val) {
      // 播放音乐
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audio.play();
      }, 20);
    },

    // 获取到歌词时，显示歌词，播放音乐
    songWords(val) {
      // bug：重新获取下一行的时候，先清空之前创建的对象
      //  在播放/暂停的时候调用 togglePlay()
      if (this.currentWords) {
        this.currentWords.stop();
      }
      // 获取歌词
      clearTimeout(this.timer);
      this.timer =setTimeout(() => {
        this.getWords();
      }, 20);
    },

    // playing 状态控制 播放/暂停
    playing(newPlaying) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newPlaying ? audio.play() : audio.pause();
      });
    },
  },

  components: {
    ProgressBar,
    BScroll,
  },
};
</script>




<style lang="less" scoped>
.player {
  .normal-player {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: #fafafa;

    // 背景
    .background {
      position: absolute;
      left: 0;
      top: 0;
      background-color: #ccc;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.7;
      filter: blur(30px);
    }

    // top
    .top {
      position: relative;
      margin-bottom: 25px;
      margin-top: 5px;

      .back {
        position: absolute;
        top: 0;
        left: 6px;
        z-index: 50;
      }

      .icon-xia {
        display: block;
        padding: 9px;
        font-size: 20px;
        color: #1a73e8;
        font-weight: 600;
      }

      .icon-fenxiang {
        font-size: 22px;
        font-weight: 600;
        position: absolute;
        top: 10px;
        right: 17px;
        color: #1a73e8;
      }

      .title {
        width: 70%;
        margin: 0 auto;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        color: #000;
        white-space: nowrap;
        overflow: hidden;
      }

      .singer {
        display: flex;
        justify-content: center;
        align-items: center;
        white-space: nowrap;
        overflow: hidden;

        .subtitle {
          line-height: 20px;
          text-align: center;
          font-size: 16px;
          color: #111;
        }

        .icon-youjiantou {
          font-size: 14px;
        }
      }
    }

    // middle
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;

      // 显示的cd图片
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;

        // ---------------
        .cd-wrapper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;

          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 10px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;

            .image {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }

        .playing-lyric-wrapper {
          width: 80%;
          margin: 30px auto 0 auto;
          overflow: hidden;
          text-align: center;

          .playing-lyric {
            height: 20px;
            line-height: 20px;
            font-size: 16px;
            color: #242424;
          }
        }
      }

      // 歌词
      .middle-r {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .lyric-wrapper {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;

          .text {
            line-height: 32px;
            color: #222;
            font-size: 14px;
          }

          .high-current {
            color: #bbb !important;
          }
        }
      }

      // 切换动画
      .show-enter-active,
      .show-leave-active {
        transition: all 0.3s;
      }

      .show-enter,
      .show-leave-to {
        transform: translate3d(400px, 0, 0);
      }
    }

    // bottom
    .bottom {
      position: absolute;
      bottom: 35px;
      width: 100%;

      // 变化按钮
      .dot-wrapper {
        text-align: center;
        font-size: 0;

        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #333;

          &.active {
            width: 20px;
            border-radius: 5px;
            background-color: #111;
          }
        }
      }

      // 进度条
      .progress-wrapper {
        display: flex;
        align-items: center;
        width: 85%;
        margin: 0px auto;
        padding: 10px 0;

        .time {
          color: #000;
          font-size: 14px;
          flex: 0 0 30px;
          line-height: 30px;
          width: 40px;

          &.time-l {
            text-align: left;
          }

          &.time-r {
            text-align: right;
          }
        }

        .progress-bar-wrapper {
          flex: 1;
        }
      }

      // 底部
      .operators {
        display: flex;
        align-items: center;
        position: relative;

        .icon {
          flex: 1;
          color: #111;
        }

        &.disable {
          color: blue;
        }

        .i-left {
          text-align: right;
        }

        .i-center {
          padding: 0 20px;
          text-align: center;

          .icon-bofang1,
          .icon-zanting {
            font-size: 50px;
          }
        }

        i {
          font-size: 27px;
        }

        .i-right {
          text-align: left;
        }

        .icon-like-fill {
          color: red;
          font-size: 35px;
          animation: like 1s ease 0 1;
        }

        .icon-xihuan {
          position: absolute;
          right: 37px;
          bottom: 12px;
          color: #444;
          font-size: 25px;
        }

        .icon-liebiaoshunxu {
          font-size: 30px;
          color: #000;
        }
        // // 喜欢动画
        // @keyframes like {
        //   0% {
        //     transform: scale(0);
        //   }
        //   50% {
        //     transform: scale(1.5);
        //   }
        //   100% {
        //     transform: scale(0);
          // }
        // }
      }
    }
  }

  .mini-player {
    position: fixed;
    top: 5px;
    right: 15px;
    z-index: 999;
    width: 30px;
    height: 30px;
    background: #0099cc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 29px;
      height: 29px;
      border-radius: 50%;
    }
  }
}

// cd 动画
.play {
  animation: rotate 20s linear infinite;
}

.pause {
  animation-play-state: paused;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

// 打开关闭动画过渡
.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;

  .top,
  .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}

.normal-enter,
.normal-leave-to {
  opacity: 0;

  .top {
    transform: translate3d(0, -100px, 0);
  }

  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}

.mini-enter-active,
.mini-leave-active {
  transition: all 0.4s;
}

.mini-enter,
.mini-leave-to {
  opacity: 0;
}
</style>








                
  
  

<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <!-- 已经走过的进度条 -->
      <div class="progress" ref="progress"></div>
      <!-- 按钮 -->
      <!-- <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart.prevent="progressTouchStart"
        @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>-->
    </div>
  </div>
</template>


<script type="text/ecmascript-6">
// 小圆点的宽度
const progressBtnWidth = 16;

export default {
  // 接收： 百分比；
  props: {
    percent: {
      type: Number,
      default: 0,
    },
  },

  created() {},

  methods: {},
  watch: {
    //  进度条百分比宽度
    percent(newPercent) {
      if (newPercent >= 0) {
        const barWidth = this.$refs.progressBar.clientWidth;
        //   总偏移量 = 百分比*barWidth
        const offsetWidth = newPercent * barWidth;
        this.$refs.progress.style.width = `${offsetWidth}px`;
      }
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.progress-bar {
  height: 30px;

  .bar-inner {
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0, 0, 0, 0.3);

    .progress {
      position: absolute;
      height: 100%;
      background-color : #1a73e8;
    }

    /* .progress-btn-wrapper {
          position: absolute;
          left: -8px;
          top: -13px;
          width: 30px;
          height: 30px;
    
          .progress-btn {
            position: relative;
            top: 7px;
            left: 7px;
            box-sizing: border-box;
            width: 16px;
            height: 16px;
            border: 3px solid #000;
            border-radius: 50%;
            background-color: #1a73e8;
          }
        } */
  }
}
</style>
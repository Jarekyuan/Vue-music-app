<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  props: {
    top: {
      type: Number,
      default: 0,
    },
    bottom: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      required: true,
    },
    click: {
      type: Boolean,
      default: true,
    },
    // -------------
    listenScroll: {
      type: Boolean,
      default: false,
    },
    probeType: {
      type: Number,
      default: 1,
    },
    // 下拉刷新
    pullup: {
      type: Boolean,
      default: false,
    },
    // 下拉收起键盘
    beforeScroll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    initScroll() {
      // 修改高度
      this.$refs.wrapper.style.top = this.top + "px";
      this.$refs.wrapper.style.bottom = this.bottom + "px";


      // 创建滚动对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        pullUpLoad: true,
        // momentum: false,
        bounce: true,
      });

      // 滚动事件
      if (this.listenScroll) {
        let me = this;
        this.scroll.on("scroll", ({ x, y }) => {
          me.$emit("scroll", { x, y });
        });
      }

      // 下拉刷新
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          // 滚动到底部附近
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit("scrollToEnd");
          }
        });
      }
      // 下拉收起键盘
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },

    // ---------------
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    },
    // 刷新
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
  mounted() {
    setTimeout(() => {
      this.initScroll();
    }, 20);
  },
  watch: {
    list() {
      this.$nextTick(() => {
        this.refresh();
      });
    },
  },
};
</script>

<style>
.wrapper {
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>
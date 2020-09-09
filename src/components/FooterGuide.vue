<template>
  <!-- 底部tab导航 -->
  <div>
    <div class="cover"></div>
    <div class="footer_guide pos-f d-flex jc-around">
      <div
        @click="goto('/find')"
        class="guide_item"
        :class="{on: '/find'===$route.path ||  
        '/find/recommend'===$route.path || '/find/singer'===$route.path || '/find/rank'===$route.path || '/find/search'===$route.path }"
      >
        <span class="item_icon">
          <i class="iconfont icon-yinle3"></i>
        </span>
        <span>发现</span>
      </div>
      <div @click="goto('/news')" class="guide_item" :class="{on: '/news'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-faxian"></i>
        </span>
        <span>动态</span>
      </div>
      <div @click="goto('/video')" class="guide_item" :class="{on: '/video'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-shipin1"></i>
        </span>
        <span>视频</span>
      </div>

      <div @click="goto('/personal')" class="guide_item" :class="{on: '/personal'===$route.path}">
        <span class="item_icon">
          <i class="iconfont icon-weibiaoti-_huabanfuben"></i>
        </span>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>


<script>
// -----------非路由组件（底侧tab切换栏）-------------
// 1. 实现html结构和css样式的编写
// 2. 为tab图标加一个on的类，如果切换到这个路由，就显示这个图标高亮：:class="{on: '/地址'===$route.path}"
// 3. 编程式导航，添加函数 goto(path),点击跳转到对应路由

export default {
  methods: {
    goto(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="less" scoped>
.cover {
  position: fixed;
  width: 100%;
  height: 56px;
  bottom: 0;
  background-color: #bbb;
}
.footer_guide {
  width: 100%;
  height: 55px;
  bottom: 0;
  background-color: #eee;
  opacity: 0.9;
  z-index: 10;
  .guide_item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3px;

    span {
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: 1px;
    }
    .iconfont {
      font-size: 22px;
      color: #666;
    }
  }
  
}
.on {
    color: #1a73e8!important;
    .iconfont {
      color: #136bdd!important;
      font-size: 24px!important;
    }
  }
</style>
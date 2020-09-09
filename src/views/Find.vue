<template>
  <div>
    <div class="app-header base-color">
      <div @click="gomy"><i class="iconfont icon-gongnenghe" ></i></div>
      Jonas'Music
    </div>

    <!-- 导航部分(样式) -->
    <div class="tab w100 d-flex jc-around">
      <div class="tab-item">
        <router-link to="/find/recommend" :class="{active:'/find/recommend'===$route.path}">推荐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/find/singer" :class="{active:'/find/singer'===$route.path}">歌手</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/find/rank" :class="{active:'/find/rank'===$route.path}">排行</router-link>
      </div>
      <div class="tab-item">
        <!-- 图标显示搜索 -->
        <router-link to="/find/search" :class="{active:'/find/search'===$route.path}">搜索</router-link>
      </div>
    </div>

    <!-- 子路由站位 ---------------------- -->
    <!--    <keep-alive> 可以缓存之前路由的数据，如加入购物车的数据 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    gomy() {
      this.$router.push('/aboutMe')
    }
  }
};
</script>


<style lang="less" scoped>
.app-header {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 40px;
  font-size: 22px;
  font-weight: 600;
  position: relative;
  .iconfont {
    position: absolute;
    top: 0;
    left: 15px;
    font-size: 17px;
    font-weight: 600;
  }
}
.tab {
  margin-bottom: 15px;
  .tab-item {
    padding-bottom: 3px;
    color: #1a73e8;
  }
}
.active {
  font-weight: 600;
  color: #1a73e8;
  display: inline-block;
  height: 23px;
  border-bottom: 2px solid #1a73e8;
}
</style>

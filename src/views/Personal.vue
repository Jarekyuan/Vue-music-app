<template>
  <div class="personal">
    <div class="header">
      <div class="photo" @click="toLogin">
        <i class="iconfont icon-weibiaoti-_huabanfuben"></i>
      </div>
      <div class="info">登录获取同步个人信息</div>
      <div class="login" @click="toLogin">立即登录</div>
    </div>

    <div class="title">我的音乐</div>
    <div class="content">
      <!-- 个人收藏 -->
      <div class="collect" @click="showCollect">
        <i class="iconfont icon-xihuan"></i>
        <span>我喜欢的音乐</span>
      </div>
      <!-- 历史记录 -->
      <div class="history" @click="showHistory">
        <i class="iconfont icon-lishi"></i>
        <span>历史播放</span>
      </div>
    </div>
    <Collect ref="collect" :collects="collects"></Collect>
    <History ref="history" :playHistory="playHistory" :searchHistory="searchHistory"></History>
  </div>
</template>


<script>
import { mapState } from "vuex";

import History from "../components/Personal/History";
import Collect from "../components/Personal/Collect";

export default {
  data() {
    return {};
  },
  computed: {
    //   获取历史记录数据
    ...mapState(["playHistory", "searchHistory", "collects"]),
  },
  mounted() {},

  methods: {
    // 显示喜欢组件
    showCollect() {
      this.$refs.collect.show();
    },
    // 显示历史组件
    showHistory() {
      this.$refs.history.show();
    }, 
    
    // 点击登录
    toLogin() {
      this.$router.push('/login')
    }
  },


   
  components: {
    History,
    Collect,
  },
};
</script>


<style scoped lang="less">
.personal {
  width: 100%;
  height: 100%;
  background-color: #ddd;
  .header {
    width: 100%;
    height: 100px;
    background-color: #3d7ee7;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 100px;
    color: #fff;
    border-radius: 0 0 15px 15px;
    .photo {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      padding: 5px;
      .iconfont {
        color: #444;
        font-size: 38px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .info {
      width: 180px;
      margin: 0 20px;
    }
    .login {
      width: 70px;
      height: 21px;
      border: 1px solid #fff;
      text-align: center;
      line-height: 20px;
      border-radius: 10px;
      font-size: 14px;
      background-color: #fff;
      color: #3d7ee7;
      font-weight: 600;
    }
  }
  .title {
    width: 100%;
    height: 20px;
    line-height: 25px;
    margin: 10px 0 0 10px;
    font-size: 16px;
    font-weight: 600;
  }

  .content {
    width: 100%;
    display: flex;

    .collect {
      width: 48%;
      height: 170px;
      background-color: #fff;
      margin: 12px auto;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 3px #888;
      .iconfont {
        font-size: 35px;
        color: red;
        margin-bottom: 15px;
      }
      span {
        font-size: 17px;
        font-weight: 600;
        color: #444;
      }
    }
    .history {
      width: 48%;
      height: 170px;
      background-color: #fff;
      margin: 12px auto;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 3px #888;
      .iconfont {
        font-size: 35px;
        color: #333;
        margin-bottom: 15px;
      }
      span {
        font-size: 17px;
        font-weight: 600;
        color: #444;
      }
    }
  }
}
</style>

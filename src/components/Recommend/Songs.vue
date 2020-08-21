<template>
  <div>
    <!-- 歌单部分 -->
    <div class="gedan">
      <div class="text-header">
        <span class="left">推荐歌单</span>
        <span class="right fr">更多></span>
      </div>

      <div class="gedan-con">
        <ul>
          <li class="gedan-con-item" v-for="(item, index) in songList" :key="index">
            <img :src="item.picUrl" />
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
          <li class="gedan-con-item" v-for="(item, index) in newSongs" :key="index">
            <img :src="item.blurPicUrl" />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
        <div class="text">2020 jiaboyuan music app</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    songList: Object,
    newSongs: Object,
  },
  filters: {
    formatCount(v) {
      if (v < 9999) {
        return v;
      } else {
        return (v / 10000).toFixed(0) + "万";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.text-header {
  margin-top: 10px;
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
    padding: 10px 0 0 5px;
    li {
      width: 33.33%;
      justify-content: center;
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

.newsong {
  margin-top: 10px;
}

.footer {
    display: block;
    margin-top: 10px;
    width: 100%;
    height: 100px;
    background-color: #373d41;
    color: #999;
    text-align: center;
    line-height: 40px;
}
</style>

<template>
  <div class="com-songlist">
    <ul>
      <li
        class="item"
        v-for="(singersong,index) in singersongs"
        :key="index"
        @click="selectItem(singersong,index)"
      >
        <!-- 有排行榜之后的结构 -->
        <div class="rank" v-show="rank">
          <span v-text="getRankText(index)" class="text"></span>
        </div>
        <!-- 原本结构 -->
        <div class="content">
          <h2>{{singersong.name}}</h2>
          <p>{{getDesc(singersong)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["singersongs", "rank"],

  methods: {
    // 获取歌手详细信息
    getDesc(singersong) {
      return `${singersong.ar[0].name} . ${singersong.al.name}`;
    },

    // 点击歌曲时，（公共组件，不进行数据作用，派发回父组件事件）
    selectItem(item, index) {
      this.$emit("select", item, index);
      // console.log(index);
    },

    // 排行榜前面的样式
    getRankText(index) {
      return index + 1;
    },
  },
};
</script>

<style lang="less" scoped>
.com-songlist {
  width: 100%;
  height: auto;
  background-color: #fafafa;
}

ul {
  margin-top: 10px;

  .item {
    width: 80%;
    padding: 10px 0 10px 30px;
    display: flex;

    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      h2 {
        font-size: 17px;
        margin-bottom: 8px;
        color: #000;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p {
        font-size: 13px;
        color: #777;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .rank {
      flex: 0 0 20px;
      width: 25px;
      margin-right: 30px;
      text-align: center;
      .text {
        color: #1a73e8;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>

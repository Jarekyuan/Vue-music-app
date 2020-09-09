<template>
  <div class="rank" ref="rank">
    <Scroll :list="topLists" :top="0" :bottom="60">
      <ul class="toplist">
        <!-- 热榜名字 -->
        <li @click="selectItem(item)" class="item" v-for="(item,index) in topLists" :key="index">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" />
            <div class="name">{{item.name}}</div>
            <div class="updata">{{item.updateFrequency}}</div>
          </div>
        </li>
      </ul>
    </Scroll>
    <!-- loading -->
    <div class="loading-container" v-show="!topLists.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "../../components/base/Scroll";
import Loading from "../../components/base/Loading";
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },

  computed: {
    ...mapState(["topLists"]),
  },
  mounted() {
    //  获取排行榜首页数据
    this.$store.dispatch("getToplist");
  },
  methods: {
    // 点击跳转详情页
    selectItem(item) {
      this.$router.push({
        name: "rankDetail",
        params: {
          id: item.id,
          name: item.name,
          pic: item.coverImgUrl,
        },
      });
    },
  },

  components: {
    Scroll,
    Loading,
  },
};
</script>

<style scoped lang="less">
.rank {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .toplist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    position: relative;

    .item {
      display: flex;
      justify-content: center;
      margin: 0 20px;
      padding-top: 20px;
      height: 160px;
      position: relative;

      img {
        width: 135px;
        height: auto;
        box-shadow: 5px 5px 5px #999;
        border-radius: 5px;
      }
      .name {
        width: 135px;
        text-align: center;
        font-size: 15px;
        color: #333;
        margin: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .updata {
        position: absolute;
        //   bottom: 21px;
        top: 21px;
        left: 0;
        width: 135px;
        height: 22px;
        line-height: 22px;
        background-color: rgba(0, 0, 0, 0.4);
        text-align: center;
        font-size: 14px;
        color: #fff;
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
    }
  }
}
</style>
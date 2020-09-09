<template>
  <div>
    <!-- BS -->
    <Bscroll :list="singerLists" :top="90" :bottom="65">
      <div class="singer">
        <!-- -------------------歌手分类---------------- -->
        <div class="singer-category">
          <!-- 性别 -->
          <div class="category-sex">
            <ul>
              <li :class="{active: activeIndex === -1}" @click="changeIndex(-1)">全部</li>
              <li :class="{active: activeIndex === 1}" @click="changeIndex(1)">男</li>
              <li :class="{active: activeIndex === 2}" @click="changeIndex(2)">女</li>
              <li :class="{active: activeIndex === 3}" @click="changeIndex(3)">乐队</li>
            </ul>
          </div>
          <!-- 地区 -->
          <div class="category-area">
            <ul>
              <li :class="{active: activeIndex02 === -1}" @click="changeIndex02(-1)">地区</li>
              <li :class="{active: activeIndex02 === 7}" @click="changeIndex02(7)">华语</li>
              <li :class="{active: activeIndex02 === 96}" @click="changeIndex02(96)">欧美</li>
              <li :class="{active: activeIndex02 === 8}" @click="changeIndex02(8)">日本</li>
              <li :class="{active: activeIndex02 === 16}" @click="changeIndex02(16)">韩国</li>
              <li :class="{active: activeIndex02 === 0}" @click="changeIndex02(0)">其他</li>
            </ul>
          </div>
        </div>

        <!-- ------------------歌手列表----------------------- -->
        <div class="singer-list">
          <div class="list-con">
            <ul>
              <li
                v-for="(singerList,index) in singerLists"
                :key="index"
                @click="selectItem(singerList)"
              >
                <img v-lazy="singerList.picUrl" />
                <h6>{{singerList.name}}</h6>
                <i class="iconfont icon-jiantou"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Bscroll>

    <!-- 当还数据没全的时候显示loading组件 -->
    <div class="loading-con" v-show="!singerLists.length">
      <Loading></Loading>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
// bs滚动
import Bscroll from "../../components/base/Scroll";
// loading
import Loading from "../../components/base/Loading";

export default {
  data() {
    return {
      activeIndex: -1,
      activeIndex02: -1,
      type: -1,
      area: -1,
    };
  },

  computed: {
    // 读取数据
    ...mapState(["singerLists"]),
  },

  mounted() {
    // 初始化获取热门歌手
    const type = this.type;
    const area = this.area;
    this.$store.dispatch("getSingerLists", { type, area });
  },

  methods: {
    // 1.点击分类获取对应的歌手列表
    changeIndex(index) {
      this.activeIndex = index;
      this.type = index;
      const type = this.type;
      const area = this.area;
      this.$store.dispatch("getSingerLists", { type, area });
    },
    changeIndex02(index) {
      this.activeIndex02 = index;
      this.area = index;
      const type = this.type;
      const area = this.area;
      this.$store.dispatch("getSingerLists", { type, area });
    },
    // 2.点击歌手跳转详情页
    selectItem(singerList) {
      let item = singerList;
      this.$router.push({
        // path:`/singer/${singerList.id}`,
        name: "singerDetail",
        params: {
          id: item.id,
          name: item.name,
          bgImg: item.img1v1Url,
        },
      });
    },
  },

  watch: {},

  components: {
    Bscroll,
    Loading,
  },
};
</script>


<style lang="less" scoped>
.singer {
  padding-left: 20px;
}

// 分类
.singer-category {
  margin-top: 10px;
  font-size: 14px;
  ul {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    li {
      margin-right: 5px;
      border-radius: 6px;
      width: 35px;
      height: 20px;
      text-align: center;
      line-height: 18px;
      color: #646464;
    }
    .active {
      background-color: #1a73e8;
      color: #ffffff;
    }
  }
}

// 列表
.singer-list {
  margin-top: 20px;
  li {
    display: flex;
    align-items: center;
    padding-bottom: 19px;
    padding-left: 5px;
    position: relative;
    img {
      width: 55px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 2px 2px 2px #aaa;
    }
    h6 {
      font-size: 14px;
      margin-left: 15px;
      color: #777;
    }
    .iconfont {
      position: absolute;
      top: 25%;
      right: 5%;
      font-size: 12px;
      color: #ccc;
    }
  }
}
// loading
.loading-con {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
</style>
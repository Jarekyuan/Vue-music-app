<template>
<!-- 事件 -->
  <scroll
    ref="suggest"
    :list="search"
    :bottom="10"
    :pullup="pullup"
    @scrollToEnd="searchMore"
    :beforScroll="beforScroll"
    @beforScroll="listScroll"
  >
    <div class="suggest">
      <!-- 搜索的结果列表 -->
      <ul class="suggest-list">
        <li
          class="suggest-item"
          v-for="(song ,index) in search"
          :key="index"
          @click="selectItem(song,index)"
        >
          <div class="iconfont icon-sousuo1"></div>
          <div class="name">{{song.name}} ~ {{song.artists[0].name}}</div>
        </li>
        <Loading v-show="hasMore" title></Loading>
      </ul>
      <!-- 搜不到 -->
      <div v-show="!search.length" class="no-result-wrapper">
        <NoResult title="暂无搜索结果"></NoResult>
      </div>
    </div>

    <div class="loading-con" v-show="!search.length">
      <Loading title></Loading>
    </div>
  </scroll>
</template>


<script>
import { mapState, mapActions } from "vuex";
import scroll from "../base/Scroll";
import Loading from "../base/Loading";
import NoResult from "../base/No-result";

export default {
  props: ["keyWords"],

  data() {
    return {
      // 下拉刷新数据 scroll
      pullup: true,
      beforScroll: true,
      hasMore: false,
      // 获取的数量
      limit: 15,
    };
  },

  computed: {
    ...mapState(["search"]),
  },

  methods: {
    //  获取搜索数据
    getSearch() {
      let keyWords = this.keyWords;
      let limit = this.limit;
      this.$store.dispatch("getSearch", { keyWords, limit });
    },

    // 下拉到底部事件，获取更多数据
    searchMore() {
      this.hasMore = true;
      this.limit = this.limit + 10;
      //   再次调用get数据
      setTimeout(() => {
        this.getSearch();
      }, 500);
    },
    
    // 下拉，收起键盘 （派发出去，清空input）
    listScroll() {
      this.$emit('listScroll')
    },



    // 点击获取对应的歌曲, 使用 selectPlay 播放
    selectItem(song, index) {
      // 播放组件
      this.selectPlay({
        playList: this.search,
        positiveList: this.search,
        currentIndex: index,
      });
      // 搜索历史
      this.$emit('select')
    },

    // 获取 selectPlay
    ...mapActions(["selectPlay"]),
  },

  watch: {
    //  当有关键词后，请求查询结果
    keyWords(val) {
      this.getSearch();
      // ***重新刷新 limit 的值
      this.limit = 15;
    },
  },

  components: {
    scroll,
    Loading,
    NoResult,
  },
};
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
.suggest {
  .suggest-list {
    // height: 100%;
    padding: 7px 30px;

    .suggest-item {
      display: flex;
      align-items: center;
      padding: 13px 0;
    }

    .name {
      font-size: 14px;
      color: #333;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .iconfont {
      flex: 0 0 30px;
      font-size: 14px;
      color: #666;
    }
  }

  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
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
<template>
  <div class="search">
    <!-- 搜索输入框 -->
    <div class="search-box-wrapper">
      <SearchBox ref="searchBox" @keyWords="getKeyWords"></SearchBox>
    </div>

    <!-- ------------------------------------ -->
    <div class="shortcut-wrapper" v-show="!keyWords">
      <scroll ref="shortcut" class="shortcut">
        <div>
          <!-- 热搜 -->
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li
                class="item"
                v-for="(item,index) in hotKey"
                :key="index"
                @click="addInput(item.first)"
              >
                <span>{{item.first}}</span>
              </li>
            </ul>
            <!-- 当还数据没全的时候显示loading组件 -->
            <div class="loading-con" v-show="!hotKey.length">
              <Loading></Loading>
            </div>
          </div>

          <!-- 搜索历史 -->
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear">
                <i class="icon-clear iconfont icon-shanchu" @click="showConfirm"></i>
              </span>
            </h1>
            <transition-group class="history-content" name="list" tag="ul">
              <li
                class="item"
                v-for="(item,index) in searchHistory"
                :key="index"
                @click="addInput(item)"
              >
                <span>{{item}}</span>
                <i class="iconfont icon-shanchu1" @click.stop="deleteOne(item)"></i>
              </li>
            </transition-group>
          </div>
        </div>
      </scroll>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-show="keyWords">
      <Suggest :keyWords="keyWords" @listScroll="blurInput" @select="saveSearch"></Suggest>
    </div>

    <!-- 提示 -->
    <Confirm ref="confirm" @confirm="clearAll" text="是否清空所有搜索历史" confirmBtnText="清空"></Confirm>
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

import SearchBox from "../../components/Search/Search-box";
import Suggest from "../../components/Search/Suggest";
import Confirm from "../../components/base/Confirm";
import Loading from "../../components/base/Loading";

export default {
  data() {
    return {
      keyWords: "",
    };
  },

  computed: {
    ...mapState(["hotKey", "searchHistory"]),
  },
  mounted() {
    this.$store.dispatch("getHotKey");
  },

  methods: {
    // 获取子组件传来的关键字
    getKeyWords(newkeyWords) {
      this.keyWords = newkeyWords;
    },

    // 点击热搜/历史记录，自动填充到搜索框
    addInput(item) {
      this.$refs.searchBox.setkeyWords(item);
    },

    // 实现滚动input清除，收起键盘
    blurInput() {
      this.$refs.searchBox.blur();
    },

    // ***保存搜索结果
    saveSearch() {
      // 获取actions的数据，传keywords
      this.saveSearchHistory(this.keyWords);
    },
    // ***删除历史记录
    deleteOne(item) {
      this.delSearchHistory(item);
    },
    // 清空
    clearAll() {
      this.clsSearchHistory();
    },
    // 垃圾桶图标清空, 显示提示
    showConfirm() {
      // 调用子组件方法
      this.$refs.confirm.show();
    },

    ...mapActions([
      "saveSearchHistory",
      "delSearchHistory",
      "clsSearchHistory",
    ]),
  },

  components: {
    SearchBox,
    Suggest,
    Confirm,
    Loading,
  },
};
</script>



<style lang="stylus" rel="stylesheet/stylus">
.search {
  .search-box-wrapper {
    margin: 20px;
  }

  // ---------------
  .shortcut-wrapper {
    position: fixed;
    top: 178px;
    bottom: 0;
    width: 100%;

    .shortcut {
      height: 100%;
      overflow: hidden;

      // 热搜
      .hot-key {
        margin: 0 20px 20px 20px;
        position: relative;

        .title {
          margin-bottom: 20px;
          font-size: 15px;
          color: #1a73e8;
          font-weight: 600;
        }

        .item {
          display: inline-block;
          padding: 5px 10px;
          margin: 0 20px 10px 0;
          border-radius: 16px;
          background-color: #ddd;
          font-size: 14px;
          color: #000;
        }
      }

      // 搜索历史
      .search-history {
        position: relative;
        margin: 0 20px;

        .title {
          display: flex;
          align-items: center;
          height: 40px;
          font-size: 15px;
          color: #1a73e8;

          .text {
            flex: 1;
            font-weight: 700;
          }

          .clear {
            .icon-clear {
              font-size: 16px;
              color: #444;
            }
          }
        }


        // .list-enter-active, .list-leave-active {
        //   transition: all 0.1s ;
        // }

        // .list-entet, .list-leave-to {
        //   height: 0;
        // }

        .history-content {
          display: flex;
          flex-direction: column;

          .item {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            height: 25px;
            // line-height 10px
            font-size: 14px;
          }
        }
      }
    }
  }

  .search-result {
    position: fixed;
    width: 100%;
    top: 150px;
    bottom: 0;
  }
}

// loading
.loading-con {
  position: absolute;
  width: 100%;
  top: 80%;
}
</style>

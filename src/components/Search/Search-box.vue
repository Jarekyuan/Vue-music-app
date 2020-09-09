<template>
  <div class="search-box">
    <!-- 搜索 -->
    <i class="icon-search iconfont icon-sousuo1"></i>
    <input ref="keyWords" class="box" placeholder="搜索歌曲、歌手" v-model="keyWords" />
    <!-- 取消 -->
    <i class="icon-dismiss iconfont icon-quxiao" v-show="keyWords" @click="clear"></i>
  </div>
</template>


<script>
// import Bus from '../../assets/js/bus';

import {debounce} from '../../assets/js/util'

export default {
  data() {
    return {
      keyWords: "",
    };
  },
  created() {
    //  ***监听有 keyWords时候，派发事件出去  (节流处理,延迟多次发送请求)
      this.$watch('keyWords',  debounce((newkeyWords)=>{
          this.$emit('keyWords', newkeyWords)
      }, 200))
  },

  methods: {
    // 清除内容
    clear() {
      this.keyWords = "";
    },

    // 设置输入框的内容值 （父组件设置，所以将这个方法用ref传到父组件使用）
    setkeyWords(item) {
        this.keyWords = item
    },

    // input调用父组件blur的方法
    blur() {
      this.$refs.keyWords.blur()
    }
  },

  
};
</script>

<style scoped lang="less">
.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 40px;
  background-color: #ddd;
  border-radius: 16px;

  .icon-search {
    margin-left: 5px;
    font-size: 18px;
    color: #1a73e8;
  }

  .box {
    flex: 1;
    margin: 0 10px;
    line-height: 18px;
    background-color: #ddd;
    color: #000;
    font-size: 15px;
    border: 0px;
    outline: none;
    &::placeholder {
      color: #999;
    }
  }

  .icon-dismiss {
    margin-right: 3px;
    font-size: 16px;
    color: #000;
    font-weight: 600;
  }
}
</style>

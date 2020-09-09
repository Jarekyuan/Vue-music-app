<template>
  <div class="no-result">
    <p class="no-result-text">{{title}}</p>
  </div>
</template>


<script type="text/ecmascript-6">

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped lang="less">
.no-result {
  text-align: center;

  .no-result-text {
    margin-top: 50px;
    font-size: 14px;
    color: #000;
  }
}
</style>
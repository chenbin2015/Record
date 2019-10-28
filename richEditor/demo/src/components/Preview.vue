<template>
  <el-dialog title="预览（格式待定，主要实现文本同步）" :visible.sync="show" :show-close="false">
    <ol class="wrap">
      <li v-for="(item,index) in info" :key="index" v-html="item"></li>
    </ol>
    <div slot="footer" class="buttons-wrap">
      <el-button type="primary" @click="onClose()">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Preview",
  props: {
    show: Boolean,
    info: Array,
    onClose: Function
  },
  methods: {
    test: function() {
      console.log(11111);
      this.$emit("onClose", false);
    }
  }
};
</script>

<style scoped>
.wrap {
  max-height: 60vh;
  overflow-y: auto;
}
li {
  margin: 0;
  padding: 0;
}
</style>

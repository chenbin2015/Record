<template>
  <div class="toolbar">
    <button
      @click="item.handle"
      :title="item.text"
      v-for="item in iconList"
      v-bind:key="item.icon"
      class="editButton"
    >
      <icon :name="item.icon"></icon>
    </button>
    <select @change="onFontSizeChange">
      <option v-for="item in fontSize" v-bind:key="item.value" :value="item.value">{{item.text}}</option>
    </select>
    <el-button type="text" class="preview" @click="onPreview">预览</el-button>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    iconList: Array,
    fontSize: Array,
    onFontSizeChange: Function,
    onPreview: Function
  }
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  border-bottom: 1px solid #ccc;
}
button {
  padding: 7px;
  margin-right: 12px;
  cursor: pointer;
  background: transparent;
  border: 0px;
  outline: none;
}
button:hover {
  background: #ddd;
  border-radius: 2px;
}
</style>

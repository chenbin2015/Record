<template>
  <el-dialog title="新增记录" :visible.sync="dialogFormVisible">
    <el-form :model="newLineInfo">
      <el-form-item label="开始时间">
        <!-- <div style="with:100px">
              <el-slider type="range" width="100px"></el-slider>
        </div>-->
        <el-input-number :min="min" :max="max" v-model="newLineInfo.startTime" label="描述文字"></el-input-number>
        (介于{{min}}s-{{max}}s之间,包括边界值)
      </el-form-item>
      <el-form-item label="发言人">
        <el-radio-group class="list" v-model="newLineInfo.author">
          <el-radio
            :label="item"
            v-for="item in meeting.authors"
            :key="item"
            class="authorItem"
          >{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAddNewLine">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "NewLine",
  props: {
    iconList: Array,
    fontSize: Array,
    onFontSizeChange: Function,
    onPreview: Function
  }
};
</script>

<style scoped>
</style>

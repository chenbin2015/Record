<template>
  <section class="drodownlist">
    <p class="name" v-html="name" @click="handleClick"></p>
    <el-dialog title="选择演讲者" :visible.sync="dialogVisible">
      <el-radio-group class="list" v-model="tempName">
        <el-radio :label="item" v-for="item in list" :key="item" class="item">{{item}}</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" handleConfirmAuthor">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <ul class="list" :style="{height:isShow?'100px':'0px'}">
      <li v-for="item in list" :key="item">{{item}}</li>
    </ul>-->
  </section>
</template>

<script>
export default {
  name: "DropDownList",
  props: {
    name: String,
    list: Array,
    index: Number
  },
  methods: {
    // 弹出选择框时
    handleClick: function() {
      this.dialogVisible = !this.dialogVisible;
      if (this.dialogVisible) {
        this.tempName = this.name;
      }
    },
    handleConfirmAuthor: function() {
      //  this.name = this.tempName;
      // this.handleClick();
      console.log("index:", this.index);
      this.$store.dispatch("meeting/setAuthor", {
        currentLineIndex: this.index,
        author: this.tempName
      });
      this.dialogVisible = false;
    }
  },
  data: function() {
    return {
      isShow: false,
      dialogVisible: false,
      tempName: ""
    };
  }
};
</script>

<style scoped >
.drodownlist {
  width: 50px;
}
.name {
  cursor: pointer;
}
.name:hover {
  color: red;
}
.list {
  white-space: normal;
}
.item {
  margin-bottom: 10px;
  min-width: 70px;
}
</style>

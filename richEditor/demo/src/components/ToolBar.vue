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
    <select @change="handleFontSizeChange">
      <option v-for="item in fontSize" v-bind:key="item.value" :value="item.value">{{item.text}}</option>
    </select>
    <el-button type="text" class="preview" @click="handleShowPreview">预览</el-button>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: {
    iconList: Object,
    fontSize: Array
  },
  methods: {
    handleExecCommand: function(command) {
      document.execCommand(command);
      // console.log("aaaaaaaaaaaa:", a);
      const html = document.querySelector("#divContent").innerHTML;
      // console.log(html);
      if (html) {
        if (command === "undo") {
          if (this.undoCount > 0) {
            this.undoCount -= 1;
          }
          this.redoCount += 1;
        } else if (command === "redo") {
          if (this.redoCount > 0) {
            this.redoCount -= 1;
          }
          this.undoCount += 1;
        }
        // console.log(this.redoCount, this.undoCount);
        // console.log(document.querySelector("#divContent").innerHTML);
      }
      if (this.redoCount === 0) {
        this.iconList[1].disable = true;
      }
      if (this.undoCount === 0) {
        this.iconList[0].disable = true;
      }
      // console.log(this.redoCount, this.undoCount);
    }
  },
  data: function() {
    return {
      undoCount: 0,
      redoCount: 0,
      iconList: [
        {
          icon: "chexiao",
          text: "撤销",
          handle: this.handleExecCommand.bind(this, "undo"),
          disable: true
        },
        {
          icon: "zhongzuo",
          text: "重做",
          handle: this.handleExecCommand.bind(this, "redo"),
          disable: true
        },
        {
          icon: "bold",
          text: "加粗",
          handle: this.handleExecCommand.bind(this, "bold"),
          disable: false
        },
        {
          icon: "qingxie",
          text: "倾斜",
          handle: this.handleExecCommand.bind(this, "italic"),
          disable: false
        }
      ],
      fontSize: [
        {
          text: "12px",
          value: 2
        },
        {
          text: "14px",
          value: 3
        },
        {
          text: "18px",
          value: 4
        },
        {
          text: "24px",
          value: 5
        }
      ]
    };
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

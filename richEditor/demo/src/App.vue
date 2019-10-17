<template>
  <div id="app">
    <div class="toolbar">
      <button
        @click="item.handle"
        :title="item.text"
        v-for="item in iconList"
        v-bind:key="item.icon"
      >
        <icon :name="item.icon"></icon>
      </button>
      <select @change="handleFontSizeChange">
        <option v-for="item in fontSize" v-bind:key="item.value" :value="item.value">{{item.text}}</option>
      </select>
    </div>
    <div
      id="divContent"
      contenteditable="true"
      class="editContent"
      @input="handleContentChange"
      @keydown="handleKeyDownChange"
      @click="handleClick"
    >
      <div></div>
    </div>
  </div>
</template>

<script>
import ToolBar from "./components/ToolBar.vue";

export default {
  name: "app",
  data: function() {
    return {
      currentTargetIndex: 0, // 当前点击的对象的索引，有可能是内容区域自己，有可能是内容区域中的某一个子节点，直接用当前对象不行
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
          value: 1
        },
        {
          text: "14px",
          value: 2
        },
        {
          text: "18px",
          value: 3
        },
        {
          text: "24px",
          value: 4
        }
      ]
    };
  },
  methods: {
    handleExecCommand: function(command, second = false, param) {
      document.execCommand(command, second, param);
    },
    handleFontSizeChange: function() {
      let fonSize = this.fontSize[event.target.value].text;
      this.handleExecCommand("fontSize", false, fonSize);
    },
    handleContentChange: function(e) {
      const { innerHTML } = e.target;

      if (!innerHTML) {
        this.iconList[0].disable = true;
      } else {
        this.iconList[0].disable = false;
      }
    },
    handleClick: function(e) {
      // this.currentTarget = e.target;
      divContent.childNodes.forEach((item, index) => {
        if (item === e.target) {
          this.currentTargetIndex = index;
        }
      });
    },
    handleKeyDownChange: function(e) {
      let temp = divContent.innerHTML;
      // console.log("event.ctrlKey:", e);
      if (+(e.keyCode || e.which) === 13) {
        if (event.ctrlKey) {
          return;
        }
        if (confirm("确定要新起一条记录吗?")) {
        } else {
          setTimeout(() => {
            // console.log("temp:", temp);
            // console.log(divContent.innerHTML);
            divContent.innerHTML = temp;
            // const a = window.getSelection().getRangeAt(0);
            // console.log(a);
            var range = document.createRange();
            var sel = window.getSelection();
            // if (divContent.children.length > 0) {
            //   range.setStart(
            //     divContent.children[divContent.children.length - 1],
            //     1
            //   );
            // } else {
            //   range.setStart(divContent, 1);
            // }
            if (divContent.children.length > 0) {
              range.setStart(divContent.children[this.currentTargetIndex], 1);
            } else {
              range.setStart(divContent, 1);
            }
            // console.log("this.currentTarget:", this.currentTarget);
            // console.log("divContent:", divContent);
            // range.setStart(this.currentTarget, 1);

            // range.setEnd(divContent, divContent.children.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }, 10);
        }

        console.log("confirm:");
      }
      // setTimeout(() => {
      //   console.log("temp:", temp);
      //   console.log(divContent.innerHTML);
      // }, 0);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 600px;
  height: 600px;
  margin: 0 auto;

  border: 1px solid #ccc;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
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
.editContent {
  height: calc(100% - 71px);
  padding: 15px;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-all;
  text-align: left;
  outline: none;
}
.editContent div {
  border-bottom: 1px solid red;
}
</style>

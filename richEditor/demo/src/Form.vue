<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="基本信息" name="first">
      <el-form ref="form" label-width="100px" :model="meeting">
        <el-form-item label="会议名称：">
          <el-input v-model="meeting.subject"></el-input>
        </el-form-item>
        <el-form-item label="主持人：">
          <el-input v-model="meeting.name"></el-input>
        </el-form-item>
        <el-form-item label="会议地址：">
          <el-input v-model="meeting.address"></el-input>
        </el-form-item>
        <el-form-item label="会议时间：">
          <el-date-picker v-model="meeting.date"></el-date-picker>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="会议记录" name="second">
      <el-form ref="form" label-width="100px" :model="meeting">
        <el-form-item label="会议记录：">
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
                <option
                  v-for="item in fontSize"
                  v-bind:key="item.value"
                  :value="item.value"
                >{{item.text}}</option>
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
              <div v-for="item in meeting.info" :key="item.time">
                <strong v-html="`[${item.time}]s ${item.author}开始说：`"></strong>
                <span v-html="item.content"></span>
              </div>
            </div>
          </div>
        </el-form-item>
        <!-- <el-form-item label="音频：">
          <vue-audio-native
            size="small"
            :url="meeting.audio"
            :showCurrentTime="showCurrentTime"
            :showControls="showControls"
            :showVolume="showVolume"
            :showDownload="showDownload"
            :autoplay="autoplay"
            :hint="hint"
            :waitBuffer="waitBuffer"
            :downloadName="downloadName"
            @on-change="change"
            @on-timeupdate="timeupdate"
            @on-metadata="metadata"
            @on-audioId="audioId"
          ></vue-audio-native>
        </el-form-item>-->
        <el-form-item label="音频：">
          <audio :src="meeting.audio" style="width: 400px;height:50px;" controls></audio>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapState, mapActions } from "vuex";
import moment from "moment";
import ToolBar from "./components/ToolBar.vue";

export default {
  name: "app",
  data: function() {
    return {
      activeName: "first",
      currentTargetIndex: 0, // 当前点击的对象的索引，有可能是内容区域自己，有可能是内容区域中的某一个子节点，直接用当前对象不行
      currentTextIndex: 0, // 当前点击的dom命中的文字的索引，比如一段文本为"我和我追逐的梦"，如果此时光标定位到逐之前，追之后,那么它的值为3
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
          text: "fonSize",
          value: 0
        },
        {
          text: "1",
          value: 1
        },
        {
          text: "2",
          value: 2
        },
        {
          text: "3",
          value: 3
        },
        {
          text: "4",
          value: 4
        },
        {
          text: "5",
          value: 5
        },
        {
          text: "6",
          value: 6
        },
        {
          text: "7",
          value: 7
        }
      ]
    };
  },
  created() {
    this.$store.dispatch("meeting/getMeetingById", this.$route.query.id);
  },
  computed: mapState({
    meeting: state => state.meeting.meeting
  }),
  methods: {
    handleExecCommand: function(command, second = false, param) {
      document.execCommand(command, second, param);
    },
    handleFontSizeChange: function() {
      let fontSize = event.target.value;
      if (fontSize === 0) {
        return;
      }
      // // console.log(fonSize);
      this.handleExecCommand("fontSize", false, fontSize);
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
      console.log("this.currentTargetIndex :", this.currentTargetIndex);
      var index = this.getCaretCharacterOffsetWithin(
        divContent.children[this.currentTargetIndex]
      );
      this.currentTextIndex = index;
      console.log(index);
    },
    handleKeyDownChange: function(e) {
      var index = this.getCaretCharacterOffsetWithin(
        divContent.children[this.currentTargetIndex]
      );
      this.currentTextIndex = index;
      let temp = divContent.innerHTML;
      // console.log("event.ctrlKey:", e);
      if (+(e.keyCode || e.which) === 13) {
        if (e.ctrlKey) {
          return;
        }
        const currentTarget = divContent.children[this.currentTargetIndex];
        const {
          innerHTML: { length }
        } = currentTarget;
        console.log("this.currentTextIndex:", this.currentTextIndex);
        if (length !== this.currentTextIndex) {
          alert("新起一行需要鼠标在段落末尾点击哦~");
          e.returnValue = false;
          return false;
        }
        if (confirm("确定要新起一条记录吗?")) {
          this.insertNewLine(
            `[${moment().format("YYYY-MM-DD HH:mm:ss")}]我是新增行`
          );
        } else {
          setTimeout(() => {
            divContent.innerHTML = temp;

            var range = document.createRange();
            var sel = window.getSelection();

            if (divContent.children.length > 0) {
              range.setStart(
                divContent.children[this.currentTargetIndex].childNodes[0],
                this.currentTextIndex
              );
            } else {
              range.setStart(divContent, 1);
            }

            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
          }, 10);
        }

        console.log("confirm:");
      }
    },
    // handleKeyDownChange: function(e) {
    //   var index = this.getCaretCharacterOffsetWithin(
    //     divContent.children[this.currentTargetIndex]
    //   );
    //   this.currentTextIndex = index;
    //   let temp = divContent.innerHTML;
    //   // console.log("event.ctrlKey:", e);
    //   if (+(e.keyCode || e.which) === 13) {
    //     if (event.ctrlKey) {
    //       return;
    //     }
    //     const currentTarget = divContent.children[this.currentTargetIndex];
    //     const {
    //       innerHTML: { length }
    //     } = currentTarget;
    //     console.log("this.currentTextIndex:", this.currentTextIndex);
    //     if (length !== this.currentTextIndex) {
    //       alert("新起一行需要鼠标在段落末尾点击哦~");
    //       e.returnValue = false;
    //       return false;
    //     }
    //     if (confirm("确定要新起一条记录吗?")) {
    //       this.insertNewLine(
    //         `[${moment().format("YYYY-MM-DD HH:mm:ss")}]我是新增行`
    //       );
    //     } else {
    //       setTimeout(() => {
    //         divContent.innerHTML = temp;
    //         // const a = window.getSelection().getRangeAt(0);
    //         // console.log(a);
    //         var range = document.createRange();
    //         var sel = window.getSelection();
    //         // if (divContent.children.length > 0) {
    //         //   range.setStart(
    //         //     divContent.children[divContent.children.length - 1],
    //         //     1
    //         //   );
    //         // } else {
    //         //   range.setStart(divContent, 1);
    //         // }
    //         if (divContent.children.length > 0) {
    //           range.setStart(
    //             divContent.children[this.currentTargetIndex].childNodes[0],
    //             this.currentTextIndex
    //           );
    //         } else {
    //           range.setStart(divContent, 1);
    //         }
    //         // console.log("this.currentTarget:", this.currentTarget);
    //         // console.log("divContent:", divContent);
    //         // range.setStart(this.currentTarget, 1);

    //         // range.setEnd(divContent, divContent.children.length);
    //         range.collapse(true);
    //         sel.removeAllRanges();
    //         sel.addRange(range);
    //       }, 10);
    //     }

    //     console.log("confirm:");
    //   }
    //   // setTimeout(() => {
    //   //   console.log("temp:", temp);
    //   //   console.log(divContent.innerHTML);
    //   // }, 0);
    // },
    // 插入时，手动删除系统生成的子节点，新增一个子节点
    // initDta:初始化的数据
    insertNewLine: function(initData) {
      let that = this;
      setTimeout(function() {
        const { children } = divContent;
        that.currentTargetIndex += 1;
        var deleteNode = children[that.currentTargetIndex];
        var newNode = document.createElement("div");
        newNode.innerHTML = initData;
        deleteNode.insertAdjacentElement("beforebegin", newNode);
        console.log("deleteNode:", deleteNode);
        divContent.removeChild(deleteNode);
        // divContent.appendChild(newNode);
        // console.log(divContent.lastChild);
        // var newNode = document.createElement("div");
        // newNode.innerHTML = initData;
        // console.log("this.currentTargetIndex:", that.currentTargetIndex);
        // this.currentTargetIndex += 1;
        // var deleteNode = divContent.childNodes[this.currentTargetIndex];
        // console.log("deleteNode:", deleteNode);

        // deleteNode.insertAdjacentElement("beforebegin", newNode);
        // divContent.removeChild(deleteNode);

        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(divContent.children[that.currentTargetIndex], 1);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }, 20);
    },
    // 得到当前点击的节点，焦点所在的位置的索引
    getCaretCharacterOffsetWithin: function(element) {
      var caretOffset = 0;
      var doc = element.ownerDocument || element.document;
      var win = doc.defaultView || doc.parentWindow;
      var sel;
      if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
          var range = win.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
        }
      } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
      }
      return caretOffset;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

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
  line-height: 30px;
  word-break: break-all;
  text-align: left;
  outline: none;
}
.editContent div {
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
}
</style>

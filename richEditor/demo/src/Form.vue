<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="demo必读" name="demo">
      <ol>
        <li>这是一个demo,实现了音频文本同步,注意关注每一条数据的秒数</li>
        <li>实现右键新增删除行</li>
        <li>实现如果当前命中文本超出了显示返回,自动聚焦到该文本,支持上下</li>
        <li>实现基本的富文本编辑,撤销与重做</li>
        <li>当鼠标滚动或者点击某一行时,自动暂停当前播放音频</li>
      </ol>
    </el-tab-pane>
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
      <el-card class="contextMenu" v-show="showContext" :style="{left:position.x,top:position.y}">
        <div
          @click="item.handle"
          v-for="item in contextList"
          :key="item.value"
          class="text item"
        >{{item.label }}</div>
      </el-card>
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
            <el-input v-model="newLineInfo.author" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddNewLine">确 定</el-button>
        </div>
      </el-dialog>
      <el-form ref="form" label-width="100px" :model="meeting">
        <el-form-item label="会议记录：">
          <div id="app">
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
                <option
                  v-for="item in fontSize"
                  v-bind:key="item.value"
                  :value="item.value"
                >{{item.text}}</option>
              </select>
            </div>
            <!-- <div
              id="divContent"
              class="editContent"
              @input="handleContentChange"
              @keydown="handleKeyDownChange"
              @click="handleClick"
            >-->
            <div class="editContent" id="divContent" @click="hideContext" @mousewheel="onScroll">
              <div v-for="(item,index) in meeting.info" :key="item.time">
                <strong
                  contenteditable="false"
                  v-html="`第${index+1}条数据:[${item.time}秒] ${item.author}开始说：`"
                ></strong>
                <span
                  v-html="item.content"
                  contenteditable="true"
                  @click="handleSelectOneClick"
                  @blur="handleBlur"
                  :class="item.hightlight?'hightlight':''"
                ></span>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="音频：">
          <audio
            @timeupdate="onTimeUpdate"
            id="play"
            :src="meeting.audio"
            style="width: 400px;height:50px;"
            controls
          ></audio>
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
      min: 0,
      max: 0,
      play: null, // 播放dom
      currentLineIndex: 0, // 当前行的索引
      showContext: false,
      dialogFormVisible: false,
      newLineInfo: {
        startTime: "",
        author: ""
      },
      position: {
        x: 0,
        y: 0
      },
      contextList: [
        {
          label: "删除该行",
          value: 0,
          handle: this.handleDeleteLine
        },
        {
          label: "下方添加一行",
          value: 1,
          handle: this.handleShowAddNewLine
        }
      ],
      activeName: "second",
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
  mounted: function() {
    let that = this;
    divContent.oncontextmenu = function() {
      that.showContext = true;
      that.setCurrentLineIndex();
      return false;
    };
    this.play = document.querySelector("#play");
  },
  computed: mapState({
    meeting: state => state.meeting.meeting
  }),
  methods: {
    //内容区域滚动时,暂停播放
    onScroll: function() {
      this.play.pause();
    },
    // 播放时间改变时
    onTimeUpdate: function() {
      try {
        const { info } = this.meeting;
        const { currentTime } = this.play;
        for (let i = 0; i < info.length - 1; i++) {
          if (currentTime >= info[i].time && currentTime < info[i + 1].time) {
            this.currentLineIndex = i;
          }
        }
        if (currentTime >= info[info.length - 1].time) {
          this.currentLineIndex = info.length - 1;
        }
        this.setScrollPosition();
        this.$store.dispatch("meeting/selectOneLine", this.currentLineIndex);
      } catch (e) {
        console.log("error:", e.message);
      }
    },
    // 输入失去焦点时
    handleBlur: function() {
      if (event.target.innerHTML === "") {
        event.target.innerHTML = "请输入内容";
      }
    },
    // 隐藏右键
    hideContext: function() {
      this.showContext = false;
    },
    handleShowAddNewLine: function() {
      this.dialogFormVisible = true;
      this.showContext = false;
    },
    handleAddNewLine: function() {
      const { startTime, author } = this.newLineInfo;
      let msg = "";
      if (!startTime) {
        msg = "请输入开始时间";
      }
      if (!author) {
        msg = "请输入发言人";
      }
      if (msg) {
        this.$message({
          message: msg,
          type: "warning"
        });
        return;
      }

      this.$store.dispatch("meeting/addNewLine", {
        currentLineIndex: this.currentLineIndex,
        data: {
          time: startTime,
          author,
          content: "请输入内容"
        }
      });
      this.dialogFormVisible = false;
    },
    handleDeleteLine: function() {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("meeting/deleteNewLine", this.currentLineIndex);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.showContext = false;
      });
    },
    // 点击选择某一行时
    handleSelectOneClick: function() {
      this.hideContext();
      this.setCurrentLineIndex();
      this.$store.dispatch("meeting/selectOneLine", this.currentLineIndex);
      this.play.currentTime = this.meeting.info[this.currentLineIndex].time;
      this.play.pause();
    },
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
    // tab点击时
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
    // 设置当前行的索引
    setCurrentLineIndex: function() {
      const divContent = document.querySelector("#divContent");
      const { pageX, pageY } = event;
      this.position = {
        x: pageX + "px",
        y: pageY + "px"
      };
      divContent.querySelectorAll("span").forEach((item, index) => {
        const bounding = item.getBoundingClientRect();
        const { left, right, top, bottom } = bounding;
        if (
          pageX >= left &&
          pageX <= right &&
          pageY >= top &&
          pageY <= bottom
        ) {
          this.currentLineIndex = index;
        }
      });
      // 以下为设置新增一行时的最大值和最小值
      // 如果只有一行
      if (this.meeting.info.length === 1) {
        if (this.currentLineIndex == 0) {
          this.min = this.meeting.info[0].time + 1;
          this.max = 100000;
        }
      } else if (this.meeting.info.length > 1) {
        // 如果时最后一行
        if (this.currentLineIndex == this.meeting.info.length - 1) {
          this.min = this.meeting.info[this.currentLineIndex].time + 1;
          this.max = 100000;
        } else {
          this.min = this.meeting.info[this.currentLineIndex].time + 1;
          this.max = this.meeting.info[this.currentLineIndex + 1].time - 1;
        }
      }
      this.newLineInfo.startTime = this.min;
    },
    // 设置滚动的位置
    setScrollPosition: function() {
      const divContent = document.querySelector("#divContent");
      const divWrap = document.querySelector("#divWrap");
      const currentHightlightObj = divContent
        .querySelectorAll("span")
        [this.currentLineIndex].getBoundingClientRect();
      const divContentBounding = divContent.getBoundingClientRect();
      //console.log("currentHightlightObj:", currentHightlightObj.y);
      //console.log("divContentBounding:", divContentBounding);
      if (currentHightlightObj.bottom > divContentBounding.bottom) {
        const scrollY = currentHightlightObj.bottom - divContentBounding.bottom;
        //divWrap.style.transform = `translateY(${-scrollY}px)`;
        console.log("scrollY:", scrollY);
        divContent.scrollTo(0, divContent.scrollTop + scrollY);
      }
      if (currentHightlightObj.top < divContentBounding.top) {
        const scrollY = divContentBounding.top - currentHightlightObj.top;
        divContent.scrollTo(0, divContent.scrollTop - scrollY);
      }
    },
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
span {
  outline: none;
}
li {
  line-height: 30px;
  color: #333;
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
.editButton {
  padding: 7px;
  margin-right: 12px;
  cursor: pointer;
  background: transparent;
  border: 0px;
  outline: none;
}
.editButton:hover {
  background: #ddd;
  border-radius: 2px;
}
.editContent {
  scroll-behavior: smooth;
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
.contextMenu {
  position: fixed;
  left: 0px;
  top: 20px;
  z-index: 10;
}
.item {
  padding: 5px 0 10px;
  font-size: 14px;
  cursor: pointer;
}
.item:hover {
  color: #f00;
}
.hightlight {
  color: red;
}
</style>

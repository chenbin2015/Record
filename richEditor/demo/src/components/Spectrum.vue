<template>
  <div>
    <div id="a1">{{loading?'loading':''}}</div>
    <div class="bar">
      <div class="play" @click="handlePlay">
        <icon :name="isPlaying?'pause':'play'" class="playIcon"></icon>
      </div>
      <ul class="stepList">
        <li
          class="step"
          v-for="(item,index) in stepList"
          :key="index"
          :style="{ borderLeft:currentStepIndex===index?'2px solid red':'2px solid #ddd', height: '20px',width:index>0 ?((stepList[index].time -stepList[index-1].time))*100 / stepList[stepList.length-1].time+'%':  (stepList[index+1].time / stepList[stepList.length-1].time)*100+'%'}"
        >
          <el-tooltip
            class="item"
            effect="dark"
            :content="'第'+item.time+'秒开始：'+item.author+'发言'"
            placement="top-start"
          >
            <div
              class="stepContent"
              @click="handleStepClick(index)"
            >{{currentStepIndex}}{{item.author}}</div>
          </el-tooltip>
        </li>
      </ul>
      <el-select
        class="speed"
        v-model="selectedSpeed"
        placeholder="设置倍速"
        @change="handleSpeedChange"
      >
        <el-option v-for="item in speed" :key="item.value" :label="item.text" :value="item.value"></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
import Wavesurfer from "wavesurfer";
import constants from "../constants/index";
export default {
  name: "app",
  data: function() {
    return {
      selectedSpeed: 1,
      loading: true,
      speed: constants.speed,
      wavesurfer: {},
      isPlaying: false,
      currentStepIndex: 0
    };
  },
  props: {
    src: "",
    onTimeUpdate: Function,
    onAudioReady: Function,
    stepList: Array
  },
  mounted: function() {
    let that = this;
    setTimeout(() => {
      var wavesurfer = Wavesurfer.create({
        container: "#a1",
        //scrollParent: true,
        waveColor: "green",
        progressColor: "purple",
        // audioRate: 3,
        barWidth: 1,
        barGap: 1,
        cursorColor: "purple",
        cursorWidth: 1
        // hideScrollbar: true
      });
      wavesurfer.load(this.src);
      wavesurfer.on("ready", function() {
        // wavesurfer.play();
      });
      wavesurfer.on("audioprocess", function(currentTime) {
        // wavesurfer.play();

        that.onTimeUpdate(currentTime);
      });
      wavesurfer.on("ready", function(currentTime) {
        // wavesurfer.play();
        that.loading = false;
        that.onAudioReady(wavesurfer);
      });
      // 点击频谱时
      wavesurfer.on("seek", function(position) {
        var currentTime = position * wavesurfer.getDuration();
        that.isPlaying = false;
        wavesurfer.pause();
        that.onTimeUpdate(currentTime);
        let index = that.stepList.findIndex(item => item.time === currentTime);
        if (index > -1) {
          that.currentStepIndex = index;
        } else {
          that.stepList.forEach((item, currentIndex) => {
            if (currentIndex < that.stepList.length - 1) {
              if (
                currentTime > that.stepList[currentIndex].time &&
                currentTime < that.stepList[currentIndex + 1].time
              ) {
                that.currentStepIndex = currentIndex;
              }
            }
          });
        }

        // wavesurfer.play();
      });

      const a1 = document.querySelector("#a1");
      a1.addEventListener("mousemove", function(e) {
        var hover_time =
          wavesurfer.drawer.handleEvent(e, true) * wavesurfer.getDuration();
        // console.log(hover_time);
      });
      that.wavesurfer = wavesurfer;
    }, 200);
  },
  methods: {
    // 速度改变时
    handleSpeedChange: function() {
      console.log(this.selectedSpeed);
      this.wavesurfer.setPlaybackRate(this.selectedSpeed);
    },
    // 点击分段时
    handleStepClick: function(index) {
      this.wavesurfer.seekTo(
        this.stepList[index].time / this.wavesurfer.getDuration()
      );
      this.wavesurfer.pause();
      this.isPlaying = false;
      this.onTimeUpdate(this.stepList[index].time);
      this.currentStepIndex = index;
    },
    // 点击播放时
    handlePlay: function() {
      this.wavesurfer.playPause();
      console.log("this.wavesurfer:", this.wavesurfer.isPlaying());
      this.isPlaying = this.wavesurfer.isPlaying();
    }
  }
};
</script>

<style scope>
.bar {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
}
.stepList {
  display: flex;
  flex: 1;
  border-bottom: 2px solid #ddd;
  margin: 0 10px;
  padding: 0 10px;
}
.step {
  height: 20px;
  width: 5px;
  list-style-type: none;
  border-left: 2px solid #ddd;
}
.currentStep {
  border-left: 2px solid #f00;
}
.stepContent {
  opacity: 0;
  cursor: pointer;
}
.play {
  flex: 0 0 30px;
}
.playIcon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  cursor: pointer;
}
.speed {
  flex: 0 0 150px;
}
</style>

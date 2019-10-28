<template>
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
</template>

<script>
export default {
  name: "BasicInfo",
  props: {
    meeting: Object
  }
};
</script>



<template>
  <div id="app">
    <el-table :data="meetings" style="width: 100%">
      <el-table-column prop="date" label="会议日期" width="180"></el-table-column>
      <el-table-column prop="name" label="会议主持人" width="180"></el-table-column>
      <el-table-column prop="subject" label="会议主题"></el-table-column>
      <el-table-column prop="address" label="会议地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleRedirect(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",

  data() {
    return {
      loading: true
    };
  },
  created() {
    this.$store.dispatch("meeting/getMeetingList");
  },
  computed: mapState({
    meetings: state => state.meeting.meetings
  }),
  methods: {
    handleRedirect: function(id) {
      this.$router.push(`form?id=${id}`);
    }
  }
};
</script>

<style>
</style>


<template>
  <div>hello world</div>
</template>

<script>
import socket from "socket.io-client";
export default {
  name: "demo",
  mounted: function() {
    var socketObj = socket("http://localhost:4000");
    socketObj.on("c_hi", function(data) {
      console.log(data);
    });
    socketObj.emit("hi", "我是来自客户端的消息");
  }
};
</script>

<style>
</style>


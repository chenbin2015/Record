<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="test">213</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'About'
    }
  },
  mounted () {
    console.log('this.$route.params111:', this.$route.params)
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

div {
  color: red;
  font-size: 60px;
}
.test{
  width:200px;
  height: 200px;
  background: green;
}
</style>

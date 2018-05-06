<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <a @click="btnRedirect('about', 2)">about,</a>
    <a @click="btnRedirect('about/company')">about company</a>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    btnRedirect (url, id) {
      console.log(url)
      this.$router.push({name: url, params: { id }})
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

div {
  color: red;
}
</style>

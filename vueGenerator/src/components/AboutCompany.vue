<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'about company'
    }
  },
  mounted () {
    console.log('this.$route.params2222:', this.$route.params)
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

div {
  color: blue;
}
</style>

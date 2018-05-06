<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'About'
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

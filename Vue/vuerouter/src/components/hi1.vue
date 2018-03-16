<template>
  <div>
    <h2>{{ msg }}---{{$route.params.id}}</h2>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: '我是Hi1下面的页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

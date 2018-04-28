<template>
  <div id="app">
    <router-view/>
    <router-view name='bottom' class='footer'/>
  </div>
</template>
<style lang='less'>
@import 'assets/less/index.less';
</style>
<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  created:function(){
    // if(this.$store.store.state.userInfo==0){
    //     this.$router.push('/login')
    // }else{
    //     this.$router.push('/index')
    // }
  }
}
</script>

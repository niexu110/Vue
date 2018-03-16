<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/">首页</router-link>
      <router-link to="/parms/123/啊实打实">goHome</router-link>
      <router-link to="/hi">Hi</router-link>
      <router-link to="/parms/198/123456">parms</router-link>
      <router-link :to="{name:'hi1',params:{id:'123'}}">Hi1</router-link>
      <router-link to="/hi/hi2">Hi2</router-link>
      <router-link to="/hi/hi1">jspang</router-link>
    </div>
    <p>{{$route.name}}</p>
    <router-view name='left' class='left'/>
    <router-view name='right' class='right'/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.left,.right{float: left; width:50%;height:400px;background:#ccc;}
.right{background:#5793dd;}
</style>

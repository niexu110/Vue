<template>
  <div class='view'>
    <div class='main'>
      <img src="../assets/image/circle.png" class='main-img'>
        <router-link to='/income' class="nav income" >
        </router-link>
        <router-link to='/code' class="nav code " >
        </router-link>
        <!-- 推广人列表 -->
        <router-link to='' class="nav person" v-wechat-title='$route.meta.title'>
        </router-link>
        <!-- 服务详情 -->
        <router-link to='' class="nav detail" v-wechat-title='$route.meta.title'>
        </router-link>
        <router-link to='/about' class="nav about" >
        </router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
       
      }
    }
  }
</script>
<style scoped lang='less'>
@import '../less/WXpopularize';
</style>


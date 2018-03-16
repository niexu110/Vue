<template>
  <div>
       <div class='view'>
         <div class='error'></div>
       </div>
  </div>
</template>
<script>
     export default{
          name:'error',
          data(){
               return{

               }
          }
     }
</script>
<style lang="less" scoped>
  .error{
    position:fixed;top:0;left:0;right: 0;bottom:0;
    background:url('../assets/image/timg.png')no-repeat center;
    background-size:7.5rem;
  }
</style>


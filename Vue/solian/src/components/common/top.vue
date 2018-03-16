<template>
  <div class='header' v-if='show'>
       <span @click='goback' v-if="showBack"></span> 
       <em>{{title}}</em>
  </div>
</template>
<script>
     export default{
          name:'top',
          props:['title','showBack','show'],
          methods:{
               goback(){
                 this.$router.back(-1);    
               }
          }
     }
</script>
<style scoped lang='less'>
 .header{
      position: fixed;width:7.5rem;height:.9rem;line-height:.9rem;background:#fff;border-bottom:1px solid #ccc;
      top:0;left:0;font-size:.3rem;color:#333;text-align: center;z-index:100;
      span{position: absolute; background:url('../../assets/image/icon/left.png')no-repeat center;
            background-size:.18rem;width:.5rem;height:.8rem;left:.1rem; top:.05rem;
      }           
 }
</style>



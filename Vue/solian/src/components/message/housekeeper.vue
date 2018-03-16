<template>
  <div v-wechat-title='$route.meta.title'>
       <top :title='title' :showBack='showBack' :show='show'></top>
       <div class='view'></div>
  </div>
</template>
<script>
     import top from '../common/top'
     export default{
          name:'message',
          data(){
               return{
                 title:'搜恋小助手',
                 showBack:true,
                 show:true,
               }
          },
          created:function(){
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
   
</style>


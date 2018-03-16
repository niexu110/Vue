<template>
  <div class="view" v-wechat-title='$route.meta.title'>
      <p>我的推广号:{{number}}</p>
      <img src="../assets/image/bgCode.png" class='bgImg'>
      <img src="../assets/image/ad@2x.png" class='code'>
  </div>
</template>
<script>
      export default{
           data(){
             return{
                number:'579345',
                dataList:''
             }
           },
           methods:{
              successData:async function(params){
                 const res = await this.$http.get(params)
              }
           },
           mounted:function(){
             let params = {
                  cmd:this.$api.number[0],
                  uid:'3306'
             }
            this.successData(params)
           }
      }
</script>
<style scoped lang='less'>
 .view{
   padding:0;position: relative;
   p{position: absolute;left:0;top:.2rem;width:7.5rem;height:.9rem;line-height:.9rem;color:#fff;font-size:.35rem;font-weight: bold;text-align: center;  }
   .bgImg{width:7.5rem;}
   .code{width:3rem;position: absolute;left:2.4rem;top:5.4rem;transform:rotateX(54deg)rotateZ(45deg) }
 }
</style>


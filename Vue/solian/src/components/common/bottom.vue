<template>
  <div>
    <div class='foot-box'>
      <div :class='isFind?"finds":"find"' @click='tabS(0)'>
        <i></i>
        <p>发现</p>
      </div>
      <div :class='isMsg?"msgs":"msg"' @click='tabS(1)' >
        <i></i>
        <p>消息</p>
      </div>
      <div :class='isMy?"mys":"my"' @click='tabS(2)'>
        <i></i>
        <p>我的</p>
      </div>
    </div>
  </div>
</template>
<script>
     export default{
          name:'bottom',
          data(){
               return{
                    isFind:true,
                    isMsg:false,
                    isMy:true
               }
          },
          methods:{
             tabS(type){
                if(type==0){
                    this.isFind=true;
                    this.isMsg=false;
                    this.isMy=false;
                    this.$router.push('/index')
                }else if(type==1){
                    this.isFind=false;
                    this.isMsg=true;
                    this.isMy=false;
                    this.$router.push('/message')
                }else{
                    this.isFind=false;
                    this.isMsg=false;
                    this.isMy=true;
                    this.$router.push('/my')
                }
             }
          }
     }
</script>
<style lang="less" scoped>
  .footer{
    position:fixed;bottom:0;left:0;width:7.5rem;height:1.1rem; border-top:1px solid #ccc;background:#fff;z-index:100;
    .foot-box{
      width:6.9rem;height:1.1rem;margin:0 auto;display:flex;
      div{
        flex: 1;
        i{display: block;width:.55rem;height:.55rem;margin:.1rem auto 0;}
      }
      .finds{
         i{background:url('../../assets/image/icon/finds.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#f83444;padding-top:.04rem;}
      }
      .find{
         i{background:url('../../assets/image/icon/find.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#666;padding-top:.04rem;}
      }
       .msgs{
         i{background:url('../../assets/image/icon/messages.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#f83444;padding-top:.04rem;}
      }
      .msg{
         i{background:url('../../assets/image/icon/message.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#666;padding-top:.04rem;}
      }
       .mys{
         i{background:url('../../assets/image/icon/mys.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#f83444;padding-top:.04rem;}
      }
      .my{
         i{background:url('../../assets/image/icon/my.png')no-repeat center;background-size:.5rem; }
         p{text-align: center;font-size:.28rem;color:#666;padding-top:.04rem;}
      }    
    }
  }
</style>


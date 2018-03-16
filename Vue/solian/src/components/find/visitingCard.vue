<template>
  <div v-wechat-title='$route.meta.title'>
       <div class='view'>
         <div class='heads'>
           <span class='goBack' @click='goBack'></span>
           <span class='langs' @click='showStatus'></span> 
         </div>
         <div class='card-box'>
            <div class='userImg'>
               <img src="../../assets/image/user2.png">
            </div>
            <div class='user-box'>
              <div class='user-nick'>
                  <span>遗失的梦</span>
                  <span :class="isAttes?'spanA':'spanB'">实名认证</span>
              </div>
              <p>23岁·165cm·IT互联网·陕西西安</p>
              <h1> <span>真心会员</span> <em>信用值 55</em></h1>
            </div>
         </div>
         <div class='card-material'>
           <h1>基本资料</h1>
           <p>
             <span v-for='k in items'>{{k}}</span>
             <em></em>
           </p>
         </div>
         <div class='card-proclaim'>
           <h1>爱情宣言</h1>
           <p>{{text}}</p>
         </div>
       </div>
       <div class='conversation'></div>
  </div>
</template>
<script>
import top from '../common/top'
     export default{
          name:'visitingCard',
          data(){
               return{
                 isAttes:false,
                 items:['165cm','本科','4K以上','已购房'],
                 text:'的萨达所多阿萨德阿萨德 阿萨德阿达撒都'
               }
          },
          methods:{
              goBack(){
                this.$router.back(-1); 
              },
              showStatus(){
                  console.log('举报弹窗')
              }
          },
          created:function(){
            console.log('获取到的用户uid 传过来为'+this.$route.query.uid)
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
 .view{padding-top:0;}
   .heads{
      position: fixed;top:0;left:0;width:7.5rem;height:.9rem;z-index:10;
      span{width:.6rem;height:.6rem;}
      .goBack{
         float: left;margin:.15rem .3rem;background:url('../../assets/image/icon/back.png')no-repeat center;
          background-size:.6rem;
            }
      .langs{
         float: right;margin:.15rem .3rem;
         background:url('../../assets/image/icon/lang.png')no-repeat center;background-size:.6rem;
      }
   }
   .card-box{
      position: relative;width:7.5rem;height:9rem;
      .userImg{
        width:7.5rem;height:7.5rem;overflow: hidden;
        img{width:100%;}
      }
      .user-box{
        width:6.9rem;height:2.8rem;position: absolute;bottom:.2rem;left:.3rem;background:#fff;
        border-radius:6px;box-shadow:2px 4px 10px #EBEBEB; 
        .user-nick{
          margin-top:.3rem;margin-left:.4rem;
          span{
            font-size:.48rem;font-weight:bold;margin-right:.2rem;color:#111;
          }
          .spanA{
            border:1px solid #FFA48E;text-align: center;color:#FFA48E;border-radius:4px;
            padding:.02rem .05rem;font-size:.28rem; font-weight:100;
          }
          .spanB{
            border:1px solid #999;text-align: center;color:#999;border-radius:4px;
            padding:.02rem .05rem;font-size:.28rem; font-weight:100;
          }
        }
        p{
          width: 6.2rem;font-size: .3rem;color: #333;padding: .3rem 0;margin-left: .4rem;border-bottom: 1px solid #F5F5F5
          }
        h1{
          width: 6.2rem;margin-left:.4rem;margin-top:.2rem;font-size:.3rem;
          span{
            color:#F83547;padding:0 .4rem 0 .6rem;
          }
          em{
            color:#363636;
          }
        }  
      }
   }
   .card-material{
     width:7.2rem;height:2.1rem;margin-left:.3rem; border-bottom: 1px solid #F4F4F4;
     h1{
       margin-top:.4rem;color:#111;font-size:.35rem;
     }
     p{
       width:6.2rem;height:.6rem;margin-top:.5rem;font-size:.28rem;position: relative;
       span{
         background:#F0F0F1;color:#6C6C6C;border-radius:4px;padding:.05rem .1rem; margin-right:.2rem;
       }
       em{
         position: absolute;width:.2rem;height:.4rem;top:0;right:0;
         background:url('../../assets/image/icon/right.png')no-repeat center;background-size:.2rem; 
       }
      }
   }
   .card-proclaim{
     width:7.2rem;height:auto;margin-left:.3rem;
     h1{
       margin-top:.4rem;color:#111;font-size:.35rem;
     }
     p{
       color:#999;font-size:.26rem;margin-top:.3rem;width:6.6rem;
     }
   }
   .conversation{
    position: fixed;bottom: 0;left: 0;height: 1.1rem;width: 7.5rem;
    background: linear-gradient(to bottom,rgba(255,255,255,.1),rgba(255,255,255,.8));
   }
</style>



<template>
  <div v-wechat-title='$route.meta.title'>
       <div class='view'>
          <div class='header'>
             <div :class="sex==1?'manBg':'girlBg'"></div>
             <div class='head-box'>
               <img src="../../assets/image/user2.png" class='userImg'>
               <p class='site-box '>
                 <span class='site' @click="skip(1)"></span>
                 <span class='compile'></span>
               </p>
                <div class='nick-content'>
                  <h1>沙漠清泉</h1>
                  <p>普通会员</p>
                </div>
                <div class='condition-box'>
                  <div>
                    <h1>{{honor}}</h1>
                    <p>信用值</p>
                  </div>
                  <div :class="isSign?'signA':'signB'" @click="show"></div>
                  <div>
                    <h1>{{like}}</h1>
                    <p>喜欢我的</p>
                  </div>
                </div>
             </div>
          </div>
          <!-- 相册 -->
          <div class='album'>
            <router-link to="*">
              <span class='lt'>相册({{num}})</span>
              <img src="../../assets/image/icon/right.png" class='rt'>
            </router-link>
            <div class='album-list'>
               <div class='upFile lt'></div>
               <div class='lt' v-for="i in list">
                 <img src="../../assets/image/user2.png" :alt="i">
               </div>
            </div>
          </div>
          <div class='content'>
            <router-link  to='*'>邀请好友</router-link>
            <router-link  to='*'>会员服务</router-link>
            <router-link  to='*'>实名认证</router-link>
            <router-link  to='*'>约见记录</router-link>
          </div>        
       </div>
       <div class='pop' v-if="isShow" @click='hide'></div>
  </div>
</template>
<script>
     export default{
          name:'my',
          data(){
               return{
                 sex:1,
                 honor:85,//信用值 
                 like:35,
                 isSign:true,
                 isShow:false,
                 num:5,
                 list:[1,2,3,4]
               }
          },
          methods:{
            show(){
              this.isShow=true;
            },
            hide(){
              this.isShow=false;
            },
            skip(type){
              if(type==1){
                this.$router.push('/site')
              }
            }
          },
          created:function(){
          },
     }
</script>
<style lang="less" scoped>
 .view{padding-top:0;}
 .header{
   width:7.5rem;height: 5.4rem;position: relative;overflow: hidden;
   .manBg{
     width:7.5rem;height: 5.4rem;background:url('../../assets/image/myImg/bgMan.png')no-repeat center;
     background-size:7.5rem;
     }
   .girlBg{
     width:7.5rem;height: 5.4rem;background:url('../../assets/image/myImg/bgWomen.png')no-repeat center;
     background-size:7.5rem;
     } 
    .head-box{
          width: 6.9rem;height: 4.3rem; position: absolute;bottom: 0;left: .3rem;background: #fff;
          border-radius: 6px;box-shadow: 0 10px 5px #F6F6F6;
       .userImg{    
         width: 1.5rem;height: 1.5rem;border-radius: 50%;position: absolute;
         left: 2.7rem;top: -.75rem;border: 5px solid #fff;
         }     
       .nick-content{
           width:2.3rem;margin:.5rem auto .4rem;text-align: center;
           h1{
             color: #111;font-size: .32rem;font-weight: bold;padding-bottom: .3rem;
            }
           p{
             color:#f83444;font-size:.3rem;
            }
         }
       .condition-box{
         width: 6.9rem;height: 1.34rem;display:flex;
         div{
           flex:1;text-align:center;
           h1{
            font-size: .36rem;color: #f83444;padding: .2rem 0; 
           }
           p{
            font-size: .28rem;color: #666;
           }  
         }
         .signA{
           background:url('../../assets/image/myImg/no-sign.png')no-repeat center;background-size:1.34rem; 
         }
         .signB{
           background:url('../../assets/image/myImg/sign.png')no-repeat center;background-size:1.34rem; 
         }  
        } 
       .site-box{
         width:6.3rem;height:.75rem;margin:0 auto;
         span{width:.4rem;height:.75rem; }
         .site{
           float: left;background:url('../../assets/image/myImg/install.png')no-repeat center;background-size:.36rem;
            }
         .compile{
           float: right;background:url('../../assets/image/myImg/compile.png')no-repeat center;background-size:.36rem;
           }
         }
       
     } 
   }
   .album{
      width: 6.9rem;height: 3rem;margin: 0.3rem auto;background: #fff;border-radius: 6px;box-shadow: 0 0 30px 15px #F5F5F5;
      a{
        display: block;width: 6.9rem;height: 1.08rem;
        span{
              padding: .4rem .3rem;font-size: .3rem;color: #111;
        }
        img{
          width: .15rem;margin: .4rem .3rem;
        }
      }
      .album-list{
        width: 6.3rem;height: 1.5rem;margin: 0 auto;overflow: hidden;
        div{
         width: 1.5rem;height: 1.5rem;margin-left: .1rem;border:1px solid #ccc;
         img{width:1.5rem;}  
        }
        .upFile{
          margin:0;background:url('../../assets/image/myImg/upFile.png')no-repeat center;
          background-size:1.5rem;
        }
      }
   }
   .content{
     width: 6.9rem;height: 4.4rem;margin: 0.3rem auto;background: #fff;
     border-radius: 6px;box-shadow: 0 0 30px 15px #F5F5F5;
     a{
       display: block; width: 6.3rem; height: 1.1rem;margin: 0 auto;color:#111;
       border-bottom: 1px solid #F3F3F3;line-height:1.1rem;font-size:.3rem; 
       background:url('../../assets/image/icon/right.png')no-repeat right center;
       background-size:.15rem;
     }
   }
</style>


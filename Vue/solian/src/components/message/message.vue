<template>
  <div v-wechat-title='$route.meta.title'>
       <top :title='title' :showBack='showBack' :show='show'></top>
       <div class='view'>
          <router-link to="/housekeeper" class='list'>
           <span class='chamberlain'></span>
           <div>
             <h1>搜恋小管家</h1>
             <p>欢迎您加入搜恋</p>
           </div>
          </router-link>
          <router-link to="*" class='list'>
            <span class='like'></span>
            <div>
             <h1>喜欢</h1>
             <p>看看谁喜欢你</p>
            </div>
          </router-link>
          <router-link to="*" class='list'>
            <span class='look'></span>
            <div>
             <h2>谁看过我</h2>
            </div>
          </router-link>
       </div>
  </div>
</template>
<script>
import top from '../common/top'
     export default{
          name:'message',
          data(){
               return{
                 title:'消息',
                 showBack:false,
                 show:true,
               }
          },
          created:function(){
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
 .list{
   height:1.6rem;
   span{
     float: left;width:1rem;height:1rem;margin-top:.3rem;
     }
   .chamberlain{
       background:url('../../assets/image/icon/system.png')no-repeat center;background-size:1rem;
     }
   .like{
       background:url('../../assets/image/icon/like.png')no-repeat center;background-size:1rem;
     }
    .look{
       background:url('../../assets/image/icon/looks.png')no-repeat center;background-size:1rem;
     }
   div{
     float: left;height:1rem;margin-top:.3rem;margin-left:.2rem;
     h1{
       font-size:.3rem;color:#111;font-weight:bold;padding:.1rem 0; 
     }
     h2{
      font-size:.3rem;color:#111;font-weight:bold;margin-top:.3rem;; 
     }
     p{
       font-size:.24rem;color:#999;
     } 
   }
 }
</style>


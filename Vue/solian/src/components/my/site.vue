<template>
  <div>
      <top :title='title' :showBack='showBack' :show='show'></top>
       <div class='view'>
         <router-link to="*" class='list'>黑名单</router-link>
         <router-link to="*" class='list'>关于我们</router-link>
         <router-link to="*" class='list'>用户协议</router-link>
         <router-link to="*" class='list'>帮助</router-link>
         <router-link to="*" class='list'>反馈</router-link>
       </div>
       <div class='quit' @click='out'>退出登陆</div>
  </div>
</template>
<script>
import top from '../common/top'
import { mapMutations,mapActions} from 'vuex'
     export default{
          name:'site',
          data(){
             return{
                  title:'设置',
                  showBack:true,
                  show:true,
             } 
          },
          methods:{
             ...mapMutations(['_loginOut']),
               out(){
                 this._loginOut();
                 this.$router.push('/login');
               }
          },
          components:{top}
     }
</script>
<style lang="less" scoped>
   .list{
     height:1.1rem;line-height:1.1rem;border-bottom:1px solid #ECECEC;
     color:#101010;font-size:.28rem; background:url('../../assets/image/icon/right.png')no-repeat 6.9rem center;
     background-size:.15rem;
   }
   .quit{
       width: 6.9rem;height: .9rem;border: 1px solid #F83747;position: fixed;
       left: .3rem;bottom: .6rem;font-size: .3rem;text-align: center; color: #F83747;
       line-height: .9rem;border-radius: .5rem;
   }
</style>


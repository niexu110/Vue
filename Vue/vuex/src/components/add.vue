<template>
  <div>
     <h1>{{msg}}</h1> <hr>
     <h3>{{count}}</h3>
     <p>
          <button @click="add">加</button>
          <button @click="reduce">减</button>
     </p>
      <p>
          <button @click="addAction">加</button>
          <button @click="reduceAction">减</button>
     </p>
   </div>
</template>
<script>
import store from '@/vuex/store'
import {mapState,mapMutations,mapGetters,mapActions} from 'vuex'
     export default{
           data(){
                return{
                     msg:'你好 Vuex',
                    //  count:store.state.count
                }
           },
          //  直接只用count 方法1
          //  computed:{
          //      count(){
          //           return this.$store.state.count
          //      }
          //  },
          // 方法2
          // computed:mapState({
          //      count:state=>state.count
          // }),
          // 方法三
          //  computed:mapState(['count']),
           computed:{
            //  ...扩展运算符
             ...mapState(['count']),
             ...mapGetters(['count'])
           },
           methods:{
             ...mapMutations(['add','reduce']),
             ...mapActions(['addAction','reduceAction'])
             },
           store 
     }
</script>

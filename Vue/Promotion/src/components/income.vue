<template>
  <div class="view" v-wechat-title='$route.meta.title'>
       <div class='container'>
           <div>
                <h1>预计收入</h1>
                <p>￥<span>{{revenue}}</span></p>
           </div>
           <div>
              <h1>已获得收入</h1>
              <p>￥<span>{{price}}</span></p>  
           </div>
       </div>
       <h2>*推广收入将在服务号中发放</h2>
       <p></p>
       <h3>我的推广人:</h3>
       <div class='item' v-for='item in list'>
            <img src="../assets/user.png" >
            <div>
                 <p>{{item.nickName}}</p>
                 <span>{{item.date}}</span>
            </div>
            <div class='abs'>
                <p>+{{item.price}}</p>
                <span v-if="item.status==0">服务中</span>
                <span v-else-if="item.status==1">已发放</span>
                <span v-else>用户退款</span>
            </div>
       </div>
       <div id='pullUp'></div>
  </div>
</template>
<script>
     var obj={nickName:'秋意浓10',date:'今天 03:46',price:'400',status:0};
     export default{
          name:'income',
          data(){
               return{
                    revenue:'3598.00',
                    price:'2578.00',
                    isScroll:false,
                    isOk:true,
                    page:8,
                    list:[
                            {nickName:'秋意浓',date:'今天 03:46',price:'400',status:0},
                            {nickName:'秋意浓2',date:'今天 06:46',price:'500',status:2},
                            {nickName:'秋意浓4',date:'今天 08:46',price:'200',status:0},
                            {nickName:'秋意浓3',date:'今天 08:46',price:'200',status:1},
                            {nickName:'秋意浓5',date:'今天 08:46',price:'200',status:2},
                            {nickName:'秋意浓6',date:'今天 09:46',price:'450',status:1}
                         ]
               }
          },
           methods:{
                successData: async function (url) {
                    const res = await this.$http.get(url)
                      if(res.status==200){
                          this.list.push(obj)
                          this.isScroll=false;
                      }else{
                          this.isScroll=true;
                         el.innerHTML='暂无更多数据...' 
                      }
                    },
               loadMore(el){
                    el.innerHTML='数据加载中...'
                    this.isScroll=true;
                    this.successData('/oftenGoods.php')
                   }  
          },
          mounted:function(){
            //   this.$store.state.userInfo.uid=1100
            console.log(this.$store.state)
              var el=document.getElementById('pullUp');
                window.addEventListener('scroll', ()=> {
                             let docH = parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight);   
                            if(docH>el.offsetTop) {
                                if(!this.isScroll){
                                    this.page--;
                                    if(this.page>0){
                                      this.loadMore(el)
                                    }else{
                                         this.isScroll=true;
                                         el.innerHTML='暂无更多数据...';
                                    }
                                }              
                           }
                         });
                        
          },
        //  自定义scroll方法
        //   directives: {
        //        scroll: {
        //             bind: function (el, binding){
        //                  window.addEventListener('scroll', ()=> {
        //                      let docH = parseInt(document.documentElement.scrollTop+document.documentElement.clientHeight);   
        //                     if(docH>el.offsetTop) {
        //                         if(!binding.value){
        //                             page--;
        //                             if(page>0){
        //                               loadMore()
        //                             }else{
        //                                  binding.value=true;
        //                                  el.innerHTML='暂无更多数据...';
        //                             }
        //                         }              
        //                    }
        //                  });
        //                 function loadMore(){
        //                      el.innerHTML='数据加载中...'
        //                      binding.value=true;
        //                       axios
        //                         .get("http://jspang.com/DemoApi/oftenGoods.php")
        //                         .then(res => {
        //                             if(res.status==200){
        //                                 list.push(obj)
        //                                 binding.value=false;
        //                             }else{
        //                                  binding.value=true;
        //                                 el.innerHTML='暂无更多数据...' 
        //                             }
        //                         })
        //                         .catch(error => {
        //                             console.log(error);
        //                             alert("网络错误,不能访问");
        //                             binding.value=true;
        //                             el.innerHTML='网络异常稍后再试...'
        //                         });
        //                     //  setTimeout(() => {
        //                     //      list.push(obj)
        //                     //  }, 2000);
        //                     //  console.log(list)
        //                     //  setTimeout(() => {
        //                     //     binding.value=false;
        //                     //  }, 2000);
        //                 } 
        //             }
        //        }
        //   }  
     }
</script>
<style scoped lang='less'>
    #pullUp{text-align: center;color:#666;font-size:.3rem;height:.6rem;line-height:.6rem;  }
   .container{
        width:6.9rem;height:2.7rem;margin:.3rem auto;display:flex; 
        background:linear-gradient(to right,rgb(253,46,99),rgb(255,11,79));
        div{
             width:50%;height:2.7rem;color:#fff;
             h1{font-size:.34rem;margin:.6rem .3rem;}
             p{font-size:.36rem;margin:.1rem .3rem;}
        }
   }
   .view{
        h2{text-align:right;font-size:.3rem;color:#ff704f;padding-right:.3rem;margin-bottom:.3rem;}
        >p{background:#f3f3f3;width:7.5rem;height:.2rem;}
        h3{color:#999;padding-left:.3rem;font-size:.35rem;margin:.3rem 0}
   }
   .item{
        height:1.6rem;
        img{float:left;width:1rem;border:1px solid #f3f3f3;border-radius:50%;margin:.3rem;}
        div{
             float:left;height:1rem;
             p{padding-top:.3rem;font-size:.3rem;color:#111;padding-bottom:.1rem;}
             span{ color:#666;font-size:.26rem;}
           }
        .abs{
             position: absolute;top:.3rem;right:.3rem;text-align:center;
             p{font-size:.34rem;color:#111;padding-top:0;}
             span{font-size:.26rem;color:#ff704f;}
             }   
   }
</style>


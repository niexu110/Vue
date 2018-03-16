<template>
  <div v-wechat-title='$route.meta.title'>
       <top :title='title' :showBack='showBack' :show='show'></top>
       <div class='view'>
          <div class="tuchDiv">
               <ul class='tuchUl'>
                    <li v-for="(item,index) in items" 
                      v-touch:right= "eventRight(index)"
                      v-touch:left = "eventLeft(index)"
                      :class='item.className'
                      @click.stop='skip(item.uid)'
                      >
                         <div class='userPic'>
                            <img src="../../assets/image/icon/extreme_s.png" class='userVip' v-if='item.vip==1'>
                            <img src="../../assets/image/icon/masonry_s.png" class='userVip' v-else-if='item.vip==2'>
                            <img src="../../assets/image/icon/vip_s.png" class='userVip' v-else-if='item.vip==3'>
                             <img src="../../assets/image/user.png" class='userIcon'>
                             <p>
                               <span :class="item.isLove?'loveA':'loveB'" @click.stop='love(item,index)'></span>
                             </p> 
                         </div>
                         <div class='userMsg' v-if='item.show'>
                           <h1><b>{{item.nickname}}</b><span>{{item.pro}}&nbsp;{{item.city}}</span></h1>
                           <p><span>{{item.age}}岁</span><span>{{item.height}}cm</span><span>{{item.income}}</span></p>
                         </div>
                    </li>
               </ul>
          </div>  
       </div>
       <div id='popup'></div>
  </div>
</template>
<script>
import top from '../common/top'
import {showEl} from '../../assets/js/fn.js'
   let list=[
              {uid:'120',nickname:'沙漠情缘',pro:'陕西',city:'西安',age:'23',height:'165',income:'4500',show:true,isLove:true,vip:1},
              {uid:'121',nickname:'太公望盛世',pro:'陕西',city:'西安',age:'25',height:'175',income:'9000',show:false,isLove:true,vip:2},
              {uid:'122',nickname:'呵呵哒',pro:'陕西',city:'西安',age:'24',height:'172',income:'5500',show:false,isLove:true,vip:3},
              {uid:'123',nickname:'deleat',pro:'陕西',city:'西安',age:'20',height:'180',income:'2500',show:false,isLove:true,vip:1},
              {uid:'124',nickname:'僬侥的梦',pro:'陕西',city:'西安',age:'21',height:'160',income:'6500',show:false,isLove:true,vip:2} 
            ]
    let list2=[...list];
     export default{
          name:'index',
          data(){
               return{
                 title:'发现',
                 showBack:false,
                 show:true,
                 isLove:true,
                 items:[...list]
               }
          },
          methods:{
            // 左滑
                eventLeft(index){
                  let num=list.length;
                  return function(event, start, end){
                    event.stopPropagation()
                     if(index<num-1){
                       if(index==num-1){
                          list2[index].className='userImg3'; 
                          list2[index+1].className='userImg';
                          list2[index].show=false;
                          list2[index+1].show=true; 
                        }else if(index==num-2){
                          list2[index].className='userImg3'; 
                          list2[index+1].className='userImg'; 
                          list2[index].show=false;
                          list2[index+1].show=true;
                        }else{
                          list2[index].className='userImg3'; 
                          list2[index+1].className='userImg'; 
                          list2[index+2].className='userImg1'; 
                          list2[index].show=false;
                          list2[index+1].show=true;
                        } 
                     }else{ 
                       showEl('数据加载中',2000)
                     }
                  }         
                },
                // 右滑
               eventRight(index){
                 let num=list2.length;  
                 return function(event, start, end) {
                   event.stopPropagation();
                     if(index<num&&index>0){
                        if(index==1){
                            list2[index].className='userImg1'; 
                            list2[index+1].className='userImg2';
                            list2[index].show=false;
                            list2[index-1].className='userImg';
                            list2[index-1].show=true;
                         }else if(index==num-1){
                            list2[index].className='userImg1'; 
                            list2[index].show=false;
                            list2[index-1].className='userImg';
                            list2[index-1].show=true;
                          }else{
                            list2[index].className='userImg1'; 
                            list2[index+1].className='userImg2';
                            list2[index].show=false;
                            list2[index-1].className='userImg';
                            list2[index-1].show=true;
                          }
                     }else{
                       showEl('已经是第一张',2000)
                     }
                   }
               },
               //喜欢
                love(item,index){
                  if(item.isLove){
                     list2.filter((k,i)=>{
                        if(i==index){
                          setTimeout(() => {
                            k.isLove=false;
                            showEl('已喜欢',1000)
                            console.log('发送ajax')
                          }, 2000);
                        }
                     })
                   }else{
                     list2.filter((k,i)=>{
                        if(i==index){
                          setTimeout(() => {
                             k.isLove=true;
                             showEl('取消喜欢',1000)
                             console.log('发送取消喜欢ajax')
                          }, 2000);
                        }
                     })
                   }
                 },
                //  跳转到用户信息页面带参数
                skip(num){
                  addClass(this.items)
                  // 这里可以使用 query这里path+路径 使用params路径需要填写 name+'name
                  this.$router.push({path: 'visitingCard', query:{uid:num}})
                }
          },
          created:function(){
               addClass(this.items)
          },
          components:{top},
     }
     function addClass(item){
          item.forEach((val,index) => {
                        if(index==0){
                          val.className='userImg'
                        }else if(index==1){
                          val.className='userImg1'
                        }else{
                          val.className='userImg2'
                        }
                  });
     }
</script>
<style lang="less" scoped>
.tuchDiv{
     width:6.9rem;height:9.1rem;border-radius:4px;margin:.5rem auto;
     .tuchUl{
         width:6.9rem;height:9.1rem;overflow: hidden;position: relative;
         li{
              position: absolute;bottom:0;left:0;width:6.9rem;height:9.1rem;
              .userPic{
                .userVip{position: absolute;top:0;right:0;width:1.4rem;}
                .userIcon{width:100%;}
                p{
                  width: 100%;height: 1.2rem; position: absolute;bottom: 0;right: 0;z-index: 4;
                  background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.1));
                  span{float:right;margin:.3rem .3rem 0 0;width:.68rem;height:.6rem;}
                  .loveA{
                    background:url('../../assets/image/icon/love.png')no-repeat center;background-size:.68rem;  
                  }
                  .loveB{
                    background:url('../../assets/image/icon/loves.png')no-repeat center;background-size:.68rem;  
                  }
                }
              }
              .userMsg{
                   position: absolute;bottom:0;left:0;height:1.6rem;width:6.9rem;text-align: center;
                   h1{
                        color:#999;font-size:.28rem;padding:.2rem;
                        b{
                             color:#333;font-size:.36rem;font-weight:bold;padding-right:.2rem;   
                             }
                        }
                    p{
                         font-size:.3rem;color:#666;
                         span{
                              padding:.1rem .1rem;
                         }
                    }    
                   
              }
         }
              .userImg{
                transform: translate3d(0px, 0px, 1rem);transition:all .5s linear;opacity:1;z-index:3;
                .userPic{position: absolute;width:6.9rem;height:6.9rem;bottom:2.2rem;left:0;   
                         box-shadow: 0 2px 5px #FA6F7C;
                        
                }   
              }
              .userImg1{
                transform: translate3d(0px, 0px, .5rem);transition:all .5s linear;opacity:.6;z-index:2;
                .userPic{position: absolute;width:6.6rem;height:6.6rem;bottom:1.9rem;left:.15rem;   
                         box-shadow: 0 2px 5px #FA6F7C;
                }   
              }
              .userImg2{
                 transform: translate3d(0px, 0px, 0);transition:all .5s linear;opacity:.2;z-index:1;
                .userPic{position: absolute;width:6.3rem;height:6.3rem;bottom:1.6rem;left:.3rem;   
                         box-shadow: 0 2px 5px #FA6F7C;
                }   
              }
              .userImg3{
                transform: translate3d(-8rem, 0px, 2rem);transition:all .5s linear;opacity:1;z-index:5;
                .userPic{position: absolute;width:7rem;height:7rem;bottom:2.2rem;left:0;   
                         box-shadow: 0 2px 5px #FA6F7C;
                }   
              }
       }
     }
</style>

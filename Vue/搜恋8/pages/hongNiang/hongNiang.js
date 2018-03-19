// pages/hongNiang/hongNiang.js
var config=require('../../utils/config.js');
Page({
  data:{
    imgbox:config.IMG_URL+"/mark@3x.png",
    list:[
      {
        image:config.IMG_URL+"/hongniang1@3x.png",
        name:"红娘1号",
        beizhu:"SouLian8"
      },
      {
        image:config.IMG_URL+"/hongniang2@3x.png",
        name:"红娘2号",
        beizhu:"SouLian8"
      },
      {
        image:config.IMG_URL+"/hongniang3@3x.png",
        name:"红娘3号",
        beizhu:"SouLian8"
      },
    ],
    wxname:"SouLian8",
    tel:"400 6313 520"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
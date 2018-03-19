// pages/qidong/qidong.js
Page({
  data:{
    img:"http://img.qinyikou.cc/screen/393920845794260197.png",
  },
  onLoad:function(options){

  },
  onReady:function(){
    // 页面渲染完成3秒后跳转到‘发现’
     setTimeout(function(){
       wx.switchTab({
        url:'../find/find'
      });
    },3000)
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
// pages/FAQ/FAQ.js
var config=require('../../utils/config.js');
Page({
  data:{
    bcsrc:config.IMG_URL+"/backgrounds.png",
    questuin:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    wx.request({
      url: 'https://m.qinyikou.cc/index.php/Home/User/question',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type':'application/x-www-form-urlencoded'
      }, 
      success: function(res){
        // success
        self.setData({
          questuin:res.data.data
        })
      },
    })
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
  },
  clickquestuin:function(e){
    wx.navigateTo({
      url: '../questuin/questuin?id='+e.currentTarget.dataset.id+'&title='+e.currentTarget.dataset.title,
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})
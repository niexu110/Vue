// pages/apply/apply.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
  data:{
    id:"",//活动id
    list:"",//参加活动的人员
    imgboy:config.IMG_URL+"/x_boy.png",
    imggirl:config.IMG_URL+"/x_girl.png",
    img1:config.IMG_URL+"/x_girlglamour_icon.png",
    img2:config.IMG_URL+"/x_boyglamour_icon.png"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      id:options.id
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/event_person',
      data: {
            id:self.data.id,
            token:md5.MD5(self.data.id+"solianJSKASDKES")
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
           'content-type': 'application/x-www-form-urlencoded'
       }, 
      success: function(res){
        // success
        console.log(res)
        self.setData({
          list:res.data.data
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
  //点击参加人员相信信息
  click:function(e){
    wx.redirectTo({
      url: '../namecard/namecard?uid=' + e.currentTarget.dataset.uid + "&user=" + e.currentTarget.dataset.user,
      success: function(res){
        // success
      },
    })
  }
})
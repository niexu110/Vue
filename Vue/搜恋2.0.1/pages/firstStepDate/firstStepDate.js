// pages/firstStepDate/firstStepDate.js
var app=getApp()
var config=require('../../utils/config.js');
Page({
  data:{
      id:"",
      fid:"",
      img:"",//自己头像
      heattext:"",
      sex:"",
      uid:"",
      heatimg:"",//对方头像
      heattext2:"",
      imgloves:config.IMG_URL+"/heart.gif"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var str=wx.getStorageSync('openid');
    var self=this;
      app.getUserInfo(app.globalData.id,this);
      self.data.fid=app.globalData.id;
    self.setData({
      heattext2:options.myname,
      heatimg:options.src,
      uid:options.uid,
      sex:options.sex,
      img:str.image,
      heattext:str.nickname
    })
    wx.request({
        url: config.SL_URL+'/Home/Engagement/goods',
        data: {},
        method: 'POST', 
        header: {
          "content-type":"application/x-wwww-form-urlencoded"
        }, // 设置请求的 header
        success: function(res){
          var lists=res.data.data.goods
          console.log(lists);
          var arrgoods=lists
          self.setData({
            id:lists[0].goods_id,
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
  //下一步
  nextStep:function(){
    var self=this;
    wx.navigateTo({
      url: '../secondStepDate/secondStepDate?uid='+self.data.uid+'&sex='+self.data.sex+'&id='+self.data.id,
    })
  }
})
// pages/shenfenCard/shenfenCard.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
  data:{
    uid:"",
    token:"",
    cardno:"",
    image:config.IMG_URL+"/backgrounds.png",
    name:"",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.data.uid=app.globalData.id;
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
  formSubmit: function(e) {
    var self=this;
    var yanzheng=/^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
    if(e.detail.value.input==""){
        wx.showToast({
          title:"您未输入真实姓名",
          icon:"loading",
          duration:1000
        })
      }else if(yanzheng.test(e.detail.value.input2)==false){
        wx.showToast({
          title:"您输入的身份证号有误，请重新输入",
          icon:"loading",
          duration:1000
        })
      } else{
      self.setData({
        cardno:e.detail.value.input2,
        name:e.detail.value.input,
      })
      wx.request({
        url: config.SL_URL+'/index.php/Home/Index/identity',
        data: {
          name:self.data.name,
          identity:self.data.cardno,
          uid:self.data.uid,
          token:md5.MD5(self.data.uid+"solianJSKASDKES")
        },
        method: 'POST',
        header: {
        'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          // success
          if (res.data.code == 200) {
            wx.showToast({
              title: "认证成功！",
              icon: "success",
              duration: 2000,
              success: function (res) {
                wx.switchTab({
                  url: '../my/my',
                })
              }
            })
          }
          else if (res.data.code == 404) {
            wx.showToast({
              title: res.data.massage,
              icon: "loading",
              duration: 1000
            })
          }
        }
      })
    }
  },
})
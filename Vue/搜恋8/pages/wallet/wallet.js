// pages/wallet/wallet.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
  data: {
    uid: '',
    token: '',
    page: '',
    image: '',
    nickname: '',
    money: '',
    soul: '',
    txt: '',
    imgRight:config.IMG_URL+'/n_my_user_right.png',
    img:config.IMG_URL+"/my_wallet_2.png",
    img1:config.IMG_URL+"/my_wallet_3.png",
    pwd:''
  },
  //调微信支付
  appPayment: function () {
      wx.navigateTo({
        url: '../setPassword/setPassword',
      })
  },
  searchB: function () {
      var self = this.data;
      wx.navigateTo({
        url: '../searchB/searchB?uid='+self.uid+'&money='+self.soul,
      })
      wx.setStorageSync('data', self);
  },
  onLoad: function (options) {
    var str=wx.getStorageSync('openid');
    var self = this;
    self.setData({
      uid:app.globalData.id,
      nickname:str.nickname,
      image:str.image
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/money',
      data: {
        uid: this.data.uid,
        token: md5.MD5(this.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: {'content-type': 'application/x-www-form-urlencoded'}, 
      success: function (res) {
        var money = res.data.data.money
        var sl = res.data.data.virtual
        var txt = res.data.data.privilege + '张'
        self.setData({
          money: money,
          soul: sl,
          txt: txt,
          pwd:res.data.data.email
        })
      }
    })
  },
  coupon:function(){
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  setPassword:function(){
    var self=this;
    wx.redirectTo({
      url: '../changePassword/changePassword?uid='+self.data.uid,
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
// pages/coupon/coupon.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app = getApp();
Page({
  data: {
    uid: '50',
    id: '',
    c_id: '',
    token: '',
    not: true,
    alread: false,
    expired: false,
    notName: 'notName',
    alreadName: '',
    expiredName: '',
    notuseCloss: true,
    alreadCloss: false,
    expiredCloss: false,
    image: [],
    nullCoupon:false,
    youhuiimg:config.IMG_URL+"/wei@3x.png",
    zanwuimg:config.IMG_URL+"/zanwu.png"

  },
  notUse: function () {
    var self = this;
    self.setData({
      not: true,
      alread: false,
      expired: false,
      notName: 'notName',
      alreadName: '',
      expiredName: '',
      notuseCloss: true,
      alreadCloss: false,
      expiredCloss: false,
    })
  },
  alreadUse: function () {
    var self = this;
    self.setData({
      not: false,
      alread: true,
      expired: false,
      notName: '',
      alreadName: 'alreadName',
      expiredName: '',
      notuseCloss: false,
      alreadCloss: true,
      expiredCloss: false,
    })
  },
  expiredUse: function () {
    var self = this;
    self.setData({
      not: false,
      alread: false,
      expired: true,
      notName: '',
      alreadName: '',
      expiredName: 'expiredName',
      notuseCloss: false,
      alreadCloss: false,
      expiredCloss: true,
    })
  },
  onLoad: function (options) {
    var self = this
    self.data.uid = app.globalData.id;
  },
  onReady: function () {
    var self = this
    console.log(self.data.uid)
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/coupons',
      data: {
        uid: self.data.uid,
        // c_id:self.data.c_id,
        token: md5.MD5(self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var list = res.data.data;
        if(res.data.code == 404) {
          self.setData({
            nullCoupon:true
          })
        }
        for (var k in list) {
          list[k].start_time = new Date(parseInt(list[k].start_time) * 1000).toLocaleString().substr(0, 9).replace(/\//g, '.')
          list[k].end_time = new Date(parseInt(list[k].end_time) * 1000).toLocaleString().substr(0, 9).replace(/\//g, '.')
        }
        self.setData({
          image: list
        })
      }
    })
  },
})
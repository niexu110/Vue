// pages/missionDetail/missionDetail.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp();
Page({
  data: {
    name: '', images: "",imgUrl: [],
    boy: config.IMG_URL+'/x_boys.png', girl: config.IMG_URL+'/x_girls.png',
    man: "", women: "",
    jd: "", wd: "",//经度 纬度
    uid: "", id: '',hid:'',//用户id 活动id 订单id
    token: '',
    sites:'' ,
    sumnumber: '0',
    abort_time: '', date_time: '',
    price: '', title: '', toto: '',
    sponsor: '', site: '', photo: '',
    label: '',
    event_detail: '',
    photo1:config.IMG_URL+'/n_love.png',
    photo2:config.IMG_URL+'/n_my_user_right.png',
    photo3:config.IMG_URL+'/min_06.gif',
    photo4:config.IMG_URL+'/min_08.gif',
    photo5:config.IMG_URL+'/min_10.gif',
    photo6:config.IMG_URL+'/min_12.gif',
    photo7:config.IMG_URL+'/min_18.gif',
    photo8:config.IMG_URL+'/min_14.gif',
    photo9:config.IMG_URL+'/min_16.gif',
  },
  onLoad: function (options) {
    var self = this;
    self.data.uid = app.globalData.id;
    self.setData({ id: options.id })
    wx.setNavigationBarTitle({ title: options.name, })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/lovelist',
      data: {
        id: self.data.id,
        token: md5.MD5(self.data.id + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var arr = res.data.data;
        var list=arr.event_detail
        list=list.replace(/&nbsp;/g,'').replace(/<([a-zA-Z]+)\s*[^><]*>/g,"").replace(/<\/([a-zA-Z]+)\s*[^><]*>/g,"");
        self.setData({
          name: arr.name,
          images: arr.images,
          sites: arr.number / 2,
          abort_time: new Date(parseInt(arr.abort_time) * 1000).toLocaleString().substr(0, 9),
          date_time: new Date(parseInt(arr.date_time) * 1000).toLocaleString().substr(9, 16),
          site: arr.site,
          photo: arr.photo,
          sponsor: arr.sponsor,
          label: arr.event_state,
          price: arr.price,
          man: arr.man,
          women: arr.waman,
          event_detail: list,
          sponsor: arr.event_sponsor,//公司名
          title: arr.event_count,//举办次数
          toto: arr.event_person,
          sumnumber: arr.count,
          jd: arr.jd,
          wd: arr.wd
        })
      }
    })
  },
  onReady: function () {
    var self = this;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/event_person',
      data: {
        id: self.data.id,
        x: self.jd, y: self.wd,
        token: md5.MD5(self.data.id + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) { 
        var list = res.data.data
        var arr = []
        arr = list;
        self.setData({ imgUrl: arr.splice(0,5) }) },
    })
  },
  //点击头像
  clickimg: function () {
    var self = this;
    wx.navigateTo({ url: '../apply/apply?id=' + self.data.id, })
  },
  //拨打电话
  clickPhoto: function () { var self = this; wx.makePhoneCall({ phoneNumber: self.data.photo, }) },
  /* 点击参加 */
  clickbtn: function (e) {
    var self=this;
    if(self.data.uid==""||self.data.uid==undefined){
      wx.redirectTo({ url: '../login/login',})}
   else{
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/addGoods',
      data: {
        uid: self.data.uid,
        id: self.data.id,
        money: self.data.price,
        token: md5.MD5(self.data.id + self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var hid=res.data.data.id
        res.data.code==404?(
          res.data.massage=='你已经参加过次活动了'? 
            wx.showToast({title: "你已经参加过次活动了",icon: "loading", duration: 2000})
          : wx.showToast({title: "活动已结束",icon: "loading",duration: 2000 }))
          : (self.data.price==0.00?wx.showToast({title: "报名成功",icon: "loading", duration: 2000})
          :wx.redirectTo({ url: '../pay/pay?id=' + hid + '&uid=' + self.data.uid,}));
       },
     })
    }
  }
})
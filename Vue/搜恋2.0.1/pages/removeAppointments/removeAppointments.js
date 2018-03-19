// pages/removeAppointments/removeAppointments.js
var md5 = require('../../utils/MD5.js');
var config = require('../../utils/config.js');
var app = getApp()
Page({
  data: {
    fid: '',
    eid: '',
    uid: '',
    type: 1,
    message: '',
    picture: 'http://file06.16sucai.com/2016/0421/55327507e889682c3e13631c78b5d094.jpg',
    moneyIcon: 'http://img.qinyikou.cc/icons/my_b.png',
    restaurant: '平壤银畔店',
    place: '高新路店',
    times: '2016年12月12日18点',
    num: '3',
    only: '仅限女生',
    forDo: '负责接送',
    money: '1250',
    backTimes: '原路退回,1~7个工作日内退款到我的钱包',
    must: '*必填项',
    reasonM: '请填写取消原因',
    items: [
      { name: '计划有变，没时间约会', value: '计划有变，没时间约会' },
      { name: '身体不舒服，无法如约到达', value: '身体不舒服，无法如约到达' },
      { name: '外面空气污染严重，不想出门', value: '外面空气污染严重，不想出门' },
      { name: '去过那家店，不满意环境', value: '去过那家店，不满意环境' },
      { name: '朋友、网上评价不太乐观', value: '朋友、网上评价不太乐观' },
    ]
  },
  //单选
  radioChange: function (e) {
    var self = this
    self.setData({
      reasonM: e.detail.value,
    })
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //表单提交
  formSubmit: function (e) {
    var value = e.detail.value;
    this.setData(
      {
        reason: value.reason,
        radio: value.radio,
      }
    );
    var self = this
    wx.request({
      url: config.SL_URL + '/Home/Engagement/user_off',
      data: {
        eid: self.data.eid,
        uid: self.data.uid,
        message: self.data.reasonM,
        token: md5.MD5(self.data.eid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  //键盘触发
  // bindTextAreaBlur:function() {
  //     console.log(e.detail.value)
  // },
  onLoad: function (options) {
    var self = this
    console.log(options.id)
    app.getUserInfo(app.globalData.id, this);
    self.data.uid = app.globalData.id;
    self.setData({
      eid:options.id
    })
  },
})
// pages/questuin/questuin.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
Page({
  data: {
    id: "",  title: "",  content: "",
    img:config.IMG_URL+"/backgrounds.png",
  },
  onLoad: function (options) {
    var self = this;
    self.setData({ id: options.id, title: options.title })
    wx.setNavigationBarTitle({ title: self.data.title, })
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/question_list',
      data: {
        id: self.data.id,
        token: md5.MD5(self.data.id + 'solianJSKASDKES')
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        var list = res.data.data.content
        list=list.replace(/&nbsp;/g,'')
        list=list.replace(/<([a-zA-Z]+)\s*[^><]*>/g,"");
        list=list.replace(/<\/([a-zA-Z]+)\s*[^><]*>/g,"");
        self.setData({
          content: list
        })
      },
    })
  },
})
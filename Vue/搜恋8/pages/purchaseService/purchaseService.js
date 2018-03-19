// pages/purchaseService/purchaseService.js
var md5 = require('../../utils/MD5.js');
var config = require('../../utils/config.js');
var pay1 = [], apply1 = [], drawback1 = [], bestow1 = [];
var app = getApp();
var arrlist = [];
Page({
  data: {
    uid: "",
    page: 0,
    type: "0",
    all: true,
    pay: false,
    apply: false,
    drawback: false,
    bestow: false,
    alls: true,//全部
    pays: false,//待支付
    applys: false,//待使用
    drawbacks: false,//已使用
    bestows: false,//退款
    pay1: [],//待支付
    apply1: [],//待使用
    drawback1: [],//已使用
    bestow1: [],//退款
    list: [],
    dabaokiu: false,
    photo1: config.IMG_URL + '/zanwu.png'
  },
  addLine: function (e) {
    var a = e.target.id;
    var self = this;
    if (a == "all") {
      self.setData({
        all: true,
        pay: false,
        apply: false,
        drawback: false,
        bestow: false,
        alls: true,
        pays: false,
        applys: false,
        drawbacks: false,
        bestows: false,
      })
    } else if (a == "pay") {
      self.setData({
        all: false,
        pay: true,
        apply: false,
        drawback: false,
        bestow: false,
        alls: false,
        pays: true,
        applys: false,
        drawbacks: false,
        bestows: false,
        pay1: pay1
      })
    } else if (a == "apply") {
      self.setData({
        all: false,
        pay: false,
        apply: true,
        drawback: false,
        bestow: false,
        alls: false,
        pays: false,
        applys: true,
        drawbacks: false,
        bestows: false,
        apply1: apply1,
      })
    } else if (a == "bestow") {
      self.setData({
        all: false,
        pay: false,
        apply: false,
        drawback: false,
        bestow: true,
        alls: false,
        pays: false,
        applys: false,
        drawbacks: false,
        bestows: true,
        bestow1: bestow1
      })
    } else if (a == "drawback") {
      self.setData({
        all: false,
        pay: false,
        apply: false,
        drawback: true,
        bestow: false,
        alls: false,
        pays: false,
        applys: false,
        drawbacks: true,
        bestows: false,
        drawback1: drawback1
      })
    }
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var self = this
    self.data.uid = app.globalData.id;
    wx.request({
      url: config.SL_URL + '/index.php/Home/Goods/indent',
      data: {
        uid: self.data.uid,
        //page:self.data.page,
        type: self.data.tyle,//0为全部 1为待支付 2为待使用 3为已使用 4为退款
        token: md5.MD5(self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        console.log(res)
        if (res.data.code == 404) {
          self.setData({
            dabaokiu: true
          })
        } else if (res.data.code == 200) {
          var arrAll = res.data.data;
          var arr1 = [];
          arr1 = arrAll
          for (var i in arrAll) {
            arr1[i].images = arrAll[i].images;
            arr1[i].name = arrAll[i].name;
            arr1[i].money = arrAll[i].money;
            arr1[i].ordernumber = arrAll[i].ordernumber;
            arr1[i].type = arrAll[i].type;//0为全部 1为待支付 2为待使用 3为已使用 4为退款
            arr1[i].time = new Date(parseInt(arrAll[i].time) * 1000).toLocaleString().substr(0, 16);
            arr1[i].status = arrAll[i].status;//0为待支付 1为待使用 2为已使用 3为退款
            arr1[i].id = arrAll[i].id;
            if (arrAll[i].status == 0) {
              arr1[i].hidden = true;
              arr1[i].state = "待支付";
              arr1[i].shop = "去支付";
              arr1[i].bind = "payzhifu";
            } else if (arrAll[i].status == 1) {
              arr1[i].hidden = true;
              arr1[i].state = "待使用";
              arr1[i].shop = "去使用";
              arr1[i].bind = "payshiyong";
            } else if (arrAll[i].status == 2) {
              arr1[i].hidden = true;
              arr1[i].state = "已使用";
              arr1[i].shop = "去评论";
            } else if (arrAll[i].status == 3) {
              arr1[i].hidden = false;
              arr1[i].state = "退款";
            }
          }
          arrlist = arr1
          self.setData({
            list: arrlist
          })
          var lists = self.data.list;
          for (var i in lists) {
            if (lists[i].state == "待支付") {
              pay1.push(lists[i])
            } else if (lists[i].state == "待使用") {
              apply1.push(lists[i])
            } else if (lists[i].state == "已使用") {
              drawback1.push(lists[i])
            } else if (lists[i].state == "退款") {
              bestow1.push(lists[i])
            }
          }
          self.setData({
            pay1: pay1,
            apply1: apply1,
            drawback1: drawback1,
            bestow1: bestow1
          })
        }
      },
    })

  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    pay1 = [];
    apply1 = [];
    drawback1 = [];
    bestow1 = [];
    self.data.page = 0;
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    wx.request({
      url: config.SL_URL + '/index.php/Home/Goods/indent',
      data: {
        uid: self.data.uid,
        //page:self.data.page,
        type: self.data.tyle,//0为全部 1为待支付 2为待使用 3为已使用 4为退款
        token: md5.MD5(self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // success
        console.log(res)
        var arrAll = res.data.data;
        var arr1 = [];
        arr1 = arrAll
        for (var i in arrAll) {
          arr1[i].images = arrAll[i].images;
          arr1[i].name = arrAll[i].name;
          arr1[i].money = arrAll[i].money;
          arr1[i].ordernumber = arrAll[i].ordernumber;
          arr1[i].type = arrAll[i].type;//0为全部 1为待支付 2为待使用 3为已使用 4为退款
          arr1[i].time = new Date(parseInt(arrAll[i].time) * 1000).toLocaleString().substr(0, 16);
          arr1[i].status = arrAll[i].status;//0为待支付 1为待使用 2为已使用 3为退款
          arr1[i].id = arrAll[i].id;
          if (arrAll[i].status == 0) {
            arr1[i].hidden = true;
            arr1[i].state = "待支付";
            arr1[i].shop = "去支付";
            arr1[i].bind = "payzhifu";
          } else if (arrAll[i].status == 1) {
            arr1[i].hidden = true;
            arr1[i].state = "待使用";
            arr1[i].shop = "去使用";
            arr1[i].bind = "payshiyong";
          } else if (arrAll[i].status == 2) {
            arr1[i].hidden = true;
            arr1[i].state = "已使用";
            arr1[i].shop = "去评论";
          } else if (arrAll[i].status == 3) {
            arr1[i].hidden = false;
            arr1[i].state = "退款";
          }
        }
        arrlist = arr1
        self.setData({
          list: arrlist
        })
        var lists = self.data.list;
        for (var i in lists) {
          if (lists[i].state == "待支付") {
            pay1.push(lists[i])
          } else if (lists[i].state == "待使用") {
            apply1.push(lists[i])
          } else if (lists[i].state == "已使用") {
            drawback1.push(lists[i])
          } else if (lists[i].state == "退款") {
            bestow1.push(lists[i])
          }
        }
        self.setData({
          pay1: pay1,
          apply1: apply1,
          drawback1: drawback1,
          bestow1: bestow1
        })
      },
    })
    wx.stopPullDownRefresh()
  },
  //上拉加载
  onReachBottom: function () {
    // Do something when page reach bottom.
    var self = this;
    wx.showToast({
      title: '加载中....',
      icon: 'loading',
      duration: 1000
    })
    self.data.page++;
    wx.request({
      url: config.SL_URL + '/index.php/Home/Goods/indent',
      data: {
        uid: self.data.uid,
        page: self.data.page,
        type: self.data.tyle,//0为全部 1为待支付 2为待使用 3为已使用 4为退款
        token: md5.MD5(self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        // success
        console.log(res)
        var arrAll = res.data.data;
        console.log(arrAll)
        if (arrAll == "") {
          wx.showToast({
            title: '没有更多数据....',
            icon: 'loading',
            duration: 1000
          })
        } else if (res.data.code == 200) {
          var arr1 = [];
          arr1 = arrAll
          for (var i in arrAll) {
            arr1[i].images = arrAll[i].images;
            arr1[i].name = arrAll[i].name;
            arr1[i].money = arrAll[i].money;
            arr1[i].ordernumber = arrAll[i].ordernumber;
            arr1[i].type = arrAll[i].type;//0为全部 1为待支付 2为待使用 3为已使用 4为退款
            arr1[i].time = new Date(parseInt(arrAll[i].time) * 1000).toLocaleString().substr(0, 16);
            arr1[i].status = arrAll[i].status;//0为待支付 1为待使用 2为已使用 3为退款
            arr1[i].id = arrAll[i].id;
            if (arrAll[i].status == 0) {
              arr1[i].hidden = true;
              arr1[i].state = "待支付";
              arr1[i].shop = "去支付";
              arr1[i].bind = "payzhifu";
            } else if (arrAll[i].status == 1) {
              arr1[i].hidden = true;
              arr1[i].state = "待使用";
              arr1[i].shop = "去使用";
              arr1[i].bind = "payshiyong";
            } else if (arrAll[i].status == 2) {
              arr1[i].hidden = true;
              arr1[i].state = "已使用";
              arr1[i].shop = "去评论";
            } else if (arrAll[i].status == 3) {
              arr1[i].hidden = false;
              arr1[i].state = "退款";
            }
            arrlist.push(arr1[i])
          }
          self.setData({
            list: arrlist
          })
          var lists = self.data.list;
          for (var i in lists) {
            if (lists[i].state == "待支付") {
              pay1.push(lists[i])
            } else if (lists[i].state == "待使用") {
              apply1.push(lists[i])
            } else if (lists[i].state == "已使用") {
              drawback1.push(lists[i])
            } else if (lists[i].state == "退款") {
              bestow1.push(lists[i])
            }
          }
          self.setData({
            pay1: pay1,
            apply1: apply1,
            drawback1: drawback1,
            bestow1: bestow1
          })
        }
      },
    })
  },
  //去支付
  payzhifu: function (e) {
    var self = this;
    wx.navigateTo({
      url: '../pay/pay?id=' + e.currentTarget.dataset.id + '&uid=' + self.data.uid,
    })
  },
  //去使用
  payshiyong: function (e) {
    var self = this;
    wx.navigateTo({
      url: '../orderDetails/orderDetails?id=' + e.currentTarget.dataset.id,
    })
  }
})
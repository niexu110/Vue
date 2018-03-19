// pages/historicalActivities/historicalActivities.js
var content=[]
var config=require('../../utils/config.js');
Page({
  data: {
    image: config.IMG_URL+'/my_b.png',
    page:0,
    list: [
      {
        id: '',
        img: '',
        content: '',
        site: '地点',
        date: '',
        str: '',
        title: '标语',
        price: ''
      }
    ],
  },
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/history',
      data: {
        page:self.data.page
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var lists = res.data.data;
        var arr = self.data.list;
        arr = lists
        for (var i in arr) {
          arr[i].id = lists[i].id;
          arr[i].img = lists[i].images;
          arr[i].content = lists[i].name;
          arr[i].str = lists[i].number;
          arr[i].price = lists[i].price;
          arr[i].date = new Date(parseInt(lists[i].time) * 1000).toLocaleString().substr(0, 9);
          arr[i].click = "click";
        }
        content=arr
        self.setData({ list: content })
      },
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    self.data.page=0
      wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/history',
      data: {
        page:self.data.page
        },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var lists = res.data.data;
        var arr = self.data.list;
        arr = lists
        for (var i in arr) {
          arr[i].id = lists[i].id;
          arr[i].img = lists[i].images;
          arr[i].content = lists[i].name;
          arr[i].str = lists[i].number;
          arr[i].price = lists[i].price;
          arr[i].date = new Date(parseInt(lists[i].time) * 1000).toLocaleString().substr(0, 9);
          arr[i].click = "click";
        }
        content=arr
        self.setData({ list: content })
      },
    })
    wx.stopPullDownRefresh()
  },
  //上拉加载
  onReachBottom: function () {
    // Do something when page reach bottom.
    var self = this;
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
    self.data.page++;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/history',
      data: {
        page:self.data.page
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var lists = res.data.data;
        var arr = self.data.list;
        arr = lists
        for (var i in arr) {
          arr[i].id = lists[i].id;
          arr[i].img = lists[i].images;
          arr[i].content = lists[i].name;
          arr[i].str = lists[i].number;
          arr[i].price = lists[i].price;
          arr[i].date = new Date(parseInt(lists[i].time) * 1000).toLocaleString().substr(0, 9);
          arr[i].click = "click";
          content.push(arr[i])
        }
        self.setData({ list: content })
      },
    })
  },

  click: function (e) { wx.navigateTo({ url: '../eatFriend/eatFriend?id=' + e.currentTarget.dataset.id + "&content=" + e.currentTarget.dataset.content, }) }
})
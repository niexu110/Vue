var md5 = require('../../utils/MD5.js');
var app = getApp();
var mydate = new Date;
var config=require('../../utils/config.js');
var str = null;
str = str + mydate.getFullYear() + "-";
str = str + (mydate.getMonth() + 1);
var myofferMsg = [];
Page({
    data: {
        uid: '', token: '', today: str,
        word: '礼物收益',
        dateClose1: false, dateClose2: false,
        dateImg1: config.IMG_URL+'/x_date_icon.png',
        dateImg2: config.IMG_URL+'/x_date_icon.png',
        getter: true, give: false, myoffer: false,
        givegift: '', myoffergift: '', gettergift: 'gettergift',
        getterClose: true, giveClose: false, myofferClose: false,
    },

    //点击收到的礼物
    chociegetter: function () {
        if (this.data.getter == false) {
            this.setData({
                getter: true, give: false, myoffer: false,
                givegift: '', myoffergift: '', gettergift: 'gettergift', getterClose: true,
                giveClose: false, myofferClose: false, dateClose2: false,
            });
        }
    },
    //点击送出的礼物
    chociegive: function () {
        var self = this
        if (self.data.give == false) {
            self.setData({
                getter: false, give: true, myoffer: false,
                gettergift: '', myoffergift: '', givegift: 'givegift',
                getterClose: false, giveClose: true, myofferClose: false, dateClose1: false,
            });
        }
        wx.request({
            url: config.SL_URL+'/index.php/Home/User/giftmy',
            data: {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                var list = res.data.data;
                console.log(list)
                for (var k in list) {
                    list[k].times = new Date(parseInt(list[k].times) * 1000).toLocaleString().substr(0, 10)
                    list[k].clickthis = 'clickthis'
                }
                self.setData({ giveMsg: list, })
                
            }
        })
    },
    //点击我的贡献榜
    chocieoffer: function () {
        this.setData({
            getter: false, give: false, myoffer: true,
            gettergift: '', givegift: '', myoffergift: 'myoffergift',
            getterClose: false, giveClose: false, myofferClose: true, dateClose2: false, dateClose1: false,
        });
    },
    onLoad: function () {
        var self = this
        app.getUserInfo(app.globalData.id, this);
        self.data.uid = app.globalData.id;
        wx.request({
            url: config.SL_URL+'/index.php/Home/User/mygift',
            data: {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res.data)
                var list = res.data.data;
                for (var k in list) {
                    list[k].times = new Date(parseInt(list[k].times) * 1000).toLocaleString().substr(0, 10)
                }
                self.setData({ getterMsg: list })
                var moneyList = list
                var money = []
                for (var i in moneyList) {
                    money.push(moneyList[i].money)
                }
                function sort(num){
                    return function arr(a,b){
                        return a[num]-b[num];
                    }
                }
                list.sort(sort("money"))
                self.setData({ myofferMsg: list })
            }
        })
    },
    //下拉刷新
    onPullDownRefresh: function () {
    var self = this;
      wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
        wx.request({
            url: config.SL_URL+'/index.php/Home/User/mygift',
            data: {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res.data)
                var list = res.data.data;
                for (var k in list) {
                    list[k].times = new Date(parseInt(list[k].times) * 1000).toLocaleString().substr(0, 10)
                }
                self.setData({ getterMsg: list })
                var moneyList = list
                var money = []
                for (var i in moneyList) {
                    money.push(moneyList[i].money)
                }
                function sort(num){
                    return function arr(a,b){
                        return a[num]-b[num];
                    }
                }
                list.sort(sort("money"))
                self.setData({ myofferMsg: list })
            }
        })
    wx.stopPullDownRefresh()
  },
})
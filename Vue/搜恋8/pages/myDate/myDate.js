// pages/myDate/myDate.js
var md5 = require('../../utils/MD5.js');
var util = require('../../utils/util.js');
var config=require('../../utils/config.js');
var pay1 = [], apply1 = [], drawback1 = [], bestow1 = [];
var app = getApp()
Page({
    data: {
        uid: '', type: '', page: '', token: '',
        all: true, pay: false, apply: false,
        alls: true, pays: false, applys: false,dabaokiu:false,
        zanwu:config.IMG_URL+'/zanwu.png',
    },
    //邀请我的
    requestMe: function (e) {
        var e = e.currentTarget.dataset
        wx.navigateTo({ url: '../eatAgreeOrRefuse/eatAgreeOrRefuse?id=' + e.id})
    },
    //我发起的
    myPlan: function (e) {
        var e = e.currentTarget.dataset
        wx.navigateTo({ url: '../myPlan/myPlan?id=' + e.id+'&fb_type='+e.fb_type})
    },
    //团体约会
    team: function (e) {
        var e = e.currentTarget.dataset
        wx.navigateTo({url: '../participatingMission/participatingMission?g_id='+ e.g_id+"&abort_time="+e.abort_time+"&time="+e.time+"&date_time="+e.date_time})
    },
    addLine: function (e) {
        var a = e.target.id;
        var self = this;
        if (a == "all") {
            self.setData({
                all: true, pay: false, apply: false,
                alls: true, pays: false, applys: false,

            })
        } else if (a == "pay") {
            self.setData({
                type: '2',
                all: false, pay: true, apply: false,
                alls: false, pays: true, applys: false,
            })
            wx.request({
                url: config.SL_URL+'/index.php/Home/Engagement/issue',
                data: {
                    uid: self.data.uid,
                    type: self.data.type,
                    token: md5.MD5(self.data.uid + "solianJSKASDKES")
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    var list = res.data.data
                    for (var k in list) {
                        list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString().substr(0, 30)
                        list[k].mood_time = new Date(parseInt(list[k].mood_time) * 1000).toLocaleString().substr(0, 30)
                        list[k].photo1 = config.IMG_URL+'/x_located_icon.png'
                    }
                    self.setData({
                        listMy: list,
                    })
                }
            })
        } else if (a == "apply") {
            self.setData({
                type: '3',
                all: false, pay: false, apply: true,
                alls: false, pays: false, applys: true,
            })
            wx.request({
                url: config.SL_URL+'/index.php/Home/Engagement/issue',
                data: {
                    uid: self.data.uid,
                    type: self.data.type,
                    token: md5.MD5(self.data.uid + "solianJSKASDKES")
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    var list = res.data.data
                    for (var k in list) {
                        list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString().substr(0, 30)
                        list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString().substr(0, 30)//开始
                        list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString().substr(0, 30)//结束
                        list[k].time = new Date(parseInt(list[k].time) * 1000).toLocaleString().substr(0, 30)
                        list[k].photo1 = config.IMG_URL+'/x_located_icon.png'
                    }
                    self.setData({
                        apply1: list,
                    })
                }
            })
        }
    },
    onLoad: function (options) {
        var self = this
        app.getUserInfo(app.globalData.id, this);
        self.data.uid = app.globalData.id;
        wx.request({
            url: config.SL_URL+'/index.php/Home/Engagement/issue_list',
            data: {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res.data)
                if(res.data.code==404){
                self.setData({
                    dabaokiu:true
                })
                }else if(res.data.code==200){
                    var list = res.data.data
                    for (var k in list) {
                        list[k].time = new Date(parseInt(list[k].time) * 1000).toLocaleString().substr(0, 30)
                        list[k].photo1 = config.IMG_URL+'/x_located_icon.png'
                    }
                    self.setData({
                        list: list,
                    })
                }
            }
        })
    }
})
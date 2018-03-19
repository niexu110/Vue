// pages/oneparty/oneparty.js
var md5 = require('../../utils/MD5.js')
var config = require('../../utils/config.js');
var list, list2, list3;
var count; var counts;
Page({
    data: {
        id: "1",
        token: "",
        type: 0,//0表示最新发布 ，1表示价格最低
        page: '', pagetwo: '',
        lat: "",//纬度
        lng: "",//经度
        navclass1: "navclass1",
        navclass2: "navclass2",
        navclass3: "navclass2",
        box1: true,
        box2: false,
        imagewidth: "",
        imageheight: "",
        titleimg: "",
        content1: [],//最新发布
        content2: [],//离我最近
        content3: [],//价格最低
    },
    onLoad: function (options) {
        var self = this
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    },
    onReady: function () {
        var self = this
        wx.request({
            url: config.SL_URL + '/index.php/Home/Goods/type_list',
            data: {
                id: self.data.id,
                token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES"),
                type: self.data.type,
                page: self.data.page
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                var list = res.data.data;
                count = list
                for (var k in list) {
                    list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString().substr(0, 16)
                    list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                    list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                    list[k].imgload = 'imgload'
                }
                self.setData({
                    content1: list,
                })
            }
        })
    },
    /* 点击最新发布 */
    clicknav1: function () {
        this.setData({
            type: 0,
            navclass1: "navclass1",
            navclass2: "navclass2",
            navclass3: "navclass2",
            box1: true,
            box2: false,
        })
    },
    /* 点击价格最低 */
    clicknav3: function () {
        var self = this
        self.setData({
            type: 1,
            navclass1: "navclass2",
            navclass2: "navclass2",
            navclass3: "navclass1",
            box1: false,
            box2: false,
        })
        wx.request({
            url: config.SL_URL + '/index.php/Home/Goods/type_list',
            data: {
                id: self.data.id,
                token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES"),
                type: self.data.type,
                // page: self.data.page
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                var list = res.data.data;
                for (var k in list) {
                    list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString().substr(0, 16)
                    list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                    list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                }
                counts = list
                self.setData({ content3: res.data.data, })
            }
        })
    },
    imgload: function (e) {
        var e = e.currentTarget.dataset
        wx.navigateTo({ url: '../missionDetail/missionDetail?id=' + e.id + '&name=' + e.name })
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var self = this;
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
        if (self.data.box1 == true) {
            wx.request({
                url: config.SL_URL + '/index.php/Home/Goods/type_list',
                data: {
                    id: self.data.id,
                    type: self.data.type,
                    token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES")
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    var list = res.data.data;
                    for (var k in list) {
                        list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString().substr(0, 20)
                        list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                        list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                    }
                    self.setData({ content1: list, })
                }
            })
        }
        else {
            wx.request({
                url: config.SL_URL + '/index.php/Home/Goods/type_list',
                data: {
                    id: self.data.id,
                    type: self.data.type,
                    token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES"),
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    var list = res.data.data;
                    for (var k in list) {
                        list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString().substr(0, 20)
                        list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                        list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                    }
                    self.setData({ content3: list, })
                }
            })
        }
        wx.stopPullDownRefresh()
    },
    //上拉加载
    onReachBottom: function () {
        var self = this;
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
        if (self.data.box1 == true) {
            self.data.page++;
            wx.request({
                url: config.SL_URL + '/index.php/Home/Goods/type_list',
                data: {
                    id: self.data.id,
                    type: self.data.type,
                    page: self.data.page,
                    token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES")
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {

                    var list = res.data.data;
                    if (res.data.code == 404) {
                        wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
                        wx.stopPullDownRefresh();
                    }
                    else if (self.data.code == 200) {
                        for (var k in count) {
                            count[k].date_time = new Date(parseInt(count[k].date_time) * 1000).toLocaleString().substr(0, 20)
                            list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                            list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                        }
                        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
                        for (var k in res.data.data) {
                            count.push(list[k])
                        }
                        self.setData({ content1: count })
                    }
                }
            })
        }
        else {
            self.data.pagetwo++;
            wx.request({
                url: config.SL_URL + '/index.php/Home/Goods/type_list',
                data: {
                    id: self.data.id,
                    type: self.data.type,
                    page: self.data.pagetwo,
                    token: md5.MD5(self.data.id + self.data.type + "solianJSKASDKES")
                },
                method: 'POST',
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (res) {
                    var list = res.data.data;
                    if (res.data.code == 404) {
                        wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
                        wx.stopPullDownRefresh();
                    }
                    else if (self.data.code == 200) {
                        for (var k in counts) {
                            counts[k].date_time = new Date(parseInt(counts[k].date_time) * 1000).toLocaleString().substr(0, 20)
                            list[k].photo1 = config.IMG_URL + '/oneparty1.gif'
                            list[k].photo2 = config.IMG_URL + '/oneparty2.gif'
                        }
                        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
                        for (var k in res.data.data) {
                            counts.push(list[k])
                        }
                        self.setData({ content3: counts })
                    }
                }
            })
        }
    },
})
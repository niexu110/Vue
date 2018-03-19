var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var count; var counts;
Page({
    data: {
        id: '1',
        token: '',
        type: 0,
        page: '', pagetwo: '',
        lng: '',//经度
        lat: '',//纬度
        clickNew: true,
        clickNear: false,
        clickCheap: false,
        newClose: true,
        image:config.IMG_URL+"/icn_soulove.png",
        nearClose: false,
        cheapClose: false,
        newMsg: [],//最新发布
        cheapMsg: [],//价格最低
        nearMsg: []//离我最近
    },
    //点击最新发布
    changeNew: function () {
        if (this.data.clickNew == false) {
            this.setData({
                type: 0,
                clickNew: true,
                clickNear: false,
                clickCheap: false,
                newClose: true,
                nearClose: false,
                cheapClose: false,
            });
        }
    },
    //点击价格最低
    changeCheap: function () {
        var that = this
        if (that.data.clickCheap == false) {
            that.setData({
                type: 1,
                clickNew: false,
                clickNear: false,
                clickCheap: true,
                newClose: false,
                nearClose: false,
                cheapClose: true,
            });
        }
        wx.request({
            url: config.SL_URL+'/index.php/Home/Goods/type_list',
            data: {
                id: that.data.id,
                token: md5.MD5(that.data.id + that.data.type + "solianJSKASDKES"),
                type: that.data.type,
                // page:that.data.page
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                var list = res.data.data;
                for (var k in list) {
                    list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString().substr(0, 9)
                    list[k].clickOtherPage = 'clickOtherPage'
                }
                counts = list
                that.setData({
                    cheapMsg: list,
                })
            }
        })
    },
    onLoad: function () {
        var self = this
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    },
    onReady: function () {
        var self = this
        wx.request({
            url: config.SL_URL+'/index.php/Home/Goods/type_list',
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
                    list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString().substr(0, 9)
                    list[k].clickOtherPage = 'clickOtherPage'
                }
                self.setData({
                    newMsg: list,
                })
            }
        })

    },
    clickOtherPage: function (e) {
        var e = e.currentTarget.dataset
        wx.navigateTo({
            url: '../missionDetail/missionDetail?id=' + e.id + '&name=' + e.name
        })
    },
    //下拉刷新
    onPullDownRefresh: function () {
        var self = this;
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
        if (self.data.newClose == true) {
            wx.request({
                url: config.SL_URL+'/index.php/Home/Goods/type_list',
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
                        list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString().substr(0, 20)
                        list[k].clickOtherPage = 'clickOtherPage'
                    }
                    self.setData({ newMsg: list, })
                }
            })
        }
        else {
            wx.request({
                url: config.SL_URL+'/index.php/Home/Goods/type_list',
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
                        list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString().substr(0, 20)
                        list[k].clickOtherPage = 'clickOtherPage'
                    }
                    self.setData({ cheapMsg: list, })
                }
            })
        }
        wx.stopPullDownRefresh()
    },
    //上拉加载
    onReachBottom: function () {
        var self = this;
        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
        if (self.data.newClose == true) {
            self.data.page++;
            wx.request({
                url: config.SL_URL+'/index.php/Home/Goods/type_list',
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
                            count[k].abort_time = new Date(parseInt(count[k].abort_time) * 1000).toLocaleString().substr(0, 20)
                            count[k].clickOtherPage = 'clickOtherPage'
                        }
                        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
                        for (var k in res.data.data) {
                            count.push(list[k])
                        }
                        self.setData({ newMsg: count })
                    }
                }
            })
        }
        else {
            self.data.pagetwo++;
            wx.request({
                url: config.SL_URL+'/index.php/Home/Goods/type_list',
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
                            counts[k].abort_time = new Date(parseInt(counts[k].abort_time) * 1000).toLocaleString().substr(0, 20)
                            counts[k].clickOtherPage = 'clickOtherPage'
                        }
                        wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
                        for (var k in res.data.data) {
                            counts.push(list[k])
                        }
                        self.setData({ cheapMsg: counts })
                    }
                }
            })
        }
    },
})
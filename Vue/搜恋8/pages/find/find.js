var md5 = require('../../utils/MD5.js');
var app = getApp();
var config=require('../../utils/config.js');
var image = []; var count; var counts; var city = []; var arr = []; var newList = [];
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({ key: 'IGVBZ-Y65KF-6YIJB-JLZFZ-SYT46-EHFM4' });
Page({
  data: {
    x: '', y: '', token: '', page: 0, pagetwo:0,uid: '',
    place: '', sexuality: '0', year: '', dwelling: '', sheng: '', shi: '',//性别 年龄 身高 省份 市
    tel: config.IMG_URL+'/tel.png',
    img: config.IMG_URL+'/x_located_icon.png',
    imgs: config.IMG_URL+'/x_filtration_icon.png',
    near: false, propose: true, sunSingle: false,//附近 推荐 晒单
    nearName: '', sunName: '',   //附近 晒单
    proposeClose: true, nearClose: false, sunnyClose: false, goFilter: true, filter: false, changePeople: true,
    proposeName: 'proposeName',
    userSunny: [], proposeMsg: [], userMsg: [],//附近 推荐 附近
    val: 0, provinces: [], citys: [], province: 22, city: 0, showHide: 0, animationData: {}, ages: [], height: [], index: 0, day: 0, stat: 0, rink: 0,
    imgxgirl:config.IMG_URL+"/x_girls.png",
    imgxboy:config.IMG_URL+"/x_boys.png",
    img1:config.IMG_URL+"/x_girlglamour_icon.png",
    img2:config.IMG_URL+"/x_boyglamour_icon.png",
    img3:config.IMG_URL+"/x_girldistance_icon.png",
    img4:config.IMG_URL+"/x_boydistance_icon.png",
    img5:config.IMG_URL+"/x_updown.png",
    img6:config.IMG_URL+"/n_my_user_right.png",
    imgxgirls: config.IMG_URL+"/性别女@2x.png",
    imgxboys: config.IMG_URL+"/性别男@2x.png",
  },
  //点击推荐
  chociepropose: function () { var self = this; self.setData({ propose: true, near: false, sunSingle: false, nearName: '', sunName: '', proposeName: 'proposeName', proposeClose: true, nearClose: false, sunnyClose: false }); },
  //点击附近
  chocienear: function () {
    var self = this; self.setData({ propose: false, pagetwo:0,near: true, sunSingle: false, nearName: 'nearName', sunName: '', proposeName: '', proposeClose: false, nearClose: true, sunnyClose: false, });
    if (self.data.shi == undefined) { self.setData({ shi: '', }) }
    wx.request({
      url: config.SL_URL+'/index.php/Home/Index/nearby',
      data: {
        x: self.data.x,
        y: self.data.y,
        sex: self.data.sexuality,
        age: self.data.year,
        height: self.data.dwelling,
        city: self.data.sheng + '-' + self.data.shi,
        //page: self.data.pagetwo,
        token: md5.MD5(self.data.x + self.data.y + 'solianJSKASDKES'),
        city: self.data.place
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var list = res.data.data
         for (var i in list) {
          if (list[i].image == "" || list[i].image == undefined) {
            list[i].image = config.IMG_URL+"/x_upload_img.jpg"
          }
        }
        counts = list
        self.setData({
          userMsg: counts
        })
      }
    })
  },
  //点击筛选
  filter: function () {
    var self = this;
    self.setData({ page: 0, })
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/shai',
      data: { uid: this.data.uid, },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) { self.setData({ ages: res.data.data.age, height: res.data.data.height, }) }
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/index/region',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var list = res.data.data; var arr = [];
        for (var k in list) { arr.push(list[k].region_name), city.push(list[k].citys) }
        self.setData({ provinces: arr, })
      },
    })
    var arr = [], arr1 = [];
    var obj = self.data.ages, obj1 = self.data.height;
    for (var i in obj) { arr.push(obj[i]); }
    for (var j in obj1) { arr1.push(obj1[j]) }
    self.setData({ ages: arr, height: arr1, filter: true })
  },
  provinceChange: function (e) {
    var val = e.detail.value;
    var list = [];
    var self = this;
    self.setData({ province: val })
    arr(val, city);
    function arr(num, obj) {
      for (var k in obj[num]) { list.push(obj[num][k].region_name); }
      self.setData({ citys: list })
    }
  },
  //点击确定
  submiButtont: function (e) {
    var self = this;
    console.log(self.data.val)
    self.setData({
      sexuality: self.data.val,
      year: self.data.ages[self.data.day],
      dwelling: self.data.height[self.data.stat],
      sheng: self.data.provinces[self.data.province],
      shi: self.data.citys[self.data.city],
    })
    if (self.data.proposeClose == true) {
      if (self.data.showHide == 0) {
        self.setData({
          sexuality: self.data.val, year: '', dwelling: '', sheng: '', shi: '',page:0
        })
        wx.request({
          url: config.SL_URL+'/index.php/Home/Index/index',
          data: {
            x: self.data.x,
            y: self.data.y,
            page: self.data.page,
            sex: self.data.sexuality,
            age: '',
            height: '',
            city: '' + '-' + '',
            token: md5.MD5(self.data.x + self.data.y + "solianJSKASDKES"),
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            var list = res.data.data;
            self.setData({ proposeMsg: list })
          }
        })
      }
      else {
        if (self.data.shi == undefined) {
          self.setData({
            shi: '',
            page:0,
          })
        }
        wx.request({
          url: config.SL_URL+'/index.php/Home/Index/index',
          data: {
            x: self.data.x,
            y: self.data.y,
            page: self.data.page,
            sex: self.data.sexuality,
            age: self.data.year,
            height: self.data.dwelling,
            city: self.data.sheng + '-' + self.data.shi,
            token: md5.MD5(self.data.x + self.data.y + "solianJSKASDKES"),
          },
          method: 'POST',
          header: { 'content-type': 'application/x-www-form-urlencoded' },
          success: function (res) {
            console.log(self.data.sheng + '-' + self.data.shi)
            var list = res.data.data;
            self.setData({ proposeMsg: list })
          }
        })
      }
      wx.showToast({ title: '加载中', icon: 'loading', duration: 1000 })
      setTimeout(function () { self.setData({ filter: false }) }, 1000)
    }
    else {
      setTimeout(function () { self.setData({ filter: false }) }, 500)
      return;
    }
  },
  //改变隐藏input的值
  changeInputVal: function (event) { this.setData({ val: event.target.id, rink: event.target.id }) },
  //点击触发按条件筛选功能
  showHide: function (event) {
    if (this.data.showHide == 0) {
      this.setData({ showHide: 1 });
      var animation = wx.createAnimation({ duration: 400, timingFunction: 'linear', })
      this.animation = animation; animation.rotate(90).step();
    }
    else if (this.data.showHide == 1) {
      this.setData({ showHide: 0 });
      var animation = wx.createAnimation({ duration: 400, timingFunction: 'linear', })
      this.animation = animation; animation.rotate(90).step();
    }
  },
  change1: function (e) { this.setData({ index: e.detail.value }) },//选择地区
  change2: function (e) { this.setData({ day: e.detail.value }) },//选择年龄 
  change3: function (e) { this.setData({ stat: e.detail.value }) },//选择身高
  cityChange: function (e) { this.setData({ city: e.detail.value }) },
  //初始化
  onLoad: function () {
    var self = this;
    self.data.uid = app.globalData.id;
    wx.showToast({
      title: '加载中....',
      icon: 'loading',
      duration: 1000
    })
  },
  onReady: function () {
    /* 推荐页面 */
    var self = this;
    if (self.data.shi == undefined) { self.setData({ shi: '', }) }
    wx.request({
      url: config.SL_URL+'/index.php/Home/Index/index',
      data: {
        x: self.data.x,
        y: self.data.y,
        sex: self.data.sexuality,
        age: self.data.year,
        height: self.data.dwelling,
        city: self.data.sheng + '-' + self.data.shi,
        page: self.data.page,
        token: md5.MD5(self.data.x + self.data.y + "solianJSKASDKES"),
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var list = res.data.data;
        count = list;
        for (var i in list) {
          if (list[i].image == "" || list[i].image == undefined) {
            list[i].image = config.IMG_URL+"/x_upload_img.jpg"
          }
        }
        self.setData({ proposeMsg: list })
      }
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Index/banner',
      data: { token: md5.MD5("solianJSKASDKES") },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var arrimg = res.data.data
        self.setData({ imgUrl: arrimg })
      }
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    if (self.data.shi == undefined) { self.setData({ shi: '', }) }
    if (self.data.proposeClose == true) {
      wx.request({
        url: config.SL_URL+'/index.php/Home/Index/index',
        data: {
          x: self.data.x,
          y: self.data.y,
          sex: 0,
          age: '',
          height: '',
          city: '' + '-' + '',
          // page: self.data.page,
          token: md5.MD5(self.data.x + self.data.y + "solianJSKASDKES"),
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          var list = res.data.data;
          for (var i in list) {
            if (list[i].image == "" || list[i].image == undefined) {
              list[i].image = config.IMG_URL+"/x_upload_img.jpg"
            }
          }
          self.setData({ proposeMsg: list })
        }
      })
    }
    else if (self.data.nearClose == true) {
      wx.request({
        url: config.SL_URL+'/index.php/Home/Index/nearby',
        data: {
          x: self.data.x,
          y: self.data.y,
          sex: 0,
          age: '',
          height: '',
          city: self.data.place,
          // page: self.data.page,
          token: md5.MD5(self.data.x + self.data.y + 'solianJSKASDKES'),
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        
        success: function (res) {
          var list = res.data.data
         for (var i in list) {
          if (list[i].image == "" || list[i].image == undefined) {
            list[i].image = config.IMG_URL+"/x_upload_img.jpg"
          }
        }
          self.setData({ userMsg: list })
        }
      })
    }
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
    if (self.data.shi == undefined) {
      self.setData({
        shi: '',
      })
    }
    if (self.data.nearClose == false) {
    self.data.page++;
      wx.request({
        url: config.SL_URL+'/index.php/Home/Index/index',
        data: {
          x: self.data.x,
          y: self.data.y,
          sex: self.data.sexuality,
          age: self.data.year,
          height: self.data.dwelling,
          city: self.data.sheng + '-' + self.data.shi,
          page: self.data.page,
          token: md5.MD5(self.data.x + self.data.y + "solianJSKASDKES"),
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          var list = res.data.data;
          console.log(list)
          if (res.data.code == 404) {
            wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
            wx.stopPullDownRefresh();
          }
          else if (res.data.code == 200) {
            for (var i in list) {
              console.log(list[i].image)
              if (list[i].image == "" || list[i].image == undefined) {
                list[i].image = config.IMG_URL+"/x_upload_img.jpg"
              }
            }
            wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
            for (var k in list) { count.push(list[k]) }
            self.setData({ proposeMsg: count })
          }
        }
      })
    }
    else if (self.data.nearClose == true) {
    self.data.pagetwo++;
      wx.request({
        url: config.SL_URL+'/index.php/Home/Index/nearby',
        data: {
          x: self.data.x,
          y: self.data.y,
          sex: self.data.sexuality,
          age: self.data.year,
          height: self.data.dwelling,
          city: self.data.sheng + '-' + self.data.shi,
          page: self.data.pagetwo,
          token: md5.MD5(self.data.x + self.data.y + 'solianJSKASDKES'),
          city: self.data.place
        },
        method: 'POST',
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        success: function (res) {
          var list = res.data.data;
          if (list == undefined) {
            wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
            wx.stopPullDownRefresh();
          }
          else if (res.data.code == 200) {
            for (var i in list) {
              if (list[i].image == "" || list[i].image == undefined) {
                list[i].image = config.IMG_URL+"/x_upload_img.jpg"
              }
            }
            wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
            for (var k in list) { counts.push(list[k]) }
            self.setData({ userMsg: counts })
          }
        }
      })
    }
    else {
      return
    }
  },
  onShow: function () {
    var self = this;
    //获取经纬度
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        self.setData({
          x: res.longitude + '',
          y: res.latitude + ''
        });
        //更新全局坐标值
        app.globalData.x = res.longitude + '';
        app.globalData.y = res.latitude + '';
        //经纬度转换成地理位置
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: self.data.y,
            longitude: self.data.x
          },
          success: function (res) {
            self.setData({
              place: res.result.address_component.city.substring(0, res.result.address_component.city.length - 1)
            })
          }
        });
        console.log(self.data.uid,self.data.x)
        wx.request({
          url: config.SL_URL+'/index.php/Home/Index/geography',
          data: {
            uid:self.data.uid,
            x:self.data.x,
            y:self.data.y,
            token: md5.MD5(self.data.uid+self.data.x + self.data.y + "solianJSKASDKES"),
          },
          method: 'POST', 
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function(res){
            console.log(res)
          },
        })
      }
    });
  },
  exit: function () { var self = this; self.setData({ filter: false }) },
  call: function (e) { var tel = e.currentTarget.dataset.tel; wx.makePhoneCall({ phoneNumber: tel }) },
  //点击名片
  clickthis: function (e) {
    if (e.currentTarget.dataset.uid == this.data.uid) {
      wx.navigateTo({ url: '../mynamecard/mynamecard?uid=' + e.currentTarget.dataset.uid + "&user=" + e.currentTarget.dataset.user, })
    }
    else { wx.navigateTo({ url: '../namecard/namecard?uid=' + e.currentTarget.dataset.uid + "&user=" + e.currentTarget.dataset.user, }) }
  },
  click: function (e) {
    var e = e.currentTarget.dataset
    wx.navigateTo({ url: '../eatFriend/eatFriend?id=' + e.id + "&content=" + e.goods_name })
  }
})

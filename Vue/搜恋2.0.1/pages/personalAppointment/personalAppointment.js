// pages/personalAppointment/personalAppointment.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var count = [];
var str = [];//最新发布刷新
var strs=[];//发布约会场景刷新
Page({
  data: {
    uid: "", id: "", token: "", page: 0,numpage:0,catid:0,
    banner: true, scene: false,
    bindtap:'alreadUse',
    text: '发布约会',
    titleBox:[],
    hidden:true,
    hiddens:false,
    boy: config.IMG_URL+'/x_boys.png',
    girl: config.IMG_URL+'/x_girls.png',
    photo1:config.IMG_URL+'/feiji.png',
    list: [], content: [],//最新发布
    sceneCount: [],//场景约会
    index:0
  },
  notUse: function () {
    var self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 300
    })
    self.setData({
      bindtap:'alreadUse',
      text:'发布约会',
      banner: true,
      scene: false,
      hidden:true,
      hiddens:false,
    })
  },
  /** 点击发布约会 */
  alreadUse: function () {
    var self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 300
    })
    self.setData({
      bindtap:'notUse',
      text:'最新发布',
      banner: false,
      scene: true,
      hidden:false,
      hiddens:true,
      index:0,
      numpage:0,
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Engagement/goods',
      data: {
        page:self.data.numpage,
      },
      method: 'POST',
      header: { "content-type": "application/x-wwww-form-urlencoded" },
      success: function (res) {
        var lists = res.data.data.goods
        strs=lists
        self.setData({ sceneCount: strs })
      },
    })
  },
  onLoad: function (options) {
    var self = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 500
    })
    self.data.page=0
    wx.request({
      url: config.SL_URL+'/index.php/Home/Engagement/index',
      data: {
        uid: self.data.uid,
        page:self.data.page,
        token: md5.MD5(self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { "content-type": "application/x-www-form-urlencoded" },
      success: function (res) {
        console.log(res)
        var list = res.data.data.fb_list;
        str = list;
        for (var k in list) {
          list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString().substr(0, 16);
          if(list[k].image=="" || list[k].image==null){
            list[k].image=config.IMG_URL+"/x_upload_img.jpg"
          }
        }
        //按距离排序
        list.sort(sort('juli'))
        function sort(num) { return function (a, b) { return a[num] - b[num] } }
        var arrcategory = res.data.data.category;
        var titleBox=[];
        for(var i in arrcategory){
          titleBox.push(arrcategory[i].cat_name)
        }
        self.setData({ list: arrcategory, content: list ,titleBox:titleBox})
      },
    })
  },
  //个人约分类
  anchor: function (e) {
    var self = this
    self.setData({
      index:e.currentTarget.id
    })
    var e = e.currentTarget.dataset.cat_id;
    self.data.catid=e;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 300
    })
    sort(e, str)
    function sort(num, obj) {
      var list = [];
      for (var k in obj) {
        if(self.data.banner == true) {
          if (num == obj[k].cat_id) { list.push(obj[k]) } self.setData({ content: list })
          if (num == 1) {list.push(obj[k]) } self.setData({ content: list })
        } 
        else { self.setData({ content: str }) }
      }
    }
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
      wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
    if(self.data.scene==false){
      self.data.page=0
      wx.request({
        url: config.SL_URL+'/Home/Engagement/index',
        data: {
          uid: self.data.uid,
          token: md5.MD5(self.data.uid + "solianJSKASDKES")
        },
        method: 'POST',
        header: { "content-type": "application/x-www-form-urlencoded" },
        success: function (res) {
          var list = res.data.data.fb_list;
          str = list;
          for (var k in list) {
            list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString().substr(0, 16);
            if(list[k].image=="" || list[k].image==null){
              list[k].image=config.IMG_URL+"/x_upload_img.jpg"
            }
          }
          //按距离排序
          list.sort(sort('juli'))
          function sort(num) { return function (a, b) { return a[num] - b[num] } }
          var arrcategory = res.data.data.category;
          var titleBox=[];
          for(var i in arrcategory){
            titleBox.push(arrcategory[i].cat_name)
          }
          self.setData({ list: arrcategory, content: list ,titleBox:titleBox})
        },
      })
    }else if(self.data.scene==true){
      self.data.numpage=0
      wx.request({
        url: config.SL_URL+'/index.php/Home/Engagement/goods',
        data: {
          page:self.data.numpage,
          catid:self.data.catid
        },
        method: 'POST',
        header: { "content-type": "application/x-wwww-form-urlencoded" },
        success: function (res) {
          var lists = res.data.data.goods
          strs=lists
          self.setData({ sceneCount: strs
          })
        },
      })
    }
    wx.stopPullDownRefresh()
  },
  //上拉加载
  onReachBottom: function () {
    // Do something when page reach bottom.
    var self = this;
    console.log(self.data.uid);
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
      if(self.data.scene==false){
        self.data.page++;
        wx.request({
          url: config.SL_URL+'/Home/Engagement/index',
          data: {
            uid: self.data.uid,
            page:self.data.page,
            token: md5.MD5(self.data.uid + "solianJSKASDKES")
          },
          method: 'POST',
          header: { "content-type": "application/x-www-form-urlencoded" },
          success: function (res) {
            var list = res.data.data.fb_list;
            if (res.data.code == 404 || list.length==0) {
              wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
              wx.stopPullDownRefresh();
            }else if (res.data.code == 200) {
              for (var k in list) {
                list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString().substr(0, 16);
                if(list[k].image=="" || list[k].image==null){
                  list[k].image=config.IMG_URL+"/x_upload_img.jpg"
                }
                str.push(list[k])
              }
            }
            //按距离排序
            list.sort(sort('juli'))
            function sort(num) { return function (a, b) { return a[num] - b[num] } }
            var arrcategory = res.data.data.category;
            self.setData({ list: arrcategory, content: str })
          },
        })
      }else if(self.data.scene==true){
        self.data.numpage++;
        console.log(self.data.numpage)
         wx.request({
            url: config.SL_URL+'/index.php/Home/Engagement/goods',
            data: {
              page:self.data.numpage,
              catid:self.data.catid
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
              // success
              console.log(res)
              if(res.data.code==404){
                wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
              }else if(res.data.code==200){
                for(var i in res.data.data.goods){
                  strs.push(res.data.data.goods[i])
                }
                self.setData({
                  sceneCount:strs
                })
              }
            },
          })
      }
  },
  /* 点击进入商品 */
  clickGoods: function (e) {
    wx.navigateTo({
      url: '../releaseDate/releaseDate?id=' + e.currentTarget.dataset.id,
    })
  },
  /** 带你及场景约会内的场景 */
  click: function (e) {
    wx.navigateTo({
      url: '../eatFriendOne/eatFriendOne?id=' + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title,
    })
  },
  /*  点击头像 */
  clickheadimg: function (e) {
    wx.navigateTo({
      url: '../namecard/namecard?uid=' + e.currentTarget.dataset.uid + "&user=" + e.currentTarget.dataset.user,
    })
  },

})

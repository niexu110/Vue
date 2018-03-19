// pages/participatingMission/participatingMission.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app = getApp()
var t = 1000, miao = 5, fen = 1, shi = '0' + 2;
Page({
  data: {
    uid: '',
    gid: '',
    list:{},
    rate:{},
    name:"",
    label:"",
    goods_name: '搜恋官方平台',
    Class: 'foot_titles',
    Class1: 'foot_title',
    image: 'http://pic.35pic.com/normal/07/07/74/9315547_094335352365_2.jpg',
    images: config.IMG_URL+'/icn_soulove.png',//头像
    people: '男女不限',
    date_time: '2017年1月26日18时',
    site: '平壤银牌店(高新路)',
    number: '36',
    date: '2016.12.12 08:12',
    bind: 'remove',
    hour: '',
    min: '',
    sec: '',
    status: '1', blue: '#5793dd', width: '20rpx', height: '20rpx', radius: '50%',
  },
  onLoad: function (options) {
    var self = this;
    app.getUserInfo(app.globalData.id, this);
    self.data.uid = app.globalData.id;
    self.setData({
      gid: options.g_id,
    })
    console.log(options.time)
    console.log(options.abort_time)
    console.log(options.date_time)
    var timer = setInterval(timers, t)
    function timers() {
      if (miao > 0 || fen > 0 || shi > 0) {
        miao--;
        if (miao < 10) {
          miao = '0' + miao
          if (miao == 0 & fen > 0) {
            miao = 59;
            fen--;
            if (fen < 10) {
              fen = "0" + fen;
              if (fen == 0 & shi > 0) {
                fen = 59;
                shi--;
              }
              else if (fen == 0 & shi == 0) {
                miao = 59;
              }
            }
          }
        }
        self.setData({
          hour: shi,
          min: fen,
          sec: miao,
          bind: 'remove'
        })
      } else {
        clearInterval(timer);
        self.setData({
          affair: '约会进行',
          hour: '00',
          min: '00',
          sec: '00',
          bind: 'alert'
        })
      }
    }
    wx.request({
      url: config.SL_URL+'/index.php/Home/Engagement/group_detail',
      data: {
        uid: self.data.uid,
        gid: self.data.gid,
        token: md5.MD5(self.data.gid + self.data.uid + "solianJSKASDKES")
      },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var arr1=res.data.data
        var arr2=res.data.data.rate
        arr1.abort_time=new Date(parseInt(arr1.abort_time) * 1000).toLocaleString().substr(0, 16)
        arr1.date_time=new Date(parseInt(arr1.date_time) * 1000).toLocaleString().substr(0, 16)//约会时间
        arr1.time=new Date(parseInt(arr1.time) * 1000).toLocaleString().substr(0, 16)
        console.log(arr1.date_time)
        arr2.fb_date=new Date(parseInt(arr2.fb_date) * 1000).toLocaleString().substr(0, 30)
        arr2.bm_date=new Date(parseInt(arr2.bm_date) * 1000).toLocaleString().substr(0, 30)
        arr2.qx_date=new Date(parseInt(arr2.qx_date) * 1000).toLocaleString().substr(0, 30)
        arr2.sy_date=new Date(parseInt(arr2.sy_date) * 1000).toLocaleString().substr(0, 30)
        self.setData({
          list:arr1,
          rate:arr2,
          // fb_date: res.data.data.fb_date,//发布时间
          // bm_dae: res.data.data.bm_dae,//我的报名时间
          // sy_date: res.data.data.fb_date,//剩余时间
          // qx_date   如果到了报名时间人数不够取消时间 
          // sdz_date  活动中的时间
          // end_date  结束时间
          // images:arr1.small_img,
          name:arr1.sponsor,
          label:arr1.review
        })
      }
    })
  },
  remove: function () {
    wx.navigateTo({
      url: '../removeAppointments/removeAppointments',
    })
  },
  alert: function () {
    wx.showModal({
      title: '提示',
      content: '约会已开始不能取消!!!',
      success: function (res) {
        console.log(res)
      }
    })
  },
  //查看服务详情
  findInfo: function () {
    var self = this
    var e = self.data
    console.log(e)
    wx.navigateTo({
      url: '../missionDetail/missionDetail?id='+e.gid+"&name="+e.name+"&look="+0,
    })
  },
})
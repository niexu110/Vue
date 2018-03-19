// pages/myDate/myDate.js
var md5 = require('../../utils/MD5.js');
var util = require('../../utils/util.js');
var config=require('../../utils/config.js');
var app = getApp()
Page({
    data: {
        uid: '', type:0, page:0, token: '',
        all: true, pay: false, apply: false,
        alls: true, pays: false, applys: false,dabaokiu:false,
        zanwu:config.IMG_URL+'/zanwu.png',
    },
     onLoad: function (options) {
        var self = this
        self.data.uid = app.globalData.id;
        var url=config.SL_URL+'/index.php/Home/Engagement/issue_list';
        var object= {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            };
          openList(1,object,url,self)
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
        var id=e.currentTarget.dataset.id;
        var self = this;
        if (id== "1") {
          var url=config.SL_URL+'/index.php/Home/Engagement/issue_list';
          var object= {
                uid: self.data.uid,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")
            };
          openList(id,object,url,self)
            self.setData({
                all: true, pay: false, apply: false,
                alls: true, pays: false, applys: false,

            })
        } else if (id == "2") {
           var url=config.SL_URL+'/index.php/Home/Engagement/issue';
           var object={
                uid: self.data.uid,
                type:2,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")}
            openList(id,object,url,self)
            self.setData({
                all: false, pay: true, apply: false,
                alls: false, pays: true, applys: false,
            })
        } else if (id== "3"){
           var url=config.SL_URL+'/index.php/Home/Engagement/issue';
           var object={
                uid: self.data.uid,
                type:3,
                token: md5.MD5(self.data.uid + "solianJSKASDKES")}
            openList(id,object,url,self)
            self.setData({
                all: false, pay: false, apply: true,
                alls: false, pays: false, applys: true,
            })
        }
    },
})
function openList(num,object,url,data){
  var self=data;
  wx.request({
     url: url,  data:object,  method: 'POST',  header: {'content-type': 'application/x-www-form-urlencoded'},
     success: function(res){
     console.log(res)
      if(res.data.code==200){
        var list = res.data.data;
        for (var k in list) {
           list[k].add_time = new Date(parseInt(list[k].add_time) * 1000).toLocaleString()
           list[k].mood_time = new Date(parseInt(list[k].mood_time) * 1000).toLocaleString()
           list[k].abort_time = new Date(parseInt(list[k].abort_time) * 1000).toLocaleString()//开始
           list[k].date_time = new Date(parseInt(list[k].date_time) * 1000).toLocaleString()//结束
           list[k].time = new Date(parseInt(list[k].time) * 1000).toLocaleString()
           list[k].photo1 = config.IMG_URL+'/x_located_icon.png'
           }
           self.setData({ dabaokiu:false })
            if(num==1){ self.setData({ list: list })}
            if(num==2){ self.setData({ listMy: list })}
            if(num==3){ self.setData({ apply1: list })}
         }
           else{self.setData({ dabaokiu:true})} 
    },
  })
};
// pages/mingxi/mingxi.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var count=[];
Page({
  data:{
    uid:'',
    page:'',
    msg:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      uid:options.uid
    })
  },
  onReady:function(){
    // 页面渲染完成
         var self=this;
      wx.request({
           url: config.SL_URL+'/index.php/Home/Money/virtual',
           data: {
               uid:this.data.uid,
               page:this.data.page,
               token:md5.MD5(this.data.uid+"solianJSKASDKES")
           },
           method: 'POST',
           header: {'content-type':'application/x-www-form-urlencoded'}, 
           success: function(res){
              var list=res.data.data;
              console.log(res)
              count=list;
              for(var k in list){
                if(list[k].type==0){
                  list[k].money='+'+list[k].money
                }else{
                  list[k].money='-'+list[k].money
                }
              }
              self.setData({
                msg:list
              })
            
           }
         })
  },
    //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
      wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
      wx.request({
       url: config.SL_URL+'/index.php/Home/Money/virtual',
           data: {
               uid:this.data.uid,
               page:this.data.page,
               token:md5.MD5(this.data.uid+"solianJSKASDKES")
           },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.code == 404) {
          wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
          wx.stopPullDownRefresh();
        }
        else if (res.data.code == 200) {
          wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
          for(var k in res.data.data){ if(res.data.data[k].type==0){ res.data.data[k].money='+'+res.data.data[k].money}
          else{res.data.data[k].money='-'+res.data.data[k].money}}
          for (var k in res.data.data) { count.push(res.data.data[k])}
           self.setData({
             msg:count
           })
        }
      }
    })
    wx.stopPullDownRefresh()
  },
   onReachBottom: function () {
    var self = this;
    self.data.page++;
    wx.request({
       url: config.SL_URL+'/index.php/Home/Money/virtual',
       data: {
               uid:this.data.uid,
               page:this.data.page,
               token:md5.MD5(this.data.uid+"solianJSKASDKES")
           },
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.code == 404) {
          wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
          wx.stopPullDownRefresh();
        }
        else if (res.data.code == 200) {
          wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
          for(var k in res.data.data){ if(res.data.data[k].type==0){ res.data.data[k].money='+'+res.data.data[k].money}
          else{res.data.data[k].money='-'+res.data.data[k].money}}
          for (var k in res.data.data) { count.push(res.data.data[k])}
           self.setData({
             msg:count
           })
        }
      }
    })
  }
})
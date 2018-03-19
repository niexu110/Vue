// pages/thirdStepDate/thirdStepDate.js
var md5=require('../../utils/MD5.js')
var textarea,rad,id;
var app=getApp()
Page({
  data:{fid:"",//发起人id
    uid:"",//被约人id，陌生人没有
    id:"",//商品id
    fabuid:"",//发布id
    hid:"",//发布约会id
    timebox:"",//时间戳
    sex:"",
    pick:"",
    type:"",
    friend:"",
    token:"",
    value2:"",
    numLength:0,
    hidden1:true,
    hidden2:true,
    hidden3:true,
    text7:"我们总在最不懂爱情的年代，遇见最美好的爱情。",
    text8:"我不贪心，只有一个小小的愿望：生命中永远有你。",
    text9:"不管过去如何，过去的已经过去，最好的总在未来等着你。",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
      app.getUserInfo(app.globalData.id,this);
      console.log(app.globalData.id);
      self.data.fid=app.globalData.id;
    self.setData({
      uid:options.uid,
      id:options.goods_id,
      timebox:options.mood_time,
      sex:options.sex,
      pick:options.pick,
      money:options.money,
      type:options.type
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  /* 文字长度 */
  bindinput:function(e){
    this.setData({
      value2:e.detail.value,
      numLength:e.detail.value.length
    })
    console.log(this.data.value)
    this.data.numLength=e.detail.value.length
  },
  //点击文字
  clicktext7:function(){
    var self=this;
    var value2=self.data.value2+self.data.text7;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  clicktext8:function(){
    var self=this;
    var value2=self.data.value2+self.data.text8;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  clicktext9:function(){
    var self=this;
    var value2=self.data.value2+self.data.text9;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  /* 下一步 */
  formSubmit:function(e){
    var self=this;
    console.log(e.detail.value)
    var obj=e.detail.value;
    textarea=obj.textarea;
    rad=obj.rad
    if(textarea=="" & obj.length>50){
      wx.showToast({
        title:"文本框不能为空",
        icon:"loading",
        duration:500
      })
      return false
    }else(
      wx.request({
        url: 'https://m.qinyikou.cc/Home/Engagement/cj_fabu',
        data: {
          fid:self.data.fid,//发起人id
          uid:self.data.uid,//接受人id 
          sex:self.data.sex,//1男 2女
          mood:textarea,//心情
          mood_time:self.data.timebox,//约会时间    时间戳
          type:self.data.type,//1为我请客    2为aa制
          fb_type:1,//1好友    2陌生人 
          pick:self.data.pick,//为接送 为不接送
          money:self.data.money,
          goods_id:self.data.id,
          token:md5.MD5(self.data.fid+self.data.id+'solianJSKASDKES')
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          // success
          console.log(res)
          self.setData({
            fabuid:res.data.data,
          })
          wx.request({
            url: 'https://m.qinyikou.cc/Home/Engagement/indent',
            data: {
              id:self.data.fabuid,
              token:md5.MD5(self.data.fabuid+'solianJSKASDKES')
            },
            method: 'POST', 
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
              console.log(res)
              // success
              self.setData({
                hid:res.data.data
              })
              id=self.data.hid
              console.log("这是订单id"+self.data.hid)
              console.log("这是订单id"+id)
              wx.redirectTo({
                url: '../pay/pay?id='+self.data.hid+'&uid='+self.data.fid,
              })
            },
          })
        },
      })
    )
  },
})
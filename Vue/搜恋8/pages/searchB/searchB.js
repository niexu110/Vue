// pages/searchB/searchB.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
Page({
    data:{
    uid:'',
    token:'',
    page:0,
    money:'',
    image:config.IMG_URL+"/my_remainder_1.png",
    msg:[
    ],
  },
  recharge:function(){
    wx.showToast({
              title: '充值请前往APP',
              icon: 'loading',
              duration: 1000
            });
  },
  onLoad:function(options){
    var self=this;
    // 页面初始化 options为页面跳转所带来的参数
    self.setData({
      uid:options.uid,
      money:options.money
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
        var self=this;
      wx.request({
           url: config.SL_URL+'/index.php/Home/Money/virtual',
           data: {
               uid:this.data.uid,
               page:this.data.page,
               token:md5.MD5(this.data.uid+"solianJSKASDKES")
           },
           method: 'POST',
           header: {
            'content-type':'application/x-www-form-urlencoded'
           }, // 设置请求的 header
           success: function(res){
              var list=res.data.data;
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
  lookB:function(){
    wx.navigateTo({
      url: '../mingxi/mingxi?uid='+this.data.uid,
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
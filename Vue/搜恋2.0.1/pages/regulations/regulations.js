//pages/regulations/regulations.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
Page({
    data:{
        token:'',
        title:'搜恋用户协议书',
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
      wx.request({
      url: config.SL_URL+'/index.php/Home/Serve/lists',
      data: {
        token:md5.MD5("solianJSKASDKES")
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'}, 
      success: function(res){
        // success
        console.log(res.data)
      },
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})
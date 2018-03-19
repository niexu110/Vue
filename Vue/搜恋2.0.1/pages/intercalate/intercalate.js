// pages/intercalate/intercalate.js
var toto;
var config=require('../../utils/config.js');
var app=getApp();
Page({
  data:{
    cd:undefined,
    img:config.IMG_URL+'/n_my_user_right.png',
    msg:[
      {title:"个人信息",anchor:'bindPreonal'},
      {title:"关于我们",anchor:'bindAbout'},
      {title:"清理缓存",text:'',anchor:'clearStorage'}
      
    ]
  },
  bindPreonal:function(e){
    wx.navigateTo({
      url: '../mynamecard/mynamecard?uid='+app.globalData.id,})
  },
  bindAbout:function(e){
    wx.navigateTo({
      url: '../about/about',
      success: function(res){
        // success
      }
    })
  },
  clearStorage:function(){
    var self=this;
      this.ess();
         wx.showToast({
          title: '清理总计:'+toto,
          icon: 'success',
          duration: 2000
        })
  },
  ess:function(){
   var self=this;
    wx.getStorageInfo({
      key: 'keys',
      success: function(res){
        // success
        toto=res.currentSize+'kb'
       for(var k in self.data.msg){
         self.data.msg[2].text=res.currentSize+'kb'
         
       }
     self.setData({
        msg:self.data.msg
       })
      }
    })
  },
  back:function(){
        app.globalData.id=this.data.cd;
       wx.showModal({
          title: '提示',
          content: '确定退出当前帐号？',
          success: function(res) {
            if (res.confirm) {
              wx.clearStorage({
                key: 'key',
                success: function(res){
                // success
                  wx.showToast({
                  title: '已退出当前账号',
                  icon: 'success',
                  duration: 2000
                })
                setTimeout(function(){
                wx.switchTab({
                  url: '../find/find',
                })
                    },2000) 
              }
            })
            }
          }
       })
        
  },
})
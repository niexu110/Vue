// pages/wholookme/wholookme.js
 var md5=require('../../utils/MD5.js');
 var config=require('../../utils/config.js');
 var app=getApp();
Page({
  data:{
    uid:'149',
    token:'',
    click_nav1:"click_nav_1",
    click_nav2:"",
    hidden:true,
    girl:config.IMG_URL+"/性别女@2x.png",
    boy:config.IMG_URL+"/性别男@2x.png",
    message:[],
    message2:[],
  },
  onLoad:function(options){
    var self=this;
    self.data.uid=app.globalData.id;
     wx.request({
          url:config.SL_URL+"/index.php/Home/User/look",
          data:{
              uid:self.data.uid,
              token:md5.MD5(self.data.uid+"solianJSKASDKES")
          },
          method:"POST",
          header:{'content-type':'application/x-www-form-urlencoded'},
          success:function(res){
            var list=res.data.data;
            for(var k in list){
              list[k].times= new Date(parseInt(list[k].times) * 1000).toLocaleString().replace(/\//g, '-');
              if(list[k].image==null || list[k].image=="" || list[k].image==undefined){
                list[k].image=config.IMG_URL+"/x_upload_img.jpg"
              }
            }
              self.setData({
                 message:list
              })
          }
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
  lockY:function(e){
    
    wx.navigateTo({
      url: '../namecard/namecard?uid='+e.currentTarget.dataset.uid,
    })
  },
  /*谁点过我 */
  whoclickme:function(){
    this.setData({
       click_nav1:"click_nav_1",
       click_nav2:"",
       hidden:true,
    })
  },
  /*我点过谁 */
  meclickwho:function(){
    var self=this;
    self.setData({
       click_nav1:"",
       click_nav2:"click_nav_1",
       hidden:false,
    })
     wx.request({
          url:config.SL_URL+"/index.php/Home/User/f_look",
          data:{
              uid:self.data.uid,
              token:md5.MD5(self.data.uid+"solianJSKASDKES")
          },
          method:"POST",
          header:{'content-type':'application/x-www-form-urlencoded'},
          success:function(res){
            var list=res.data.data;
            for(var k in list){
              list[k].times= new Date(parseInt(list[k].times) * 1000).toLocaleString().replace(/\//g, '-');
              if(list[k].image==null || list[k].image=="" || list[k].image==undefined){
                list[k].image=config.IMG_URL+"/x_upload_img.jpg"
              }
            }
              self.setData({
                message2:list
              })
          }
      })
  },
})
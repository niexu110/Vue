// pages/hailFellow/hailFellow.js
 var md5=require('../../utils/MD5.js');
 var config=require('../../utils/config.js');
 var app=getApp();
Page({
  data:{
    uid:'', 
    token:'',
    friend:true,
    loveMe:false,
    meLove:false,
    friends:true,
    loveMes:false,
    meloves:false,
    goodFriend:true,
    img:'',
    msg:'',
    list:[],mylove:[],lovemy:[],
    img1:config.IMG_URL+"/x_new_icon.jpg",
    img2:config.IMG_URL+"/x_upload_img.jpg",
    imgboy:config.IMG_URL+"/x_boy.png",
    imggirl:config.IMG_URL+"/x_girl.png"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
     self.data.uid=app.globalData.id;
     app.getUserInfo(app.globalData.id,this); 
       wx.request({
          url: config.SL_URL+"/index.php/Home/User/myfirends",
          data:{
              uid:self.data.uid,
              token:md5.MD5(self.data.uid+"solianJSKASDKES")
          },
          method:"POST",
          header:{'content-type':'application/x-www-form-urlencoded'},
          success:function(res){
            var str=res.data.data;
            self.setData({
              list:str
            })
          }
       })
       wx.request({
             url: config.SL_URL+'/index.php/Home/User/myfire',
             data: {
              uid:self.data.uid,
             token:md5.MD5(self.data.uid+"solianJSKASDKES")
           },
            method: 'POST', 
             header: {'content-type':'application/x-www-form-urlencoded'}, 
             success: function(res){
              // success
              console.log(res);
               var list=res.data.data;
               self.setData({
                 msg:'+'+list.length
              })
             }
           })  
  },
  //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    self.data.page=0;
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    wx.request({
          url:config.SL_URL+"/index.php/Home/User/myfirends",
          data:{
              uid:self.data.uid,
              token:md5.MD5(self.data.uid+"solianJSKASDKES")
          },
          method:"POST",
          header:{'content-type':'application/x-www-form-urlencoded'},
          success:function(res){
            console.log(res)
            var str=res.data.data;
            self.setData({
              list:str
            })
          }
       })
    wx.stopPullDownRefresh()
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
  addsF:function(){
    wx.navigateTo({url: '../acceptFriend/acceptFriend',})},
  addLine:function(event){
    var self=this;
    if(event.target.id=="friend"){
      self.setData({
        friend:true,
        loveMe:false,
        meLove:false,
        friends:true,
        loveMes:false,
        meloves:false,
        goodFriend:true
      });
    }else if(event.target.id=="loveMe"){
      self.setData({
        friend:false,
        loveMe:true,
        meLove:false,
        friends:false,
        loveMes:false,
        meloves:true,
        goodFriend:false
      });
      wx.request({
        url: config.SL_URL+'/index.php/Home/User/f_likse',
        data: {
          uid:self.data.uid,
          token:md5.MD5(self.data.uid+'solianJSKASDKES')
        },
        method: 'POST', 
        header: {
           'content-type': 'application/x-www-form-urlencoded'
        }, 
        success: function(res){
          // success
          self.setData({
            lovemy:res.data.data
          })
        }
      })
    }else if(event.target.id=="meLove"){
      self.setData({
        friend:false,
        loveMe:false,
        meLove:true,
        friends:false,
        loveMes:true,
        meloves:false,
        goodFriend:false
      });
       wx.request({
        url: config.SL_URL+'/index.php/Home/User/likse',
        data: {
          uid:self.data.uid,
          token:md5.MD5(self.data.uid+'solianJSKASDKES')
        },
        method: 'POST', 
        header: {
           'content-type': 'application/x-www-form-urlencoded'
        }, 
        success: function(res){
          // success
          self.setData({
            mylove:res.data.data
          })
        }
      })
    }
  },
  look:function(e){
    console.log(e.currentTarget.dataset.uid)
    wx.navigateTo({
      url: '../namecard/namecard?uid='+e.currentTarget.dataset.uid,
    })
  }
})
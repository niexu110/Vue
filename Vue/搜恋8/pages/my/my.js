 var md5=require('../../utils/MD5.js');
 var config=require('../../utils/config.js');
 var app=getApp();
Page({
   data:{
    uid:'', 
    f_uid:'50', 
    old_uid:"",
    token:'',
    nickname:'请登录',
    myhobby:'您的爱情宣言是什么',
    img:config.IMG_URL+'/backgrounds.png',
    image:config.IMG_URL+"/x_upload_img.jpg",
    imgRight:config.IMG_URL+'/n_my_user_right.png',
    imgSet:config.IMG_URL+'/n_my_my_install.png',
    photo1:config.IMG_URL+'/shezhi@3x.png',
    photo2:config.IMG_URL+'/n_my_edit.png',
    userContent:[
        {
            id:1,
            txt:'好友',
            anchor:'myFriend'
        },
         {
            id:1,
            txt:'钱包',
            anchor:'myWallet'
        },
         {
            id:1,
            txt:'认证',
            anchor:'attestation',
        },
         {
            id:1,
            txt:'礼物',
            anchor:'myGift'
        },
    ],
    msg:[
         {
            id:1,
            text:'我的约会',
            titleImg:config.IMG_URL+'/n_my_date.png',
            anchor:'myTryst'
        },
         {
            id:1,
            text:'谁看过我',
            titleImg:config.IMG_URL+'/n_my_look.png',
            anchor:'lookMe'
        },
         {
            id:1,
            text:'常见问题',
            titleImg:config.IMG_URL+'/n_my_matter.png',
            anchor:'question'
        },
         {
            id:1,
            text:'已购服务',
            titleImg:config.IMG_URL+'/n_my_service.png',
            anchor:'service'
        },
    ] 
   },
// 页面初始化 options为页面跳转所带来的参数
 onLoad:function(){ 
   var self=this; 
   self.data.uid=app.globalData.id;
  }, 
  onReady:function(){
  },
   onShow:function(){
        var self=this;
      self.data.uid=app.globalData.id;
       wx.request({
         url:config.SL_URL+'/index.php/Home/User/userindex',
         data:{
             uid:self.data.uid,
             token:md5.MD5(self.data.uid+"solianJSKASDKES")
         },
         method:'POST',
         header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
         success:function(res){
          console.log(res)
          self.setData({
            old_uid:res.data.data.old_uid
          })
           if(res.data.data.myideal==null){
                self.setData({
                  myhobby:'',
                  nickname:res.data.data.nickname,
                  img:res.data.data.backgroundimage,
                  image:res.data.data.image
            })
           }else{
            self.setData({
               myhobby:res.data.data.myideal,
               nickname:res.data.data.nickname,
               img:res.data.data.backgroundimage,
               image:res.data.data.image
            })
           }
         }
      })
   },
   myHove:function(){
     var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({ url: '../login/login',})
      }else{
        wx.navigateTo({ url: '../intercalate/intercalate',  }) }},
 myGift:function(){
      var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({url: '../login/login', })
      }else{
        wx.navigateTo({url: '../mygift/mygift',}) }},
 myFriend:function(){ 
      var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({url: '../login/login',})
      }else{wx.navigateTo({ url:'../hailFellow/hailFellow', }) } },
 myWallet:function(){
   var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
         wx.navigateTo({ url: '../login/login',})
      }else{
        wx.navigateTo({url: '../wallet/wallet?uid='+this.data.uid,}) }},
 attestation:function(){
   var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({ url: '../login/login', })
      }else if(self.data.old_uid==1){
        wx.showToast({
          title:"身份证已认证",
          icon:"loading",
          duration:1000,
        })
      }else{
        wx.navigateTo({url: '../shenfenCard/shenfenCard',}) } },
  lookMe:function(){
      var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
         wx.navigateTo({url: '../login/login', })
      }else{
        wx.navigateTo({url: '../wholookme/wholookme',}) } },
  service:function(){
    var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
         wx.navigateTo({url: '../login/login', })
      }else{
        wx.navigateTo({ url: '../purchaseService/purchaseService', })}},
  question:function(){
    var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({ url: '../login/login', })
      }else{
        wx.navigateTo({ url: '../FAQ/FAQ',}) }},
  friendInvition:function(){
      var msg={
              f_uid:this.data.f_uid,
              uid:this.data.uid,
              token:md5.MD5(this.data.uid+this.data.f_uid+this.data.uid+"solianJSKASDKES")
          };
        wx.request({
          url:config.SL_URL+"/index.php/Home/User/firends",
          data:msg,
          header:{'content-type':'application/x-www-form-urlencoded'},
          method:"POST",
          success:function(res){
          }
      })
  },
  myTryst:function(){
    var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
         wx.navigateTo({ url: '../login/login', })
      }else{
        wx.navigateTo({ url: '../myDate/myDate', }) } },
  myBasic:function(){
    var self=this;
      if(self.data.uid=="" || self.data.uid==undefined){
        wx.navigateTo({ url: '../login/login', })
      }else{
        wx.navigateTo({ url: '../basic/basic',}) }},
})
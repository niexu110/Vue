var app=getApp();
var md5=require('../../utils/MD5.js'); 
var config=require('../../utils/config.js');
Page({
  data:{
    val:'',
    val1:'',
    formData:{
      phone:'',
      password:'',
      code:''
    },
    image1:config.IMG_URL+'/denglu@3x.png',
    image2:config.IMG_URL+'/x_loginUser_icon.png',
    image3:config.IMG_URL+'/x_loginPassword_icon.png',
  },
  onLoad:function(){
  },
  //输入框失去焦点事件
  userBlur:function(event){
    app.inputBlur(event,this);
  },
  //提交表单
  formSubmit:function(event){
    var that=this;
    app.inputBlur(event,that);
    var list=that.data.formData;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Index/login',
      data:{username:list.phone, password:list.password, token:md5.MD5(list.phone+list.password+'solianJSKASDKES')},
      method: 'POST', header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
        var code=res.data.code;var uid=res.data.data.uid;
        if(code==404){
            wx.showToast({ title: '用户名或密码错误', icon: 'loading',duration: 1000});
            that.setData({ val1:'', })
        }else if(code==303){
          wx.showToast({ title: '手机或密码错误',icon: 'loading',duration: 1000 });
             that.setData({val1:'',})
        }else if(code==200){
          app.globalData.id=uid; app.globalData.phone=that.data.formData.phone;
          wx.showToast({title: '登陆成功', icon: 'loading',duration: 1000 });
            setTimeout(function(){wx.switchTab({ url: '../find/find',})},2000)
           wx.setStorage({
            key: 'openid',
            data: res.data.data,
            success: function(res){
          } }) }} }) },
  forgetPassword:function(){ wx.navigateTo({url: '../forget/forget', })},
  //跳转到注册
  register:function(){wx.redirectTo({ url: '../register/register', }) },
})
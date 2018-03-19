// pages/register/register.js
var app=getApp();
var md5=require('../../utils/MD5.js'); 
var config=require('../../utils/config.js');
var list;
Page({
  data:{
    tel:'',
    code:'',
    bindtap:'',
    disabled:true,
    textHtml:'获取验证码',
    timeSeconds:60,
    denglu:config.IMG_URL+"/denglu@3x.png",
    image:config.IMG_URL+"/x_xieyi_icon.jpg",
    phoneImg:config.IMG_URL+"/x_phoneNumber_icon.png",
    codeImg:config.IMG_URL+'/x_proofCode_icon.png',
    psdImg:config.IMG_URL+"/x_loginPassword_icon.png",
    onOff:true,
    timer:'',
    formData:{
      phone:'',
      password:'',
      code:''
    }
  }, 
   //输入框失去焦点事件
  userBlur:function(event){
    app.inputBlur(event,this);
  },
   //获取验证码倒计时
  register:function(e){
    app.countdown(this);
    var self=this;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Index/phone',
      data: {tel:this.data.tel,token:md5.MD5('solianJSKASDKES')},
      method: 'POST', header:{'content-type':'application/x-www-form-urlencoded' },
      success: function(res){
         console.log(res.data.data.code);
         wx.showToast({ title: '验证码已发送', icon: 'success',duration: 2000})
         self.setData({code:res.data.data.code})}})},
  sever:function(){
    wx.navigateTo({ url: '../regulations/regulations', })},
  //提交表单
  formSubmit:function(e){
    app.inputBlur(e,this);
    list=this.data.formData;
    wx.redirectTo({ url: '../perfect/perfect?phone='+list.phone+'&password='+list.password+'&code='+list.code,}) }
})
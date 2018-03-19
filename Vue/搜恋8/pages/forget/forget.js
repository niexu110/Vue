// pages/forget/forget.js
var app=getApp();
var md5=require('../../utils/MD5.js'); 
var config=require('../../utils/config.js');
Page({
  data:{
    tel:'',
    code:'',
    val:'',
    val1:'',
    val2:'',
    textHtml:'获取验证码',
    timeSeconds:60,
    bindtap:'',
    onOff:true,
    timer:'',
    formData:{
      phone:'',
      password:'',
      code:''
    },
    imgbanner:config.IMG_URL+"/denglu@3x.png",
    img1:config.IMG_URL+"/x_phoneNumber_icon.png",
    img2:config.IMG_URL+"/x_proofCode_icon.png",
    img3:config.IMG_URL+"/x_loginPassword_icon.png"
  },
  //忘记密码
  register:function(){
    app.countdown(this);
      var self=this;
     wx.request({
      url: config.SL_URL+'/index.php/Home/Index/phone',
      data: {
        tel:this.data.tel,
        token:md5.MD5('solianJSKASDKES')
      },
      method: 'POST', 
      header:{
      'content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        console.log(res.data.data.code);
         wx.showToast({
           title: '验证码已发送',
           icon: 'success',
           duration: 2000
         })
         self.setData({
           code:res.data.data.code
         })
      }
    })
  },
  //输入框失去焦点事件
  userBlur:function(event){
    app.inputBlur(event,this);
  } ,
  //提交表单
  formSubmit:function(event){
    app.inputBlur(event,this);
     var that=this;
     var self=that.data.formData;
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/wpassword',
      data: {
       member:self.phone,
       code:self.code,
       password:self.password,
       token:md5.MD5(self.phone+self.password+'solianJSKASDKES')
      },
      method: 'POST',
      header: {
         'content-type':'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        if(res.data.code==404){
             wx.showToast({
           title: '修改失败请重新填写',
           icon: 'loading',
           duration: 3000
         })
         that.setData({
            val2:''
         })
        }else if(res.data.code==200){
              wx.showToast({
              title: '修改成功请登录',
              icon: 'success',
              duration: 2000
            });
              that.setData({
            val:'',
            val1:'',
            val2:''
         })
            setTimeout(function(){
              wx.redirectTo({
                url: '../login/login',
              })
            },2000)
        }
      }
    })
  }
})
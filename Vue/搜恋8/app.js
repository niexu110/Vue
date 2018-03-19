//app.js
App({
    onLaunch: function () {
    //调用API从本地缓存中获取数据
     var str=wx.getStorageSync('openid');
     this.globalData.id=str.uid
  },
  getUserInfo:function(id,obj){
    var that=obj;
    console.log(id);
    if(id==""||id==undefined){
       wx.showModal({
           title: '提示',
           content: '您还没有登陆前去登陆',
           success: function(res) {
           if (res.confirm) {
              wx.navigateTo({
                url: '../login/login',
                  })
              }
          }
      })
    }
  },
  globalData:{
    id:"",
    phone:'',
    x:'',
    y:""
  },
  
  //使用倒计时获取验证码说明：
  /*data:{
    textHtml:'获取验证码',       初始化页面时获取验证码按钮上的文字
    timeSeconds:10,             多少秒后可以重新获取
    onOff:true,                 一次获取未结束不允许在点击获取开关
    timer:''                    定时器
  }*/
  
    //获取验证码倒计时
  countdown:function(obj){
    var self=obj;
    if(obj.data.onOff){
      obj.setData({
        timer:setInterval(function(){
          self.data.timeSeconds--
          //console.log(self.data.timeSeconds)
          if(self.data.timeSeconds==0){
            clearInterval(self.data.timer)
            self.setData({
              textHtml:'重新获取验证码',
              bindtap:"register",
              onOff:true ,
              timeSeconds:60
            });
          }else{
            self.setData({
              bindtap:"",
              textHtml:self.data.timeSeconds+'s'
            });
          }        
        },1000),
        onOff:false
      });
      
    }
  },
  //输入框失焦事件事件
  inputBlur:function(event,obj){
    var self=obj;
     var reg = /^1[3|5|8|7][0-9]{9}$/; //手机号验证规则
     var regPsd=/^([0-9a-zA-Z!@#$%^&*?]{6,18})$/; //密码验证规则
     if(event.target.id=='userName'){
          //用户名判断
          if(!reg.test(event.detail.value)){
            wx.showToast({
              title: '手机号格式有误',
              icon: 'loading',
              duration: 1000
            });
             return false; 
          }else{
            self.setData({
              tel:event.detail.value,
              bindtap:'register',
              formData:{
                phone:event.detail.value,
                password:self.data.formData.password,
                code:self.data.formData.code,
               
              }
            });
          }
      }else if(event.target.id=='yanzhengCode'){  //验证码
          if(self.data.code===event.detail.value){
             self.setData({
              formData:{
                phone:self.data.formData.phone,
                password:self.data.formData.password,
                code:event.detail.value
                 }
             });
          }else{
             wx.showToast({
              title: '验证码输入有误',
              icon: 'loading',
              duration: 1000
            });
            return false;
         }
      }else if(event.target.id=='password'){
          //密码判断
        if(!regPsd.test(event.detail.value)){
            wx.showToast({
              title: '密码输入错误',
              icon: 'loading',
              duration: 1000
            })
            return false;
          }else{
            self.setData({
              disabled:false,
              formData:{
                phone:self.data.formData.phone,
                password:event.detail.value,
                code:self.data.formData.code
              }
            });
          }
      }
    },
    change:function(e,val,obj){
      console.log(obj);
      var self=obj;
      self.setData({
        disabled:true,
        val:e.detail.value
      })
      console.log(e.detail.value)
    },
    //图片上传
    upload_file:function (url,filePath,name,object){
     wx.uploadFile({
           url:url,
           filePath:filePath,
           name:name,
           header: {'content-type':'multipart/form-data'}, // 设置请求的 header
           formData: object, // HTTP 请求中其他额外的 form data
           success: function(res){
             // success
             console.log(res)
           }
         })
     }
})

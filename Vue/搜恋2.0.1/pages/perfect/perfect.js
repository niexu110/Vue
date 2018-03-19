// pages/perfect/perfect.js
var md5=require('../../utils/MD5.js');
var app=getApp();
var date=new Date();
var config=require('../../utils/config.js');
var city=[];
var url;
Page({
    data:{
      token:'',
      nickname:'',
      phone:'',
      code:'',
      password:'',
      age:'',
      time:'',
      constellation:'',
      year:date.getFullYear(),
      sex:'',
      disabled:true,
      img:config.IMG_URL+'/x_upload_img.jpg',
      photo1:config.IMG_URL+'/denglu@3x.png',
      sexs:['男','女','不限'],
      sexIndex:0,
      date:'点击选择生日',
      provinces:[],citys:[], province:22,city:0,
    },
    //上传图像
    uploadImg:function(){
     var self=this;
     wx.login({
     success: function (res) {
        var code = res.code
        wx.getUserInfo({ success: function (res) {
           var list=res.userInfo; self.setData({
             img:list.avatarUrl,nickname:list.nickName })}
        })}
     })
   },
   change:function(e){this.setData({sexIndex:e.detail.value })},
   DateChange:function(e){ var that=this;var strs =e.detail.value; 
        var time = Date.parse(new Date(strs)); time=time/1000;
        var str=e.detail.value;var arr=str.split("-");
        console.log(str,arr);
        var age=that.data.year-arr[0]; var index=getAstro(arr[1],arr[2])
        that.setData({ date: e.detail.value, age:age, time:time,constellation:index })
        function getAstro(m,d){    
          return m-(d<"102223444433".charAt(m-1)- -19);
     }
   },
      //所在地城市选择
  cityChange:function(e){this.setData({city:e.detail.value})},
    //所在地省份选择
  provinceChange:function(e){
     var val=e.detail.value;var list=[];var self=this;
     self.setData({ province:val})
     arr(val,city);
     function arr(num,obj){
      for(var k in obj[num]){list.push(obj[num][k].region_name);}
       self.setData({ citys:list}) }},
  dataForm:function(e){
      var self=this;var img=self.data.img;self.data.sexIndex++;
      e.detail.value.sex=self.data.sexIndex; e.detail.value.provinces=self.data.provinces[self.data.province];
      e.detail.value.citys=self.data.citys[self.data.city];var list=e.detail.value;
      if(list.nickname==""){ wx.showToast({ title: '昵称必须4到到8字符',icon: 'loading',duration: 2000 })
      }else if(list.birthday=="点击选择生日"){wx.showToast({ title: '生日不能为空',icon: 'loading', duration: 2000 })
      }else{wx.showToast({title: '正在提交....', icon: 'loading', duration: 2000 })
     wx.request({
      url: config.SL_URL+'/index.php/Home/Index/register',
      data: {
       member:self.data.phone,
       code:self.data.code,
       password:self.data.password,
       nickname:list.nickname,
       age:self.data.age,
       sex:list.sex,
       birthday:self.data.time,
       constellation:self.data.constellation,
       citys:list.provinces+'-'+list.citys,
       token:md5.MD5(self.data.phone+self.data.password+'solianJSKASDKES'),},
      method: 'POST',header: {'content-type':'application/x-www-form-urlencoded' }, 
      success: function(res){
        var url=config.SL_URL+'/index.php/Home/Article/images'; var id=res.data.data;
        var object={ uid:id,url:img,token:md5.MD5(id+'solianJSKASDKES')}
         if(res.data.code==404){wx.showModal({title: '提示', content: '该手机号已经注册过请直接登录',
           success: function(res) {if (res.confirm) {wx.redirectTo({ url: '../login/login',}) } } })
         }else if(res.data.code==200){
         wx.request({
           url: url,data: object, method: 'POST', 
           header: {'content-type':'application/x-www-form-urlencoded'},
           success: function(res){console.log(res)},})
         wx.request({
          url: config.SL_URL+'/index.php/Home/Hx/registerImUser',
          data: { username:id,password:111111, nickname:list.nickname},
          method: 'POST', header: {'content-type':'application/x-www-form-urlencoded'}, 
          success: function(res){console.log(res) } })
          setTimeout(function(){
              wx.showToast({ title: '注册成功',icon: 'success', duration: 2000})
              wx.navigateTo({ url: '../login/login', }) },2000) }  }}) } },
    onLoad:function(options){
      var self=this;
      self.setData({phone:options.phone, code:options.code, password:options.password })
      wx.request({
      url: config.SL_URL+'/index.php/Home/index/region', method: 'POST', 
      header: {'content-type':'application/x-www-form-urlencoded' },
      success: function(res){
        var list=res.data.data; var arr=[];
        for(var k in list){
          arr.push(list[k].region_name); city.push(list[k].citys) } 
          self.setData({provinces:arr,}) }, })},
    onReady:function(){}
})
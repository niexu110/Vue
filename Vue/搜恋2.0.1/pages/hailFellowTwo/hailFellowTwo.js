// pages/hailFellowTwo/hailFellowTwo.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
  data:{
    fid:"",
    uid:'', 
    id:"",
    username:"",
    val1:"",
    val2:"",
    token:'',
    friend:true,
    loveMe:false,
    meLove:false,
    girlImg:config.IMG_URL+"/x_girl.png",
    boyImg:config.IMG_URL+"/x_boy.png",
    goodFriend:true,
    backg:"#bbbbbb",
    msg:'5',
    array:[],//好友集合
    arrUsername:[],
    val:"",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
      app.getUserInfo(app.globalData.id,this);
      var self=this;
      self.data.fid=app.globalData.id;
      self.setData({
        val1:options.val1,
        val2:options.val2,
        id:options.id
      })
       wx.request({
          url:config.SL_URL+"/index.php/Home/User/myfirends",
          data:{
              uid:self.data.fid,
              token:md5.MD5(self.data.fid+"solianJSKASDKES")
          },
          method:"POST",
          header:{'content-type':'application/x-www-form-urlencoded'},
          success:function(res){
            self.setData({
              array:res.data.data
            })
          }
       })

       var list=self.data.array
       var arrUsername=[];
       for(var i in list){
         arrUsername.push(list[i].username)
       }
       self.setData({
         arrUsername:arrUsername,
       })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log(this.data.val)
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  radioChange:function(e){
      this.setData({
        backg:"#5793dd"
      })
  },
  //搜索好友
  // bindKeyInput:function(e){
  //   var self=this;
  //   var changeValue=e.detail.value;
  //   self.setData({
  //     val:changeValue
  //   })
  //   var list=self.data.array;
  //   if(e.detail.value===""){
  //     self.setData({
  //       array:list
  //     })
  //   }else{
  //     var arr=[];
  //     for(var i in list){
  //       var tt=list[i].username.indexOf(e.detail.value)
  //       if(tt>=0){
  //         arr.push(list[i])
  //       }
  //     }
  //       self.setData({
  //         array:arr
  //       })
  //   }
    
  //   console.log(self.data.val)
  // },
  //点击确定
  formSubmit:function(e){
    var self=this;
    console.log(e.detail.value)
    self.setData({
      uid:e.detail.value.radio,
    })
    var list=self.data.array
    for(var i in list){
      if(list[i].uid==self.data.uid){
        self.setData({
          username:list[i].nickname,
        })
      }
    }
  },
  clicksure:function(){
    var self=this;
    if(self.data.uid==""){
      return false
    }else{
        wx.redirectTo({
          url: '../issueDate/issueDate?uid='+self.data.uid+'&id='+self.data.id+'&username='+self.data.username+'&val1='+self.data.val1+'&val2='+self.data.val2,
          success: function(res){
            // success
          },
        })
    }
  }
})
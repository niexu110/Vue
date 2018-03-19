var val1,val2,radio1,radio2,radio3,textarea
var md5=require('../../utils/MD5.js')
var config=require('../../utils/config.js');
var id="";
var app=getApp();
Page({
  data:{
    fid:"",//发起人id
    uid:"",//被约人id，陌生人没有
    id:"",//商品id
    fabuid:"",//发布id
    hid:"",//发布约会id
    timebox:"",
    sex:"",
    pick:"",
    friend:"",
    token:"",
    list:{
      src:"",
      title:"",
      site:"",
      money:"",
      num:"",
    },
    checked1:false,
    checked2:true,
    myMoney:"",
    youMoney:"",
    date:"选择约会日期",
    time:"时间",
    hidden1:false,//约会方式
    hidden2:true,
    hidden3:false,//负责接送
    hidden4:true,
    hidden5:false,//约会对象
    hidden6:false,
    text1:"我请客",
    text2:"AA制",
    text3:"我是汉子，我负责",
    text4:"我是妹子，你负责",
    text5:"陌生人",
    text6:"我的好友",
    sex1:"sex2",
    sex2:"sex2",
    sex3:"sex2",
    userName:"",
    value:"",
    value2:"",//文本框内值
    numLength:0,
    text7:"我们总在最不懂爱情的年代，遇见最美好的爱情。",
    text8:"我不贪心，只有一个小小的愿望：生命中永远有你。",
    text9:"不管过去如何，过去的已经过去，最好的总在未来等着你。",
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      id:options.id,
      uid:options.uid,
      userName:options.username,
      date:options.val1,
      time:options.val2
    })
    wx.request({
      url: config.SL_URL+'/Home/Engagement/goods_detail',
      data: {
          id:self.data.id, 
          //goods_id:md5.MD5(self.data.id+'solianJSKASDKES')
      },
      method: 'POST', 
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        var lists=res.data.data;
        self.setData({
          list:{
            src:lists.goods_img,
            title:lists.goods_name,
            site:lists.address,
            money:lists.shop_price,
            num:lists.goods_number,
          },
          money:lists.shop_price,
          myMoney:lists.shop_price,
          youMoney:"0"
        })
      },
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
      app.getUserInfo(app.globalData.id,this);
      this.data.fid=app.globalData.id;
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  /** 场景选择 */
  clickscene:function(){
    wx.navigateBack({
      delta: 2
    })

  },
  /* 点击约会对象 */
  clickobj1:function(){
    this.setData({
      hidden5:true,
      hidden6:true,
      userName:"",
    })
  },
  clickobj2:function(){
    this.setData({
      hidden5:false,
      hidden6:false,
      sex1:"sex2",
      sex2:"sex2",
      sex3:"sex2",
      value:"",
    })
  },
  /* 选择时间 */
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
    val2=e.detail.value
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
    val1=e.detail.value
  },
  //点击添加好友
  addgood:function(){
    var self=this;
    wx.redirectTo({
      url: '../hailFellowTwo/hailFellowTwo?fid='+self.data.fid+'&val1='+val1+'&val2='+val2+'&id='+self.data.id,
      success: function(res){
        // success
      },
    })
  },
  /* 点击选约会对象 */
  dateSex1:function(){
    this.setData({
      sex1:"sex1",
      sex2:"sex2",
      sex3:"sex2",
      value:"男女不限",
      checked1:true,
      checked2:false,
      userName:"",
      uid:"",
    })
  },
  dateSex2:function(){
    this.setData({
      sex1:"sex2",
      sex2:"sex1",
      sex3:"sex2",
      value:"男",
      checked1:true,
      checked2:false,
      userName:"",
      uid:"",
    })
  },
  dateSex3:function(){
    this.setData({
      sex1:"sex2",
      sex2:"sex2",
      sex3:"sex1",
      value:"女",
      checked1:true,
      checked2:false,
      userName:"",
      uid:"",
    })
  },
  //点击x
  clickClear:function(){
    var self=this;
    self.setData({
      userName:""
    })
  },
  //选择AA制与我请客
  radioChange:function(e){
    var self=this;
    console.log(e.detail.value)
    var money=self.data.money
    if(e.detail.value=="我请客"){
      self.setData({
          myMoney:money,
          youMoney:"0",
      })
    }else if(e.detail.value=="AA制"){
      self.setData({
          myMoney:money/2,
          youMoney:money/2,
      })
    }
  },
  /* 文字长度 */
  bindinput:function(e){
    this.setData({
      value2:e.detail.value,
      numLength:e.detail.value.length
    })
    console.log(this.data.value)
    this.data.numLength=e.detail.value.length
  },
  //点击文字
  clicktext7:function(){
    var self=this;
    var value2=self.data.value2+self.data.text7;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  clicktext8:function(){
    var self=this;
    var value2=self.data.value2+self.data.text8;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  clicktext9:function(){
    var self=this;
    var value2=self.data.value2+self.data.text9;
    var value2length=value2.length;
    if(value2length>50){
      value2length=50
    }
    self.setData({
      value2:value2,
      numLength:value2length
    })
  },
  /* 点击下一步 */
  formSubmit:function(e){
    var self=this;
    var obj=e.detail.value;
    val1=obj.val1;
    val2=obj.val2+":00";
    radio1=obj.radio1;
    radio2=obj.radio2;
    radio3=obj.radio3;
    textarea=obj.textarea;
    console.log(radio3);
    //判断陌生人  0无 1男 2女
    if(self.data.userName!="" && self.data.userName!="undefined"){
      radio1=self.data.userName
      self.setData({
        friend:1
      })
    }else if(radio1=="男女不限"){
      self.setData({
        sex:0,
        friend:2,
      })
    }else if(radio1=="男"){
      self.setData({
        sex:1,
        friend:2,
      })
    }else if(radio1=="女"){
      self.setData({
        sex:2,
        friend:2,
      })
    }
    //是否接送
    if(radio2=="我是汉子，我负责"){
      self.setData({
        pick:"为接送",
      })
    }else if(radio2=="我是妹子，你负责"){
      self.setData({
        pick:"为不接送",
      })
    }
    //点击下一步
    if(val1=="选择约会日期"){
      wx.showToast({
        title:"请选择时间",
        durction:500,
        icon:"loading"
      })
    }else if(val2=="时间:00"){
      wx.showToast({
        title:"请选择时间",
        durction:500,
        icon:"loading"
      })
    }else if(radio1==""){
      wx.showToast({
        title:"请选择约会对象",
        durction:500,
        icon:"loading"
      })
    }else if(textarea==""){
      wx.showToast({
        title:"请填写约会心情",
        durction:500,
        icon:"loading"
      })
    }else{
      function strtotime(time_str, fix_time) {
              var time  = (new Date()).getTime(); 
              if (time_str) 
              {
                  var str = time_str.split('-'); 
                  if (3 === str.length)
                  {
                      var year  = str[0] - 0; 
                      var month = str[1] - 0 - 1; 
                      var day   = str[2] - 0; 
                      if (fix_time)
                      {
                          var fix = fix_time.split(':'); 
                          if (3 === fix.length) 
                          {
                              var hour   = fix[0] - 0; 
                              var minute = fix[1] - 0; 
                              time = (new Date(year, month, day, hour, minute)).getTime(); 
                              console.log(time)
                          } 
                      } else 
                      {
                          time = (new Date(year, month, day)).getTime(); 
                              console.log(time)
                      } 
                  }
              } 
              time =parseInt(time / 1000); 
              console.log(time)
              self.setData({
                timebox:time
              })
        }
        strtotime(val1,val2)
      wx.request({
        url: config.SL_URL+'/Home/Engagement/cj_fabu',
        data: {
          fid:self.data.fid,//发起人id
          uid:self.data.uid,//会员id 陌生人不传
          sex:self.data.sex,//0无 1男 2女
          mood:textarea,//心情
          mood_time:self.data.timebox,//约会时间    时间戳
          type:radio3,//1为我请客    2为aa制
          fb_type:self.data.friend,//1好友    2陌生人  不填默认是1好友
          pick:self.data.pick,//为接送 为不接送
          money:self.data.myMoney,
          goods_id:self.data.id,
          token:md5.MD5(self.data.fid+self.data.id+'solianJSKASDKES')
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
          // success
          self.setData({
            fabuid:res.data.data,
          })
          wx.request({
            url: config.SL_URL+'/Home/Engagement/indent',
            data: {
              id:self.data.fabuid,
              token:md5.MD5(self.data.fabuid+'solianJSKASDKES')
            },
            method: 'POST', 
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
              // success
              self.setData({
                hid:res.data.data
              })
              id=self.data.hid
              wx.redirectTo({
                url: '../pay/pay?id='+id+'&uid='+self.data.fid,
              })
            },
          })
        },
      })
    }
  },
})
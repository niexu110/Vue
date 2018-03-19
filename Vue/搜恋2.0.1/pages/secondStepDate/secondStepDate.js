var config=require('../../utils/config.js');
var val1,val2,radio1,radio2
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
    type:"",
    token:"",
    list:{
      src:"",
      title:"",
      site:"",
      money:"",
      num:"",
    },
    myMoney:"",
    youMoney:"",
    date:"选择约会日期",
    time:"时间",
    text1:"我请客",
    text2:"AA制",
    text3:"我是汉子，我负责",
    text4:"我是妹子，你负责",
    userName:"",
    value:"",
    numLength:0,
    sceneCount:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      uid:options.uid,
      sex:options.sex,
      id:options.id,//商品id
      sex:options.sex,
    })
      val1=options.val1;
      val2=options.val2;
          wx.request({
            url: config.SL_URL+'/Home/Engagement/goods_detail',
            data: {
                id:self.data.id, 
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
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //更换场景
  btn:function(){
    var self=this;
    wx.redirectTo({
      url: '../changeShop/changeShop?uid='+self.data.uid+'&sex='+self.data.sex+'&val1='+val1+'&val2='+val2,
      success: function(res){
        // success
      },
    })
  },
//选择AA制与我请客
  radioChange:function(e){
    var self=this;
    console.log(e.detail.value)
    var money=parseInt(self.data.money)
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
  /* 选择时间 */
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  /* 下一步 */
    /* 点击下一步 */
  formSubmit:function(e){
    console.log(e.detail.value)
    var self=this;
    var obj=e.detail.value;
    val1=obj.val1;
    val2=obj.val2+":00";
    radio1=obj.radio1;
    radio2=obj.radio2;
    //type  AA制 还是 我请客
    if(radio1=="AA制"){
      self.setData({
        type:1
      })
    }else if(radio1=="我请客"){
      self.setData({
        type:2
      })
    }
    //是否接送
    if(radio2=="我是汉子，我负责"){
      self.setData({
        pick:0,
      })
    }else if(radio2=="我是妹子，你负责"){
      self.setData({
        pick:2,
      })
    }
  //点击下一步
    if(val1=="选择约会日期" || val2=="时间:00"){
      wx.showToast({
        title:"请选择时间",
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
                          } 
                      } else 
                      {
                          time = (new Date(year, month, day)).getTime(); 
                      } 
                  }
              } 
              time =parseInt(time / 1000); 
              self.setData({
                timebox:time
              })
        }
        strtotime(val1,val2)
        console.log(self.data.timebox)
        wx.redirectTo({
          url: '../thirdStepDate/thirdStepDate?uid='+self.data.uid+'&sex='+self.data.sex+'&timebox='+self.data.timebox+'&type='+self.data.type+'&pick='+self.data.pick+'&money='+self.data.myMoney+'&goods_id='+self.data.id,
          success: function(res){
            // success
          },
        })
    }
  },
})
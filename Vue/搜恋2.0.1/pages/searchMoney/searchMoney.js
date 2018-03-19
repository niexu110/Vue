// pages/searchMoney/searchMoney.js
Page({
  data:{
    uid:"",
    img:'http://img.qinyikou.cc/icons/my_b.png',
    img1:'http://img.qinyikou.cc/icons/my_z.png',
    money:0,
    list:[
      {price:'88',txt:'(仅限首次购买)',money:'1'},
      {price:'100',money:'10'},
      {price:'200',money:'20'},
      {price:'500',money:'50'},
      {price:'1000',money:'100'},
      {price:'2000',money:'200'},
      {price:'5000',money:'500'},
    ]
  },
//调用微信支付
  chong:function(e){
    console.log(e.target.id)
     wx.requestPayment({
       timeStamp: 'String1',
       nonceStr: 'String2',
       package: 'String3',
       signType: 'MD5',
       paySign: 'String4',
       success: function(res){
         // success
         console.log(res)
       },
       fail: function() {
         // fail
       },
       complete: function() {
         // complete
       }
     })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    console.log(options)
    self.setData({
      uid:options.uid,
      money:options.money
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
  }
})
// pages/changeShop/changeShop.js
var md5=require('../../utils/MD5.js');
Page({
  data:{
     uid:"",
     id:"",
     token:"",
     not:true,
     alread:false,
     banner:true,
     scene:false,
     val1:"",
     val2:"",
     notName:'notName',
     timeName:"time",
     rangeName:'',
     className:'',
     txt:'',
     boy:'http://img.qinyikou.cc/icons/x_boys.png',
     girl:'http://img.qinyikou.cc/icons/x_girls.png',
     list:[],
     sceneCount:[],//场景约会
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self =this;
    self.setData({
      uid:options.uid,
      val1:options.val1,
      val2:options.val2,
      sex:options.sex
    })
      wx.request({
        url: 'https://m.qinyikou.cc/Home/Engagement/goods',
        data: {},
        method: 'POST', 
        header: {
          "content-type":"application/x-wwww-form-urlencoded"
        }, // 设置请求的 header
        success: function(res){
          // success
          console.log(res)
          var lists=res.data.data.goods
          var arrgoods=lists
          for(var i in lists){
            arrgoods[i].image=lists[i].mobileimg;
            arrgoods[i].title=lists[i].goods_name;
            arrgoods[i].pirce=lists[i].shop_price;
            arrgoods[i].totle=lists[i].buy_count;
            arrgoods[i].id=lists[i].goods_id;
            arrgoods[i].click="click";
          }
          self.setData({
            sceneCount:arrgoods
          })
        },
      })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var self=this;

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  /** 场景约会详情 */
  click:function(e){
    var self=this;
    wx.navigateTo({
      url: '../shopDetails/shopDetails?id='+e.currentTarget.dataset.id+"&title="+e.currentTarget.dataset.title+'&uid='+self.data.uid+'&sex='+self.data.sex+'&val1='+self.data.val1+'&val2='+self.data.val2,
      success: function(res){
        // success
      },
    })
  },
})
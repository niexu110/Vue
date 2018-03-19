// pages/orderDetails/orderDetails.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
Page({
  data:{
     id:'',
     page:'',
     title:'',
     img:config.IMG_URL+'/my_b.png',
     image:'',
     price:'',
     name:'',
     site:'',
     date:'',
     order:'',
     code:'',
     end:'约会结束'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      id:options.id,
    })
        wx.request({
          url: config.SL_URL+'/index.php/Home/Goods/dingdetail',
          data: {
              id:self.data.id,
              token:md5.MD5(self.data.id+"solianJSKASDKES")
          },
          method: 'POST',
          header: {'content-type': 'application/x-www-form-urlencoded'},
          success: function(res){
            // success
            console.log(res)
            var list=res.data.data.g_id;
            var lists=res.data.data.new_event;
            var listst=res.data.data.promotion_code;
            self.setData({
              price:list.money,
              date:new Date(parseInt(list.time) * 1000).toLocaleString().substr(0,16),//时间
              order:list.order_number,//订单编号
              image:lists.images,
              name:lists.name,
              site:lists.address,
              code:listst.code,
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
  }
})
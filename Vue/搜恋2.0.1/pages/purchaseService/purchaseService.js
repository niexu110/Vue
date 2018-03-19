// pages/purchaseService/purchaseService.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var arrs=[],arr1=[],arr3=[],arr2=[],arr4=[];
var app=getApp();
Page({
  data:{
        uid:"",
        page:0,
        type:0,
        all:true,
        pay:false,
        apply:false,
        drawback:false,
        bestow:false,
        alls:true,//全部
        pays:false,//待支付
        applys:false,//待使用
        drawbacks:false,//已使用
        bestows:false,//退款
        pay1:[],//待支付
        apply1:[],//待使用
        drawback1:[],//已使用
        bestow1:[],//退款
        list:[],
        url:config.SL_URL+'/index.php/Home/Goods/indent',
        dabaokiu:false,
        //0为待支付 1为待使用 2为已使用 3为退款
        photo1:config.IMG_URL+'/zanwu.png'
  },
    addLine:function(e){
      var id=e.currentTarget.dataset.id;
      var self=this;
    if(id=='0'){
        var object={
        uid:self.data.uid,
        page:0,
        type:id,//0为全部 1为待支付 2为待使用 3为已使用 4为退款
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
      openType(id,object,self.data.url,self);
      self.setData({
        all:true,
        pay:false,
        apply:false,
        drawback:false,
        bestow:false,
        alls:true,
        pays:false,
        applys:false,
        drawbacks:false,
        bestows:false,
      })
    }else if(id=='1'){
     var object={
        uid:self.data.uid,
        page:0,
        type:id,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
      openType(id,object,self.data.url,self);
      self.setData({
        all:false,
        pay:true,
        apply:false,
        drawback:false,
        bestow:false,
        alls:false,
        pays:true,
        applys:false,
        drawbacks:false,
        bestows:false,
      })
    }else if(id=="2"){
     var object={
        uid:self.data.uid,
        page:0,
        type:id,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
      openType(id,object,self.data.url,self);
      self.setData({
        all:false,
        pay:false,
        apply:true,
        drawback:false,
        bestow:false,
        alls:false,
        pays:false,
        applys:true,
        drawbacks:false,
        bestows:false,
      })
    }else if(id=="3"){
        var object={
        uid:self.data.uid,
        page:0,
        type:id,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
      openType(id,object,self.data.url,self);
       self.setData({
        all:false,
        pay:false,
        apply:false,
        drawback:false,
        bestow:true,
        alls:false,
        pays:false,
        applys:false,
        drawbacks:false,
        bestows:true,
      })
    }else if(id=="4"){
        var object={
        uid:self.data.uid,
        page:0,
        type:id,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
      openType(id,object,self.data.url,self);
        self.setData({
        all:false,
        pay:false,
        apply:false,
        drawback:true,
        bestow:false,
        alls:false,
        pays:false,
        applys:false,
        drawbacks:true,
        bestows:false,
      })
    }
  },
  onLoad:function(options){
    var self=this
    self.data.uid=app.globalData.id;
    var object={
        uid:self.data.uid,
        page:0,
        type:self.data.type,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
     openType(self.data.type,object,self.data.url,self);
  },
   //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
    var object= {
        uid:self.data.uid,
        page:0,
        type:self.data.type,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 1000 })
    openType(self.data.type,object,self.data.url,self);
    wx.stopPullDownRefresh()
  },
  //加载
  onReachBottom: function () {
     var self = this;
     var num=self.data.type;
      self.data.page++;
     var object={
        uid:self.data.uid,
        page:self.data.page,
        type:self.data.type,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      };
       wx.showToast({
         title: '加载中....',
         icon: 'loading',
         duration: 1000
    })
  wx.request({
    url: self.data.url,
    data:object,
    method: 'POST',
    header: {'content-type': 'application/x-www-form-urlencoded'},
    success: function(res){
      console.log(res)
      var arr=res.data.data;
    if(res.data.code==404){
       wx.stopPullDownRefresh()
       wx.showToast({
         title: '暂无数据....',
         icon: 'loading',
         duration: 1000
    })
      }else if(res.data.code==200){
        for(var i in arr){
          arr[i].time=new Date(parseInt(arr[i].time) * 1000).toLocaleString();
          if(arr[i].status==0&&num==1){
            arr[i].state="待支付";
            arr[i].shop="去支付";
            arr[i].bind="payzhifu";
            arr1.push(arr[i]);
            self.setData({
              pay1:arr1
           })
          }else if(arr[i].status==1&&num==2){
            arr[i].state="待使用";
            arr[i].shop="去使用";
            arr[i].bind="payshiyong";
             arr2.push(arr[i]);
             self.setData({
              apply1:arr2
           })
          }else if(arr[i].status==2&&num==3){
            arr[i].state="已使用";
            arr[i].shop="去评论";
            arr3.push(arr[i]);
             self.setData({
              bestow1:arr3
           })
          }else if(arr[i].status==3&&num==4){
            arr[i].shop="退款";
            arr[i].bind="tk";
             arr4.push(arr[i]);
             self.setData({
             drawback1:arr4
           })
          }else if(arr[i].status==10&&num==4){
              arr[i].state="已退款";
              arr[i].shop="已退款";
              arr4.push(arr);
              self.setData({
              drawback1:arr4
             })
            }else{
             arrs.push(arr[i]);
            }
          }
         }
        },
      })
  },
  //去支付
  payzhifu:function(e){
    var self=this;
    wx.navigateTo({
      url: '../pay/pay?id='+e.currentTarget.dataset.id+'&uid='+self.data.uid,
    })
  },
  //去使用
  payshiyong:function(e){
    var self=this;
    wx.navigateTo({
      url: '../orderDetails/orderDetails?id='+e.currentTarget.dataset.id,
    })
  }
})
function openType(num,object,url,data){
  var self=data;
  wx.request({
    url: url,  data:object,  method: 'POST',  header: {'content-type': 'application/x-www-form-urlencoded'},
    success: function(res){
     var arr=res.data.data;
     if(res.data.code==404&&res.data.data==''){self.setData({dabaokiu:true }) }
     else if(res.data.code==200){
        for(var i in arr){arr[i].time=new Date(parseInt(arr[i].time) * 1000).toLocaleString();
          if(arr[i].status==0){ arr[i].state="待支付"; arr[i].shop="去支付"; arr[i].bind="payzhifu"; }
          else if(arr[i].status==1){ arr[i].state="待使用";   arr[i].shop="去使用";  arr[i].bind="payshiyong"; }
          else if(arr[i].status==2){ arr[i].state="已使用";  arr[i].shop="去评论"; }
          else if(arr[i].status==3){ arr[i].shop="退款"; arr[i].bind="tk"; }
          else if(arr[i].status==10){ arr[i].state="已退款";arr[i].shop="已退款"; } } self.setData({dabaokiu:false,type:num})
          if(num==1){arr1=arr;self.setData({pay1:arr})}
          else if(num==2){arr2=arr;self.setData({ apply1:arr}) }
          else if(num==3){arr3=arr;self.setData({ bestow1:arr}) }
          else if(num==4){arr4=arr;self.setData({drawback1:arr }) }
          else if(num==0){arrs=arr;self.setData({list:arr })}} },  
  })
};
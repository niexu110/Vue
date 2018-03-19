// pages/groupDate/groupDate.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var str=[]
var myDate = new Date();
		var str = "";
		str = str+myDate.getFullYear()+".";
		str = str+myDate.getMonth()+1+".";
		str = str+myDate.getDate()+"  ";
    var timer="";
    timer=timer+myDate.getHours()+':';
    timer=timer+myDate.getMinutes();
Page({
  data:{
      token:'',
      type:'0',
      page:'',
      user:config.IMG_URL+'/icn_soulove.png',
      boy:config.IMG_URL+'/x_boys.png',
      girl:config.IMG_URL+'/x_girls.png',
      list:[],
      lists:[
        {
          img:config.IMG_URL+"/4@3x.png",
          title:'历史活动',
          text:'找最新活动我发现是最棒的',
          anchor:"bindLogin"
          },
       {  img:config.IMG_URL+"/6@3x.png",
          title:'四大法则',
          text:'聚会的讲究四大约会法则',
          anchor:"tenet"
          },
      ],
      imgUrl:[],
     obj:[], 
  },
  //美食家
  fineFood:function(e){
   wx.navigateTo({
     url: '../fineFood/fineFood',
     success: function(res){
       // success
     } 
   })
  },
  //旅行家
  traveller:function(){
    wx.navigateTo({
      url: '../traveller/traveller',
      success: function(res){
        // success
      }
    })
  },
  //企业联谊
  team:function(){
    wx.navigateTo({
      url: '../team/team',
      success: function(res){
        // success
      }
    })
  },
  //单身派对
  oneparty:function(){
    wx.navigateTo({
      url: '../oneparty/oneparty',
      success: function(res){
        // success
      }
    })
  },
  bindLogin:function(e){
   
  },
  tenet:function(){
    wx.navigateTo({
      url: '../fourtenet/fourtenet',
    })
  },
  onLoad:function(options){
    var self=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/index',
      data: {
        token:md5.MD5("solianJSKASDKES")
      },
       method: 'POST',
       header: {
          'content-type': 'application/x-www-form-urlencoded'
       }, 
      success: function(res){
        // success
        var obj=res.data.data.data;
        for(var k in obj){
          obj[k].number=obj[k].number/2
          obj[k].abort_time=new Date(parseInt(obj[k].abort_time) * 1000).toLocaleString().replace(/\//g, '-');
          obj[k].date_time= new Date(parseInt(obj[k].date_time) * 1000).toLocaleString().replace(/\//g, '-');  
          obj[k].clickcontent="clickcontent"
        }
        var nav=res.data.data.type;
        var navlist=self.data.list;
        navlist=nav;
        for(var i in nav){
          navlist[i].cat_name=nav[i].cat_name;
          navlist[i].mobileimg=nav[i].mobileimg;
          navlist[i].id=nav[i].id;
          navlist[0].anchor="fineFood";
          navlist[1].anchor="traveller";
          navlist[2].anchor="oneparty";
          navlist[3].anchor="team";
        }
         self.setData({
            obj:obj,
            list:navlist,
            imgUrl:res.data.data.banner
          })
      }
    })
  },
   //下拉刷新
  onPullDownRefresh: function () {
    var self = this;
      wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/index',
      data: {
        // type:this.data.type,
        // page:this.data.page,
        token:md5.MD5("solianJSKASDKES")
      },
       method: 'POST',
       header: {
          'content-type': 'application/x-www-form-urlencoded'
       }, 
      success: function(res){
        // success
        var obj=res.data.data.data;
        for(var k in obj){
          obj[k].number=obj[k].number/2
          obj[k].abort_time=new Date(parseInt(obj[k].abort_time) * 1000).toLocaleString().replace(/\//g, '-');
          obj[k].date_time= new Date(parseInt(obj[k].date_time) * 1000).toLocaleString().replace(/\//g, '-');
          obj[k].clickcontent="clickcontent"
        }
        var nav=res.data.data.type;
        var navlist=self.data.list;
        navlist=nav;
        for(var i in nav){
          navlist[i].cat_name=nav[i].cat_name;
          navlist[i].mobileimg=nav[i].mobileimg;
          navlist[i].id=nav[i].id;
          navlist[0].anchor="fineFood";
          navlist[1].anchor="traveller";
          navlist[2].anchor="oneparty";
          navlist[3].anchor="team";
        }
         self.setData({
            obj:obj,
            list:navlist,
            imgUrl:res.data.data.banner
          })
      }
    })
    wx.stopPullDownRefresh()
  },
  //上拉加载
  onReachBottom: function () {
    // Do something when page reach bottom.
    var self = this;
    wx.showToast({ title: '加载中....', icon: 'loading', duration: 2000 })
    self.data.page++;
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/index',
      data: {
        // type:this.data.type,
        page:this.data.page,
        token:md5.MD5("solianJSKASDKES")
      },
       method: 'POST',
       header: {
          'content-type': 'application/x-www-form-urlencoded'
       }, 
      success: function(res){
        // success
        var obj=res.data.data.data;
            console.log(obj)
        if (res.data.code == 404 || obj==undefined) {
          wx.showToast({ title: '没有更多数据....', icon: 'loading', duration: 2000 })
          wx.stopPullDownRefresh();
        }else if (res.data.code == 200){
          str=obj
          for(var k in obj){
            obj[k].number=obj[k].number/2
            obj[k].abort_time=new Date(parseInt(obj[k].abort_time) * 1000).toLocaleString().replace(/\//g, '-');
            obj[k].date_time= new Date(parseInt(obj[k].date_time) * 1000).toLocaleString().replace(/\//g, '-');
            obj[k].clickcontent="clickcontent";
            str.push(obj[k])
          }
          var nav=res.data.data.type;
          var navlist=self.data.list;
          navlist=nav;
          for(var i in nav){
            navlist[i].cat_name=nav[i].cat_name;
            navlist[i].mobileimg=nav[i].mobileimg;
            navlist[i].id=nav[i].id;
            navlist[0].anchor="fineFood";
            navlist[1].anchor="traveller";
            navlist[2].anchor="oneparty";
            navlist[3].anchor="team";
          }
          self.setData({
              obj:obj,
              list:navlist,
              imgUrl:res.data.data.banner
            })
        }
        
      }
    })
  },
  /* 点击进入历史活动页面 */
  bindLogin:function(){
    wx.navigateTo({
      url: '../historicalActivities/historicalActivities',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  //进入活动
  clickcontent:function(e){
    wx.navigateTo({
      url:'../missionDetail/missionDetail?id='+e.currentTarget.dataset.id+'&name='+e.currentTarget.dataset.name,
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
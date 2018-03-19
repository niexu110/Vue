// pages/shopDetails/shopDetails.js
var starclicknum=0;//判断星级评价点击
var arrimg=[],arrgood=[],arrfind=[],arrbad=[];//分别代表晒图评价、好评、中评、差评
var md5=require('../../utils/MD5.js')
var config=require('../../utils/config.js');
Page({
  data:{
    goods_id:"",
    telImg:'http://img.qinyikou.cc/icons/tel.png',
    id:"",
    nav1:"nav1",
    nav2:"nav2",
    nav3:"nav2",
    val1:"",
    val2:"",
    hidden1:true,
    hidden2:false,
    hidden3:false,
    img3:config.IMG_URL+'/star_03.gif',
    img5:config.IMG_URL+'/star_05.gif',
    img10:config.IMG_URL+'/star_10.png',
    /* 服务 */
    src:"",//商家图
    text1:"",
    servetitle:"",//台头
    servename:"",//商家店名
    servemoney:"",//费用
    servesite:"",//地址
    clickTel:"clickTel",
    phone:"",//电话
    /* 商家详情 */
    serveimg:[],
    /* 评价 */
    starNum:"",
    hide:false,
    allComment:"allComment",
    imgComment:"imgComment",
    arrimgs:[],//晒图评价
    arrgoods:[],//好评
    arrfinds:[],//中评
    arrbads:[],//差评
    good:"",//好评数
    find:"",//中评数
    bad:"",//差评数
    commentContent:[//全部评价
    ],
    rank:1,//1代表全部评价，2代表晒图评价，3代表好评，4代表中评，5代表差评
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    self.setData({
      id:options.id,
      uid:options.uid,
      val1:options.val1,
      val2:options.val2,
      sex:options.sex,
    })
    wx.setNavigationBarTitle({
      title: options.title,
      success: function(res) {
        // success
      }
    })
    var list=[];
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
        console.log(res)
        console.log(res.data.data.details)
        var arr=res.data.data.details
        var cc=arr.split("\"")
        var imgArr=[]
        console.log(cc)
        for(var i in cc){
          if(cc[i].charAt(0)=="h" && cc[i].charAt(1)=="t" && cc[i].charAt(2)=="t" && cc[i].charAt(3)=="p"){
            imgArr.push(cc[i])
          }
        }
        var lists=res.data.data;
        self.setData({
          phone:lists.phone,
          servename:lists.goods_name,
          servemoney:lists.shop_price+"元/人",
          servesite:lists.address,
          src:lists.goods_img,
          serveimg:imgArr
        })
      },
    })
    /* 评论集合 */
    var list=self.data.commentContent;
    var sum=[];//所有评论星数，
     for(var i in list){
       if(list[i].userstar==5 || list[i].userstar==4){
         arrgood.push(list[i])
       }else if(list[i].userstar==3 || list[i].userstar==2){
         arrfind.push(list[i])
       }else if(list[i].userstar==1){
         arrbad.push(list[i])
       }
       if(list[i].src!=""){
         arrimg.push(list[i])
       }
       sum=Number(sum+list[i].userstar)
     }
     var average=parseInt(sum/list.length) 
     self.setData({
       arrimgs:arrimg,
       arrgoods:arrgood,
       arrfinds:arrfind,
       arrbads:arrbad,
       good:arrgood.length,
       find:arrfind.length,
       bad:arrbad.length,
       starNum:average,//总体评价星级
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
  /* 点击服务 */
  clickActivity:function(){
    this.setData({
      nav1:"nav1",
      nav2:"nav2",
      nav3:"nav2",
      hidden1:true,
      hidden2:false,
      hidden3:false,
    })
  },
    /** 点击我要在这里约会  */
    clickbutton:function(e){
      var self=this;
        wx.redirectTo({
          url: '../secondStepDate/secondStepDate?id='+self.data.id+'&uid='+self.data.uid+'&sex='+self.data.sex+'&val1='+self.data.val1+'&val2='+self.data.val2,
          success: function(res){
            // success
          },
        })
    },
  /* 点击商品环境 */
  clickSplendid:function(){
    this.setData({
      nav1:"nav2",
      nav2:"nav1",
      nav3:"nav2",
      hidden1:false,
      hidden2:true,
      hidden3:false,
    })
  },
  /* 点击评论 */
  clickComment:function(){
    this.setData({
      nav1:"nav2",
      nav2:"nav2",
      nav3:"nav1",
      hidden1:false,
      hidden2:false,
      hidden3:true,
    })
  },
  /* 点击拨打电话 */
  clickTel:function(){
    var self=this;
    wx.makePhoneCall({
      phoneNumber: self.data.phone,
    })
  },
  /* 点击全部评价 晒图评价*/
  allComment:function(){
    this.setData({
      allComment:"allComment",
      imgComment:"imgComment",
      rank:1,
    })
  },
  imgComment:function(){
    this.setData({
      allComment:"imgComment",
      imgComment:"allComment",
      rank:2,
    })
  },
  /* 点击好评、中评、差评 */
  goodComment:function(){
    this.setData({
      rank:3,
    })
  },
  findComment:function(){
    this.setData({
      rank:4,
    })
  },
  badComment:function(){
    this.setData({
      rank:5,
    })
  },
  /* 点击星级评论（内含好评、差评等） */
  starComment:function(){
    starclicknum++
    if(starclicknum%2==0){
      this.setData({
        hide:false,
      })
    }else if(starclicknum%2==1){
      this.setData({
        hide:true,
      })
    }
  }
})
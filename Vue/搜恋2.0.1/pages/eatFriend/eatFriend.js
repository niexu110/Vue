// pages/eatFriend/eatFriend.js
var md5=require('../../utils/MD5.js')
var numgirls=10;//报名女性人数
var numboys=12;//报名男性人数
var config=require('../../utils/config.js');
var heji=20;
var starclicknum=0;//判断星级评价点击
var arrimg=[],arrgood=[],arrfind=[],arrbad=[];//分别代表晒图评价、好评、中评、差评
Page({
  data:{
    img03:config.IMG_URL+"/min_03.gif",
    img06:config.IMG_URL+"/min_06.gif",
    img08:config.IMG_URL+"/min_08.gif",
    img10:config.IMG_URL+"/min_10.gif",
    img12:config.IMG_URL+"/min_12.gif",
    img14:config.IMG_URL+"/min_14.gif",
    img16:config.IMG_URL+"/min_16.gif",
    imgboy:config.IMG_URL+"/x_boys.png",
    imggirl:config.IMG_URL+"/x_girls.png",
    id:"167",//商品id
    token:"",
    page:"",
    nav1:"nav1",
    nav2:"nav2",
    nav3:"nav2",
    hidden1:true,
    hidden2:false,
    hidden3:false,
    img3:config.IMG_URL+'/star_03.gif',
    img5:config.IMG_URL+'/star_05.gif',
    img10:config.IMG_URL+'/star_10.png',
    activity:{
      banner:"",
      text1:"",
      text2:numboys,//参见的男士人数
      text3:numgirls,//参加的女士人数
      time:"",//时间
      timeState:"",//报名截至
      address:"",//地址
      souMoney:"",//价钱
      tel:"",//电话
      details:"。",//详情
      annotation:"",//注释
    },
    splendidTitle:"今天搜恋网“今天圣诞不剩单”今天搜恋网“今天圣诞不剩单”",
    contentText:"",
    /* 评价 */
    starNum:"",//星星总体评价
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
    commentContent:[],//全部评价
    rank:1,//1代表全部评价，2代表晒图评价，3代表好评，4代表中评，5代表差评
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    var self=this
    self.setData({
      id:options.id,
    })
    wx.setNavigationBarTitle({
      title:options.content
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Goods/history_detail',
      data: {
          id:self.data.id,
          token:md5.MD5(self.data.id+"solianJSKASDKES"),
      },
      method: 'POST', 
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function(res){
        // success
        var list=res.data.data.huodong
        var annotation=res.data.data.huodong.event_detail;//提示
        annotation=annotation.replace(/&nbsp;/g,'')
        annotation=annotation.replace(/<([a-zA-Z]+)\s*[^><]*>/g,"");
        annotation=annotation.replace(/<\/([a-zA-Z]+)\s*[^><]*>/g,"");
        var contentText=res.data.data.moment;//精彩瞬间
        contentText=contentText.replace(/&nbsp;/g,'')
        contentText=contentText.replace(/<([a-zA-Z]+)\s*[^><]*>/g,"\r\n");
        contentText=contentText.replace(/<\/([a-zA-Z]+)\s*[^><]*>/g,"");
        
        self.setData({
          activity:{
              banner:res.data.data.huodong.images,
              text1:"（限定各"+list.number+"人），已报"+Number(list.waman+list.man)+"人",
              text2:list.waman,
              text3:list.man,
              time:new Date(parseInt(list.date_time) * 1000).toLocaleString().substr(0,16),
              timeState:"（报名截至："+new Date(parseInt(list.abort_time) * 1000).toLocaleString().substr(0,9)+"）",
              address:list.site,//地址
              souMoney:list.price+"搜恋币",
              tel:list.photo,
              details:list.event_state,//详情
              annotation:annotation,//注释
          },
          contentText:contentText
        })
      },
    })
    /* 评论中的 */
    var list=self.data.commentContent;
    var sum=[];
     for(var i in list){
       if(list[i].xingxing==5 || list[i].xingxing==4){
         arrgood.push(list[i])
       }else if(list[i].xingxing==3 || list[i].xingxing==2){
         arrfind.push(list[i])
       }else if(list[i].xingxing==1){
         arrbad.push(list[i])
       }
       if(list[i].src!=""){
         arrimg.push(list[i])
       }
       sum=Number(sum+list[i].xingxing)
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
  /* 点击拨打电话 */
  clickTel:function(){
    var self=this;
    wx.makePhoneCall({
      phoneNumber: self.data.activity.tel,
    })
  },
  /* 点击活动简介 */
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
  /* 点击精彩瞬间 */
  clickSplendid:function(){
    var self=this;
    self.setData({
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
    var self=this;
    self.setData({
      nav1:"nav2",
      nav2:"nav2",
      nav3:"nav1",
      hidden1:false,
      hidden2:false,
      hidden3:true,
    })
    wx.request({
      url: config.SL_URL+'/index.php/Home/Engagement/discuss',
      data: {
          goods_id:self.data.id,
          token:md5.MD5(self.data.id+"solianJSKASDKES"),
      },
      method: 'POST', 
      header: {
          'content-type': 'application/x-www-form-urlencoded'
      },// 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        var commentContent=res.data.data
        for(var i in commentContent){
          commentContent[i].addtime=new Date(parseInt(commentContent[i].addtime) * 1000).toLocaleString().substr(0,16)
        }
        self.setData({
          commentContent:commentContent
        })
      },
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
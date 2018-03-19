// pages/mynamecard/mynamecard.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp();
Page({
  data:{
    uid:"",
    token:"",
    myname:"",//昵称
    src:"",//头部图
    backgroundimg:"",
    gender:"",//男，女
    credit:'',//约会信用值
    charm:'',//魅力值
    like:'',//喜欢
    praise:'',//点赞
    age:'',//年龄
    sign:"",//个性签名
    career:"",//职业
    city:"",//居住地
    star:"",//星座
    rank:"",//身份
    high:"",//身高
    nation:"",//民族
    earing:"",//收入
    weight:"",//体重
    belief:"",//信仰
    mobile:"",//手机是否认证
    status:"",//身份是否已认证
    giftnum:"",//收到的礼物总数
    myhobby:"",//兴趣爱好
    srclist:[],//相册
    hidden:true,//是否显示查看更多
    photoHidden:true,//相册是否隐藏
    kindlist:[],//我喜欢的异性类
    concern:["自己"],//其他 关系
    lookmore:"查看更多",
    love:'喜欢',
    loves:'',
    loveImg:config.IMG_URL+'/love.png',
    photo1:config.IMG_URL+'/-编辑资料白@2x.png',
    photo2:config.IMG_URL+'/性别女@2x.png',
    photo3:config.IMG_URL+'/性别男@2x.png',
    photo4:config.IMG_URL+'/renzheng_03.gif',
  },
  clickImg:function(e){
    var self=this;
    var srclist=self.data.srclist;
    console.log(srclist, e.currentTarget.id)
    wx.previewImage({ current: srclist[e.currentTarget.id], urls: srclist  })},
  onLoad:function(options){
    var self=this
    var str=wx.getStorageSync('openid');
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/personage_li',
      data: {
        uid:str.uid,
        token:md5.MD5(str.uid+"solianJSKASDKES")
      },
      method: 'POST', header: {'content-type':'application/x-www-form-urlencoded'}, // 设置请求的 header
      success: function(res){
      // success
      /* 判断是否认证 */
      console.log(res.data.data.old_uid)
      if(res.data.data.old_uid==0){
        self.setData({ status:"未认证", renzheng:"http://img.qinyikou.cc/icons/renzheng_06.gif",
        })
      }else if(res.data.data.old_uid==1 && res.data.data.sex=="男"){
        self.setData({status:"已认证", renzheng:"http://img.qinyikou.cc/icons/身份已认证@2x.png"
        })
      }else if(res.data.data.old_uid==1 && res.data.data.sex=="女"){
        self.setData({ status:"已认证",renzheng:"http://img.qinyikou.cc/icons/身份已认证女@2x.png"
        })
      }
      var arrxiangce=[]
      if(res.data.code==200){
          var xiangce=res.data.data.xiangce;
          for(var i in xiangce){arrxiangce.push(res.data.data.xiangce[i].images)}
          if(arrxiangce.length==0){
              self.setData({ hidden:false, photoHidden:false, })
          }else if(arrxiangce.length<=4){
              self.setData({ hidden:false,srclist:arrxiangce, })
          }else if(arrxiangce.length<=11){
              self.setData({ hidden:true,srclist:arrxiangce,})
          }else if(arrxiangce.length>11){
            var cc=arrxiangce.splice(arrxiangce.length-11,arrxiangce.length)
                self.setData({ hidden:true,srclist:arrxiangce.splice(arrxiangce.length-11,arrxiangce.length),})}
          if(res.data.data.likes==0){
            self.setData({loveImg:'http://img.qinyikou.cc/icons/love.png',loves:res.data.data.likes, })
          }else if(res.data.data.likes==1){
             self.setData({ loveImg:'http://img.qinyikou.cc/icons/loves.png', loves:res.data.data.likes, })}
          //判断头像是否为空
          if(res.data.data.image=="" || res.data.data.image==undefined){
            res.data.data.image="http://img.qinyikou.cc/icons/x_upload_img.jpg"}
          if(res.data.data.backgroundimage=="" || res.data.data.backgroundimage==undefined){
            res.data.data.backgroundimage=res.data.data.image}
            self.setData({
              myname:res.data.data.nickname,//昵称
              age:res.data.data.age,//年龄
              src:res.data.data.image,//头像
              backgroundimg:res.data.data.backgroundimage,
              credit:res.data.data.credit,//约会信用值
              charm:res.data.data.charm,//魅力值
              like:res.data.data.count,//喜欢总数
              praise:"165",//点赞
              gender:res.data.data.sex,//男，女
              sign:res.data.data.myideal,//个性签名
              myhobby:res.data.data.myhobby,//兴趣爱好
              career:res.data.data.job,//职业
              city:res.data.data.citys,//居住地
              star:res.data.data.constellation,//星座
              rank:res.data.data.marry,//身份
              high:res.data.data.height+"cm",//身高
              nation:res.data.data.nation,//民族
              earing:res.data.data.income+"/月",//收入
              weight:res.data.data.weight+"kg",//体重
              belief:res.data.data.belief,//信仰
              giftnum:res.data.data.gift,//收到的礼物总数
              kindlist:res.data.data.interest,//我喜欢的异性类
              srclist:arrxiangce,//相册
              concern:["自己"],//其他 关系
          })
        }
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
  /* 点击  相册  查看更多 */
  clicklookmore:function(){
    if(this.data.lookmore=="查看更多"){
      this.setData({lookmore:"收起"})
    }else if(this.data.lookmore=="收起"){
      this.setData({lookmore:"查看更多" }) }},
  //点击喜欢
  clickLoves:function(e){
   var self=this;
   if(self.data.uid==""||self.data.uid==undefined){wx.navigateTo({ url: '../login/login', })
    }else if(self.data.loves==0){
      console.log(self.data.loves)
     self.data.like++
     wx.request({
       url: config.SL_URL+'/index.php/Home/User/xilist',
       data: {
         uid:self.data.fid,
         d_uid:self.data.uid,
         token:md5.MD5(self.data.fid+self.data.uid+"solianJSKASDKES")
       },
       method: 'POST',
       header: {'content-type':'application/x-www-form-urlencoded'}, 
       success: function(res){
         // success
          self.setData({
            loveImg:'http://img.qinyikou.cc/icons/loves.png',
            like:self.data.like,
            loves:1
         })
       }
     })
   }else if(self.data.loves==1){
     console.log(self.data.loves)
       self.data.like--;
      wx.request({
       url: config.SL_URL+'/index.php/Home/User/xilist',
       data: {
         uid:self.data.fid,
         d_uid:self.data.uid,
         token:md5.MD5(self.data.fid+self.data.uid+"solianJSKASDKES")
       },
       method: 'POST',
       header: {'content-type':'application/x-www-form-urlencoded'}, 
       success: function(res){
         // success
          self.setData({
            loveImg:'http://img.qinyikou.cc/icons/love.png',
            like:self.data.like,
            loves:0
         })
       }
     })
   }
  },
  clickedit:function(){
    wx.navigateTo({ url: '../basic/basic',}) },
  /* 点击收到的礼物 */
  clickliwu:function(){
    var self=this;
      wx.navigateTo({ url: '../mygift/mygift',})},
})
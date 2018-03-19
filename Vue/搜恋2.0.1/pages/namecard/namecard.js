// pages/namecard/namecard.js
var md5=require('../../utils/MD5.js')
var config=require('../../utils/config.js');
var app=getApp();
Page({
  data:{
    uid:"",//被发起人id
    fid:"",//发起人id
    token:"",
    myname:"",//昵称
    src:"",//头部图
    backgroundimg:"",//背景图
    gender:"",//男，女
    credit:65,//约会信用值
    charm:554,//魅力值
    like:0,//喜欢
    praise:165,//点赞
    age:33,//年龄
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
    lookmore:"查看更多",
    love:'喜欢',
    loves:'',
    loveImg:config.IMG_URL+'/love.png',
    kindlist:[],//我喜欢的异性类
    concern:["自己"],//其他 关系
    renzheng:config.IMG_URL+"/renzheng_06.gif",
    photo1:config.IMG_URL+'/加好友@2x.png',
    photo2:config.IMG_URL+'/红娘咨询@2x.png',
    photo3:config.IMG_URL+'/性别女@2x.png',
    photo4:config.IMG_URL+'/性别男@2x.png',
    photo5:config.IMG_URL+'/renzheng_03.gif',
    photo6:config.IMG_URL+'/聊天@2x.png',
    photo7:config.IMG_URL+'/送礼物@2x.png',
    photo8:config.IMG_URL+'/约会@2x.png',
  },
  //点击头像
  clickHead:function(e){
    var self=this;
    var srclist=self.data.src;
    var arr=[]
    arr.push(srclist)
    wx.previewImage({
      current: arr[0], // 当前显示图片的http链接
      urls: arr// 需要预览的图片http链接列表
    })
  },
  //点击预览图片
  clickImg:function(e){
    var self=this;
    var srclist=self.data.srclist;
    console.log(srclist, e.currentTarget.id)
    wx.previewImage({
      current: srclist[e.currentTarget.id], // 当前显示图片的http链接
      urls: srclist // 需要预览的图片http链接列表
    })
  },
  onLoad:function(options){
    var self=this;
      self.data.fid=app.globalData.id;
      self.setData({
        uid:options.uid
      })
    wx.setNavigationBarTitle({
      title:options.user,
      success: function(res) {
        // success
      }
    })
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: config.SL_URL+'/index.php/Home/User/personage_li',
      data: {
        uid:self.data.uid,
        token:md5.MD5(self.data.uid+"solianJSKASDKES")
      },
      method: 'POST',
      header: {
        'content-type':'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res){
      // success
      /* 判断是否认证 */
      if(res.data.data.old_uid==0){
        self.setData({
            status:"未认证",//身份是否已认证
            renzheng:"http://img.qinyikou.cc/icons/renzheng_06.gif",
        })
      }else if(res.data.data.old_uid==1 && res.data.data.sex=="男"){
        self.setData({
            status:"已认证",//身份是否已认证
            renzheng:"http://img.qinyikou.cc/icons/身份已认证@2x.png"
        })
      }else if(res.data.data.old_uid==1 && res.data.data.sex=="女"){
        self.setData({
            status:"已认证",//身份是否已认证
            renzheng:"http://img.qinyikou.cc/icons/身份已认证女@2x.png"
        })
      }
      var arrxiangce=[]
      if(res.data.code==200){
          var xiangce=res.data.data.xiangce;
          for(var i in xiangce){
            arrxiangce.push(res.data.data.xiangce[i].images)
          }
          if(arrxiangce.length==0){
              self.setData({
                 hidden:false,
                 photoHidden:false,
              })
          }else if(0<arrxiangce.length<=4){
              self.setData({
                 hidden:true,
                 srclist:arrxiangce,
              })
          }else if(4<arrxiangce.length<=11){
              self.setData({
                 hidden:true,
                 srclist:arrxiangce,//相册
              })
          }else if(arrxiangce.length>11){
                self.setData({
                 hidden:true,
                  srclist:arrxiangce.splice(arrxiangce.length-11,arrxiangce.length),//相册
                })
          }
 
          if(res.data.data.likes==0){
            self.setData({
               loveImg:'http://img.qinyikou.cc/icons/love.png',
               loves:res.data.data.likes,//点击判断 
            })
          }else if(res.data.data.likes==1){
             self.setData({
               loveImg:'http://img.qinyikou.cc/icons/loves.png',
               loves:res.data.data.likes,//点击判断 
            })
          }
          //判断头像是否为空
          if(res.data.data.image=="" || res.data.data.image==undefined){
            res.data.data.image="http://img.qinyikou.cc/icons/x_upload_img.jpg"
          }
          if(res.data.data.backgroundimage=="" || res.data.data.backgroundimage==undefined){
            res.data.data.backgroundimage=res.data.data.image
          }
          self.setData({
              myname:res.data.data.nickname,//昵称
              age:res.data.data.age,//年龄
              src:res.data.data.image,//头像
              backgroundimg:res.data.data.backgroundimage,
              credit:res.data.data.credit,//约会信用值
              charm:res.data.data.charm,//魅力值
              like:res.data.data.count,//喜欢总数
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
              concern:["自己"],//其他 关系
          })
        }
      }
    })
  },
  //点击加好友
  clickaddfriend:function(){
    var self=this;
    if(self.data.fid==""||self.data.fid==undefined){
         wx.navigateTo({
          url: '../login/login',
        })
    }else{
        wx.request({
          url: config.SL_URL+'/index.php/Home/User/firends',
          data: {
            uid:self.data.uid,
            f_uid:self.data.fid,
            token:md5.MD5(self.data.uid+self.data.fid+"solianJSKASDKES")
          },
          method: 'POST', 
          header: {
            'content-type':'application/x-www-form-urlencoded'
          }, // 设置请求的 header
          success: function(res){
            // success
  
          if(res.data.code==404){
                    wx.showToast({
                      title: res.data.massage,
                      icon: 'loading',
                      duration: 2000
                    })
                }else if(res.data.code==303){
                  wx.showToast({
                    title: '发送请求失败请稍后再试',
                    icon: 'loading',
                    duration: 2000
                    })
                }else if(res.data.code==200) {
                    wx.showToast({
                        title: "好友请求已发送",
                        icon: 'ssuccess',
                        duration: 2000
                    })
            }
          },
        })
    }
  },
  //点击红娘咨询
  clickHongNiang:function(){
    wx.navigateTo({
      url: '../hongNiang/hongNiang',
      success: function(res){
        // success
      },
    })
  },
  /* 点击  相册  查看更多 */
  clicklookmore:function(){
    if(this.data.lookmore=="查看更多"){
      this.setData({
        lookmore:"收起"
      })
    }else if(this.data.lookmore=="收起"){
      this.setData({
        lookmore:"查看更多"
      })
    }
  },
  clickLoves:function(e){
   var self=this;
   if(self.data.fid==""||self.data.fid==undefined){
       wx.navigateTo({
          url: '../login/login',
        })
    }else if(self.data.loves==0){
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
          self.setData({
            loveImg:'http://img.qinyikou.cc/icons/love.png',
            like:self.data.like,
            loves:0
         })
       }
     })
   }
  },
  /* 点击收到的礼物 */
  clickliwu:function(){
    var self=this;
    if(self.data.fid==""||self.data.fid==undefined){
        wx.navigateTo({
          url: '../login/login',
        })
    }else{
      wx.navigateTo({
        url: '../giftGiving/giftGiving?myname='+self.data.myname+'&src='+self.data.src+'&uid='+self.data.uid,
      })
    }
  },
  /* 点击聊天 */
  clicksay:function(){
     wx.showToast({
          title: "聊天请到APP体验",
          icon: 'loading',
          duration: 2000
         }) 
  },
  /* 点击送礼物 */
  clickgivegift:function(){
    var self=this;
    if(self.data.fid==""||self.data.fid==undefined){
        wx.navigateTo({
          url: '../login/login',
        })
    }else{
      wx.navigateTo({
        url: '../giftGiving/giftGiving?myname='+self.data.myname+'&src='+self.data.src+'&uid='+self.data.uid,
      })
    }
  },
  /* 点击约会 */
  clickdate:function(){
    var self=this;
    if(self.data.fid==""||self.data.fid==undefined){
         wx.navigateTo({
          url: '../login/login',
        })
    }else{
      wx.navigateTo({
        url: '../firstStepDate/firstStepDate?myname='+self.data.myname+'&src='+self.data.src+'&uid='+self.data.uid+'&sex='+self.data.gender,
      })
    }
  }
})
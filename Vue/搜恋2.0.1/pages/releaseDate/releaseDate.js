// pages/releaseDate/releaseDate.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
    data:{
        id:"",//发布id
        uid:'',//自己id
        fid:"",//他的id
        eid:'',
        token:'',
        onClickButoon:false,
        releaseImg:'',//头像
        username:'',//昵称
        sexWomanImg:config.IMG_URL+'/x_girls.png',
        sexManImg:config.IMG_URL+'/x_boys.png',
        sex:'',
        userage:'',//年龄
        constellation:'',//星座
        userstate:'',//状况 单身
        trustworthiness:'',//信用值
        grade:'',
        declaration:'',//约会誓言
        placeName:'',//会餐店名
        timeOut:'',//时间 
        pay:'',
        onlyBoy:'',
        shuttle:'',
        haveNum:'',//接受约会人数
        placeImg:'',//店图
        zhifu:""//
    },

    //点击查看服务详情跳转
    findInfo: function () {
        var self = this
        var look = 0
        wx.navigateTo({
          url: '../eatFriendOne/eatFriendOne?id='+self.data.engagement.goods_id+"&title="+self.data.goods.goods_name+"&look="+0,
        })
    },

    //点击我期待和他约会触发
    secondPage:function() {
        var self = this
        console.log(self.data.uid)
        console.log(self.data.id)
        if(self.data.uid==""||self.data.uid==undefined){
            app.getUserInfo(app.globalData.id,this);
            return false
        }
        else{
            wx.request({
                url: config.SL_URL+'/Home/Engagement/user_apply',
                data: {
                    uid:self.data.uid,
                    eid:self.data.id,
                    token:md5.MD5(self.data.uid+self.data.id+"solianJSKASDKES")
                },
                method: 'POST', 
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: function(res){
                    // success
                    console.log(res)
                    if(res.data.code==200){
                        self.setData({
                            onClickButoon:true,
                        })
                    }else if(res.data.massage=="约会已过期"){
                        wx.showToast({
                            title:"约会已过期",
                            icon:"loading",
                            duration:1500
                        })
                    }
                }
            })
        }
        
    },
    //点击查看详情触发
    onClickFind:function() {
          wx.redirectTo({
          url: '../myDate/myDate',
          success: function(res){
            // success
          }
        })
    },
    onLoad:function(options){
        //页面初始化 options为页面跳转所带来的参数
      var self = this
      self.data.uid=app.globalData.id;
        self.setData({
            id:options.id,
        })
        wx.request({
            url: config.SL_URL+'/Home/Engagement/fb_detail',
            data: {
                id:self.data.id,
                token:md5.MD5(self.data.id+"solianJSKASDKES")
            },
            method: 'POST', 
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                // success
                console.log(res)
                var list=res.data.data.user;
                var goods=res.data.data.goods;
                var engagement=res.data.data.engagement;
                self.setData({
                    declaration:engagement.mood,
                    placeName:goods.goods_name,
                    timeOut:new Date(parseInt(engagement.mood_time) * 1000).toLocaleString().substr(0,16),
                    placeImg:goods.mobileimg,
                    userstate:list.marry,
                    constellation:list.constellation,
                    trustworthiness:list.charm,//信用值
                    username:list.nickname,
                    userage:list.age,
                    releaseImg:list.image,
                    haveNum:res.data.data.request_count,
                    money:engagement.money,//商品总价钱
                    engagement:engagement,
                    goods:goods,
                    list:list,
                    fid:engagement.fid
                })
                console.log(list.sex)
                if(list.sex==1){
                    self.setData({
                        sex:"男"
                    })
                    wx.setNavigationBarTitle({
                        title: '他发布的约会',
                    })
                }else if(list.sex==2){
                    self.setData({
                        sex:"女"
                    })
                     wx.setNavigationBarTitle({
                        title: '她发布的约会',
                    })
                }
                /* 判断约会信用值高  正常  低 */
                if(self.data.trustworthiness<30){
                    self.setData({
                        grade:"低",
                    })
                }else if(30<=self.data.trustworthiness && self.data.trustworthiness<50){
                    self.setData({
                        grade:"正常",
                    })
                }else if(self.data.trustworthiness>=50){
                    self.setData({
                        grade:"高",
                    })
                }
                //是否限制性别
                if(engagement.sex==0){
                    self.setData({
                        onlyBoy:"男女不限"
                    })
                }else if(engagement.sex==1) {
                    self.setData({
                        onlyBoy:"仅限男士"
                    })
                }else if(engagement.sex==2) {
                    self.setData({
                        onlyBoy:"仅限女士"
                    })
                }
                //是否接送
                if(engagement.pick==0){
                    self.setData({
                        shuttle:"不负责接送"
                    })
                }else {
                    self.setData({
                        shuttle:"负责接送"
                    })
                }
                //是否支付
                if(engagement.type==0){
                    self.setData({
                        pay:"待对方确认需支付"+Number(self.data.money)/2+"元",
                        //zhifu:"(支付"+Number(self.data.money)/2+"搜恋币)"
                    })
                }else{
                    self.setData({
                        pay:"对方已支付本次约会的费用"
                    })
                }
            }
        })
    },
    //点击人员信息
    clicktop:function(e){
        var self=this;
        wx.navigateTo({
          url: '../namecard/namecard?uid='+self.data.fid+'&user='+self.data.username,
          success: function(res){
            // success
          },
        })
    },
    // onReady:function(){
    //   // 页面渲染完成
    // },
    onShow:function(){
      // 页面显示
      
    },
    // onHide:function(){
    //   // 页面隐藏
    // },
    // onUnload:function(){
    //   // 页面关闭
    // }
})
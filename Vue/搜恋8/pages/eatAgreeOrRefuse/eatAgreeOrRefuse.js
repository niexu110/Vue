// pages/eatAgreeOrRefuse/eatAgreeOrRefuse.js
var md5 = require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app = getApp()
Page({
    data: {
        id:"",//商品id
        uid: '',
        eid: '',
        token: '',
        list:{},
        goods:{},
        engagement:{},
        count:"",//几人接受
        disabled: false,
        onClickButoon: false,
        releaseImg: '',
        username: 'CHLOE',
        sexWomanImg: config.IMG_URL+'/x_girls.png',
        sexManImg: config.IMG_URL+'/x_boys.png',
        sex: '',//性别 1男 2女
        status: '',//状态  0 邀请阶段 1 接受 2 拒绝 3 有事取消
        blue: '#5793dd', width: '20rpx', height: '20rpx',
        pay: '',//支付方式 1、我请客 2、AA制
        already: '0',//0 未支付 1 已支付
        other:'',friend:'',
        userage: '',
        constellation: '',
        trustworthiness: '85', //小于30为低 大于30且小于50为中 大于50为高
        placeImg: '',
        promptText: '请双方在约会前提前沟通好，约会前2小时双方都可取消约会。已经冻结的额费用，返还支付账户，但取消方会扣除相应的约会信用值。',
        heOrShe: '联系他/她',
        changeAgree: false, changeRefuse: true, hidden: true, show: true,
    },
    //查看服务详情
    findInfo:function() {
        var self = this;
        var e = self.data
        wx.navigateTo({
          url: '../eatFriendOne/eatFriendOne?id='+e.engagement.goods_id+"&title="+e.goods.goods_name+"&look="+0,
        })
    },
    //点击拒绝
    refuse: function () {
        var self = this;
        wx.showModal({
            title: '提示',
            content: '您真的要拒绝' + self.data.list.nickname + "的约会吗",
            success: function (res) {
                if (res.confirm) {
                   wx.request({
                        url: config.SL_URL+'/index.php/Home/Engagement/user_deny',
                        data: {
                                uid: self.data.uid,
                                eid: self.data.id,
                                token: md5.MD5(self.data.uid + self.data.id + "solianJSKASDKES")
                            },
                            method: 'POST',
                            header: { 'content-type': 'application/x-www-form-urlencoded' },
                        success: function(res){
                            // success
                            if(res.data.code==200){
                                wx.showToast({
                                    title: '您已成功决绝了' + self.data.list.nickname + "的约会",
                                    icon: 'success',
                                    duration: 2000
                                })
                                self.data.engagement.stty=2
                            }
                                
                        },
                    })
                    
                }
            }
        })
    },
    //点击同意
    agree: function (e) {
        var self = this;
        if(self.data.engagement.fb_type==1){//1为好友
            if(self.data.engagement.sty == '1'){
                wx.request({
                    url: config.SL_URL+'/index.php/Home/Engagement/accept',
                    data: {
                        uid: self.data.uid,
                        eid: self.data.id,
                        token: md5.MD5(self.data.uid + self.data.id + "solianJSKASDKES")
                    },
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    success: function (res) {
                        if(res.data.code==200){
                            self.data.engagement.stty=1
                        }
                    }
                })
            }else if(self.data.engagement.sty != '1'){
                wx.navigateTo({
                    url: '../pay/pay?id='+self.data.id+'&uid='+self.data.uid,
                })
            }
        }else if(self.data.engagement.fb_type==2){//2 陌生人
            if (self.data.engagement.sty == '1') {//状态2为已支付
                wx.request({
                    url: config.SL_URL+'/index.php/Home/Engagement/accept',
                    data: {
                        uid: self.data.uid,
                        eid: self.data.id,
                        token: md5.MD5(self.data.uid + self.data.id + "solianJSKASDKES")
                    },
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                    success: function (res) {
                        if(res.data.code==200){
                            self.data.engagement.stty=1
                        }
                    }
                })
            }else if (self.data.engagement.sty != '1') {
                wx.showModal({
                    title: '提示',
                    content: "请前往APP体验此服务",
                    success: function (res) {
                        if (res.confirm) {
                            
                        }
                    }
                })
            }
        }   
    },
    onLoad: function (options) {
        var self = this
        app.getUserInfo(app.globalData.id, this);
        self.data.uid = app.globalData.id;
        self.setData({
            id: options.id,//商品id
        })
        wx.request({
            url: config.SL_URL+'/Home/Engagement/fb_detail',
            data: {
                id:self.data.id,
                uid:self.data.uid,
                token:md5.MD5(self.data.id+"solianJSKASDKES")
            },
            method: 'POST', 
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                // success
                var list=res.data.data.user;
                var goods=res.data.data.goods;
                var engagement=res.data.data.engagement;
                    engagement.add_time=new Date(parseInt(engagement.add_time) * 1000).toLocaleString().substr(0,16);
                    //engagement[i].moodtime=new Date(engagement[i].mood_time * 1000).toLocaleString().substr(0,16)
                self.setData({
                    list:res.data.data.user,
                    goods:res.data.data.goods,
                    engagement:res.data.data.engagement,
                    count:res.data.data.request_count
                })
                wx.setNavigationBarTitle({
                  title: self.data.goods.goods_name,
                  success: function(res) {
                    // success
                  }
                })
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
                //是否接送
                //
                if(engagement.type==1){
                    self.setData({
                        pay:"待对方确认需支付"+Number(self.data.money)/2+"搜恋币",
                        //zhifu:"(支付"+Number(self.data.money)/2+"搜恋币)"
                    })
                }else{
                    self.setData({
                        pay:"对方已支付本次约会的费用"
                    })
                }
            }
        })
        if (options.status == 1) {
            self.setData({
                status: '1',
                hidden: false,
                disabled: true,
            })
        }
        else if (options.status == 2) {
            self.setData({
                status: '2',
                show: false,
                disabled: true,
            })
        }
        else if (options.status == 0) {
            self.setData({
                status: '0',
            })
        }
    },
})
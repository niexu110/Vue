// pages/myPlan/myPlan.js
var md5 = require('../../utils/MD5.js');
var util = require('../../utils/util.js')
var config=require('../../utils/config.js');
var app = getApp()
var t = 1000;
var num;
var list;
Page({
    data: {
        uid: '',//自己的id
        id: '',
        hid:"",//别人的，
        fb_type:"",//是否好友
        token: '',
        releaseImg: 'http://tx.haiqq.com/uploads/allimg/150325/12223931P-1.jpg',
        nickname: '',
        sexWomanImg: config.IMG_URL+'/x_girls.png',
        sexManImg: config.IMG_URL+'/x_boys.png',
        sex: '女',
        userage: '23',
        constellation: '单身',
        userstate: '已通过身份认证',
        trustworthiness: '85',
        grade: '高',
        changeInfo: true,
        placeImg: 'http://file06.16sucai.com/2016/0421/3557c14a119e6a6c557ab563e43f3fcb.jpg',
        place: '名字',
        times: '2016年12月12日18点',
        say: '来一场温馨的约会，希望这将是我们爱的起点，不管你来自何方，我都会依旧等待。',
        one: '男女不限',
        agreeNum: '5',
        status: '0', blue: '#5793dd', width: '20rpx', height: '20rpx',
        payMethod: 'AA制',
        Times: '2016.12.12   08:21',
        changeAgree: false, changePeople: false, withPeople: false,
        list: [],
        listTrue:{},
        engagement:{},
        goods:{}
    },
    //查看服务详情
    findInfo:function() {
        var self = this;
        var e = self.data
        wx.navigateTo({
          url: '../eatFriendOne/eatFriendOne?id='+e.engagement.goods_id+"&title="+e.goods.goods_name+"&look="+0,
        })
    },
    //点击约会对象头像
    clickHeadImg: function (e) {
        var no = e.target.id;
        var self = this
        var list = self.data.list;
        if (list[no].hidden == true) {
            list[no].hidden = false
            num = 0;
        } else if (list[no].hidden == false) {
            list[no].hidden = true;
            num = 1;
            for (var i in list) {
                if (i < no || i > no) {
                    list[i].hidden = false;
                }
            }
        }
         /* 判断约会信用值高  正常  低 */
                if(list[no].charm<30){
                    self.setData({
                        grade:"低",
                    })
                }else if(30<=list[no].charm && list[no].charm<50){
                    self.setData({
                        grade:"正常",
                    })
                }else if(list[no].charm>=50){
                    self.setData({
                        grade:"高",
                    })
                }
        self.setData({ 
            list: list, 
            hid:list[no].uid,
            nickname:list[no].nickname,
            listTrue:list[no]
        })
        console.log(self.data.hid)
    },
    //查看名片
    lookCare: function (e) {
        var self=this;
        var e = e.currentTarget.dataset
        console.log(e.uid)
        wx.navigateTo({
            url: '../namecard/namecard?uid=' + e.uid + "&user=" + e.nickname,
            success:function(){
            }
        })
    },
    //点击确认加载我选择的约会对象
    changeOk: function () {
        var self=this;
        console.log(self.data.hid)
        console.log(self.data.id)
        if(self.data.hid=="" || self.data.hid=="0"){
            wx.showToast({
                title:"请选择约会对象",
                icon: 'loading', 
                duration: 1000
            })
        }else{
            wx.request({
                url: config.SL_URL+'/index.php/Home/Engagement/accept',
                data: {
                    uid:self.data.hid,
                    eid:self.data.id,
                    token:md5.MD5(self.data.hid+self.data.id+"solianJSKASDKES")
                },
                    method: 'POST',
                    header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function(res){
                    // success
                    console.log(res)
                    wx.showToast({ title: '已成功邀请'+self.data.nickname, icon: 'loading', duration: 1000 })
                    setTimeout(() => { self.setData({ status:1,changeInfo: false, changeAgree: true, }) }, 1000)
                },
            })
        }
        
        
        //setTimeout(() => { this.setData({ status:'1', changeInfo: false, changeAgree: true, onclickOk:true}) }, 1000)
    },
    //点击取消约会
    cancelAppointment: function () {
        wx.navigateTo({
            url: '../removeAppointments/removeAppointments',
        })
    },
    onLoad: function (options) {
        var self = this;
        app.getUserInfo(app.globalData.id, this);
        self.data.uid = app.globalData.id;
        self.setData({
            id: options.id,
            fb_type:options.fb_type
        })
        console.log(self.data.uid)
        console.log(self.data.id)
        wx.request({
            url: config.SL_URL+'/index.php/Home/Engagement/user_list',
            data: {
                eid: self.data.id,
                uid:self.data.uid,
                token: md5.MD5(self.data.id + self.data.uid+"solianJSKASDKES")
            },
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                console.log(res)
                var list=res.data.data.sq_list
                var lists=list
                var ss=self.data.list
                var engagement=res.data.data.engagement;
                engagement.add_time=new Date(parseInt(engagement.add_time) * 1000).toLocaleString().substr(0,16);
                var goods=res.data.data.goods;
                if(self.data.fb_type==1){
                    self.setData({
                        changeInfo: false,
                        changeAgree: true,
                        uid:self.data.engagement.uid
                    })
                        if(engagement.uid==list.uid){
                            self.setData({
                                listTrue:list
                            })
                        }
                    console.log(engagement.uid)
                }else if(self.data.fb_type==2){
                    for(var i in list){
                        lists[i].hidden=false;
                    }
                    if(self.data.engagement.uid!="" && self.data.engagement.uid!="0"){
                        self.setData({
                            changeInfo: false,
                            changeAgree: true,
                            uid:self.data.engagement.uid
                        })
                    }
                    for(var i in ss){
                        if(self.data.engagement.uid==ss[i].uid){
                            self.setData({
                                listTrue:ss[i]
                            })
                        }
                    }
                }
                self.setData({
                    list:lists,
                    agreeNum:list.length,
                    engagement:engagement,
                    goods:goods
                })  
            }    
        })
    },
})
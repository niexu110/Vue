var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp()
Page({
    data:{
        id:'',//订单id
        uid:'',
        token:'',
        page:'',
        password:'',
        title:'',
        priceImg:config.IMG_URL+'/my_b.png',
        price:'',
        placeImg:'',
        placeName:'',
        placeWhere:'',
        placeNo:'',
        howMoney:'',
        haveSoulianB:'',
        howMoney:'',
        everyNumber:'12345678',
        iconImg:config.IMG_URL+'/success_pink.png',
        paySuccess:false
    },
    onLoad:function(options){
        var self = this
        self.data.uid=app.globalData.id;
        self.setData({
            id:options.id,
            uid:options.uid
        })

        wx.request({
            url: config.SL_URL+'/index.php/Home/Goods/group_pay',
            data: {
                id:self.data.id,//
                uid:self.data.uid,
                token:md5.MD5(self.data.id+"solianJSKASDKES")
            },
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                console.log(res)
                self.setData({
                    title:res.data.data.name,//标题
                    price:res.data.data.goodsmoney,//单价
                    placeImg:res.data.data.images,//图片
                    placeName:res.data.data.name,
                    placeWhere:res.data.data.address,//地址
                    placeNo:res.data.data.ordernumber,//订单编号
                    howMoney:res.data.data.money,//应付搜恋币
                    haveSoulianB:res.data.data.virtual,//搜恋币
                })
            }
        })
    },
    showToast:function() {
        var self=this;
        if(Number(self.data.howMoney)>Number(self.data.haveSoulianB)){
            wx.showToast({
                title:"您的余额不足，请充值",
                icon:"loading",
                duration:1500
            })
        }
    },
})
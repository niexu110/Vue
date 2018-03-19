var md5=require('../../utils/MD5.js');
var num = 0;
var sumcharm=0;
var sumgiftmoney=0;
var config=require('../../utils/config.js');
var kong
var yumoney
var app=getApp()
Page({
    data:{
        uid:'44',
        fid:'',//自己的id
        number:'',
        giftid:'',
        price:'',
        token:'',
        paySuccess:false, //赠送礼物事件
        payOk:false,//赠送成功事件
        photo:'',
        explain:config.IMG_URL+'/x_giftGive3_icon.png',
        getname:'',//昵称
        soulianbi:'',//搜恋币
        changeclick:'changeclick',
        num:num,
        img:config.IMG_URL+'/x_gift_give_icon.png',
        giftList:[],//所有礼物
        getgiftList:[],//选中礼物名称集合
        sumcharm:"",//选中礼物魅力值总和
        sumgiftmoney:"",//选中礼物搜恋币总和
    },
    onLoad:function(options) {
        var self = this
        console.log(options.myname)
        app.getUserInfo(app.globalData.id,this);
        self.setData({
            getname:options.myname,
            photo:options.src,
            uid:options.uid,
            fid:app.globalData.id
        })
        console.log(self.data.fid)
        wx.request({
            url: config.SL_URL+'/index.php/Home/Index/gift',
            data: {
                token:md5.MD5("solianJSKASDKES")
            },
            method: 'POST',
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                // success
                console.log(res)
                var list=res.data.data;
                var arr=self.data.giftList;
                arr=list;
                for(var i in list){
                    arr[i].click=false;
                    arr[i].gift_photo=list[i].gift_photo;
                    arr[i].gift_name=list[i].gift_name;
                    arr[i].gift_money=list[i].gift_money;
                    arr[i].charm="魅力值+"+list[i].gift_money;
                    arr[i].giftid=list[i].gift_id;
                    arr[i].price=list[i].gift_money;
                    if(arr[i].gift_money==0){
                        arr[i].gift_money="";
                        arr[i].charm=="免费";
                    }
                }
                self.setData({
                    giftList:arr
                })
                wx.request({
                    url: config.SL_URL+'/index.php/Home/User/money',
                    data: {
                        uid:self.data.fid,
                        token:md5.MD5(self.data.fid+"solianJSKASDKES")
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {'content-type': 'application/x-www-form-urlencoded'},
                    success: function(res){
                        console.log(res)
                        var list=res.data.data;
                        yumoney=list.virtual;
                        self.setData({
                            soulianbi:yumoney,
                        })
                        // success
                    },
                    fail: function() {
                        // fail
                    },
                    complete: function() {
                        // complete
                    }
                })
            }
        })
    },   
    onReady:function(){
    // 页面渲染完成
        var self=this;
        
     },
    //礼物明细
    giftList:function() {
        // wx.request({
        //     url: 'https://URL',
        //     data: {},
        //     method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //     // header: {}, // 设置请求的 header
        //     success: function(res){
        //         wx.navigateTo({
        //             url: 'String',
        //             success: function(res){
        //               // success
        //             }
        //         })
        //     },
        // })
    },
    giftstate:function(){
        wx.navigateTo({
          url: '../giftstate/giftstate',
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
    //去充值
    playMoney:function() {
        wx.showModal({
            title:"提示",
            content:"请前往APP体验此约会服务",
            showCancel:false,
            confirmColor:"#5793dd"
        })
        wx.navigateTo({
            url: '../searchMoney/searchMoney',
            success: function(res){
              // success
            }
        })
    },
    //点击礼物
    changeclick:function(e) {
        var self=this;
        var tt=[];//选中礼物名称集合
        var no=e.target.id
        kong=no;
        console.log(no)
        var lists=self.data.giftList;
        if(lists[no].click==true){
            lists[no].click=false
            num=0;
        }else if(lists[no].click==false){
            lists[no].click=true;
            num=1;
            tt.push(lists[no].gift_name)
            for(var i in lists){
                if(i<no || i>no){
                    lists[i].click=false;
                    self.setData({
                        giftid:lists[no].giftid,
                        price:lists[no].price
                    })
                }
            }
            
        }
        sumcharm=num*Number(lists[no].gift_money);
        sumgiftmoney=num*Number(lists[no].gift_money)
        console.log(sumgiftmoney)
        //console.log(test)
        self.setData({
           giftList:lists,
           getgiftList:tt,
           sumcharm:sumcharm,
           sumgiftmoney:sumgiftmoney,
           num:num,
        })
    },
    //点击加减
    jian:function() {
        var giftList=this.data.giftList;
        if(num>1){
            num--;
            sumcharm=num*Number(giftList[kong].gift_money);
            sumgiftmoney=num*Number(giftList[kong].gift_money)
            this.setData({
                num:num,
                sumcharm:sumcharm,
                sumgiftmoney:sumgiftmoney,
            })
        }
    },
    jia:function() {
        var giftList=this.data.giftList;
        if(num>=1){
            num++
            sumcharm=num*Number(giftList[kong].gift_money);
            sumgiftmoney=num*Number(giftList[kong].gift_money)
            this.setData({
                num:num,
                sumcharm:sumcharm,
                sumgiftmoney:sumgiftmoney,
            })
        }
    },
    //点击赠送
    recordList:function() {
        var self = this
        if(num==0){
            self.setData({
                paySuccess:false
            })
            wx.showToast({
                title:"请选择礼物",
                icon:"loading",
                duration:500
            })
        }else{
            self.setData({
                paySuccess:true
            })
        }
        
    },
    //点击确定（赠送页面的确定）
    back:function() {
        var self = this
        console.log(self.data.fid)
        console.log(num)
        console.log(self.data.giftid)
        console.log(self.data.uid)
        if(sumgiftmoney>self.data.soulianbi){
            wx.showToast({
                title:"您的搜恋币不足，请充值",
                icon:"loading",
                duration:1500,
            })
            self.setData({
                payOk:false,
                paySuccess:false
            }) 
        }else{
            wx.request({
              url: config.SL_URL+'/index.php/Home/User/gifts',
              data: {
                  uid:self.data.fid,//自己的id
                  s_uid:self.data.uid,//接受礼物人员的id
                  number:num,
                  giftid:self.data.giftid,
                  price:self.data.price,
                  token:md5.MD5(self.data.fid+self.data.uid+num+self.data.giftid+"solianJSKASDKES")
              },
              method: 'POST',
              header: {'content-type': 'application/x-www-form-urlencoded'},
              success: function(res){
                // success
                console.log(res)
              },
            })
            yumoney=self.data.soulianbi-sumgiftmoney
            self.setData({
                payOk:true,
                paySuccess:false,
                soulianbi:yumoney,
            })  
        }
             
    },
    //点击确定（赠送成功页面的确定）
    givingOk:function() {
        var self = this
        self.setData({
            //没有成功之后的跳转页面，暂时将事件设置为赠送礼物当前页面
            payOk:false,
        })       
    },
    //点击取消
    myOrder:function() {
        var self = this
        self.setData({
            paySuccess:false
        })
    },
    
})

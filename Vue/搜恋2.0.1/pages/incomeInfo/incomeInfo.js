var md5=require('../../utils/MD5.js');
var util = require('../../utils/util.js')
var app = getApp();
Page({
    data:{
        uid:'89',
        token:'',
        page:'',
        phopo1:'http://img.qinyikou.cc/icons/x_income_icon.png',
        phopo2:'http://img.qinyikou.cc/icons/x_getMoney_icon.png',        
        incomeInfoList:[]
    },
    onLoad:function() {
        var self = this
        app.getUserInfo(app.globalData.id, this);
        self.data.uid = app.globalData.id;
        wx.request({
            url: 'https://m.qinyikou.cc/index.php/Home/User/earn',
            data: {
                uid:self.data.uid,
                page:self.data.page,
                token:md5.MD5(self.data.uid+"solianJSKASDKES")
            },
            method: 'POST', 
            header: { 'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                var list = res.data.data
                for(var k in list) {
                    list[k].times =new Date(parseInt(list[k].times) * 1000).toLocaleString().substr(0,10)
                } 
                self.setData({
                    incomeInfoList:list
                })            

            }
        })
    }
})
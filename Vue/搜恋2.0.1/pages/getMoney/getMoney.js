var md5=require('../../utils/MD5.js');
Page({
    data:{
        uid:'89',
        token:'',
        phopo1:'http://img.qinyikou.cc/icons/x_getMoney_icon.png',
        phopo2:'http://img.qinyikou.cc/icons/x_getMoney_icon.png',
        getMoneyList:[
            // {
            // id:1,
            // date:'2017-01',
            // sum:'1000',
            // income:'40.00',           
            // anchor:'getMoneyFun',
            // },
            // {
            // id:1,
            // date:'2017-01',
            // sum:'1000',
            // income:'40.00',           
            // anchor:'getMoneyFun',
            // }
        ]
    },
    onReady:function() {
        var self=this;
        wx.getStorage({
            key: 'data',
            success: function(res){
                // success
                console.log(res);
                self.setData({
                    getMoneyList:res.data.Object,
                    // count:res.data.count+".00",
                    // redInfo:res.data.k_money+".00",
                    // gainsInfo:res.data.c_money+".00",
                })
            }
        })   
    }
})
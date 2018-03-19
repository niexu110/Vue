var md5 = require('../../utils/MD5.js');
var app = getApp();
Page({
    data: {
        uid: '',
        token: '',
        count: '',
        page: '',
        gainsInfo: '',
        redInfo: '',
        withdrow: '提现',
        imgRight: 'http://img.qinyikou.cc/icons/n_my_user_right.png',
        settlement: '结算说明',
        explain: '1.每接收1000搜恋币的礼物，可提现40元人民币到搜恋钱包作为收益。 \n 2.每日提取上限不得超过100元，每月提取上限不得超过800元，超出 \n 分要下个月才可提取,单次提取不得少于10元。 \n 3.总收益要扣除20%做为劳务报酬个人所得税。',
        userContent: [],
        msg: [{
            text: '收益明细',
            titleImg: 'http://img.qinyikou.cc/icons/x_gift_icon.png',
            anchor: 'information'
        },
        // {
        //     text: '提现记录',
        //     titleImg: 'http://img.qinyikou.cc/icons/x_jilu_icon.png',
        //     anchor: 'record'
        // }
        ],
        other: [{
            anchor: 'money'
        }]
    },
    //收益明细跳转
    information: function () {
        wx.navigateTo({
            url: '../incomeInfo/incomeInfo',
        })
    },
    //提现记录跳转
    record: function () {
        wx.navigateTo({
            url: '../getMoney/getMoney',
        })
    },
    money: function () {
        wx.showActionSheet({
            itemList: ['确定提现'],
            success: (res) => {
                console.log('success');
            }
        });
    },
    onLoad: function () {
        var self = this;
        app.getUserInfo(app.globalData.id, this);
        console.log(app.globalData.id);
        self.data.uid = app.globalData.id;
        var md = {
            uid: self.data.uid,
            token: md5.MD5(self.data.uid + "solianJSKASDKES")
        }
        wx.request({
            url: 'https://m.qinyikou.cc/index.php/Home/User/earnings',
            data: md,
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            success: function (res) {
                var list = res.data.data
                self.setData({
                    count: list.count + '.00',
                    gainsInfo: list.k_money + '.00',
                    redInfo: list.c_money + '.00',
                })
            }
        })
    }
})
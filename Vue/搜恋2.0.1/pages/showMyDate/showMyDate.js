// pages/showMyDate/showMyDate.js
var md5=require('../../utils/MD5.js');
var app = getApp()
var list;
var count=[];
Page({
    data:{
        order_id:'1',
        uid:'50',
        token:'',
        type:2,
        uploadPhoto:'http://www.qqleju.com/uploads/allimg/150824/24-022452_968.jpg',
        placeImg:'http://file06.16sucai.com/2016/0421/55327507e889682c3e13631c78b5d094.jpg',
        placeName:'曼妙妈妈餐厅',
        gpsImg:'http://img.qinyikou.cc/icons/x_located_icon.png',
        location:'西安市高新一路东南角',
        money:'1880',
        stars: [0, 1, 2, 3, 4],
        normalSrc: 'http://img.qinyikou.cc/icons/star_05.gif',
        selectedSrc: 'http://img.qinyikou.cc/icons/star_03.gif',
        key: 0,//评分
        uploadimgs:[], //上传图片列表
        editable: false ,//是否可编辑
        //tempFilePaths:[],
 
    },
    //点击进行星级评价
    selectRight: function (e) {
        var key = e.currentTarget.dataset.key
        if (this.data.key == 1 && e.currentTarget.dataset.key == 1) {
            //只有一颗星的时候,再次点击,变为0颗
            key = 0;
        }
        console.log("得" + key + "分")
        this.setData({
          key: key
        })
    },
    //点击上传图片
    chooseImage:function(type){
        var _this = this;
        wx.chooseImage({
            count: 6, // 最多可以选择的图片张数，默认9
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function(res){
                var lists = res.tempFilePaths
                for(var k in lists){
                    if(lists.length<6){
                        count.push(lists[k])
                    }
                    else{
                        break;
                    }
                } 
                _this.setData({
                    uploadimgs:count,
                    image:count
                })
                wx.request({
                    url: 'https://m.qinyikou.cc/index.php/Home/Article/myimages',
                    data: {
                        uid:_this.data.uid,
                        image:_this.data.image,
                        token:md5.MD5(_this.data.uid+"solianJSKASDKES")
                    },
                    method: 'POST', 
                    header: { 'content-type': 'application/x-www-form-urlencoded'},
                    success: function(res){
                        // success
                        console.log(res)
                        // wx.uploadFile({
                        //     url: 'http://img.qinyikou.cc/Public/',
                        //     filePath:lists[0],
                        //     name:'file',
                        //     header: { 'content-type': 'application/x-www-form-urlencoded'},
                        //     formData: { 'user': 'test' },
                        //     success: function(res){
                        //         // success
                        //         console.log(res.data)
                        //     }
                        // })
                    }
                })
            }
        })
    },
    editImage:function(){
        this.setData({
            editable: !this.data.editable
        })
    },
    //删除图片
    deleteImg:function(e){
        var self=this;
        var id=e.target.id;
        spliceStr(id,count)
        function spliceStr(num,obj){
            obj.splice(num,1)
            self.setData({
                uploadimgs:count
            })
        }
    },
    formSubmit: function(e) {
        var self=this;
        var value =  e.detail.value;
         wx.request({
            url: 'https://m.qinyikou.cc/Home/Engagement/shaidan',
            data: {
                    uid:self.data.uid,
                    order_id:self.data.id,
                    content:value,
                    xingxing:self.data.key,
                    pic:self.data.image,
                    type:self.data.type,
                    token:md5.MD5(self.data.uid+self.data.type+self.data.order_id+"solianJSKASDKES"),
            },
            method: 'POST', 
            header: {'content-type': 'application/x-www-form-urlencoded'},
            success: function(res){
                // success
                console.log(res)
                 wx.showToast({
                 title: '发布成功',
                 icon: 'success',
                 duration: 2000
               })
            }
        })
       
    },
    onLoad:function(options){  
       
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
    }
})
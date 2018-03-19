// pages/addFriend/addFriend.js
var md5=require('../../utils/MD5.js');
var config=require('../../utils/config.js');
var app=getApp();
Page({
    data:{
        uid:'',
        token:'',
        status:'1',
        bboy:config.IMG_URL+'/icons/x_boy.png',
        ggirl:config.IMG_URL+'/x_girl.png',
        lists:[],
        img1:config.IMG_URL+"/x_girlglamour_icon.png",
        img2:config.IMG_URL+"/x_boyglamour_icon.png"
    },
    look:function(){
      wx.navigateTo({
        url: '../mynamecard/mynamecard',
      })
    },
    //点击接受
    acceptFriend:function(e){
       var self=this;
       var num=e.target.id;
       var all2=self.data.lists
          wx.request({
          url:config.SL_URL+"/index.php/Home/User/consent",
          data:{
              uid:self.data.uid,
              f_uid:e.currentTarget.dataset.uid,
              status:self.data.status,
              token:md5.MD5(self.data.uid+e.currentTarget.dataset.uid+"solianJSKASDKES")
          },
          header:{'content-type':'application/x-www-form-urlencoded'},
          method:"POST",
          success:function(res){
            if(res.data.code==404){
               wx.showToast({
                  title: '添加失败请稍后再试',
                  icon: 'loading',
                  duration: 2000
                })
            }else if(res.data.code==303){
                 wx.showToast({
                  title: '添加失败请稍后再试',
                  icon: 'loading',
                  duration: 2000
                })
            }else if(res.data.code==200){
           factiy(num);
           function factiy(num){
             all2[num].btn="已接受"
             all2[num].className="btns"
             }
            self.setData({
               lists:all2
             })
               wx.showToast({
                   title: "添加成功",
                   icon: 'ssuccess',
                   duration: 2000
                })
           } 
         }
      })
    },
    onLoad:function(){
      var self=this;
          self.data.uid=app.globalData.id;
          app.getUserInfo(app.globalData.id,this);
          wx.request({
            url: config.SL_URL+'/index.php/Home/User/myfire',
            data: {
              uid:self.data.uid,
              token:md5.MD5(self.data.uid+"solianJSKASDKES")
            },
            method: 'POST', 
            header: {'content-type':'application/x-www-form-urlencoded'}, 
            success: function(res){
              // success
              var list=res.data.data;
              for(var k in list){
                list[k].btn='接受'
                list[k].className='btn'
              }
              self.setData({
                lists:list
              })
            }
          }) 
         
    },
    onReady:function(){
    },
    onShow:function(){
      // 页面显示
    },
    onHide:function(){
      // 页面隐藏
    },
    onUnload:function(){
      // 页面关闭
    },
})

      
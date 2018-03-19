// pages/basic/basic.js
var md5=require('../../utils/MD5.js');
var app=getApp();
var config=require('../../utils/config.js');
const weights=[];
var city=[]; 
var height=[],count;
 var list=[];
 var arr=[];
for(let i=150;i<210;i++){
  height.push(i)
}
for(let i=40;i<80;i++){
  weights.push(i);
}
Page({
  data:{
     zhankai:config.IMG_URL+'/n_down.png',
     updown:config.IMG_URL+'/n_updown.png',
     uid:'',token:'',textarea:'',openImg:'',shenfen:'',
     img:config.IMG_URL+'/n_my_user_right.png',date:'',
     userImg:config.IMG_URL+'/x_upload_img.jpg',val:'',image:'',faith:[],volk:[],provinces:[],citys:[], province:0,city:0,       txts:'',
     txt:'',constellation:'',status:[],loding:[],car:[],vocation:[], heights:height,
     weights:weights,array:[],dataImage:{},
     index:"",index2:0,index3:0,index4:0,index5:0,index6:0,index7:0,index8:0,index9:0,index10:0,
     images:[],
  },
  //图像修改
  imgurl:function(){
     var self=this;
     var img;
      wx.showModal({
        title:"提示",
        content:"请前往APP上传头像",
        showCancel:false,
        confirmColor:"#5793dd"
    })
    //  var url='https://m.qinyikou.cc/index.php/Home/Article/images';
    //  var formData={
    //          uid:self.data.uid,
    //          token:md5.MD5(self.data.uid+'solianJSKASDKES')
    //      }
    //  wx.chooseImage({
    //    count: 1, 
    //    sizeType: ['original', 'compressed'], 
    //    sourceType: ['album', 'camera'], 
    //    success: function(res){
    //      // success
    //      img=res.tempFilePaths[0]
    //      app.upload_file(url,img,'image',formData)
    //       self.setData({
    //          userImg:img
    //      })
    //    }
    //  })
  },
  //上传相册照片
  upload:function(){
    var self=this;
    var url=config.SL_URL+'/Home/Article/myimages'
    var object={
        uid:self.data.uid,
        token:md5.MD5(self.data.uid+"solianJSKASDKES"),
      }
    var img;
    if(list.length<11){
     wx.chooseImage({
      count:1, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'], 
      success: function(res){
        var lists = res.tempFilePaths
        for(var k in lists){
        if(list.length<11){
          list.push(lists[k])
         }else{
           break;
         }
      } 
        for(var i=0;i<lists.length;i++){
           img=lists[i];
           app.upload_file(url,img,'image',object)
        }
       self.setData({
          images:list,
          image:list,
          openImg:'openImg'
        })
      }
    })
    }else{
       wx.showToast({
           title: '相册只能上传11张',
           icon: 'loading',
           duration: 2000
       })
    }
  },
  //所有选择事件
   Change2:function(e){this.setData({index2:e.detail.value,})},
   Change3:function(e){this.setData({index3:e.detail.value})},
   Change4:function(e){this.setData({index4:e.detail.value})},
   Change5:function(e){this.setData({index5:e.detail.value})},
   Change6:function(e){this.setData({index6:e.detail.value})},
   Change7:function(e){this.setData({index7:e.detail.value})},
   Change8:function(e){this.setData({index8:e.detail.value})},
   Change9:function(e){this.setData({index9:e.detail.value})},
   Change10:function(e){this.setData({index10:e.detail.value})},
  onLoad:function(){
     // 页面初始化 options为页面跳转所带来的参数
  },
  provinceChange:function(e){
    var val=e.detail.value;
    var list=[];
    var self=this;
     self.setData({
      province:val
    })
    arr(val,city);
    function arr(num,obj){
      for(var k in obj[num]){
        list.push(obj[num][k].region_name);
      }
       self.setData({
         citys:list
       })
    }
  },
  cityChange:function(e){
    this.setData({
      city:e.detail.value
    }) 
   },
  onReady:function(){
        // 页面渲染完成  
        var arr=[],arr2=[],arr3=[],arr4=[],
            arr5=[],arr7=[],arr8=[];
        var obj=this.data.belief,
            obj2=this.data.job,obj3=this.data.house,
            obj4=this.data.marry,obj5=this.data.nation,
            obj7=this.data.cars,obj8=this.data.income;                  
         for(var i in obj){arr.push(obj[i]); }
         for(var b in obj2){arr2.push(obj2[b])}
         for(var c in obj3){arr3.push(obj3[c])}
         for(var d in obj4){arr4.push(obj4[d])}
         for(var e in obj5){arr5.push(obj5[e])}
         for(var g in obj7){ arr7.push(obj7[g])}
         for(var h in obj8){arr8.push(obj8[h])}
         this.setData({
          faith:arr,
          vocation:arr2,
          loding:arr3,
          status:arr4,
          volk:arr5,
          car:arr7,
          array:arr8
        });    
  },
    //展开收起
  openImg:function(){
    var self=this;
    if(self.data.txts==1){
     self.setData({
       txt:'展开',
       txts:2,
       images:arr
     })
     }else if(self.data.txts==2){
       self.setData({
       txt:'收起',txts:1,
       images:list
     })
    }
  },
    clickImg:function(e){
    var self=this;
    var images=self.data.images;
    wx.previewImage({
      current: images[e.currentTarget.id], // 当前显示图片的http链接
      urls: images // 需要预览的图片http链接列表
    })
  },
  onShow:function(){
       // 页面显示 
        var self=this;
    self.data.uid=app.globalData.id;
    app.getUserInfo(app.globalData.id,this);
    var mm={
        uid:this.data.uid,
        token:md5.MD5(this.data.uid+"solianJSKASDKES")
      };
       wx.request({
      url: config.SL_URL+'/index.php/Home/User/userdetail',
      data: mm,
      method: 'POST', 
      header: {
       'content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        var str=[];
        var listImg=res.data.data.data.xiangce;
        for(var k in listImg){
          str.push(listImg[k].images);
        }
        if(str.length<3){
          arr=str;
          list=str;
           self.setData({
           images:arr,
          })
        }else{
          list=str;
         arr=str.slice(0,3)
         self.setData({
           images:arr,
           openImg:'openImg',
           txt:'展开',txts:2,
          })
        }
        self.setData({
          userImg:res.data.data.data.image,
          val:res.data.data.data.nickname,
          val1:res.data.data.data.marry,
          val2:res.data.data.data.height,
          val3:res.data.data.data.weight,
          val4:res.data.data.data.house,
          val5:res.data.data.data.cars,
          val6:res.data.data.data.job,
          val7:res.data.data.data.income,
          val8:res.data.data.data.nation,
          val9:res.data.data.data.belief,
          textarea:res.data.data.data.myideal,
          index:res.data.data.data.sex,
          belief:res.data.data.belief,
          date:new Date(parseInt(res.data.data.data.birthday) * 1000).toLocaleString().substr(0,9).replace('/','-').replace('/','-'),
          constellation:res.data.data.data.constellation,
          job:res.data.data.job,
          house:res.data.data.house,
          marry:res.data.data.marry,
          nation:res.data.data.nation,
          cars:res.data.data.cars,
          income:res.data.data.income
        });
      },   
    })
      wx.request({
      url: config.SL_URL+'/index.php/Home/index/region',
      method: 'POST', 
      header: {
       'content-type':'application/x-www-form-urlencoded'
      },
      success: function(res){
        var list=res.data.data;
        var arr=[];
        for(var k in list){
          arr.push(list[k].region_name)
          city.push(list[k].citys)
        } 
        self.setData({
          provinces:arr,
        })
      },   
    })
    this.setData({
      images:list
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  //表单提交
 formSubmit:function(e){
   e.detail.value.status=parseInt(this.data.index2)+1;
   e.detail.value.heights=this.data.heights[this.data.index3]+'CM';
   e.detail.value.weights=this.data.weights[this.data.index4]+'KG';
   e.detail.value.loding=parseInt(this.data.index5)+1;
   e.detail.value.array=parseInt(this.data.index6)+1;
   e.detail.value.car=parseInt(this.data.index7);
   e.detail.value.vocation=parseInt(this.data.index8)+1;
   e.detail.value.nation=parseInt(this.data.index9)+2;
   e.detail.value.faith=parseInt(this.data.index10)+2;
   e.detail.value.provinces=this.data.provinces[this.data.province];
   e.detail.value.citys=this.data.citys[this.data.city];
   var count=e.detail.value;
   var self=this;
     wx.request({
       url: config.SL_URL+'/index.php/Home/User/updatelist',
       data: {
         uid:self.data.uid,
         token:md5.MD5(self.data.uid+'solianJSKASDKES'),
         nickname:count.nickname,
         height:count.heights,
         weight:count.weights,
         house:count.loding,
         income:count.array,
         cars:count.car,
         belief:count.faith,
         marry:count.status,
         myideal:count.textarea,
         citys:count.provinces+'-'+count.citys,
         job:count.vocation,
         nation:count.nation
       },
       method: 'POST',
       header: {
         'content-type':'application/x-www-form-urlencoded'
       },
       success: function(res){
         // success
        if(res.data.code==404){
                wx.showToast({
                  title: '修改失败',
                  icon: 'loading',
                  duration: 2000
                })
           }else if(res.data.code==200){
                   wx.showToast({
                  title: '修改成功',
                  icon: 'success',
                  duration: 2000
             })
             setTimeout(function(){
                  wx.navigateBack({
               delta: 1, // 回退前 delta(默认为1) 页面
             })
             },2500)
           }
        }
     })
  },
})
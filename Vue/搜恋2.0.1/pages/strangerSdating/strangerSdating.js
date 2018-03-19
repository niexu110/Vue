var t=1000,miao=60,fen=38,shi='0'+6;
Page({
  data:{
     sex:'2',
     age:'22',
     text:'来场意想不到的的约会',
     girl:'http://img.qinyikou.cc/icons/x_girls.png',
     boy:'http://img.qinyikou.cc/icons/x_boys.png',
     nickname:'火凤凰',
     Class:'foot_titles',
     Class1:'foot_title',
     image:'http://www.ld12.com/upimg358/allimg/c150131/1422E2I202050-6264I.png',
     images:'http://n1.itc.cn/img8/wb/recom/2016/09/14/147384511248851014.PNG',
     people:'男女不限',
     shuttle:'负责接送',
     date_time:'2017年1月26日18时',
     site:'平壤银牌店(高新路)',
     affair:'取消约会',
     num:'3',
     date:'2016.12.12 08:12',
     bind:'remove',
     hour:'',
     min:'',
     sec:'',
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var self=this;
    var timer=setInterval(timers,t)
    function timers(){
      if(miao>0||fen>0||shi>0){
       miao--;
        if(miao<10){
          miao='0'+miao
         if(miao==0&fen>0){
             miao=59;
             fen--;
           if(fen<10){
              fen="0"+fen;
            if(fen==0&shi>0){
               fen=59;
               shi--;
            }
            else if(fen==0&shi==0){
                miao=59;
              } 
            }
         }
       }
        self.setData({
          hour:shi,
          min:fen,
          sec:miao,
          bind:'remove'
        })
      }else{
       clearInterval(timer);
       self.setData({
         affair:'约会进行',
          hour:'00',
          min:'00',
          sec:'00',
          bind:'alert'
       })
      }
    }
  },
  remove:function(){
    wx.navigateTo({
      url: '../removeAppointments/removeAppointments',
    })
  },
  alert:function(){
     wx.showModal({
    title: '提示',
    content: '约会已开始不能取消!!!',
    success: function(res) {
       console.log(res)
     }
   })
  },
  //查看服务详情
  look:function(){

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
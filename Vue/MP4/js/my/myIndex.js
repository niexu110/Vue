$(function () {
     $('.closed').click(function(){
          var type=$(this).attr('title');
          if(type==0){
               $('#btns').removeClass('open').addClass('close'); 
               $('#btns2').removeClass('open1').addClass('close1');
               $(this).attr('title','1');
               // 发送ajax关闭单身 _ajax.get('url','data',function(res){})
               
          }else{
               $('#btns').removeClass('close').addClass('open');
               $('#btns2').removeClass('close1').addClass('open1');
               $('.pop').fadeIn(200) 
               $(this).attr('title','0');
               // 发送ajax打开单身 _ajax.get('url','data',function(res){})
          }
     })
     $('.pop-box p').click(()=>$('.pop').fadeOut(200))
     $("#upLoad").change(function (e) {
          e.stopPropagation();
          var imgFile = new FileReader();
          imgFile.readAsDataURL(this.files[0]);
          imgFile.onload = function () {
               var src = this.result; //base64数据
               var html = "<img src=" + src + ">";
               $(".album-list").prepend(html);
               hint('上传成功',2000)
          }
     });
})
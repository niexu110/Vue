$(function(){
     var silder = $(".silder-item"), pull = $(".pullUp"), 
         silderMeus = $('.slider-meus span'),H = Number(pull.height());
         len = $('.silder-item a').length,
        clientH = Number(document.documentElement.clientHeight);
         index = 0, isOpen = true, page = 0;
     setInterval(function () {
          if (index>2) {
               index = 0;
               silderMeus.removeClass('active');
               silderMeus.eq(index).addClass('active');
               silder.css("margin-left", 0);
          } else {
               silderMeus.removeClass('active');
               silderMeus.eq(index).addClass('active');
               silder.css("margin-left", -(index * 6.9)+'rem');
               index++;
          }
     }, 2000)
     // 加载更多..
     $(document).on('scroll', function () {
          if (isOpen) {
               var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
               var H5Top = parseInt(pull.offset().top + H);
               if (docH > H5Top - 150) {
                    isOpen = false;
                    pull.html("数据加载中...");
                    // ajax调取方法，get和post
                   _ajax.get('接口名字','参数',function(res){
                        console.log(123)
                   })
                   _ajax.post()

               }
          }
     })
})
/**
 * Created by Administrator on 2017/4/17.
 */
var m_uid=localStorage.getItem("uid");
var uid=null;
var live=null;
var page=0;
$(function(){
    var URL = document.location.toString();
    uid = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
    addUserList(m_uid,uid,page,1);

});
function addUserList(m_uid,uid,page,selects){
    if(selects==1){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/home/article/person_coindition",
            data:{ page:page, uid:uid, m_uid:m_uid},
            success:function(res){
                var userList=res.data.info;  live=userList.like;  var list=res.data.condition;
                userList.sex==1?(userList.sexImg="../../img/n_boys.png",userList.class="user_title_contents")
                    :(userList.sexImg="../../img/n_girl.png",userList.class="user_title_content");
                userList.marry==1?userList.marrys="单身" 
                :(userList.marry==2?userList.marrys="已婚" 
                    :(userList.marry==3?userList.marrys="情侣"
                        :(userList.marry==4?userList.marrys="离异":userList.marrys="未知")))
                userList.like==0?userList.likeImg="../../img/n_Jgz.png":userList.likeImg="../../img/n_Ygz.png";
                $(".top_nav span").text(userList.nickname);
                $(".dynamic_backImg").attr("src",userList.image);
                $(".dynamic_user_box").append("<img src="+userList.likeImg+" class='userLove'>"+
                "<img src="+userList.image+" class='userImg'><div class="+userList.class+">"+
                "<span class='sl_span'><img src="+userList.sexImg+"><em>"+userList.age+"</em></span>"+
                "<span class='sl_span1'>"+userList.constellation+"</span><span class='sl_span2'>"+userList.marrys+"</span></div>")
                if(list.length==0){
                    $(".dynamic_mian_box ul").append("<li class='liStop'>暂无任何动态...</li>");
                }else{
                $.each(list,function(i,k){
                    var img="";  k.dtime=getObjTime(k.dtime); k.time=getObjTime(k.time);
                    if(k.dtime.yue==k.time.yue&&k.dtime.ri==k.time.ri&&k.dtime.hour==k.time.hour){
                        k.time.yue="";k.time.ri="今天";k.time.times=(k.dtime.min-k.time.min)+"分钟前"}
                    (k.dtime.yue==k.time.yue&&k.dtime.ri==k.time.ri)? ( k.time.yue="",k.time.ri="今天",k.time.times=(k.dtime.hour-k.time.hour)+"小时前")
                        :(k.time.yue=k.time.yue,k.time.ri=k.time.ri,k.time.times=k.time.times);
                    k.like==0?k.loveImg="../../img/n_Slove.png":k.loveImg="../../img/n_Sloves.png";
                    k.images.length==0?k.imgClass="imgList0":(k.images.length==1?k.imgClass="imgList"
                        :(k.images.length==4?k.imgClass="imgLists":k.imgClass="imgList2"));
                    for(var j=0;j<k.images.length;j++){
                        if(k.images.length==0){return img;} else{img+="<img alt="+k.images[j]+" src="+k.images[j]+"/photos>"}}
                    var html="<li class='dynamic_user_item' title="+k.id+"><h1 class='Item_timer'>"+
                        "<span>"+k.time.ri+"</span><em>"+k.time.times+"</em><b class='Item_month'>"+k.time.yue+"</b></h1>" +
                        "<div class='Item_container'><p class='Item_loveText'>"+k.title+"</p>"+
                        "<div class="+k.imgClass+" id='ImgList'>"+img+"</div><h2 class='Item_address'>"+k.address+"</h2>"+
                        "<div class='Item_kind'><span class='Sp'>"+k.give+"点赞</span><span>"+k.read+"阅读</span><span>"+k.comment+"评论</span>"+
                        "<div class='Item_click'><img class='pull-left Item_clickLove' name="+k.give+" src="+k.loveImg+" alt="+k.id+" title="+k.like+">"+
                        "<img src='../../img/n_pl.png' class='pull-right Item_clickPL'  alt="+k.id+"></div></div></div></li>";
                    $(".dynamic_mian_box ul").append(html);
                   });
                $(".userLove").click(function(){
                  if(live==0){
                      $.ajax({
                          type:"POST",
                          url:d_http+'index.php/Home/User/xilist',
                          data:{
                              uid:m_uid,
                              d_uid:uid,
                              token:MD5(m_uid+uid+SL)
                          },
                          success:function(res){
                              $(".userLove").attr("src","../../img/n_Ygz.png")
                              live=1;
                          }
                      })
                  }else if(live==1){
                      $.ajax({
                          type:"POST",
                          url:d_http+'index.php/Home/User/xilist',
                          data:{
                              uid:m_uid,
                              d_uid:uid,
                              token:MD5(m_uid+uid+SL)
                          },
                          success:function(res){
                              $(".userLove").attr("src","../../img/n_Jgz.png")
                              live=0;
                          }
                      })
                   }
                });
                $(".Item_clickLove").on("click",function(e){
                     e.stopPropagation();
                     $(this).parent().siblings(".Sp");  var number=parseInt($(this).attr("name"));
                    var love=$(this).attr("title");    var num=$(this).attr("alt");
                    if(m_uid==null){
                        localStorage.setItem("url",window.location.href);
                        location.href="../../src/login/login.html";
                    }else {
                        addDianzan(m_uid, num, love, $(this), $(this).parent().siblings(".Sp"), number);
                    }
                });
                $(".Item_clickPL") .on("click",function(){
                    var num=$(this).attr("alt");
                    location.href="state.html?id="+num;
                });
                $(".dynamic_user_item").on("click",function(){
                    var num=$(this).attr("title");
                    location.href="state.html?id="+num;
                })
                //大图查看
                    var imgSrc=[];
                    var lens,indexs;
                    var colse=true;
                    $('#ImgList img').on('click',function(event){
                        event.stopPropagation();
                        var startX=0;
                        var $w=$('.showImg').width();   
                        $('.mask').show();
                        $('.showImg').show();
                        lens=$(this).parent().find('img').length;
                        indexs=$(this).index();
                        $(this).parent().find('img').each(function(){
                            imgSrc.push($(this).attr('alt'));
                        });
                        $('.showImg ul').width(imgSrc.length*$w).css('left',-indexs*$w);
                          for(var i=0;i<lens;i++){
                                $('.showImg>ul').append("<li><img src="+imgSrc[i]+"></li>");
                            }
                        $('.showImg ul').on('touchstart',function(event){
                            var touch = event.originalEvent.changedTouches[0];
                            startX=touch.pageX;
                        });
                        $('.showImg ul').on('touchend',function(event){
                            var touch = event.originalEvent.changedTouches[0];
                            endX=touch.pageX;
                            var left=$('.showImg ul').position().left; 
                            if(endX>startX){
                                if(indexs==0){
                                    indexs=0;
                                    $('.showImg ul').css({'left':0})
                                }else{
                                    if(colse){
                                        colse=false;
                                        $('.showImg ul').animate({'left':left+$w},800,function(){
                                            left=$('.showImg ul').position().left;
                                            colse=true;
                                            if(indexs==0){
                                                indexs=0;
                                                $('.showImg ul').css({'left':0})
                                            }else{
                                                indexs--;
                                            }
                                        });
                                    }
                                }   
                            }
                            if(endX<startX){
                                if(indexs==lens-1){
                                    indexs=lens-1;
                                    $('.showImg ul').css({'left':-(lens-1)*$w});
                                }else{
                                    if(colse){
                                        colse=false;
                                        $('.showImg ul').stop().animate({'left':left-$w},800,function(){
                                            left=$('.showImg ul').position().left;
                                            colse=true;
                                            if(indexs==lens-1){
                                                indexs=lens-1;
                                                $('.showImg ul').css({'left':-(lens-1)*$w});
                                            }else{
                                                indexs++;
                                            }
                                        });
                                    }
                                }   
                            }
                        });
                    });
                    // 隐藏展示区域
                    $('.showImg ul li').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px'); 
                        imgSrc=[];
                        len=0;
                    }); 
                    $('.showImg').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px'); 
                        imgSrc=[];
                        len=0;
                    }); 
                    $('.mask').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px');
                        imgSrc=[]; 
                        len=0;
                    }); 



                //加载更多
                var  isOpen=true;
                var clientH = Number(document.documentElement.clientHeight);
                var H=Number($("#pullUp").height());
                $(document).on('scroll',function(){
                    if(isOpen){
                        var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
                        var H5Top=parseInt($('#pullUp').offset().top+H);
                        if(docH>H5Top-150){
                            isOpen=false;   page++;
                            $("#pullUp").html("数据加载中......").css("color","#5793dd");
                            addUserList(m_uid,uid,page,2);
                        }
                    }
                 })
              }
            }
        })
    } else if(selects==2){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/home/article/person_coindition",
            data:{ page:page,  uid:uid, m_uid:m_uid },
            success:function(res){
                var list=res.data.condition;
                if(list.length==0){
                    isOpen=false;
                    $("#pullUp").html("没有更多数据...").css("color","#5793dd");
                    $("#pullUp").fadeOut(3000)
                }else{
                $.each(list,function(i,k){
                    var img="";  k.dtime=getObjTime(k.dtime);  k.time=getObjTime(k.time);
                    if(k.dtime.yue==k.time.yue&&k.dtime.ri==k.time.ri&&k.dtime.hour==k.time.hour){
                        k.time.yue="";k.time.ri="今天";k.time.times=(k.dtime.min-k.time.min)+"分钟前"}
                    (k.dtime.yue==k.time.yue&&k.dtime.ri==k.time.ri)? ( k.time.yue="",k.time.ri="今天",k.time.times=(k.dtime.hour-k.time.hour)+"小时前")
                        :(k.time.yue=k.time.yue,k.time.ri=k.time.ri,k.time.times=k.time.times);
                    k.like==0?k.loveImg="../../img/n_Slove.png":k.loveImg="../../img/n_Sloves.png";
                    k.images.length==0?k.imgClass="imgList0":(k.images.length==1?k.imgClass="imgList"
                        :(k.images.length==4?k.imgClass="imgLists":k.imgClass="imgList2"));
                    for(var j=0;j<k.images.length;j++){
                        if(k.images.length==0){return img;} else{img+="<img alt="+k.images[j]+" src="+k.images[j]+"/photos>"}}
                    var html="<li class='dynamic_user_item' title="+k.id+"><h1 class='Item_timer'>"+
                        "<span>"+k.time.ri+"</span><em>"+k.time.times+"</em><b class='Item_month'>"+k.time.yue+"</b></h1>" +
                        "<div class='Item_container'><p class='Item_loveText'>"+k.title+"</p>"+
                        "<div class="+k.imgClass+" id='ImgList'>"+img+"</div><h2 class='Item_address'>"+k.address+"</h2>"+
                        "<div class='Item_kind'><span class='Sp'>"+k.give+"点赞</span><span>"+k.read+"阅读</span><span>"+k.comment+"评论</span>"+
                        "<div class='Item_click'><img class='pull-left Item_clickLove' name="+k.give+" src="+k.loveImg+" alt="+k.id+" title="+k.like+">"+
                        "<img src='../../img/n_pl.png' class='pull-right Item_clickPL' alt="+k.id+"></div></div></div></li>";
                    $(".dynamic_mian_box ul").append(html);
                })
                isOpen=true;
                $("#pullUp").html("加载完毕...").css("color","#5793dd");
                setTimeout(function(){$("#pullUp").html("");},2000);
                $(".userLove").click(function(){
                    if(live==0){
                        $.ajax({
                            type:"POST",
                            url:d_http+'index.php/Home/User/xilist',
                            data:{
                                uid:m_uid,
                                d_uid:uid,
                                token:MD5(m_uid+uid+SL)
                            },
                            success:function(res){
                                $(".userLove").attr("src","../../img/n_Ygz.png")
                                live=1;
                            }
                        })
                    }else if(live==1){
                        $.ajax({
                            type:"POST",
                            url:d_http+'index.php/Home/User/xilist',
                            data:{
                                uid:m_uid,
                                d_uid:uid,
                                token:MD5(m_uid+uid+SL)
                            },
                            success:function(res){
                                $(".userLove").attr("src","../../img/n_Jgz.png")
                                live=0;
                            }
                        })
                    }
                });
                $(".Item_clickLove").on("click",function(e){
                    e.stopPropagation();
                    $(this).parent().siblings(".Sp");  var number=parseInt($(this).attr("name"));
                    var love=$(this).attr("title");   var num=$(this).attr("alt");
                    if(m_uid==null){
                        localStorage.setItem("url",window.location.href);
                        location.href="../../src/login/login.html";
                    }else {
                        addDianzan(m_uid, num, love, $(this), $(this).parent().siblings(".Sp"), number);
                    }
                })
                $(".Item_clickPL") .on("click",function(){
                    var num=$(this).attr("alt");
                        location.href="state.html?id="+num;
                })
                $(".dynamic_user_item").on("click",function(){
                        var num=$(this).attr("title");
                        location.href="state.html?id="+num;
                    })
                    //大图查看
                    var imgSrc=[];
                    var lens,indexs;
                    var colse=true;
                    $('#ImgList img').on('click',function(event){
                        event.stopPropagation();
                        var startX=0;
                        var $w=$('.showImg').width();   
                        $('.mask').show();
                        $('.showImg').show();
                        lens=$(this).parent().find('img').length;
                        indexs=$(this).index();
                        $(this).parent().find('img').each(function(){
                            imgSrc.push($(this).attr('alt'));
                        });
                        $('.showImg ul').width(imgSrc.length*$w).css('left',-indexs*$w);
                          for(var i=0;i<lens;i++){
                                $('.showImg>ul').append("<li><img src="+imgSrc[i]+"></li>");
                            }
                        $('.showImg ul').on('touchstart',function(event){
                            var touch = event.originalEvent.changedTouches[0];
                            startX=touch.pageX;
                        });
                        $('.showImg ul').on('touchend',function(event){
                            var touch = event.originalEvent.changedTouches[0];
                            endX=touch.pageX;
                            var left=$('.showImg ul').position().left; 
                            if(endX>startX){
                                if(indexs==0){
                                    indexs=0;
                                    $('.showImg ul').css({'left':0})
                                }else{
                                    if(colse){
                                        colse=false;
                                        $('.showImg ul').animate({'left':left+$w},800,function(){
                                            left=$('.showImg ul').position().left;
                                            colse=true;
                                            if(indexs==0){
                                                indexs=0;
                                                $('.showImg ul').css({'left':0})
                                            }else{
                                                indexs--;
                                            }
                                        });
                                    }
                                }   
                            }
                            if(endX<startX){
                                if(indexs==lens-1){
                                    indexs=lens-1;
                                    $('.showImg ul').css({'left':-(lens-1)*$w});
                                }else{
                                    if(colse){
                                        colse=false;
                                        $('.showImg ul').stop().animate({'left':left-$w},800,function(){
                                            left=$('.showImg ul').position().left;
                                            colse=true;
                                            if(indexs==lens-1){
                                                indexs=lens-1;
                                                $('.showImg ul').css({'left':-(lens-1)*$w});
                                            }else{
                                                indexs++;
                                            }
                                        });
                                    }
                                }   
                            }
                        });
                    });
                    // 隐藏展示区域
                    $('.showImg ul li').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px'); 
                        imgSrc=[];
                        len=0;
                    }); 
                    $('.showImg').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px'); 
                        imgSrc=[];
                        len=0;
                    }); 
                    $('.mask').on('click',function(){
                        $('.mask').hide();
                        $('.showImg').hide(500);
                        $('.showImg ul').html('');
                        $('.showImg ul').width('0px').css('left','0px');
                        imgSrc=[]; 
                        len=0;
                    }); 
                    //加载更多
                    var  isOpen=true;
                    var clientH = Number(document.documentElement.clientHeight);
                    var H=Number($("#pullUp").height());
                    $(document).on('scroll',function(){
                        if(isOpen){
                            var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
                            var H5Top=parseInt($('#pullUp').offset().top+H);
                            if(docH>H5Top-10){
                                isOpen=false;   page++;
                                $("#pullUp").html("数据加载中......").css("color","#5793dd");
                                addUserList(m_uid,uid,page,2);
                            }
                        }
                    })
             }
            }
        })
    }
}
function addDianzan(m_uid,id,num,self,span,number){
    var love=num;
    if(love==0){
        $.ajax({
            type:"POST",
            url:d_http+'/index.php/Home/Article/condition_like',
            data:{ uid: m_uid, id: id, token:MD5(SL) },
            success:function(res){
                number++;  self.attr("src","../../img/n_Sloves.png");
                self.attr("title",res.data);  self.attr("name",number);
                span.html(number+"点赞");
            }
        })
    }else if(love==1){
        $.ajax({
            type:"POST",
            url:d_http+'/index.php/Home/Article/condition_like',
            data:{ uid: m_uid, id: id, token:MD5(SL) },
            success:function(res){
                number--;  self.attr("src","../../img/n_Slove.png");
                self.attr("title",res.data); self.attr("name",number);
                span.html(number+"点赞");
            }
        })
    }
}
function add0(m) {
    return m < 10 ? '0' + m : m
}
function getObjTime(shijianchuo){
    var motuh=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
    var time = new Date(shijianchuo * 1000);
    var y = time.getFullYear();
    var m = motuh[time.getMonth()];
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    var objtime ={"yue":m,"ri":add0(d),"times":add0(h) + ':' + add0(mm),"hour":add0(h),"min":add0(mm)};
    return objtime;
}


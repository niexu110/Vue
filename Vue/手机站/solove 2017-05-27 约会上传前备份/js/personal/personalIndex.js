var page=0;
var userObj=JSON.parse(localStorage.getItem('userData'));
var Height=window.screen.availHeight;
$(function(){
    $("#FB_fixed").css("height",Height);
    var height=$(".FB_fixed_box").height();
    var top=(Height-height)/2;
    $(".FB_fixed_box").css("margin-top",top);
    var het=$("#RE_fixeds").height();
    var tops=(Height-het)/2;
    $("#RE_fixeds").css("top",tops);
    $.ajax({
        type:"GET",
        url:d_http+"index.php/home/Engagement/date_index",
        data:{},
        success:function(res){
            var banner=res.data.banner;
            var list=res.data.list;
            var assortment=res.data.assortment;
            var merchant=res.data.merchant;
            //轮播
            for(var k in banner){
             $(".personal_imgs ul") .append("<li><img src="+banner[k].images+"></li>")
             $(".personal_radius").append("<span></span>")}
            $('.personal_radius span').eq(0).addClass('act');
            var width=$(".personal_imgs ul li").width();
            $(".personal_imgs ul").width(width*banner.length);
            var index=0;
            setInterval(function(){
                if(index>=banner.length){
                    index=0;
                    $('.personal_radius span').removeClass('act');
                    $('.personal_radius span').eq(index).addClass('act');
                    $(".personal_imgs ul").css("margin-left",0);
                }else{
                    $('.personal_radius span').removeClass('act');
                    $('.personal_radius span').eq(index).addClass('act');
                    $(".personal_imgs ul").css("margin-left",-index*width);
                    index++;
                }
            },2000)
            //四大项
            for(var k in list){
                if(list[k].recommend==1){
                   $(".personal_mian_oneUl").append("<li title="+list[k].id+"><span class='left-img'>"+
                   "<img src="+list[k].images+"></span><span class='right-content'>"+
                   "<p>"+list[k].title+"</p><em>"+list[k].mood+"</em></span>"+
                    "<img src='../../img/n_tj.png' id='Bname'></li>")
                }else{
                    $(".personal_mian_oneUl").append("<li title="+list[k].type+"><span class='left-img'>"+
                        "<img src="+list[k].images+"></span><span class='right-content'>"+
                        "<p>"+list[k].title+"</p><em>"+list[k].mood+"</em></span></li>")
                }
            }
            $(".personal_mian_oneUl li").click(function(){
                var strId=$(this).attr("title");
                if(strId==1){location.href="personalAppointment.html"}
                if(strId==2){$("#FB_fixed").fadeIn(1000)}
                if(strId==3){location.href="../../src/team/teamIndex.html"}
                if(strId==4){location.href="../../src/myself/mydate.html"}
            })
            //热门推送
            for(var k in assortment){
                if(assortment[k].hot==1){
                   $(".personal_mian_titleBox ol").append("<li> <img src="+assortment[k].images+"><h1>"+assortment[k].name+"</h1>"+
                        "<img src='../../img/n_hot.png' id='Iname'></li>")
                }else{
                    $(".personal_mian_titleBox ol").append("<li> <img src="+assortment[k].images+"><h1>"+assortment[k].name+"</h1></li>")
                }
            }
            $(".personal_mian_titleBox ol li").on("click",function(){
                // $("#RE_fixeds h2").text("敬请期待");
                // $("#RE_fixeds").show();
                // setTimeout(function(){
                //     $("#RE_fixeds").fadeOut();
                // },1500)
                location.href='../../src/personal/canvass.html'
            })
            //热门推荐商家
            for(var k in merchant){
                if(merchant[k].logo==null){
                    $(".ul").append("<li title="+merchant[k].goods_id+"><span><img src='../../img/n_ly.png'></span><p>"+merchant[k].shop_name+"</p></li>")
                }else{ $(".ul").append("<li title="+merchant[k].goods_id+"><span><img src="+merchant[k].logo+"></span><p>"+merchant[k].shop_name+"</p></li>");}
            }
            var W=$(".ul li").width();
            $(".ul").width(W*merchant.length+180+"px");
            $(".ul li").click(function(){
                var shop_id=$(this).attr("title")
                location.href="lookScene.html?id="+shop_id;
            })
            $("#FB_fixed").click(function(){
                $("#FB_fixed").fadeOut(1000)
            })
            $(".left_a").click(function(e){
                e.preventDefault();
                if(userObj==null){
                    localStorage.setItem("url",window.location.href)
                    location.href="../../src/login/login.html";
                }else{
                    location.href="releaseData.html";
                }
            })
        }
    })
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/engagement/recommend_index",
        data:{
            page:page,
            lat:localStorage.getItem("x"),
            lng:localStorage.getItem("y")
        },
        success:function(res){
            var list=res.data;
            for(var k in list){
                list[k].mood_time=format(list[k].mood_time)
                list[k].sex=="1"?(list[k].img="../../img/n_boys.png",list[k].class="age")
                    :(list[k].img="../../img/n_girl.png",list[k].class="ages");
                list[k].type=="1"?list[k].treatWay="../../img/n_wqk.png":list[k].treatWay="../../img/n_aaz.png";
                $(".personal_mian_appointment").append("<div class='personal_mian_appointment_details' >"+
                    "<img src="+list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box'title="+list[k].id+">"+
                    "<div title="+ list[k].fid+" class='personal_mian_appointment_leftImg pull-left'>"+
                    "<img src="+list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                    "<p class='p_title'>"+list[k].shop_name+"</p>"+
                    "<p><em>"+list[k].nickname+"</em><span class="+list[k].class+"><img src="+list[k].img+"><b>"+list[k].age+"</b></span></p>"+
                    "<p>"+list[k].address+"</p><p><span>"+list[k].mood_time+"</span> <span class='pull-right JL'>"+list[k].distance+"km</span></p>"+
                    "</div></div> <div class='personal_mian_appointment_opt'>"+
                    "<span id='yhBtn' title="+list[k].id+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                    "<p class='line'></p>")
            }
            $(".personal_mian_appointment_top_box").click(function(){
                var order_id=$(this).attr('title')
                location.href="joinData.html?id="+order_id;
            })
            $(".personal_mian_appointment_leftImg").on("click",function(e){
                e.stopPropagation();
                location.href="../../src/find/personalcarte.html?idd="+$(this).attr("title")
            })
            $(".personal_mian_appointment_opt #yhBtn").click(function(){
                var order_id=$(this).attr("title");
                if(userObj==null){
                    localStorage.setItem("url",window.location.href)
                    location.href="../../src/login/login.html";
                }else{
                    joinDate(userObj.uid,order_id);
                }
            })
            $(" #ltBtn").click(function(){
                location.href="../myself/download.html"
            })
            //加载更多
            var  isOpen=true;
            var clientH = Number(document.documentElement.clientHeight);
            var H=Number($("#pullUp").height());
            $(document).on('scroll',function(){
                if(isOpen){
                    var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
                    var H5Top=parseInt($('#pullUp').offset().top+H);
                    if(docH>H5Top){
                        isOpen=false;
                        page++;
                        $("#pullUp").html("数据加载中......");
                        $.ajax({
                            type:"POST",
                            url:d_http+"index.php/Home/engagement/recommend_index",
                            data:{
                                page:page,
                                lat:localStorage.getItem("x"),
                                lng:localStorage.getItem("y")
                            },
                            success:function(res){
                                if(res.code==200){
                                    var list=res.data;
                                    for(var k in list){
                                        list[k].mood_time=format(list[k].mood_time)
                                        list[k].sex=="1"?(list[k].img="../../img/n_boys.png",list[k].class="age")
                                            :(list[k].img="../../img/n_girl.png",list[k].class="ages");
                                        list[k].type=="1"?list[k].treatWay="../../img/n_wqk.png":list[k].treatWay="../../img/n_aaz.png";
                                        $(".personal_mian_appointment").append("<div class='personal_mian_appointment_details'>"+
                                            "<img src="+list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box' title="+list[k].id+">"+
                                            "<div title="+list[k].fid+" class='personal_mian_appointment_leftImg pull-left'>"+
                                            "<img src="+list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                                            "<p class='p_title'>"+list[k].shop_name+"</p>"+
                                            "<p><em>"+list[k].nickname+"</em><span class="+list[k].class+"><img src="+list[k].img+"><b>"+list[k].age+"</b></span></p>"+
                                            "<p>"+list[k].address+"</p><p><span>"+list[k].mood_time+"</span> <span class='pull-right JL'>"+list[k].distance+"km</span></p>"+
                                            "</div></div> <div class='personal_mian_appointment_opt'>"+
                                            "<span id='yhBtn' title="+list[k].id+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                                            "<p class='line'></p>")
                                    }
                                    isOpen=true;
                                    $("#pullUp").html("加载完毕");
                                    $(".personal_mian_appointment_top_box").click(function(){
                                        var order_id=$(this).attr('title')
                                        location.href="joinData.html?id="+order_id;
                                    })
                                    $(".personal_mian_appointment_leftImg").on("click",function(e){
                                        e.stopPropagation();
                                        location.href="../../src/find/personalcarte.html?idd="+$(this).attr("title")
                                    })
                                    $(".personal_mian_appointment_opt #yhBtn").click(function(){
                                        var order_id=$(this).attr("title");
                                        if(userObj==null){
                                            localStorage.setItem("url",window.location.href)
                                            location.href="../../src/login/login.html";
                                        }else{
                                            joinDate(userObj.uid,order_id);
                                        }
                                    })
                                    $(" #ltBtn").click(function(){
                                        location.href="../myself/download.html"
                                    })
                                }else if(res.code==404){
                                    isOpen=false;
                                  $("#pullUp").html("<p style='color:#5793dd;'>点击查看更多约会</p>");
                                  $("#pullUp p").click(function(){
                                      location.href="personalAppointment.html"
                                  })
                                }
                            }
                        })
                    }
                }
            })
        }
    })
})
function add0(m) {
    return m < 10 ? '0' + m : m
}
function format(shijianchuo) {
    var time = new Date(shijianchuo * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times = add0(m) + '月' + add0(d) + '日  ' + add0(h) + ':' + add0(mm) ;
    return times
}
function joinDate(uid,id){
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/user_apply",
        data:{
            uid:uid,
            eid:id,
            token:MD5(uid+id+SL)
        },
        success:function(res){
            if(res.code==200){
                $("#RE_fixeds span").text("√");
                $("#RE_fixeds h2").text('约会请求已发送');
                $("#RE_fixeds").show();
                setTimeout(function(){
                    $("#RE_fixeds").fadeOut();
                },2000)
            }else{
                $("#RE_fixeds span").text("×");
                $("#RE_fixeds h2").text(res.massage);
                $("#RE_fixeds").show();
                setTimeout(function(){
                    $("#RE_fixeds").fadeOut();
                },2000)
            }
        }
    })
}
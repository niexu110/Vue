/**
 * Created by Administrator on 2017/3/4.
 */
var userObj=JSON.parse(localStorage.getItem('userData'));
var uid=null;
var page=0;
var str=0;
var Height=window.screen.availHeight;
$(function(){
    var het=$("#RE_fixeds").height();
    var tops=(Height-het)/2;
    $("#RE_fixeds").css("top",tops);
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/index",
        data:{
            x:localStorage.getItem("x"),
            y:localStorage.getItem("y"),
            page:page,
            token:MD5(SL)
        },
        success:function(data){
            var fb_list=data.data.fb_list;
            var category=data.data.category;
            for(var k in fb_list){
                fb_list[k].juli=parseInt(fb_list[k].juli);
                fb_list[k].mood_time =format(fb_list[k].mood_time);
                fb_list[k].image==null?fb_list[k].image="../../img/icon/d_head.png":fb_list[k].image=fb_list[k].image+'/head';
                fb_list[k].type=="1"?fb_list[k].treatWay="../../img/n_wqk.png":fb_list[k].treatWay="../../img/n_aaz.png";
                fb_list[k].sex=="1"?(fb_list[k].img="../../img/n_boys.png",fb_list[k].class="age")
                    :(fb_list[k].img="../../img/n_girl.png",fb_list[k].class="ages");
                $('.personal_main').append(
                    "<div class='personal_mian_appointment_details' >"+
                    "<img src="+fb_list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box'title="+fb_list[k].id+">"+
                    "<div title="+fb_list[k].fid+" class='personal_mian_appointment_leftImg pull-left'>"+
                    "<img src="+fb_list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                    "<p class='p_title'>"+fb_list[k].goods_name+"</p>"+
                    "<p><em>"+fb_list[k].nickname+"</em><span class="+fb_list[k].class+"><img src="+fb_list[k].img+"><b>"+fb_list[k].age+"</b></span></p>"+
                    "<p>"+fb_list[k].addr+"</p><p><span>"+fb_list[k].mood_time+"</span> <span class='pull-right JL'>"+fb_list[k].juli+"km</span></p>"+
                    "</div></div> <div class='personal_mian_appointment_opt'>"+
                    "<span id='yhBtn' title="+fb_list[k].id+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                    "<p class='lines'></p>")

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
            for(var k in category){
                category[k].cat_id==1?category[k].cat_id=0:"";
                $(".personal_nav_box").append(
                    "<li title="+category[k].cat_id+"><img src="+category[k].mobileimg+"><p>"+category[k].cat_name+"</p></li>")}
            $(".personal_nav_box li").eq(0).addClass("active")
            $(".personal_nav li").click(function(e){
                e.preventDefault();
                $(this).addClass('active').siblings(".active").removeClass('active');
            })
            //选择类别
            $(".personal_nav_box li").click(function (e) {
                page=0;
                $('.personal_main').html("");
                var self=$(this);
                var num=self.attr('title');
                str=num;
                orderList(localStorage.getItem("x"),localStorage.getItem("y"),page,num,1)
            })
            //参加约会
            $(".personal_main_box").click(function(){
                var order_id=$(this).attr('title')
                location.href="joinData.html?id="+order_id;
            })
         }
      })
    $(".personal_FB").click(function(){
        if(userObj==null){
            localStorage.setItem("url",window.location.href)
            location.href="../../src/login/login.html";
        }else{
            location.href="releaseData.html";
        }
      })
    });
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
                orderList(localStorage.getItem("x"),localStorage.getItem("y"),page,str,2)
            }
        }
    })
function orderList(x,y,page,num,type){
        if(type==1){
            $.ajax({
                type:"POST",
                url:d_http+"index.php/Home/Engagement/index",
                data:{
                    x:localStorage.getItem("x"),
                    y:localStorage.getItem("y"),
                    page:page,
                    cat_id:num,
                    token:MD5(SL),
                },
                success:function(data){
                    console.log(data)
                    var fb_list=data.data.fb_list;
                    if(fb_list.length==0){
                        $('.personal_main').append(
                            "<div style='text-align: center;color:#999;font-size: .28rem;padding-top:.5rem;'>暂无此类约会...</div>")
                        $("#pullUp").html("");
                    }else{
                        for(var k in fb_list){
                            fb_list[k].juli=parseInt(fb_list[k].juli);
                            fb_list[k].mood_time =format(fb_list[k].mood_time);
                            fb_list[k].image==null?fb_list[k].image="../../img/icon/d_head.png":fb_list[k].image=fb_list[k].image+'/head';
                            fb_list[k].type=="1"?fb_list[k].treatWay="../../img/n_wqk.png":fb_list[k].treatWay="../../img/n_aaz.png";
                            fb_list[k].sex=="1"?(fb_list[k].img="../../img/n_boys.png",fb_list[k].class="age")
                                :(fb_list[k].img="../../img/n_girl.png",fb_list[k].class="ages");
                            $('.personal_main').append(
                                "<div class='personal_mian_appointment_details' >"+
                                "<img src="+fb_list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box'title="+fb_list[k].id+">"+
                                "<div class='personal_mian_appointment_leftImg pull-left'>"+
                                "<img src="+fb_list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                                "<p class='p_title'>"+fb_list[k].goods_name+"</p>"+
                                "<p><em>"+fb_list[k].nickname+"</em><span class="+fb_list[k].class+"><img src="+fb_list[k].img+"><b>"+fb_list[k].age+"</b></span></p>"+
                                "<p>"+fb_list[k].goods_brief+"</p><p><span>"+fb_list[k].mood_time+"</span> <span class='pull-right JL'>"+fb_list[k].juli+"km</span></p>"+
                                "</div></div> <div class='personal_mian_appointment_opt'>"+
                                "<span id='yhBtn' title="+fb_list[k].id+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                                "<p class='lines'></p>")

                        }
                        $(".personal_mian_appointment_top_box").click(function(){
                            var order_id=$(this).attr('title')
                            location.href="joinData.html?id="+order_id;
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
                    }
                }
            })
        }else if(type==2){
            $.ajax({
                type:"POST",
                url:d_http+"index.php/Home/Engagement/index",
                data:{
                    x:localStorage.getItem("x"),
                    y:localStorage.getItem("y"),
                    page:page,
                    cat_id:num,
                    token:MD5(SL),
                },
                success:function(data){
                    var fb_list=data.data.fb_list;
                    if(fb_list.length==0){
                        $("#pullUp").html("暂无数据....");
                        setTimeout(function(){
                            $("#pullUp").html("");
                        },2500)
                        isOpen=true;
                    }else{
                        for(var k in fb_list){
                            fb_list[k].juli=parseInt(fb_list[k].juli);
                            fb_list[k].mood_time =format(fb_list[k].mood_time);
                            fb_list[k].image==null?fb_list[k].image="../../img/icon/d_head.png":fb_list[k].image=fb_list[k].image+'/head';
                            fb_list[k].type=="1"?fb_list[k].treatWay="../../img/n_wqk.png":fb_list[k].treatWay="../../img/n_aaz.png";
                            fb_list[k].sex=="1"?(fb_list[k].img="../../img/n_boys.png",fb_list[k].class="age")
                                :(fb_list[k].img="../../img/n_girl.png",fb_list[k].class="ages");
                            $('.personal_main').append(
                                "<div class='personal_mian_appointment_details' >"+
                                "<img src="+fb_list[k].treatWay+" class='Start'><div class='personal_mian_appointment_top_box'title="+fb_list[k].id+">"+
                                "<div class='personal_mian_appointment_leftImg pull-left'>"+
                                "<img src="+fb_list[k].image+"></div><div class='personal_mian_appointment_rightContent pull-right'>"+
                                "<p class='p_title'>"+fb_list[k].goods_name+"</p>"+
                                "<p><em>"+fb_list[k].nickname+"</em><span class="+fb_list[k].class+"><img src="+fb_list[k].img+"><b>"+fb_list[k].age+"</b></span></p>"+
                                "<p>"+fb_list[k].goods_brief+"</p><p><span>"+fb_list[k].mood_time+"</span> <span class='pull-right JL'>"+fb_list[k].juli+"km</span></p>"+
                                "</div></div> <div class='personal_mian_appointment_opt'>"+
                                "<span id='yhBtn' title="+fb_list[k].id+"><img src='../../img/n_tx.png'>和TA约</span><span id='ltBtn'><img src='../../img/n_lt.png'>和TA聊</span></div></div>"+
                                "<p class='lines'></p>")
                        }

                        isOpen=true;
                        $("#pullUp").html("");
                        //参加约会
                        $(".personal_mian_appointment_top_box").click(function(){
                            var order_id=$(this).attr('title')
                            location.href="joinData.html?id="+order_id;
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
                    }
                }
            })
        }
    }
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
    var times = add0(m) + '月' + add0(d) + '日 ' + add0(h) + '点' + add0(mm) + '分';
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
        success:function(res) {
            if (res.code == 200) {
                $("#RE_fixeds span").text("√");
                $("#RE_fixeds h2").text('约会请求已发送');
                $("#RE_fixeds").show();
                setTimeout(function () {
                    $("#RE_fixeds").fadeOut();
                }, 2000)
            } else {
                $("#RE_fixeds span").text("×");
                $("#RE_fixeds h2").text(res.massage);
                $("#RE_fixeds").show();
                setTimeout(function () {
                    $("#RE_fixeds").fadeOut();
                }, 2000)
            }
        }
    })
}



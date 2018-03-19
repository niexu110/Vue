/**
 * Created by Administrator on 2017/3/10.
 */
var userObj=JSON.parse(localStorage.getItem('userData'));
var order_id=null;
var good_id=null;
var uid=null;
var height=window.screen.availHeight;
$(function(){
    var URL = document.location.toString();
    order_id = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
    $("#JO_fixed").css("height",height);
    var het=$(".JO_fixed_box").height();
    var top=(height-het)/2.5;
    $(".JO_fixed_box").css("margin-top",top);
    var hets=$("#RE_fixeds").height();
    var tops=(height-hets)/2;
    $("#RE_fixeds").css("top",tops);
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/fb_detail",
        data:{
            id:order_id,
            token:MD5(order_id+SL)
        },
        success:function(data){
            var userList=data.data.user;
            var list=data.data.engagement;
            var goodList=data.data.goods;
            good_id=list.goods_id;
            list.add_time=format(list.add_time);
            list.mood_time=format(list.mood_time);
            userList.old_uid==0?userList.oldImg="../../img/n_shenF.png":userList.oldImg="../../img/n_shenFs.png";
            userList.sex==1?(userList.sexImg="../../img/icon/n_boys.png",userList.txt="他发布的约会")
                :(userList.sexImg="../../img/icon/n_girls.png",userList.txt="她发布的约会");
            userList.image==null?userList.image="../../img/icon/d_head.png":userList.image=userList.image+'/head';
            userList.marry==""?userList.marry="未知":userList.marry=userList.marry;
            list.pick==0?(list.picks="不接送",list.pickImg="../../img/n_bjs.png")
                :(list.pick==1?(list.picks="负责接送",list.pickImg="../../img/n_js.png")
                :(list.picks="需要接送",list.pickImg="../../img/n_js.png"));
            list.sex==0?(list.sexs="男女不限",list.sexImg="../../img/n_bbgg.png")
                :(list.sex==1?(list.sexs="仅限男生",list.sexImg="../../img/n_bb.png")
                :(list.sexs="仅限女生",list.sexImg="../../img/n_gg.png"));
            list.type==1?(list.typeText="已买单",list.typeImg="../../img/n_md.png")
                :(list.typeText="AA制",list.typeImg="../../img/n_AA.png");
            $(".SL_nav span").text(userList.txt);
            $(".join_middle_img img").attr("src",userList.image);
            $(".join_user_nick_box h2 span").text(userList.nickname);
            // $(".join_user_nick_box h2 img.img1").attr("src",userList.oldImg);
            $(".join_nick_img img").attr("src",userList.sexImg);
            $(".join_middle_img ").attr("title",list.fid);
            $(".join_nick_img em").text(userList.age);
            $(".join_constellatory").text(userList.constellation);
            $(".join_single").text(userList.marry);
            $(".jion_declaration_text").text(list.mood);
            $(".join_min_img img").attr("src",goodList.mobileimg);
            $(".join_p").text(goodList.goods_name);
            $(".join_p1").text(list.mood_time);
            $(".join_p2").text(goodList.address);
            $(".join_p3").text("￥"+list.money+"元");
            $(".li p").text(list.sexs);
            $(".li img").attr("src",list.sexImg);
            $(".li2 p").text(list.typeText);
            $(".li2 img").attr("src",list.typeImg);
            $(".li3 p").text(list.picks);
            $(".li3 img").attr("src",list.pickImg);
            $(".join_right_title p").text(data.data.request_count);
            $(".JO_fixed_box h4 em").text(userList.nickname);
        }
    })
    $("#joinBtn").click(function(){
        if(userObj==null){
            localStorage.setItem("url",window.location.href)
            location.href="../../src/login/login.html";
        }else{
            uid=userObj.uid;
            $.ajax({
                type:"POST",
                url:d_http+"index.php/Home/Engagement/user_apply",
                data:{
                    uid:uid,
                    eid:order_id,
                    token:MD5(uid+order_id+SL)
                },
                success:function(data){
                    if(data.code==404){
                        $("#RE_fixeds h2").text(data.massage);
                        $("#RE_fixeds").show();
                        setTimeout(function(){
                            $("#RE_fixeds").fadeOut();
                        },1000)
                    }else{
                       $("#JO_fixed").fadeIn(500);
                    }
                }
            })
        }
    });
    $(".join_middle_img").click(function(){
       var fid=$(".join_middle_img").attr("title");
       location.href="../../src/find/personalcarte.html?fid="+fid;
    })
    $("#JO_fixed").click(function(){
        $("#JO_fixed").fadeOut(500);
    })
    $(".join_min_img").click(function(){
        location.href="lookScene.html?id="+good_id;
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
    var times = y + '年' + add0(m) + '月' + add0(d) + '日 '+ add0(h) + '点' + add0(mm);
    return times
}

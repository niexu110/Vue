/**
 * Created by Administrator on 2017/3/7.
 */
var userObj=JSON.parse(localStorage.getItem('userData'));
var goods_id=null;
$(function(){
  var URL = document.location.toString();
  goods_id = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/goods_detail",
        data: {
            id:goods_id
        },
        success: function(data) {
            var list=data.data;
            console.log(list)
            money=list.shop_price;
            price=money;
            $(".top").text(list.goods_name);
            $(".Descrition_left img").attr("src",list.mobileimg);
            $(".Descrition_span").text(list.goods_brief);
            $(".Descrition_span1").text(list.goods_name);
            $(".Descrition_span2").text(list.shop_price+"元");
            $(".release_moneys em").text(list.shop_price+"元");
            $(".Descrition_span3").text(list.address);
            $(".phone").attr("href","tel://"+list.phone);
            $(".n_tell").attr("href","tel://"+list.phone);
            $(".Descrition_ambient_address>span").text(list.address);
            $(".Descrition_ambient_address em").text(list.phone);
            $(".Descrition_box_two").html("<h1>服务内容:</h1>"+list.goods_desc);
            $(".Descrition_ambient_content").html(list.details);
            $(".Descrition_ambient_content p").removeAttr("style")
        }
    })
    //评论
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/discuss",
        data: {
            goods_id:goods_id,
            token:MD5(goods_id+SL)
        },
        success:function(data){
        }
    })
  $(".Descrition div a").click(function(e){
      e.preventDefault();
      $(this).parent().addClass('active1').siblings(".active1").removeClass('active1');
      $($(this).attr("href")).addClass('actives').siblings(".actives").removeClass('actives');
   });
    $(".footer_fixed").click(function(){
        if(userObj==null){
            location.href="../../src/login/login.html";
            localStorage.setItem("url",window.location.href);
        }else{
            if(localStorage.getItem("n_type")==null){
                location.href="releaseData.html?id="+goods_id;
                localStorage.setItem("n_goods_id",goods_id)
            }else if(localStorage.getItem("n_type")==1){
                location.href="releaseDatas.html";
                localStorage.setItem("n_goods_id1",goods_id)
            }
        }
    })
    $(".SL_nav b").click(function(){
        window.history.back(-1);
    })
})
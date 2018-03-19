/**
 * Created by Administrator on 2017/3/9.
 */

var uid=null;
var id=null;
var height=window.screen.availHeight;
// var status=1;//状态1微信，2支付宝
var order=null;//订单号
$(function(){
    var URL = document.location.toString();
    list = URL.substring(URL.lastIndexOf("?") + 1, URL.length);
    list=list.split("&");
    id=list[0].substring(list[0].indexOf("=")+1,list[0].length);
    uid=list[1].substring(list[1].indexOf("=")+1,list[1].length);
    $("#FB_fixed").css("height",height);
    var het=$(".ZF_fixed_box").height();
    var top=(height-het)/2;
    $(".ZF_fixed_box").css("margin-top",top);
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Goods/group_pay",
        data:{
            id:id,
            uid:uid,
            token:MD5(id+"solianJSKASDKES")
        },
        success:function(data){
            console.log(data)
            var list=data.data;
            order=list.ordernumber
            $(".d_inphidden").val(order)
            $(".ltSpan").text("订单编号"+list.ordernumber);
            $(".rtSpan").text("￥"+list.goodsmoney+"元")
            $(".rtSpan2").text("￥"+list.money+"元")
            $(".pay_img img").attr("src",list.images);
            $(".pay_imgs p").text(list.name);
        }
    })
    // $("#WXZF img").click(function(){
    //    $(this).attr('src',"../../img/icon/n_wx_1.png");
    //    $("#ZFB img").attr("src","../../img/icon/n_wxs.png")
    //     status=1;
    // })
    // $("#ZFB img").click(function(){
    //     $(this).attr('src',"../../img/icon/n_wxs_1.png")
    //     $("#WXZF img").attr("src","../../img/icon/n_wx.png")
    //     status=2;
    // })
    //发起支付
//  $("#payBtn").click(function(){
//    console.log("发起支付.....")
//      console.log(order);
//      $.ajax({
//          type:"POST",
//          url:"http://back.qinyikou.cc/index.php/Mobile/indexd",
//          data:{
//              order_number:order
//          },
//          success:function(data){
//          }
//      })
//  })

    //点击后退
    $("#btnImg").click(function(){
        $("#FB_fixed").fadeIn(500);
    })
    $("#FB_fixed").click(function(){
        $("#FB_fixed").fadeOut(500)
    })
    //	确认支付
    $('.d_bottom').on('click',function(){
		if($(".d_inphidden").val()==''){
			return;
		}else{
			clicksubmit()
		}
	})
	function clicksubmit(){
		$(".d_form").submit();
	}
})
/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
var money1=localStorage.getItem("d_key1");
var money2=localStorage.getItem("d_key2");
$(function(){
	$(".d_buytopleft p").html(money1+"搜恋币");
	$(".d_buyTop span").text("￥"+money2);
	$(".d_money").text("￥"+money2);
	//点击微信
	$(".d_wxand").on("click",function(){
		$(".d_clear1").removeClass("d_hidden");
		$(".d_clear2").addClass("d_hidden");
	});
	//点击支付宝
	$(".d_zhifu").on("click",function(){
		$(".d_clear1").addClass("d_hidden");
		$(".d_clear2").removeClass("d_hidden");
	});
	$(".d_inphidden").val(localStorage.getItem("d_goodsId"))
	$('.d_bottoms').on('click',function(){
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

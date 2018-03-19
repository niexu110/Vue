/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/money",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			console.log(data)
			$(".d_money").html(data.data.money+"元")//余额
			$(".d_soulovemoney").html(data.data.virtual+"个")//搜恋币
			$(".d_youhuiquan").html(data.data.privilege+"张");//优惠券
			$(".d_youmoney").on("click",function(){
				location.href="yuemoney.html?yuemoney="+data.data.money
			})
		}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/userindex",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			$(".d_nickname").html(data.data.nickname);
			$(".d_headimg").attr("src",data.data.image+d_head);
			
		}
	});
})

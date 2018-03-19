/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$(".d_noyouhui").hide()
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/coupons",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			var list=data.data
			if(data.code==200){
				$(".d_noyouhui").hide()
				for(var i in list){
					list[i].start_time=format(list[i].start_time).substr(0, 10);
					list[i].end_time=format(list[i].end_time).substr(0, 10);
					$(".d_contentBox").append("<div class='d_couponlist' titlt="+list[i].c_id+"><img src='../../img/d_coupon.png'/><div class='d_content'><div class='d_contentleft'><div class='d_contentleftson'><span>￥</span><p>"+list[i].price+"</p></div><div class='d_tishi'>满"+list[i].condition+"元可以使用</div></div><div class='d_contentright'><h3>"+list[i].name+"</h3><h4>"+list[i].start_time+"-"+list[i].end_time+"</h4><p>此券在任意商家可以使用</p></div></div></div>")
				}
			}else{
				$(".d_noyouhui").show()
			}
			//点击优惠券
//			$("d_contentBox .d_couponlist").on("click",function(){
//				log($(this).attr("title")
//			})
		}
	});
})

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
var gid=localStorage.getItem("teamid")
$(function(){
	$(".d_agree").hide();
	$(".d_noagree").hide();
	$(".d_gopay").hide();
	$(".d_dateclear").hide();
	var d_sex,d_pick
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/group_detail",
		data:{
			uid:uid,
			gid:gid,
			token:MD5(gid+uid+SL)
		},
		success:function(data){
			var list=data.data;
			$(".d_contentleft>p").html(list.name);
			list.date_time=format(list.date_time).substr(0,16);
			$(".d_contentleft>span").html("约会时间："+list.date_time);
			$(".d_contenbox>img").attr("src",list.images);
			$(".d_sum>span").html(list.count+"人")
			$(".d_more").on("click",function(){
				window.location.href="../../src/team/detailedInfo.html?id="+list.id;
			})
		}
	});
	
})
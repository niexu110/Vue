/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
var goodid=localStorage.getItem("goodid")
$(function(){
	var arrtext=["计划有变，没时间约会","身体不舒服，无法预约到达","外面空气污染严重，不想出门","去过那家店，不满意环境","朋友/网上评论不太乐观"]
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/fb_detail",
		data:{
			id:goodid,
			uid:uid,
			token:MD5(goodid+SL)
		},
		success:function(data){
			var engagement=data.data.engagement;
			var goods=data.data.goods;
			var user=data.data.user;
			engagement.mood_time=format(engagement.mood_time).substr(0,16);
			if(engagement.sex==0){
				d_sex="男女不限";
			}else if(engagement.sex==1){
				d_sex="仅限男士";
			}else if(engagement.sex==2){
				d_sex="仅限女士";
			}
			if(engagement.pick==0){
				d_pick="不负责接送";
			}else if(engagement.pick==1){
				d_pick="负责接送";
			}else if(engagement.pick==2){
				d_pick="要求接送";
			}
			$(".d_left>p").html(goods.goods_name);
			$(".d_span1").html("约会时间："+engagement.mood_time);
			$(".d_span2").html("已接受该约会邀请的人数："+data.data.request_count);
			$(".d_span3").html(d_sex);
			$(".d_span4").html(d_pick);
			$(".d_contentBox>img").attr("src",goods.mobileimg);
			var money
			if(engagement.type==2){//AA制
				money=Number(engagement.money/2)
			}else{
				money=0
			}
			$(".d_offmoney p").html(money+"元")
			for(var i in arrtext){
				$(".d_cause").append("<div class='d_li'><p>"+arrtext[i]+"</p><div class='d_wai'><div class='d_nei'></div></div></div>");
			}
			$(".d_nei").hide()
			$(".d_cause .d_li").on("click",function(){
				$(this).find(".d_nei").show();
				$(this).siblings().find(".d_nei").hide();
				$(".d_textcontent").val($(this).find("p").html())
			})
			//点击确认取消
			$(".d_btn").on("click",function(){
				if($(".d_textcontent").val()==""){
					$(".d_popupbox").html("请填写取消原因");
					setTimeout(show,500);
					setTimeout(hide,3000);
					return;
				}else{
					$.ajax({
						type:"post",
						url:d_http+"index.php/Home/Engagement/user_off",
						data:{
							eid:engagement.id,
							uid:uid,
							message:$(".d_textcontent").val(),
							token:MD5(engagement.id+SL)
						},
						success:function(data){
							if(data.code==200){
								$(".d_popupbox").html("取消成功");
								setTimeout(show,500);
								setTimeout(hide,3000);
								setTimeout(function(){location.href="inviteme.html"},3000);
								
							}else{
								$(".d_popupbox").html(data.message);
								setTimeout(show,500);
								setTimeout(hide,3000);
							}
						}
					});
				}
			})
		}
	});
})

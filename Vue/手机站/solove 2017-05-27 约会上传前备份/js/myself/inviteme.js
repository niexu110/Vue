/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
var goodid=localStorage.getItem("goodid")
$(function(){
	$(".d_agree").hide();
	$(".d_noagree").hide();
	$(".d_gopay").hide();
	$(".d_dateclear").hide();
	var d_sex,d_pick
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
			$(".d_tishi>span").on("click",function(){
				window.location.href="../../src/personal/lookScene.html?id="+engagement.goods_id;
			})
			$(".d_topBox").on("click",function(){
     			window.location.href="../../src/find/personalcarte.html?id="+engagement.fid;
     		})
			if(user.old_uid==1){
				user.old_uid="身份已认证"
			}else if(user.old_uid==0){
				user.old_uid="身份未认证"
			}
			if(user.sex==1){
				$(".d_topcenter>img").attr("src","../../img/icon/n_boys.png")
			}else if(user.sex==2){
				$(".d_topcenter>img").attr("src","../../img/icon/n_girls.png")
			}
			$(".d_headimg").attr("src",user.image);
			$(".d_topcenterBox>p").html("邀请人        "+user.nickname);
			$(".d_topcenter>span").html(user.age);
			$(".d_p1").html(user.marry);
			$(".d_p2").html(user.old_uid);
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
			$(".d_span2").html("约会宣言："+engagement.mood);
			$(".d_span3").html(d_sex);
			$(".d_span4").html(d_pick);
			$(".d_contentBox>img").attr("src",goods.mobileimg);
			$(".d_tishi>p").html("已接受该约会的人数："+data.data.request_count+"人");
			if(engagement.fb_type==1){//好友
				if(engagement.stty==0){//未接受
					$(".d_zhuangtai").html("您是否同意本次约会？");
					$(".d_okpay").html("");
					$(".d_agree").show();
					$(".d_noagree").show();
					//同意
					$(".d_agree").on("click",function(){
						$.ajax({
							type:"post",
							url:d_http+"index.php/Home/Engagement/accept",
							data:{
								uid:uid,
								eid:goodid,//商品id
								token:MD5(uid+goodid+SL)
							},
							success:function(data){
								if(data.code==200){
									$(".d_popupbox").html("同意约会！");
									setTimeout(show,500);
									setTimeout(hide,3000);
									$(".d_agree").hide();
									$(".d_noagree").hide();
									$(".d_dateclear").show();
								}else{
									$(".d_popupbox").html(data.massage);
									setTimeout(show,500);
									setTimeout(hide,3000);
								}
							}
						});
					})
					//拒绝
					$(".d_noagree").on("click",function(){
						$.ajax({
							type:"post",
							url:d_http+"index.php/Home/Engagement/user_deny",
							data:{
								uid:uid,
								eid:goodid,//商品id
								token:MD5(uid+goodid+SL)
							},
							success:function(data){
								if(data.code==200){
									$(".d_popupbox").html("已成功拒绝约会！");
									setTimeout(show,500);
									setTimeout(hide,3000);
									$(".d_okpay").html("已拒绝！");
									$(".d_agree").hide();
									$(".d_noagree").hide();
									$(".d_zhuangtai").html("");
								}else{
									$(".d_popupbox").html(data.massage);
									setTimeout(show,500);
									setTimeout(hide,3000);
								}
							}
						});
					})
				}else if(engagement.stty==1){
					//点击取消约会
					$(".d_dateclear").on("click",function(){
						window.location.href="offdate.html";
					})
					$(".d_zhuangtai").html("您已同意本次约会。");
					if(engagement.type==2){//AA制
						if(engagement.sty==2){//已支付
							$(".d_okpay").html("已支付");
							$(".d_dateclear").show();
						}else{
							$(".d_okpay").html("未支付");
							$(".d_gopay").show();
							$(".d_gopay").on("click",function(){
								window.location.href="../../src/personal/pay.html?id="+engagement.goods_id+"&uid="+uid;
							})
						}
					}else{//对方付款
						$(".d_agree").hide();
						$(".d_noagree").hide();
						$(".d_dateclear").show();
						//拒绝
						$(".d_dateclear").on("click",function(){
							window.location.href="offdate.html";
						})
					}
				}else if(engagement.stty==9){
					$(".d_zhuangtai").html("正在退款中");
				}else if(engagement.stty==10){
					$(".d_zhuangtai").html("已退款");
				}else if(engagement.stty==2){
					$(".d_zhuangtai").html("已拒绝");
				}
			}else{//陌生人
				if(engagement.stty==0){
					$(".d_zhuangtai").html("对方还未选择约会对象！");
					$(".d_okpay").html("");
					$(".d_agree").hide();
					$(".d_noagree").hide();
					$(".d_gopay").hide();
					$(".d_dateclear").hide();
				}else if(engagement.stty==1){
					$(".d_zhuangtai").html("对方已同意本次约会");
					if(engagement.type==2){//AA制
						if(engagement.sty==2){//已支付
							$(".d_okpay").html("已支付");
						}else{
							$(".d_okpay").html("未支付");
							$(".d_gopay").show();
						}
					}else{//对方付款
						$(".d_agree").hide();
						$(".d_noagree").hide();
						$(".d_dateclear").show();
						//拒绝
						$(".d_dateclear").on("click",function(){
							window.location.href="offdate.html";
						})
					}
				}else if(engagement.stty==9){
					$(".d_zhuangtai").html("正在退款中");
				}else if(engagement.stty==10){
					$(".d_zhuangtai").html("已退款");
				}else if(engagement.stty==2){
					$(".d_zhuangtai").html("已拒绝");
				}
			}
		}
	});
})
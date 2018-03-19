/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
var goodid=localStorage.getItem("mygoodid")
$(function(){
	$(".d_issue>div").hide();//取消约会按钮
	$(".d_fixedbox").hide();//点击人员头显示底层是否约会
	$(".d_headimgBox").hide();//人员头像集合
	$(".d_okuser").hide();//确定后人员信息
	var d_sex,d_pick
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/user_list",
		data:{
			eid:goodid,
			uid:uid,
			token:MD5(goodid+uid+SL)
		},
		success:function(data){
			var engagement=data.data.engagement;
			var goods=data.data.goods;
			var list=data.data.sq_list;
			var useruidnum,d_sex,d_pick
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
			$(".d_topBox>span").on("click",function(){
				window.location.href="../../src/personal/lookScene.html?id="+engagement.goods_id;
			})
			engagement.mood_time=format(engagement.mood_time).substr(0,16);
			$(".d_contentleftbom>p").html(d_sex);
			$(".d_contentleftbom>span").html(d_pick);
			$(".d_goodsname").html(goods.goods_name);
			$(".d_time1").html("约会时间："+engagement.mood_time);
			$(".d_xuanyan").html("约会宣言："+engagement.mood);
			$(".d_contentright img").attr("src",goods.mobileimg);
			$(".d_headimgBox span").html(list.length+"人");
			for(var i in list){
				$(".d_imgArr").append("<img title="+list[i].uid+" src="+list[i].image+" />");
				if(list[i].uid==engagement.uid){
					useruidnum=i
					var shenfen;
					if(list[useruidnum].old_uid==0){
						shenfen="未通过身份验证";
					}else if(list[useruidnum].old_uid==1){
						shenfen="已通过身份验证";
					}
					var danshen;
					if(list[useruidnum].marry==1){
						danshen="单身"
					}else if(list[useruidnum].marry==2){
						danshen="已婚"
					}else if(list[useruidnum].marry==3){
						danshen="情侣"
					}
					$(".d_userimg").attr("src",list[useruidnum].image);
					$(".d_user").html(list[useruidnum].nickname);
					$(".d_sexord>span").html(list[useruidnum].age);
					$(".d_sexordp1").html(danshen);
					$(".d_sexordp2").html(shenfen);
				}
			}
			if(engagement.uid==0 || engagement.uid==undefined || engagement.uid==null){
				$(".d_headimgBox").show();
				$(".d_okuser").hide();
				$(".d_issue>span").html("")
			}else{
				$(".d_headimgBox").hide()
				$(".d_okuser").show()
				$(".d_okuser").on("click",function(){
	     			window.location.href="../../src/find/personalcarte.html?id="+engagement.uid;
	     		})
				if(engagement.status==9){
					$(".d_issue>span").html("退款中...")
				}else if(engagement.status==10){
					$(".d_issue>span").html("已退款")
				}else{
					if(engagement.type==2){
						if(engagement.sty==1){
							$(".d_issue>span").html("等待确认中")
						}else{
							$(".d_issue>span").html("已同意 请到已购服务中验证")
						}
					}else{
						$(".d_issue>span").html("已同意 请到已购服务中验证")
					}
				}
			}
			$(".d_imgArr img").on("click",function(){
				$(".d_fixedbox").show();
				var id=$(this).attr("title")
				$(".d_fixedoff").on("click",function(){
					$(".d_fixedbox").hide();
				});
				$(".d_fixed_p2").on("click",function(){
					window.location.href="../../src/find/personalcarte.html?id="+id;
				});
				$(".d_fixed_p1").on("click",function(){
					$.ajax({
						type:"post",
						url:d_http+"index.php/Home/Engagement/accept",
						data:{
							uid:id,
							eid:engagement.id,
							token:MD5(id+engagement.id+SL)
						},
						success:function(data){
							window.location.href="myissue.html"
						}
					});
				})
			})
		}
	})
})
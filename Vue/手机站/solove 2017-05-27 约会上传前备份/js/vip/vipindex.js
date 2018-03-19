$(function(){
	var uid=localStorage.getItem("uid")
	var page=0;
	var d_sex;
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home/Soubrette/index",
		data:{
			uid:uid,
			page:page
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				var d_viptime=format(data.data.vip_time);
				localStorage.setItem("d_viptime",d_viptime)
				$(".d_banner>img").attr("src",data.data.banner.imgaes);
				var banertext=data.data.banner.ad;
				for(var i in banertext){
					$(".d_marquee").append("<span>"+banertext[i]+"</span>")
				}
				var tuijianlist=data.data.tuijian;
				d_sex=tuijianlist[0].sex;
				for(var i in tuijianlist){
					if(tuijianlist[i].image==null || tuijianlist[i].image==""){
						tuijianlist[i].image="../../img/icon/d_head.png"
					}
					if(tuijianlist[i].is_hot==0){
						tuijianlist[i].hotimg="../../img/icon/d_touming.png";
					}else if(tuijianlist[i].is_hot==1){
						tuijianlist[i].hotimg="../../img/icon/d_hot.png";
					}
					$(".d_headarr>ul").append("<li title='"+tuijianlist[i].uid+"'><div class='d_headimg'><div class='d_srcbox'><img class='d_headsrc' src="+tuijianlist[i].image+" /><img class='d_hot' src="+tuijianlist[i].hotimg+" /><div class='sexage'><span>"+tuijianlist[i].age+"岁</span></div></div><span class='d_nickname'>"+tuijianlist[i].nickname+"</span></div></li>")
				}
				$(".d_headarr li").on("click",function(){
					var useruid=$(this).attr("title");
					location.href="../../src/vip/personalcarte.html?id="+useruid
				})
				var newuser=data.data.user;
				for(var i in newuser){
					if(newuser[i].image==null || newuser[i].image==""){
						newuser[i].image="../../img/icon/d_head.png"
					}
					$(".d_headarr2>ul").append("<li title='"+newuser[i].uid+"'><div class='d_headimg'><div class='d_srcbox'><img class='d_headsrc' src="+newuser[i].image+" /><div class='sexage'><span>"+newuser[i].age+"岁</span></div></div><span class='d_nickname'>"+newuser[i].nickname+"</span></div></li>")
				}
				$(".d_headarr2 li").on("click",function(){
					var useruid=$(this).attr("title");
					location.href="../../src/vip/personalcarte.html?id="+useruid
				})
				if(d_sex==1){
					$(".sexage").css("background","#5793DD");
				}else if(d_sex==2){
					$(".sexage").css("background","#feb3c5");
				}
				$('.d_headarr').on('scroll',function(){
					var addre=$('.d_headarr').scrollLeft();
					var w=$('body').width();
					if(addre>0 && addre<w){
						$('.d_heng span').eq(0).removeClass("d_span").siblings().addClass("d_span")
					}else if(addre>=w &&addre<2*w){
						$('.d_heng span').eq(1).removeClass("d_span").siblings().addClass("d_span")
						
					}else if(addre>=2*w){
						$('.d_heng span').eq(2).removeClass("d_span").siblings().addClass("d_span")
						
					}
				})
			}
		}
	});
	//点击换一批
	$(".d_chengpage").on("click",function(){
		page++;
		$.ajax({
			type:"post",
			url:d_http+"index.php/Home/Soubrette/index",
			data:{
				uid:uid,
				page:page
			},
			success:function(data){
				if(data.code==200){
					$(".d_headarr2>ul>li").remove();
					var newuser=data.data.user;
					if(newuser.length==0){
						page=0
					}
					for(var i in newuser){
						if(newuser[i].image==null || newuser[i].image==""){
							newuser[i].image="../../img/icon/d_head.png"
						}
						$(".d_headarr2>ul").append("<li title='"+newuser[i].uid+"'><div class='d_headimg'><div class='d_srcbox'><img class='d_headsrc' src="+newuser[i].image+" /><div class='sexage'><span>"+newuser[i].age+"岁</span></div></div><span class='d_nickname'>"+newuser[i].nickname+"</span></div></li>")
					}
					$(".d_headarr2 li").on("click",function(){
						var useruid=$(this).attr("title");
						location.href="../../src/vip/personalcarte.html?id="+useruid
					})
					if(d_sex==1){
						$(".sexage").css("background","#5793DD");
					}else if(d_sex==2){
						$(".sexage").css("background","#feb3c5");
					}
				}
			}
		});
	});
	/* 跳转服务说明*/
	$(".d_save").on("click",function(){
		location.href="explain.html";
	})
	/* 跳转筛选*/
	$(".d_btn").on("click",function(){
		location.href="filterItem.html";
	})
	/*地址*/
	$(".d_city").on("click",function(){
		//location.href="changeCity.html"
	})
})

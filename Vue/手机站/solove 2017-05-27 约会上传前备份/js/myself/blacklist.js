var uid=localStorage.getItem("uid");
$(function(){
	var page=0;
	$(".d_jiechu").hide()
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home/user/blacklist",
		data:{
			uid:uid,
			page:page,
			token:MD5(uid+SL)
		},
		success:function(data){
			if(data.code==200){
				var blacklist=data.data;
				for(var i in blacklist){
					if(blacklist[i].sex==1){
     					blacklist[i].img='../../img/icon/x_boy_icon.png'
     				}else if(blacklist[i].sex==2){
     					blacklist[i].img='../../img/icon/x_girl_icon.png';
     				}
     				if(blacklist[i].image=="" || blacklist[i].image==undefined){
     					blacklist[i].image="../../img/icon/d_head.png"
     				}
					$(".d_blacklist").append("<div class='d_box' title="+blacklist[i].uid+"><div class='d_goodF d_goodFlist'><img class='d_headimg' src="+blacklist[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+blacklist[i].nickname+"</h2><div class='d_agesex "+blacklist[i].addclass+"'><img src="+blacklist[i].img+" /><span>"+blacklist[i].age+"</span></div></div><p>"+blacklist[i].myideal+"</p></div></div><div class='d_jiechu'>解除</div></div></div>")
				}
			}
			$(".d_jiechu").hide()
			$('.d_blacklist>div').on('touchstart',function(event){
				var touch = event.originalEvent.changedTouches[0];
				startX=touch.pageX;
			});
		    $(".d_blacklist>div").on("touchend",function(event){
		    	var move = $(this).index();
		    	var touch = event.originalEvent.changedTouches[0];
				endX=touch.pageX;
				if(startX > endX){
					var index=$(".d_blacklist>div").index(this)
					var sheuid=$(this).attr("title");
					$(".d_headimg").eq(index).hide();
					$(".d_jiechu").eq(index).show();
					$(".d_jiechu").eq(index).on("click",function(){
						console.log(index,3333)
						console.log(uid,sheuid,SL)
						$.ajax({
							type:"post",
							url:d_http+"index.php/Home/user/blacklist_update",
							data:{
								uid:uid,
								f_uid:sheuid,
								token:MD5(uid+sheuid+SL)
							},
							success:function(data){
								console.log(data)
								if(data.code==200){
									$(".d_box").eq(index).hide();
								}
							}
						});
					})
				}else if(startX < endX){
					var index=$(".d_blacklist>div").index(this)
					$(".d_headimg").eq(index).show();
					$(".d_jiechu").eq(index).hide()
				}
			})
		}
	});
	
})

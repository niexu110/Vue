/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$('#bottomSS').hide();$('#bottomS').hide();$('#bottomSSS').hide()
	$(".d_content2").hide()
	$(".d_content3").hide()
	var mydate1,mydate2,mydate3;
	var page1=0,page2=0,page3=0;
	mydate1=1;
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/issue_list",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			if(data.code==200){
				var list=data.data;
				for(var i in list){
					list[i].time=format(list[i].time).substr(0, 10) ;
     				if(list[i].status==0){
     					list[i].status="确认中"
     				}else if(list[i].status==1){
     					list[i].status="已同意"
     				}else if(list[i].status==2){
     					list[i].status="已拒绝"
     				}else if(list[i].status==3){
     					list[i].status="已完成"
     				}
     				if(list[i].type==1){
     					list[i].type="对方请客"
     				}else if(list[i].type==2){
     					list[i].type="AA制"
     				}
     				$(".d_content1>div").append("<div class='d_contentlist' title="+list[i].id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].image+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].goods_name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].address+"</span></div><p>"+list[i].time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span>["+list[i].type+"]</span><p>"+list[i].price+"元</p></div></div></div>")
				}
				$(".d_content1 .d_contentlist").on("click",function(){
					localStorage.setItem("goodid",$(this).attr("title"));
					window.location.href="inviteme.html"
				})
			}
		}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/issue",
		data:{
			uid:uid,
			type:2,
			token:MD5(uid+SL)
		},
		success:function(data){
			if(data.code==200){
				var list=data.data
				for(var i in list){
					list[i].mood_time=format(list[i].mood_time).substr(0, 10);
					if(list[i].status==0){
     					list[i].status="确认中"
     				}else if(list[i].status==1){
     					list[i].status="已同意"
     				}else if(list[i].status==2){
     					list[i].status="已完成"
     				}
     				if(list[i].type==1){
     					list[i].type="我请客"
     				}else if(list[i].type==2){
     					list[i].type="AA制"
     				}
     				$(".d_content2>div").append("<div class='d_contentlist' title="+list[i].id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].mobileimg+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].goods_name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].address+"</span></div><p>"+list[i].mood_time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span>["+list[i].type+"]</span><p>"+list[i].money+"元</p></div></div></div>")
				}
				$(".d_content2 .d_contentlist").on("click",function(){
					localStorage.setItem("mygoodid",$(this).attr("title"));
					window.location.href="myissue.html"
				})
			}
		}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Engagement/issue",
		data:{
			uid:uid,
			type:3,
			token:MD5(uid+SL)
		},
		success:function(data){
			if(data.code==200){
				var list=data.data
				for(var i in list){
					list[i].time=format(list[i].time).substr(0, 10);
     				if(list[i].status==0){
     					list[i].status="已报名"
     				}else if(list[i].status==1){
     					list[i].status="已参加"
     				}
     				$(".d_content3>div").append("<div class='d_contentlist' title="+list[i].g_id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].images+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].site+"</span></div><p>"+list[i].time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span></span><p>"+list[i].price+"元</p></div></div></div>")
				}
				$(".d_content3 .d_contentlist").on("click",function(){
					localStorage.setItem("teamid",$(this).attr("title"));
					window.location.href="meteam.html"
				})
			}
		}
	});
	$(".d_navlist p").on("click",function(){
		$(this).addClass("d_navclass").siblings().removeClass("d_navclass");
		var index=$(".d_navlist p").index(this)
		$(".d_contentBox>div").eq(index).show().siblings().hide()
	})
	//点击导航栏
	$("#d_icp1").on("click",function(){
		mydate1=1;mydate2=0;mydate3=0;page2=0;page3=0;
	})
	$("#d_icp2").on("click",function(){
		mydate2=2;mydate1=0;mydate3=0;page1=0;page3=0;
	})
	$("#d_icp3").on("click",function(){
		mydate3=3;mydate2=0;mydate1=0;page2=0;page1=0;
	})
	//加载更多
	var clientH = Number(document.documentElement.clientHeight);
    var height5=Number($('#bottomS').height());//加载更多
    $(document).on('scroll',function(){
		if(mydate1==1){//邀请我的
			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			if(docH==clientH){
				docH=0
			}else{
				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			}
			var H5Top=parseInt($('#bottomS').offset().top+height5); //获取h5底部距离文档顶部的高度
			if(docH>=H5Top){
				$('#bottomS').show();$('#bottomSS').hide();$('#bottomSSS').hide()
				$('#bottomS').html('数据加载中......');
				page1++;
				$.ajax({
					type:"POST",
					url:d_http+"index.php/Home/Engagement/issue_list",
					data:{
						uid:uid,
						page:page1,
						token:MD5(uid+SL)
					},
					success:function(data){
						if(data.code==200){
							var list=data.data
							for(var i in list){
								list[i].time=format(list[i].time).substr(0, 10);
			     				if(list[i].status==0){
			     					list[i].status="确认中"
			     				}else if(list[i].status==1){
			     					list[i].status="已同意"
			     				}else if(list[i].status==2){
			     					list[i].status="已拒绝"
			     				}else if(list[i].status==3){
			     					list[i].status="已完成"
			     				}
			     				if(list[i].type==1){
			     					list[i].type="对方请客"
			     				}else if(list[i].type==2){
			     					list[i].type="AA制"
			     				}
			     				$(".d_content1>div").append("<div class='d_contentlist' title="+list[i].id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].image+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].goods_name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].address+"</span></div><p>"+list[i].time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span>["+list[i].type+"]</span><p>"+list[i].price+"元</p></div></div></div>")
							}
							$(".d_content1 .d_contentlist").on("click",function(){
								localStorage.setItem("goodid",$(this).attr("title"));
								window.location.href="inviteme.html"
							})
							H5Top=parseInt($('#bottomS').offset().top+height5);
						}else if(data.code==404){
							$('#bottomS').html('数据没有更多数据');
							setTimeout(function() {
								$('#bottomS').html('')
							}, 1500);
							return;
						}
					}
				})
			}
		}else if(mydate2==2){
			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			if(docH==clientH){
				docH=0
			}else{
				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			}
			var H5Top=parseInt($('#bottomSS').offset().top+height5); //获取h5底部距离文档顶部的高度
			if(docH>=H5Top){
				$('#bottomSS').show();$('#bottomS').hide();$('#bottomSSS').hide()
				$('#bottomSS').html('数据加载中......');
				page2++;
				$.ajax({
					type:"POST",
					url:d_http+"index.php/Home/Engagement/issue_list",
					data:{
						uid:uid,
						type:2,
						page:page2,
						token:MD5(uid+SL)
					},
					success:function(data){
						if(data.code==200){
							var list=data.data
							for(var i in list){
								list[i].add_time=format(list[i].mood_time).substr(0, 10);
			     				if(list[i].status==0){
			     					list[i].status="确认中"
			     				}else if(list[i].status==1){
			     					list[i].status="已同意"
			     				}else if(list[i].status==2){
			     					list[i].status="已完成"
			     				}
			     				if(list[i].type==1){
			     					list[i].type="我请客"
			     				}else if(list[i].type==2){
			     					list[i].type="AA制"
			     				}
			     				$(".d_content2>div").append("<div class='d_contentlist' title="+list[i].id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].mobileimg+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].goods_name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].address+"</span></div><p>"+list[i].mood_time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span>["+list[i].type+"]</span><p>"+list[i].money+"元</p></div></div></div>")
							}
							$(".d_content2 .d_contentlist").on("click",function(){
								localStorage.setItem("mygoodid",$(this).attr("title"));
								window.location.href="myissue.html"
							})
							H5Top=parseInt($('#bottomSS').offset().top+height5);
						}else if(data.code==404){
							$('#bottomSS').html('数据没有更多数据');
							setTimeout(function() {
								$('#bottomSS').html('')
							}, 1500);
							return;
						}
					}
				})
			}
		}else if(mydate3==3){
			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			if(docH==clientH){
				docH=0
			}else{
				docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
			}
			var H5Top=parseInt($('#bottomSSS').offset().top+height5); //获取h5底部距离文档顶部的高度
			if(docH>=H5Top){
				$('#bottomSSS').show();$('#bottomS').hide();$('#bottomSS').hide()
				$('#bottomSSS').html('数据加载中......');
				page3++;
				$.ajax({
					type:"POST",
					url:d_http+"index.php/Home/Engagement/issue",
					data:{
						uid:uid,
						type:3,
						page:page3,
						token:MD5(uid+SL)
					},
					success:function(data){
						if(data.code==200){
							var list=data.data
							for(var i in list){
								list[i].time=format(list[i].time).substr(0, 10);
			     				if(list[i].status==0){
			     					list[i].status="已报名"
			     				}else if(list[i].status==1){
			     					list[i].status="已参加"
			     				}
			     				$(".d_content3>div").append("<div class='d_contentlist' title="+list[i].g_id+"><div class='d_goodimgbox'><img class='d_goodimg' src="+list[i].images+" /></div><div class='d_content'><div class='d_contentleft'><h3>"+list[i].name+"</h3><div class='d_map'><img src='../../img/icon/d_map.png'/><span>"+list[i].site+"</span></div><p>"+list[i].time+"</p></div><div class='d_contentright'><h3>"+list[i].status+"</h3><span></span><p>"+list[i].price+"元</p></div></div></div>")
							}
							$(".d_content3 .d_contentlist").on("click",function(){
								localStorage.setItem("teamid",$(this).attr("title"));
								window.location.href="meteam.html"
							})
							H5Top=parseInt($('#bottomSSS').offset().top+height5);
						}else if(data.code==404){
							$('#bottomSSS').html('数据没有更多数据');
							setTimeout(function() {
								$('#bottomSSS').html('')
							}, 1500);
							return;
						}
					}
				})
			}
		}
    })
    
})

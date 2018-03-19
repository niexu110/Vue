/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	var page=0;
	var page1=0;
	$(".d_contentbox2").show();
    $(".d_contentbox").hide();
    $.ajax({
			type:"POST",
			url:d_http+"index.php/Home/user/red_list",
			data:{
				uid:uid,
				type:1,
				page:page1,
				token:MD5(uid+SL)
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					var list=data.data;
						for(var i in list){
							list[i].times=format(list[i].times)
							if(list[i].m_type==2){
								list[i].title="红包";
							}else if(list[i].m_type==3){
								list[i].title="提现";
							}
							$(".d_content_1").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].title+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span style='color:#5793DD'>"+list[i].money+"元</span></div></div>")
						}
					$(".d_center").on("click",function(){
						location.href="withdraw.html?ss="+yuemoney
					})
				}
			}
				
		});
		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
	    var height5=Number($('#bottomS').height());//加载更多
	    $(document).on('scroll',function(){
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
					url:d_http+"index.php/Home/user/red_list",
					data:{
						uid:uid,
						type:1,
						page:page1,
						token:MD5(uid+SL)
					},
					success:function(data){
						if(data.code==200){
							var list=data.data;
								for(var i in list){
									list[i].times=format(list[i].times)
									if(list[i].m_type==2){
										list[i].title="红包";
									}else if(list[i].m_type==3){
										list[i].title="提现";
									}
									$(".d_content_1").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].title+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span style='color:#5793DD'>"+list[i].money+"元</span></div></div>")
								}
							$(".d_center").on("click",function(){
								location.href="withdraw.html?ss="+yuemoney
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
	    });
    $(".d_soulian").on("click",function(){
    	page=0;
    	$(".d_soulian").removeClass("d_phideclass");
    	$(".d_yue").addClass("d_phideclass");
    	$(".d_contentbox2").hide();
    	$(".d_contentbox").show();
    	$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Money/virtual",
			data:{
				uid:uid,
				type:'1',
				token:MD5(uid+SL),
				page:page
			},
			success:function(data){
				console.log(data)
				var list=data.data;
				for(var i in list){
					if(list[i].type==0){
						list[i].type="充值";
						list[i].money="+"+list[i].money;
					}else if(list[i].type==1){
						list[i].type="送礼物";
						list[i].money="-"+list[i].money;
					}else if(list[i].type==2){
						list[i].type="单约";
						list[i].money="-"+list[i].money;
					}else if(list[i].type==3){
						list[i].type="提现";
						list[i].money="-"+list[i].money;
					}
					$(".d_content").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].type+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span>"+list[i].money+"搜恋币</span></div></div>")
				}
				
			}
		});
		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
	    var height5=Number($('#bottomS').height());//加载更多
	    $(document).on('scroll',function(){
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
				page++;
				$.ajax({
					type:"POST",
					url:d_http+"index.php/Home/Money/virtual",
					data:{
						uid:uid,
						page:page,
						token:MD5(uid+SL)
					},
					success:function(data){
						if(data.code==200){
							var list=data.data;
							for(var i in list){
								if(list[i].type==0){
									list[i].type="充值";
									list[i].money="+"+list[i].money;
								}else if(list[i].type==1){
									list[i].type="团约";
									list[i].money="-"+list[i].money;
								}else if(list[i].type==2){
									list[i].type="单约";
									list[i].money="-"+list[i].money;
								}else if(list[i].type==3){
									list[i].type="提现";
									list[i].money="-"+list[i].money;
								}
								$(".d_content").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].type+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span>"+list[i].money+"搜恋币</span></div></div>")
							}
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
	    });
    })
    $(".d_yue").on("click",function(){
    	page=0;
    	$(".d_yue").removeClass("d_phideclass");
    	$(".d_soulian").addClass("d_phideclass");
    	$(".d_contentbox2").show();
    	$(".d_contentbox").hide();
    	
    })
})
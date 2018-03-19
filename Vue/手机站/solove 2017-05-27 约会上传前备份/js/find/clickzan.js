$(function(){
	var page=0;
	var URL = document.location.toString();
	var id = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/article/prise_detail",
		data: {
         	id:id,
         	page:page,
            token:MD5(id+SL)
     	},
     	success:function(data){
     		var list=data.data;
     		for(var i in list){
     			if(list[i].sex==1){
     					list[i].img='../../img/icon/x_boy_icon.png'
     				}else if(list[i].sex==2){
     					list[i].img='../../img/icon/x_girl_icon.png';
     				}
     				if(list[i].image=="" || list[i].image==undefined){
     					list[i].image="../../img/icon/d_head.png"
     				}
     			$(".d_content").append("<div class='d_goodF d_goodFlist'><img title="+list[i].prise_uid+" class='d_headimg' src="+list[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+list[i].nickname+"</h2><div class='d_agesex'><img src="+list[i].img+" /><span>"+list[i].age+"</span></div></div><p>"+list[i].myideal+"</p></div></div></div>")
     		}
     		$(".d_headimg").on("click",function(){
     				location.href="../../src/find/personalcarte.html?id="+$(this).attr("title")
     		})
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
			$('#bottomS').show();
			$(".d_inpbox").hide();
			$(".d_inpbox2").hide();
			$('#bottomS').html('数据加载中......');
			page++;
			$.ajax({
				type:"POST",
				url:d_http+"index.php/Home/article/prise_detail",
				data: {
		         	id:id,
		         	page:page,
		            token:MD5(id+SL)
		     	},
				success:function(data){
					if(data.code==200){
						var pinglunlist=data.data;
						for(var i in pinglunlist){
							pinglunlist[i].time=format(pinglunlist[i].time);
							if(pinglunlist[i].sex==1){
								pinglunlist[i].seximg="../../img/icon/x_boy_icon.png";
							}else if(pinglunlist[i].sex==1){
								pinglunlist[i].seximg="../../img/icon/x_girl_icon.png";
							}
							if(pinglunlist[i].avatar=="" || pinglunlist[i].avatar==undefined){
				            	pinglunlist[i].avatar="../../img/icon/d_head.png"
				            }
							$(".d_centerBox").append("<div class='d_centerson' title="+pinglunlist[i].uid+" name="+pinglunlist[i].u_nickname+"><div class='d_centersonleft'><img src="+pinglunlist[i].avatar+" /></div><div class='d_centersonright'><div class='d_centertop'><div class='d_centertoptop'><p class='d_ptitle'>"+pinglunlist[i].u_nickname+"</p><div class='d_chame'><div class='d_sexagetwo'><img src="+pinglunlist[i].seximg+" /><p>"+pinglunlist[i].age+"</p></div><p class='d_ptwo'>魅力值："+pinglunlist[i].charm+"</p></div></div><p class='d_ptime'>"+pinglunlist[i].time+"</p></div><div class='d_pliuyan'>"+pinglunlist[i].content+"</div></div></div>")
						}
						//点击人员回复
						$(".d_centerBox>.d_centerson").on("click",function(){
							var by_uid=$(this).attr("title");
							var nickname=$(this).attr("name");
							$(".d_inpbox2").show()
							$(".d_inpbox").hide();
							$(".d_input2").attr("placeholder","回复  "+$(this).attr('name')+":");
							$(".d_inpbox2 p").on("click",function(){
								if($(".d_input2").val()==""){
									$(".d_popupbox").html("请输入你的回复内容")
					     			setTimeout(show,500)
					     			setTimeout(hide,3000)
								}else{
									$.ajax({
										type:"post",
										url:d_http+"index.php/Home/Article/comment",
										data:{
											id:id,
											uid:uid,
											by_uid:by_uid,
											content:$(".d_input2").val()
										},
										success:function(data){
											if(data.code=200){
												d_comment=Number(d_comment+1);
												$(".d_comment").html(d_comment);
												$.ajax({
													type:"POST",
													url:d_http+"index.php/Home/User/userindex",
													data: {
											         	uid:uid,
											            token:MD5(uid+SL)
											     	},
											        success: function(data){
											        	if(data.code=200){
											        		var mypage=data.data
											        		if(mypage.image=="" || mypage.image==undefined){
												            	mypage.image="../../img/icon/d_head.png"
												            }
											        		if(mypage.sex==1){
																mypage.seximg="../../img/icon/x_boy_icon.png";
															}else if(mypage.sex==1){
																mypage.seximg="../../img/icon/x_girl_icon.png";
															}
											        		var d_time=str;
											        		$(".d_centerBox").append("<div class='d_centerson'><div class='d_centersonleft'><img src="+mypage.image+" /></div><div class='d_centersonright'><div class='d_centertop'><div class='d_centertoptop'><p class='d_ptitle'>"+mypage.nickname+"</p><div class='d_chame'><div class='d_sexagetwo'><img src="+mypage.seximg+" /><p>"+mypage.age+"</p></div><p class='d_ptwo'>魅力值："+mypage.charm+"</p></div></div><p class='d_ptime'>"+d_time+"</p></div><div class='d_pliuyan'>"+$('.d_input').val()+"</div></div></div>")
												            
											        	}
											            
											        }
												});
											}
										}
									});
								}
							})	
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
    })
})

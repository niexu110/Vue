var myDate = new Date();
		var str = "";
		str = str+myDate.getFullYear()+"-";
		str = str+Number(myDate.getMonth()+1)+"-";
		str = str+myDate.getDate();
		str = str+" "+myDate.getHours()+":";
		str = str+myDate.getMinutes()+":";
		str = str+myDate.getSeconds();
$(function(){
	var uid=localStorage.getItem("uid");
	var nickimg="";
	var d_option=0;
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
				nickimg=mypage.image;
        	}
        }
	});
	var imgData=[];
	var src=[];
	var image=new Image();
	var startX=0;
	var thisheight=$(window).height();
	var thiswidth=$(window).width();
	var URL = document.location.toString();
	var id = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	var page=0;
	var d_comment=0;
	$(".d_inpbox").hide();
	$(".d_inpbox2").hide();
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home/Article/condition_detail",
		data:{
			id:id,
			uid:uid
		},
		success:function(data){
			if(data.code==200){
				$(".d_headsrc").attr("src",data.data.image);
				$('.d_headsrc').on('click',function(){
					location.href='../../src/find/personalcarte.html?id='+data.data.uid
				})
				$(".d_topcenter>h2").html(data.data.nickname);
				$(".d_sexage>p").html(data.data.age);
				if(data.data.sex==1){
					$(".d_sexage>img").attr("src","../../img/icon/x_boy_icon.png");
					$(".d_sexage").css("backgroundColor","#5a98e4")
				}else if(data.data.sex==2){
					$(".d_sexage>img").attr("src","../../img/icon/x_girl_icon.png");
				}
				$(".d_meili>span").html(data.data.charm);
				data.data.time=format(data.data.time);
				$(".d_fbtime").html(data.data.time);
				$(".d_statetext").html(data.data.title);
				$(".d_address").html(data.data.address);
				var imglist,len;
				imglist=data.data.images;
				len=imglist.length;
				for(var i in imglist){
					$(".d_imgarr").append("<img src="+imglist[i]+"/photos />")
					if(imglist.length==1){
						$(".d_imgarr img").css("width","3.6rem")
						$(".d_imgarr img").css("height","3.6rem")
					}else{
						$(".d_imgarr img").css("width","1.8rem")
						$(".d_imgarr img").css("height","1.8rem")
						$(".d_imgarr img").css("margin","0.05rem")
						if(imglist.length==2 || imglist.length==4){
							$(".d_imgarr img").css("margin","0.08rem")
						}
					}
					src.push(imglist[i]);
					image.src=imglist[i];
					imgData.push('{"width:"'+image.width+'",height:"'+image.height+'}');
				}
				src=imglist
				$(".d_imgarr img").on("click",function(){
	            	var clientW=document.documentElement.clientWidth|document.body.width;
					var $w=$('.showImg').width();
					var index=$(this).index();
			    	$('.mask').show();
			    	$('.showImg').show();
			    	$('.showImg>ul').width(imgData.length*clientW).css('left',-index*$w);
			    	for(var j=0;j<src.length;j++){
			    		$('.showImg>ul').append('<li><img src="'+src[j]+'"></li>');
			    	}
			    	$('.showImg>ul').on('touchstart',function(event){
			    		var touch = event.originalEvent.changedTouches[0];
			    		startX=touch.pageX;
			    	});
			    	$('.showImg>ul').on('touchend',function(event){
			    		var touch = event.originalEvent.changedTouches[0];
			    		x=touch.pageX;
			    		var left=$('.showImg>ul').position().left;
			    		//左
			    		if(x>startX){
			    			if(index==0){
			    				index=0;
			    				$('.showImg>ul').css({'left':0})
			    			}else{
			    				index--;
			    				$('.showImg>ul').stop().animate({'left':left+$w},800);
			    			}
			    		}
			    		//右
			    		if(x<startX){
			    			if(index>=len-1){
			    				index=len-1;
			    				$('.showImg>ul').css({'left':-(len-1)*$w});
			    			}else{
			    				index++;
			    				$('.showImg>ul').stop().animate({'left':left-$w},800);
			    			}
			    			
			    		}
			    	});
			    	$('.showImg>ul>li').on('click',function(){
			    		$('.mask').hide();
			    		$('.showImg').hide(500);
			    	})	
			    });
				$(".d_give").html(data.data.give);
				$(".d_read").html(data.data.read);
				d_comment=data.data.comment;
				d_comment=Number(d_comment)
				$(".d_comment").html(d_comment);
				var userimg=data.data.pirse_list;
				for(var i in userimg){
					if(userimg[i].image=="" || userimg[i].image==undefined){
		            	userimg[i].image="../../img/icon/d_head.png"
		            }
					$(".d_pheadimgcenter").append("<img src="+userimg[i].image+" />")
				}
				var zannum=userimg.length
				$(".d_pheadimgleft>span").html(zannum);
				//点赞判断
				if(data.data.like==0){
					$(".d_zankong").attr("src","../../img/icon/d_zankong.png");
				}else if(data.data.like==1){
					$(".d_zankong").attr("src","../../img/icon/d_zanshi.png");
				}
				//点赞
				$(".d_zankong").on("click",function(){
					$.ajax({
						type:"post",
						url:d_http+"index.php/Home/Article/condition_like",
						data:{
							uid:uid,
							id:id
						},
						success:function(data){
							if(data.code==200){
								if(data.data==1){
									$(".d_zankong").attr("src","../../img/icon/d_zanshi.png");
									$(".d_pheadimgcenter").append("<img src="+nickimg+" />");
									d_option=1;
									zannum=zannum+1;
									$(".d_pheadimgleft>span").html(zannum);
									$(".d_give").html(zannum);
								}else if(data.data==0){
									$(".d_zankong").attr("src","../../img/icon/d_zankong.png");
									for(var i in userimg){
										if(userimg[i].prise_uid==uid && d_option==0){
											$(".d_pheadimgcenter>img").eq(i).remove();
										}
									}
									if(d_option==1){
										$(".d_pheadimgcenter>img").eq($(".d_pheadimgcenter>img").length-1).remove();
									}
									zannum=zannum-1;
									$(".d_pheadimgleft>span").html(zannum);
									$(".d_give").html(zannum)
								}
							}
						}
					});
				});
				$(".d_pheadimgcenter").on("click",function(){
					if($(".d_pheadimgcenter>img").length==0){
						return;
					}else{
						location.href="clickzan.html?wuid="+id
					}
				})
			}
		}
	});
	//评论列表
	$.ajax({
		type:"post",
		url:d_http+"index.php/Home/Article/comment_list",
		data:{
			id:id,
			page:page
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
					if(pinglunlist[i].type==2){
						pinglunlist[i].content="回复  "+pinglunlist[i].by_nickname+":"+pinglunlist[i].content;
					}else if(pinglunlist[i].type==1){
						pinglunlist[i].content=pinglunlist[i].content;
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
									        		$(".d_centerBox").append("<div class='d_centerson'><div class='d_centersonleft'><img src="+mypage.image+" /></div><div class='d_centersonright'><div class='d_centertop'><div class='d_centertoptop'><p class='d_ptitle'>"+mypage.nickname+"</p><div class='d_chame'><div class='d_sexagetwo'><img src="+mypage.seximg+" /><p>"+mypage.age+"</p></div><p class='d_ptwo'>魅力值："+mypage.charm+"</p></div></div><p class='d_ptime'>"+d_time+"</p></div><div class='d_pliuyan'>"+$('.d_input2').val()+"</div></div></div>");
									        	}
									        }
										});
									}
								}
							});
						}
					})	
				})
			}else{
				$(".d_popupbox").html(data.massage)
     			setTimeout(show,500)
     			setTimeout(hide,3000)
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
			$('#bottomS').show();
			// $(".d_inpbox").hide();
			// $(".d_inpbox2").hide();
			$('#bottomS').html('数据加载中......');
			page++;
			$.ajax({
				type:"post",
				url:d_http+"index.php/Home/Article/comment_list",
				data:{
					id:id,
					page:page
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
											if(data.code==200){
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
											        	if(data.code==200){
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
	//点击评论
	$(".d_pinglun").on("click",function(){
		$(".d_inpbox").show()
		$(".d_inpbox2").hide();
		$(".d_inpbox p").on("click",function(){
			if($(".d_input").val()==""){
				$(".d_popupbox").html("请输入你的评论")
     			setTimeout(show,500)
     			setTimeout(hide,3000)
			}else{
				$.ajax({
					type:"post",
					url:d_http+"index.php/Home/Article/comment",
					data:{
						id:id,
						uid:uid,
						content:$(".d_input").val()
					},
					success:function(data){
						if(data.code==200){
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
						        	if(data.code==200){
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
						        		$(".d_centerBox").append("<div class='d_centerson'><div class='d_centersonleft'><img src="+mypage.image+" /></div><div class='d_centersonright'><div class='d_centertop'><div class='d_centertoptop'><p class='d_ptitle'>"+mypage.nickname+"</p><div class='d_chame'><div class='d_sexagetwo'><img src="+mypage.seximg+" /><p>"+mypage.age+"</p></div><p class='d_ptwo'>魅力值："+mypage.charm+"</p></div></div><p class='d_ptime'>"+d_time+"</p></div><div class='d_pliuyan'>"+$('.d_input').val()+"</div></div></div>");
						        		$(".d_input").val('');
							            
						        	}
						            
						        }
							});
						}
					}
				});
			}
		})
	});
})

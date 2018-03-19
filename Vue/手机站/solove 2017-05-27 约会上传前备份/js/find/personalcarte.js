//弹框隐藏
	$(".d_bgcolor").hide();
window.onload=function(){
	//根据地址获取用户uid
	var url=document.location.toString()
    var userObj=JSON.parse(localStorage.getItem('userData'));
	var dataId=url.substring(url.indexOf('=')+1,url.length);
	var uid=localStorage.getItem('uid');
	var yes=localStorage.getItem("yes");
	if(dataId+"0"==yes){
		$(".datingBtn").hide()
	}
	var fid=null;
	if(dataId==localStorage.getItem('uid')){
		$('.foot').hide();
		$('.SL_nav span').hide();	
	}
	//请求数据
	$.ajax({
		type:'post',
		url:d_http+'index.php/Home/User/personage_li',
		data:{
			uid:dataId,
			k_uid:uid,
			token:MD5(dataId+SL)
		},
		success:function(data){
			var nickname=data.data.nickname;
			if(data.code==200){
				$('.SL_nav em').text(data.data.nickname);
				$('.nick>s').html(nickname);
				if(data.data.image==null||data.data.image==''){
					data.data.image='../../img/icon/d_head.png';
				}else{
					data.data.image=data.data.image;
				}
				$('#userImg').attr('src',data.data.image);
				$('.userImg').attr('src',data.data.image);
				$('#concern').html(data.data.count);//关注改变
				$('#glamour').html(data.data.charm);
				$('#credit').html(85); //信用值固定500
				$('#age').html(data.data.age);
				$('#constellation').html(data.data.constellation);
				$('#idiograph').html(data.data.myideal);
				$('#job').html(data.data.job);
				$('#address').html(data.data.citys);
				$('#marrys').html(data.data.marry);
				$('#income').html(data.data.income+'/月');
				$('#height').html(data.data.height+'cm');
				$('#weight').html(data.data.weight+'kg');
				$('#nation').html(data.data.nation);
				$('#belief').html(data.data.belief);
				if(data.data.myhobby!=undefined){
					for(var k=0;k<data.data.myhobby.length;k++){
						$('#hobby').append(data.data.myhobby[k]+'  ')
					}
				}
				
				$('#count').html(data.data.gift);
				$('#support').attr('alt',data.data.likes);
				$('.trendLeft span').html(data.data.condition);
				$('.trendRight p').html(data.data.condition_first.title);
				//判断动态有无图片
				if(data.data.condition_first.images.length==0){
					$('.first').hide();
					$('.trendRight p').css({
						width:'4.4rem',
						top:'1.7rem',
						left:'.8rem'
					});
					$('.trendRight').css({
						'overflow':'visible'
					});
					$('.trendRight .tright').css({
						top:'1.3rem'
					})
				}else{
					$('.first').attr('src',data.data.condition_first.images[0]+'/photos');
					$('.trendRight p').css({
						width:'2.6rem'
					});

				}
				if(data.data.likes==0){
					$('#support').attr('src','../../img/icon/x_addconcern_icon.png');
				}else if(data.data.likes==1){
					$('#support').attr('src','../../img/icon/x_addconcern_icons.png');
				}
				
				var likes=$('#support').attr('alt');
				var counts=parseInt($('#concern').html());
				//点击关注
				$('#support').on('click',function(){
					if(localStorage.getItem('uid')==null){
						localStorage.setItem('url',location.href);
						location.href='../../src/login/login.html';
					}else{
						if(likes==0){
							$.ajax({
								type:'post',
								url:d_http+'index.php/Home/User/xilist',
								data:{
									uid:localStorage.getItem('uid'),
									d_uid:dataId,
									token:MD5(localStorage.getItem('uid')+dataId+SL)
								},
								success:function(data){
									if(data.code==200){
										$('#support').attr('src','../../img/icon/x_addconcern_icons.png');
										counts++;
										likes=1;
										$('#concern').html(counts);
										$('#support').attr('alt',likes);
										$('.blackResult').html(data.massage).show();
										setTimeout(function(){
											$('.blackResult').hide().html('');
										},1500);
									}
								}
							});
						}else{
							$.ajax({
								type:'post',
								url:d_http+'index.php/Home/User/xilist',
								data:{
									uid:localStorage.getItem('uid'),
									d_uid:dataId,
									token:MD5(localStorage.getItem('uid')+dataId+SL)
								},
								success:function(data){
									if(data.code==200){
										$('#support').attr('src','../../img/icon/x_addconcern_icon.png');
										if(counts<=0){
											counts=0;
										}else{
											counts--;
										}
										$('#concern').html(counts);
										likes=0;
										$('#support').attr('alt',likes);
										$('.blackResult').html(data.massage).show();
										setTimeout(function(){
											$('.blackResult').hide().html('');
										},1500);
									}
								}
							});
						}
					}
				});

				$('#x_href').on('click',function(){
					if(dataId==localStorage.getItem('uid')){
						if(data.data.old_uid==0){
							location.href='../../src/myself/identity.html'
						}
					}
				})

				if(data.data.marry==''){
					$('#marry').html('未知');
				}else{
					$('#marry').html(data.data.marry)
				}
				if(data.data.sex=="男"){
					$('.ageasterism').find('span').css({'background':'#5793dd'});
					$('#userSex').attr('src','../../img/icon/x_boy_icon.png');
					if(data.data.old_uid==0){
						$('#approveimg').attr('src','../../img/icon/x_approve_icon.png');
						$('#approve>a>i').html('身份未认证');
					}else{
						$('#approveimg').attr('src','../../img/icon/x_boyapprove_icon.png');
						$('#approve>a>i').html('身份已认证');
					}
					
				}else{
					$('.ageasterism').find('span').css({'background':'#feaabe'})
					$('#userSex').attr('src','../../img/icon/x_girl_icon.png');
					if(data.data.old_uid==0){
						$('#approveimg').attr('src','../../img/icon/x_approve_icon.png');
						$('#approve>a>i').html('身份未认证');
					}else{
						$('#approveimg').attr('src','../../img/icon/x_girlapprove_icon.png');
						$('#approve>a>i').html('身份已认证');
					}
				}
				if(dataId==localStorage.getItem('uid')){
					$('.albumPhotos>h3').html('我的相册');
					$('.trendLeft>h3').html('我的动态');
					$('.approve>span').html('我的认证');
					$('.gift>h2>span').html('我收到的礼物');
					$('.lovetype>h3').html('我喜欢的异性类型');
					$('.gift').on('click',function(){
						location.href="../../src/myself/gift.html";
					})
				}else{
					$('.gift').on('click',function(){
						localStorage.setItem('nickname',data.data.nickname);
						localStorage.setItem('datauid',dataId);
						localStorage.setItem('userimg',data.data.image);
						location.href="../../src/find/givepresent.html";
					})
					if(data.data.sex=='男'){
						
						$('.albumPhotos>h3').html('他的相册');
						$('.trendLeft>h3').html('他的动态');
						$('.approve>span').html('他的认证');
						$('.gift>h2>span').html('他收到的礼物');
						$('.lovetype>h3').html('他喜欢的异性类型');
					}else{
						
						$('.albumPhotos>h3').html('她的相册');
						$('.trendLeft>h3').html('她的动态');
						$('.approve>span').html('她的认证');
						$('.gift>h2>span').html('她收到的礼物');
						$('.lovetype>h3').html('她喜欢的异性类型');
					}
				}
				//点击查看大图
				var imgSrc=[];
				var lens,indexs;
				var colse=true;
				var len=data.data.xiangce.length;
				if(len>=12){len=12;}
				for(var i=0;i<len;i++){
					$('#album').append('<li><img src="'+data.data.xiangce[i].images+'/photo"></li>');
					imgSrc.push(data.data.xiangce[i].images);
				}
				$('#album li').on('click',function(){
					var startX=0;
					var $w=$('.showImg').width();	
					$('.mask').show();
				    $('.showImg').show();
					lens=$(this).parent().find('img').length;
					indexs=$(this).index();
					// $(this).parent().find('img').each(function(){
					// 	imgSrc.push($(this).attr('src'));
					// });
					$('.showImg ul').width(imgSrc.length*$w).css('left',-indexs*$w);
					for(var i=0;i<lens;i++){
						$('.showImg ul').append('<li><img src="'+imgSrc[i]+'"></li>');
					}
					$('.showImg ul').on('touchstart',function(event){
			    		var touch = event.originalEvent.changedTouches[0];
			    		startX=touch.pageX;
			    	});
			    	$('.showImg ul').on('touchend',function(event){
			    		var touch = event.originalEvent.changedTouches[0];
			    		endX=touch.pageX;
			    		var left=$('.showImg ul').position().left; 
			    		if(endX>startX){
			    			if(indexs==0){
			    				indexs=0;
			    				$('.showImg ul').css({'left':0})
			    			}else{
			    				if(colse){
			    					colse=false;
			    					$('.showImg ul').animate({'left':left+$w},800,function(){
				    					left=$('.showImg ul').position().left;
				    					colse=true;
				    					if(indexs==0){
						    				indexs=0;
						    				$('.showImg ul').css({'left':0})
						    			}else{
				    						indexs--;
						    			}
				    				});
			    				}
			    			}	
			    		}
			    		if(endX<startX){
			    			if(indexs==lens-1){
			    				indexs=lens-1;
			    				$('.showImg ul').css({'left':-(lens-1)*$w});
			    			}else{
			    				if(colse){
			    					colse=false;
			    					$('.showImg ul').stop().animate({'left':left-$w},800,function(){
				    					left=$('.showImg ul').position().left;
				    					colse=true;
				    					if(indexs==lens-1){
						    				indexs=lens-1;
						    				$('.showImg ul').css({'left':-(lens-1)*$w});
						    			}else{
						    				indexs++;
						    			}
				    				});
			    				}
			    			}	
			    		}
			    	});
				});
				// 隐藏
				$('.showImg ul li').on('click',function(){
					$('.mask').hide();
					$('.showImg').hide(500);
					$('.showImg ul').html('');
					$('.showImg ul').width('0px').css('left','0px'); 
					lens=0;
				});	
				$('.showImg').on('click',function(){
					$('.mask').hide();
					$('.showImg').hide(500);
					$('.showImg ul').html('');
					$('.showImg ul').width('0px').css('left','0px'); 
					lens=0;
				});	
				$('.mask').on('click',function(){
					$('.mask').hide();
					$('.showImg').hide(500);
					$('.showImg ul').html('');
					$('.showImg ul').width('0px').css('left','0px');
					lens=0;
				});	
				//兴趣爱好
				for(var j=0;j<data.data.interest.length;j++){
					$('.lovetype>div>ul').append('<li>'+data.data.interest[j]+'</li>')
				}
				//赠送礼物
				$('#gift').on('click',function(){
					localStorage.setItem('nickname',data.data.nickname);
					localStorage.setItem('datauid',dataId);
					localStorage.setItem('userimg',data.data.image+'/head');
					if(userObj==null){
						localStorage.setItem('url',location.href);
						location.href="../../src/login/login.html";
					}else{
						location.href="givepresent.html";
					}
				});
				//约会
				$("#appointment").click(function(){
					 if(userObj==null){
					 	localStorage.setItem('url',location.href);
            location.href="../../src/login/login.html";
					 }else{
            localStorage.setItem('n_nickname',data.data.nickname);
            localStorage.setItem('n_sex',data.data.sex);
            localStorage.setItem('n_datauid',dataId);
            localStorage.setItem('n_userimg',data.data.image);
            location.href="singleDate.html"
           }
				})
				//红娘咨询
				$('#hongniang').on('click',function(){
					location.href='matchmaker.html'
				});
				//加好友
				$(".addP").click(function(){
                    if(userObj==null){
                    	localStorage.setItem('url',location.href);
                        location.href="../../src/login/login.html";
                    }else{
                       fid=userObj.uid;
                       $.ajax({
                       	  type:"POST",
						  url :d_http+"index.php/Home/User/firends",
						  data: {
                                  uid:dataId,
                                  f_uid:fid,
                                  token:MD5(dataId+fid+SL)
                              },
						 success:function(data){
							 	if(data.code==200){
							 		$("#RE_fixeds h2").text(data.massage);
							 		$("#RE_fixeds span").html('√');
		                             $("#RE_fixeds").show();
		                             setTimeout(function(){
		                                 $("#RE_fixeds").fadeOut();
		                             },1000)
							 	}else{
							 		$("#RE_fixeds h2").text(data.massage);
							 		$("#RE_fixeds span").html('&times;');
		                            $("#RE_fixeds").show();
		                             setTimeout(function(){
		                                 $("#RE_fixeds").fadeOut();
		                             },1000)
							 	}
						    }
					   });
					}
				});
				//点击他的动态
				$('.trend').on('click',function(){
					if(uid==null){
						localStorage.setItem('url',location.href);
						location.href='../../src/login/login.html'
					}else{
						location.href='../../src/find/firendDynamic.html?uid='+dataId;
					}
				});
			}
		}
	});
	//右上角举报
	$('.SL_nav span').on('click',function(){
		$('.mask').show();
		$('.report').fadeIn(600);
		$('.report>a').attr('href','report.html?ruid='+dataId);
	});
	//拉黑
	$('.black').on('click',function(){
		$('.report').fadeOut(600);
		$('.blackSure').show();
	});
	// 取消拉黑
	$('.noSure').on('click',function(){
		$('.mask').hide();
		$('.report').fadeOut(600);
		$('.blackSure').hide();
	});
	//确定拉黑
	$('.sure').on('click',function(){
		$.ajax({
			type: 'post',
			url: d_http+'index.php/Home/User/blacklist_add',
			data: {
				uid:uid,
				f_uid:dataId,
				token:MD5(uid+dataId+SL)
			},
			success:function(data){
				if(data.code==200){
					$('.mask').hide();
					$('.blackSure').hide();
					$('.blackResult').html(data.massage).show();
					setTimeout(function(){
						$('.blackResult').hide().html('');
					},1500);
				}else{
					$('.mask').hide();
					$('.blackSure').hide();
					$('.blackResult').html(data.massage).show();
					setTimeout(function(){
						$('.blackResult').hide().html('');
					},1500);
				}
			}
		});
		
	});
	//点击取消举报
	$('.cancel').on('click',function(){
		$('.mask').hide();
		$('.report').fadeOut(600);
	});
	$('.mask').on('click',function(){
		$('.mask').hide();
		$('.report').fadeOut(600);
	});
	var top=$('.nick').offset().top; //昵称距离顶部高度
	var nickH=$('.nick').height()/2; //昵称元素的高度一半
	var headH=$('.SL_nav').height()/2;
	var total=parseInt(top+nickH-headH);
	$(document).scroll(function(event) {
		var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop);
		if(docH<total){
			$('.SL_nav>i').html('');
			$('.SL_nav').css({
				background:'none'
			});
			$('.SL_nav>a>img').attr('src','../../img/icon/x_leftWhite_icon.png');
			$('.SL_nav>span').css({
				'background-image':'url(../../img/icon/x_black_icon.png)'
			});
		}else if(docH>=total){
			$('.SL_nav').css({
				background:'#f9f9f9'
			});
			$('.SL_nav>i').html($('.nick>s').html());
			$('.SL_nav>a>img').attr('src','../../img/icon/d_leftboult.png');
			$('.SL_nav>span').css({
				'background-image':'url(../../img/icon/x_moreblack_icon.png)'
			});
		}
	});
	//点击我要和TA约见
	$(".datingBtn").on("click",function(){
		$(".d_bgcolor").show();
	});
	$('.d_menowant').on("click",function(){
		$(".d_bgcolor").hide();
	});
	$('.d_mewant').on("click",function(){
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/Soubrette/all_meet',
			data:{
				uid:uid,
				meet_uid:dataId,
				token:MD5(uid+SL)
			},
			success:function(data){
				if(data.code==200){
					$(".d_bgcolor").hide();
					$(".d_popupbox").html(data.massage)
	     			setTimeout(show,500)
	     			setTimeout(hide,2000)
				}
			}
		});	
	});
}
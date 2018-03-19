window.onload=function(){
	(function(){
        var map, geolocation,x,y;
        map = new AMap.Map('container', {
            resizeEnable: true
        });
        map.plugin('AMap.Geolocation', function() {
            geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,
                timeout: 10000,
                buttonOffset: new AMap.Pixel(10, 20),
                zoomToAccuracy: true
            });
            map.addControl(geolocation);
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', onComplete);
            AMap.event.addListener(geolocation, 'error', onError);
        });
        //解析定位结果
        function onComplete(data) {
            x=data.position.getLng()+'';
            y=data.position.getLat()+'';
            localStorage.setItem('x',x);
            localStorage.setItem('y',y);
            propose();
        }
        //解析定位错误信息
        function onError(data) {
            alert('定位失败');
        }

		localStorage.setItem("dataId", 1); //1---推荐；2---附近  3---恋圈
		if(localStorage.getItem("sex")==null){
			localStorage.setItem("sex",0);
		}
		if(localStorage.getItem("age")==null){
			localStorage.setItem("age","");
		}
		if(localStorage.getItem("height")==null){
			localStorage.setItem("height","");
		}
		if(localStorage.getItem("address")==null){
			localStorage.setItem("address","");
		}

		//请求banner数据
		$.ajax({
			type:'post',
			url:d_http+'/index.php/Home/Index/banner',
			data:{token:MD5(SL)},
			success:function(data){
				var bannerWidth=$('.banner').width();
				var len=data.data.length;
				$('.banner>ul').width(bannerWidth*len);
				for(var i=0;i<len;i++){
					$('.banner>ul').append('<li><a href="javascript:void(0);"><img src="'+data.data[i].images+'/shuffling" alt=""></a></li>');
					$('.banner>p').append('<span></span>');
				}
				$('.banner>p>span').eq(0).addClass('addBg');
				//banner轮播
				var index=0;
				setInterval(function(){
					if(index>=len){
						index=0;
						$('.banner>p>span').removeClass('addBg')
						$('.banner>p>span').eq(index).addClass('addBg');
						$('.banner>ul').css('left',0);
					}else{
						$('.banner>p>span').removeClass('addBg')
						$('.banner>p>span').eq(index).addClass('addBg');
						$('.banner>ul').css('left',-index*bannerWidth);
						index++;
					}	
				},3000);
			}
		});	
		var pages=0;
		var sexSrc='';
		var sexClass='';
		//请求推荐数据
		function propose(){
			if(localStorage.getItem("age")==''&&localStorage.getItem("height")==''&&localStorage.getItem("address")==''&&localStorage.getItem('sex')==0){
				$.ajax({
					type:'post',
					url:d_http+'/index.php/Home/Index/index',
					data:{
						x:x,
		             	y:y,
		             	token:MD5(x+y+SL)
					},
					success:function(data){
						if(data.code==200){
							pages+=1;
							var len=data.data.length;
							for (var i = 0; i< len; i++) {
								if(data.data[i].image==''){
									data.data[i].image='img/icon/d_head.png';
								}else{
									data.data[i].image=data.data[i].image+'/head';
								}
								if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

								}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
								}
								$('.proposePeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							}
						
						}else{return;}		
					}
				});
			}else{
				pages=0;
				$.ajax({
					type:'post',
					url:d_http+'/index.php/Home/Index/index',
					data:{
						x:x,
		             	y:y,
		             	token:MD5(x+y+SL),
		             	page:pages,
		             	sex:localStorage.getItem("sex"),
		             	age:localStorage.getItem("age"),
		             	height:localStorage.getItem("height"),
		             	citys:localStorage.getItem("address")
					},
					success:function(data){
						if(data.code==200){
							pages+=1;
							var len=data.data.length;
							for (var i = 0; i< len; i++) {
								if(data.data[i].image==''){
									data.data[i].image='img/icon/d_head.png';
								}else{
									data.data[i].image=data.data[i].image+'/head';
								}
								if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

								}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
								}
								$('.proposePeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							}
						}else{return;}		
					}
				});
			}
		}
		// 推荐加载更多
		function proposeMore(){
			if(localStorage.getItem("age")==''&&localStorage.getItem("height")==''&&localStorage.getItem("address")==''&&localStorage.getItem('sex')==0){
				$.ajax({
					type:'post',
					url:d_http+'/index.php/Home/Index/index',
					data:{
						x:x,
		             	y:y,
		             	token:MD5(x+y+SL),
		             	page:pages
					},
					success:function(data){
						if(data.code==200){
							pages+=1;
							var len=data.data.length;
							for (var i = 0; i< len; i++) {
								if(data.data[i].image==''){
									data.data[i].image='img/icon/d_head.png';
								}else{
									data.data[i].image=data.data[i].image+'/head';
								}
								if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

								}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
								}
								$('.proposePeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							}
							propse=true;
							$('#bottomS').html('');	
						}else{
							$('#bottomS').html('没有更多数据');
							setTimeout(function(){$('#bottomS').html('');},1000)
							propse=true;
						}
					}
				});
			}else{
				$.ajax({
					type:'post',
					url:d_http+'/index.php/Home/Index/index',
					data:{
						x:x,
		             	y:y,
		             	token:MD5(x+y+SL),
			            page:pages,
		             	sex:localStorage.getItem("sex"),
		             	age:localStorage.getItem("age"),
		             	height:localStorage.getItem("height"),
		             	citys:localStorage.getItem("address")
					},
					success:function(data){
						if(data.code==200){
							pages+=1;
							var len=data.data.length;
							for (var i = 0; i< len; i++) {
								if(data.data[i].image==''){
									data.data[i].image='img/icon/d_head.png';
								}else{
									data.data[i].image=data.data[i].image+'/head';
								}
								if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

								}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
								}
								$('.proposePeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="proposeLeft"><img src="'+data.data[i].image+'"></div><div class="proposeRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							}
							propse=true;
							$('#bottomS').html('');	
						}else{
							$('#bottomS').html('没有更多数据');
							propse=true;
							setTimeout(function(){$('#bottomS').html('');},1000)
						}
					}
				});
			}	
		}
		var page=0;
		//请求附近数据
		function nearby(){
			$.ajax({
				type:'post',
				url:d_http+'/index.php/Home/Index/nearby',
				data:{
					x:x,
	             	y:y,
	             	token:MD5(x+y+SL)
				},
				success:function(data){
					if(data.code==200){
						page+=1;
						var len=data.data.length;
						for (var i = 0; i< len; i++) {
							if(data.data[i].image==''){
								data.data[i].image='img/icon/d_head.png';
							}else{
								data.data[i].image=data.data[i].image+'/head';
							}
							if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

							}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
							}
							$('.nearbyPeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="nearLeft"><img src="'+data.data[i].image+'"></div><div class="nearRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
							
						}
					}else{return;}
					
				}
			})
		}
		// 附近加载更多
		function nearMore(){
			$.ajax({
				type:'post',
				url:d_http+'/index.php/Home/Index/nearby',
				data:{
					x:x,
	             	y:y,
	             	token:MD5(x+y+SL),
	             	page:page
				},
				success:function(data){
					if(data.code==200){
						page+=1;
						var len=data.data.length;
						for (var i = 0; i< len; i++) {
							if(data.data[i].image==''){
								data.data[i].image='img/icon/d_head.png';
							}else{
								data.data[i].image=data.data[i].image+'/head';
							}
							if(data.data[i].sex==2){
									sexSrc='img/icon/x_girl_icon.png';
									sexClass='girl';

							}else{
									sexSrc='img/icon/x_boy_icon.png';
									sexClass='boy';
							}
							$('.nearbyPeople>ul').append('<li><a  data-id="'+data.data[i].uid+'" href="src/find/personalcarte.html?dataId='+data.data[i].uid+'"><div class="nearLeft"><img src="'+data.data[i].image+'"></div><div class="nearRight"><h1>'+data.data[i].nickname+'<span>'+data.data[i].distance+'km</span></h1><p><span class="'+sexClass+'"><img src="'+sexSrc+'"><s>'+data.data[i].age+'</s></span><i>'+data.data[i].constellation+'</i><i>魅力值：'+data.data[i].charm+'</i></p><h6>'+data.data[i].myideal+'</h6></div></a></li>');
						}
						near=true;
						$('#bottom').html('');	
					}else{
						$('#bottom').html('没有更多数据');
						near=true;
						setTimeout(function(){$('#bottom').html('');},1000)
					}
				},
				error:function(){
						$('#bottom').html('加载失败');
						near=true;
				}
			});
		}
		var propse=true;
		var near=false;
		var lover=false;
		//点击推荐
		$('.prop').on('click',function(){
			$(this).addClass('color').find('s').show();
			$(this).siblings('p').removeClass('color');
			$('.nearby').hide();
			$('.lovely').hide();
			$('.nearbyPeople').hide();
			$('.proposePeople').show();
			$('.lovelys').hide();
			localStorage.setItem('dataId',1);
			document.documentElement.scrollTop=0;
			document.body.scrollTop=0;
			propse=true;
			near=false;	
		});

		// 点击附近
		$('.near').on('click',function(){
			$(this).addClass('color').find('s').show();
			$(this).siblings('p').removeClass('color');
			$('.propose').hide();
			$('.lovely').hide();
			$('.nearbyPeople').show();
			$('.proposePeople').hide();
			$('.lovelys').hide();
			localStorage.setItem('dataId',2);
			document.documentElement.scrollTop=0;
			document.body.scrollTop=0;	
			propse=false;
			near=true;
			nearby();
		});
		//点击恋圈
			$('.love').on('click',function(){
				$(this).addClass('color').find('s').show();
				$(this).siblings('p').removeClass('color');
				$('.propose').hide();
				$('.nearby').hide();
				$('.nearbyPeople').hide();
				$('.proposePeople').hide();
				$('.lovelys').show();
				$('.banner').hide();
				localStorage.setItem('dataId',3);
				document.documentElement.scrollTop=0;
				document.body.scrollTop=0;	
				propse=false;
				near=false;
				lover=true;
			})
		//点击筛选
		$('.headRight').on('click',function(){
			location.href='src/find/filter.html';
		});
		//加载更多
	    var clientH = Number(document.documentElement.clientHeight);
	    var height5=Number($('#bottomS').height());
	    $(document).on('scroll',function(){
	    	if(localStorage.getItem('dataId')==1){
	    		if(propse){
	    			//获取文档高度
	    			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
	    			var H5Top=parseInt($('#bottomS').offset().top+height5); //获取h5底部距离文档顶部的高度
	    			if(docH>=H5Top-10){
	    				propse=false;
	    				$('#bottomS').html('数据加载中......');
	    				proposeMore();
	    			}
	    		}

	    	}else if(localStorage.getItem('dataId')==2){
	    		if(near){
	    			//获取文档高度
	    			var docHs=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
	    			var H5Tops=parseInt($('#bottom').offset().top+height5); //获取h5底部距离文档顶部的高度
	    			if(docHs>=H5Tops){
	    				near=false;
	    				$('#bottom').html('数据加载中......');
						nearMore();
	    			}
	    		}
	    	}
	    });
	})();
}
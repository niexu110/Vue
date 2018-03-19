function show(){
	$(".d_popupbox").css("display","block")
}
function hide(){
	$(".d_popupbox").css("display","none")
}
$(function(){
	var fid;
	var uid = localStorage.getItem('uid');
	var hUid=location.href;
	hUid=hUid.substring(hUid.indexOf('=')+1,hUid.length)
	$.ajax({
		type:"post",
		url:d_http+"/index.php/Home/Index/user_red",
		data : {
			uid : uid,
			h_id : hUid
		},
		success : function(data){
			//判断红包是否是自己发出的
			if(uid == data.data.uid){
				$(".friend").remove();
			}
			$("header p").html(data.data.nickname);
			if(data.data.image == "" || data.data.image == null){
				data.data.image = "../../img/icon/d_head.png";
			}
			$('.userPhoto>img').attr('src',data.data.image)
			//点击头像查看用户信息
			$(".userInfo").on("click",function(){
				window.location.href= "personalcarte.html?id="+fid;
			})
			//关注判断
			if(data.data.like == 0){
				$("#care>img").attr("src","../../img/icon/h_care.png");
				$("#care em").text("关注");
			}else{
				$("#care>img").attr("src","../../img/icon/h_careful.png");
				$("#care em").text("已关注");
			}
			if(data.code == 200){
					$('.moneyT').html(data.massage)
				$("#money").html(data.data.money);
				fid = data.data.uid;
			}else if(data.code==300){
				$('.moneyT').html(data.massage)
				$(".message").remove();
				fid = data.data.uid;
				$('.hbInfo a').hide();
				$('.hbInfo p:nth-child(2)').hide();
				$('.hbInfo').css('height','auto')
			}	
		}
	});
	//加好友
	$("#friend").on("click",function(){
		$.ajax({
			type:"post",
			url:d_http+"index.php/Home/User/firends",
			data:{
				uid   : uid,
	          	f_uid : fid,
	          	token : MD5(uid+fid+SL)
			},
			success : function(data){
				if(data.code == 200){
					$(".d_popupbox").html("好友请求已发送<br />等待对方通过验证~");
		 			setTimeout(show,500);
		 			setTimeout(hide,2000);	
				}else{
					$(".d_popupbox").html(data.massage);
		 			setTimeout(show,500);
		 			setTimeout(hide,2000);
				}
			}
		});
	})
	//加关注
	$("#care").on("click",function(){
		$.ajax({
			type:"post",
			data:{
				uid   : uid,
	          	d_uid : fid,
	          	token : MD5(uid+fid+SL)
			},
			url:d_http+"index.php/Home/User/xilist",
			success : function(data){
				if(data.code == 200){
					//判断是否关注
					if(data.massage == "取消关注"){
						$("#care>img").attr("src","../../img/icon/h_care.png");
						$("#care em").text("关注");
					}else{
						$("#care>img").attr("src","../../img/icon/h_careful.png");
						$("#care em").text("已关注");
					}
					$(".d_popupbox").html(data.massage);
		 			setTimeout(show,500);
		 			setTimeout(hide,2000);
				}
			}
		});
	})
	//列表
	var page = 0;        
	$.ajax({
		type:"post",
		url:d_http+"/index.php/Home/Index/packet_list",
		data : {
			id : hUid,
			page : page
		},
		success : function(data){
			console.log(data)
			if(data.code == 200){
				page+=1;
				$(".number").html(data.data.count);
				$(".count").html(data.data.number);
				var len = data.data.list.length;
				var lists = data.data.list;
				for(var i = 0 ; i< len ; i++){
					if(lists[i].image == "" || lists[i].image == null){
						lists[i].image = "../../img/icon/d_head.png";
					}
					if(lists[i].nickname == "" || lists[i].nickname == null){
						lists[i].nickname = "";
					}
					if(lists[i].l_time == "" || lists[i].l_time == null){
						lists[i].l_time = "";
					}
					$('.infoList').append('<div class="list"><p><img src="'
				 									 + lists[i].image +'" alt="" /></p><p><span class="infoText">'
				 									 + lists[i].nickname +'</span><span class="infoTime"><i>'
				 									 + format(lists[i].l_time).replace(/\//g, '-') +'</i></span></p><b><i>'
				 									 + lists[i].money +'</i>元</b></div>');
				}
			}
		}
	});
// 加载更多
	function proposeMore(){
		$.ajax({
			type:'post',
			url:d_http+"/index.php/Home/Index/packet_list",
			data:{
				id : hUid,
				page : page
			},
			success:function(data){
				if(data.code==200){
					page+=1;
					var len = data.data.list.length;
					var lists = data.data.list;
					for (var i = 0; i< len; i++) {
						if(lists[i].image == "" || lists[i].image == null){
							lists[i].image = "../../img/icon/d_head.png";
						}
						if(lists[i].nickname == "" || lists[i].nickname == null){
							lists[i].nickname = "";
						}
						if(lists[i].l_time == "" || lists[i].l_time == null){
							lists[i].l_time = "";
						}
						$('.infoList').append('<div class="list"><p><img src="'
					 									 + lists[i].image +'" alt="" /></p><p><span class="infoText">'
					 									 + lists[i].nickname +'</span><span class="infoTime"><i>'
					 									 + format(lists[i].l_time).replace(/\//g, '-') +'</i></span></p><b><i>'
					 									 + lists[i].money +'</i>元</b></div>');
					}
					$('#bottomS').html('');	
					p=true;
				}else{
					$('#bottomS').html('没有更多数据');
					setTimeout(function(){$('#bottomS').html('');},1000);
					p=true;
				}
			},
			error:function(){
					$('#bottom').html('加载失败');
					p=true;
			}
		});
	}
	//解析时间戳
	function add0(m) {
		return m < 10 ? '0' + m : m
	}

	function format(shijianchuo) {
		var time = new Date(shijianchuo * 1000);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
		return times
	}
	
	//加载更多
	var p=true;
    var clientH = Number(document.documentElement.clientHeight);
    var height5=Number($('#bottomS').height());
    $(document).on('scroll',function(){
		//获取文档高度
		if(p){
			var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
		var H5Top=parseInt($('#bottomS').offset().top+height5); //获取h5底部距离文档顶部的高度
		if(docH>=H5Top-150){
			p=false;
			$('#bottomS').html('数据加载中......');
			proposeMore();
		}
		}
		
    });
})

window.onload=function(){
	//隐藏礼物说明
	$('.caption').hide();
	//跳转礼物明细
	$('.headRight').on('click',function(){
		location.href='../../src/myself/gift.html';
	})

	var nickname=localStorage.getItem('nickname');
	var dataId=localStorage.getItem('datauid');
	var userimg=localStorage.getItem('userimg');
	$('#userimg').attr('src',userimg);
	$('#nickname').html(nickname);
	var money=''; //我的搜恋币的总金额
	var count=0; // 礼物数量
	var index=0; //选择的礼物的下标
	var giftName=''; //礼物名称
	var giftId=''; //礼物id
	var gift_money='';   //礼物价格	
	$.ajax({
		type:'post',
		url:d_http+'index.php/Home/User/money',
		data:{
			uid:localStorage.getItem('uid'),  
			token:MD5(localStorage.getItem('uid')+SL)
		},
		success:function(data){
			$('.soulianmoney>span').html(data.data.virtual);
			money=data.data.virtual;
		}
	})
	$.ajax({
		type:'post',
		url:d_http+'index.php/Home/Index/gift',
		data:{
			token:MD5(SL)
		},
		success:function(data){
			if(data.code==200){
				$('#money').html(count);
				for (var i = 0; i <data.data.length; i++) {
					$('.presentGift ul').append("<li data-id="+data.data[i].gift_id+"><div class='giftImg'><img src="+data.data[i].gift_photo+"/gift><span></span><h1>"+data.data[i].gift_money+"搜恋币</h1><p>魅力值+"+data.data[i].gift_money+"</p><div></div></div><h2>"+data.data[i].gift_name+"</h2></li>");
				}
			}
			$('.presentGift li').on('click',function(){
				giftId=$(this).attr('data-id');
				index=$(this).index();
				gift_money=data.data[index].gift_money;
				$(this).find('span').show().addClass('show');
				$(this).siblings('li').find('span').hide().removeClass('show');
				count=1;
				giftName=$(this).find('h2').html();
				$('#money').html(count);
			});
			// 点击加减
			$('#minus').on('click',function(){
				if(count<=1){
					count=1;
				}else{
					count--;
				}
				$('#money').html(count);
			});
			$('#plus').on('click',function(){
				count++;
				$('#money').html(count);
			});
			
			// 点击赠送
			$('.footRight>span').on('click',function(){
				if($('#money').html()==0||$('.show').length==0){
					$('.nomoney').show().html('您还没有选择礼物！');
					setTimeout(function(){
						$('.nomoney').hide().html('');
					},1500);
				}else{
					if(money-count*gift_money<0){
						$('.nomoney').show();
						setTimeout(function(){
							$('.nomoney').hide();
						},1500);
						return;
					}else{
						$('.mask').show();
						$('.sureBuy>p>s').html(count);
						$('.sureBuy>p>span').html(giftName);
						$('.sureBuy>p>i').html(nickname)
						$('.sureBuy').show();
					}
				}
				
			});
			//点击取消
			$('.cancel').on('click',function(){
				$('.mask').hide();
				$('.sureBuy>p>s').html('');
				$('.sureBuy>p>span').html('');
				$('.sureBuy>p>i').html('')
				$('.sureBuy').hide();
			});
			//点击确定
			$('.sure').on('click',function(){
				$.ajax({
					type:'post',
					url:d_http+'index.php/Home/User/gifts',
					data:{
						uid:localStorage.getItem('uid'),
						s_uid:dataId,
						number:count,
						giftid:giftId,
						price:gift_money,
						token:MD5(localStorage.getItem('uid')+dataId+count+giftId+SL)
					},
					success:function(data){
						if(data.code==200){
							$('.sureBuy').hide();
							$('.buyFail>p>span').html(gift_money*count);
							$('.buyFail').show();
							$('.sueccessBuy').on('click',function(){
								$('.mask').hide();
								$('.buyFail>p>span').html('');
								$('.buyFail').hide();
								$('.giftImg span').removeClass('show')
                history.back(-1);
							});
						}
					}
				})
			});
		}
	});
}
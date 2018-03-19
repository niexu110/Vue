//获取id
var id = function() {
	try {
		var url = window.location.href;
		var result = url.split("?")[1];
		var keyValue = result.split("&");
		var obj = {};
		for(var i = 0; i < keyValue.length; i++) {
			var item = keyValue[i].split("=");
			obj[item[0]] = item[1];
		}
		return obj;
	} catch(e) {}
};
window.onload = function() {
	$(function() {
		$.ajax({
			type: 'POST',
			url: d_http + 'index.php/Home/Goods/history_detail',
			data: {
				id: id().id,
				token: MD5(id().id + SL)
			},
			success: function(data) {
				var list = data.data.huodong
				console.log(list);
				//页面顶部
				$('.headMiddle>p').append(
					list.name
				)
				//活动简介
				$('.f_newList>ul').append(
					'<li>' +
					'	<div class="f_banner"><img src="' + list.images + '/teamshangchuan"/></div>' +
					'	<div class="f_outBorder">' +
					'		<div class="f_listInfo">' +
					'			<img class="f_icon" src="../../img/icon/t_personNum.png"/>' +
					'			<p class="f_wordInfo">(限定各' + list.number/ 2 + '人)&nbsp;已报名' + list.count + '人</p>' +
					'			<div class="f_sexNum">' +
					'				<img src="../../img/icon/t_boy.png"/>' +
					'				<p style="color: #5793dd;">' + list.man + '</p>' +
					'				<img src="../../img/icon/t_girl.png"/>' +
					'				<p style="color: #FEB3C5;">' + list.waman + '</p>' +
					'			</div>' +
					'		</div>' +
					'		<div class="f_listInfo">' +
					'			<img class="f_icon" src="../../img/icon/t_findFood_time.png"/>' +
					'			<p class="f_wordInfo">' + format(list.date_time).substr(0, 10).replace(/\//g, '-') + '</p>' +
					'			<p class="f_timeInfo">(报名截止:' + format(list.abort_time).substr(0, 10).replace(/\//g, '-') + ')</p>' +
					'		</div>' +
					'		<div class="f_listInfo">' +
					'			<img class="f_icon" src="../../img/icon/t_blackGps.png"/>' +
					'			<p class="f_wordInfo">' + list.site + '</p>' +
//					'			<img class="f_rightHui" src="../../img/icon/d_rightHui.jpg"/>' +
					'		</div>' +
					'		<div class="f_listInfo">' +
					'			<img class="f_icon" src="../../img/icon/t_money.png"/>' +
					'			<p class="f_wordInfo">' + list.price + '元</p>' +
					'		</div>' +
					'		<div class="f_listInfo">' +
					'			<img class="f_icon" src="../../img/icon/t_tel.png"/>' +
					'			<p class="f_wordInfo">' + list.photo + '</p>' +
					'		</div>' +
					'		<div class="f_otherInfo">' +
					'			<img class="f_icons" src="../../img/icon/t_info.png"/>' +
					'			<p class="f_word">' + list.event_state + '</p>' +
					'		</div>' +
					'		<div class="f_otherInfo">' +
					'			<img class="f_icons" src="../../img/icon/t_explain.png"/>' +
					'			<div class="f_word">' + list.event_detail + '</div>' +
					'		</div>' +
					'	</div>' +
					'</li>'
				)
				//精彩瞬间
				$('.f_cheapList>p').append(
					data.data.moment
				)
			}
		});
		//评论
		var page = 0;
		$.ajax({
			type: 'POST',
			url: d_http + 'index.php/Home/Engagement/discuss',
			data: {
				goods_id: id().id,
				token: MD5(id().id + SL)
			},
			success: function(data) {
				var list = data.data
				var star = '';
				for(var i = 0; i < list.length; i++) {
					if(list[i].nickname == null) {
						list[i].nickname = '匿名用户'
					}
					if(list[i].image == null) {
						list[i].image = '../../img/icon/d_head.png'
					}else{
						list[i].image = list[i].image + "/Head";
					}
					if(list[i].xingxing == 1) {
						star = '	<img src="../../img/icon/t_blueStar.png"/>'
					} else if(list[i].xingxing == 2) {
						star = '	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>'
					} else if(list[i].xingxing == 3) {
						star = '	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>'
					} else if(list[i].xingxing == 4) {
						star = '	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>'
					} else {
						star = '	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>' +
							'	<img src="../../img/icon/t_blueStar.png"/>'
					}
					$('.f_commentList>ul').append(
						'<li>' +
						'	<div class="f_outBorder">' +
						'		<div class="f_upInfo">' +
						'			<img class="f_head" src="' + list[i].image + '"/>' +
						'			<div class="f_infomation">' +
						'				<p class="f_name">' + list[i].nickname + '</p>' +
						'				<p class="f_time">' + format(list[i].addtime).substr(0, 10).replace(/\//g, '-') + '</p>' +
						'			</div>' +
						'			<div class="f_starNum">' + star + '</div>' +
						'		</div>' +
						'		<div class="f_downContent">' +
						'			<p>' + list[i].content + '</p>' +
						'		</div>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});

		function teamMore() {
			page++
			$.ajax({
				type: 'POST',
				url: d_http + 'index.php/Home/Engagement/discuss',
				data: {
					page: page,
					goods_id: id().id,
					token: MD5(id().id + SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						var star = '';
						for(var i = 0; i < list.length; i++) {
							if(list[i].nickname == null) {
								list[i].nickname = '匿名用户'
							}
							if(list[i].image == null) {
								list[i].image = '../../img/icon/d_head.png';
							}else{
								list[i].image = list[i].image + "/Head";
							}
							if(list[i].xingxing == 1) {
								star = '	<img src="../../img/icon/t_blueStar.png"/>'
							} else if(list[i].xingxing == 2) {
								star = '	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>'
							} else if(list[i].xingxing == 3) {
								star = '	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>'
							} else if(list[i].xingxing == 4) {
								star = '	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>'
							} else {
								star = '	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>' +
									'	<img src="../../img/icon/t_blueStar.png"/>'
							}
							$('.f_commentList>ul').append(
								'<li>' +
								'	<div class="f_outBorder">' +
								'		<div class="f_upInfo">' +
								'			<img class="f_head" src="' + list[i].image + '"/>' +
								'			<div class="f_infomation">' +
								'				<p class="f_name">' + list[i].nickname + '</p>' +
								'				<p class="f_time">' + format(list[i].addtime).substr(0, 10).replace(/\//g, '-') + '</p>' +
								'			</div>' +
								'			<div class="f_starNum">' + star + '</div>' +
								'		</div>' +
								'		<div class="f_downContent">' +
								'			<p>' + list[i].content + '</p>' +
								'		</div>' +
								'	</div>' +
								'</li>'
							)
						}
						team = true;
						$('#noMore').text('数据加载中......');
					} else {
						$('#noMore').text('没有更多数据');
						setTimeout(function() {
							$('#noMore').text('')
						}, 1000);
						team = true;
					}
				},
				error: function() {
					$('#noMore').text('加载失败');
					team = true;
				}
			});
		}
		var team = false;
		//活动详情
		$('.new').on('click', function() {
			$(this).find('hr').show();
			$('.changeCheap').hide();
			$('.f_cheapList').hide();
			$('.changeComment').hide();
			$('.f_commentList').hide();
			$('.f_newList').show();
			$('.new').css('color', '#5793DD');
			$('.cheap').css('color', '#333333');
			$('.comment').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			team = false;
		});
		//精彩瞬间
		$('.cheap').on('click', function() {
			$(this).find('hr').show();
			$('.changeNew').hide();
			$('.f_newList').hide();
			$('.changeComment').hide();
			$('.f_commentList').hide();
			$('.f_cheapList').show();
			$('.new').css('color', '#333333');
			$('.cheap').css('color', '#5793DD');
			$('.comment').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			team = false;
		});
		//评论
		$('.comment').on('click', function() {
			$(this).find('hr').show();
			$('.changeCheap').hide();
			$('.f_cheapList').hide();
			$('.changeNew').hide();
			$('.f_newList').hide();
			$('.f_commentList').show();
			$('.new').css('color', '#333333');
			$('.cheap').css('color', '#333333');
			$('.comment').css('color', '#5793DD');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			team = true;
		});
		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
		var height5 = Number($('#noMore').height());
		$(document).on('scroll', function() {
			if(team) {
				//获取文档高度
				var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Top = parseInt($('#noMore').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docH >= H5Top-150) {
					team = false;
					$('#noMore').text('数据加载中......');
					teamMore();
				}
			}
		});
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
	})
}
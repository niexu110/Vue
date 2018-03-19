//首页二级菜单顶部固定
function menuFixed(id) {
	var obj = document.getElementById(id);
	var _getHeight = obj.offsetTop;

	window.onscroll = function() {
		changePos(id, _getHeight);
	}
}

function changePos(id, height) {
	var obj = document.getElementById(id);
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	if(scrollTop < height) {
		obj.style.position = 'relative';
		obj.style.top = '0';
	} else {
		obj.style.position = 'fixed';
		obj.style.top = '.9rem';
	}
}
window.onload = function() {
	menuFixed('t_second');
	$(function() {
		var page = 0;
		$.ajax({
			type: 'POST',
			url: d_http + "index.php/Home/Goods/index",
			data: {
				page: page,
				token: MD5(SL)
			},
			success: function(data) {
				console.log(data)
				//首页轮播
				var bannerWidth = $('.t_banner').width();
				var len = data.data.banner.length;
				$('.t_banner>ul').width(bannerWidth * len);
				for(var i = 0; i < len; i++) {
					$('.t_banner>ul').append('<li><a href="javascript:void(0);"><img src="' + data.data.banner[i].images + '/teamlb" alt=""></a></li>');
					$('.t_banner>p').append('<span></span>');
				}
				$('.t_banner>p>span').eq(0).addClass('addBg');
				var index = 0;
				setInterval(function() {
					if(index >= len) {
						index = 0;
						$('.t_banner>p>span').removeClass('addBg')
						$('.t_banner>p>span').eq(index).addClass('addBg');
						$('.t_banner>ul').css('left', 0);
					} else {
						$('.t_banner>p>span').removeClass('addBg')
						$('.t_banner>p>span').eq(index).addClass('addBg');
						$('.t_banner>ul').css('left', -index * bannerWidth);
						index++;
					}
				}, 3000)
				var arr = data.data.type
				$('.t_findFood').append('<a href="../team/findFood.html?id=' + arr[0].id + '"><img src="' + arr[0].mobileimg + '"/><br/>' + arr[0].cat_name + '</a>')
				$('.t_traveller').append('<a href="../team/traveller.html?t_id=' + arr[1].id + '"><img src="' + arr[1].mobileimg + '"/><br/>' + arr[1].cat_name + '</a>')
				$('.t_unmarried').append('<a href="../team/unmarried.html?u_id=' + arr[2].id + '"><img src="' + arr[2].mobileimg + '"/><br/>' + arr[2].cat_name + '</a>')
				$('.t_company').append('<a href="../team/company.html?c_id=' + arr[3].id + '"><img src="' + arr[3].mobileimg + '"/><br/>' + arr[3].cat_name + '</a>')
				var list = data.data.data;
				for(var j = 0; j < list.length; j++) {
					$('.t_list>ul').append(
						'<li>' +
						'	<div class="t_commercialTenant">' +
						'		<div class="t_smallPic"><img src="../../img/icon/d_icn_soulove.png"/></div>' +
						'		<div class="t_word">' +
						'			<p class="firstWord">' + list[j].name + '</p>' +
						'			<p class="secondWord">' + (format(list[j].date_time)).substr(0, 10) + '[' + (format(list[j].date_time)).substr(11, 2) + '点至' + (format(list[j].abort_time)).substr(11, 2) + '点]</p>' +
						'		</div>' +
						'	</div>' +
						'	<div class="t_bigPic">' +
						'		<a href="../../src/team/detailedInfo.html?id=' + list[j].id + '">' +
						'			<img class="t_bigPic_pic" src="' + list[j].images + '/teamshangjia"/>' +
						'		</a>' +
						'	</div>' +
						'	<div class="t_info">' +
						'		<div class="t_address">' + list[j].address + '</div>' +
						'		<div class="t_sex">' +
						'			<img src="../../img/icon/t_boy.png"/>' + list[j].man + '/' + list[j].number / 2 + '' +
						'		</div>' +
						'		<div class="t_sex">' +
						'			<img src="../../img/icon/t_girl.png"/>' + list[j].woman + '/' + list[j].number / 2 + '' +
						'		</div>' +
						'		<div class="t_money">¥' + list[j].price + '</div>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});

		function teamMore() {
			page++;
			$.ajax({
				type: 'POST',
				url: d_http + 'index.php/Home/Goods/index',
				data: {
					page: page,
					token: MD5(SL)
				},
				success: function(data) {
					var list = data.data.data;
					if(list === undefined) {
						$('#noMore').text('没有更多数据');
						setTimeout(function() {
							$('#noMore').text('');
						}, 1000);
						team = true;
						return;
					}
					var len = list.length;
					for(var j = 0; j < len; j++) {
						$('.t_list>ul').append(
							'<li>' +
							'	<div class="t_commercialTenant">' +
							'		<div class="t_smallPic"><img src="../../img/icon/d_icn_soulove.png"/></div>' +
							'		<div class="t_word">' +
							'			<p>' + list[j].name + '</p>' +
							'			<p class="secondWord">' + (format(list[j].date_time)).substr(0, 10) + '[' + (format(list[j].date_time)).substr(11, 2) + '点至' + (format(list[j].abort_time)).substr(11, 2) + '点]</p>' +
							'		</div>' +
							'	</div>' +
							'	<div class="t_bigPic">' +
							'		<a href="../../src/team/detailedInfo.html?id=' + list[j].id + '">' +
							'			<img class="t_bigPic_pic" src="' + list[j].images + '/teamshangjia"/>' +
							'		</a>' +
							'	</div>' +
							'	<div class="t_info">' +
							'		<div class="t_address">' + list[j].address + '</div>' +
							'		<div class="t_sex">' +
							'			<img src="../../img/icon/t_boy.png"/>' + list[j].man + '/' + list[j].number / 2 + '' +
							'		</div>' +
							'		<div class="t_sex">' +
							'			<img src="../../img/icon/t_girl.png"/>' + list[j].woman + '/' + list[j].number / 2 + '' +
							'		</div>' +
							'		<div class="t_money">¥' + list[j].price + '</div>' +
							'	</div>' +
							'</li>'
						)
					}
					team = true;
					setTimeout(function() {
						$('#noMore').text('数据加载中......');
					}, 1000);
				},
				error: function() {
					$('#noMore').text('加载失败');
					setTimeout(function() {
						$('#noMore').text('')
					}, 1000);
					team = true;
				}
			});
		}
		var team = true

		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
		var height5 = Number($('#noMore').height());
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
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
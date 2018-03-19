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
	(function() {
		var page = 0,
			pages = 0,
			type = 0, //最新发布
			types = 1; //价格最低
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/type_list",
			data: {
				id: id().c_id,
				type: type,
				page: page,
				token: MD5(id().c_id + type + SL)
			},
			success: function(data) {
				var list = data.data
				for(var i = 0; i < list.length; i++) {
					$('.f_newList>ul').append(
						'<li>' +
						'	<div class="f_upInfo">' +
						'		<img src="../../img/icon/d_icn_soulove.png"/>' +
						'		<p class="f_name">' + list[i].address + '</p>' +
						'		<p class="f_time">' + format(list[i].date_time).substr(0, 10).replace(/\//g, '-') + '</p>' +
						'	</div>' +
						'	<div class="f_centerPic">' +
						'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
						'			<img class="f_centerPic_pic" src="' + list[i].images + '/teamqiye"/>' +
						'		</a>' +
						'	</div>' +
						'	<div class="f_downInfo">' +
						'		<p class="f_libel">' + list[i].name + '</p>' +
						'		<p class="f_person">元/人</p>' +
						'		<p class="everyPirce">' + list[i].price + '</p>' +
						'	</div>' +
						'</li>'
					)
				}

			}
		});
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/type_list",
			data: {
				id: id().c_id,
				type: types,
				page: pages,
				token: MD5(id().c_id + types + SL)
			},
			success: function(data) {
				var list = data.data
				for(var i = 0; i < list.length; i++) {
					$('.f_cheapList>ul').append(
						'<li>' +
						'	<div class="f_upInfo">' +
						'		<img src="../../img/icon/d_icn_soulove.png"/>' +
						'		<p class="f_name">' + list[i].address + '</p>' +
						'		<p class="f_time">' + format(list[i].date_time).substr(0, 10).replace(/\//g, '-') + '</p>' +
						'	</div>' +
						'	<div class="f_centerPic">' +
						'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
						'			<img class="f_centerPic_pic" src="' + list[i].images + '/teamqiye"/>' +
						'		</a>' +
						'	</div>' +
						'	<div class="f_downInfo">' +
						'		<p class="f_libel">' + list[i].name + '</p>' +
						'		<p class="f_person">元/人</p>' +
						'		<p class="everyPirce">' + list[i].price + '</p>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});

		function newMore() {
			page++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/type_list",
				data: {
					id: id().c_id,
					type: type,
					page: page,
					token: MD5(id().c_id + type + SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							$('.f_newList>ul').append(
								'<li>' +
								'	<div class="f_upInfo">' +
								'		<img src="../../img/icon/d_icn_soulove.png"/>' +
								'		<p class="f_name">' + list[i].address + '</p>' +
								'		<p class="f_time">' + format(list[i].date_time).substr(0, 10).replace(/\//g, '-') + '</p>' +
								'	</div>' +
								'	<div class="f_centerPic">' +
								'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
								'			<img class="f_centerPic_pic" src="' + list[i].images + '/teamqiye"/>' +
								'		</a>' +
								'	</div>' +
								'	<div class="f_downInfo">' +
								'		<p class="f_libel">' + list[i].name + '</p>' +
								'		<p class="f_person">元/人</p>' +
								'		<p class="everyPirce">' + list[i].price + '</p>' +
								'	</div>' +
								'</li>'
							)
						}
						news = true;
						$('#newLoading').text('数据加载中......');
					} else {
						$('#newLoading').text('没有更多数据');
						setTimeout(function() {
							$('#newLoading').text('')
						}, 1000);
						news = true;
					}
				},
				error: function() {
					$('#newLoading').text('加载失败');
					news = true;
				}
			});
		}

		function cheapMore() {
			pages++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/type_list",
				data: {
					id: id().c_id,
					type: types,
					page: pages,
					token: MD5(id().c_id + types + SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							$('.f_cheapList>ul').append(
								'<li>' +
								'	<div class="f_upInfo">' +
								'		<img src="../../img/icon/d_icn_soulove.png"/>' +
								'		<p class="f_name">' + list[i].address + '</p>' +
								'		<p class="f_time">' + format(list[i].date_time).substr(0, 10).replace(/\//g, '-') + '</p>' +
								'	</div>' +
								'	<div class="f_centerPic">' +
								'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
								'			<img class="f_centerPic_pic" src="' + list[i].images + '/teamqiye"/>' +
								'		</a>' +
								'	</div>' +
								'	<div class="f_downInfo">' +
								'		<p class="f_libel">' + list[i].name + '</p>' +
								'		<p class="f_person">元/人</p>' +
								'		<p class="everyPirce">' + list[i].price + '</p>' +
								'	</div>' +
								'</li>'
							)
						}
						cheap = true;
						$('#cheapLoading').text('数据加载中......');
					} else {
						console.log('123')
						$('#cheapLoading').text('没有更多数据');
						setTimeout(function() {
							$('#cheapLoading').text('')
						}, 1000);
						cheap = true;
					}
				},
				error: function() {
					$('#cheapLoading').text('加载失败');
					cheap = true;
				}
			});
		}
		var news = true,
			cheap = false;
		//最新发布
		$('.new').on('click', function() {
			$(this).find('hr').show();
			$('.changeCheap').hide();
			$('.f_cheapList').hide();
			$('.f_newList').show();
			$('.new').css('color', '#5793DD');
			$('.cheap').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			news = true;
			cheap = false;
		});
		//点击价格最低
		$('.cheap').on('click', function() {
			$(this).find('hr').show();
			$('.changeNew').hide();
			$('.f_newList').hide();
			$('.f_cheapList').show();
			$('.new').css('color', '#333333');
			$('.cheap').css('color', '#5793DD');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			news = false;
			cheap = true;
		});
		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
		var height5 = Number($('#newLoading').height());
		$(document).on('scroll', function() {
			if(news) {
				//获取文档高度
				var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Top = parseInt($('#newLoading').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docH >= H5Top-150) {
					news = false;
					$('#newLoading').text('数据加载中......');
					newMore();
				}
			} else if(cheap) {
				//获取文档高度
				var docHs = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Tops = parseInt($('#cheapLoading').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docHs >= H5Tops-150) {
					cheap = false;
					$('#cheapLoading').text('数据加载中......');
					cheapMore();
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
	})();
}
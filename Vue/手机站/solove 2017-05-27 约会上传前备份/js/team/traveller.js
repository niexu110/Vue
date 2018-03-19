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
	menuFixed('f_classify');
	(function() {
		var page = 0,
			pages = 0,
			type = 0, //最新发布
			types = 1; //价格最低
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/type_list",
			data: {
				id: id().t_id,
				type: type,
				page: page,
				token: MD5(id().t_id + type + SL)
			},
			success: function(data) {
				var list = data.data
				for(var i = 0; i < list.length; i++) {
					$('.f_newList>ul').append(
						'<li>' +
						'	<div class="f_bigPic">' +
						'		<div class="bigPic">' +
						'			<img class="bigPic_img" src="' + list[i].images + '/teamlvxingjia"/>' +
						'		</div>' +
						'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
						'			<div class="f_listContent">' +
						'				<div class="f_left">' +
						'					<div class="f_name">' + list[i].name + '</div>' +
						'					<div class="f_time">' +
						'						<img src="../../img/icon/t_nullTime.png"/>' +
						'						<p>' + format(list[i].date_time).substr(0, 10).replace(/-/g, '.') + '-' + format(list[i].abort_time).substr(5, 5).replace(/-/g, '.') + '</p>' +
						'					</div>' +
						'					<div class="f_address">' +
						'						<img src="../../img/icon/t_nullGps.png"/>' +
						'						<p>' + list[i].address + '</p>' +
						'					</div>' +
						'					<div class="f_pirce">' +
						'						<p>' + list[i].price + '</p>' +
						'						元/人' +
						'					</div>' +
						'				</div>' +
						'				<div class="f_right">' +
						'					<img src="../../img/icon/t_rightIcon.png"/>' +
						'				</div>' +
						'			</div>' +
						'		</a>' +
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
				id: id().t_id,
				type: types,
				page: pages,
				token: MD5(id().t_id + types + SL)
			},
			success: function(data) {
				var list = data.data
				for(var i = 0; i < list.length; i++) {
					$('.f_cheapList>ul').append(
						'<li>' +
						'	<div class="f_bigPic">' +
						'		<div class="bigPic">' +
						'			<img class="bigPic_img" src="' + list[i].images + '/teamlvxingjia"/>' +
						'		</div>' +
						'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
						'			<div class="f_listContent">' +
						'				<div class="f_left">' +
						'					<div class="f_name">' + list[i].name + '</div>' +
						'					<div class="f_time">' +
						'						<img src="../../img/icon/t_nullTime.png"/>' +
						'						<p>' + format(list[i].date_time).substr(0, 10).replace(/-/g, '.') + '-' + format(list[i].abort_time).substr(5, 5).replace(/-/g, '.') + '</p>' +
						'					</div>' +
						'					<div class="f_address">' +
						'						<img src="../../img/icon/t_nullGps.png"/>' +
						'						<p>' + list[i].address + '</p>' +
						'					</div>' +
						'					<div class="f_pirce">' +
						'						<p>' + list[i].price + '</p>' +
						'						元/人' +
						'					</div>' +
						'				</div>' +
						'				<div class="f_right">' +
						'					<img src="../../img/icon/t_rightIcon.png"/>' +
						'				</div>' +
						'			</div>' +
						'		</a>' +
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
					id: id().t_id,
					type: type,
					page: page,
					token: MD5(id().t_id + type + SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							$('.f_newList>ul').append(
								'<li>' +
								'	<div class="f_bigPic">' +
								'		<div class="bigPic">' +
								'			<img class="bigPic_img" src="' + list[i].images + '/teamlvxingjia"/>' +
								'		</div>' +
								'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
								'			<div class="f_listContent">' +
								'				<div class="f_left">' +
								'					<div class="f_name">' + list[i].name + '</div>' +
								'					<div class="f_time">' +
								'						<img src="../../img/icon/t_nullTime.png"/>' +
								'						<p>' + format(list[i].date_time).substr(0, 10).replace(/-/g, '.') + '-' + format(list[i].abort_time).substr(5, 5).replace(/-/g, '.') + '</p>' +
								'					</div>' +
								'					<div class="f_address">' +
								'						<img src="../../img/icon/t_nullGps.png"/>' +
								'						<p>' + list[i].address + '</p>' +
								'					</div>' +
								'					<div class="f_pirce">' +
								'						<p>' + list[i].price + '</p>' +
								'						元/人' +
								'					</div>' +
								'				</div>' +
								'				<div class="f_right">' +
								'					<img src="../../img/icon/t_rightIcon.png"/>' +
								'				</div>' +
								'			</div>' +
								'		</a>' +
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
					id: id().t_id,
					type: types,
					page: pages,
					token: MD5(id().t_id + types + SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							$('.f_cheapList>ul').append(
								'<li>' +
								'	<div class="f_bigPic">' +
								'		<div class="bigPic">' +
								'			<img class="bigPic_img" src="' + list[i].images + '/teamlvxingjia"/>' +
								'		</div>' +
								'		<a href="../../src/team/detailedInfo.html?id=' + list[i].id + '">' +
								'			<div class="f_listContent">' +
								'				<div class="f_left">' +
								'					<div class="f_name">' + list[i].name + '</div>' +
								'					<div class="f_time">' +
								'						<img src="../../img/icon/t_nullTime.png"/>' +
								'						<p>' + format(list[i].date_time).substr(0, 10).replace(/-/g, '.') + '-' + format(list[i].abort_time).substr(5, 5).replace(/-/g, '.') + '</p>' +
								'					</div>' +
								'					<div class="f_address">' +
								'						<img src="../../img/icon/t_nullGps.png"/>' +
								'						<p>' + list[i].address + '</p>' +
								'					</div>' +
								'					<div class="f_pirce">' +
								'						<p>' + list[i].price + '</p>' +
								'						元/人' +
								'					</div>' +
								'				</div>' +
								'				<div class="f_right">' +
								'					<img src="../../img/icon/t_rightIcon.png"/>' +
								'				</div>' +
								'			</div>' +
								'		</a>' +
								'	</div>' +
								'</li>'
							)
						}
						cheap = true;
						$('#cheapLoading').text('数据加载中......');
					} else {
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
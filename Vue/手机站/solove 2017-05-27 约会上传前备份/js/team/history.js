window.onload = function() {
	(function() {
		var page = 0;
		$.ajax({
			type: "POST",
			url: d_http+"index.php/Home/Goods/history",
			data: {
				token: MD5(SL)
			},
			success: function(data) {
				var list = data.data
				for(var i = 0; i < list.length; i++) {
					$('.f_containers>ul').append(
						'<li class="bgColor">' +
						'	<a href="../../src/team/activityInfo.html?id=' + list[i].id + '">' +
						'		<div class="f_content">' +
						'			<div class="f_bigPic">' +
						'				<img class="f_bigPic_img" src="' + list[i].images + '"/>' +
						'			</div>' +
						'			<div class="f_center">' +
						'				<div class="f_left">' +
						'					<p class="f_right_name">' + list[i].name + '</p>' +
						'				</div>' +
						'				<div class="f_right">' +
						'					<p class="f_right_time">' + format(list[i].time).substr(0, 10) + '</p>' +
						'					<p class="f_right_number">[人数限定' + list[i].number + ']</p>' +
						'				</div>' +
						'				<div class="f_money">' +
						'					<p class="f_pirce">¥' + list[i].price + '元</p>' +
						'				</div>' +
						'			</div>' +
						'		</div>' +
						'	</a>' +
						'</li>'
					)
				}
			}
		});

		function teamMore() {
			page++;
			$.ajax({
				type: 'POST',
				url: d_http+'index.php/Home/Goods/history',
				data: {
					page: page,
					token: MD5(SL)
				},
				success: function(data) {
					var list = data.data
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							$('.f_containers>ul').append(
								'<li class="bgColor">' +
								'	<a href="../../src/team/activityInfo.html?id=' + list[i].id + '">' +
								'		<div class="f_content">' +
								'			<div class="f_bigPic">' +
								'				<img class="f_bigPic_img" src="' + list[i].images + '"/>' +
								'			</div>' +
								'			<div class="f_center">' +
								'				<div class="f_left">' +
								'					<p class="f_right_name">' + list[i].name + '</p>' +
								'				</div>' +
								'				<div class="f_right">' +
								'					<p class="f_right_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'					<p class="f_right_number">[人数限定' + list[i].number + ']</p>' +
								'				</div>' +
								'				<div class="f_money">' +
								'					<p class="f_pirce">' + list[i].price + '元</p>' +
								'					<img src="../../img/icon/t_souloveB.png"/>' +
								'				</div>' +
								'			</div>' +
								'		</div>' +
								'	</a>' +
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
		var team = true;
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
	})();
}
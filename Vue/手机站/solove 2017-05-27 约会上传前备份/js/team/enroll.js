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
		//获取位置缓存
		var x = localStorage.getItem("x");
		var y = localStorage.getItem("y");
		enrollValue();
		var page = 0;

		function enrollValue() {
			$.ajax({
				type: 'POST',
				url: d_http + 'index.php/Home/Goods/event_person',
				data: {
					id: id().id,
					x: x,
					y: y,
					token: MD5(id().id + SL)
				},
				success: function(data) {
					var list = data.data;
					var src = '',
						charm = '',
						color = '';
					for(var i = 0; i < list.length; i++) {
						if(list[i].sex == 2) {
							src = '../../img/icon/t_nullGirl.png';
							charm = '../../img/icon/t_girlCharm.png';
							color = '#feb3c5';
						} else {
							src = '../../img/icon/t_nullBoy.png';
							charm = '../../img/icon/t_boyCharm.png';
							color = '#5793DD';
						}

						$('.f_List>ul').append(
							'<li>' +
							'<a href="../../src/find/personalcarte.html?dataId=' + list[i].uid + '">' +
							'	<div class="f_list_content">' +
							'		<img class="f_list_content_img" src="' + list[i].images + '"/>' +
							'		<div class="f_right">' +
							'			<div class="f_up">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<img class="f_icon" style="background-color:' + color + '" src="' + src + '"/>' +
							'				<p class="f_age" style="background-color:' + color + '">' + list[i].age + '</p>' +
							'				<img class="f_charm" src="' + charm + '"/>' +
							'				<p class="f_charm_p">' + list[i].charm + '</p>' +
							'			</div>' +
							'			</br>' +
							'			<div class="f_down">' +
							'				<p>[' + list[i].count + 'km]</p>' +
							'			</div>' +
							'		</div>' +
							'	</div>' +
							'</a>' +
							'</li>'
						)
					}
				}
			});
		}

		function teamMore() {
			page++
			$.ajax({
				type: 'POST',
				url: d_http + 'index.php/Home/Goods/event_person',
				data: {
					page: page,
					id: id().id,
					x: x,
					y: y,
					token: MD5(id().id + SL)
				},
				success: function(data) {
					var list = data.data;
					var src = '',
						charm = '',
						color = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].sex == 2) {
								src = '../../img/icon/t_nullGirl.png';
								charm = '../../img/icon/t_girlCharm.png';
								color = '#feb3c5';
							} else {
								src = '../../img/icon/t_nullBoy.png';
								charm = '../../img/icon/t_boyCharm.png';
								color = '#5793DD';
							}

							$('.f_List>ul').append(
								'<li>' +
								'<a href="../../src/find/personalcarte.html?dataId=' + list[i].uid + '">' +
								'	<div class="f_list_content">' +
								'		<img class="f_list_content_img" src="' + list[i].images + '"/>' +
								'		<div class="f_right">' +
								'			<div class="f_up">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<img class="f_icon" style="background-color:' + color + '" src="' + src + '"/>' +
								'				<p class="f_age" style="background-color:' + color + '">' + list[i].age + '</p>' +
								'				<img class="f_charm" src="' + charm + '"/>' +
								'				<p class="f_charm_p">' + list[i].charm + '</p>' +
								'			</div>' +
								'			</br>' +
								'			<div class="f_down">' +
								'				<p>[' + list[i].count + 'km]</p>' +
								'			</div>' +
								'		</div>' +
								'	</div>' +
								'</a>' +
								'</li>'
							)
						}
						team = true;
						$('#noMore').text('数据加载中......');
					} else {
						$('#noMore').text('没有更多数据');
						setTimeout(function() {
							$('#noMore').html('')
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
		var team = true
		document.documentElement.scrollTop = 0;
		document.body.scrollTop = 0;
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
	})();
}
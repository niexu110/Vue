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
var userData = JSON.parse(localStorage.getItem('userData'));
window.onload = function() {
	$(function() {
		$.ajax({
			type: 'POST',
			url: d_http + 'index.php/Home/Goods/lovelist',
			data: {
				id: id().id,
				token: MD5(id().id + SL)
			},
			success: function(data) {
				var list = data.data;
				$('.t_visitButton').click(function() {
					if(userData == null) {
						localStorage.setItem("url", window.location.href)
						location.href = "../../src/login/login.html";
					} else {
						$.ajax({
							type: 'POST',
							url: d_http + 'index.php/Home/Goods/addGoods',
							data: {
								uid: userData.uid,
								id: id().id,
								money: list.price,
								token: MD5(id().id + userData.uid + SL)
							},
							success: function(data) {
								if(data.code == 200) {
									$('.t_advice').show();
									$('.t_message').text('报名成功！')
									setTimeout(function() {
										$('.t_advice').hide();
										location.href = "../../src/personal/pay.html?id=" + data.data.id + "&uid=" + userData.uid;
									}, 1000);
								} else {
									$('.t_advice').show();
									$('.t_message').text(data.massage);
									setTimeout(function() {
										$('.t_advice').hide();
									}, 1000);
								}
							}
						});
					}
				});
				$('.t_containers>ul').append(
					'<li>' +
					'	<div class="t_bigPic">' +
					'		<a href="javascript:void(0)" onclick="javascript:history.go(-1);" >' +
					'			<img  class="t_rightIcon" src="../../img/icon/t_leftIcon.png"/>' +
					'		</a>' +
					'		<img  class="t_bigPic_pic" src="' + list.images + '"/>' +
					'	</div>' +
					'	<div class="t_name"><p>' + list.name + '</p></div>' +
					'	<a href="../../src/team/enroll.html?id=' + list.id + '">' +
					'		<div class="t_peoplePic">' +
					'			<ul></ul>' +
					'		</div>' +
					'	</a>' +
					'	<div class="t_visitNum">' +
					'		<img class="t_boy" src="../../img/icon/t_boy.png"/>' +
					'		<p class="t_boyNum">' + list.man + '</p>' +
					'		<img class="t_girl" src="../../img/icon/t_girl.png"/>' +
					'		<p class="t_girlNum">' + list.waman + '</p>' +
					'		<p class="t_everyNum">限定各' + list.number / 2 + '人</p>' +
					'		<p class="t_alreadyNum">已报名' + list.count + '人</p>' +
					'	</div>' +
					'	<div class="t_wordList">' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_findFood_time.png"/>' +
					'			<p>' + format(list.date_time).substr(0, 10).replace(/\//g, '-') + ' &nbsp;&nbsp; (报名截止:' + format(list.abort_time).substr(0, 10) + ')</p>' +
					'		</div>' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_blackGps.png"/>' +
					'			<p>' + list.site + '</p>' +
					//					'			<img class="lineInfo_rightIcon" src="../../img/icon/d_rightHui.jpg"/>' +
					'		</div>' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_money.png"/>' +
					'			<p>' + list.price + '元</p>' +
					'		</div>' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_tel.png"/>' +
					'			<p>' + list.photo + '</p>' +
					'		</div>' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_ host.png"/>' +
					'			<p>' + list.sponsor + '(已成功举办' + list.event_count + '次活动,共' + list.event_person + '人参加)</p>' +
					'		</div>' +
					'		<div class="lineInfo">' +
					'			<img class="lineInfo_icon" src="../../img/icon/t_info.png"/>' +
					'			<p>' + list.event_state + '</p>' +
					'		</div>' +
					'		<div class="lineInfo_other">' +
					'			<img class="lineInfo_last_icon" src="../../img/icon/t_explain.png"/>' +
					'			<div class="lineInfo_p">' + (list.event_detail).replace(/&nbsp;/g, '') + '</div>' +
					'		</div>' +
					'	</div>' +
					'</li>'
				)
			}
		});
		$.ajax({
			type: 'POST',
			url: d_http + 'index.php/Home/Goods/event_person',
			data: {
				id: id().id,
				token: MD5(id().id + SL)
			},
			success: function(data) {
				var list = data.data
				if(data.code == 200) {
					$('.t_peoplePic>ul').append(
						'<li class="t_visitPic">' +
						'	<img class="t_img" src="' + list[0].images + '"/>' +
						'	<img class="t_img" src="' + list[1].images + '"/>' +
						'	<img class="t_img" src="' + list[2].images + '"/>' +
						'	<img class="t_goIcon" src="../../img/icon/d_rightHui.jpg"/>'+
						'</li>' 
					)
				} else {
					$('.t_peoplePic').hide();
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
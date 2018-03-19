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
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/dingdetail",
			data: {
				id: id().id,
				token: MD5(id().id + SL)
			},
			success: function(data) {
				var list = data.data
				$('.f_outBorder').append(
					'<div class="f_name">' +
					'	<p class="f_goods">' + list.new_event.name + '</p>' +
					'	<p class="f_moneies">¥&nbsp;' + list.g_id.money + '元</p>' +
					'</div>' +
					'<div class="f_information">' +
					'	<div class="f_leftImg">' +
					'		<img class="f_left_Img" src="' + list.new_event.images + '"/>' +
					'	</div>' +
					'	<div class="f_rightInfo">' +
					'		<p class="f_goodsName">' + list.new_event.name + '|' + list.new_event.address + '</p>' +
					'		<p class="f_time">' + format(list.g_id.time).substr(0, 10).replace(/\//g, '-') + '</p>' +
					'		<p class="f_number">订单编号:&nbsp;' + list.g_id.order_number + '</p>' +
					'	</div>' +
					'</div>' +
					'<div class="f_validateNum">' +
					'	<p class="f_title">请将以下验证码展示给商家核对信息</p>' +
					'	<p class="f_content">' + (list.promotion_code.code).toUpperCase() + '</p>' +
					'	<div class="f_last">' +
					'		<p class="f_important">※</p>' +
					'		<p class="f_importantInfo">该服务有效期:&nbsp;约会日期</p>' +
					'	</div>' +
					'</div>'
				)
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
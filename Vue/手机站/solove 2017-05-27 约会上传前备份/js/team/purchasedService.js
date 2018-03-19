var userData = JSON.parse(localStorage.getItem('userData'));
window.onload = function() {
	(function() {
		var type = 0,
			uid = userData.uid,
			page = 0,
			page2 = 0,
			page3 = 0,
			page4 = 0,
			page5 = 0;
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/indent",
			data: {
				uid: uid,
				page: page,
				type: type,
				token: MD5(uid + SL)
			},
			success: function(data) {
				var list = data.data;
				var pageurl = '';
				var str = '';
				if(data.code == 200) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 1) {
							if(list[i].code == 0) {
								list[i].code = '待使用'
								list[i].status = '去使用'
								pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							} else if(list[i].code == 1) {
								list[i].code = '已使用'
								list[i].status = '去评价'
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						} else if(list[i].status == 9) {
							list[i].status == '退款中'
						} else if(list[i].status == 10) {
							list[i].status == '已退款'
						} else {
							list[i].status = '去支付'
							if((list[i].code == '')) {
								list[i].code = '待支付'
								pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + uid;
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						}
						$('.f_allContent>ul').append(
							'<li class="line">' +
							'	<div class="f_number">' +
							'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
							'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
							'	</div>' +
							'	<div class="f_goodsInfo">' +
							'		<div class="f_left">' +
							'           <div class="f_leftPic">' +
							'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
							'           </div>' +
							'			<div class="f_imgInfo">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
							'				<p class="f_money">¥' + list[i].money + '元</p>' +
							'			</div>' +
							'		</div>' +
							'		<div class="f_right">' + str + '</div>' +
							'	</div>' +
							'	<div class="f_bgImg">' +
							'	</div>' +
							'</li>'
						)
					}
				} else {
					$('.f_allContent>ul').append(
						'<li>' +
						'	<div class="f_bgImg">' +
						'		<img src="../../img/t_noAppointment.png"/>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/indent",
			data: {
				uid: uid,
				page: page,
				type: 1,
				token: MD5(uid + SL)
			},
			success: function(data) {
				var list = data.data;
				var pageurl = '';
				var str = '';
				if(data.code == 200) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 1) {
							if(list[i].code == 0) {
								list[i].code = '待使用'
								list[i].status = '去使用'
								pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							} else if(list[i].code == 1) {
								list[i].code = '已使用'
								list[i].status = '去评价'
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						} else if(list[i].status == 9) {
							list[i].status == '退款中'
						} else if(list[i].status == 10) {
							list[i].status == '已退款'
						} else {
							list[i].status = '去支付'
							if((list[i].code == '')) {
								list[i].code = '待支付'
								pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						}
						$('.f_toBePaid>ul').append(
							'<li class="line">' +
							'	<div class="f_number">' +
							'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
							'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
							'	</div>' +
							'	<div class="f_goodsInfo">' +
							'		<div class="f_left">' +
							'           <div class="f_leftPic">' +
							'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
							'           </div>' +
							'			<div class="f_imgInfo">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
							'				<p class="f_money">¥' + list[i].money + '元</p>' +
							'			</div>' +
							'		</div>' +
							'		<div class="f_right">' + str + '</div>' +
							'	</div>' +
							'	<div class="f_bgImg">' +
							'	</div>' +
							'</li>'
						)
					}
				} else {
					$('.f_toBePaid>ul').append(
						'<li>' +
						'	<div class="f_bgImg">' +
						'		<img src="../../img/t_noAppointment.png"/>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/indent",
			data: {
				uid: uid,
				page: page,
				type: 2,
				token: MD5(uid + SL)
			},
			success: function(data) {
				var list = data.data;
				var pageurl = '';
				var str = '';
				if(data.code == 200) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 1) {
							if(list[i].code == 0) {
								list[i].code = '待使用'
								list[i].status = '去使用'
								pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							} else if(list[i].code == 1) {
								list[i].code = '已使用'
								list[i].status = '去评价'
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						} else if(list[i].status == 9) {
							list[i].status == '退款中'
						} else if(list[i].status == 10) {
							list[i].status == '已退款'
						} else {
							list[i].status = '去支付'
							if((list[i].code == '')) {
								list[i].code = '待支付'
								pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						}
						$('.f_toUse>ul').append(
							'<li class="line">' +
							'	<div class="f_number">' +
							'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
							'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
							'	</div>' +
							'	<div class="f_goodsInfo">' +
							'		<div class="f_left">' +
							'           <div class="f_leftPic">' +
							'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
							'           </div>' +
							'			<div class="f_imgInfo">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
							'				<p class="f_money">¥' + list[i].money + '元</p>' +
							'			</div>' +
							'		</div>' +
							'		<div class="f_right">' + str + '</div>' +
							'	</div>' +
							'	<div class="f_bgImg">' +
							'	</div>' +
							'</li>'
						)
					}
				} else {
					$('.f_toUse>ul').append(
						'<li>' +
						'	<div class="f_bgImg">' +
						'		<img src="../../img/t_noAppointment.png"/>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/indent",
			data: {
				uid: uid,
				page: page,
				type: 3,
				token: MD5(uid + SL)
			},
			success: function(data) {
				var list = data.data;
				var pageurl = '';
				var str = '';
				if(data.code == 200) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 1) {
							if(list[i].code == 0) {
								list[i].code = '待使用'
								list[i].status = '去使用'
								pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							} else if(list[i].code == 1) {
								list[i].code = '已使用'
								list[i].status = '去评价'
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						} else if(list[i].status == 9) {
							list[i].status == '退款中'
						} else if(list[i].status == 10) {
							list[i].status == '已退款'
						} else {
							list[i].status = '去支付'
							if((list[i].code == '')) {
								list[i].code = '待支付'
								pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						}
						$('.f_alreadyUse>ul').append(
							'<li class="line">' +
							'	<div class="f_number">' +
							'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
							'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
							'	</div>' +
							'	<div class="f_goodsInfo">' +
							'		<div class="f_left">' +
							'           <div class="f_leftPic">' +
							'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
							'           </div>' +
							'			<div class="f_imgInfo">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
							'				<p class="f_money">¥' + list[i].money + '元</p>' +
							'			</div>' +
							'		</div>' +
							'		<div class="f_right">' + str + '</div>' +
							'	</div>' +
							'	<div class="f_bgImg">' +
							'	</div>' +
							'</li>'
						)
					}
				} else {
					$('.f_alreadyUse>ul').append(
						'<li>' +
						'	<div class="f_bgImg">' +
						'		<img src="../../img/t_noAppointment.png"/>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});
		$.ajax({
			type: "POST",
			url: d_http + "index.php/Home/Goods/indent",
			data: {
				uid: uid,
				page: page,
				type: 4,
				token: MD5(uid + SL)
			},
			success: function(data) {
				var list = data.data;
				var pageurl = '';
				var str = '';
				if(data.code == 200) {
					for(var i = 0; i < list.length; i++) {
						if(list[i].status == 1) {
							if(list[i].code == 0) {
								list[i].code = '待使用'
								list[i].status = '去使用'
								pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							} else if(list[i].code == 1) {
								list[i].code = '已使用'
								list[i].status = '去评价'
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						} else if(list[i].status == 9) {
							list[i].status == '退款中'
						} else if(list[i].status == 10) {
							list[i].status == '已退款'
						} else {
							list[i].status = '去支付'
							if((list[i].code == '')) {
								list[i].code = '待支付'
								pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
								str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
							}
						}
						$('.f_refund>ul').append(
							'<li class="line">' +
							'	<div class="f_number">' +
							'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
							'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
							'	</div>' +
							'	<div class="f_goodsInfo">' +
							'		<div class="f_left">' +
							'           <div class="f_leftPic">' +
							'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
							'           </div>' +
							'			<div class="f_imgInfo">' +
							'				<p class="f_name">' + list[i].name + '</p>' +
							'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
							'				<p class="f_money">¥' + list[i].money + '元</p>' +
							'			</div>' +
							'		</div>' +
							'		<div class="f_right">' + str + '</div>' +
							'	</div>' +
							'	<div class="f_bgImg">' +
							'	</div>' +
							'</li>'
						)
					}
				} else {
					$('.f_refund>ul').append(
						'<li>' +
						'	<div class="f_bgImg">' +
						'		<img src="../../img/t_noAppointment.png"/>' +
						'	</div>' +
						'</li>'
					)
				}
			}
		});

		function firstMore() {
			page++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/indent",
				data: {
					uid: uid,
					page: page,
					type: type,
					token: MD5(uid + SL)
				},
				success: function(data) {
					var list = data.data;
					var pageurl = '';
					var str = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].status == 1) {
								if(list[i].code == 0) {
									list[i].code = '待使用'
									list[i].status = '去使用'
									pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								} else if(list[i].code == 1) {
									list[i].code = '已使用'
									list[i].status = '去评价'
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							} else if(list[i].status == 9) {
								list[i].status == '退款中'
							} else if(list[i].status == 10) {
								list[i].status == '已退款'
							} else {
								list[i].status = '去支付'
								if((list[i].code == '')) {
									list[i].code = '待支付'
									pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							}
							$('.f_allContent>ul').append(
								'<li class="line">' +
								'	<div class="f_number">' +
								'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
								'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
								'	</div>' +
								'	<div class="f_goodsInfo">' +
								'		<div class="f_left">' +
								'           <div class="f_leftPic">' +
								'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
								'           </div>' +
								'			<div class="f_imgInfo">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'				<p class="f_money">¥' + list[i].money + '元</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="f_right">' + str + '</div>' +
								'	</div>' +
								'	<div class="f_bgImg">' +
								'	</div>' +
								'</li>'
							)
						}
						firstDoor = true;
						$('#allContent').text('数据加载中......');

					} else {
						$('#allContent').text('没有更多数据');
						setTimeout(function() {
							$('#allContent').text('')
						}, 1000);
						firstDoor = true;
					}
				},
				error: function() {
					$('#allContent').text('加载失败');
					firstDoor = true;
				}
			});
		}

		function secondMore() {
			page2++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/indent",
				data: {
					uid: uid,
					page: page,
					type: 1,
					token: MD5(uid + SL)
				},
				success: function(data) {
					var list = data.data;
					var pageurl = '';
					var str = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].status == 1) {
								if(list[i].code == 0) {
									list[i].code = '待使用'
									list[i].status = '去使用'
									pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								} else if(list[i].code == 1) {
									list[i].code = '已使用'
									list[i].status = '去评价'
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							} else if(list[i].status == 9) {
								list[i].status == '退款中'
							} else if(list[i].status == 10) {
								list[i].status == '已退款'
							} else {
								list[i].status = '去支付'
								if((list[i].code == '')) {
									list[i].code = '待支付'
									pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							}
							$('.f_toBePaid>ul').append(
								'<li class="line">' +
								'	<div class="f_number">' +
								'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
								'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
								'	</div>' +
								'	<div class="f_goodsInfo">' +
								'		<div class="f_left">' +
								'           <div class="f_leftPic">' +
								'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
								'           </div>' +
								'			<div class="f_imgInfo">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'				<p class="f_money">¥' + list[i].money + '元</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="f_right">' + str + '</div>' +
								'	</div>' +
								'	<div class="f_bgImg">' +
								'	</div>' +
								'</li>'
							)
						}
						secondDoor = true;
						$('#toBePaid').text('数据加载中......');

					} else {
						$('#toBePaid').text('没有更多数据');
						setTimeout(function() {
							$('#toBePaid').text('')
						}, 1000);
						secondDoor = true;
					}
				},
				error: function() {
					$('#toBePaid').text('加载失败');
					secondDoor = true;
				}
			});
		}

		function thirdMore() {
			page3++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/indent",
				data: {
					uid: uid,
					page: page,
					type: 2,
					token: MD5(uid + SL)
				},
				success: function(data) {
					var list = data.data;
					var pageurl = '';
					var str = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].status == 1) {
								if(list[i].code == 0) {
									list[i].code = '待使用'
									list[i].status = '去使用'
									pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								} else if(list[i].code == 1) {
									list[i].code = '已使用'
									list[i].status = '去评价'
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							} else if(list[i].status == 9) {
								list[i].status == '退款中'
							} else if(list[i].status == 10) {
								list[i].status == '已退款'
							} else {
								list[i].status = '去支付'
								if((list[i].code == '')) {
									list[i].code = '待支付'
									pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							}
							$('.f_toUse>ul').append(
								'<li class="line">' +
								'	<div class="f_number">' +
								'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
								'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
								'	</div>' +
								'	<div class="f_goodsInfo">' +
								'		<div class="f_left">' +
								'           <div class="f_leftPic">' +
								'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
								'           </div>' +
								'			<div class="f_imgInfo">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'				<p class="f_money">¥' + list[i].money + '元</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="f_right">' + str + '</div>' +
								'	</div>' +
								'	<div class="f_bgImg">' +
								'	</div>' +
								'</li>'
							)
						}
						thirdDoor = true;
						$('#toUse').text('数据加载中......');
					} else {
						$('#toUse').text('没有更多数据');
						setTimeout(function() {
							$('#toUse').text('')
						}, 1000);
						thirdDoor = true;
					}
				},
				error: function() {
					$('#toUse').text('加载失败');
					thirdDoor = true;
				}
			});
		}

		function fourthMore() {
			page4++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/indent",
				data: {
					uid: uid,
					page: page,
					type: 3,
					token: MD5(uid + SL)
				},
				success: function(data) {
					var list = data.data;
					var pageurl = '';
					var str = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].status == 1) {
								if(list[i].code == 0) {
									list[i].code = '待使用'
									list[i].status = '去使用'
									pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								} else if(list[i].code == 1) {
									list[i].code = '已使用'

									list[i].status = '去评价'
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							} else if(list[i].status == 9) {
								list[i].status == '退款中'
							} else if(list[i].status == 10) {
								list[i].status == '已退款'
							} else {
								list[i].status = '去支付'
								if((list[i].code == '')) {
									list[i].code = '待支付'
									pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							}
							$('.f_alreadyUse>ul').append(
								'<li class="line">' +
								'	<div class="f_number">' +
								'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
								'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
								'	</div>' +
								'	<div class="f_goodsInfo">' +
								'		<div class="f_left">' +
								'           <div class="f_leftPic">' +
								'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
								'           </div>' +
								'			<div class="f_imgInfo">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'				<p class="f_money">¥' + list[i].money + '元</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="f_right">' + str + '</div>' +
								'	</div>' +
								'	<div class="f_bgImg">' +
								'	</div>' +
								'</li>'
							)
						}
						fourthDoor = true;
						$('#alreadyUse').text('数据加载中......');
					} else {
						$('#alreadyUse').text('没有更多数据');
						setTimeout(function() {
							$('#alreadyUse').text('')
						}, 1000);
						fourthDoor = true;
					}
				},
				error: function() {
					$('#alreadyUse').text('加载失败');
					fourthDoor = true;
				}
			});
		}

		function lastMore() {
			page5++
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/indent",
				data: {
					uid: uid,
					page: page,
					type: 4,
					token: MD5(uid + SL)
				},
				success: function(data) {
					var list = data.data;
					var pageurl = '';
					var str = '';
					if(data.code == 200) {
						for(var i = 0; i < list.length; i++) {
							if(list[i].status == 1) {
								if(list[i].code == 0) {
									list[i].code = '待使用'
									list[i].status = '去使用'
									pageurl = '../../src/team/validate.html?id=' + list[i].id + ''
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								} else if(list[i].code == 1) {
									list[i].code = '已使用'
									list[i].status = '去评价'
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							} else if(list[i].status == 9) {
								list[i].status == '退款中'
							} else if(list[i].status == 10) {
								list[i].status == '已退款'
							} else {
								list[i].status = '去支付'
								if((list[i].code == '')) {
									list[i].code = '待支付'
									pageurl = "../../src/personal/pay.html?id=" + list[i].id + "&uid=" + userData.uid;
									str = '<a href="' + pageurl + '"><p class="code">' + list[i].status + '</p></a>'
								}
							}
							$('.f_refund>ul').append(
								'<li class="line">' +
								'	<div class="f_number">' +
								'		<p style="color: #666666;float:left;">订单号:&nbsp;' + list[i].ordernumber + '</p>' +
								'		<p style="color: #5793dd; float:right; margin-right: .24rem;">' + list[i].code + '</p>' +
								'	</div>' +
								'	<div class="f_goodsInfo">' +
								'		<div class="f_left">' +
								'           <div class="f_leftPic">' +
								'				<img class="f_left_pic" src="' + list[i].images + '"/>' +
								'           </div>' +
								'			<div class="f_imgInfo">' +
								'				<p class="f_name">' + list[i].name + '</p>' +
								'				<p class="f_time">' + format(list[i].time).substr(0, 10) + '</p>' +
								'				<p class="f_money">¥' + list[i].money + '元</p>' +
								'			</div>' +
								'		</div>' +
								'		<div class="f_right">' + str + '</div>' +
								'	</div>' +
								'	<div class="f_bgImg">' +
								'	</div>' +
								'</li>'
							)
						}
						lastDoor = true;
						$('#refund').text('数据加载中......');
					} else {
						$('#refund').text('没有更多数据');
						setTimeout(function() {
							$('#refund').text('')
						}, 1000);
						lastDoor = true;
					}
				},
				error: function() {
					$('#refund').text('加载失败');
					lastDoor = true;
				}
			});
		}
		var firstDoor = true,
			secondDoor = false,
			thirdDoor = false,
			fourthDoor = false,
			lastDoor = false;
		//点击全部
		$('.allContent').on('click', function() {
			$(this).find('hr').show();
			$('.f_allContent').show();
			$('.changeToBePaid').hide();
			$('.changeToUse').hide();
			$('.changeAlreadyUse').hide();
			$('.changeRefund').hide();
			$('.f_toBePaid').hide();
			$('.f_toUse').hide();
			$('.f_alreadyUse').hide();
			$('.f_refund').hide();
			$('.allContent').css('color', '#5793DD');
			$('.toBePaid').css('color', '#333333');
			$('.toUse').css('color', '#333333');
			$('.alreadyUse').css('color', '#333333');
			$('.refund').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			firstDoor = true;
			secondDoor = false;
			thirdDoor = false;
			fourthDoor = false;
			lastDoor = false;
		});
		//点击待支付
		$('.toBePaid').on('click', function() {
			$(this).find('hr').show();
			$('.f_toBePaid').show();
			$('.changeAllContent').hide();
			$('.changeToUse').hide();
			$('.changeAlreadyUse').hide();
			$('.changeRefund').hide();
			$('.f_allContent').hide();
			$('.f_toUse').hide();
			$('.f_alreadyUse').hide();
			$('.f_refund').hide();
			$('.allContent').css('color', '#333333');
			$('.toBePaid').css('color', '#5793DD');
			$('.toUse').css('color', '#333333');
			$('.alreadyUse').css('color', '#333333');
			$('.refund').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			firstDoor = false;
			secondDoor = true;
			thirdDoor = false;
			fourthDoor = false;
			lastDoor = false;
		});
		//点击待使用
		$('.toUse').on('click', function() {
			$(this).find('hr').show();
			$('.f_toUse').show();
			$('.changeAllContent').hide();
			$('.changeToBePaid').hide();
			$('.changeAlreadyUse').hide();
			$('.changeRefund').hide();
			$('.f_allContent').hide();
			$('.f_toBePaid').hide();
			$('.f_alreadyUse').hide();
			$('.f_refund').hide();
			$('.allContent').css('color', '#333333');
			$('.toBePaid').css('color', '#333333');
			$('.toUse').css('color', '#5793DD');
			$('.alreadyUse').css('color', '#333333');
			$('.refund').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			firstDoor = false;
			secondDoor = false;
			thirdDoor = true;
			fourthDoor = false;
			lastDoor = false;
		});
		//点击已使用
		$('.alreadyUse').on('click', function() {
			$(this).find('hr').show();
			$('.f_alreadyUse').show();
			$('.changeAllContent').hide();
			$('.changeToBePaid').hide();
			$('.changeToUse').hide();
			$('.changeRefund').hide();
			$('.f_allContent').hide();
			$('.f_toBePaid').hide();
			$('.f_toUse').hide();
			$('.f_refund').hide();
			$('.allContent').css('color', '#333333');
			$('.toBePaid').css('color', '#333333'); 
			$('.toUse').css('color', '#333333');
			$('.alreadyUse').css('color', '#5793DD');
			$('.refund').css('color', '#333333');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			firstDoor = false;
			secondDoor = false;
			thirdDoor = false;
			fourthDoor = true;
			lastDoor = false;
		});
		//点击退款
		$('.refund').on('click', function() {
			$(this).find('hr').show();
			$('.f_refund').show();
			$('.changeAllContent').hide();
			$('.changeToBePaid').hide();
			$('.changeToUse').hide();
			$('.changeAlreadyUse').hide();
			$('.f_allContent').hide();
			$('.f_toBePaid').hide();
			$('.f_toUse').hide();
			$('.f_alreadyUse').hide();
			$('.allContent').css('color', '#333333');
			$('.toBePaid').css('color', '#333333');
			$('.toUse').css('color', '#333333');
			$('.alreadyUse').css('color', '#333333');
			$('.refund').css('color', '#5793DD');
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			firstDoor = false;
			secondDoor = false;
			thirdDoor = false;
			fourthDoor = false;
			lastDoor = true;
		});
		//加载更多
		var clientH = Number(document.documentElement.clientHeight);
		var height5 = Number($('#allContent').height());
		$(document).on('scroll', function() {
			if(firstDoor) {
				//获取文档高度
				var docH = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Top = parseInt($('#allContent').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docH >= H5Top - 150) {
					firstDoor = false;
					$('#allContent').text('数据加载中......');
					firstMore();
				}
			} else if(secondDoor) {
				//获取文档高度
				var docHs = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Tops = parseInt($('#toBePaid').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docHs >= H5Tops - 150) {
					secondDoor = false;
					$('#toBePaid').text('数据加载中......');
					secondMore();
				}
			} else if(thirdDoor) {
				//获取文档高度
				var docHs = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Tops = parseInt($('#toUse').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docHs >= H5Tops - 150) {
					thirdDoor = false;
					$('#toUse').text('数据加载中......');
					thirdMore();
				}
			} else if(fourthDoor) {
				//获取文档高度
				var docHs = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Tops = parseInt($('#alreadyUse').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docHs >= H5Tops - 150) {
					fourthDoor = false;
					$('#alreadyUse').text('数据加载中......');
					fourthMore();
				}
			} else if(lastDoor) {
				//获取文档高度
				var docHs = parseInt(document.documentElement.scrollTop | document.body.scrollTop + clientH);
				var H5Tops = parseInt($('#refund').offset().top + height5); //获取h5底部距离文档顶部的高度
				if(docHs >= H5Tops - 150) {
					lastDoor = false;
					$('#refund').text('数据加载中......');
					lastMore();
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
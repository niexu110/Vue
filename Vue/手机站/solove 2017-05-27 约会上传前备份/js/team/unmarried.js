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
		var wall = document.getElementById('wall'),
			article = document.getElementsByClassName('article'),
			liLength = article.length,
			cheapM = document.getElementById('cheapM'),
			cheapLi = document.getElementsByClassName('cheapLi'),
			cheapLength = cheapLi.length,
			news = true,
			cheap = false;
		loadPage()

		function loadPage() {
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/type_list",
				data: {
					id: id().u_id,
					type: type,
					page: page,
					token: MD5(id().u_id + type + SL)
				},
				success: function(data) {
					var list = data.data
					for(var i = 0; i < list.length; i++) {
						var index = getShort(article);
						//外边框
						var a = document.createElement('a')
						a.href = "../../src/team/detailedInfo.html?id=" + list[i].id;
						var div = document.createElement('div');
						div.setAttribute('class', 'newsBorder');
						a.appendChild(div);
						//大图
						var border = document.createElement('div');
						border.setAttribute('class', 'newsBigPicBorder');
						var img = document.createElement('img');
						img.setAttribute('class', 'newsBigPic');
						var imgs = new Image();
						img.src = list[i].images;
						imgs.src = img.src;
						img.style.height = imgs.height / 100 + "rem";
						if(img.style.height >= 3+"rem"){
							img.src = img.src + "/teamdabshenda"
						}else{
							img.src = img.src + "/teamdabshenxiao"
						}
						border.appendChild(img);
						div.appendChild(border);
						//名字
						var p = document.createElement('p');
						p.setAttribute('class', 'newsName');
						p.innerHTML = list[i].name;
						div.appendChild(p);
						//时间
						var newsTime = document.createElement('div');
						var timeIcon = document.createElement('img');
						var timeInfo = document.createElement('p');
						newsTime.setAttribute('class', 'newsTime');
						timeIcon.setAttribute('class', 'timeIcon');
						timeInfo.setAttribute('class', 'timeInfo');
						timeIcon.src = "../../img/icon/t_findFood_time.png";
						timeInfo.innerHTML = (format(list[i].date_time)).substr(0, 10);
						newsTime.appendChild(timeIcon);
						newsTime.appendChild(timeInfo);
						div.appendChild(newsTime);
						//位置
						var newsGps = document.createElement('div');
						var gpsIcon = document.createElement('img');
						var gpsInfo = document.createElement('p');
						newsGps.setAttribute('class', 'newsGps');
						gpsIcon.setAttribute('class', 'gpsIcon');
						gpsInfo.setAttribute('class', 'gpsInfo');
						gpsIcon.src = "../../img/icon/t_blackGps.png";
						gpsInfo.innerHTML = list[i].address;
						newsGps.appendChild(gpsIcon);
						newsGps.appendChild(gpsInfo);
						div.appendChild(newsGps);
						//分割线
						var hr = document.createElement('hr');
						hr.setAttribute('class', 'line');
						hr.size = 1 + "px";
						hr.color = "#E6E6E6";
						div.appendChild(hr);
						//价格
						var money = document.createElement('p');
						money.setAttribute('class', 'newsMoney');
						money.innerHTML = list[i].price + '元/人';
						div.appendChild(money);
						article[index].appendChild(a); //加到最短的
					}
					news = true;
					$('.newLoading').text('没有更多数据');
					setTimeout(function() {
						$(".newLoading").text('')
					}, 1000);
				}
			});
		};

		function cheapMore() {
			$.ajax({
				type: "POST",
				url: d_http + "index.php/Home/Goods/type_list",
				data: {
					id: id().u_id,
					type: types,
					page: pages,
					token: MD5(id().u_id + types + SL)
				},
				success: function(data) {
					var list = data.data
					for(var i = 0; i < list.length; i++) {
						var index = getShort(cheapLi);
						//外边框
						var a = document.createElement('a');
						var div = document.createElement('div');
						div.setAttribute('class', 'cheapBorder');
						a.href = "../../src/team/detailedInfo.html?id=" + list[i].id;
						a.appendChild(div);
						//大图
						var border = document.createElement('div');
						border.setAttribute('class', 'newsBigPicBorder');
						var img = document.createElement('img');
						img.setAttribute('class', 'newsBigPic');
						var imgs = new Image();
						img.src = list[i].images;
						imgs.src = img.src;
						img.style.height = imgs.height / 100 + "rem";
						if(img.style.height >= 3+"rem"){
							img.src = img.src + "/teamdabshenda"
						}else{
							img.src = img.src + "/teamdabshenxiao"
						}
						border.appendChild(img);
						div.appendChild(border);
						//名字
						var p = document.createElement('p');
						p.setAttribute('class', 'cheapName');
						p.innerHTML = list[i].name;
						div.appendChild(p);
						//时间
						var newsTime = document.createElement('div');
						var timeIcon = document.createElement('img');
						var timeInfo = document.createElement('p');
						newsTime.setAttribute('class', 'newsTime');
						timeIcon.setAttribute('class', 'timeIcon');
						timeInfo.setAttribute('class', 'timeInfo');
						timeIcon.src = "../../img/icon/t_findFood_time.png";
						timeInfo.innerHTML = (format(list[i].date_time)).substr(0, 10);
						newsTime.appendChild(timeIcon);
						newsTime.appendChild(timeInfo);
						div.appendChild(newsTime);
						//位置
						var newsGps = document.createElement('div');
						var gpsIcon = document.createElement('img');
						var gpsInfo = document.createElement('p');
						newsGps.setAttribute('class', 'newsGps');
						gpsIcon.setAttribute('class', 'gpsIcon');
						gpsInfo.setAttribute('class', 'gpsInfo');
						gpsIcon.src = "../../img/icon/t_blackGps.png";
						gpsInfo.innerHTML = list[i].address;
						newsGps.appendChild(gpsIcon);
						newsGps.appendChild(gpsInfo);
						div.appendChild(newsGps);
						//分割线
						var hr = document.createElement('hr');
						hr.setAttribute('class', 'line');
						hr.size = 1 + "px";
						hr.color = "#E6E6E6";
						div.appendChild(hr);
						//价格
						var money = document.createElement('p');
						money.setAttribute('class', 'newsMoney');
						money.innerHTML = list[i].price + '元/人';
						div.appendChild(money);
						cheapLi[index].appendChild(a);
					}
					cheap = true;
					$('.cheapLoading').text('没有更多数据');
					setTimeout(function() {
						$(".cheapLoading").text('')
					}, 1000);
				}
			});
		}
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
		}).one("click",function() {
			cheapMore();
		});
		//加载更多
		window.onscroll = function() {
			var clientH = Number(document.documentElement.clientHeight);
			var height5 = Number($('.newLoading').height());   
			
			if(news) {
				var index = getShort(article);
				var minLi = article[index];
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop + clientH;
				var H5Top = parseInt($('.newLoading').offset().top + height5);
				if(scrollTop >= H5Top-150) {
					news = false;
					page++;
					$('.newLoading').text('数据加载中......');
					loadPage();
				}
			}
			if(cheap) {
				var index = getShort(cheapLi);
				var minLi = cheapLi[index];
				var scrollTop = document.documentElement.scrollTop || document.body.scrollTop + clientH;
				var H5Top = parseInt($('.cheapLoading').offset().top + height5);
				if(scrollTop >= H5Top-150) {
					cheap = false;
					pages++;
					$('.cheapLoading').text('数据加载中......');
					cheapMore();
				}
			}
		};

		function getShort(str) {
			var index = 0;
			var liHeight = str[index].offsetHeight;
			for(var i = 0; i < str.length; i++) {
				if(str[i].offsetHeight < liHeight) {
					index = i;
					liHeight = str[i].offsetHeight;
				}
			}
			return index;
		};
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
};
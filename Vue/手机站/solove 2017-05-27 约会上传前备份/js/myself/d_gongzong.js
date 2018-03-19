/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
	function show(){
		$(".d_popupbox").css("display","block")
	}
	function hide(){
		$(".d_popupbox").css("display","none")
	}
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
$(function(){
	$(".d_back").on("click",function(){
		window.history.back(-1); 
	})
})
var d_head="/head";
var d_photo="/photo";
var d_gift="/gift"

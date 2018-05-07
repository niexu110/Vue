document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';
function  skip(url){
     window.location.href=url;
}
//提示弹窗
function hint(text,time){
	$(".hint").show().html(text);
	setTimeout(function show(){
		$(".hint").css("display","none")
	},time);
}
var _ajax = {
    get: function (url, data, success) {
        $.ajax({
            type: "GET",
            url:url,
            data: data,
            success: function (res) {
                success ? success(res) : function () { };
            }
        })
    },
    post: function (url, data, success) {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (res) {
                success ? success(res) : function () { };
            }
        })
    },
}
//时间戳
function add0(m) {
    return m < 10 ? '0' + m : m
}
function format(timer) {
    var time = new Date(timer * 1000);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times = y +'年' + add0(m) + '月' + add0(d) + '日 ';
    return times
}

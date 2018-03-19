$(function(){
	var URL = document.location.toString();
	var chengdui = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	$(".d_list img").eq(chengdui).removeClass("d_dui");
	$(".d_list li").on("click",function(){
		var index=$(".d_list li").index(this)
		$(".d_list img").addClass("d_dui");
		$(".d_list img").eq(index).removeClass("d_dui");
		chengdui=$(".d_list span").eq(index).text()
		if(chengdui=="(所有人可见)"){
			chengdui=0
		}else if(chengdui=="(仅好友可见)"){
			chengdui=1
		}else if(chengdui=="(仅自己可见)"){
			chengdui=2
		}
	})
	$(".d_quxiao").on("click",function(){
		location.href="publish.html"
	})
	$(".d_save").on("click",function(){
		location.href="publish.html?chengdui="+chengdui
	})
})

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	var name;
	var identity;
	$(".d_inp1").on("change",function(){
		name=$(".d_inp1").val()
	})
	$(".d_inp2").on("change",function(){
		identity=$(".d_inp2").val()
	})
	$(".d_btn").on("click",function(){
		$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Index/identity",
			data:{
				name:name,
				identity:identity,
				uid:uid,
				token:MD5(uid+SL)
			},
			success:function(data){
				if(data.code==200){
					$(".d_popupbox").html(data.massage)
	     			setTimeout(show,500)
	     			setTimeout(hide,3000)
	     			window.location.href="mypage.html"
				}else if(data.code==404){
					$(".d_popupbox").html(data.massage)
	     			setTimeout(show,500)
	     			setTimeout(hide,3000)
				}
			}
		});
	})
	
})
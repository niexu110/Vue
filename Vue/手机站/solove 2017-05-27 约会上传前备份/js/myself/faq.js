/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
$(function(){
	$.ajax({
		type:"GET",
		url:d_http+"index.php/Home/User/question",
		success:function(data){
			var list=data.data;
			for(var i in list){
				$(".d_contentBox").append("<div class='d_contentlist' title="+list[i].id+"><p>"+list[i].title+"</p><img src='../../img/icon/d_rightHui.jpg' /></div>")
			}
			$(".d_contentBox .d_contentlist").on("click",function(){
				localStorage.setItem("faqid",$(this).attr("title"))
				window.location.href="question.html"
			})
		}
	});
})

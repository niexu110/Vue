/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var questionid=localStorage.getItem("faqid")
$(function(){
	$.ajax({
		type:"GET",
		url:d_http+"index.php/Home/User/question_list",
		data:{
			id:questionid,
			token:MD5(questionid+SL)
		},
		success:function(data){
			$(".d_banner p").html(data.data.title)
			$(".d_contentBox").html(data.data.content)
		}
	});
	$(".d_backbox").on("click",function(){
		localStorage.removeItem("faqid");
		window.location.href="faq.html"
	})
})

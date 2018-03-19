$(function(){
	$(".d_titleBox>div").on("click",function(){
		localStorage.removeItem("k_position")
		location.href="publish.html"
	})
})

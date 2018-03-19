$(function(){
	$.ajax({
		type:"get",
		url:d_http+"index.php/Home/Soubrette/explain",
		success : function(data){
			if(data.code == 200){
			}
		}
	});
})

$(function(){
	var url=document.location.toString()
	console.log(url)
	var oldUid=url.substring(url.indexOf('=')+1,url.length);
	var uid=localStorage.getItem('uid');
	console.log(oldUid)
	$("#btn").on("click",function(){
		if(oldUid==0){
			$(".d_popupbox").html("请进行身份证认证")
 			setTimeout(show,500)
 			setTimeout(hide,2000)
 			return;
		}else if(oldUid==1){
			$.ajax({
				type:"post",
				url:d_http+"index.php/Home/Soubrette/add_order",
				data : {
					uid : uid
				},
				success : function(data){
					if(data.code == 200){
						$(".order_number").val(data.data);
						$(".d_form").submit();
					}
				}
			});
		}
		
	})
})

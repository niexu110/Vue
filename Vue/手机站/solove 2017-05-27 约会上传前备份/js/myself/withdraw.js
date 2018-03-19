var uid=localStorage.getItem("uid");
$(function(){
	var URL = document.location.toString();
	var yuemoney= URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	console.log(yuemoney)
	$(".d_texttop input").attr("placeholder","可提现"+yuemoney+"元")
	$(".d_texttop p").on("click",function(){
		$(".d_texttop input").val(yuemoney)
	})
	$(".d_btn").on("click",function(){
		console.log($(".d_texttop input").val(),$(".d_wxzhifu").val())
		if($(".d_texttop input").val()==""){
			$(".d_popupbox").html("请输入您提现的金额");
 			setTimeout(show,500);
 			setTimeout(hide,3000);
		}else if($(".d_texttop input").val()<0.1){
			$(".d_popupbox").html("提现金额不能少于0.1元");
 			setTimeout(show,500);
 			setTimeout(hide,3000);
		}else if($(".d_wxzhifu").val()==""){
			$(".d_popupbox").html("请输入您的支付宝帐号");
 			setTimeout(show,500);
 			setTimeout(hide,3000);
		}else{
			//表单提交
			$(".d_uid").val(uid);
			$(".d_name").val($(".d_wxzhifu").val());
			$(".d_money").val($(".d_texttop input").val());
			console.log(uid,$(".d_wxzhifu").val(),$(".d_texttop input").val())
			$(".d_form").submit();
			// $.ajax({
			// 	type:'post',
			// 	url:'http://back.qinyikou.cc/index.php/Pay/deposit',
			// 	data:{
			// 		uid:uid,
			// 		name:$(".d_wxzhifu").val(),//支付宝账号
			// 		money:$(".d_texttop input").val()
			// 	},
			// 	success:function(data){
			// 		console.log(data)
			// 		if(data.code==200){
			// 			location.href="mywallet.html"
			// 		}else{
			// 			$(".d_popupbox").html(data.massage)
		 //     			setTimeout(show,500)
		 //     			setTimeout(hide,3000)
			// 		}
			// 	}
			// })
		}
		
	})
})

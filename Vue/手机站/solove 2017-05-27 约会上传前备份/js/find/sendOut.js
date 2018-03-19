function show(){
	$(".d_popupbox").css("display","block");
}
function hide(){
	$(".d_popupbox").css("display","none");
}
$(function(){
	var userId = localStorage.getItem("uid");
	var type=location.href.substring(location.href.indexOf('=')+1,location.href.length)
	$(".IMG").on("click",function(){
		$(".money").val("");
		$(".num").val("");
		$(".words").val("");
	})
	//失焦判断
	$(".money").on("input",function(){	
		if($(this).val() !== ""){
			$(this).next("s").css("color","#111");
		}else{
			$(this).next("s").css("color","#aaa");
		}
		//2017-4-17添加判断条件
		if($(".money").val() > 200){
			$(".d_popupbox").html("红包金额最大只能为200元");
   			setTimeout(show,500);
   			setTimeout(hide,2000); 
   			$(".money").val("");
   			$("#money").html("0.00");
			return;
			//2017-4-17添加判断条件
		}else if($(this).val().length > 4 && $(this).val() <= 200){
			value = $(this).val().substring(0,4);
			$(this).val(value);
		}
	})
	//同步并保留两位小数
	$(".money").bind('input propertychange',function(){
		var money = $(this).val();
	    $("#money").html(Number(money).toFixed(2));
	});
	$(".num").on("input",function(){
		if($(this).val() !== ""　|| $(this).val() !== 0){
			$(this).next("s").css("color","#111");
		}else{
			$(this).next("s").css("color","#aaa");
		}
		var num = Math.round($(".num").val())
		$(this).val(num);
		//2017-4-17添加判断条件
		if($(".num").val() <= 100 && $(".num").val() >= 1 && $(this).val().length < 3){
			$(".num").val().substring(0,2);
			if(($(".money").val()*100) / $(".num").val() < 1){
				if($(".money").val() == 0.00){
					$(".money").val("");
				}else{
					$(".d_popupbox").html("单个红包金额不能低于0.01");
		 			setTimeout(show,500);
		 			setTimeout(hide,2000);
					return;
				}
			}
			//2017-4-17添加判断条件
		}else if($(".num").val() > 100){
			value = $(this).val().substring(0,3);
			$(this).val(value);
			$(".d_popupbox").html("红包个数最大只能为100个");
 			setTimeout(show,500);
 			setTimeout(hide,2000);
			return;
		}else if($(".num").val() == 0){
			//2017-4-17判断红包数量
			$(".d_popupbox").html("红包数量不能为空");
 			setTimeout(show,500);
 			setTimeout(hide,2000);
			return;
		}
	})
	$(".words").on("input",function(){
		if($(this).val().length > 15){
			value = $(this).val().substring(0,15);
			$(this).val(value);
			$(".d_popupbox").html("约恋留言最多可输入15个字");
 			setTimeout(show,500);
 			setTimeout(hide,2000);	
			return;
		}
	})
	//点击发红包，判断约恋留言
	$(".btn").on("click",function(){
		var money = $("#money").text();
		var num = $(".num").val();
		var words = $(".words").val();
		var uid = localStorage.getItem('uid');
		if(money != "" && money != 0.00 && num != "" && num != 0){
			if(($(".money").val()*100) / $(".num").val() >= 1){
				$.ajax({
					type:"post",
					url:d_http+"/index.php/Home/Index/red_packet",
					data : {
						money   : money,
						number  : num,
						uid     : uid,
						content : words,
						h_type: type
					},
					success : function (data){
						if(data.code == 200){
							if($(".words").val() == ""){
								$(".words").val("恭喜发财，我们来约");
							}
							$(".order_number").val(data.data);
							console.log(data.data)
							$(".d_form").submit();
							// $.ajax({
							// 	type:"post",
							// 	url: d_http + "index.php/Mobile/lsit_index",
							// 	data : {
							// 		order_number : data.data
							// 	},
							// 	success : function(data){

							// 	}
							// });
						}
					}
				});
			}else{
				if($(".money").val() > 200){
					$(".d_popupbox").html("红包金额最大只能为200元")
		 			setTimeout(show,500)
		 			setTimeout(hide,2000)
					return;
				}
				if($(".num").val() > 100){
					$(".d_popupbox").html("红包个数最大只能为100个")
		 			setTimeout(show,500)
		 			setTimeout(hide,2000)
					return;
				}
				if(($(".money").val()*100) / $(".num").val() < 1){
					$(".d_popupbox").html("单个红包金额不能低于0.01")
		 			setTimeout(show,500)
		 			setTimeout(hide,2000)
					return;
				}
			}
		}else{
			if($(".money").val() == 0.00  || $(".num").val() == "" ){
				$(".d_popupbox").html("红包金额不能为空")
	 			setTimeout(show,500)
	 			setTimeout(hide,2000)
				return;
			}
			if($(".num").val() == "" || $(".num").val() == 0){
				$(".d_popupbox").html("红包数量不能为空")
	 			setTimeout(show,500)
	 			setTimeout(hide,2000)
				return;
			}
		}
	})
})

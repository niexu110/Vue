var imgheight=0;
$(function(){
	var uid=localStorage.getItem("uid");
	var URL = document.location.toString();
	var chengdui = URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	if(chengdui.length>5){
		chengdui=0
	}else{
		chengdui=chengdui
	}
	if(chengdui=="0"){
		$(".d_eyebox>p").text("公开");
		$(".d_eye").attr("src","../../img/icon/d_eyehui.png")
	}else if(chengdui=="1"){
		$(".d_eyebox>p").text("仅好友");
		$(".d_eye").attr("src","../../img/icon/d_eyelan.png")
	}else if(chengdui=="2"){
		$(".d_eyebox>p").text("仅自己");
		$(".d_eye").attr("src","../../img/icon/d_eyelan.png")
	}
	//点击可见性
	$(".d_eyebox").on("click",function(){
		location.href="visibility.html?chengdui="+chengdui
	})
	//点击选择位置
	$(".d_map").on("click",function(){
		$(".d_topbigbox").show();
	})
	//点击发布
	console.log(imgheight)
   	$(".d_save").on("click",function(){
   		$(".d_uid").val(uid);
   		$(".d_titlel").val($("textarea").val());
   		if($("textarea").val()=="" && imgheight==0){
   				$(".d_popupbox").html('请输入内容或上传图片！')
					setTimeout(show,500)
					setTimeout(hide,3000)	
   		}else{
   			if($(".d_map>span").text()=='选择位置'){
	   			$(".d_address").val('');
	   		}else{
	   			$(".d_address").val($(".d_map>span").text());
	   		}
	   		if($("textarea").val()!="" && imgheight==0){
	   			$.ajax({
	   				type:'post',
	   				url:d_http+'index.php/Home/article/condition',
	   				data:{
	   					uid:uid,
	   					title:$(".d_titlel").val(),
	   					address:$(".d_address").val(),
	   					image:''
	   				},
	   				success:function(data){
	   					if(data.code==200){
	   						$(".d_popupbox").html(data.massage)
							setTimeout(show,500)
							setTimeout(function hide(){
								$(".d_popupbox").css("display","none");
								location.href="../../index.html"
							},1500)	
	   					}
	   				}
	   			});
	   		}else{
	   			var form = new FormData(document.getElementById("form"));
			    $.ajax({
			        url: d_http+"index.php/Home/Article/condition",
			        type: "post",
			        data : form, 
			        processData : false,
			        contentType:false,
			        success : function (data) {
			        	console.log(data)
			            if(data.code == 200){
			                $(".d_popupbox").html(data.massage)
							setTimeout(show,500)
							setTimeout(function hide(){
								$(".d_popupbox").css("display","none");
								location.href="../../index.html"
							},1500)	
			            }else{
		            		$(".d_popupbox").html(data.massage)
							setTimeout(show,500)
							setTimeout(hide,1500)	
			            }
			        }
			    })
	   		}
   		}
   	});
   	// 取消
   	$('.cancel').on('click',function(){
   		$('textarea').val('');
   		$('#d_btn').val('');
   		location.href="../../index.html"
   	});
   	$(".d_quxiaomap").on("click",function(){
		$(".d_topbigbox").hide();
	})
})

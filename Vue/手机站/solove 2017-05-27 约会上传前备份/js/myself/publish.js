//上传照片
var imglist=[]
function he() {
    if($('.d_photoBox>ul>li').length>=9){
    	$(".d_popupbox").html('相册图片不能超过9张').show();
    	setTimeout(function(){
    		$(".d_popupbox").html('').hide()
    	},3000)
    	return;
    }else if($('.d_photoBox>ul>li').length<9){
//  	$(".d_uid").val(uid)
//		$(".d_token").val(MD5(uid+SL))
	    var oFile = document.getElementById('d_btn').files[0];
	    var thisimg=oFile['name']
	    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
	    var oReader = new FileReader();
	    oReader.onload = function(e){
	    	$(".d_photoBox>ul").append("<li class='d_ulson'><img src="+e.target.result+" /><p class='d_offxx' style='display:none;'>×</p></li>")
			imglist.push(e.target.result);
			//点击删除图片
			// $("ul .d_offxx").on("click",function(event){
			// 	var index=$("ul .d_offxx").index(this);
			// 	imglist.splice(index,1)
			// 	$("ul>li").eq(index).remove();
			// 	 event.stopPropagation();
			// })
	    };
	    oReader.readAsDataURL(oFile);
    	$(".d_popupbox").html('上传成功！').show();
    	setTimeout(function(){
    		$(".d_popupbox").html('').hide()
    	},3000)
    }
}
$(function(){
	var uid=localStorage.getItem("uid");
	if(localStorage.getItem("k_position")==null){
		$(".d_map>span").text("选择位置")
		$(".d_bianshi").attr("src","../../img/icon/d_maphui.png")
	}else{
		$(".d_map>span").text(localStorage.getItem("k_position"))
		$(".d_bianshi").attr("src","../../img/icon/d_map.png")
	}
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
		location.href="selectposition.html"
	})
	//点击发布
   	$(".d_save").on("click",function(){
   		$(".d_uid").val(uid);
   		$(".d_titlel").val($("textarea").val());
   		if($(".d_titlel").val($("textarea").val())==""){
   				$(".d_popupbox").html('请输入内容！')
					setTimeout(show,500)
					setTimeout(hide,3000)	
   		}else{
   			if($(".d_map>span").text()=='选择位置'){
	   			$(".d_address").val('');
	   		}else{
	   			$(".d_address").val($(".d_map>span").text());
	   		}
	   		if($('.d_he').val()==''){
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
	   					console.log(data)
	   					if(data.code==200){
	   						location.href='../../index.html'
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
												history.go(-1);
											},3000)	
			            }else{
			            		$(".d_popupbox").html(data.massage)
											setTimeout(show,500)
											setTimeout(hide,3000)	
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
   		// history.go(-1);
   		location.href='../../index.html'
   	});
})

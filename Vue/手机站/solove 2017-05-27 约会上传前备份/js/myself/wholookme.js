/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$(".d_content2").hide()
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/look",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		if(data.code==200){
     			var list=data.data;
     			for(var i in list){
     				list[i].times=format(list[i].times);
     				if(list[i].sex==1){
     					list[i].img="../../img/icon/x_boy_icon.png";
     					list[i].classstyle="classboy"
     				}else if(list[i].sex==2){
     					list[i].img="../../img/icon/x_girl_icon.png";
     					list[i].classstyle="classgirl";
     				}
     				if(list[i].image=="" || list[i].image==null || list[i].image==undefined){
     					list[i].image="../../img/icon/d_head.png";
     				}else{
     					list[i].image=list[i].image+"/head";
     				}
     				$(".d_content1").append("<div class='d_contentlist' title="+list[i].uid+"><img class='d_headimg' src="+list[i].image+" /><div class='d_contentcenter'><div class='d_contenttitle'><p>"+list[i].nickname+"</p><div class='d_sexord "+list[i].classstyle+"'><img src="+list[i].img+" /><p>"+list[i].age+"</p></div></div><span class='d_time'>"+list[i].times+"</span></div></div>")
     			}
     			$(".d_content1 .d_contentlist").on("click",function(){
	     			var friendid=$(this).attr("title")
	     			window.location.href="../../src/find/personalcarte.html?id="+friendid;
	     		})
     		}else if(data.code==404){
     			$(".d_popupbox").html(data.massage)
     			setTimeout(show,500)
     		}
     	}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/f_look",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		if(data.code==200){
     			var list=data.data;
     			for(var i in list){
     				list[i].times=format(list[i].times);
     				if(list[i].sex==1){
     					list[i].img="../../img/icon/x_boy_icon.png";
     					list[i].classstyle="classboy"
     				}else if(list[i].sex==2){
     					list[i].img="../../img/icon/x_girl_icon.png";
     					list[i].classstyle="classgirl";
     				}
     				if(list[i].image=="" || list[i].image==null || list[i].image==undefined){
     					list[i].image="../../img/icon/d_head.png";
     				}else{
     					list[i].image=list[i].image+"/head";
     				}
     				$(".d_content2").append("<div class='d_contentlist'><img class='d_headimg' src="+list[i].image+" /><div class='d_contentcenter'><div class='d_contenttitle'><p>"+list[i].nickname+"</p><div class='d_sexord "+list[i].classstyle+"'><img src="+list[i].img+" /><p>"+list[i].age+"</p></div></div><span class='d_time'>"+list[i].times+"</span></div></div>")
     			}
     			$(".d_content1 .d_contentlist").on("click",function(){
	     			var friendid=$(this).attr("title")
	     			window.location.href="../../src/find/personalcarte.html?id="+friendid;
	     		})
     		}else if(data.code==404){
     			$(".d_popupbox").html(data.massage)
     			setTimeout(show,500)
     			setTimeout(hide,3000)
     		}
     	}
	});
	$(".d_navlist p").on("click",function(){
		$(this).addClass("d_navclass").siblings().removeClass("d_navclass");
		var index=$(".d_navlist p").index(this)
		$(".d_contentBox>div").eq(index).show().siblings().hide()
	})
})

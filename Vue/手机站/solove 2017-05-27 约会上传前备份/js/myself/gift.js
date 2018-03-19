/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$(".d_content2").hide()
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/giftmy",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		if(data.code==200){
     			var list=data.data;
     			for(var i in list){
     				list[i].times=new Date(parseInt(list[i].times) * 1000).toLocaleString().substr(0, 9).replace('/\//g', '-')
     				if(list[i].image=="" || list[i].image==null || list[i].image==undefined){
     					list[i].image="../../img/icon/d_head.png"
     				}else{
     					list[i].image=list[i].image+d_head
     				}
     				$(".d_content1").append("<div class='d_contentlist'><img src="+list[i].gift_photo+d_gift+" /><div class='d_left'><p>"+list[i].gift_name+"</p><span>"+list[i].nickname+"</span></div><div class='d_center'><p>×"+list[i].number+"</p><span>"+list[i].money+"</span></div><div class='d_right'><p>"+list[i].times+"</p><span>"+list[i].money+"搜恋币</span></div></div>")
     			}
     		}else if(data.code==404){
     			$(".d_popupbox").html(data.massage)
     			setTimeout(show,500)
     		}
     	}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/mygift",
		data: {
         	uid:uid,
            token:MD5(uid+'solianJSKASDKES')
     	},
     	success:function(data){
     		if(data.code==200){
     			var list=data.data;
     			for(var i in list){
     				list[i].times=new Date(parseInt(list[i].times) * 1000).toLocaleString().substr(0, 9).replace('/\//g', '-')
     				if(list[i].image=="" || list[i].image==null || list[i].image==undefined){
     					list[i].image="../../img/icon/d_head.png"
     				}
     				$(".d_content2").append("<div class='d_contentlist'><img src="+list[i].gift_photo+" /><div class='d_left'><p>"+list[i].gift_name+"</p><span>"+list[i].nickname+"</span></div><div class='d_center'><p>×"+list[i].number+"</p><span>"+list[i].money+"</span></div><div class='d_right'><p>"+list[i].times+"</p><span>"+list[i].money+"搜恋币</span></div></div>")
     			}
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
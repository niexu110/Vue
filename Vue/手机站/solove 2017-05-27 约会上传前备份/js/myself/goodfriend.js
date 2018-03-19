/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/myfirends",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		if(data.code==200){
     			var goodslist=data.data;
     			for(var i in goodslist){
     				if(goodslist[i].sex==1){
     					goodslist[i].img='../../img/icon/x_boy_icon.png'
     				}else if(goodslist[i].sex==2){
     					goodslist[i].img='../../img/icon/x_girl_icon.png';
     					goodslist[i].addclass="d_addimg"
     				}
     				if(goodslist[i].image=="" || goodslist[i].image==undefined){
     					goodslist[i].image="../../img/icon/d_head.png"
     				}
     				$(".d_goodslist").append("<div class='d_goodF d_goodFlist' title="+goodslist[i].uid+"><img src="+goodslist[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+goodslist[i].nickname+"</h2><div class='d_agesex "+goodslist[i].addclass+"'><img src="+goodslist[i].img+" /><span>"+goodslist[i].age+"</span></div></div><p>"+goodslist[i].myideal+"</p></div></div></div>")
     			}
     		}else if(data.code==404){
     			$(".d_popupbox").html(data.massage)
     			setTimeout(show,500)
     			setTimeout(hide,3000)
     		}
     		$(".d_goodslist .d_goodFlist").on("click",function(){
     			var friendid=$(this).attr("title")
     			window.location.href="../../src/find/personalcarte.html?id="+friendid;
     		})
     	}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/myfire",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
     	success:function(data){
     		if(data.code==200){
     			var length=data.data.length;
     			if(length>=1){
	     			$(".d_hints").addClass("d_hint")
	     			$(".d_hints").html(length)
     			}
     		}
     	}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/f_likse",
		data:{
			uid:uid,
			token:MD5(333+SL)
		},
		success:function(data){
			var mylike=data.data
			for(var i in mylike){
 				if(mylike[i].sex==1){
 					mylike[i].img='../../img/icon/x_boy_icon.png'
 				}else if(mylike[i].sex==2){
 					mylike[i].img='../../img/icon/x_girl_icon.png';
 					mylike[i].addclass="d_addimg"
 				}
 				if(mylike[i].image=="" || mylike[i].image==undefined){
 					mylike[i].image="../../img/icon/d_head.png"
 				}
 				$(".d_mylike").append("<div class='d_goodF d_goodFlist' title="+mylike[i].uid+"><img src="+mylike[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+mylike[i].nickname+"</h2><div class='d_agesex "+mylike[i].addclass+"'><img src="+mylike[i].img+" /><span>"+mylike[i].age+"</span></div></div><p>"+mylike[i].myideal+"</p></div></div></div>")
 			}
			$(".d_mylike .d_goodFlist").on("click",function(){
     			var friendid=$(this).attr("title")
     			window.location.href="../../src/find/personalcarte.html?id="+friendid;
     		})
		}
	});
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/likse",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			var likeme=data.data
			for(var i in likeme){
 				if(likeme[i].sex==1){
 					likeme[i].img='../../img/icon/x_boy_icon.png'
 				}else if(likeme[i].sex==2){
 					likeme[i].img='../../img/icon/x_girl_icon.png';
 					likeme[i].addclass="d_addimg"
 				}
 				if(likeme[i].image=="" || likeme[i].image==undefined){
 					likeme[i].image="../../img/icon/d_head.png"
 				}
 				$(".d_likeme").append("<div class='d_goodF d_goodFlist' title="+likeme[i].uid+"><img src="+likeme[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+likeme[i].nickname+"</h2><div class='d_agesex "+likeme[i].addclass+"'><img src="+likeme[i].img+" /><span>"+likeme[i].age+"</span></div></div><p>"+likeme[i].myideal+"</p></div></div></div>")
 			}
			$(".d_likeme .d_goodFlist").on("click",function(){
     			var friendid=$(this).attr("title")
     			window.location.href="../../src/find/personalcarte.html?id="+friendid;
     		})
		}
	});
	$(".d_navbox p").on("click",function(){
		$(this).addClass("d_addnav").siblings().removeClass("d_addnav");
		var index=$(".d_navbox p").index(this);
		$(".d_contentbox>div").eq(index).removeClass("d_hidden").siblings().addClass("d_hidden");
		
	})
})

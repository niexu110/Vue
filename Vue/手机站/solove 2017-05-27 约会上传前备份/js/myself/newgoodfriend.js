/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
$(function(){
	var uid=localStorage.getItem("uid")
	var f_uid=""
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/myfire",
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
     				$(".d_goodslist").append("<div class='d_goodF'><img src="+goodslist[i].image+" /><div class='d_goodFrigth'><div class='d_goodFcenter'><div class='d_newgood'><h2>"+goodslist[i].nickname+"</h2><div class='d_agesex "+goodslist[i].addclass+"'><img src="+goodslist[i].img+" /><span>"+goodslist[i].age+"</span></div></div><p>"+goodslist[i].myideal+"</p></div><h4 class='d_agree' title="+goodslist[i].uid+">接受</h4></div></div>")
     			}
     		}else if(data.code==404){
     			$(".d_popupbox").html("暂无新的好友")
     			setTimeout(show,500)
     		}
     	   	$(".d_goodslist .d_agree").on("click",function(){
                f_uid=$(this).attr("title")
                $(this).remove()
        		$.ajax({
					type:"POST",
					url:d_http+"index.php/Home/User/consent",
					data: {
			         	uid:uid,
			         	f_uid:f_uid,
			            token:MD5(uid+f_uid+SL)
			     	},
			     	success:function(data){
			     		if(data.code==200){
			     			$(".d_popupbox").html("已同意")
			     			setTimeout(show,500)
			     			setTimeout(hide,3000)
			     		}else{
			     			$(".d_popupbox").html(data.massage)
			     			setTimeout(show,500)
			     			setTimeout(hide,3000)
			     		}
			     	}
				})
	
		    })
     	}
	});

				

})

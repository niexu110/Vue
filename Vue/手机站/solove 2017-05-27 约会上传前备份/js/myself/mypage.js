/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
	var uid=localStorage.getItem("uid")
	var olduid;
$(function(){
	$("body").on("click",function(){
		if(localStorage.getItem("uid")==null){
			localStorage.setItem("url",window.location.href)
			window.location.href="../../src/login/login.html"
		}
	})
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/userindex",
		data: {
         	uid:localStorage.getItem("uid"),
            token:MD5(uid+SL)
     	},
        success: function(data){
        	console.log(data)
            if(data.code=200){
        		var mypage=data.data
	            if(mypage.image=="" || mypage.image==undefined){
	            	mypage.image="../../img/icon/d_head.png"
	            }
	            $(".d_headImg").attr('src',mypage.image);
	            $(".d_nickname").text(mypage.nickname);
	            $(".d_xuanyan").text();
	            $(".d_guanzhu").text(mypage.attention);
	            $(".d_fensisi").text(mypage.fan);
	            if(mypage.uid==undefined){
	            	mypage.uid="***"
	            }
	            $(".d_xuanyan").text("搜恋号:"+mypage.uid)
	            olduid=mypage.old_uid;/*身份是否认证，1代表认证 */
	           	localStorage.setItem("d_sex",mypage.sex);
	           	/* 头像跳转 */
	           	$(".d_headImg").on("click",function(){
	            	location.href="../../src/find/personalcarte.html?id="+data.data.uid
	            });
	            /* 设置页面跳转 */
				$(".d_settingimg").on("click",function(){window.location.href='../../src/myself/settingup.html';});
				/* 修改资料页面跳转 */
				$(".d_bianji").on("click",function(){window.location.href='../../src/myself/personage.html';});
				/*红娘页面跳转*/
				$(".d_redmum").on("click",function(){window.location.href='../../src/find/matchmaker.html';});
				/* 钱包页面跳转 */
				$(".d_money").on("click",function(){window.location.href='../../src/myself/mywallet.html';});
				/* 认证页面跳转 */
				$(".d_sure").on("click",function(){
					if(olduid==1){
		     			$(".d_popupbox").html("身份已认证")
		     			setTimeout(show,500)
		     			setTimeout(hide,2000)
					}else{
						window.location.href='../../src/myself/identity.html';
					}
				});
				/* 礼物页面跳转 */
				$(".d_gift").on("click",function(){window.location.href='../../src/myself/gift.html';	});
				/* 会员中心 */
				$(".d_vip").on("click",function(){
		     		if(mypage.is_vip==0){
							location.href="../../src/vip/becomeVip.html?olduid="+olduid
						}else if(mypage.is_vip==1){
							location.href="../../src/vip/vipindex.html"
						}
				})
				/* 谁看过我 */
				$(".d_wholookme").on("click",function(){window.location.href='../../src/myself/wholookme.html';	});
				/* 常见问题*/
				$(".d_faq").on("click",function(){window.location.href='../../src/myself/faq.html';	});
				/* 谁看过我 */
				$(".d_purchase").on("click",function(){window.location.href='../../src/team/purchasedService.html';});
				/* 邀请好友 */
				$(".d_invitefriend").on("click",function(){window.location.href='../../src/myself/invitefriend.html';	});	
        	}
            
        }
	});
	
})
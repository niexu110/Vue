/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	var URL = document.location.toString();
	var yuemoney= URL.substring(URL.lastIndexOf("=") + 1, URL.length);
	/* 近期明细 */
	var page=0;
	$(".d_topmoney p").html(yuemoney)
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/user/red_list",
		data:{
			uid:uid,
			type:0,
			page:page,
			token:MD5(uid+SL)
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				var list=data.data;
					for(var i in list){
						list[i].times=format(list[i].times)
						if(list[i].m_type==2){
							list[i].title="红包";
						}else if(list[i].m_type==3){
							list[i].title="提现";
						}
						$(".d_contentbox").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].title+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span>"+list[i].money+"元</span></div></div>")
					}
				$(".d_center").on("click",function(){
					location.href="withdraw.html?ss="+yuemoney
				})
			}
		}
			
	});
	$(".d_back").on("click",function(){
		window.history.back(-1); 
	})
})
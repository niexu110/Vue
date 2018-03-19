/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var uid=localStorage.getItem("uid")
$(function(){
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/money",
		data:{
			uid:uid,
			token:MD5(uid+SL)
		},
		success:function(data){
			$(".d_topmoney p").html(data.data.virtual)
			
		}
	});
	/* 近期明细 */
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/Money/virtual",
		data:{
			uid:uid,
			type:'0',
			page:0,
			token:MD5(uid+SL)
		},
		success:function(data){
			console.log(data)
			var list=data.data;
				for(var i in list){
					if(list[i].type==0){
						list[i].type="充值";
						list[i].money="+"+list[i].money;
					}else if(list[i].type==1){
						list[i].type="送礼物";
						list[i].money="-"+list[i].money;
					}else if(list[i].type==2){
						list[i].type="单约";
						list[i].money="-"+list[i].money;
					}else if(list[i].type==3){
						list[i].type="提现";
						list[i].money="-"+list[i].money;
					}
					$(".d_contentbox").append("<div class='d_contentlist'><div class='d_content1'><strong>"+list[i].type+"</strong><span>"+list[i].times+"</span></div><div class='d_content2'><strong></strong><span>"+list[i].money+"搜恋币</span></div></div>")
				}
			}
	});
	$(".d_back").on("click",function(){
		window.history.back(-1); 
	})
})
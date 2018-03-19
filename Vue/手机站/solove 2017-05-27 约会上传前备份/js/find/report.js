function show(){
	$(".bomb").css("display","block")
}
function hide(){
	$(".bomb").css("display","none")
}
$(function(){
	var uid = localStorage.getItem("uid");
	var html='';
	var jbId='';
	var rid = location.href;
	rid = rid.substring(rid.indexOf('=')+1,rid.length);
	$.ajax({
		type:"get",
		url:d_http+"/index.php/Home/user/report_user",
		success : function(data){
			if(data.code == 200){
				for(var i=0;i<data.data.length;i++){
					html+='<li name="'+data.data[i].id+'"><p>'+data.data[i].title+'</p><p class="report"><img 				src="../../img/icon/h_report.png"/></p></li>'
				}
				$('.list>ul').append(html);
				$("ul li").on("click",function(){
					jbId=$(this).attr('name');
					$(this).find('.report').show();
					$(this).siblings().find('.report').hide();
				});
			}
		}
	});
	$("#btn").on("click",function(){
		if(jbId != ""){
			$.ajax({
				type:"post",
				url:d_http+"/index.php/Home/user/report",
				data : {
					m_uid : uid,
					r_uid : rid,
					r_id  : jbId,
					token : MD5(uid + rid + SL)
				},
				success : function(data){
					if(data.code == 200){
						$(".bomb").html(data.massage);
						setTimeout(show,500);
					 	setTimeout(hide,2000);	
					}else{
						$(".bomb").html(data.massage);
						setTimeout(show,500);
					 	setTimeout(hide,2000);
					}
				}
			})
		}else{		
			$(".bomb").html("请选择举报的原因");
			setTimeout(show,500);
		 	setTimeout(hide,2000);
		}
	})
})

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
			$(".d_rechargeTop p").html(data.data.virtual)
			
		}
	});
	var arr=[
		{soumoney:"88",zhushi:"（仅限首次购买）",money:"1"},
		{soumoney:"100",zhushi:"",money:"10"},
		{soumoney:"200",zhushi:"",money:"20"},
		{soumoney:"500",zhushi:"",money:"50"},
		{soumoney:"1000",zhushi:"",money:"100"},
		{soumoney:"3000",zhushi:"",money:"300"},
		{soumoney:"5000",zhushi:"",money:"500"},
	]
	for(var i in arr){
		if(arr[i].zhushi==undefined){
			arr[i].zhushi==""
		}
		$(".d_contentBox").append("<div class='d_contentlist'><div class='d_contentleft'><img src='../../img/icon/d_soulianmoney.png'/><p>"+arr[i].soumoney+"搜恋币</p><span>"+arr[i].zhushi+"</span></div><div class='d_contentright'><img src='../../img/icon/d_zuanshi.png'/><p>￥"+arr[i].money+"</p></div></div>")
	}
	$(".d_contentBox .d_contentright").on("click",function(){
		var index=$(".d_contentBox .d_contentright").index(this);
		localStorage.setItem("d_key1",arr[index].soumoney);
		localStorage.setItem("d_key2",arr[index].money);
		$.ajax({
			type:"POST",
			url:d_http+"index.php/Home/Goods/card",
			data:{
				uid:uid,
				money:arr[index].money
			},
			success:function(data){
				if(data.code==200){
					localStorage.setItem("d_goodsId",data.data)
	    			window.location.href="buy.html"
				}else{
					$(".d_popupbox").html(data.massage)
	     			setTimeout(show,500)
	     			setTimeout(hide,3000)
				}
			}
		});
	})
})
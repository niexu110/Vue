window.onload=function(){
	console.log(localStorage.getItem("uid"))
	var filterObj=JSON.parse(localStorage.getItem('filterObj')); //获取筛选条件
	var resultData={
		sexClass:'men',
		page:0,
		userAll:''
	};
	
	//请求数据渲染函数
	function getData(obj){
		filterObj.uid=localStorage.getItem("uid"),
		filterObj.page=obj.page,
		filterObj.token=MD5(localStorage.getItem("uid")+'solianJSKASDKES');
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/Soubrette/search_list',
			data:filterObj,
			success:function(data){
				console.log(data)
					console.log(localStorage.getItem("d_sex"))
				if(data.code==200){
					$('.filterResult').html('');
					obj.page+=1;
					$('.totalNum').html(data.data.count);
					for(var i=0;i<data.data.list.length;i++){
						// 性别判断
						if(data.data.list[i].sex==2){
							resultData.sexClass='women';
						}else{
							resultData.sexClass='men';
						}
						//头像判断
						if(data.data.list[i].image=='' || data.data.list[i].image==null){
							data.data.list[i].image='../../img/icon/d_head.png'
						}
						$('.filterResult').append('<li data-id="'+data.data.list[i].uid+'"><a href="personalcarte.html?uid='+data.data.list[i].uid+'"><div class="userImg"><img src="'+data.data.list[i].image+'"><span class="'+obj.sexClass+'">'+data.data.list[i].age+'岁</span></div><div class="userNick">'+data.data.list[i].nickname+'</div></a></li>');
					}
				}
			}
		});	
	}
	getData(resultData);

	//点击换一批
	$('.btnMore').on('click',function(){
		getData(resultData);
	});
	//全部发送见面请求
	$('.sendAll').on('click',function(){
		$('.filterResult li').each(function(){
			resultData.userAll+=$(this).attr('data-id')+',';
		});
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/Soubrette/all_meet',
			data:{
				uid:localStorage.getItem("uid"),
				meet_uid:resultData.userAll.substring(0,resultData.userAll.length-1),
				token:MD5(localStorage.getItem("uid")+'solianJSKASDKES')
			},
			success:function(data){
				if(data.code==200){
					$('.notice').html(data.massage).show();
					setTimeout(function(){
						$('.notice').html('').hide();
					},2000);
					$(".cover").show();
				}else{
					$('.notice').html(data.massage).show();
					setTimeout(function(){
						$('.notice').html('').hide();
					},2000);
				}
			}
		});
	});
	//重新筛选
	$('.headRight a').on('click',function(){
		localStorage.removeItem('filterObj');
		location.href='filterItem.html';
	})
	$(".no").on("click",function(){
		$(".cover").hide();
	})
	$(".yes").on("click",function(){
		window.location.href = "dateRecord.html";
	})
}
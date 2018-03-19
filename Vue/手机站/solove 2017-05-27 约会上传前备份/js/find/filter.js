window.onload=function(){
	(function(){
		localStorage.setItem('age','');
		localStorage.setItem('height','');
		localStorage.setItem('sex',0);
		localStorage.setItem('address','');
		//显示隐藏
		function showHide(sH){
			if(sH==true){
				$('.mask').show();
				$('.filterargument').show();
				$('.filterargument>ul').html('');
			}else{
				$('.mask').hide();
				$('.filterargument').hide();
				$('.filterargument>ul').html('');
			}	
		}
		//性别选择
		var sex=0;
		$('.sexChoice>span').on('click',function(){
			if($(this).index()==1){
				$(this).css({'background':'#5793dd','color':'#ffffff'}).siblings().css('background','none');
				$(this).siblings('.girls').css('color','#feb3c5');
				$(this).siblings('.all').css('color','#cfcfcf');
				sex=1;
				localStorage.setItem('sex',sex);
			}else if($(this).index()==2){
				$(this).css({'background':'#feb3c5','color':'#ffffff'}).siblings().css('background','none');
				$(this).siblings('.all').css('color','#cfcfcf');
				$(this).siblings('.boys').css('color','#5793dd');
				sex=2;
				localStorage.setItem('sex',sex);
			}else{
				$(this).css({'background':'#cfcfcf','color':'#ffffff'}).siblings().css('background','none');
				$(this).siblings('.boys').css('color','#5793dd');
				$(this).siblings('.girls').css('color','#feb3c5');
				sex=0;
				localStorage.setItem('sex',sex);
			}
		});

		var age='',height='';
		//身高年龄选择
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/User/shai',
			data:{uid:localStorage.getItem('uid')},
			success:function(data){
				if(data.code==200){
					$('.age').on('click',function(){
						showHide(true);
						for(var i=0;i<data.data.age.length;i++){
							$('.filterargument>ul').append('<li>'+data.data.age[i]+'</li>');
						}
						$('.filterargument>ul>li').on('click',function(){
							$('.age>s').html($(this).html());
							showHide(false);
							if($(this).html()=='不限'){
								age='';
							}
							age=$(this).html();
							localStorage.setItem('age',age);
						});
					});
					$('.height').on('click',function(){
						showHide(true);
						for(var j=0;j<data.data.height.length;j++){
							$('.filterargument>ul').append('<li>'+data.data.height[j]+'</li>');
						}
						$('.filterargument>ul>li').on('click',function(){
							$('.height>s').html($(this).html());
							showHide(false);
							if($(this).html()=='不限'){
								height='';
							}
							height=$(this).html();
							localStorage.setItem('height',height);
						});
					});

				}else{
					return;
				}
			}
		});

		$('.filterargument>p').on('click',function(){
			showHide(false);
		});
		//点击确定
		$('.headRight').on('click',function(){
			var address=$('#cityResult').html();
			if($('#cityResult').html()=='不限'){
				localStorage.setItem('address','')
			}else{
				localStorage.setItem('address',$('#cityResult').html())
			}
			location.href='../../index.html';
		});
	})()
}
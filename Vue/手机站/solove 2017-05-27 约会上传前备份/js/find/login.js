window.onload=function(){
	function showError(){
		setTimeout(function(){
			$('.error').html('').hide();
		},1500);
	}
	// 失去焦点函数
	function inputBlur(obj){
		if(obj.val()==''){
			if(obj.attr('id')=='userPhone'){
				$('.error').html('手机号不能为空。').show();
				showError();
				return;
			}
			if(obj.attr('id')=='userCode'){
				$('.error').html('密码不能为空。').show();
				showError();
				return;
			}
		}else{
			if(obj.attr('id')=='userPhone'){
				if(obj.val().length!=11){
					$('.error').html('手机号输入有误。').show();
					showError();
					return;
				}
			}
			if(obj.attr('id')=='userCode'){
				if(obj.val().length<6 || obj.val().length>18){
					$('.error').html('密码输入有误。').show();
					showError();
					return;
				}
			}
		}
	}
	$('input').on('blur',function(){
		inputBlur($(this));	
	});

	// 提交表单
	$('#submitBtn').on('click',function(){
		if($('.error').html()==''){
			$.ajax({
				type:'post',
				url:'http://m.solian.cc/index.php/Home/Index/login',
				data:{
					username:$('#userPhone').val(),
					password:$('#userCode').val(),
					token:MD5($('#userPhone').val()+$('#userCode').val()+'solianJSKASDKES')
				},
				success:function(data){
					if(data.code==200){
                        var userObj=JSON.stringify(data.data);
                        localStorage.setItem("uid",data.data.uid);
                        localStorage.setItem('userData',userObj);
						$('.error').html('登陆成功！').show();
						setTimeout(function(){
                            showError();
                            window.location.href=localStorage.getItem("url")
							//history.back(-1);
						},1000)
					}else{
						$('.error').html(data.massage).show();
						showError();
					}
				}
			})
		}else{
			return;
		}
	});
}
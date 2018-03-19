window.onload=function(){
	var meetUp={
		uid:localStorage.getItem('uid'),//登陆用户的uid
		more:true, //加在更多开关
		meetType:0,	//0--我发起的  1--约见我的  2--已完成的
		page:0,
		sexImg:'../../img/icon/x_boy_icon.png', //性别图片
		sexClass:'sexClass',  //性别背景色类名
		already:'already',  //去评价按钮
		el:$('.mySend ul'),//需要渲染数据的元素
		wait:'wait',  //等待对方确认
		waitContent:'waitContent',
		agree:'agree',
		noAgree:'noAgree',
		h3Text:'',  //h3提示语
		waitTime:'waitTime',
		releaseImg:'releaseImg',
		releaseSrc:'../../img/icon/x_agreen_icon.png',
		waitTimeText:'同意时间：',
		alreadyText:'',
		waitText:'等待对方确认',
		id:''

	}
	//点击我发起的
	$('.send').on('click',function(){
		meetUp.meetType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').show();
		$('.sendToMe').hide();
		$('.completed').hide();
		meetUp.page=0;
		meetUp.el=$('.mySend ul');
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getMeetData(meetUp);
	});
	//点击约见我的
	$('.tome').on('click',function(){
		meetUp.meetType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').hide();
		$('.sendToMe').show();
		$('.completed').hide();
		meetUp.page=0;
		meetUp.el=$('.sendToMe ul')
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getMeetData(meetUp);
	});
	//点击已完成的
	$('.com').on('click',function(){
		meetUp.meetType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').hide();
		$('.sendToMe').hide();
		$('.completed').show();
		meetUp.page=0;
		meetUp.el=$('.completed ul')
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getMeetData(meetUp);
	});
	getMeetData(meetUp)
	//请求数据函数
	function getMeetData(obj){
		$.ajax({
			type:'post',
			url:d_http+'index.php/Home/Soubrette/meet_list',
			data:{
				uid:meetUp.uid, //
				type:meetUp.meetType,
				page:meetUp.page,
				token:MD5(meetUp.uid+SL) //meetUp.uid
			},
			success:function(data){
				console.log(data)
				if(data.code==200){
					obj.el.html('');
					obj.page+=1;
					obj.more=true;
					for(var i=0;i<data.data.length;i++){
							//判断头像
							if(data.data[i].image==''){
								data.data[i].image='../../img/icon/d_head.png';
							}
							// 判断性别
							if(data.data[i].sex==2){
								obj.sexImg='../../img/icon/x_girl_icon.png';
								obj.sexClass='sexClass';
							}else{
								obj.sexImg='../../img/icon/x_boy_icon.png';
								obj.sexClass='';
							}
							// 判断状态
							if(data.data[i].status==0){
								
								obj.releaseImg='';
								obj.waitTime='';
								if(obj.meetType==0){
									obj.wait='';	
									obj.waitText='等待对方确认';
									obj.h3Text='耐心等候意中人的回复！'	;
									obj.agree='';
									obj.noAgree='';	
								}else if(obj.meetType==1){
									obj.wait='wait';
									obj.h3Text='向您发送了约会请求'	;
									obj.agree='agree';
									obj.noAgree='noAgree';	
								}
							}else if(data.data[i].status==1){
								obj.wait='wait';
								obj.h3Text='没关系，继续寻觅真爱';
								obj.releaseImg='releaseImg';
								obj.releaseSrc='../../img/icon/x_naysay_icon.png';
								obj.waitTime='waitTime';
								obj.agree='';
								obj.noAgree='';	
								obj.waitTimeText='拒绝时间：'							
							}else if(data.data[i].status==2){
								obj.wait='wait';
								obj.h3Text='红娘会和您取得联系安排约会事宜！';
								obj.releaseImg='releaseImg';
								obj.releaseSrc='../../img/icon/x_agreen_icon.png';
								obj.waitTime='waitTime';
								obj.agree='';
								obj.noAgree='';
								obj.waitTimeText='同意时间：'							
							}else if(data.data[i].status==3){
								obj.wait='';
								obj.waitText='';
								if(data.data[i].m_type==0){
									obj.h3Text='您发送了约会请求';
								}else{
									obj.h3Text='向您发送了约会请求';
								}
								obj.releaseImg='releaseImg';
								obj.releaseSrc='../../img/icon/x_complete_icon.png';
								obj.waitTime='waitTime';
								obj.already='goopinion';
								obj.agree='';
								obj.noAgree='';
								obj.alreadyText='去评价';
								obj.waitTimeText='同意时间：'							
							}else{
								obj.wait='';
								obj.waitText='';
								obj.already='already'
								obj.releaseImg='releaseImg';
								obj.releaseSrc='../../img/icon/x_complete_icon.png';
								obj.waitTime='waitTime';
								obj.waitTimeText='同意时间：';
								obj.agree='';
								obj.noAgree='';
								if(data.data[i].m_type==0){
									obj.h3Text='您发送了约会请求';
								}else{
									obj.h3Text='向您发送了约会请求';
								}
								obj.alreadyText='已评价';
								obj.waitTimeText='同意时间：'							
							}

							obj.el.append('<li data-muid="'+data.data[i].m_uid+'"><a href="##"><div class="itemLeft"><img src="'+data.data[i].image+'"></div><div class="itemRight"><h1>'+data.data[i].nickname+' <span class="'+obj.sexClass+'"><img src="'+obj.sexImg+'">26</span></h1><h2 class="'+obj.wait+'">'+obj.waitText+' <span data-yueId="'+data.data[i].id+'" class="'+obj.already+'">'+obj.alreadyText+'</span></h2><h3 data-id="'+data.data[i].id+'" class="'+obj.waitContent+'"><p>'+obj.h3Text+'</p><span class="'+obj.agree+'" name="2">同意</span><span class="'+obj.noAgree+'" name="1">拒绝</span></h3><h4 class="'+obj.waitTime+'">'+obj.waitTimeText+format(data.data[i].m_time)+'</h4><p class="release">发布时间：'+format(data.data[i].m_time)+' <img class="'+obj.releaseImg+'" src="'+obj.releaseSrc+'" alt=""></p></div></a></li>');
						}
						//点击跳转
						$('li').on('click',function(){
							localStorage.setItem('yes',$(this).attr('data-muid')+0);
							location.href='../../src/vip/personalcarte.html?uid='+$(this).attr('data-muid');
						})

						//点击同意
						$('.agree').on('click',function(e){
							e.stopPropagation();
							var self=$(this);
							$.ajax({
								type:'post',
								url:d_http+'index.php/Home/Soubrette/agree_meet',
								data:{
									status:self.attr('name'),
									id:self.parent().attr('data-id'),
									token:MD5(self.parent().attr('data-id')+SL)
								},
								success:function(data){
									if(data.code==200){
										alert(data.massage)
										self.hide();
										self.siblings('span').hide();
										self.parent('h3').siblings('p').find('img').attr('src','../../img/icon/x_agreen_icon.png').show();
										self.parent('h3').siblings('h4').html('同意时间：'+format(data.data)).show();
									}
								}
							});
						});
						//点击拒绝
						$('.noAgree').on('click',function(e){
							e.stopPropagation();
							var self=$(this);
							$.ajax({
								type:'post',
								url:d_http+'index.php/Home/Soubrette/agree_meet',
								data:{
									status:self.attr('name'),
									id:self.parent().attr('data-id'),
									token:MD5(self.parent().attr('data-id')+SL)
								},
								success:function(data){
									if(data.code==200){
										alert(data.massage)
										self.hide();
										self.siblings('span').hide();
										self.parent('h3').siblings('h4').html('拒绝时间：'+format(data.data)).show();
										self.parent('h3').siblings('p').find('img').attr('src','../../img/icon/x_naysay_icon.png').show();
									}
								}
							});
						});

						//点击去评价
						$('.goopinion').on('click',function(e){
							e.stopPropagation();
							$('.d_bgcolor').show();
							meetUp.id=$(this).attr('data-yueId');
							//点击灰色背景
							$('.d_bgcolor').on("click",function(){
									$('.d_bgcolor').hide();
							});
							$('.d_minwindow').on('click',function(e){
								e.stopPropagation();
							})
							//点击评价满意度
							var d_num=$('.goopinion').index(this);
							$(".d_nook img").hide();
							var sat=1;
							$(".d_ok").on("click",function(){
								$(".d_ok img").show();
								$(".d_nook img").hide();
								sat=2;
							})
							$(".d_nook").on("click",function(){
								$(".d_nook img").show();
								$(".d_ok img").hide();
								sat=1;
							})
							//点击提交
							$(".d_submitter").on("click",function(){
								var content=$("textarea").val()
								$.ajax({
									type:"post",
									url:d_http+'index.php/Home/Soubrette/satisfy',
									data:{
										id :meetUp.id,//约会id
										uid : meetUp.uid,//,
										is_sat:sat, //1不满意2满意
										content:content,
										token :MD5(meetUp.uid+meetUp.id+SL)
									},
									success:function(data){
										if(data.code==200){
											$('.d_bgcolor').hide();
											meetUp.id='';
											sat=2;
											$("textarea").val('');
											$(".d_ok img").show();
											$(".d_nook img").hide();
											$('.goopinion').eq(d_num).addClass('already').html('已评价')
										}
									}
								});
							})
						});

				}else{
					$('.more').html('没有更多数据......');
					setTimeout(function(){
						$('.more').html('');
					},1500);
				}
			}
		})
	}



var docH=Number(document.documentElement.clientHeight); //屏幕高度
$(document).on('scroll',function(){
	if(meetUp.more){
		var srollTop=parseInt(document.documentElement.scrollTop | document.body.scrollTop);// 滚动条高度
	var d=parseInt(document.documentElement.scrollHeight|document.body.scrollHeight)
		if((srollTop+docH)>=d-150){
			meetUp.more=false;
			$('.more').html('数据加载中......').show(500);
			getMeetData(meetUp)
		}
	}
});


	//解析时间戳
	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	function format(shijianchuo) {
		var time = new Date(shijianchuo * 1000);
		var y = time.getFullYear();
		var m = time.getMonth() + 1;
		var d = time.getDate();
		var h = time.getHours();
		var mm = time.getMinutes();
		var s = time.getSeconds();
		var times = y + '-' + add0(m) + '-' + add0(d);
		return times
	}
};
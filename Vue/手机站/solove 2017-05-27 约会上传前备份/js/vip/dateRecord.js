window.onload=function(){
	var uid=localStorage.getItem('uid');
	var p=true;
	//约见界面请求数据
	var meetUp={
		itemType:0, //0--我发起的  1--约见我的  2--已完成的
		sexImg:'../../img/icon/x_boy_icon.png',
		sexBj:'color',
		await:'await',
		awaitTime:'',
		awaitImg:'awaitImg',
		awaitSrc:'',
		awaitH2:'',
		itemRight:'',
		awaitText:'awaitText',
		nocolor:'',
		page:0
	}


	//点击我发起的
	$('.send').on('click',function(){
		meetUp.itemType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').show();
		$('.sendToMe').hide();
		$('.completed').hide();
		meetUp.page=0;
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getData();
	});
	//点击约见我的
	$('.tome').on('click',function(){
		meetUp.itemType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').hide();
		$('.sendToMe').show();
		$('.completed').hide();
		meetUp.page=0;
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getData();
	});
	//点击已完成的
	$('.com').on('click',function(){
		meetUp.itemType=$(this).index();
		$(this).siblings().removeClass('addColor');
		$(this).find('s').show();
		$(this).siblings().find('s').hide();
		$(this).addClass('addColor');
		$('.mySend').hide();
		$('.sendToMe').hide();
		$('.completed').show();
		meetUp.page=0;
		document.documentElement.scrollTop=0;
		document.body.scrollTop=0;
		getData();
	});
	getData();
function getData(){
	//请求数据
	$.ajax({
		type:'post',
		url:d_http+'index.php/Home/Soubrette/meet_list',
		data:{
			uid:'335',
			type:meetUp.itemType,
			page:meetUp.page,
			token:MD5('335'+SL)
		},
		success:function(data){
			console.log(data)
			if(data.code==200){
				meetUp.page+=1;
				p=true;
				if(meetUp.itemType==0){
					for(var i=0;i<data.data.length;i++){
						//判断头像
						if(data.data[i].image==''){
							data.data[i].image='../../img/icon/d_head.png';
						}
						// 判断性别
						if(data.data[i].sex==2){
							meetUp.sexImg='../../img/icon/x_boy_icon.png';
							meetUp.sexBj='color';
						}else{
							meetUp.sexImg='../../img/icon/x_girl_icon.png';
							meetUp.sexBj='';
						}
						// 判断状态
						if(data.data[i].status==0){
							console.log(0)
							meetUp.await='await';
							meetUp.awaitTime='';
							meetUp.awaitH2='耐心等候意中人的回复！';
							meetUp.awaitImg='';
							
						}else if(data.data[i].status==1){
							console.log(1)
							meetUp.await='';
							meetUp.awaitImg='awaitImg';
							meetUp.awaitTime='awaitTime';
							meetUp.awaitH2='没关系，继续寻觅真爱！';
							meetUp.awaitSrc='../../img/icon/x_naysay_icon.png';
							meetUp.awaitTimeText='拒绝时间：'+format(data.data[i].t_time);
							
						}else if(data.data[i].status==2){
							console.log(2)
							meetUp.await='';
							meetUp.awaitImg='awaitImg';
							meetUp.awaitTime='awaitTime';
							meetUp.awaitH2='红娘会和您取得联系安排约会事宜！';
							meetUp.awaitSrc='../../img/icon/x_agreen_icon.png';
							meetUp.awaitTimeText='同意时间：'+format(data.data[i].t_time);
						}

						$('.mySend ul').append('<li><a href="##"><div class="itemLeft"><img src="'+data.data[i].image+'" alt=""></div><div class="itemRight"><h1>'+data.data[i].nickname+' <span class="'+meetUp.sexBj+'"><img src="'+meetUp.sexImg+'" alt="">'+data.data[i].age+'</span></h1><h2 class="'+meetUp.await+'">'+meetUp.awaitH2+'</h2><h3 class="awaitText"></h3><h4 class="'+meetUp.awaitTime+'">'+meetUp.awaitTimeText+'</h4><p>发布时间：'+format(data.data[i].m_time)+'<img src="'+meetUp.awaitSrc+'" class="'+meetUp.awaitImg+'" alt=""></p></div></a></li>');
					}
				}else if(meetUp.itemType==1){
					for(var i=0;i<data.data.length;i++){
						//判断头像
						if(data.data[i].image==''){
							data.data[i].image='../../img/icon/d_head.png';
						}
						// 判断性别
						if(data.data[i].sex==2){
							meetUp.sexImg='../../img/icon/x_boy_icon.png';
							meetUp.sexBj='color';
						}else{
							meetUp.sexImg='../../img/icon/x_girl_icon.png';
							meetUp.sexBj='';
						}
						// 判断状态
						if(data.data[i].status==0){
							meetUp.await='await';
							meetUp.awaitTime='';
							meetUp.awaitH2='向您发送了约会请求！';
							meetUp.awaitImg='';
							meetUp.awaitText='awaitText';
							
						}else if(data.data[i].status==1){
							meetUp.await='';
							meetUp.awaitImg='awaitImg';
							meetUp.awaitTime='awaitTime';
							meetUp.awaitText='';
							meetUp.awaitH2='没关系，继续寻觅真爱！';
							meetUp.awaitSrc='../../img/icon/x_naysay_icon.png';
							meetUp.awaitTimeText='拒绝时间：'+format(data.data[i].t_time);
							
						}else if(data.data[i].status==2){
							meetUp.await='';
							meetUp.awaitImg='awaitImg';
							meetUp.awaitTime='awaitTime';
							meetUp.awaitText='';
							meetUp.awaitH2='红娘会和您取得联系安排约会事宜！';
							meetUp.awaitSrc='../../img/icon/x_agreen_icon.png';
							meetUp.awaitTimeText='同意时间：'+format(data.data[i].t_time);
						}

						$('.sendToMe ul').append('<li><a href="##"><div class="itemLeft"><img src="'+data.data[i].image+'" alt=""></div><div class="itemRight"><h1>'+data.data[i].nickname+' <span class="'+meetUp.sexBj+'"><img src="'+meetUp.sexImg+'" alt="">'+data.data[i].age+'</span></h1><h2 class="'+meetUp.await+'">'+meetUp.awaitH2+'</h2><h3 data-id="'+data.data[i].id+'" class="'+meetUp.awaitText+'"><span class="agreen" name="2" data-id="'+data.data[i].uid+'">同意</span><span class="noAgree" name="1" data-id="'+data.data[i].uid+'">拒绝</span></h3><h4 class="'+meetUp.awaitTime+'">'+meetUp.awaitTimeText+'</h4><p>发布时间：'+format(data.data[i].m_time)+'<img src="'+meetUp.awaitSrc+'" class="'+meetUp.awaitImg+'" alt=""></p></div></a></li>');
					}
				}else{
					for(var i=0;i<data.data.length;i++){
						//判断头像
						if(data.data[i].image==''){
							data.data[i].image='../../img/icon/d_head.png';
						}
						// 判断性别
						if(data.data[i].sex==2){
							meetUp.sexImg='../../img/icon/x_boy_icon.png';
							meetUp.sexBj='color';
						}else{
							meetUp.sexImg='../../img/icon/x_girl_icon.png';
							meetUp.sexBj='';
						}
						// 判断状态
						// console.log(data.data[i].status)
						if(data.data[i].status==3){
							console.log(3)
							meetUp.awaitH2='您发送了约会请求';
							meetUp.await='await'
							meetUp.nocolor=''

							
						}else if(data.data[i].status==4){
							console.log(4)
							meetUp.awaitH2='向您发送了约会请求';
							meetUp.await='await'
							meetUp.nocolor='nocolor'
						}

						$('.completed ul').append('<li><a href="##"><div class="itemLeft"><img src="'+data.data[i].image+'" alt=""></div><div class="itemRight"><h1>'+data.data[i].nickname+' <span class="'+meetUp.sexBj+'"><img src="'+meetUp.sexImg+'" alt="">'+data.data[i].age+'</span></h1><h2 class="'+meetUp.await+'">'+meetUp.awaitH2+'<span class="'+meetUp.nocolor+'">去评价</span></h2><h3 class="'+meetUp.awaitText+'"></h3><h4 class="'+meetUp.awaitTime+'">'+meetUp.awaitTimeText+'</h4><p>发布时间：'+format(data.data[i].m_time)+'<img src="'+meetUp.awaitSrc+'" class="'+meetUp.awaitImg+'" alt=""></p></div></a></li>');
					}

				}
				//点击同意
				$('.agreen').on('click',function(){
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
								self.siblings().hide();
							}
						}
					});
				});
				//点击拒绝
				$('.noAgree').on('click',function(){
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
								self.siblings().hide();
							}
						}
					})
				});
			}else{
				p=f=true;
			}
		}
	});
}
//加在更多
var docH=Number(document.documentElement.clientHeight); //屏幕高度
$(document).on('scroll',function(){
	if(p){
		var srollTop=parseInt(document.documentElement.scrollTop | document.body.scrollTop);// 滚动条高度
	var d=parseInt(document.documentElement.scrollHeight|document.body.scrollHeight)
		if((srollTop+docH)>=d-150){
			p=false;
			getData();
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
}
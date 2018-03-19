/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
var nickname,myideal,height,weight,marry,house,cars,citys,job,income,nation,belief,myhobby,interest=[];
var marrynum,housenum,carsnum,jobnum,incomenum,nationnum,beliefnum,interestnum=[],yixingjihe,citybox;
var uid=localStorage.getItem("uid");
var photobox=[]
var imgsrc=[]

//将对象转换成数组
function transform(obj){
    var arr = [];
    for(var item in obj){
        arr.push(obj[item]);
    }
    return arr;
}
//图片页面展示
function he() {
    if($('.d_photo>ul>li').length>=11){
    	$(".d_popupbox").html('相册图片不能超过11张').show();
    	setTimeout(function(){
    		$(".d_popupbox").html('').hide()
    	},3000)
    	return;
    }else{
	    var oFile = document.getElementById('d_btn').files[0];
	    var thisimg=oFile['name']
	    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
	    var oReader = new FileReader();
	    oReader.onload = function(e){
	    	$(".d_photo>ul").prepend("<li><img src="+e.target.result+" /></li>")
		};
	    oReader.readAsDataURL(oFile);
    }
}
$(function(){
	var imgData=[];
	var src=[];
	var image=new Image();
	var startX=0;
	var thisheight=$(window).height();
	var thiswidth=$(window).width();
	var likearr=[];//兴趣爱好集合
	var likenumarr=[];//兴趣爱好下标集合
	var likenumstr;//兴趣爱好下标字符串
	var oppositearr=[];//我喜欢的异性类集合
	var oppositenumarr=[];//我喜欢的异性类下标集合
	var oppositenumstr;//我喜欢的异性类下标字符串
	$(".d_photo>ul").css("hieght","1.8rem")
	$.ajax({
		type:"POST",
		url:d_http+"index.php/Home/User/userdetail",
		data: {
         	uid:uid,
            token:MD5(uid+SL)
     	},
        success: function(data){
        	console.log(data)
            var personage=data.data.data;
            $(".d_inpImg").attr("src",personage.image+d_head);
            $(".d_text2").text(personage.nickname);nickname=personage.nickname;
            $(".d_text3").text(personage.myideal);myideal=personage.myideal;
            $(".d_text4").text(personage.sex);
            $(".d_text6").text( new Date(parseInt(personage.birthday) * 1000).toLocaleString().substr(0, 10).replace(/\//g, '-'));
            $(".d_text7").text(personage.constellation);
            $(".d_text8").text(personage.marry);marry=personage.marry;
            $(".d_text9").text(personage.height+"cm");height=personage.height;
            $(".d_text10").text(personage.weight+"kg");weight=personage.weight;
            $(".d_text11").text(personage.house);house=personage.house;
            $("#d_text12").text(personage.citys);citys=personage.citys;
            $(".d_text13").text(personage.cars);cars=personage.cars;
            $(".d_text14").text(personage.job);job=personage.job;
            $(".d_text15").text(personage.income);income=personage.income;
            $(".d_text16").text(personage.nation);nation=personage.nation;
            $(".d_text17").text(personage.belief);belief=personage.belief;
            $(".d_text18").text(personage.myhobby);myhobby=personage.myhobby;
            $(".d_text19").text(personage.interest);interest=personage.interest;
            photobox=personage.xiangce;//相册展示
            var len=photobox.length;
            if(len>11){
				len=11;
			}
            if(len<=3){
            	$(".d_text5").hide()
            }else{
            	$(".d_text5").show()
            }
            //点击展开  收缩
            $(".d_text5").on("click",function(){
            	if($(".d_text5").text()=='展开'){
            		$(".d_text5").text('收缩');
            		if(3<len<=7){
            			$(".d_photo").css("height","3.4rem")
            		}
            		if(len>7){
            			$(".d_photo").css("height","5.0rem")
            		}
            		
            	}else if($(".d_text5").text()=='收缩'){
            		$(".d_text5").text('展开');
            		$(".d_photo").css("height","1.7rem")
            	}
            })
            
			for(var i=0;i<len;i++){
				$('.d_photo ul').append("<li><img src="+photobox[i].images+d_photo+"></li>");
				src.push(photobox[i].images);
				image.src=photobox[i].images;
				imgData.push('{"width:"'+image.width+'",height:"'+image.height+'}');
			}
            $(".d_photo li").on("click",function(){
            	var clientW=document.documentElement.clientWidth|document.body.width;
				var $w=$('.showImg').width();
				var index=$(this).index();
		    	$('.mask').show();
		    	$('.showImg').show();
		    	$('.showImg>ul').width(imgData.length*clientW).css('left',-index*$w);
		    	for(var j=0;j<src.length;j++){
		    		$('.showImg>ul').append('<li><img src="'+src[j]+'"></li>');
		    	}
		    	$('.showImg>ul').on('touchstart',function(event){
		    		var touch = event.originalEvent.changedTouches[0];
		    		startX=touch.pageX;
		    	});
		    	$('.showImg>ul').on('touchend',function(event){
		    		var touch = event.originalEvent.changedTouches[0];
		    		x=touch.pageX;
		    		var left=$('.showImg>ul').position().left;
		    		//左
		    		if(x>startX){
		    			if(index==0){
		    				index=0;
		    				$('.showImg>ul').css({'left':0})
		    			}else{
		    				index--;
		    				$('.showImg>ul').stop().animate({'left':left+$w},800);
		    			}
		    		}
		    		//右
		    		if(x<startX){
		    			if(index>=len-1){
		    				index=len-1;
		    				$('.showImg>ul').css({'left':-(len-1)*$w});
		    			}else{
		    				index++;
		    				$('.showImg>ul').stop().animate({'left':left-$w},800);
		    			}
		    			
		    		}
		    	});
		    	$('.showImg>ul>li').on('click',function(){
		    		$('.mask').hide();
		    		$('.showImg').hide(500);
		    	})	
		    });
//         	$(".d_photo img").on("tap",function(){
//			  	$(".d_photo img").hide()
//			});
            var marrybox=data.data.marry;//身份集合
            var marrybox1=[];
            marrybox1=transform(marrybox);
            for(var i in marrybox1){
            	$(".d_windowmin").append("<div class='d_windowson'>"+marrybox1[i]+"</div>");
            	if(marrybox1[i]==marry){
            		marrynum=0
            		marrynum=Number(i)+1;
            	}
            }
            var housebox=data.data.house;//住房集合
            var housebox1=[];
            housebox1=transform(housebox)
            for(var i in housebox1){
            	$(".d_windowmin2").append("<div class='d_windowson'>"+housebox1[i]+"</div>");
            	if(housebox1[i]==house){
            		housenum=0;
            		housenum=Number(i)+1;
            	}
            }
            var carsbox=data.data.cars;//私家车
            var carsbox1=[];
            carsbox1=transform(carsbox)
            for(var i in carsbox1){
            	$(".d_windowmin3").append("<div class='d_windowson'>"+carsbox1[i]+"</div>");
            	if(carsbox1[i]==cars){
            		carsnum=0;
            		carsnum=i;
            	}
            }
            var jobbox=data.data.job;//职业
            var jobbox1=[];
            jobbox1=transform(jobbox)
            for(var i in jobbox1){
            	$(".d_windowmin4").append("<div class='d_windowson'>"+jobbox1[i]+"</div>");
            	if(jobbox1[i]==job){
            		jobnum=0;
            		jobnum=Number(i)+1;
            	}
            }
            var incomebox=data.data.income;//收入
            var incomebox1=[];
            incomebox1=transform(incomebox);
            for(var i in incomebox1){
            	$(".d_windowmin5").append("<div class='d_windowson'>"+incomebox1[i]+"</div>");
            	if(incomebox1[i]==income){
            		incomenum=0;
            		incomenum=Number(i)+1;
            	}
            }
            var nationbox=data.data.nation;//民族
            var nationbox1=[];
            nationbox1=transform(nationbox);
            for(var i in nationbox1){
            	$(".d_windowmin6").append("<div class='d_windowson'>"+nationbox1[i]+"</div>");
            	if(nationbox1[i]==nation){
            		nationnum=0;
            		nationnum=Number(i)+2;
            	}
            }
            var beliefbox=data.data.belief;//信仰
            var beliefbox1=[];
            beliefbox1=transform(beliefbox);
            for(var i in beliefbox1){
            	$(".d_windowmin7").append("<div class='d_windowson'>"+beliefbox1[i]+"</div>");
            	if(beliefbox1[i]==belief){
            		beliefnum=0;
            		beliefnum=Number(i)+2;
            	}
            }
            var interestbox=data.data.interest;//我喜欢的异性类
            var interestbox1=[];
            interestbox1=transform(interestbox);
            for(var i in interestbox1){
            	$(".d_label").append("<div class='d_labelson'>"+interestbox1[i]+"</div>")
            }
            //点击昵称
	$(".d_line2").on("click",function(){
		$('.d_windowbg').show();
		$(".clickon").on("click",function(){
			console.log($(".d_windowbg input").val().length)
			if($(".d_windowbg input").val().length<3){
				$(".d_popupbox").html("请输入3-7字的昵称")
				setTimeout(show,500)
				setTimeout(hide,3000)	
			}else{
				$(".d_text2").html($(".d_windowbg input").val())
				nickname=$(".d_text2").html()
				$(".d_windowbg").hide()
			}
		})
		
	})
	//点击个性签名
	$(".d_line3").on("click",function(){
		$('.d_windowbg2').show();
		$(".clickon2").on("click",function(){
			if($(".d_windowbg2 input").val()==""){
				$(".d_popupbox").html("请输入个性签名")
				setTimeout(show,500)
				setTimeout(hide,3000)	
			}else{
				$(".d_text3").html($(".d_windowbg2 input").val())
				myideal=$(".d_text3").html()
				$(".d_windowbg2").hide()
			}
		})
		
	})
	//点击身高
	$(".d_line9").on("click",function(){
		$('.d_windowbg3').show();
		$(".clickon3").on("click",function(){
			if($(".d_windowbg3 input").val()<120){
				$(".d_popupbox").html("请填写你的正常身高")
				setTimeout(show,500)
				setTimeout(hide,2000)	
			}else{
				$(".d_text9").html($(".d_windowbg3 input").val()+"cm")
				height=$(".d_text9").html()
				$(".d_windowbg3").hide()
			}
		})
	})
	//点击体重
	$(".d_line10").on("click",function(){
		$('.d_windowbg4').show();
		$(".clickon4").on("click",function(){
			if($(".d_windowbg4 input").val()<30){
				$(".d_popupbox").html("请填写你的正常体重")
				setTimeout(show,500)
				setTimeout(hide,2000)
			}else{
				$(".d_text10").html($(".d_windowbg4 input").val()+"kg")
				weight=$(".d_text10").html()
				$(".d_windowbg4").hide()
			}
		})
		
	})
	//点击兴趣爱好
	$(".d_line18").on("click",function(){
		$('.d_like').show();
		
	})
	//点击取消
	$(".clickoff").on("click",function(){
		$(".d_windowbg").hide()
		$(".d_windowbg2").hide()
		$(".d_windowbg3").hide()
		$(".d_windowbg4").hide()
		$(".d_windowbg12").hide();//兴趣爱好
	})
	//点击身份
	$(".d_line8").on("click",function(){
		$('.d_windowbg5').show();
		$(".d_windowmin div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin div").index(this);
				$(".d_text8").html($(".d_windowmin div").eq(index).html());
				marrynum=Number(index)+1;
				$(".d_windowbg5").hide()
			}	
		)
	})
	//点击住房
	$(".d_line11").on("click",function(){
		$('.d_windowbg6').show();
		$(".d_windowmin2 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin2 div").index(this);
				$(".d_text11").html($(".d_windowmin2 div").eq(index).html());	
				housenum=Number(index)+1;
				$(".d_windowbg6").hide()
			}	
		)
	})
	//点击私家车
	$(".d_line13").on("click",function(){
		$('.d_windowbg7').show();
		$(".d_windowmin3 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin3 div").index(this);
				$(".d_text13").html($(".d_windowmin3 div").eq(index).html());	
				carsnum=index;
				$(".d_windowbg7").hide()
			}	
		)
	})
	//点击职业
	$(".d_line14").on("click",function(){
		$('.d_windowbg8').show();
		$(".d_windowmin4 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin4 div").index(this);
				$(".d_text14").html($(".d_windowmin4 div").eq(index).html());	
				jobnum=Number(index)+1;
				$(".d_windowbg8").hide()
			}	
		)
	})
	//点击收入
	$(".d_line15").on("click",function(){
		$('.d_windowbg9').show();
		$(".d_windowmin5 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin5 div").index(this);
				$(".d_text15").html($(".d_windowmin5 div").eq(index).html());	
				incomenum=Number(index)+1;
				$(".d_windowbg9").hide()
			}	
		)
	})
	//点击民族
	$(".d_line16").on("click",function(){
		$('.d_windowbg10').show();
		$(".d_windowmin6 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin6 div").index(this);
				$(".d_text16").html($(".d_windowmin6 div").eq(index).html());	
				nationnum=Number(index)+2;
				$(".d_windowbg10").hide()
			}	
		)
	})
	//点击信仰
	$(".d_line17").on("click",function(){
		$('.d_windowbg11').show();
		$(".d_windowmin7 div").on("click",function(){
				$(this).addClass("d_selected").siblings().removeClass("d_selected");
				var index =$(".d_windowmin7 div").index(this);
				$(".d_text17").html($(".d_windowmin7 div").eq(index).html());	
				beliefnum=Number(index)+2;
				$(".d_windowbg11").hide()
			}	
		)
	})
	//点击取消
	$(".d_calloff").on("click",function(){
		$(".d_windowbg5").hide();
		$(".d_windowbg6").hide();
		$(".d_windowbg7").hide();
		$(".d_windowbg8").hide();
		$(".d_windowbg9").hide();
		$(".d_windowbg10").hide();
		$(".d_windowbg11").hide();
	})
	//点击我喜欢的异性类
	$(".d_line19").on("click",function(){
		$(".d_opposite").show()
	})
	//地区选择
	;(function(ss, doc) {
		ss.init();
		ss.ready(function() {
			var cityPicker = new ss.PopPicker({
				layer: 2
			});
			cityPicker.setData(cityData);
			var showCityPickerButton = doc.getElementById('showCityPicker');
			var d_text12 = doc.getElementById('d_text12');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					d_text12.innerText = items[0].text + "-" + items[1].text;
					citybox=d_text12.innerText
				});
			}, false);
		});
			
	})(mui, document)
	/*点击保存*/
	$(".d_save").on("click",function(){
			$.ajax({
				type:"POST",
				url:d_http+"/index.php/Home/User/updatelist",
				data:{
					uid:uid,
	            	token:MD5(uid+SL),
	            	nickname:nickname,//昵称
	            	height:height,//身高
	            	weight:weight,//体重
	            	house:housenum,//住房
	            	cars:carsnum,//私家车
	            	belief:beliefnum,//信仰
	            	marry:marrynum,//身份
	            	myideal:myideal,//个性签名
	            	job:jobnum,//职业
	            	income:incomenum,//收入
	            	nation:nationnum,//民族
	            	citys:citybox,//城市
	            	myhobby:myhobby,// 兴趣爱好
	            	interest:yixingjihe//  我喜欢的异性类
				},
				success:function(data){
					if(data.code==404){
						$(".d_popupbox").html("请填写你要修改的资料")
						setTimeout(show,500)
						setTimeout(hide,3000)
					}else if(data.code==200){
						$(".d_popupbox").html(data.massage)
						setTimeout(show,500)
						setTimeout(function hide(){
							$(".d_popupbox").css("display","none");
							location.href="../../src/myself/mypage.html"
						},2000)
					}
				}
			});
			//图片上传
			$(".d_uid").val(uid);
		    $(".d_token").val(MD5(uid+SL));
		    var form = new FormData(document.getElementById("form"));
		    $.ajax({
		        url: "https://m.qinyikou.cc/index.php/Home/Article/myimages",
		        type: "post",
		        data : form, 
		        processData : false,
		        contentType:false,
		        success : function (data) {
		        	console.log(data)
		            if(data.code == 200){
		                $(".d_popupbox").html(data.massage)
						setTimeout(show,500)
						setTimeout(function hide(){
							$(".d_popupbox").css("display","none");
							location.href="../../src/myself/mypage.html"
						},2000)	
		            }else{
		        		return;
		            }
		        }
		    })
			})
	/*兴趣爱好*/
			var d_like=data.data.style;
			for(var i in d_like){
				$(".d_likecontent").append("<p class='d_liketel'>"+d_like[i]+"</p>")
			}
			$(".d_likecontent .d_liketel").on("click",function(){
				var index=$(".d_likecontent .d_liketel").index(this);
				if($(".d_likecontent .d_liketel").eq(index).css("color")=="rgb(153, 153, 153)" || $(".d_oppositecontent .d_oppositetel").eq(index).css("color")=="#999999"){
					$(".d_likecontent .d_liketel").eq(index).css({"color":"#ffffff","backgroundColor":"#5397DD"})
					likenumarr.push(index)
					likearr.push($(".d_likecontent .d_liketel").eq(index).text())
				}else{
					$(".d_likecontent .d_liketel").eq(index).css({"color":"#999999","backgroundColor":"#ffffff"})
					for(var i in likenumarr){
						if(likenumarr[i]==index){
							likenumarr.splice(i,1);
							likearr.splice(i,1);
						}
					}
				}
				likenumstr=likenumarr.join(",")
			})
			//点击兴趣爱好确认键
			$(".d_likebottom").on("click",function(){
				$(".d_like").hide();
				$(".d_text18").html(likearr.join(","))
				myhobby=likenumstr;
			})
			$(".d_likespan").on("click",function(){
				$(".d_like").hide();
			})
	/*喜欢的异性类*/
			var d_opposite=data.data.interest;
			for(var i in d_opposite){
				$(".d_oppositecontent").append("<p class='d_oppositetel'>"+d_opposite[i]+"</p>")
			}
			$(".d_oppositecontent .d_oppositetel").on("click",function(){
				var index=$(".d_oppositecontent .d_oppositetel").index(this);
				if($(".d_oppositecontent .d_oppositetel").eq(index).css("color")=="rgb(153, 153, 153)" || $(".d_oppositecontent .d_oppositetel").eq(index).css("color")=="#999999"){
					$(".d_oppositecontent .d_oppositetel").eq(index).css({"color":"#ffffff","backgroundColor":"#5397DD"})
					oppositenumarr.push(index)
					oppositearr.push($(".d_oppositecontent .d_oppositetel").eq(index).text())
				}else{
					$(".d_oppositecontent .d_oppositetel").eq(index).css({"color":"#999999","backgroundColor":"#ffffff"})
					for(var i in oppositenumarr){
						if(oppositenumarr[i]==index){
							oppositenumarr.splice(i,1);
							oppositearr.splice(i,1);
						}
					}
				}
				oppositenumstr=oppositenumarr.join(",")
			})
			//点击我喜欢异性类确认键
			$(".d_oppositebottom").on("click",function(){
				console.log("确认："+oppositenumstr)
				$(".d_opposite").hide();
				$(".d_text19").html(oppositearr.join(","))
				yixingjihe=oppositenumstr;
			})
			$(".d_oppositespan").on("click",function(){
				$(".d_opposite").hide();
			})
        }
	});
	
})

/**
 * Created by Administrator on 2017/3/10.
 */
function show(){ $(".d_popupbox").css("display","block") }
function hide(){ $(".d_popupbox").css("display","none")}
var userObj = JSON.parse(localStorage.getItem('userData'));
var height = window.screen.availHeight;
localStorage.removeItem("dd");
$(function() {
	var datas = {},url = d_http + "index.php/Home/Engagement/fb_detail";
	$(".more").on("click", function() {  $(".cover").show();  })
		//关闭弹框
	$(document).on("click", ".cover,.close", function() {   $(".cover").hide();  })
		//其他
	var URL = document.location.toString();
	$("#JO_fixed").css("height", height);
	var het = $(".JO_fixed_box").height();
	var top = (height - het) / 2.5;
	$(".JO_fixed_box").css("margin-top", top);
	datas.id = $.getPassArguments(location.href).id;
	console.log(datas.id);
	datas.token = MD5(datas.id + SL)
	console.log(datas)
	_ajax.getAjax(url, datas, "POST", function(data) {
		if(data.code == 200) {
			console.log(data);
			var userList = data.data.user;
			var list = data.data.engagement;
			var goodList = data.data.goods;
			list.add_time = format(list.add_time);
			if(list.mood_time==''){
				list.mood_time = '不限时间';
			}else{
				list.mood_time = format(list.mood_time);
			}
			
			if(userList.old_uid == 0) {
				$(".info").attr("src", "../../img/icon/x_approve_icon.png")
			} else if(userList.old_uid == 1) {
				if(userList.sex == 1) {
					$(".info").attr("src", "../../img/icon/x_boyapprove_icon.png");
				} else if(userList.sex == 2) {
					$(".info").attr("src", "../../img/icon/x_girlapprove_icon.png");
				}
			}
			userList.old_uid == 0 ? userList.oldImg = "../../img/n_shenF.png" : userList.oldImg = "../../img/n_shenFs.png";
			userList.sex == 1 ? (userList.sexImg = "../../img/icon/n_boys.png", userList.txt = "他发布的约会") :
				(userList.sexImg = "../../img/icon/n_girls.png", userList.txt = "她发布的约会");
			userList.image == "" ? userList.image = "../../img/icon/d_head.png" : userList.image = userList.image + '/head';
			userList.marry == "" ? userList.marry = "未知" : userList.marry = userList.marry;
			list.pick == 0 ? (list.picks = "不接送", list.pickImg = "../../img/n_bjs.png") :
				(list.pick == 1 ? (list.picks = "负责接送", list.pickImg = "../../img/n_js.png") :
					(list.picks = "需要接送", list.pickImg = "../../img/n_js.png"));
			list.sex == 0 ? (list.sexs = "男女不限", list.sexImg = "../../img/n_bbgg.png") :
				(list.sex == 1 ? (list.sexs = "仅限男生", list.sexImg = "../../img/n_bb.png") :
					(list.sexs = "仅限女生", list.sexImg = "../../img/n_gg.png"));
		                if(list.goods_id == 0){
		                	$(".li2").hide();
		                	$(".li").css("width","50%");
		                	$(".li3").css("width","50%");
		                	$("#scene").hide();
		                }
			list.type == 1 ? (list.typeText = "已买单", list.typeImg = "../../img/n_md.png") :
				(list.typeText = "AA制", list.typeImg = "../../img/n_AA.png");
			$(".SL_nav span").text(userList.txt);
			$(".join_left_title p").text(userList.credit);
			$(".join_middle_img img").attr("src", userList.image);
			$(".join_user_nick_box h2 span").text(userList.nickname);
			$(".join_nick_img img").attr("src", userList.sexImg);
			$(".join_middle_img ").attr("title", list.fid);
			$(".join_nick_img em").text(userList.age);
			$(".join_constellatory").text(userList.constellation);
			$(".join_single").text(userList.marry);
			$(".jion_declaration_text").text(list.mood);
			$(".join_min_img img").attr("src", goodList.mobileimg);
			$(".list li").eq(0).children("em").text(list.object);
			$(".list li").eq(1).children("em").text(goodList.goods_name);
			$(".list li").eq(2).children("em").text(goodList.address);
			$(".list li").eq(3).children("em").text(list.mood_time);
			$(".list li").eq(4).children("em").text(list.mood);
			$(".li p").text(list.sexs);
			$(".li img").attr("src", list.sexImg);
			$(".li2 p").text(list.typeText);
			$(".li2 img").attr("src", list.typeImg);
			$(".li3 p").text(list.picks);
			$(".li3 img").attr("src", list.pickImg);
			$(".join_right_title p").text(data.data.request_count);
			$(".JO_fixed_box h4 em").text(userList.nickname);

			if($("#explain").text().length > 18) {
				$("#explain").css("text-align", "left")
			} else {
				$("#explain").css("text-align", "right")
			}
			$(".push").on("click", function() {
				url = d_http + "index.php/Home/user/blacklist_add";
				var data = {
					uid: userObj.uid,
					f_uid: list.fid,
					token: MD5(userObj.uid + list.fid + SL)
				};
				_ajax.getAjax(url, data, "POST", function(res) {
					if(res.code == 404) {
						fadeTagle($("#RE_fixeds"), "您拉黑此约会", "×")
					} else {
						fadeTagle($("#RE_fixeds"), res.massage, "√")
					}
				})
			})
			$(".report").on("click", function() {
				location.href = "../find/report.html?id=" + list.fid;
			})
			//联系他
			$("#joinbtn").click(function() {
				location.href = "../myself/download.html";
			});
			$(".join_middle_img").click(function() {
				var fid = $(".join_middle_img").attr("title");
				location.href = "../../src/find/personalcarte.html?fid=" + list.fid;
			})
			$("#JO_fixed").click(function() {
				$("#JO_fixed").fadeOut(500);
			})
			$("#scene").click(function() {
				location.href = "businessInfo.html?id=" + list.goods_id;
				localStorage.setItem("dd", 1)
			})
			//参加约会
			$("#joinBtn").click(function() {
				location.href = "../myself/download.html";
			});
		}
	});
	$(".box").on("click",function(){
		$(this).hide();
		location.href='../../src/personal/personalAppointment.html';
	});

	// 查看约会进度
	$('.btn_b').on('click',function(event){
		event.stopPropagation(); 
		location.href='../../src/myself/mydate.html';
	});
})

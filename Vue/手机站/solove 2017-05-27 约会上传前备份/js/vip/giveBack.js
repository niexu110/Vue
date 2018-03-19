function show(){
	$(".d_popupbox").css("display","block")
}
function hide(){
	$(".d_popupbox").css("display","none");
}
$(function(){
	$(".filepath").on("change",function() {
        var srcs = getObjectURL(this.files[0]);
        $(this).nextAll(".img1").hide();
        $(this).nextAll(".img2").show();
        $(this).nextAll(".img2").attr("src",srcs);
        $(".uploadCover").show()
    })
	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file)
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file)
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file)
        }
        return url;
    };
    $(".uploadCover").on("click",function(){
    	$(this).hide();
    	$(".filepath").nextAll(".img2").attr("src","").hide();
    	$(".filepath").nextAll(".img1").show()
    })
//  $("#btn").on("click",function(){
//  	$(".tel").attr("value",$(".tel").val());
//  	$(".text").attr("value",$(".text").val());
//  	$(".uid").attr("value",'330');
//  	$(".token").attr("value","330"+SL);
//		$(".d_set").submit();
//		setTimeout(show,500);
//		setTimeout(hide,2000);
//	})
    $("#btn").on("click",function(){
    	var uid = localStorage.getItem("uid");
        if($(".tel").val()==""){
            $(".d_popupbox").html("请输入电话号码");
            setTimeout(show,500);
            setTimeout(hide,2000);
        }else{
            $(".uid").val(uid);
            $(".token").val(MD5(uid + "SL"));
            var form = new FormData(document.getElementById("form"));
            $.ajax({
                url: d_http+"/index.php/Home/Soubrette/cancel_vip",
                type: "post",
                data : form, 
                processData : false,
                contentType:false,
                success : function (data) {
                    console.log(data)
                    if(data.code == 200){
                        $(".d_popupbox").html(data.massage);
                        setTimeout(show,500);
                        setTimeout(function hide(){
                            $(".d_popupbox").css("display","none");
                            location.href='../../src/myself/mypage.html'
                        },2000);
                    }
                }
            })
        }
        
    })
})

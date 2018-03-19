/**
 * Created by Administrator on 2017/3/16.
 */
var page=0;
var s=0;
var  isOpen=true;
$(function(){
    //场景选择
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/goods",
        data: {
            page:page
        },
        success: function(data){
            $.each(data.data.cate,function(i,k){
                if(k.cat_id==1){
                    k.cat_id=0;
                }
                var html='<div class="sceneSelection_boxs" title="'+k.cat_id+'"><img src="'+k.appletimg+'"><p>'+k.cat_name+'</p></div>';
                $(".sceneSelection_box").append(html);
            })
            $(".sceneSelection_boxs").eq(0).addClass("active1")
            $(".sceneSelection_boxs").click(function(){
                page=0;
                $(this).addClass('active1').siblings(".active1").removeClass('active1');
                $(".sceneSelection_banner").html("");
                var self=$(this);
                var num=self.attr("title");
                s=num;
                orderList(page,num,1)
            })
            $.each(data.data.goods,function(i,k){
                var html='<div class="sceneSelection_banner_box" title="'+k.goods_id+'"><dl><dt><img src="'+k.mobileimg+'"></dt><dd style="color:#111;"><b>'+k.goods_name+'</b></dd><dd class="d">价格: <span>'+k.shop_price+'元</span></dd><dd>购买人数: '+k.buy_count+'</dd></dl></div>';
                $(".sceneSelection_banner").append(html);
            })
            //场景切换
            $(".sceneSelection_banner_box").click(function(){
                var goods_id=$(this).attr("title");
                setTimeout(function(){
                    location.href="sceneDescription.html?id="+goods_id;
                },500)
            });
        }
    });

    var clientH = Number(document.documentElement.clientHeight);
    var H=Number($("#pullUp").height());
    $(document).on('scroll',function(){
        if(isOpen){
            var docH=parseInt(document.documentElement.scrollTop | document.body.scrollTop+clientH);
            var H5Top=parseInt($('#pullUp').offset().top+H);
            if(docH>=H5Top-150){
                isOpen=false;
                page++;
                $("#pullUp").html("数据加载中......");
                orderList(page,s,2)
            }
        }
    })
})
function orderList(page,num,type){   
    if(type==1){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/Home/Engagement/goods",
            data:{
                page:page,
                cate_id:num
            },
            success:function(data){
                if(data.code==404){
                    $(".sceneSelection_banner").append(
                        "<p style='text-align:center; color:#999;margin-top:.5rem;'>亲！商家正在赶来...</p>"
                        );
                }else{
                var list=data.data.goods;
                 $.each(list,function(i,k){
                     var html='<div class="sceneSelection_banner_box" title="'+k.goods_id+'"><dl><dt><img src="'+k.mobileimg+'"></dt><dd style="color:#111;"><b>'+k.goods_name+'</b></dd><dd class="d">价格: <span>'+k.shop_price+'元</span></dd><dd>购买人数: '+k.buy_count+'</dd></dl></div>';
                    $(".sceneSelection_banner").append(html);
                 })
                //场景切换
                $(".sceneSelection_banner_box").click(function(){
                    var goods_id=$(this).attr("title");
                    setTimeout(function(){
                        location.href="sceneDescription.html?id="+goods_id;
                    },500)
                });
             }
           }
        })
    }else if(type==2){
        $.ajax({
            type:"POST",
            url:d_http+"index.php/Home/Engagement/goods",
            data:{
                page:page,
                cate_id:num
            },
            success:function(data){
                var list=data.data.goods;
                if(data.code==404){
                    $("#pullUp").html(data.massage);
                     setTimeout(function(){
                         $("#pullUp").html("");
                     },2500)
                     isOpen=true;
                }else{
                    $.each(list,function(i,k){
                        var html='<div class="sceneSelection_banner_box" title="'+k.goods_id+'"><dl><dt><img src="'+k.mobileimg+'"></dt><dd style="color:#111;"><b>'+k.goods_name+'</b></dd><dd class="d">价格: <span>'+k.shop_price+'元</span></dd><dd>购买人数: '+k.buy_count+'</dd></dl></div>';
                        $(".sceneSelection_banner").append(html);
                    })
                    isOpen=true;
                    $("#pullUp").html("");
                    //场景切换
                    $(".sceneSelection_banner_box").click(function(){
                        var goods_id=$(this).attr("title");
                        setTimeout(function(){
                            location.href="sceneDescription.html?id="+goods_id;
                        },500)
                    });
                }
            }
        })
    }
}

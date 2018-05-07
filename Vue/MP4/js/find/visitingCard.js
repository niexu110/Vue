/**
 * Created by Administrator on 2018/5/4.
 */
$(function(){
   $(".introducesFX").click(function () {
        $("#lookTop").append("<img src='../../image/img/chakanfenxiang.png' >").css("display","block");
        setTimeout(function(){
            $("#lookTop").css("display","none").html("");
        },3000)
    });
    $(".introduce-lh").click(function(){
        $("#lookTop").append("<div class='vod'><h1 class='vod-lh'>拉黑</h1><p class='vod-jb'>举报</p>"+
            "<p class='vod-close'>取消</p></div>").css("display","block");
        $(".vod-close").click(function(){
            $("#lookTop").css("display","none").html("");
        });
        $(".vod-jb").click(function(){
            skip("report.html");
        });
    });
    //后需追加的
    $(".lighten-LT").click(function(){
        $(".pop").html("  <div class='lt-pop'><p>聊天请下载APP哦···</p><div class='lt-btn'>确定</div></div>").fadeIn(100);
        $(".lt-btn").click(function(){$(".pop").fadeOut(100);$(".lt-pop").remove();})
    });
    $(".lighten-WeiX").click(function(){
                $(".pop").html("  <div class='wx-pop'><img src='../../image/img/title.png'><span class='wx-tit'>填写微信号</span>" +
                    "<p>填写微信号后</p><p>才可申请添加微信</p><a href='#' class='btnA'>立刻填写</a></div>").fadeIn(100);
                 $(".btnA").click(function(){$(".pop").fadeOut(100);$(".wx-pop").remove()})
       
    })
    
    // 选择填写信息弹框 _this=当前点击的span,region地区
    var slider = $('#sliders'), data = {}, region=[],
        btn=$(".slider-btn"),_this,isOk=false,
        arr = [
            ["汉族", "壮族", "傣族", "满族", "食人族", "羌族"],
            ["汉族1", "壮族1", "傣族1", "满族1", "食人族1", "羌族1"],
            ["汉族2", "壮族2", "傣族2", "满族2", "食人族2", "羌族2"]
        ];
        // 获取城市
    _ajax.get('../../city.json', '', function (res) {
        region = res.citylist
    })
    $('.card-mate-content span').click(function(){
        var title = $(this).attr('title'), dataType = $(this).attr('data-type'), 
        _this=$(this),nums = $(this).attr('alt');
        if (title==1){
            // 对应的使用方法循环列表内容0一级联动_Element.add，
            // 1：2级联动_Element.add2()，2：三级联动_Element.add()，3城市选择_Element.add4()
            dataType == 0 ? _Element.add(arr[nums])
                : (dataType == 1 ? _Element.add2(arr[nums], arr[nums],$(this).attr('data-select')) 
                    : (dataType == 2 ? _Element.add3()
                        : _Element.add4()))
            slider.css({ top: '0', transition: "all .2s linear", "-webkit-transition": "all .2s linear" })
        }       
    })
     btn.click(function () {
        //  判断用户是否填写isOk为true时可关闭
         if(isOk){
             console.log(data);
             slider.css({ top: '-100%', transition: "all .3s linear", "-webkit-transition": "all .3s linear" }); $('.slider').empty();
             setTimeout(() => {
                 isOk=false;data={} 
             }, 2000);  
             // 发送ajax 成功之后data={},isOK=false
        // _ajax.get('xxxx.php',data,function(res){
        //     console.log(res)
        // })
         }
       
        
    });
    $(".slider-close").click(function () {
        data={};
        isOk=false;
        slider.css({ top: '-100%', transition: "all .3s linear", "-webkit-transition": "all .3s linear" }); $('.slider').empty();

    })
    var _Element = {
        add: function ( arr) {
            // data是给后台传的东西
            var list = arr, slider = $('.slider');
            slider.append("<ul class='slider-ul'></ul>");
            var ul = slider.find("ul");
            for (var i of list) {
                ul.append("<li>" + i + "</li>");
            }
            var li = ul.find("li");
            $(".slider-ul li").click(function () {
                data.type = $(this).index();
                isOk=true;
                $(this).css("background", "#ff704b").siblings().removeAttr("style");
            })
        },
        // 二级联动
        add2: function (arr, arr2,type){
            $('.slider').append("<ul class='item-ul' ></ul><ul class='item-ul2'></ul>");
            if(type==0){
                var str = arr, str0 = arr2;
                var index = 0, index2 = 0;
                for (var i of str0) {
                    $(".item-ul").append("<li>" + i + "</li>");
                }
                sort(index, str);
                $(".item-ul li").click(function () {
                    index = $(this).index(); $(".item-ul2").empty();
                    data.type = index
                    $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    sort(index, str);
                });
                function sort(num, str) {
                    for (var i = 0; i < str[num].length; i++) {
                        $(".item-ul2").append("<li>" + str[num][i] + "</li>");
                    }
                    $(".item-ul2 li").click(function () {
                        index2 = $(this).index();
                        data.type2 = index2;
                        data.type == null ? isOk = false : isOk = true;
                        $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    });
                }
            }else if(type==1){
                 var minH=120,maxH=221,height;
                for (var i=minH;i<maxH;i++) {
                    $(".item-ul").append("<li title=" + i + ">" + i + "cm</li>");
                }
                sortH(minH + 1, maxH);
                $(".item-ul li").click(function () {
                    height =parseInt($(this).attr('title')); $(".item-ul2").empty();
                    $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    height == maxH-1 ? sortH(height, maxH) : sortH(height + 1, maxH);
                });
                function sortH(minHs, maxH) {
                    for (var i = minHs; i < maxH; i++) {
                        $(".item-ul2").append("<li title=" + i + ">" + i + "cm</li>");
                    }
                    $(".item-ul2 li").click(function () {
                        data.height = height + '-' + $(this).attr('title')
                        height == null ? isOk = false : isOk = true;
                        $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    });
                }
            }else{
                var minW =18, maxW = 75, age;
                for (var i = minW; i < maxW; i++) {
                    $(".item-ul").append("<li title=" + i + ">" + i + "岁</li>");
                }
                sortH(minW + 1, maxW);
                $(".item-ul li").click(function () {
                    age = parseInt($(this).attr('title')); $(".item-ul2").empty();
                    $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    age == maxW-1 ? sortH(age, maxW) : sortH(age + 1, maxW);
                });
                function sortH(minWs, maxW) {
                    for (var i = minWs; i < maxW; i++) {
                        $(".item-ul2").append("<li title=" + i + ">" + i + "岁</li>");
                    }
                    $(".item-ul2 li").click(function () {
                        age == null ? isOk = false : isOk = true;
                        data.age = age + '-' + $(this).attr('title')
                        $(this).css("background", "#ff704b").siblings().removeAttr("style");
                    });
                }
            }       
        },
        // 三级联动
        add3:function(){
            $('.slider').append("<ul class='item-uls' ></ul><ul class='item-uls1'></ul><ul class='item-uls2'></ul>");
            var time = new Date().getFullYear();
            var lastYear = time - 18, endYear = time - 70;
            var year=lastYear,mouth=1,day=1;
            for (var i = endYear; i < lastYear; i++ ) {
                $(".item-uls").append("<li title=" + i +">" + i +"年</li>");
            }
            for (var i = 1;i<13;i++) {
                $(".item-uls1").append("<li title="+i+">" + i +"月</li>");
            }
            days(1);
            $(".item-uls li").click(function(){
                  year=$(this).attr('title');
                  data.year = $(this).attr('title')
                $(this).css("background", "#ff704b").siblings().removeAttr("style");
                
            })
            $(".item-uls1 li").click(function () {
                mouth = $(this).attr('title');
                data.mouth = mouth
                $(".item-uls2").html('');
                days(mouth);
                $(this).css("background", "#ff704b").siblings().removeAttr("style");
            });
            // 计算当前月天数
            function days(num) {
                if (num == 2) {
                    for (var i = 1; i < 29; i++) {
                        $(".item-uls2").append("<li title=" + i + ">" + i + "日</li>");
                    }
                } else if (num == 4 || num == 6 || num == 9 || num == 11) {
                    for (var i = 1; i < 31; i++) {
                        $(".item-uls2").append("<li title=" + i + ">" + i + "日</li>");
                    }
                } else {
                    for (var i = 1; i < 32; i++) {
                        $(".item-uls2").append("<li title=" + i + ">" + i + "日</li>");
                    }
                }
                $(".item-uls2 li").click(function () {
                    day = $(this).attr('title');
                    data.day = day;
                    data.year == null && data.mouth == null ? isOk=false:isOk = true;
                    
                    $(this).css("background", "#ff704b").siblings().removeAttr("style");
                });
            }
        },
        // 城市选择
        add4:function(){
            $('.slider').append("<ul class='item-ul' ></ul><ul class='item-ul2'></ul>");
            var index = 0;
            for (var k in region) {
                $(".item-ul").append("<li title=" + region[k].code + ">" + region[k].name + "</li>");
            }
            sort(region[index].city);
            $(".item-ul li").click(function () {
                index = $(this).index(); $(".item-ul2").empty();
                data.province =$(this).attr('title')
                $(this).css("background", "#ff704b").siblings().removeAttr("style");
                sort(region[index].city);
            });
            function sort( str) {
                for (var i = 0; i < str.length; i++) {
                    $(".item-ul2").append("<li title=" + str[i].code+">" + str[i].name + "</li>");
                }
                $(".item-ul2 li").click(function () {
                    data.city = $(this).attr('title');
                    data.province == null ? isOk = false : isOk = true;
                    $(this).css("background", "#ff704b").siblings().removeAttr("style");
                });
            }
        }
    }
});

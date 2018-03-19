/**
 * Created by Administrator on 2017/4/21.
 */
var sex=localStorage.getItem("d_sex");
$(function(){
    var filterObj=new Object();
    $.ajax({
        type:"GET",
        url:d_http+"index.php/Home/Soubrette/search",
        success:function (res) {
            var list=[],list2=[],listObj=[],listObj2=[];
            var data=res.data.data;  var lists=res.data.list;
            $.each(data,function(i,k){
                list.push(i);
                i==="age"?i="年龄":"";i==="height"?i="身高":"";i==="weight"?i="体重":"";i==="marry"?i="身份":"";i==="income"?i="收入":"";i==="provinces"?i="居住地":"";
                var html="<li class='filter_itemLi'><p><span class='left-span pull-left'>"+i+"</span>"+
                    "<span class='right-span pull-right'><em>不限</em><b><img src='../../img/icon/d_rightHui.png' style='width:.17rem;height:.28rem;' ></b></span>"+
                    "</p></li>";
                listObj.push(k);
                $(".filter_box ul").append(html)
            })
            $(".filter_box ul li.filter_itemLi").on("click",function(e){
                e.stopPropagation();
               var index=$(this).index();
               $(".filter_content").fadeIn(500);
               sortObj(index,listObj,$(".filter_content_fixed"),$(this),list,filterObj);
            });
            $(".filter_title").html("请选择筛选条件");
            $(".isOpen").html("隐藏/显示其他条件");
            $("#btn").addClass("filterBtn");
            $("#btn").html("确定");
            //可选项
            $.each(lists,function(k,val){
                list2.push(k);
                k==="cars"?k="私家车":"";k==="house"?k="住房":"";k==="job"?k="职业":"";k==="interest"?k="兴趣爱好":"";k==="children"?k="是否有子女":"";
                var html="<li class='filter_itemLi'><p><span class='left-span pull-left'>"+k+"</span>"+
                    "<span class='right-span pull-right'><em>不限</em><b><img src='../../img/icon/d_rightHui.png' style='width:.17rem;height:.28rem;' ></b></span>"+
                    "</p></li>";
                listObj2.push(val);
                $(".filter_optional ul").append(html)
            });
            $(".filter_optional ul li.filter_itemLi").on("click",function(e){
                e.stopPropagation();
                var index=$(this).index();
                $(".filter_content").fadeIn(500);
                sortObj(index,listObj2,$(".filter_content_fixed "),$(this),list2,filterObj);
            })
        }
    })
    $(".isOpen").click(function(){
         $(".filter_optional").slideToggle(700);
    })
    $("#btn").click(function(){
        localStorage.setItem("filterObj",JSON.stringify(filterObj))
        location.href="matchMakerFileter.html";
    })
});
function sortObj(num,result,that,self,item,obj){
    var list=result[num];
    var self=self;
    if(item[num]==="interest"){
        var arr=[];
        var arr2=[];
        that.append("<ul scroll='no'></ul>");
        for(var i=0;i<list.length;i++){
            that.find("ul").append("<li class='filter_content_Items'>"+list[i]+"</li>")
        }
        if(sex==1){that.find("ul").after("<p id='filterOk' class='filterColor'>确定</p>");}else{that.find("ul").after("<p id='filterOk' class='filterColors'>确定</p>");}
        $("#filterOk").click(function(){
            $(".filter_content").fadeOut(500);
            that.html("");
            $(this).remove();
        });
        $(".filter_content_Items").on("click",function(){
            self.find("span").eq(1).find(".em").remove();
            var text=$(this).text();
            var index=$(this).index();
            if(sex==1){
                if($(this).hasClass('bgColors')){ addColor(1,"bgColors",$(this),arr,index,text,arr2)} else{
                    if($('.bgColors').length>2){ return; }else{addColor(2,"bgColors",$(this),arr,index,text,arr2);}}
            }else{
                if($(this).hasClass('bgColor')){ addColor(1,"bgColor",$(this),arr,index,text,arr2)}else{
                    if($('.bgColor').length>2){return;}else{addColor(2,'bgColor',$(this),arr,index,text,arr2)}}}
        })
        $("#filterOk").click(function(){
            obj[item[num]]=arr;
            if(arr2.length>0){
                if(sex==1){for(var i=0;i<arr2.length;i++){self.find("span").eq(1).prepend("<em class='em'>"+arr2[i]+"</em>");}}
                else{ for(var i=0;i<arr2.length;i++){self.find("span").eq(1).prepend("<em class='ems'>"+arr2[i]+"</em>");}}
            }else{return;}})
    }else if(item[num]==="provinces"){
        var province=[];
        var city=[];
        var prov="北京";
        var ct="北京";
        that.append("<div class='provinceCityBox'><ul scroll='no' class='provinceUl'></ul><ul class='cityUl' scroll='no'></ul></div>");
        that.find("div").after("<p id='filterClose'>确定</p>");
        $.each(list.citys,function(k,v){
            province.push(v.region_name);
            city.push(v.citys);
        })
       for(var i=0;i<province.length;i++){
          $(".provinceUl").append("<li class='filter_provincesItem'>"+province[i]+"</li>")
       }
        citySort(0,city,$(".cityUl"));
        $(".filter_provincesItem").on("click",function(e){
            e.stopPropagation();
            $(".cityUl").html("");
            var num=$(this).index();
            prov=$(this).text();
            $(this).addClass("PCColor").siblings().removeClass("PCColor");
            citySort(num,city,$(".cityUl"));
            $(".filter_citysItem").on("click",function(e){
                e.stopPropagation();
                $(this).addClass("PCColor").siblings().removeClass("PCColor");
                ct=$(this).text();
            })

        })

        $("#filterClose").click(function(){
            $(".filter_content").fadeOut(500);
            that.html("");
            $(this).remove();
            obj[item[num]]=prov;
            obj.citys=ct;
            self.find("span").eq(1).find("em").text(prov+" "+ct);
        })

    }else{
      that.append("<ul scroll='no'></ul>");
     for(var i=0;i<list.length;i++){
        that.find("ul").append("<li class='filter_content_Item'>"+list[i]+"</li>")
     }
     that.find("ul").after("<p id='filterClose'>取消</p>");
     $("#filterClose").click(function(){
        $(".filter_content").fadeOut(500);
        that.html("");
        $(this).remove();
     })
    $(".filter_content_Item").on("click",function(){
        var text=$(this).text();
        var index=$(this).index();
            $(".filter_content").fadeOut(500);
            $("#filterClose").remove();
            that.html("");
            self.find("span").eq(1).find("em").html(text);
            item[num]==="age"?obj[item[num]]=text:
                (item[num]==="height"?obj[item[num]]=text
                    :(item[num]==="weight"?obj[item[num]]=text:obj[item[num]]=index+1));
     })
    }
}
function addColor(type,color,obj,arr,num,text,arr2){
    if(type==1){
        obj.removeClass(color);
        var index2=$.inArray(text,arr2);
        var index = $.inArray(num+1,arr);
        if(index>=0){  arr.splice(index,1);}
        if(index>=0){  arr2.splice(index2,1);}
    }else if(type==2) {obj.addClass(color); arr.push(num+1); arr2.push(text); }
}
function citySort(num,arr,self){
    var list=arr[num];
    for(var k in list){
        self.append("<li class='filter_citysItem'>"+list[k].region_name+"</li>")
    }

}




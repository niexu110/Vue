/**
 * Created by Administrator on 2017/3/7.
 */
/*获取自己id 和被邀请人id*/
fid=JSON.parse(localStorage.getItem('userData')).uid;
uid=localStorage.getItem('n_datauid');
var sex=null;
if(localStorage.getItem('n_sex')=="男"){sex=1;}
else if(localStorage.getItem('n_sex')=="女"){sex=2;}
var goods_id=0;
var money=0;
var price=null;//价格
var mood;// 心情,
var  mood_time=null;//时间戳
var num=1;//1为我请客    2为aa制,
var pick=0;//0不接送1负责接送 2需要接送
var goods_id=localStorage.getItem("n_goods_id1");
$(function(){
    $.ajax({
        type:"POST",
        url:d_http+"index.php/Home/Engagement/recommend",
        data: {
            goods_id:goods_id,
            token:MD5(goods_id+SL)
        },
        success: function(data) {
            var list=data.data;
            goods_id=list.goods_id;
            money=list.shop_price;
            price=list.shop_price;
            $(".release_left_img img").attr("src",list.mobileimg);
            $(".p1").text(list.goods_name);
            $(".p2").text(list.address);
            $(".p3").text("价格:"+list.shop_price+"元");
            $(".p4").text("购买人数:"+list.buy_count);
            $(".release_moneys em").text(list.shop_price+"元");
        }
    })
    $("#dates").change(function(){
         var str=$("#dates").val().replace("T"," ");
        $("#timer").text(str);
        str = str .replace(new RegExp("-","gm"),"/");
        mood_time= (new Date(str)).getTime()/1000;
    })
    //接送方式
    $('.release_p [name="jiesong"]').click(function(){
        if($(this).val()==1){
           pick=1
        }else {
            pick=2
        }
    })
    //选择AA换价格
    $('.release_p [name="price"]').click(function(){
        var id=$(this).attr("id");
        if(id==="ye4"){
            price=money;
            num=$(this).val();
            $(".release_moneys em").text(money+"元");
            $(".release_money em").text("0元");
        }else if(id==="ye5"){
            num=$(this).val();
            $(".release_moneys em").text(money/2+"元");
            $(".release_money em").text(money/2+"元");
            price=money/2;
        }
    })
    //选择心情
    $(".release_text ul li ").click(function () {
         mood=$(this).text();
        $("#textarea").val(mood);
    })
    $("#textarea").change(function(){
        mood=$(this).val();
    })
    //选择场景
    $("#optScene").click(function(){
        localStorage.setItem("n_type",1);
        location.href="secneSelection.html";
    })
    $(".SL_nav a").click(function(){
        localStorage.removeItem("n_type");
        localStorage.removeItem("n_goods_id1");
    })
    //表单提交
    $("#btn").click(function(e){
        if(mood_time==null){
            $("#RE_fixed h2").text("请选择约会时间");
            $("#RE_fixed").show();
            setTimeout(function(){
                $("#RE_fixed").fadeOut();
            },1000)
        }else if(mood==null){
            $("#RE_fixed h2").text("选择或填写约会心情");
            $("#RE_fixed").show();
            setTimeout(function(){
                $("#RE_fixed").fadeOut();
            },1000)
        }else{
      $.ajax({
          type:'POST',
          url:d_http+'index.php/Home/Engagement/cj_fabu',
          data:{
              fid:fid,
              uid:uid,
              type:num,
              sex:sex,
              mood:mood,
              mood_time:mood_time,
              pick:pick,
              money:price,
              goods_id:goods_id,
              fb_type:1,
              token:MD5(fid+goods_id+SL)
          },
          success:function(data){
              var f_id=data.data;
              $.ajax({
                  type:"POST",
                  url:d_http+"index.php/Home/Engagement/indent",
                  data:{
                      id:f_id,
                      token:MD5(f_id+SL)
                  },
                  success:function(data){
                      if(data.code==200){
                          localStorage.removeItem("n_type");
                          localStorage.removeItem("goods_id1");
                          var order_id=data.data;
                          location.href="pay.html?id="+order_id+"&uid="+fid;
                      }else{
                          $("#RE_fixed h2").text("请求失败稍后再试");
                          $("#RE_fixed").show();
                          setTimeout(function(){
                              $("#RE_fixed").fadeOut();
                          },1000)
                      }
                  }
              })
            }
         })
       }
    })
})
/**
 * Created by Administrator on 2017/3/23.
 */
var fid=null;//发布人
var userObj=JSON.parse(localStorage.getItem('userData'));
fid=userObj.uid;
var money=0;
var price=null;//价格
var uid=null;//被邀请人
var sex=0;// 0无 1男 2女,
var mood;// 心情,
var mood_time=null;//时间戳
var num=1;//1为我请客    2为aa制,
var fb_type=2;//1好友    2陌生人  不填默认是1好友,
var pick=0;//0不接送1负责接送 2需要接送
var goods_id=localStorage.getItem("n_goods_id");
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
            $(".top").text(list.goods_name);
            $(".release_left_img img").attr("src",list.mobileimg);
            $(".p1").text(list.goods_name);
            $(".p2").text(list.address);
            $(".p3").text("价格:"+list.shop_price+"元");
            $(".p4").text("购买人数:"+list.buy_count);
            $(".release_moneys em").text(list.shop_price+"元");
        }
    });
    $(".SL_nav a").click(function(){
        localStorage.removeItem("n_goods_id")
    })
    $("#dates").change(function(){
        var str=$("#dates").val().replace("T"," ");
        $("#timer").text(str);
        str = str .replace(new RegExp("-","gm"),"/");
        mood_time= (new Date(str)).getTime()/1000;
    })
    //选择男女
    $(".release_p span").click(function(){
        sex=$(this).attr("title");
        $(this).addClass('activess').siblings(".activess").removeClass('activess');
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
    //表单提交
    $("#btn").click(function(){
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
                    fb_type:fb_type,
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
                            localStorage.removeItem("n_goods_id");
                            var order_id=data.data;
                            location.href="pay.html?id="+order_id+"&uid="+fid;
                        }
                    })
                }
            })
        }
    })
})
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
    // var times = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    var times = add0(m) + '月' + add0(d) + '日 ' + add0(h) + '点' + add0(mm) + '分';
    return times
}
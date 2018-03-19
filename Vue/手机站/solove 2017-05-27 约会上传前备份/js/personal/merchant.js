/**
 * Created by Administrator on 2017/4/5.
 */
var height=window.screen.availHeight;
$(function(){
    $(".merchant_content").height(height);
})
 function getRand(min,max){
    return Math.round(Math.random()*(max-min)+min)

 }
 function sortArr(arr){
     var result=[];
     for(var i=0; i<arr.length; i++){
         if(result.indexOf(arr[i])==-1){
             result.push(arr[i])
         }
     }
     arr=result;
 }
function  fn(n) {
     var min=2,max=32;
     var arr=[];
     for(var i=0;i<n;i++){
         var rnd=getRand(min,max);
             arr.push(rnd);
             arr=sortArr(arr);
             if(arr.length<n){
                 arr.push(rnd);
             }
     }
     conosle.log(arr)
}
fn(6)
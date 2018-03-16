import css from './css/index.css';
import less from './css/black.less';

{
     let jspang ='你好，聂旭！！'
     document.getElementById('title').innerHTML = jspang;
}
$('#title').html('这是jquery操作的');
// 引入json
var json=require("../config.json")
var jsons=require("../city.json")
console.log(jsons.citylist)
$("#json").html(json.name)


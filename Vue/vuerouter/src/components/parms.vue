<template>
  <div>
     <h1>{{msg}}</h1>
     <p>id={{$route.params.id}}</p>  
     <p>内容={{$route.params.title}}</p>  
  </div>
</template>
<script>
     export default{
          name: 'params',
          data(){
               return{
                    msg:'传递参数'
               }
          }
     }
</script>
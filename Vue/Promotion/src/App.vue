<template>
  <div id="app">
    <transition name='fade' mode="out-in">
     <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
 @import './index.less';
 fade-enter{
  opacity:0; 
}
.fade-enter-active{
  animation:bounce-in .5s linear;
}
.fade-leave{opacity: 1;}
.fade-leave-active{
  opacity: 0;
  animation:bounce-in .5s linear;

}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>


<template>
  <transition :name="transitionName">

  </transition>
  <router-view />

</template>

<script>
// eslint-disable-next-line no-unused-vars,no-undef
import {createRipple} from "@/BADA/Misc/ripple"

export default {
  data(){
    return{
      transitionName:"a"
    }
  },
  // watch: {
  //   '$route' (to, from) {
  //     const toDepth = to.path.split('/').length
  //     const fromDepth = from.path.split('/').length
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  //   }
  // }
}

</script>

<style>

@font-face {
  font-family: "Product Sans";
  src: url("../src/assets/fonts/ProductSans-Regular.woff") format("woff");
}

div.Gripple {
  position: absolute; /* The absolute position we mentioned earlier */
  border-radius: 50%;
  transform: scale(0);
  animation: Gripple 600ms linear forwards;
  background-color: rgba(209, 197, 248, 0.7);
}

@keyframes Gripple {
  to {
    transform: scale(4);
    opacity: 0.5;
  }
}

*{
  -webkit-tap-highlight-color: transparent !important;
  font-family: "Product Sans", sans-serif;
  /*outline: 1px solid #7f7f7f;*/
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: opacity 1s ease-in-out 0s;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: opacity 1s ease-in-out 0s;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}


#app{
  height: 100%;
}

#nav1{
  box-sizing: border-box;
  border: 2px #ff2525 solid;
  width: 100%;
  position: absolute;
  height: 100%;
}#nav2{
   box-sizing: border-box;
   border: 2px #2f7fff solid;
   width: 100%;
   position: absolute;
   left: 100%;
   height: 100%;
 }

ul {
  list-style-type: none;
}

button {
  border: none;
  outline: none;
}

html,body
{
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}

h1{
  position: absolute;
  color: #afafaf;
  font-size: 40px;
  margin: 0;
  z-index: 100;
  padding: 0;
}

body{
  /*min-height: -webkit-fill-available;*/
  font-family: "Product Sans", sans-serif;
  /*overflow: hidden;*/
  /*font-family: "Product Sans", serif;*/
  color: #c2c2c2;
}

</style>

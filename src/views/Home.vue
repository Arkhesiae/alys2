<template>
  <Background/>
  <div class="nav-bar" :class="{reduced : $route.path.includes('dynamic')}">
    <MenuButton/>
    <div class="page-button">
      <div class="page-button-icon-chevron">
        <img src="../assets/chevron-down.svg">
      </div>
      <span class="page-text">
        Profil de Vol
      </span>
      <div class="page-button-icon">
         <img src="../assets/show_chart_black_24dp.svg">
      </div>
    </div>
<!--    <AppButton text="" icon="show_chart_black_24dp.svg"/>-->
    <div class="ctn">
      <Searchbar/>
    </div>
  </div>

  <router-view class="plane-view"></router-view>
<!--  <div class="truc" @click="show=!show"></div>-->
</template>

<script>
// @ is an alias to /src

import Background from "../components/Background"
import MenuButton from "../components/MenuButton"
import Searchbar from "@/components/Searchbar"
// import AppButton from "@/components/appButton"
// Vue.createApp(Demo).mount('#home')


export default {
  name: 'Home',
  data() {
    return {
      show: true
    }
  },
  components: {
    Searchbar,
    // AppButton,
    MenuButton,
    Background,

  }
}
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out 1s;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.reduce{
  width: 50%;

}

.page-button{
  display: flex;
  height: 60px;
  background: #1a1a1a;
  /*padding-left: 40px;*/
  /*padding-top: 20px;*/
  box-sizing: border-box;
  border-radius: 8px;
  color: #907699;
}

.page-button span{
  padding-top: 20px;
}

.page-button-icon{
  /*background: rgba(0, 0, 0, 0.1);*/
  margin-left: 20px;
  margin-right: 20px;
  filter : invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(95%) contrast(88%);
}
.page-button-icon-chevron{

  /*margin-left: 20px;*/
  margin-right: 20px;
  filter : invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(50%) contrast(88%);
}


.page-button-icon img, .page-button-icon-chevron img{
  margin: 16px;
}

.plane-view{
  position: absolute !important;
  left: 0;
  top: 0;
}

.nav-bar{
  z-index: 9999;
  position: relative;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  width: calc(100% - 40px);
  transition: 1s ease-out;
  margin-left: 20px;
  margin-right: 20px;
}

.nav-bar.reduced{
  width: calc(100% - 360px);
}

.ctn {
  width: 40%;
  /*display: none;*/
}


</style>

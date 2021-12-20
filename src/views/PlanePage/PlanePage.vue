<template>
  <Background/>
  <div class="nav-bar" :class="{reduced : $route.path.includes('aircraftForm')}">
    <MenuButton/>

<!--    <AppButton text="" icon="show_chart_black_24dp.svg"/>-->
    <div class="ctn">
      <Searchbar/>
    </div>
  </div>


  <router-view class="plane-view" :coefficient="aircraftCoef" :aircraft="aircraft" :defaultSpeed="defaultSpeed"></router-view>
<!--  <div class="truc" @click="show=!show"></div>-->
</template>

<script>
// @ is an alias to /src

import Background from "../../components/Nav/Background"
import MenuButton from "../../components/Nav/MenuButton"
import Searchbar from "@/components/Nav/Searchbar"
import {coef} from "@/BADA/Data/coefficients"
import {defPerf} from "@/BADA/performancePref"
import {formattedList} from "@/BADA/Data/dataFormatting"
// import AppButton from "@/components/appButton"
// Vue.createApp(Demo).mount('#home')


export default {
  name: 'PlanePage',
  props : ['id'],
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
  },

  beforeMount() {

  },

  mounted() {
    console.warn("MOUNT")


  },

  computed: {
    aircraft(){
      return formattedList.find((aircraft)=> aircraft.ICAO === this.id)
    },

    aircraftCoef(){
      let aircraft = this.aircraft
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.aircraftCoefficients = coef.aircraftPerformances.find((object)=> object.aircraftType === aircraft.performanceReference)
      return this.aircraftCoefficients
    },

    defaultSpeed(){
      let aircraft = this.aircraft
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.aircraftDefaultSpeeds = defPerf.defaultAirlinePerformancePreferences.find((object)=> object.aircraftType === aircraft.performanceReference)
      return this.aircraftDefaultSpeeds
    }
  },

  methods : {

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

.pute{
  margin-left: 90px;
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
  color: #9da6ba;
  z-index: 999;
  position: absolute;
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
  width: calc(100% - 380px);
  margin-left: 13px;
}

.nav-bar.reduced #home-button{
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 0px 8px 1px;
  background: rgba(25, 24, 24, 0.94);
}

.ctn {
  width: 40%;
  /*display: none;*/
}


</style>

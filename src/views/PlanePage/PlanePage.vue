<template>
  <Background/>
  <div class="ctn plane-page">
    <Menu :class="{visible : showMenu}"></Menu>
    <div class="ctn form">
      <div class="nav-bar" >
        <HamburgerButton v-show="!$route.path.includes('aircraftForm')" @touchstart="showMenu = !showMenu" @mousedown="showMenu = !showMenu"/>
        <router-link :to="'/plane/'+aircraft.ICAO+'/'">
          <BackButton v-show="$route.path.includes('aircraftForm')" />
        </router-link>
        <router-link :to="'/'">
          <div class="logo"><img src="@/assets/fullLogo.png" alt=""/></div>
        </router-link>


        <!--    <IconButton class="icon-button" :aircraft="aircraft"></IconButton>-->

        <!--    <AppButton text="" icon="show_chart_black_24dp.svg"/>-->
        <!--    <div class="nav-button" @click="showNav">-->
        <!--      <img src="@/assets/icons/chevron-right.svg"/>-->
        <!--    </div>-->
        <div class="ctn">
          <Searchbar/>
        </div>
        <div class="icon-button" v-show="$route.path.includes('aircraftForm')">
          <img alt="" :src="this.imageURL" @error="imageLoadError"/>
        </div>
      </div>
      <router-view :coefficient="aircraftCoef" :aircraft="aircraft" :defaultSpeed="defaultSpeed"></router-view>
    </div>



    <div class="sidebar-container" :class="{show : $route.path.includes('aircraftForm')}">
          <transition name="side-in" appear>
      <SideBar class="sidebar"  :aircraft="aircraft" :coefficient="aircraftCoef" :imageRef="imageRef"></SideBar>
          </transition>
    </div>

  </div>

<!--  <div class="truc" @click="show=!show"></div>-->
</template>

<script>
// @ is an alias to /src

import Background from "../../components/Nav/Background"
// import MenuButton from "../../components/Nav/MenuButton"
import Searchbar from "@/components/Nav/Searchbar"
import {coef} from "@/BADA/Data/coefficients"
import {defPerf} from "@/BADA/performancePref"
import {formattedList} from "@/BADA/Data/dataFormatting"
import {imageData} from "@/BADA/Data/imagesRef"
import HamburgerButton from "@/components/Nav/HamburgerButton"
import BackButton from "@/components/Nav/BackButton"
// import AppButton from "@/components/appButton"
// Vue.createApp(Demo).mount('#home')
import Menu from "@/components/Nav/Menu"
import SideBar from "@/components/SideBar"

export default {
  name: 'PlanePage',
  props : ['id'],
  data() {
    return {
      showMenu : false,
      show: true,
      imageRef : "",
    }
  },

  components: {
    Menu,
    BackButton,
    HamburgerButton,
    Searchbar,
    SideBar,
    // AppButton,
    // MenuButton,
    Background,
  },


  // beforeMount() {
  //   this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
  // },


  beforeMount() {
    console.warn("MOUNT")
    this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)

  },

  computed: {
    imageID : function (){
      if (this.imageRef){
        return this.imageRef.imageIDs[0].toString()
      }
      else return ""
    },

    imageURL : function (){
      try {
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/Images/' + this.imageID + '.jpg')
        return url
      }
      catch (e) {
        console.log('No Image')
        console.log(e)
        let url = require('@/assets/icons/airplane-edit.svg')

        return url
      }
      // return  ""
    },

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
    imageLoadError(){
      console.log("zeubi")
    },
    showNav(){
      document.getElementById("ctn-aircraft").classList.toggle("shownav")
    }
  }

}



</script>

<style>

.sidebar-container{
  width: 0px;
  transition: all ease-in-out 0.8s;
}

.sidebar-container.show{
  width: auto;
}

.nav-button{
  width: 48px;
  height: 48px;
  display: none;
  margin-left: 15px;
  margin-right: 15px;
}

.nav-button img{
  width: 32px;
  margin: 8px;
  filter: invert(80%);
  height: 32px;
  /*margin-left: 20px;*/
  /*margin-right: 20px;*/
}

.sidebar{
  flex : 0 0 auto;
  padding-right: 20px;
  padding-top: 20px;
  box-sizing: border-box;
  padding-bottom: 20px;
}

.ctn.form{
  flex : 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icon-button{
  width: 48px;
  flex: 0 0 auto;
  display: none;
  margin-left: 20px;
  margin-right: 10px;
  height: 48px;
  border-radius: 48px;
  overflow: hidden;
}
.icon-button img{
  width:100%;
  height: 100%;
  border-radius: 48px;
  overflow: hidden;
}

.ctn.plane-page{
  display: flex;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
}

.nav-bar.reduced .ctn{
  width: auto !important;
}

@media (max-width: 737px) and (min-width: 100px) {
  html, html body, body #ctn-all {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow-x: hidden;
    overflow-y: hidden !important;
  }

  .ctn.form .nav-bar .button{
    background: rgba(39, 35, 46, 0.27) !important;
  }

  .logo {
    display: none;
  }

  .nav-button{
    display: flex;
  }

  .icon-button{
    display: flex;
  }

  .ctn.form{
    width: 100%;
  }

  .plane-view{
    flex-direction: column-reverse;
  }

  #left-sidebar{
    /*position: absolute;*/
    box-sizing: border-box !important;
    margin: 0 !important;
    padding: 0 !important;
    padding-left: 20% !important;
    padding-right: 20% !important;
    z-index: 999 !important;
    width: 100% !important;
    bottom: 0 !important;
    height: 60px !important;
    flex: 0 0 auto !important;
    /*overflow: hidden !important;*/
  }

  #left-sidebar #ctn-apps{
    transform: scale(0.8) !important;
    flex-direction: row !important;
    /*overflow: hidden !important;*/
  }

  #left-sidebar .btn-app{
    transform: scale(0.8) !important;
    opacity: 0;
    flex-direction: row !important;
    /*overflow: hidden !important;*/
  }



  .searchbar-container{
    z-index: 10;
  }

  .nav-container #browse {
    height : 48px;
    margin: 0;
    width: 150px;
    font-size: 16px !important;
    /*font-weight: bold;*/
    margin-top: 10px;
    line-height: 48px;
    padding-top: 0;
  }

  #illus{
    width: 100%;
    left: 0 !important;
    height: auto !important;
    top: auto !important;
    bottom: 0 !important;
  }

  /*#ctn-aircraft{*/
  /*  margin-left: 80px;*/
  /*}*/

  .nav-bar.reduced{
    width: calc(100% - 40px) !important;
    margin-left: 20px !important;
    margin-right: 20px !important;

  }

  #searchbar {
    height: 48px !important;
  }

  #searchbar .placeholder {
    height: 48px !important;
    line-height: 48px !important;
  }

  #searchbar .placeholder.collapsed{
    top: -32px !important;

  }


  #searchbar #search {
    height: 48px !important;
    font-size: 14px !important;
  }

  #browse{
    background: none !important;
    box-shadow: none !important;
    color: #9d92c5 !important;
  }

  .discover-container{
    left: 0 !important;
    width: 100% !important;
    padding: 20px;
    box-sizing: border-box;
  }

  .discover-container span{
    background: linear-gradient(237deg, rgb(121, 118, 132) -30%, rgb(196, 176, 236) 150%);

    /*text-transform: uppercase;*/
    color: #1a1a1a !important;
    text-align: center;
    height: 48px;
    line-height: 48px;
    border-radius: 24px;
    width: 100%;
  }

  .discover-button{
    display: none !important;
  }

  #ctn-aircraft{
    border-radius: 0px !important;
    margin-left: 0px !important;
    transition: all 0.4s ease-in-out;
  }

  #ctn-aircraft.shownav{
    transition: all 0.4s ease-in-out;
    margin-left: 0px !important;
  }

  #ctn-aircraft #context {
    right: 0;
    margin-top: 75px;
    margin-right: 20px;
    left: auto;
  }

  #ctn-aircraft #context .context-name {
    font-size: 12px;
    left: auto;
  }

  #ctn-aircraft .context-app {
    display: none;
  }


  .frame{
    display: flex !important;
    flex-direction: column-reverse !important;

  }

  .ctn1{
    height: 50% !important;
    position: relative !important;
    width: 100% !important;
    display: flex !important;
    flex-direction: row !important;
  }

  .frame__content{
    height: 50% !important;
  }

  .information-box-container{
    /*height: 50% !important;*/
    display: flex !important;
    flex-direction: row !important;
  }

  .wrapper {
    padding-top: 48px !important;
    border-radius: 24px !important;
  }

  .wrapper li p{
    height: 48px;
    font-size: 14px !important;
    line-height: 48px !important;

  }

  .wrapper li {
    height: 48px !important;
    padding-top: 0 !important;
    font-size: 14px !important;
  }


  .nav-bar .ctn {
    width: 80% !important;
  }

  #home-button{
    display: none;
  }

  .searchbar-container{
    min-width: 100% !important;
    border-radius: 50px !important;
  }

  .sidebar{
    transition:all ease-in-out 1s;
    /*transform-origin: top right;*/
    margin-right: -320px !important;
  }
}


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
  /*z-index: 999999;*/
  position: relative;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  width: calc(100% - 40px);
  transition: 1s ease-out;
  margin-left: 20px;
  margin-right: 20px;
}

.logo {
  position: absolute;
  left: 80px;
  /*top: 40px;*/

}

.logo img {
  width: 80px;
}


.nav-bar.reduced{
  width: calc(100% - 380px);
  margin-left: 20px;
}

.nav-bar.reduced #home-button{
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 0px 8px 1px;
  background: rgba(25, 24, 24, 0.94);
}

.ctn {
  /*width: 40%;*/
  /*display: none;*/
}


</style>

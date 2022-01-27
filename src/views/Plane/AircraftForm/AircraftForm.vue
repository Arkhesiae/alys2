<template>
  <div id="ctn-all">
    <div id="left-sidebar">
      <div id="ctn-apps">
        <router-link style="text-decoration: none; color: inherit"
                     :to="'/plane/'+aircraft.ICAO+'/aircraftForm/sPerformances'">
        <div class="ctn-btn-app" :class="{selected : this.$route.fullPath.includes('sPerformances')}">
          <img src="../../../assets/icons/insert_chart_black_24dp.svg"/>
          <div class="btn-app"></div>
        </div>
        </router-link>
        <router-link style="text-decoration: none; color: inherit"
                     :to="'/plane/'+aircraft.ICAO+'/aircraftForm/dynamic'">
        <div class="ctn-btn-app" :class="{selected : this.$route.fullPath.includes('dynamic')}">
          <img src="../../../assets/icons/show_chart_black_24dp.svg"/>
          <div class="btn-app"></div>
        </div>
        </router-link>
      </div>

    </div>
    <transition name="slidy" appear>
      <div id="ctn-aircraft">
        <router-link style="text-decoration: none; color: inherit"
                     :to="'/plane/'+aircraft.ICAO+'/'">
          <transition name="side-in" appear>
            <div id="context">
              <span class="context-name">{{aircraft.ICAO}}</span>
              <div class="context-app">
                <div class="icon">
                  <img src="../../../assets/icons/show_chart_black_24dp.svg">
                </div>
                <span>Profil de Vol</span>

              </div>

            </div>
          </transition>

        </router-link>

        <!--      <div class="page-button">-->
        <!--        <div class="page-button-icon-chevron">-->
        <!--          <img src="../assets/chevron-down.svg">-->
        <!--        </div>-->
        <!--        -->
        <!--      </div>-->
        <!--      <router-view class="plane-view" :coefficient="aircraftCoef"></router-view>-->
        <router-view :defaultSpeed="defaultSpeed" :coefficient="coefficient"/>

        <transition name="side-in" appear>
          <SideBar class="sidebar" :aircraft="aircraft" :imageRef="imageRef"></SideBar>
        </transition>

      </div>
    </transition>


  </div>
</template>
<!--<script src=></script>-->
<script>


// import MenuButton from "@/components/MenuButton"
// import Background from "@/components/Background"

import SideBar from "@/components/SideBar"
import {imageData} from "@/BADA/Data/imagesRef"

// import {profileSampling} from "@/BADA/sampling"

require('fabric')

export default {
  name: "TestView",
  props : ["coefficient", "aircraft", "defaultSpeed"],
  data() {
    return {
      imageRef : "",
    }
  },
  components: {
    SideBar,
  },



  beforeMount() {
    this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
  },

  mounted() {
  },

  created() {

  },


}


</script>

<style>

</style>

<style scoped>

* {
  user-select: none;
}

.ctn-all {
  overflow: hidden;
}

.side-in-enter-active,
.side-in-leave-active {
  transition: all 1s ease-in-out 0s;
}

.side-in-enter-from,
.side-in-leave-to {
  transition: all 1s ease-in-out 0s;
  transform: translateX(400px);
  opacity: 0;
}


.slidy-enter-active,
.slidy-leave-active {
  transition: all 1s ease-in-out 0s;
  /*margin-left: 100px;*/
}

.slidy-enter-from,
.slidy-leave-to {
  margin-left: -100px ;
  transition: all 1s ease-in-out 0s;
  padding-left: 100px;
  /*opacity: 0;*/
}

html, html body, body #ctn-all {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  overflow-x: hidden;
}

@media (max-width: 1024px) and (min-width: 738px) {
  html, html body, body #ctn-all {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow-x: hidden;
  }
  .sidebar{
    transition:all ease-in-out 1s;
    /*transform-origin: top right;*/
    margin-right: -320px !important;
  }
}

@media (max-width: 737px) and (min-width: 100px) {
  html, html body, body #ctn-all {
    width: 100% !important;
    min-width: 0 !important;
    max-width: none !important;
    overflow-x: hidden;
  }

  .nav-bar.reduced{
    width: 100% !important;
  }

  .sidebar{
    transition:all ease-in-out 1s;
    /*transform-origin: top right;*/
    margin-right: -320px !important;
  }
}


@font-face {
  font-family: "Product Sans";
  src: url("../../../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

@font-face {
  font-family: "Product Sans";
  src: url("../../../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

.content-container {

}

#context{
  position: absolute;
  margin-left: 30px;
  z-index: 9999999999;
  cursor: pointer;
  margin-top: 20px;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
}

.context-app{
  display: flex;
  width: max-content;
  color: #60566b;
  height: 20px;
}

.context-app .icon{
  display: flex;
  filter : invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(95%) contrast(88%);

}

.context-name{
  /*margin-left: 30px;*/
  /*margin-top: 20px;*/
  font-size: 30px;
  font-weight: bold;
  color: #9da6ba;
  z-index: 999;
  /*position: absolute;*/
}

.sidebar{
  height: calc(100% - 40px);
  border-radius: 16px;
  margin-right: 20px;
}

#ctn-all {
  width: 100%;
  background: #2c2b2e;
  display: flex;
  position: relative;
  height: 100%
}

#left-sidebar{
  height: 100%;
  box-sizing: border-box;
  width: 100px;
  background: #2c2b2e;
  display: flex;
  justify-content: space-around;
  padding-top: 15%;
  padding-bottom: 15%;
  flex-direction: column;
  /*border: 1px solid blue;*/
}

#ctn-apps{
  height: 200px;
  align-items: center;
  display: flex;
  position: relative;
  justify-content: space-around;
  flex-direction: column;
}

#ctn-aircraft{
  display: flex;
  z-index: 99 ;
  /*margin-left: 0;*/
  background: #121212;
  box-shadow: rgba(0, 0, 0, 0.49) -2px 0px 8px 1px;
  position: relative;
  align-items: center;
  width: 100%;
  border-radius: 20px 0px 0px 20px;
  height: 100%;
}

.ctn-btn-app{
  position: relative;
  height: 64px;
  border-radius: 20px;
  /*background: #9da6ba;*/
  width: 64px;
}

.btn-app{
  position: absolute;
  top:0;
  z-index: 1;
  /*bottom: 0;*/
  transform-origin: center;
  transition: transform 0.5s  cubic-bezier(.72, .02, .44, 1.38);
  user-select: none;
  user-focus: none;
  background: linear-gradient(45deg, rgb(111, 98, 123) -0%, rgb(192, 178, 236) 110%);
  height: 64px;
  border-radius: 20px;
  /*background: rgba(94, 98, 107, 0.08);*/
  width: 64px;
  transform: scale(0);
}


.ctn-btn-app.selected img{
  filter: invert(10%);
  margin: 20px;
}

.ctn-btn-app img{
  position: relative;
  z-index: 2;
  filter: invert(80%) sepia(97%) saturate(949%) hue-rotate(215deg) brightness(110%) contrast(80%);
  margin: 20px;
}

.ctn-btn-app.selected .btn-app{
  transform: scale(1);
}

</style>
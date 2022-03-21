<template>

  <!--    <HelloWorld  />-->

  <div class="ctn-all aircraft-form">
    <div class="ctn-large">
      <div class="ctn-tech">
        <div class="ctn-context">
          <div class="context">
            <span class="context-name">{{ aircraft.ICAO }}</span>
            <div class="context-app">
              <span>{{ aircraft.aircraftModel }}</span>
            </div>

          </div>

          <div class="manufacturer">
            <img src="@/assets/icons/hammer-wrench.svg" alt="">
            <span class="manufacturer-name">{{ aircraft.manufacturer }}</span>


          </div>
        </div>
        <div class="misc mobile">
          <img src="@/assets/icons/aliceInfo.svg" alt="">
          <span>{{ aircraftInfo.anecdote }}</span>
        </div>
        <div class="ctn-information-simplified">
          <!--          <div class="nav">-->
          <!--            <ul class="nav-section-ctn">-->
          <!--              <li class="nav-section">Vitesse</li>-->
          <!--              <li class="nav-section">Masse et plafond</li>-->

          <!--            </ul>-->
          <!--            <div class="nav-lower-bar"></div>-->
          <!--          </div>-->
          <div class="information-simplified-content speed">
            <div class="information-section">
              <div class="header">
                <div class="name">
                  <span>Vitesse maximales</span>
                </div>
                <div class="sub">
                  <span>Vitesse minimales</span>
                  <img src="@/assets/icons/information-outline.svg" alt="">
                </div>
              </div>
              <div class="content line">

                <InfoTile label="VMO" :info-icon="false"
                          :value="parseFloat(coefficient.aircraftFlightEnvelope.maxOperatingSpeed)/10"
                          unit="kts" background="#C9B8E1" color="#1C1924"></InfoTile>
                <InfoTile label="MMO" :v-show="MMO" :value="MMO" unit="" background="linear-gradient(255deg, rgb(165, 152, 250) -40%, #C9B8E1 100%)" color="#1C1924"></InfoTile>
              </div>
            </div>
            <div class="information-section">
              <div class="header">
                <div class="name">
                  <span>Vitesses usuelles</span>
                </div>
              </div>
              <div class="content usual">
                <div class="sub-content">
                  <div class="info-tile-container speed climb">
                    <img class="background climb" src="@/assets/icons/climb.svg">
                    <div class="info-header">
                      <span > Montée </span>
                    </div>
                    <div class="info-value speed">
                      <div class="mach">
                        <span :style="{color : color}">{{ this.defaultSpeed.climb.standardClimbMachNumber.averageMassMach }}</span>
                        <!--                      <span :style="{color : color}" class="unit">kts</span>-->
                      </div>
                      <div class="sep"></div>
                      <div class="speed">
                        <span :style="{color : color}">{{ this.defaultSpeed.climb.highAltitudeClimbSpeed.averageMassSpeed }}</span>
                        <span :style="{color : color}" class="unit">kts</span>
                      </div>
                    </div>
                  </div>
                  <div class="info-tile-container speed">
                    <img class="background cruise" src="@/assets/icons/cruise.svg">
                    <div class="info-header">
                      <span > Croisière </span>
                    </div>
                    <div class="info-value speed">
                      <div class="mach">
                        <span :style="{color : color}">{{ this.defaultSpeed.cruise.standardCruiseMachNumber.averageMassMach }}</span>
                        <!--                      <span :style="{color : color}" class="unit">kts</span>-->
                      </div>
                      <div class="sep"></div>
                      <div class="speed">
                        <span :style="{color : color}">{{ this.defaultSpeed.cruise.highAltitudeCruiseSpeed.averageMassSpeed }}</span>
                        <span :style="{color : color}" class="unit">kts</span>
                      </div>
                    </div>
                  </div>
                  <div class="info-tile-container speed">
                    <img class="background descent" src="@/assets/icons/descent.svg">
                    <div class="info-header">
                      <span > Descente </span>
                    </div>
                    <div class="info-value speed">
                      <div class="mach">
                        <span :style="{color : color}">{{ this.defaultSpeed.descent.standardDescentMachNumber.averageMassMach }}</span>
                        <!--                      <span :style="{color : color}" class="unit">kts</span>-->
                      </div>
                      <div class="sep"></div>
                      <div class="speed">
                        <span :style="{color : color}">{{ this.defaultSpeed.descent.highAltitudeDescentSpeed.averageMassSpeed }}</span>
                        <span :style="{color : color}" class="unit">kts</span>
                      </div>
                    </div>
                  </div>
                </div>

<!--                <InfoTile class="speed" label="Loi de vitesse" :info-icon="true" value="xxxx" unit="kts"></InfoTile>-->
<!--                <InfoTile class="speed" label="Loi de vitesse" :info-icon="true" value="xxxx" unit="kts"></InfoTile>-->
<!--                <InfoTile class="speed" label="Loi de vitesse" :info-icon="true" value="xxxx" unit="kts"></InfoTile>-->
                <div class="more-info-tile">
                  <div>
                    <img src="@/assets/icons/alert-outline.svg"/>
                    <span> La loi de vitesse dépend fortement d'un vol à un autre, ces valeurs ne sont fournies qu'à titre indicatif car...</span>
                  </div>

                  <img src="@/assets/icons/chevron-down.svg"/>
                </div>
              </div>
            </div>


            <!--              work in progress aaa-->

          </div>

          <div class="information-simplified-content mass ceiling" style="{display: none}">
            <div class="information-section">
              <div class="header">
                <div class="name">
                  <span>Plafond</span>
                </div>
              </div>
              <div class="content">
                <div class="info-tile-container">
                  <div class="info-header">
                    <span></span>
                    <img src="@/assets/icons/information-outline.svg" v-show="true" alt="">
                  </div>
                  <div class="info-value">
                    <span>{{ Math.floor(this.ceiling/100)*100 }}</span>
                    <span class="unit">ft</span>

                  </div>
                  <div class="mass-cursor">
                    <div class="label">MASSE</div>
                    <div class="slider-container">
                      <input type="range" :min="50"
                             :max="100"
                             v-bind:style="{  }"
                             step="5" class="slider" v-model="cursorMass">
                    </div>
                  </div>

                </div>
<!--                <InfoTile label="" :info-icon="true" value="41000" unit="ft"></InfoTile>-->
              </div>

            </div>
            <div class="information-section mass">
              <div class="header">
                <div class="name">
                  <span>Masse</span>
                </div>
              </div>
              <div class="content">
                <div class="more-info-tile warn" v-show="coefficient.aircraftType !== aircraft.ICAO">
                  <img class="warn" src="@/assets/icons/aliceWarn.svg"/>
                  <div>

                    <span>Ces informations sont basées sur {{coefficient.aircraftType}} : des erreurs peuvent subsister, n'hésitez pas à nous les faire remonter !</span>
                  </div>
                </div>
                <InfoTile label="Masse max. au décollage" :info-icon="true" :value="parseFloat(coefficient.aircraftStandardMass.maximumMass)/1000" unit="t"></InfoTile>
                <InfoTile label="Masse à vide" :value="parseFloat(coefficient.aircraftStandardMass.minimumMass)/1000" unit="t"></InfoTile>
              </div>
            </div>
<!--            <div class="graph">-->
<!--              <div class="graph2">-->
<!--                work in progress aaa-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="graph">-->
<!--              <div class="graph2">-->
<!--                work in progress aaa-->
<!--              </div>-->
<!--            </div>-->


            <!--              work in progress aaa-->

          </div>
        </div>


      </div>

      <div class="elmt-presentation">
        <div class="bitebois">
          <img class="main-img" :src="imageURL" alt=""/>
          <div class="misc">
            <img src="@/assets/icons/aliceInfo.svg" alt="">
            <span>{{ aircraftInfo.anecdote }}</span>
          </div>
        </div>

        <div class="elmt-explore">
          <div class="header">
            <div class="name">
              <span>Explorer</span>
            </div>
            <div class="details">
              Afficher des informations détaillées sur le profil ou les
              taux de montée /descente
            </div>
          </div>
          <div class="tile-container" style="{opacity: 0}">
            <router-link :to="$route.fullPath+'aircraftForm/'+'sPerformances'">
              <Tile type="Performances et taux"></Tile>
            </router-link>
            <router-link style="-webkit-user-drag: none; " :to="$route.fullPath+'aircraftForm/'+'dynamic'">
              <Tile class="tile" type="Profil de vol"></Tile>
            </router-link>
          </div>
        </div>

        <div class="elmt-explore mobile">

            <router-link :to="$route.fullPath+'aircraftForm/'+'sPerformances'">
              <div class="tile-container" style="{opacity: 0}">
                  <img class="rruaa" src="@/assets/icons/insert_chart_black_24dp.svg">
              </div>
            </router-link>
            <router-link style="-webkit-user-drag: none; " :to="$route.fullPath+'aircraftForm/'+'dynamic'">
              <div class="tile-container" style="{opacity: 0}">
                <img class="rruaa" src="@/assets/icons/show_chart_black_24dp.svg">
              </div>
            </router-link>

        </div>
      </div>
    </div>
    <!--    <router-link style="text-decoration: none; color: inherit" :to="'/plane/'+aircraft.ICAO+'/'">-->
    <!--      <transition name="side-in" appear>-->


    <!--      </transition>-->

    <!--    </router-link>-->

  </div>


</template>

<script>


// import HelloWorld from "@/components/HelloWorld"

import Tile from "@/components/Tile"
import {imageData} from "@/BADA/Data/imagesRef"
// import {aircraftInfo} from "@/BADA/Data/imagesRef"
import InfoTile from "@/components/Nav/InfoTile"
import {acInfo} from "@/BADA/Data/acInfo"
import {maxAltitude} from "@/BADA/perfomanceFile"


// import * as aircraftInfo from "cheerio/lib/api/traversing"
// import url from "@/assets/icons/airplane-edit.svg"
// import {formattedList} from "@/BADA/Data/dataFormatting"
// import {coef} from "@/BADA/Data/coefficients"

export default {
  name: "SelectScreen",

  components: {

    InfoTile,

    Tile,

  },

  props: ["coefficient", "aircraft", "defaultSpeed"],

  data() {
    return {
      selectedMass: "",
      currentSet: ["static", "dynamic"],
      currentIndex: 0,
      transformStyle: 'translateX(0)',
      transitionClass: 'transition-initial',
      maxIndex: 1,
      cursorMass: 50,
      routeName: "static",
      show: true,
    };
  },

  watch: {
    // '$route' () {
    //   this.transformStyle = this.$route.params.type === 'static' ? 'translateX(0vw)' : 'translateX(-100vw)';
    // }
  },

  beforeMount() {
    console.log(this.defaultSpeed)
    // this.MMO = parseFloat(this.coefficient.aircraftFlightEnvelope.maxOperatingMachNumber)
    // this.aircraftInfo = acInfo.find(AC => AC.ICAO === this.aircraft.ICAO)

  },


  created() {
    console.warn("MOUNT")
    // window.addEventListener("keydown", (event)=>{
    //   if (event.code==="ArrowRight"){
    //     this.currentIndex = this.currentIndex < this.maxIndex ? this.currentIndex+1 : this.maxIndex
    //     this.next()
    //   }
    //   else if (event.code==="ArrowLeft"){
    //     this.currentIndex = this.currentIndex > 0 ? this.currentIndex-1 : 0
    //     this.previous()
    //   }
    //   // this.changeCard()
    // })
  },

  methods: {
    // changeCard(){
    //   const {  upcomingIndex, currentSet} = this
    //   const id = currentSet[upcomingIndex];
    //   this.$router.replace({ name: "select-screen", params: { id } });
    // },
    // previous() {
    //
    //
    //   this.transitionClass = 'transition-item';
    //   // this.transformStyle = 'translateX(100vw)';
    //   this.$router.push({ name: 'SelectScreen', params: {type: 'static' }})
    //   // const prevIndex = currentIndex === 0 ? currentSet.length - 1 : currentIndex - 1;
    //   // this.upcomingIndex = prevIndex;
    //   // if (isTranslationDisabled) {
    //   //   this.changeCard();
    //   // }
    // },
    // next() {
    //
    //
    //   this.transitionClass = 'transition-item';
    //   // this.transformStyle = 'translateX(-100vw)';
    //   // setTimeout(()=>{
    //     this.$router.push({ name: 'SelectScreen', params: {type: 'dynamic' }})
    //     // this.transformStyle = 'translateX(0vw)';
    //   // },500)
    //
    //   // const prevIndex = currentIndex === 0 ? currentSet.length - 1 : currentIndex - 1;
    //   // this.upcomingIndex = prevIndex;
    //   // if (isTranslationDisabled) {
    //   //   this.changeCard();
    //   // }
    // },

  },
  computed: {
    ceiling: function (){
      return maxAltitude(this.coefficient, this.cursorMass)
    },

    aircraftInfo: function () {
      return acInfo.find(AC => AC.ICAO === this.aircraft.ICAO)
    },

    imageRef: function () {
      return imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
    },

    MMO: function () {
      return parseFloat(this.coefficient.aircraftFlightEnvelope.maxOperatingMachNumber)
    },

    imageID: function () {
      let imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
      if (imageRef) {
        return this.imageRef.imageIDs[0].toString()
      } else return ""
    },


    imageURL: function () {
      try {
        console.log(this.imageID)
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/Images/' + this.imageID + '.jpg')
        console.log(url)
        return url

      } catch (e) {
        console.log('No Image')
        console.log(e)
        let url = require('@/assets/icons/airplane-edit.svg')

        return url
      }
      // return  ""
    },

    // aircraft(){
    //   return formattedList.find((aircraft)=> aircraft.ICAO === this.id)
    // },

    // aircraftCoef(){
    //   let aircraft = this.aircraft
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    //   this.aircraftCoefficients = coef.aircraftPerformances.find((object)=> object.aircraftType === aircraft.performanceReference)
    //   return this.aircraftCoefficients
    // },
  },

}


</script>

<style scoped>


.more-info-tile {
  /*box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;*/
  display: flex;
  margin-top: 10px;
  color: rgba(255, 209, 238, 0.73);
  margin-right: 10px;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  /*height: 110px;*/
  padding-top: 10px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  font-size: 12px;
  flex: 1 1 auto;
  box-sizing: border-box;
  min-width: 100px;
  max-width: 300px;
  border-radius: 14px;
  padding-left: 20px;
  padding-right: 20px;
  border: 1px solid rgba(255, 133, 162, 0.32);
  background: rgba(139, 80, 104, 0.37);
}

.more-info-tile.warn{
  display: flex;
  flex-direction: row;
}

.more-info-tile div img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
  filter: invert(70%) sepia(20%) saturate(1541%) hue-rotate(290deg) brightness(98%) contrast(88%);
}

.more-info-tile img.warn {
  width: 30px;
  height: 30px;
  margin-right: 15px;
  filter: invert(70%) sepia(20%) saturate(1541%) hue-rotate(300deg) brightness(98%) contrast(88%);
}

.more-info-tile img {
  filter: invert(80%);
}

/**{*/
/*  border : 1px solid blue*/
/*}*/

.information-section {
  /*display: flex;*/

  max-width: 400Px;
}

.information-section.mass .info-tile-container{
  margin-bottom: 10px;

}

.information-simplified-content.mass {

  margin-left: 10px;
}

.content .container {
  margin-top: 10px
}

.speed .content.line {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}

.info-value{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.info-value.speed{
  height: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  justify-content: space-evenly;
  flex-direction: column;
}


.sep{
  width: 80%;
  height : 2px;
  border-top : #464462 dashed 1px ;
  /*background: #9e8fa1;*/
}

.info-value span{
  color: #ccc0fd;
  font-size: 28px;
  letter-spacing: 2px;
  font-weight: bold;
}

.elmt-explore.mobile{
  display: none;
}

span.unit{
  font-size: 20px;
  margin-left: 6px;
  color: #7c7786;
}

.info-header {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  height: 60px;
  justify-content: space-between;
}

.info-tile-container.speed .info-header{
  padding-left: 40px;
}

.info-header span {
  color: #8f89a2;
  letter-spacing: 1px;

}

.info-header img {
  filter: invert(80%);
  width: 20px;
}

.info-tile-container {
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 8px 1px;
  display: flex;
  margin-right: 10px;
  align-items: flex-end;
  /*justify-content: space-evenly;*/
  flex-direction: column;
  /*height: 110px;*/
  flex: 1 1 auto;
  min-width: 100px;
  /*max-width: 300px;*/
  border-radius: 14px;
  background: #2c2934;
}

.info-tile-container.speed {
  /*box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 8px 1px;*/
  /*display: flex;*/
  overflow: hidden;
  /*margin-right: 10px;*/
  /*align-items: flex-end;*/
  /*justify-content: space-evenly;*/
  position: relative;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  height: 100px;
  /*flex: 1 1 auto;*/
  /*min-width: 100px;*/
  /*max-width: 300px;*/
  /*border-radius: 14px;*/
  /*background: #2c2934;*/
}

.info-tile-container img.background{
  position: absolute;
  /*width: 100%;*/
  height: 100%;
  /*background: black;*/
  /*background-image: url("/src/assets/icons/climb.svg");*/

}

.info-tile-container img.background.climb{
  position: absolute;
  right: 0;
  /*background: black;*/
  /*background-image: url("/src/assets/icons/climb.svg");*/

}

.info-tile-container.speed .info-value span{
  color: #C4BAE8;
}

.info-tile-container.speed .info-value span.unit{
  color: #746d8e;
}

.mass-cursor{
  display: flex;
  height: 60px;
  color: #797187;
  font-size: 10px;
  font-weight: bold;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.slider-container{
  /*height: 40px;*/
  display: flex;
  align-items: center;
}

input[type=range] {
  /*transform-origin: center;*/
  width: 100%;
  height: 2px;

  /*margin: 10px;*/

  /*transform: rotateZ(270deg);*/
  /*padding: 0 5px;*/
  /*-webkit-appearance: slider-vertical;  !* Override default CSS styles *!*/
  appearance: none;
  background: #534a6b; /* Grey background */
  border-radius: 50px;
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  /*-webkit-appearance: slider-vertical; !* Override default look *!*/
  appearance: none;
  outline: none;
  border-radius: 50px;
  width: 12px; /* Set a specific slider handle width */
  height: 12px; /* Slider handle height */
  background: linear-gradient(45deg, rgb(187, 152, 230) -0%, rgb(184, 166, 241) 110%); /* Green background */
  border: 1px #2f2a37 solid;
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: linear-gradient(45deg, rgb(187, 152, 230) -0%, rgb(184, 166, 241) 110%); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.content {
  position: relative;
  padding-left: 20px;
}

.misc.mobile{
  display: none;
}



.information-section .header {
  margin-top: 30px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header .sub{
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #d3bef4;
}



.header .sub img{
  width: 16px;
  filter: invert(77%) sepia(22%) saturate(535%) hue-rotate(211deg) brightness(100%) contrast(91%);

  margin-left: 5px;
  height: 16px;
  color: #d3bef4;
}

.name {
  align-self: center;
  font-size: 18px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "Product Sans", sans-serif;
  color: #cbcadf;
}

.graph {
  position: relative;
  height: 200px;
  width: 300px;
  box-sizing: border-box;
  padding-top: 20px;
  margin-left: 20px;
  flex: 1 0 300px;
  max-height: 200px;
  max-width: 300px;
  border-radius: 12px;

}

.graph2 {
  background: #2a272e;
  border-radius: 12px;
  position: relative;
  height: 100%;
  width: 100%;
}

.information-simplified {
  /*border : 1px solid blue;*/

  height: 100%;
  min-width: 600px;
  position: relative;
  justify-content: space-evenly;
  /*padding-top: 00px;*/
  /*flex: 1 0 600px;*/
  /*min-width: max-content;*/
  display: flex;
}


.ctn-tech {
  display: flex;
  margin-right: 50px;
  justify-content: space-between;
  flex-direction: column;
  /*min-width: max-content;*/
  flex: 1 0 max-content;
}

.information-simplified-content {
  flex: 1 0 auto;
  min-width: 300px;
  margin-top: 5px;
  /*height: 100%;*/
  align-content: flex-start;
  /*flex-wrap: wrap;*/

  display: flex;
  flex-direction: column;
  /*justify-content: space-between;*/
  position: relative;
  /*padding-left: 20px;*/
  /*flex: 1 1 auto;*/
  /*overflow-y: auto;*/
  padding-right: 20px;
}

.information-simplified-content{
  overflow-y: auto;
  transition: all ease-in-out 0.6s;

}

.information-simplified-content:hover::-webkit-scrollbar {
  display: flex;
  transition: all ease-in-out 0.6s;
}

.information-simplified-content::-webkit-scrollbar {
  width: 4px;
  transition: all ease-in-out 0.6s;
  display: none;

  background: rgba(241, 241, 241, 0.00);
  border-radius: 20px;
}

/* Track */
.information-simplified-content::-webkit-scrollbar-track {
  background: rgba(241, 241, 241, 0.00);
}

/* Handle */
.information-simplified-content::-webkit-scrollbar-thumb {
  background: rgba(94, 90, 97, 0.58);
  border-radius: 20px;
}

/* Handle on hover */
.information-simplified-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/*@media (max-width: 1024px) and (min-width: 738px) {*/
/*  .information-simplified-content {*/
/*    overflow-y: auto;*/
/*    !*flex: 1 0 auto;*!*/
/*    align-items: center;*/
/*    min-width: 260px;*/
/*    padding-left: 10px;*/
/*    !*flex: 1 1 auto;*!*/
/*    !*overflow-y: auto;*!*/
/*    padding-right: 10px;*/
/*    flex-wrap: nowrap;*/

/*  }*/
/*}*/

@media (max-width: 2000px) and (min-width: 1624px) {


  .ctn-all.aircraft-form{
    margin-top: 20px;
    padding-left: 100px !important;
    padding-right: 100px !important;
  }


}

@media (max-width: 1130px) and (min-width: 739px) {


  .ctn-information-simplified {
    flex-direction: column;
    padding: 0 !important;
    align-items: center;
    overflow-y: auto;
  }

  .information-simplified-content{
    flex: 1 0 100% !important;
    width: 80%;
    margin: 0 !important;
    padding: 0 !important;
  }



}

@media (max-width: 738px) and (min-width: 100px) {
  .ctn-information-simplified {
    flex-direction: column;
    padding: 0 !important;
    align-items: center;
  }

  .more-info-tile {
    /*padding: 0 !important;*/
    margin: 0 0 20px 0 !important;
    max-width: 100%;
  }


  .information-simplified-content.speed  .more-info-tile {
    /*padding: 0 !important;*/
    margin: 0 20px 0px 0 !important;
    max-width: 100%;
  }



  .elmt-presentation{
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding-bottom:  0px !important;
    /*padding-left: 40px;*/
    /*margin-bottom: 40px;*/

    /*padding-right: 40px;*/
  }

  /*.elmt-presentation .{*/
  /*  width: 100%;*/
  /*  position: relative;*/
  /*  box-sizing: border-box;*/
  /*  padding-bottom:  0px !important;*/
  /*  !*padding-left: 40px;*!*/
  /*  !*margin-bottom: 40px;*!*/

  /*  !*padding-right: 40px;*!*/
  /*}*/

  .ctn-context{
    margin: 10px;
  }

  .elmt-presentation .main-img{
    /*margin-bottom: 10px ;*/
  }
  .misc.mobile{
    /*margin-top: 20px;*/
    margin-left: 20px;
    width: auto;
    display: flex;
    max-width: 100%;
    margin-right: 20px;
    margin-top: 20px !important;
    /*padding: 0 !important;*/
    /*margin-bottom: 10px ;*/
  }

  .elmt-presentation .misc{
    /*margin-top: 20px;*/
    /*margin-left: 20px;*/
    /*width: auto;*/
    display: none;
    /*max-width: 100%;*/
    /*margin-right: 20px;*/
    /*margin-top: 0px !important;*/
    /*padding: 0 !important;*/
    /*margin-bottom: 10px ;*/
  }

  .elmt-presentation .elmt-explore{
    /*margin-top: 20px;*/
    /*display: none;*/
    display: none;
    /*padding: 0 !important;*/
    /*margin-bottom: 10px ;*/
  }

  .elmt-explore.mobile {
    display: flex;
    position: absolute;
    margin-right: 20px;
    bottom: -20px;
    right: 0;
    flex-direction: row;
  background: none;

  }

  .elmt-presentation .main-img {
    height: calc(100% + 10px);
    border-radius: 0;
  }

  .elmt-presentation .bitebois {
    overflow: hidden;
  }

  .elmt-explore.mobile img{

    width: 20px;
    filter: invert(11%) sepia(20%) saturate(141%) hue-rotate(250deg) brightness(82%) contrast(88%);

  }

  .elmt-explore.mobile .tile-container{
    /*display: flex;*/
    box-shadow: rgba(0, 0, 0, 0.19) 0px 1px 10px 2px;
    margin-left: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 48px;
    width: 48px;
    border-radius: 100%;
    background: #b5b0de;

  }


  /*.elmt-presentation .elmt-explore .name{*/
  /*  display: none;*/
  /*}*/

  /*.elmt-presentation .elmt-explore .tile-container .tile .tile-lower-container p{*/
  /*  display: none;*/
  /*}*/

  /*.elmt-presentation .elmt-explore .tile-container .tile {*/
  /*  width: 48px;*/
  /*  height: 48px;*/
  /*  border-radius: 100%;*/
  /*}*/

  /*.elmt-presentation .elmt-explore .tile-container .tile .tile-lower-container{*/
  /*  width: 48px !important;*/
  /*  height: 48px;*/
  /*  border-radius: 100%;*/
  /*}*/


  /*.elmt-presentation .elmt-explore .details{*/
  /*  display: none;*/
  /*}*/

  .information-simplified-content.speed .content.usual{
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 0px 0px 0 20px !important;
    /*padding-left: 20px !important;*/
    box-sizing: border-box;
    /*padding-right: 20px;*/
    overflow-y: auto;
  }

  .information-simplified-content.speed .sub-content{
    display: flex;
    width: 100%;
    padding: 0px 0px 0 0px !important;
    /*padding-left: 20px !important;*/
    box-sizing: border-box;
    /*padding-right: 20px;*/
    overflow-y: auto;
  }


  .content.line .info-tile-container{
    margin-right: 20px !important;
  }

  .elmt-presentation{
    order: 1;
  }

  .information-simplified-content .content{
    /*display: flex;*/
    /*width: 100%;*/

    margin-right: 20px;
    /*padding: 0 !important;*/
    /*margin-left: 30px;*/
    /*overflow-y: auto;*/
  }

  .information-simplified-content .content.line{
    /*display: flex;*/
    /*width: 100%;*/
    margin-right: 0px !important;
    padding-right: 00px !important;
    /*padding: 0 !important;*/
    /*margin-left: 30px;*/
    /*overflow-y: auto;*/
  }

  .ctn-large{
    flex-direction: column;
    overflow: auto;
    transform: translateY(-88px);
    height: calc(100% + 88px);
    /*padding-bottom: 20px;*/
    /*overflow-y: auto;*/
    align-items: center;
  }

  .information-simplified-content {
    padding: 0;
    width: 100%;
    margin: 0 !important;
  }

  .ctn-all.aircraft-form{
    margin-top: 20px;
    padding: 0 !important;
  }

  .ctn-tech{
    width: 100%;
    margin: 0;
    padding-bottom: 20px;
    order: 2;
    box-sizing: border-box;
    /*padding-left: 20px;*/
    /*padding-right: 20px;*/
  }

  .information-section{
    width: 100%;
    max-width: 100%;
  }

  .info-tile-container{
    /*max-width: 500px;*/
    margin-right: 0px !important;
  }

  .info-tile-container.speed{
    min-width: 80%;
    margin-right: 20px !important;
  }

  .header{
    margin-right: 20px;
    margin-left: 20px ;
  }
}

.ctn-information-simplified {
  position: relative;
  padding-left: 20px;
  box-sizing: border-box;
  height: calc(100% - 64px);
  /*min-width: max-content;*/
  /*padding-left: 20px;*/
  display: flex;
  /*border: 1px solid black;*/
  justify-content: space-between;
  /*flex-direction: column;*/
  /*flex: 1 0 min-content;*/
}



.nav {
  position: relative;
  display: flex;
  margin-top: 10px;
  /*flex: 1 0 auto;*/
  height: 40px;
  position: relative;
  /*border: #2f7fff 1px solid;*/
}

.nav-section {
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  letter-spacing: 1px;
  color: #575664;
}

.nav-section-ctn {
  display: flex;
  padding: 0 !important;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
}

.nav-lower-bar {
  height: 1px;
  width: 100%;
  bottom: 0;
  position: absolute;
  background: rgba(151, 157, 165, 0.13);
}

.ctn-large {
  display: flex;
  flex: 1 1 auto;
  justify-content: space-between;
}

.ctn-context {
  /*flex: 1 1 auto;*/
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.context {
  /*position: absolute;*/
  /*margin-left: 30px;*/
  /*z-index: 9999999999;*/
  cursor: pointer;
  /*margin-top: 20px;*/
  /*top: 0;*/
  /*left: 0;*/

  display: flex;
  flex-direction: column;
}

.context-app {
  display: flex;
  width: max-content;
  color: #817c87;
  font-size: 20px;
  height: 20px;
}

.context-app .icon {
  display: flex;
  filter: invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(95%) contrast(88%);

}

.context-name {
  /*margin-left: 30px;*/
  /*margin-top: 20px;*/
  letter-spacing: 2Px;
  font-size: 36px;
  font-weight: bold;
  color: #c2c0d5;
  z-index: 999;
  /*position: absolute;*/
}

.static-enter-active,
.static-leave-active {
  transition: all 1s ease-in-out 0s;
}

.static-enter-from,
.static-leave-to {
  /*transition: all 1s ease-in-out 0s;*/
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

#rendered-items-flexbox {
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: fit-content;
  width: 100vw;
  box-sizing: border-box;
  touch-action: pan-y;
}

.transition-initial {
  transition: transform 0s ease;
}

.transition-item {
  transition: transform 500ms cubic-bezier(0, 0, 0.2, 1);
}

.transition-edge {
  transition: transform 1000ms ease-out;
}

.container {
  width: 200vw;
}

.dynamic {
  position: absolute;
  left: 100vw;
}

.nav-bar {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  /*border: 2px #ff2525 solid;*/
  width: 20%;
  left: 40%;
  /*z-index: 100;*/
  padding-top: 35px;
  position: absolute;
  height: 100px;
  font-size: 22px;
}

.main-img {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;
  border-radius: 12px;
}

.aircraft-form.ctn-all {
  height: calc(100% - 80px);
  box-sizing: border-box;
  display: flex;
  /*padding-bottom: 40px;*/
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
}

.manufacturer {
  color: rgba(137, 138, 208, 0.53);
  height: 18px;
  display: flex;
}

.manufacturer img {
  height: 18px;
  filter: invert(45%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);

  width: 18px;
  margin-right: 5px;
}

.manufacturer span {
  line-height: 18px;
  letter-spacing: 1px;
  font-size: 18px !important;
  padding: 0;
  margin: 0;
}

.elmt-presentation {
  flex: 0 1 400px;
  display: flex;
  padding-bottom: 40px;
  justify-content: space-between;
  flex-direction: column;
  /*width: 400px;*/
}

.elmt-explore {
  display: flex;
  flex-direction: column;
  background: rgba(52, 49, 61, 0.64);
  border-radius: 16px;
}

.elmt-explore .header {
  margin-top: 10px;
  flex-direction: column;
  align-items: flex-start !important;
}

.elmt-explore .details {
  color: #d2c8ed;
  margin-top: 10px;
  opacity: 0.8;
  font-size: 12px;
  padding-left: 30px;
  padding-right: 30px;

}

.elmt-explore .name {
  font-size: 18px;
  color: #D3D3E6;
  padding-left: 20px;
}

.elmt-explore .tile-container {
  align-self: flex-end;
  width: auto;
}

.misc {
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;
  width: 100%;
  /*margin-top: 40px;*/
  /*margin-bottom: 20px;*/
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  margin-top: 20px;
  padding-right: 30px;
  border-radius: 12px;
  /*box-shadow: ;*/
  font-size: 12px;
  color: #bfbdd0;
  font-style: italic;
  background: rgba(52, 49, 61, 0.64);
}

.misc span {
  /*height: 100%;*/
  /*line-height: 100%;*/
}

.misc img {
  width: 16px;
  height: 100%;
  margin-right: 20px;
  filter: invert(65%) sepia(20%) saturate(541%) hue-rotate(210deg) brightness(95%) contrast(88%);
}

.nav-bar div {
  cursor: pointer;
}

#nav2 {
  box-sizing: border-box;
  border: 2px #2f7fff solid;
  width: 100%;
  position: absolute;
  left: 100%;
  height: 100%;
}
</style>
<template>

  <!--    <HelloWorld  />-->
  <div class="tile-container" style="{opacity: 0}">
    <router-link :to="$route.fullPath+'aircraftForm/'+'sPerformance'">
      <Tile type="Performances"></Tile>
    </router-link>
    <router-link style="-webkit-user-drag: none; " :to="$route.fullPath+'aircraftForm/'+'dynamic'">
      <Tile class="tile" type="Flight profile"></Tile>
    </router-link>
  </div>
  <div class="ctn-all">
    <div class="ctn-large">
      <div class="ctn-tech">
        <div class="ctn-context">
          <div class="context">
            <span class="context-name">{{ aircraft.ICAO }}</span>
            <div class="context-app">
              <span>Airbus A380-800</span>
            </div>

          </div>

          <div class="manufacturer">
            <img src="@/assets/icons/hammer-wrench.svg" alt="">
            <span class="manufacturer-name">{{ aircraft.manufacturer }}</span>


          </div>
        </div>
        <div class="ctn-information-simplified">
          <div class="nav">
            <ul class="nav-section-ctn">
              <li class="nav-section">Vitesse</li>
              <li class="nav-section">Masse et plafond</li>
              <li class="nav-section">Autre</li>
            </ul>
            <div class="nav-lower-bar"></div>
          </div>
          <div class="information-simplified">
            <div class="information-simplified-content">
              <div class="information-section">
                <div class="header">
                  <div class="name">
                    <span>Masse</span>
                  </div>
                </div>
                <div class="content">
                  <InfoTile label="Masse max. au décollage" :info-icon="true" value="30000" unit="t" ></InfoTile>
                  <InfoTile label="Masse à vide" value="30000" unit="t"></InfoTile>
                </div>
              </div>

              <div class="information-section">
                <div class="header">
                  <div class="name">
                    <span>Plafond</span>
                  </div>
                </div>
                <div class="content">
                  <InfoTile label="Plafond absolu" :info-icon="true" value="41000" unit="ft"></InfoTile>
                </div>
              </div>

            </div>
            <div class="graph">
              <div class="graph2">
                work in progress aaa
              </div>

<!--              work in progress aaa-->
            </div>
          </div>
        </div>


      </div>

      <div class="elmt-presentation">
        <img class="main-img" :src="imageURL" alt=""/>
        <div class="misc">
          <img src="@/assets/icons/information-outline.svg" alt="">
          <span>L'airbus A380-800 est le plus gros avion commercial au monde</span>
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
import InfoTile from "@/components/Nav/InfoTile"
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
      currentSet: ["static", "dynamic"],
      currentIndex: 0,
      transformStyle: 'translateX(0)',
      transitionClass: 'transition-initial',
      maxIndex: 1,
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
    this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
  },


  mounted() {
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


    imageID: function () {
      let imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)
      if (imageRef) {
        return this.imageRef.imageIDs[0].toString()
      } else return ""
    },


    imageURL: function () {
      try {
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/Images/' + this.imageID + '.jpg')
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

/**{*/
/*  border : 1px solid blue*/
/*}*/

.content .container {
  margin-top: 10px
}

.content{
  position: relative;
  padding-left: 20px;
}

.header {
  margin-top: 30px;
  margin-bottom: 20px;
}

.name {
  align-self: center;
  font-size: 15px;
  letter-spacing: 2px;
  font-weight: bold;
  font-family: "Product Sans", sans-serif;
  color: #cbcadf;
}

.graph {
  position: relative;
  height: 100%;
  /*width: 200px;*/
  box-sizing: border-box;
  padding-top: 67px;
  flex: 1 0 300px;
  max-width: 400px;
  border-radius: 12px;

}

.graph2 {
  background: #34313D;
  border-radius: 12px;
  position: relative;
  height: 100%;
  width: 100%;
}

.information-simplified {
  /*border : 1px solid blue;*/
  min-width: 680px;
  position: relative;
  justify-content: space-evenly;
  /*padding-top: 00px;*/
  /*flex: 1 0 600px;*/
  /*min-width: max-content;*/
  display: flex;
}

.tile-container {
  position: absolute;
  bottom: 0;
  right: 0;
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
  /*flex: 1 0 auto;*/
  /*min-width: max-content;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding-left: 20px;
  /*flex: 1 1 auto;*/
  /*overflow-y: auto;*/
  padding-right: 40px;
}

.ctn-information-simplified {
  position: relative;
  /*min-width: max-content;*/
  /*padding-left: 20px;*/
  display: flex;
  /*border: 1px solid black;*/
  justify-content: space-between;
  flex-direction: column;
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
  z-index: 100;
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

.ctn-all {
  height: calc(100% - 80px);
  box-sizing: border-box;
  display: flex;
  padding-bottom: 80px;
  padding-top: 80px;
  padding-left: 60px;
  padding-right: 60px;
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
  flex-direction: column;
  /*width: 400px;*/
}

.misc {
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;
  width: 100%;
  margin-top: 40px;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  padding-right: 30px;
  border-radius: 12px;
  /*box-shadow: ;*/
  font-size: 12px;
  color: #bfbdd0;
  font-style: italic;
  background: #34313D;
}

.misc span {
  /*height: 100%;*/
  /*line-height: 100%;*/
}

.misc img {
  width: 16px;
  height: 100%;
  margin-right: 20px;
  filter: invert(90%) sepia(20%) saturate(641%) hue-rotate(210deg) brightness(90%) contrast(88%);
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
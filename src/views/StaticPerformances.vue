<template>
  <div class="frame-container">
    <div id="perf" class="current-frame frame">
      <!--          <div class = "switch"></div>-->
      <!--          <div class="frame__title">-->
      <!--            <div class="frame__icon-title">-->
      <!--              <img src="../assets/insert_chart_black_24dp.svg" alt=""/>-->
      <!--            </div>-->
      <!--            <span class="frame__text-title">Expected Performances</span>-->
      <!--          </div>-->
      <div class="frame__content">
        <div class="section value">
          <div class="information">
            <span class="information__title">RATES</span>
            <div class="information__general rates">
              <div class="information__content" :class="{active: isSelected}" v-on:click="select()">
                <img src="../assets/vertical_align_top_black_24dp.svg"/>
                <span class="information__label">Rate of Climb</span>
                <div class="information__value">{{ climbPerf.rate }} ft/min</div>

                <div class="information__value selectedValue" v-on:wheel="changeSelection">{{ selectedClimbRate }}
                  ft/min
                </div>
                <div class="information__context" v-show="!checked">Vy : {{ climbPerf.speed }} kts FLmax :
                  {{ maxFLROCD }}
                </div>
              </div>
              <div class="information__content">
                <img src="../assets/vertical_align_bottom_black_24dp.svg"/>
                <span class="information__label">Rate of Descent</span>
                <div class="information__value">{{ descentPerf.rate }} ft/min</div>
                <div class="information__context">V : {{ descentPerf.speed }} kts</div>
              </div>
            </div>
          </div>
          <div class="information">
            <span class="information__title">SPEEDS</span>
            <div class="information__general speed">

              <div class="information-container">
                <div class="information__content">
                  <img src="../assets/vertical_align_top_black_24dp.svg"/>
                  <span class="information__label">Speed range</span>


                </div>
                <div class="speed-slider">
                  <div class="information__value__contener">
                    <div>{{ displayedSpeed }}</div>
                    <div class="stopbar-container"
                         v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }">
                      <div class="min">
                        <div class="stopbar"></div>
                        <span class="speed-value">{{ speedRange.minSpeed }}</span>
                      </div>

                      <div class="max">
                        <div class="stopbar"></div>
                        <span class="speed-value">{{ speedRange.maxSpeed }}</span>
                      </div>
                    </div>


                  </div>
                  <div class="slider-background"></div>
                  <div class="speed slidecontainer">

                    <input type="range" :min="minSpeed" :max="maxSpeed"
                           v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }"
                           step="1" class="slider" v-model="speed">
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
        <div class="section fl">
          <div class="text1" v-bind:style="{ bottom: computedHeight }">{{ climbPerf.maxFL }}</div>
          <div class="bar1" v-bind:style="{ height: computedHeight }"></div>
          <div class="bar3"
               v-bind:style="{ bottom: computedHeightScale(computedHpTrans(this.checked ? this.law : '')) }"></div>
          <div class="text2" v-bind:style="{ bottom: computedBottom }">{{ climbPerf.absoluteMaxFL }}</div>
          <div class="bar2" v-bind:style="{ height: computedHeight2 , bottom : computedBottom }"></div>
          <div id="fl-value">FL{{ this.FLinput }}</div>
          <div class="fl slidecontainer">
            <input type="range" min="60" max="410" step="10" class="slider" orient="vertical" id="myRange"
                   v-model="FLinput">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {HpTrans, knotToMs} from "@/BADA/func"
import {calcPerf, calcPerfbis, getPlaneMach, maxFLAtROCD, range, speedRange} from "@/BADA/perfomanceFile"

export default {
  name: "StaticPerformances",

  props: ["coefficient"],

  data() {
    return {
      // climbROCD: 0,


      FLinput: 0,
      minFL: 60,
      maxFL: 350,
      speed: 0,
      isSelected: false,
      selectedClimbRate: 0,
      currentProfilePoint: 0,
      checked: false,
      law: {speed: 280, mach: 0.75},
    }
  },

  methods: {
    select: function () {
      this.isSelected = !this.isSelected
    },

    changeUnit: function (event) {
      if (this.selectedUnit.element) {
        this.selectedUnit.element.classList.remove('selected')
      }
      this.selectedUnit = {
        element: event.target,
        unit: event.target.innerText
      }
      event.target.classList.add('selected')
    },

    changeSelection: function (event) {
      if (event.deltaY < 0) {
        this.selectedClimbRate = Math.min(this.selectedClimbRate + 100, this.climbPerf.rate)
      } else {
        this.selectedClimbRate = Math.max(this.selectedClimbRate - 100, 0)
      }

    },

    computedHpTrans: function (law) {
      if (law) {
        return Math.floor(HpTrans(knotToMs(law.speed), law.mach) / 100)

      } else return 290
    },

    computedHeightScale: function (FL) {
      return (FL - this.minFL) / (this.maxFL - this.minFL) * 200 + 15 + "px"
    },
  },

  computed: {
    speedRangeAtZero: function () {
      return range(0,  this.coefficient)
    },

    displayedSpeed: function () {
      if (this.FLinput > this.computedHpTrans(this.law)) {
        return Math.round(getPlaneMach(this.FLinput, this.speed) * 100) / 100
      } else return this.speed
    },

    minSpeed: function () {
      return range(this.FLinput, this.coefficient).minSpeed
    },

    maxSpeed: function () {
      return range(this.FLinput, this.coefficient).maxSpeed
    },


    sliderWidthInPx: function () {
      return 400 * (range(this.FLinput, this.coefficient).maxSpeed - range(this.FLinput, this.coefficient).minSpeed) / (this.speedRangeAtZero.maxSpeed - this.speedRangeAtZero.minSpeed)
    },

    sliderMarginLeftInPx: function () {
      return 400 * (range(this.FLinput, this.coefficient).minSpeed - this.speedRangeAtZero.minSpeed) / (this.speedRangeAtZero.maxSpeed - this.speedRangeAtZero.minSpeed)
    },

    climbPerf: function () {
      if (this.checked) {
        console.log("hi")
        return calcPerf(this.FLinput, this.law, this.speed, this.coefficient)
      } else return calcPerf(this.FLinput, "", this.speed, this.coefficient)
    },

    computedHeight: function () {
      return (this.maxFLROCD - 60) / 350 * 200 + "px"
    },

    computedHeight2: function () {
      return (this.climbPerf.absoluteMaxFL - 60) / 350 * 200 - (this.climbPerf.maxFL - 60) / 350 * 200 - 2 + "px"
    },

    computedBottom: function () {
      return (this.climbPerf.maxFL - 60) / 350 * 200 + 34 + "px"
    },

    maxFLROCD: function () {
      return maxFLAtROCD(this.FLinput, this.speed, this.law, this.selectedClimbRate / 197, this.coefficient)
    },

    descentPerf: function () {
      return calcPerfbis(this.FLinput, this.law, this.speed, this.coefficient)
    },

    speedRange: function () {
      return speedRange(this.FLinput, this.coefficient)
    },
  }
}
</script>

<style scoped>

.frame-container {
  position: relative;
  padding-top: 104px;
  /*width: 100%;*/
  /*border: 1px blue solid;*/
  box-sizing: border-box;
  height: 100%;
  flex: 1 1 auto;
}


.slider-background {
  background: #5f303d;
  position: relative;
  margin-top: 15px;
  width: 400px;
  border-radius: 30px;
  height: 2px;
}

.speed-slider {
  height: 100%;
}

.slidecontainer {
  display: inline-block;
  width: 20px;
  padding: 0;
  margin: 15px;
  height: 90%;
  /*width: 100%; !* Width of the outside container *!*/
}

.speed.slidecontainer {
  margin: 0;
  position: absolute;
  top: 3px;
  height: 100%;
  z-index: 999;
}

.content-container__app-button-container {

  display: flex;
  margin-top: 20px;
  width: 100%;
  padding: 20px;
}

.bar1 {
  width: 2px;
  height: 150px;
  z-index: 99;
  position: absolute;
  bottom: 32px;
  background: #86b3d5;
  transition: all 0.5s ease-in-out;
}

.text1 {
  position: absolute;
  left: -40px;
  font-size: 12px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  transition: all 0.5s ease-in-out;
}

.text2 {
  left: -40px;
  font-size: 12px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  position: absolute;
  transition: all 0.5s ease-in-out;
}

.bar2 {
  width: 2px;
  height: 150px;
  position: absolute;
  bottom: 32px;
  transition: all 0.5s ease-in-out;
  background: #713a43;
}

.bar3 {
  position: absolute;
  height: 2px;
  width: 50px;
  background: #ff6f86;
}


/* The slider itself */
.fl input[type=range] {
  /*transform-origin: center;*/

  width: 200px;
  height: 3px;
  /*margin: 10px;*/
  transform-origin: 100px 100px;
  transform: rotate(-90deg);
  /*transform: rotateZ(270deg);*/
  /*padding: 0 5px;*/
  /*-webkit-appearance: slider-vertical;  !* Override default CSS styles *!*/
  appearance: none;
  background: #3d4048; /* Grey background */
  border-radius: 50px;
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
}

/* The slider itself */
.speed input[type=range] {
  /*transform-origin: center;*/

  width: 400px;
  height: 3px;

  /*margin: 10px;*/

  /*transform: rotateZ(270deg);*/
  /*padding: 0 5px;*/
  /*-webkit-appearance: slider-vertical;  !* Override default CSS styles *!*/
  appearance: none;
  background: #6f7689; /* Grey background */
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
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: #f1a97e; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

/**{*/
/*  border: 1px solid blue;*/
/*}*/
#page {
  width: 100%;
  position: relative;
  height: 100%
}


.current-frame {
  position: absolute;
  /*margin: 20px;*/
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  width: calc(100% - 40px);
  /*top: 0%;*/
  height: max-content;
  /*position: relative;*/
  /*left: 1%;*/
  /*background: rgba(10,10,10,0.1);*/
  border: 1px solid rgba(169, 163, 163, 0.001);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: inherit;
}



.frame__icon-title img {
  position: relative;
  margin: 15px;
  height: 30px;
  width: 30px;
}


.frame__content {
  height: 100%;
  width: 100%;
  position: relative;

  /*border: #2f7fff 1px solid;*/
  justify-content: space-between;
}

canvas {
  background: rgba(1, 1, 1, 0.001);
  box-sizing: border-box;
  /*border : 1px blue solid;*/
  height: 100%;
  width: 100%;
}

.section {
  /*border: #5ee187 1px solid;*/
}

.section.fl {
  position: relative;
  width: 60px;
  height: auto;
}

.section.value {
  display: flex;
  position: relative;
  padding-left: 50px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /*border: #ff6ef3 1px solid;*/
  flex-direction: column;
  justify-content: space-around;
}

.stopbar-container {
  display: flex;
  width: 400px;
  top: -20px;
  justify-content: space-between;
  position: absolute;
  left: 0;
}

.information__value.speed-value {
  position: relative;

  width: 100px;
}

.min {
  height: 20px;
  width: 50px;
  border: 1px solid rgba(200, 200, 200, 0.3);
}

.max {
  height: 20px;
  width: 50px;
  border: 1px solid rgba(200, 200, 200, 0.3);
}

.information {
  width: 100%;
  margin-bottom: 50px;
  margin-top: 20px;
  height: max-content;
  flex-direction: column;
  /*background: rgba(0,0,0,0.1);*/
  display: flex;
}

.information__general {
  display: flex;
  /*justify-content: space-around;*/
  padding-top: 20px;
}

.information__general.speed {
  align-content: center;
}

.information-container {
  display: flex;
  position: relative;
}

.information__content {
  position: relative;
  margin-right: 15px;
  background: #35373f;
  border-radius: 4px;
  height: 35px;
  width: min-content;
  display: flex;
  align-content: center;
}

.information__content.active {
  border: #2f7fff 1px solid;
}

.information__content .information__value.selectedValue {
  opacity: 0;
}

.information__content.active .information__value.selectedValue {
  position: relative;
  opacity: 1;
  top: 0px;
}


.information__content.active .information__value {
  position: relative;
  top: -30px;
}

.information__label {
  position: relative;
  height: 100%;
  width: 200px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-top: 7px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  color: #D59D84;
  /*background: #d1836b;*/
}

.information__content:hover .information__label {
  color: #98b9ed;
}

.information__content:hover .information__value {
  color: #98b9ed;
  background: #2b2d33;
  border: 1px solid #98b9ed;
}

.information__content:hover img {
  filter: invert(82%) sepia(5%) saturate(5587%) hue-rotate(183deg) brightness(97%) contrast(91%);
}

.information__title {
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  font-size: 11px;
}

.information__content img {
  filter: invert(97%) sepia(97%) saturate(2849%) hue-rotate(297deg) brightness(92%) contrast(80%);
  height: 20px;
  width: 20px;
  margin: 8px;
}

.information__value__contener {
  width: 400px;
  position: absolute;
  display: flex;
  font-size: 10px;
  justify-content: space-between;
}

.information__value {
  cursor: pointer;
  height: 100%;
  padding-left: 10px;
  border-radius: 4px;
  padding-top: 7px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0);
  color: #212328;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  width: 110px;
  background: #D59D84;
}

.information__value:hover {
  width: 120px;
  background: #c79179;
}


.gauge {
  width: 200px;
  background: #4e535e;
}

.stopbar {
  width: 2px;
  background: #2b2d33;
}

.information__context {
  position: absolute;
  right: 0px;
  font-weight: bold;
  font-size: 12px;
  bottom: -20px;
}

.switch {
  width: 64px;
  position: absolute;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  left: 45%;
  bottom: -10%;
  height: 64px;
  border-radius: 50%;
  background: rgb(209, 144, 125);

}




.nav-current-section img {
  width: 30px;
  height: 30px;
  margin: 15px;
  filter: invert(90%) sepia(10%) saturate(5000%) hue-rotate(295deg) brightness(70%) contrast(80%);
}

.nav-bar .current-section-text {
  padding-top: 19px;
  padding-left: 10px;
  color: #bec2ca;
  font-size: 18px;
  font-weight: bold;

}



</style>
<template>
  <div class="frame-container">
    <div class="ctn-all-section">
      <div class="sct-left sct">
        <div class="blk-fl">

          <div class="cr-icon left">
            <img src="../../../../assets/icons/human-male-height-variant.svg">
          </div>
          <Picker v-on:FL="getFL" step="5" max-value="350" min-value="0" size="60" type="FL"></Picker>
          <!--          <div id="picker" class="picker">-->

          <!--            <div class="picker-stopbar top"></div>-->
          <!--            <div class="picker-stopbar bottom"></div>-->
          <!--            <ul class="figure-list" id="speed">-->
          <!--              <li class="figure" v-bind:key="flightLevel.value" v-for="flightLevel in flightLevelList">{{ flightLevel.value }}</li>-->
          <!--            </ul>-->

          <!--          </div>-->
          <span class="label-param">Niveau</span>
        </div>
        <div class="blk-atm">
          <div class="ctn-param temp">
            <div class="ctn-value">
              <span class="value-param">{{ Math.round((atmParams.temperature - 273.15) * 10) / 10 }}</span><span
                class="unit">°C</span>
            </div>
            <span class="label-param">Température</span>
          </div>
          <div class="ctn-param press">
            <div class="ctn-value">
              <span class="value-param">{{ Math.round((atmParams.pressure) / 100) / 1 }}</span><span
                class="unit">hPa</span>
            </div>
            <!--              <span  class="value-param"> hPa</span>-->
            <span class="label-param">Pression</span>
          </div>
        </div>
        <div class="blk-mass">
          <div class="cr-icon small black">
            <img src="../../../../assets/icons/airplane-edit.svg">
          </div>
          <div class="visual">
            <div class="cursor" v-bind:style="{ width:  50 + '%' }"></div>
          </div>
        </div>
      </div>
      <div class="sct-right sct">
        <div class="blk-speed">
          <div class="ctn-label">
            <span>Speed</span>
          </div>
          <div class="ctn-speed-display">
            <div class="ctn-units">
              <div class="unit-selector" @click="changeUnit">TAS</div>
              <div class="unit-selector" @click="changeUnit">IAS</div>
              <div class="unit-selector" @click="changeUnit">Mach</div>
            </div>
            <div class="ctn-value">
              <span>{{ speed }}</span>
              <span class="txt-unit">kts</span>
            </div>
            <div class="ctn-extreme-values">
              <div class="elmt-extreme">
                <img src="../../../../assets/icons/speed_black_24dp.svg">
                <div class="comment">Buffeting</div>
                <div class="txt">
                  <span class="txt-value">{{ Math.round(minSpeed) }}</span>
                  <span class="txt-unit">kts</span>
                </div>


              </div>
              <div class="elmt-extreme">
                <img src="../../../../assets/icons/speed_black_24dp.svg">
                <div class="comment">VMO</div>
                <div class="txt">
                  <span class="txt-value">{{ Math.round(maxSpeed) }}</span>
                  <span class="txt-unit">kts</span>
                </div>
              </div>
            </div>

          </div>

          <!--            <div class="information__value__contener">-->
          <!--              <div>{{ displayedSpeed }}</div>-->
          <!--              <div class="stopbar-container"-->
          <!--                   v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }">-->
          <!--                <div class="min">-->
          <!--                  <div class="stopbar"></div>-->
          <!--                  <span class="speed-value">{{ speedRange.minSpeed }}</span>-->
          <!--                </div>-->

          <!--                <div class="max">-->
          <!--                  <div class="stopbar"></div>-->
          <!--                  <span class="speed-value">{{ speedRange.maxSpeed }}</span>-->
          <!--                </div>-->
          <!--              </div>-->


          <!--            </div>-->

          <div class="ctn-slider">
            <div class="cr-icon small black">
              <img src="../../../../assets/icons/speed_black_24dp.svg">
            </div>
            <div class="ctn">
              <div class="slider-background"></div>
              <input type="range" :min="Math.round(minSpeed)" :max="Math.round(maxSpeed)"
                     v-bind:style="{ width : sliderWidthInPx+'%', marginLeft : sliderMarginLeftInPx+'%' }"
                     step="1" class="slider" v-model="speed">
              <div class="slider-background"></div>
            </div>
            <span class="label-param">Vitesse</span>
          </div>


        </div>


        <div class="blk-rates">
          <div class="ctn-label">
            <span>Rates</span>
          </div>
          <div class="slct-view">Select view</div>
          <div class="dsp-rates">
            <div class="rates">
              <div class="nav-type">
                <div class="elmt">climb</div>
                <div class="elmt">descent</div>
              </div>
              <div class="ctn">
                <div class="elmt-value">
                  <div class="cr-icon black">
                    <img src="../../../../assets/icons/chevron-down.svg">
                  </div>
                  <div class="txt">
                    <span class="txt-value">{{ climbPerf.rate }}</span>
                    <span class="txt-unit">ft/min</span>
                  </div>

                </div>
                <div class="elmt-info">
                  <div class="cr-icon none">
                    <img src="../../../../assets/icons/information-outline.svg">
                  </div>
                  <span class="txt">Montée à puissance max</span>
                </div>
                <div class="elmt-fixed">
                  <div class="elmt">
                    <div class="cr-icon medium none">
                      <img src="../../../../assets/icons/show_chart_black_24dp.svg">
                    </div>
                    <span class="txt">Fixer un taux</span>
                  </div>

                  <div class="cr-icon medium none">
                    <img src="../../../../assets/icons/chevron-right.svg">
                  </div>
                </div>

              </div>
            </div>
            <div class="graph"></div>
          </div>

        </div>
      </div>
    </div>
    <!--    <div id="perf" class="current-frame frame">-->
    <!--      &lt;!&ndash;          <div class = "switch"></div>&ndash;&gt;-->
    <!--      &lt;!&ndash;          <div class="frame__title">&ndash;&gt;-->
    <!--      &lt;!&ndash;            <div class="frame__icon-title">&ndash;&gt;-->
    <!--      &lt;!&ndash;              <img src="../assets/insert_chart_black_24dp.svg" alt=""/>&ndash;&gt;-->
    <!--      &lt;!&ndash;            </div>&ndash;&gt;-->
    <!--      &lt;!&ndash;            <span class="frame__text-title">Expected Performances</span>&ndash;&gt;-->
    <!--      &lt;!&ndash;          </div>&ndash;&gt;-->
    <!--      <div class="frame__content">-->
    <!--        <div class="section value">-->
    <!--          <div class="information">-->
    <!--            <span class="information__title">RATES</span>-->
    <!--            <div class="information__general rates">-->
    <!--              <div class="information__content" :class="{active: isSelected}" v-on:click="select()">-->
    <!--                <img src="../assets/vertical_align_top_black_24dp.svg"/>-->
    <!--                <span class="information__label">Rate of Climb</span>-->
    <!--                <div class="information__value">{{ climbPerf.rate }} ft/min</div>-->

    <!--                <div class="information__value selectedValue" v-on:wheel="changeSelection">{{ selectedClimbRate }}-->
    <!--                  ft/min-->
    <!--                </div>-->
    <!--                <div class="information__context" v-show="!checked">Vy : {{ climbPerf.speed }} kts FLmax :-->
    <!--                  {{ maxFLROCD }}-->
    <!--                </div>-->
    <!--              </div>-->
    <!--              <div class="information__content">-->
    <!--                <img src="../assets/vertical_align_bottom_black_24dp.svg"/>-->
    <!--                <span class="information__label">Rate of Descent</span>-->
    <!--                <div class="information__value">{{ descentPerf.rate }} ft/min</div>-->
    <!--                <div class="information__context">V : {{ descentPerf.speed }} kts</div>-->
    <!--              </div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="information">-->
    <!--            <span class="information__title">SPEEDS</span>-->
    <!--            <div class="information__general speed">-->

    <!--              <div class="information-container">-->
    <!--                <div class="information__content">-->
    <!--                  <img src="../assets/vertical_align_top_black_24dp.svg"/>-->
    <!--                  <span class="information__label">Speed range</span>-->


    <!--                </div>-->
    <!--                <div class="speed-slider">-->
    <!--                  <div class="information__value__contener">-->
    <!--                    <div>{{ displayedSpeed }}</div>-->
    <!--                    <div class="stopbar-container"-->
    <!--                         v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }">-->
    <!--                      <div class="min">-->
    <!--                        <div class="stopbar"></div>-->
    <!--                        <span class="speed-value">{{ speedRange.minSpeed }}</span>-->
    <!--                      </div>-->

    <!--                      <div class="max">-->
    <!--                        <div class="stopbar"></div>-->
    <!--                        <span class="speed-value">{{ speedRange.maxSpeed }}</span>-->
    <!--                      </div>-->
    <!--                    </div>-->


    <!--                  </div>-->
    <!--                  <div class="slider-background"></div>-->
    <!--                  <div class="speed slidecontainer">-->

    <!--                    <input type="range" :min="minSpeed" :max="maxSpeed"-->
    <!--                           v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }"-->
    <!--                           step="1" class="slider" v-model="speed">-->
    <!--                  </div>-->
    <!--                </div>-->
    <!--              </div>-->


    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="section fl">-->
    <!--          <div class="text1" v-bind:style="{ bottom: computedHeight }">{{ climbPerf.maxFL }}</div>-->
    <!--          <div class="bar1" v-bind:style="{ height: computedHeight }"></div>-->
    <!--          <div class="bar3"-->
    <!--               v-bind:style="{ bottom: computedHeightScale(computedHpTrans(this.checked ? this.law : '')) }"></div>-->
    <!--          <div class="text2" v-bind:style="{ bottom: computedBottom }">{{ climbPerf.absoluteMaxFL }}</div>-->
    <!--          <div class="bar2" v-bind:style="{ height: computedHeight2 , bottom : computedBottom }"></div>-->
    <!--          <div id="fl-value">FL{{ this.FLinput }}</div>-->
    <!--          <div class="fl slidecontainer">-->
    <!--            <input type="range" min="60" max="410" step="10" class="slider" orient="vertical" id="myRange"-->
    <!--                   v-model="FLinput">-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {HpTrans, knotToMs} from "@/BADA/Misc/func"
import {calcPerf, calcPerfbis, getAtmParams, getPlaneMach, maxFLAtROCD, speedRange} from "@/BADA/perfomanceFile"
import Picker from "@/components/picker"

// function toCell(cell, listElement, picker) {
//   listElement.style.transition = 'all 0.5s ease'
//   listElement.style.transform = 'translateY(' + (-cell * picker.offsetHeight / 3 + picker.offsetHeight / 3) + 'px)'
//   for (let n = 0; n < listElement.children.length; n++) {
//     listElement.children.item(n).style.transition = "opacity 0.2s ease"
//     let distance = Math.abs(listElement.children.item(cell).offsetTop - n * picker.offsetHeight / 3)
//     listElement.children.item(n).style.opacity = 1 - distance / (picker.offsetHeight / 1.5)
//   }
// }
//
// function getCellValue(cell, listElement) {
//   return parseInt(listElement.children.item(cell).innerText)
// }

export default {
  name: "StaticPerformances",
  components: {Picker},
  props: ["coefficient"],

  data() {
    return {
      // climbROCD: 0,
      selectedFL: 0,
      flightLevelList: [],
      FLinput: 0,
      selectedUnit: {
        element: null,
        unit: 'CAS'
      },
      minFL: 0,
      maxFL: 350,
      speed: 0,
      isSelected: false,
      selectedClimbRate: 0,
      currentProfilePoint: 0,
      checked: false,
      law: {speed: 280, mach: 0.75},
    }
  },

  mounted() {
    // for (let FL = this.maxFL; FL >= 0; FL -= 5) {
    //   this.flightLevelList.push({
    //     value: FL === 0 ? "GROUND" : FL,
    //   })
    // }
    // let ref = this
    // // eslint-disable-next-line no-unused-vars
    // let drag_time = 0
    // let figureLists = document.getElementsByClassName('figure-list')
    // let picker = document.getElementById('picker')
    // let currentCell
    // var elements = document.getElementsByClassName("classname");

    // var myFunction = function() {
    //   var attribute = this.getAttribute("data-myattribute");
    //   alert(attribute);
    // };


    // for (var i = 0; i < figureLists.length; i++) {
    //   // let ref = this
    //   let list = {
    //     id: i,
    //     type: figureLists[i].id,
    //     listElement: figureLists[i],
    //     currentCell: 0,
    //     lastCell: 0,
    //     touchStart: false,
    //     originY: 0,
    //     deltaY: 0,
    //     maxIndex: this.maxIndex(figureLists[i].id) - 1
    //   }
    //
    //   list.listElement.addEventListener('click', function (event) {
    //     for (let n = 0; n < list.listElement.children.length; n++) {
    //       if (list.listElement.children.item(n) === event.target) {
    //         list.currentCell = n
    //         toCell(list.currentCell, list.listElement, picker)
    //         ref.selectedFL = getCellValue(list.currentCell, list.listElement)
    //         break
    //       }
    //     }
    //     // ref.setSelectedValue(list.type, list.currentCell)
    //   }, false);
    //   // eslint-disable-next-line no-unused-vars
    //   let target
    //
    //
    //   list.listElement.addEventListener('touchstart', function (event) {
    //     target = event.target
    //     list.originY = event.touches[0].clientY
    //     list.touchStart = true
    //   })
    //
    //   list.listElement.addEventListener('mousewheel', function (event) {
    //     target = event.target
    //     list.currentCell += (event.deltaY>0) ? 1 : -1
    //     for (let n = 0; n < list.listElement.children.length; n++) {
    //       list.listElement.children.item(n).style.transition = "opacity 0s ease"
    //     }
    //     toCell(list.currentCell, list.listElement, picker)
    //     ref.selectedFL = getCellValue(list.currentCell, list.listElement)
    //   })
    //
    //   // console.log(target)
    //   // eslint-disable-next-line no-unused-vars
    //   let lastMove
    //   // eslint-disable-next-line no-unused-vars
    //   let movedBy
    //   // eslint-disable-next-line no-unused-vars
    //   let lastTime
    //   // eslint-disable-next-line no-unused-vars
    //   let speed
    //   // eslint-disable-next-line no-unused-vars
    //   let eTime
    //   let lastPos
    //   window.addEventListener('touchmove', function (event) {
    //     movedBy = lastPos - event.touches[0].clientY
    //     // eTime = lastTime - event.timeStamp
    //     // lastTime = event.timeStamp
    //     lastPos = event.touches[0].clientY
    //     list.deltaY = list.originY - event.touches[0].clientY
    //     if (list.touchStart) {
    //       list.listElement.style.transition = 'all 0s ease'
    //       list.listElement.style.transform = 'translateY(' + (-list.lastCell * 60 + 60 - list.deltaY) + 'px)'
    //       list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 60 + 60 - list.deltaY - 60) / 60), 0), list.maxIndex)
    //       ref.selectedFL = getCellValue(list.currentCell, list.listElement)
    //       for (let n = 0; n < list.listElement.children.length; n++) {
    //         list.listElement.children.item(n).style.transition = "opacity 0s ease"
    //         let distance = Math.abs(list.listElement.children.item(n).getBoundingClientRect().y - picker.getBoundingClientRect().y - list.listElement.children.item(n).getBoundingClientRect().height)
    //         list.listElement.children.item(n).style.opacity = 1 - distance / 100
    //       }
    //     }
    //   })
    //
    //   window.addEventListener('touchend', function () {
    //     if (list.touchStart) {
    //       list.touchStart = false
    //       if (list.deltaY != 0) {
    //         list.originY = 0
    //         list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 60 - list.deltaY) / 60), 0), list.maxIndex)
    //         list.lastCell = list.currentCell
    //         // list.listElement.style.transition = 'all ' + Math.abs(0.2) + 's ease-out'
    //         toCell(list.currentCell, list.listElement, picker)
    //         ref.selectedFL = getCellValue(list.currentCell, list.listElement)
    //       }
    //     }
    //   })


    // }
  },

  methods: {
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

    getFL: function (FL) {
      this.selectedFL = FL
    },

    maxIndex: function () {
      let index = 100
      // switch (type) {
      //   case "mach" :
      //     index = 10
      //     break
      //   case "speed" :
      //     index = 10
      //     break
      // }
      return index
    },

    select: function () {
      this.isSelected = !this.isSelected
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
      return speedRange(0, this.coefficient)
    },

    speedRange: function () {
      return speedRange(this.selectedFL, this.coefficient)
    },

    minSpeed: function () {
      return this.speedRange.minSpeed
    },

    maxSpeed: function () {
      return this.speedRange.maxSpeed
    },

    displayedSpeed: function () {
      if (this.FLinput > this.computedHpTrans(this.law)) {
        return Math.round(getPlaneMach(this.FLinput, this.speed) * 100) / 100
      } else return this.speed
    },

    atmParams: function () {
      return getAtmParams(this.selectedFL, this.coefficient, "", "")
    },

    sliderWidthInPx: function () {
      return 100 * (this.maxSpeed - this.minSpeed) / (this.speedRangeAtZero.maxSpeed - this.speedRangeAtZero.minSpeed)
    },

    sliderMarginLeftInPx: function () {
      return 100 * (this.minSpeed - this.speedRangeAtZero.minSpeed) / (this.speedRangeAtZero.maxSpeed - this.speedRangeAtZero.minSpeed)
    },

    climbPerf: function () {
      if (this.checked) {
        console.log("hi")
        return calcPerf(this.selectedFL, this.law, this.speed, this.coefficient)
      } else return calcPerf(this.selectedFL, this.law, this.speed, this.coefficient)
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


  }
}
</script>

<style scoped>

* {
  /*border:1px solid white*/
}

.frame-container {
  position: relative;
  padding-top: 104px;
  /*width: 100%;*/
  /*border: 1px blue solid;*/
  box-sizing: border-box;
  height: 100%;
  flex: 1 1 auto;
}


.ctn-all-section {
  display: flex;
  padding-left: 20px;
  padding-top: 50px;
  padding-right: 30px;
  padding-bottom: 20px;
  box-sizing: border-box;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}

.sct {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.sct-left {
  width: 200px;
  /*border:1px solid #d77a7a*/
}

.sct-right {
  /*width: 100%;*/
  margin-left: 20px;
  flex: 1 1 auto;
  /*border:1px solid #29ac7a*/
}

.blk-fl {
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  height: 220px;
  background: linear-gradient(45deg, rgb(111, 98, 123) -0%, rgb(192, 178, 236) 110%);
}

.blk-fl .label-param{
  font-weight: normal;
  color: rgba(207, 200, 220, 0.53);
}


.cr-icon {
  width: 36px;
  /*margin-left: 5p;*/
  height: 36px;
  border-radius: 30px;
  background: linear-gradient(45deg, rgb(55, 50, 60) -0%, rgb(43, 42, 47) 110%);
  box-shadow: rgba(11, 10, 10, 0.34) 0px 2px 10px 3px;
}

.cr-icon img {
  margin: 6px;
  filter: invert(82%) sepia(5%) saturate(1087%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.cr-icon.black {
  background: linear-gradient(45deg, rgb(168, 154, 183) -0%, rgb(163, 158, 179) 110%);
}

.cr-icon.black img {
   filter: invert(12%) sepia(5%) saturate(1087%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.cr-icon.small.black {
  width: 24px;
  /*margin-left: 5p;*/
  height: 24px;
  border-radius: 30px;
  background: linear-gradient(45deg, rgb(168, 154, 183) -0%, rgb(163, 158, 179) 110%);
}

.cr-icon.medium {
  width: 24px;
  /*margin-left: 3px;*/
  /*padding: 3px;*/
  height: 24px;
  border-radius: 30px;
  /*background: linear-gradient(45deg, rgb(168, 154, 183) -0%, rgb(163, 158, 179) 110%);*/
}

.cr-icon.medium img {
  margin: 3px;
  width: 18px;
  filter: invert(82%) sepia(5%) saturate(1087%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.cr-icon.none {
  /*width: 24px;*/
  /*!*margin-left: 5p;*!*/
  /*height: 24px;*/
  box-shadow: none;
  border-radius: 30px;
  background: none;
}

.cr-icon.none img {
  /*margin: 3px;*/
  filter: invert(72%) sepia(5%) saturate(187%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.cr-icon.small img {
  width: 12px;
  margin: 6px;
  filter: invert(12%) sepia(5%) saturate(1087%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.cr-icon.left img {
  margin-left: 12px;
  filter: invert(82%) sepia(5%) saturate(1087%) hue-rotate(223deg) brightness(97%) contrast(91%);
}

.picker {
  width: 90px;
  margin-right: 45px;
  overflow: hidden;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px;*/
  height: 180px;
  border-radius: 4px;
  /*border: 2px solid rgb(45, 46, 47);*/
  /*background: #2f353c;*/
}

.figure-list {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  /*flex-direction: column-reverse;*/
  display: flex;
  flex-direction: column;
  list-style: none;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  transform: translateY(60px);
}

.figure-list li {
  height: 60px;
  /*padding-left: 30px;*/
  /*padding-right: 10px;*/
  text-align: center;
  width: 90px;
  user-select: none;
  /*border: 1px #48485d solid;*/
  box-sizing: border-box;
  font-weight: bold;
  /*padding-left: 30px;*/
  padding-top: 22px;
  cursor: pointer;
  /*display: flex;*/
  /*flex-direction:;*/
  color: #1a1a1a;
}

.picker-stopbar {
  position: absolute;
  border-radius: 20px;
  width: 80px;
  left: 5px;
  top: 50px;
  height: 3px;
  background: #635874;
}

.picker-label {
  /*position: absolute;*/
  /*top:-10px*/
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 8px;
  padding-left: 2px;
  color: #737d86;
  padding-bottom: 2px;
}

.picker-stopbar.top {
  top: 60px;
}

.picker-stopbar.bottom {
  top: 120px;
}

.blk-speed {
  position: relative;
  border-radius: 12px;
  width: 100%;
  justify-content: space-evenly;
  height: 220px;
  display: flex;
  flex-direction: column;
  /*border: 1px solid rgba(40, 40, 40, 0.4);*/
  /*background: linear-gradient(45deg, rgb(111, 98, 123) -0%, rgb(192, 178, 236) 110%);*/
}

.blk-speed .label-param{
  color: rgba(74, 77, 79, 0.73);
}

.blk-speed .ctn-value span {
  font-size: 25px;
  font-weight: bold;

}

.blk-speed .ctn-value .txt-unit {
  color: #6f747f;
  font-size: 20px;
  margin-left: 5px;
  margin-right: 5px;
}

.ctn-label {
  font-size: 86px;
  /*font-family: "Roboto", sans-serif;*/

  font-weight: 100;
  letter-spacing: 5px;
  color: rgba(67, 64, 70, 0.06);
  position: absolute;
  top: -40px;
}

.ctn-units {
  height: 30px;
  display: flex;
  position: relative;
  box-sizing: border-box;
  align-items: center;
  justify-content: flex-end;
}

.ctn-speed-display {
  display: flex;
  height: 30px;
  justify-content: space-between;
}

.ctn-extreme-values {
  display: flex;
  justify-content: space-between;
}

.elmt-extreme {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-around;
  margin-left: 20px;
  width: 95px;
  font-size: 10px;
  font-weight: bold;
  height: 100%;
  border-radius: 8px;
  background: linear-gradient(45deg, rgb(47, 44, 47) -0%, rgb(57, 55, 62) 110%);
}

.elmt-extreme .comment {
  position: absolute;
  top: -14px;
  font-weight: normal;
  color: #9b87c3;
  right: 0;
  letter-spacing: 1px;
  text-align: right;
}

.elmt-extreme img {
  width: 18px;
  filter: invert(70%);
}

.elmt-extreme .txt-value {
  font-size: 12px;
  color: #bdbfc5;
  letter-spacing: 1px;
}

.elmt-extreme .txt-unit {
  color: #6f747f;
  margin-right: 5px;
}

.ctn-slider {
  width: 100%;
  position: relative;
  padding-right: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  /*flex-direction: column;*/
  height: 60px;
  border-radius: 12px;
  background: #191919;
}

.ctn-slider .ctn {
  position: relative;
  /*width: 100%;*/
  margin-left: 20px;
  flex: 1 1 auto;
  height: 10Px;
}


.unit-selector {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  background: #3e3543;
  border: 1px solid rgba(101, 143, 206, 0);
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #c3aad8;
  cursor: pointer;
}

.unit-selector.selected {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  border: 1px solid #bfb5ff;
  background: #222428;
  color: #d4b8ff;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;

  cursor: pointer;
}

.blk-rates {
  border-radius: 12px;
  position: relative;
  margin-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  /*border: 1px solid rgba(40, 40, 40, 0.4);*/
  /*background: linear-gradient(45deg, rgb(111, 98, 123) -0%, rgb(192, 178, 236) 110%);*/
}

.slct-view {
  /*border: 1px solid aliceblue;*/
  height: 30px;
  right: 0;

}

.dsp-rates {
  /*border: 1px solid aliceblue;*/
  flex: 1 1 auto;
  min-height: 300px;
  display: flex;
  z-index: 2;
  flex-direction: row;
  justify-content: space-between;
}

.rates {
  background: #191919;
  border-radius: 12px;
  max-width: 320px;
  min-width: 280px;
  box-shadow: rgba(9, 9, 9, 0.15) 0px 2px 5px 0px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  /*background: #2b2d33;*/
  flex: 1 1 auto;
  /*border: 1px solid aliceblue;*/
}

.rates .ctn {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
}

.rates .ctn .elmt-value {
  display: flex;
  flex: 0 1 auto;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
  color: #cbbeed;
}


.rates .ctn .elmt-value .txt-unit {
  color: #65606d;
  margin-left: 5px;
  font-size: 20px;
  font-weight: bold;
}

.rates .ctn .elmt-fixed {
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  box-shadow: rgba(4, 3, 3, 0.15) 0px 5px 10px 0px;
  color: #cac2d8;
  height: 46px;
  border-radius: 8px;
  background: #49464f;
  font-size: 16px;
  /*font-weight: bold;*/
}

.rates .ctn .elmt-info{
  display: flex;
  align-items: center;
}

.rates .ctn .elmt-fixed .elmt {
  display: flex;
  align-items: center;
}

.rates .ctn .elmt-fixed .elmt .txt {
  margin-left: 10px;
}

.rates .nav-type {
  width: 100%;
  display: flex;
  justify-content: space-around;
  height: 60px;
}


.graph {
  width: 250px;
  border-radius: 12px;
  box-shadow: rgba(4, 3, 3, 0.15) 0px 2px 5px 0px;
  background: #191919;
  height: 100%;
  flex: 1 1 auto;
  /*background: #2b2d33;*/
  /*border: 1px solid blue;*/
}

.blk-atm {
  display: flex;
  width: 100%;
}

.blk-mass {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 12px;
  background: linear-gradient(45deg, rgb(37, 36, 39) -0%, rgb(32, 31, 33) 110%);
}

.visual {
  height: 8px;
  width: 120px;
  border-radius: 8px;
  background: #443f4d;
  overflow: hidden;
}


.cursor {
  height: 100%;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(5, 5, 5, 0.15) 0px 10px 15px 2px;
  background: linear-gradient(45deg, rgb(171, 151, 174) -0%, rgb(207, 180, 230) 110%);
}

.ctn-param {
  border-radius: 12px;
  /*background: linear-gradient(45deg, rgb(33, 30, 33) -0%, rgb(56, 54, 62) 110%);*/
  background: linear-gradient(45deg, rgb(47, 44, 47) -0%, rgb(57, 55, 62) 110%);
  height: 100px;
  display: flex;
  justify-content: space-between;
  position: relative;
  flex-direction: column;
}

.ctn-param.selected {
  background: linear-gradient(45deg, rgb(47, 44, 47) -0%, rgb(193, 178, 241) 110%);
  box-shadow: rgba(5, 5, 5, 0.45) 0px 1px 10px 3px;
}

.ctn-param.selected .ctn-value span {
  color: #1b1b1c;
}

.ctn-param.selected span {
  color: #1b1b1c;
}


.ctn-value {
  align-items: flex-end;
  display: flex;
}

.ctn-value .unit {
  font-size: 16px;
  font-weight: bold;
  color: #7a808e;
}

.temp {
  width: 100px;
  flex: 0 0 auto;
}

.press {
  margin-left: 10px;
  width: 100%;
}

.value-param {
  font-size: 20px;
  color: #9da6ba;
  margin-left: 12px;
  margin-right: 2px;
  margin-top: 10px;
  font-weight: bold;
  letter-spacing: 1px;
}

.label-param {
  position: absolute;
  font-size: 10px;
  color: #6e6778;
  bottom: 0;
  right: 0;
  font-weight: bold;
  letter-spacing: 1px;
  margin: 8px;
}

.slider-background {
  background: #2d2a2f;
  top: 4px;
  position: absolute;
  /*margin-top: 15px;*/
  width: 100%;
  border-radius: 30px;
  height: 2px;
}

.speed-slider {
  height: 100%;
}


/* The slider itself */
.ctn-slider .slider {
  /*transform-origin: center;*/
  position: absolute;
  width: 100%;
  height: 2px;
  top: 2px;
  z-index: 99;

  /*margin: 10px;*/

  /*transform: rotateZ(270deg);*/
  /*padding: 0 5px;*/
  /*-webkit-appearance: slider-vertical;  !* Override default CSS styles *!*/
  appearance: none;
  background: #5f5371; /* Grey background */
  border-radius: 50px;
  outline: none; /* Remove outline */
  opacity: 1; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: all ease .2s;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  /*-webkit-appearance: slider-vertical; !* Override default look *!*/
  appearance: none;
  border: 3px solid #191919;
  outline: none;
  border-radius: 50px;
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: #d4aaec; /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: #c7aff6; /* Green background */
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
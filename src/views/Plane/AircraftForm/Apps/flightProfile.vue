<template>
  <div class="frame-container">
    <div class="law-edit-frame" v-show="lawEditing">
      <div class="overlay"></div>
      <transition name="pop-in-frame" appear>
      <law-edit v-show="lawEditing" @close="lawEditing = false" @getLaw="setCustomSpeedLaw" :speedRange="envelopeSpeeds"></law-edit>
      </transition>
    </div>

    <div class="params-frame" v-show="params">
      <div class="overlay"></div>
      <transition name="pop-in-frame" appear>
      <parameters v-show="params" @close="params = false" @setParams="setCustomParams" :mass="this.coefficient.aircraftStandardMass"
                  @getLaw="setCustomSpeedLaw"></parameters>

      </transition>
    </div>

    <div id="flightProfile" class="current-frame frame">
      <transition name="pop-in" appear>
        <div class="ctn1">
          <div class="information-box-container">
            <div id="infoboxFlightState" class="information-box information-box--active information-box--brown">
              <!--            <div class="box__border"></div>-->
              <div class="box__container">
                <div class="box__label">
                  <span class="flight-phase-label">{{ currentPhase }}</span>
                  <span class="flight-phase-comment">Montée à 250kts (IAS)</span>
                </div>
                <div class="flight-state-info">
                  <div class="box__flight-state-value-container">
                    <span class="flight-state-label">Vitesse</span>
                    <div class="flight-state-value" v-if="selectedUnit.unit === 'IAS'">
                      <span class="value-param">{{ currentProfilePoint.speed  }}</span>
                      <span class="unit">kts</span>
                    </div>
                    <div class="flight-state-value" v-else-if="selectedUnit.unit === 'TAS'">
                        <span class="value-param">{{ currentProfilePoint.speedTAS  }}</span>
                        <span class="unit">kts</span>

                    </div>
                    <div class="flight-state-value" v-else>{{
                        Math.round(currentProfilePoint.mach * 100) / 100
                      }}
                    </div>
                  </div>
                  <div class="unit-selector-container">
                    <div class="unit-selector" @click="changeUnit">TAS</div>
                    <div class="unit-selector" @click="changeUnit">IAS</div>
                    <div class="unit-selector" @click="changeUnit">Mach</div>
                  </div>
                </div>
                <div class="flight-state-info">
                  <div class="box__flight-state-value-container">
                    <span class="flight-state-label">Taux</span>
                    <div class="flight-state-value">
                      <span class="value-param">{{ currentProfilePoint.rate }} </span>
                      <span class="unit">ft/min</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div class="h-button-container">
              <h-button text="Épingler" icon="pin-outline.svg"></h-button>
              <h-button text="Éditer" icon="circle-edit-outline.svg"></h-button>
            </div>
            <div id="infoboxDist" class="information-box information-box-otherInfo">
              <div class="box__container">
                <div class="infoboxType">
                  <span>Distance parcourue</span>
                  <div class="infoboxTypeValue">
                    <span>{{ Math.round(currentProfilePoint.dist / 1852) }} Nm</span>
                  </div>
                  <div class="infoboxTypeValueBis">
                    <span>{{ Math.round(currentProfilePoint.dist / 1000) }} km</span>
                  </div>

                </div>
                <div class="infoboxType">
                  <span>Temps de vol</span>
                  <div class="infoboxTypeValue">
                    <span>{{
                        Math.floor(currentProfilePoint.index / 3600)
                      }}h{{ Math.floor(currentProfilePoint.index % 3600 / 60) }}min</span>
                  </div>
                </div>
              </div>
            </div>
            <div id="infoboxAtm" class="information-box information-box-otherInfo">
              <div class="ctn-param temp" @mouseover="isHovering = true" @mouseout="isHovering = false" :class="{selected: isHovering}">
                <div class="ctn-value">
                  <span class="value-param">{{ Math.round((currentProfilePoint.SAT - 273.15) * 10) / 10 }}</span><span
                    class="unit">°C</span>
                </div>
                <span class="label-param">Température</span>
              </div>
              <div class="ctn-param press">
                <div class="ctn-value">
                  <span class="value-param">{{ Math.round(currentProfilePoint.atmPressure / 100) }}</span>
                  <span class="unit">hPa</span>
                </div>
                <!--              <span  class="value-param"> hPa</span>-->
                <span class="label-param">Pression</span>
              </div>
            </div>

            <div class="information-box debug-box box__container">
              <ul class="list">
                <li class="element" v-bind:key="param.clef" v-for="param in this.list">
                  <InfoboxType :clef="param.clef" :value="param.value"></InfoboxType>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </transition>

      <transition name="appear-in" appear>
        <div class="frame__content">
          <canvas id="flightProfile-canvas"></canvas>
        </div>
      </transition>


      <transition name="pop-in" appear>
        <AppButton class="adv-params" @mousedown="createRipple" @click="params = true" text="Paramètres avancés"
                   icon="settings_black_24dp.svg"/>
      </transition>

    </div>
    <div class="footer">
      <transition name="pop-in" appear>
        <div class="law-edit">
          <div class="law-edit-box" @mousedown="createRipple" @click="lawEditing = true">
            <img src="../../../../assets/icons/edit_black_24dp.svg"/>
            <span>Loi de montée</span>

          </div>
          <!--          <span>{{ customSpeedLaw }}</span>-->
        </div>
      </transition>

      <transition name="pop-in" appear>
        <div class="add-point" style="display: none">
          <div class="add-box" @mousedown="createRipple">
            <img src="../../../../assets/icons/add_black_24dp.svg"/>
          </div>
          <div class="more-box">
            <div class="climb-box box" @mousedown="createRipple">
              <img src="../../../../assets/icons/vertical_align_top_black_24dp.svg"/>
            </div>
            <div class="level-box box" @mousedown="createRipple">
              <img src="../../../../assets/icons/add_black_24dp.svg"/>
            </div>
            <div class="descent-box box" @mousedown="createRipple">
              <img src="../../../../assets/icons/vertical_align_bottom_black_24dp.svg"/>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </div>
</template>

<script>
import HButton from "@/components/Nav/hButton"
import LawEdit from "@/components/lawEdit"
import AppButton from "@/components/Nav/appButton"
import {flightProfile} from "@/BADA/perfomanceFile"
// import {profileSampling} from "@/BADA/sampling"
import {createRipple} from "@/BADA/Misc/ripple"
import Parameters from "@/components/Parameters"
import InfoboxType from "@/components/InfoboxType"

export default {
  name: "flightProfile",
  components: {
    InfoboxType,
    HButton,
    LawEdit,
    AppButton,
    Parameters,
  },

  data() {
    return {
      selectedUnit: {
        element: null,
        unit: 'CAS'
      },
      law: "",
      lawEditing: false,
      params: false,
      selectedMass: "",
      currentProfilePoint: 0,
      currentPhase: "",
      customSpeedLaw: "",
      //law: {speed: 85, mach: 0.68},
    }
  },

  props: ["coefficient", "defaultSpeed"],

  beforeMount() {
    console.warn(this.defaultSpeed)
    let climbSequence = [
      {
        type: 'climb',
        speedInstruction: 'law',
        FLTarget: "max",
      },
    ]
    this.climbSequence = climbSequence
    let cruiseSequence = [
      {
        type: 'level',
        time: 5000,
      },
      {
        type: 'climb',
        FLTarget: "max",
      },
      {
        type: 'level',
        time: 5000,
      },
      {
        type: 'climb',
        FLTarget: "max",
      },
      {
        type: 'level',
        time: 3000,
      },]
    this.cruiseSequence = cruiseSequence
    let descentSequence = [
      {
        type: 'descent',
        FLTarget: 1,
      }
    ]
    this.descentSequence = descentSequence
  },

  computed: {
    flightProfile: function () {
      return flightProfile(this.climbSequence, this.cruiseSequence, this.descentSequence, this.law, this.coefficient, this.defaultSpeed, this.selectedMass)
    },

    totalDistance: function () {
      return this.flightProfile.full[this.flightProfile.full.length - 1]?.dist
    },

    envelopeSpeeds: function () {
      let lastCruisePoint = this.flightProfile?.cruise[this.flightProfile.cruise.length - 1]
      return {
        minSpeed: lastCruisePoint?.minSpeed,
        buffetingMach: lastCruisePoint?.buffetingMach,
        VMO: lastCruisePoint?.maxSpeed,
        maxMach: lastCruisePoint?.maxMach
      }
    }
  },

  mounted() {
    this.gphProfile = ""
    let frame = document.getElementsByClassName('frame__content')[0]
    // eslint-disable-next-line no-undef
    let canvas = new fabric.Canvas("flightProfile-canvas", {
          preserveObjectStacking: true,
          selection: false,
          renderOnAddRemove: false,
          uniformScaling: true,
          fireRightClick: true,
          fireMiddleClick: true,
        } //Prevent proportions conservation when resizing with the corner button})
    )
    this.canvas = canvas
    canvas.setHeight(frame.offsetHeight)
    canvas.setWidth(frame.offsetWidth)
    let ref = this


    // letthis.marginVertical = canvas.height / 4
    // letthis.marginHorizontalLeft = 300
    this.marginVertical = canvas.height / 3.5

    if(canvas.width < 500){
      this.marginHorizontalLeft = canvas.width/6
      this.marginHorizontalRight = canvas.width/6
    } else {
      this.marginHorizontalLeft = 300
      this.marginHorizontalRight = 50
    }

    // letthis.marginHorizontalRight = 50


    this.computeFlightProfile()

    // let points = []
    // let pointsMaxAlt = []
    //
    // this.profilePoints = points
    //
    // let climbPoints = []
    // let cruisePoints = []
    // let descentPoints = []
    // let lastAnchor
    // let fullList
    //
    // let profileObject = this.flightProfile
    //
    // let profile = profileObject.full
    // this.fullProfileObject = profileObject.full
    //
    // let DTotal = profile[profile.length - 1].dist
    //
    // // console.log(this.totalDistance)
    //
    // for (let point of profile) {
    //   let coords = this.toCanvas(point.dist, point.alt)
    //   let coordsMaxAlt = this.toCanvas(point.dist, point.maxAlt)
    //   points.push({
    //     profilePoint: point,
    //     x: coords.x,
    //     y: coords.y,
    //   })
    //   pointsMaxAlt.push({
    //     x: coordsMaxAlt.x,
    //     y: coordsMaxAlt.y,
    //   })
    // }
    // // console.log(pointsMaxAlt)
    // for (let point of profileObject.climb) {
    //   let coords = this.toCanvas(point.dist, point.alt)
    //   climbPoints.push({
    //     profilePoint: point,
    //     x: coords.x,
    //     y: coords.y,
    //   })
    // }
    // climbPoints.push({
    //   x: climbPoints[climbPoints.length - 1].x,
    //   y: canvas.height
    // })
    // lastAnchor = climbPoints[climbPoints.length - 1].x
    //
    // for (let point of profileObject.cruise) {
    //   let coords = this.toCanvas(point.dist, point.alt)
    //   cruisePoints.push({
    //     profilePoint: point,
    //     x: coords.x,
    //     y: coords.y,
    //   })
    // }
    //
    // fullList = climbPoints.concat(cruisePoints)
    // cruisePoints.push({
    //   x: fullList[fullList.length - 1].x,
    //   y: canvas.height
    // })
    // cruisePoints.push({
    //   x: lastAnchor,
    //   y: canvas.height
    // })
    //
    // lastAnchor = fullList[fullList.length - 1].x
    //
    // for (let point of profileObject.descent) {
    //   let coords = this.toCanvas(point.dist, point.alt)
    //   descentPoints.push({
    //     profilePoint: point,
    //     x: coords.x,
    //     y: coords.y,
    //   })
    // }
    // fullList = fullList.concat(descentPoints)
    //
    // descentPoints.push({
    //   x: fullList[fullList.length - 1].x,
    //   y: canvas.height
    // })
    // descentPoints.push({
    //   x: lastAnchor,
    //   y: canvas.height
    // })

    // let sampledPoints = profileSampling(fullList, 100)

    // eslint-disable-next-line no-undef
    let grad = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: canvas.width / 2,
        y1: 0,
        x2: canvas.width / 2,
        y2: 2 * canvas.height / 4,
      },
      colorStops: [
        {
          color: 'rgba(192,135,211,0.051)',
          offset: 0,
        },
        {
          color: 'rgba(80,50,39, 0.005)',
          offset: 1,
        },

      ]
    });

    // eslint-disable-next-line no-undef
    let grad2 = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: canvas.width / 2,
        y1: 0,
        x2: canvas.width / 2,
        y2: 1 * canvas.height / 4,
      },
      colorStops: [
        {
          color: 'rgba(224,126,244,0.09)',
          offset: 0,
        },
        {
          color: 'rgba(80,50,39, 0.0)',
          offset: 1,
        },

      ]
    });

    // eslint-disable-next-line no-undef
    this.gphProfile = new fabric.Polyline(this.points, {
      stroke: '#ca8ee3',
      strokeWidth: 0.5,
      // evented: false,
      // radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      objectCaching: false,
      fill: grad,
    })
    canvas.add(this.gphProfile)
    // eslint-disable-next-line no-undef
    this.gphFollowLine = new fabric.Polyline([{x: 0, y: 0}, {x: canvas.width, y: canvas.height}], {
      stroke: '#f5cbff',
      strokeWidth: 1,
      evented: false,
      fill: 'rgba(0,0,0,0)',
      hoverCursor: 'pointer',
      objectCaching :false,
      selectable: false,
    })
    canvas.add(this.gphFollowLine)

    // eslint-disable-next-line no-undef
    this.gphMaxAlt = new fabric.Polyline(this.pointsMaxAlt, {
      stroke: '#76d6ff',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      // evented: false,
      // radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      objectCaching: false,
      fill: "rgba(0,0,0,0)",
    })
    canvas.add(this.gphMaxAlt)

    // let pointMaxAltObject = this.gphMaxAlt
    // eslint-disable-next-line no-undef
    // let sampledObject = new fabric.Polyline(sampledPoints, {
    //   stroke: '#ff1f32',
    //   strokeWidth: 0.5,
    //   // evented: false,
    //   radius: 1,
    //   hoverCursor: 'pointer',
    //   selectable: false,
    //   fill: grad,
    // })
    //
    // sampledPoints.forEach((point)=>{
    //   // eslint-disable-next-line no-undef
    //   let this.gphOuterCursor = new fabric.Rect({
    //     stroke: '#ff0c0c',
    //     width:1,
    //     height:300,
    //     left: point.x-1,
    //     top: point.y-1,
    //     hoverCursor: 'pointer',
    //     selectable: false,
    //     fill: 'rgba(255,11,11,0.94)',
    //   })
    //   canvas.add(this.gphOuterCursor)
    // })
    // canvas.add(sampledObject)


    // eslint-disable-next-line no-undef
    this.gphGroundLabel = new fabric.Text('GROUND', {
      left: canvas.width - 50,
      fontSize: 10,
      top: canvas.height - this.marginVertical + 5,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      objectCaching: false,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgba(100,100,100,1)',
    })
    canvas.add(this.gphGroundLabel)
    // eslint-disable-next-line no-undef
    this.gphClimbLabel = new fabric.Text('Montée', {
      left: 0.5 * (canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - this.marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(113,68,59)',
    })
    canvas.add(this.gphClimbLabel)
    // eslint-disable-next-line no-undef
    this.gphClimbPhase = new fabric.Polygon(this.climbPoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      objectCaching : false,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad2,
    })
    canvas.add(this.gphClimbPhase)
    // eslint-disable-next-line no-undef
    this.gphCruiseLabel = new fabric.Text('Croisière', {
      left: 1.5 * (canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - this.marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(145,133,223)',
    })
    canvas.add(this.gphCruiseLabel)
    // eslint-disable-next-line no-undef
    this.gphCruisePhase = new fabric.Polygon(this.cruisePoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      objectCaching:false,
      fill: grad2,
    })
    canvas.add(this.gphCruisePhase)
    // eslint-disable-next-line no-undef
    this.gphDescentLabel = new fabric.Text('Descente', {
      left: 2.5 * (canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - this.marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(88,73,132)',
    })
    canvas.add(this.gphDescentLabel)
    // eslint-disable-next-line no-undef
    this.gphDescentPhase = new fabric.Polygon(this.descentPoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad2,
    })
    canvas.add(this.gphDescentPhase)

    this.phaseObjects = {
      climb: {
        label: this.gphClimbLabel,
        graph: this.gphClimbPhase,
      },
      cruise: {
        label: this.gphCruiseLabel,
        graph: this.gphCruisePhase,
      },
      descent: {
        label: this.gphDescentLabel,
        graph: this.gphDescentPhase,
      }
    }

    // eslint-disable-next-line no-undef
    this.gphVScale = new fabric.Rect({
      fill: 'rgba(100,100,100,1)',
      width: 0.5,
      objectCaching : false,
      height: canvas.height - 2 * this.marginVertical,
      left: canvas.width - 10,
      top: this.marginVertical,
    })
    canvas.add(this.gphVScale)
    // eslint-disable-next-line no-undef
    this.gphVCursor = new fabric.Rect({
      selectable: false,
      objectCaching:false,
      fill: 'rgb(213,200,255)',
      width: 10,
      height: 2,
      left: canvas.width - 10,
      top: this.marginVertical,
    })
    canvas.add(this.gphVCursor)
    // eslint-disable-next-line no-undef
    this.gphVCursorText = new fabric.Text('', {
      left: canvas.width - 40,
      fontSize: 14,
      top: canvas.height - this.marginVertical,
      fontFamily: 'Product Sans',
      fontWeight: "bold",
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(200,200,200)',
    })
    canvas.add(this.gphVCursorText)
    // eslint-disable-next-line no-undef
    this.gphOuterCursor = new fabric.Circle({
      stroke: 'rgba(237,183,222,0.13)',
      radius: 10,
      left: canvas.width / 2,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgba(129,79,255,0.1)',
    })
    canvas.add(this.gphOuterCursor)
    // eslint-disable-next-line no-undef
    this.gphInnerCursor = new fabric.Circle({
      radius: 4,
      hoverCursor: 'pointer',
      selectable: false,
      fill: '#fdfcff',
    })
    canvas.add(this.gphInnerCursor)
    // eslint-disable-next-line no-undef
    this.gphCursorLine = new fabric.Rect({
      fill: '#85eac3',
      width: 0.5,
      opacity: 0.2,
      objectCaching: false,
      hoverCursor: 'pointer',
      height: canvas.height,
      left: canvas.width - 10,
      top: this.marginVertical,
      selectable: false,
    })
    canvas.add(this.gphCursorLine)
    // eslint-disable-next-line no-undef
    this.hpTrans = new fabric.Rect({
      fill: 'rgba(205,189,246,0.98)',
      height: 2,
      width: 10,
      left: canvas.width - 10,
      selectable: false,
      top: -this.flightProfile.full[0].hpTrans / 100 * (canvas.height - 2 * this.marginVertical) / 410 - this.marginVertical + canvas.height,
    })
    canvas.add(this.hpTrans)
    // eslint-disable-next-line no-undef
    this.hpTransText = new fabric.Text('CONJONCTION', {
      fill: 'rgba(223,209,255,0.98)',
      opacity: 0.6,
      fontSize: 9,
      objectCaching: false,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      selectable: false,
      left: canvas.width - 80,
      top: -this.flightProfile.full[0].hpTrans / 100 * (canvas.height - 2 * this.marginVertical) / 410 - this.marginVertical + canvas.height + 2,
    })
    canvas.add(this.hpTransText)

    let conjonctionPoint = this.findConjonctionPoint()
    // eslint-disable-next-line no-unused-vars,no-undef
    // this.conjonctionBug = new fabric.Circle({
    //   selectable: false,
    //   fill: 'rgb(125,201,255)',
    //   radius: 2,
    //   left: conjonctionPoint.x - 2,
    //   top: conjonctionPoint.y - 2,
    // })
    // this.canvas.add(conjonctionBug)
    // eslint-disable-next-line no-undef
    this.conjonctionBug = new fabric.Circle({
      selectable: false,
      fill: 'rgb(125,201,255)',
      radius: 2,
      left: conjonctionPoint.x - 2,
      top: conjonctionPoint.y - 2,
    })
    canvas.add(this.conjonctionBug)

    let PRESSED = false
    let GRABBING = false
    let HOVER = false
    let group = [this.gphProfile, this.gphOuterCursor, this.gphInnerCursor]

    canvas.on("mouse:down", () => {
      // if (event.target === this.gphOuterCursor || event.target === this.gphInnerCursor) {
      GRABBING = true
      if (!PRESSED) {
        this.gphOuterCursor.animate({
          radius: 20,
          left: this.currentPoint.x - 20,
          top: this.currentPoint.y - 20,
          fill: "rgba(169,158,181,0.74)"

        }, {
          onChange: function () {
            canvas.requestRenderAll()
          },

          easing: // eslint-disable-next-line no-unused-vars,no-undef
              fabric.util.ease['easeOutQuad'],
          duration: 100
        });
        // this.gphOuterCursor.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
        this.gphOuterCursor.setCoords()
        canvas.requestRenderAll()
        PRESSED = true
      }

      // }
      canvas.requestRenderAll()
    })

    canvas.on("mouse:up", (event) => {
      if (GRABBING) {
        GRABBING = false
        if (PRESSED) {
          this.gphOuterCursor.animate({
            fill: "rgba(10,10,10,0.01)"

          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },

            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 100
          });
          // this.gphOuterCursor.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
          this.gphOuterCursor.setCoords()
          canvas.requestRenderAll()
        }

        if (!HOVER) {
          this.gphOuterCursor.animate({
            radius: 4,
            left: this.currentPoint.x - 4,
            top: this.currentPoint.y - 4

          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },

            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 500
          });
          // this.gphOuterCursor.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
          this.gphOuterCursor.setCoords()
          canvas.requestRenderAll()
        }
        PRESSED = false
      } else {
        if (event.target !== this.gphProfile && event.target !== this.gphInnerCursor && event.target !== this.gphOuterCursor) {
          HOVER = false
        }
        let pointer = canvas.getPointer(event.e);

        // eslint-disable-next-line no-unused-vars
        this.currentPoint = this.getPoint(pointer.x)
        this.currentProfilePoint = this.currentPoint.profilePoint
        this.list = []
        Object.keys(this.currentProfilePoint).forEach((key) => {
          ref.list.push({
            clef: key,
            value: this.currentProfilePoint[key]
          })

        })


        if (this.currentPhase != this.currentProfilePoint.phase) {
          this.currentPhase = this.currentProfilePoint.phase
          this.updatePhaseDisplay()
        }
        let pt = this.currentPoint
        let followPoints = this.profilePoints.slice(0, this.profilePoints.indexOf(pt))
        this.gphFollowLine.points = followPoints
        this.gphFollowLine.dirty = true
        this.gphFollowLine.setCoords()


        this.gphVCursor.set({top: pt.y - 2})
        this.gphVCursorText.set({top: pt.y - 9, text: Math.round(this.currentProfilePoint.alt).toString()})
        this.gphOuterCursor.set({left: pt.x - this.gphOuterCursor.radius, top: pt.y - this.gphOuterCursor.radius})
        this.gphOuterCursor.setCoords()
        this.gphInnerCursor.set({left: pt.x - 4, top: pt.y - 4})
        this.gphInnerCursor.setCoords()
        this.gphCursorLine.set({left: pt.x, top: pt.y})
        this.gphCursorLine.setCoords()
        canvas.requestRenderAll()
      }


    })

    canvas.on("mouse:move", (event) => {
      if (GRABBING) {
        let pointer = canvas.getPointer(event.e);
        this.currentPoint = this.getPoint(pointer.x)
        let pt = this.currentPoint
        this.currentProfilePoint = this.currentPoint.profilePoint


        this.list = []
        Object.keys(this.currentProfilePoint).forEach((key) => {
          ref.list.push({
            clef: key,
            value: this.currentProfilePoint[key]
          })

        })
        if (this.currentPhase != this.currentProfilePoint.phase) {
          this.currentPhase = this.currentProfilePoint.phase
          this.updatePhaseDisplay()
        }

        let followPoints = this.profilePoints.slice(0, this.profilePoints.indexOf(pt))
        this.gphFollowLine.points = followPoints
        this.gphFollowLine.dirty = true
        this.gphFollowLine.setCoords()


        this.gphVCursor.set({top: pt.y - 2})
        this.gphVCursorText.set({top: pt.y - 9, text: Math.round(this.currentProfilePoint.alt).toString()})
        this.gphOuterCursor.set({left: pt.x - this.gphOuterCursor.radius, top: pt.y - this.gphOuterCursor.radius})
        this.gphOuterCursor.setCoords()
        this.gphInnerCursor.set({left: pt.x - 4, top: pt.y - 4})
        this.gphInnerCursor.setCoords()
        this.gphCursorLine.set({left: pt.x, top: pt.y})
        this.gphCursorLine.setCoords()
        canvas.requestRenderAll()
      }

    })

    canvas.on("mouse:over", (event) => {
      if (event.target === this.gphProfile || event.target === this.gphInnerCursor || event.target === this.gphOuterCursor) {
        if (HOVER) {
          return
        }
        HOVER = true
        if (GRABBING) {
          return
        }
        this.gphOuterCursor.animate({
          radius: 20,
          left: this.currentPoint.x - 20,
          top: this.currentPoint.y - 20
        }, {
          onChange: function () {
            canvas.requestRenderAll()
          },
          easing: // eslint-disable-next-line no-unused-vars,no-undef
              fabric.util.ease['easeOutQuad'],
          duration: 200
        });
        // this.gphOuterCursor.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
        this.gphOuterCursor.setCoords()
        canvas.requestRenderAll()
      }
    })

    canvas.on("mouse:out", (event) => {
      // console.log(event.nextTarget)
      if ((event.target === this.gphProfile || event.target === this.gphInnerCursor || event.target === this.gphOuterCursor) && (!group.includes(event.nextTarget))) {
        if (HOVER && !GRABBING) {
          // console.log("MOUSE OUT")
          this.gphOuterCursor.animate({
            left: this.currentPoint.x - 4,
            top: this.currentPoint.y - 4,
            radius: 4,
          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },
            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 200
          });
          this.gphOuterCursor.setCoords()
          canvas.requestRenderAll()
        }
        HOVER = false
        if (GRABBING) {
          return
        }

      }
    })
    this.resizeTimeOut = ""
    window.addEventListener('resize', function () {
      clearTimeout(ref.resizeTimeOut)
      ref.resizeTimeOut = setTimeout(()=>{
        canvas.setWidth(frame.offsetWidth);
        canvas.setHeight(frame.offsetHeight);
        canvas.calcOffset()
        this.marginVertical = canvas.height / 3.5

        if(canvas.width < 500){
          this.marginHorizontalLeft = canvas.width/6
          this.marginHorizontalRight = canvas.width/6
        } else {
          this.marginHorizontalLeft = 300
          this.marginHorizontalRight = 50
        }

        let points = []
        ref.flightProfile.full.forEach((point) => {
          let coords = ref.toCanvas(point.dist, point.alt)
          points.push({
            profilePoint: point,
            x: coords.x,
            y: coords.y,
          })
        })
        ref.gphProfile.set({points: points})
        ref.gphProfile.setCoords()
        ref.computeFlightProfile()
        ref.updateGphObjects()
        ref.updateStaticObjects()
        canvas.requestRenderAll()
      },500)

      // canvas.calcOffset();
    });

    canvas.requestRenderAll()
    this.currentPoint = this.getPoint(0)
    let pt = this.currentPoint
    this.currentProfilePoint = this.currentPoint.profilePoint
    if (this.currentPhase != this.currentProfilePoint.phase) {
      this.currentPhase = this.currentProfilePoint.phase
      this.updatePhaseDisplay()
    }

    let followPoints = this.profilePoints.slice(0, this.profilePoints.indexOf(pt))
    this.gphFollowLine.points = followPoints
    this.gphFollowLine.dirty = true
    this.gphFollowLine.setCoords()


    this.gphVCursor.set({top: pt.y - 2})
    this.gphVCursorText.set({top: pt.y - 9, text: Math.round(this.currentProfilePoint.alt).toString()})
    this.gphOuterCursor.set({left: pt.x - this.gphOuterCursor.radius, top: pt.y - this.gphOuterCursor.radius})
    this.gphOuterCursor.setCoords()
    this.gphInnerCursor.set({left: pt.x - 4, top: pt.y - 4})
    this.gphInnerCursor.setCoords()
    this.gphCursorLine.set({left: pt.x, top: pt.y})
    this.gphCursorLine.setCoords()
  },

  created() {

  },

  methods: {
    toCanvas: function (dist, alt) {
      let canvas = this.canvas
      return {
        x: this.marginHorizontalLeft + (canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / this.totalDistance * dist,
        y: -alt * (canvas.height - 2 * this.marginVertical) / 410 - this.marginVertical + canvas.height
      }
    },

    setCustomParams: function (parameters) {
      this.selectedMass = parseFloat(parameters.mass)
      this.selectedISAdev = parameters.ISA
      this.selectedQNH = parameters.QNH
      this.computeFlightProfile()
      this.updateGphObjects()
      this.canvas.requestRenderAll()
    },

    setCustomSpeedLaw: function (lawParameters) {
      this.customSpeedLaw = lawParameters
      this.law = this.customSpeedLaw

      this.hpTrans.set({
        top: -this.customSpeedLaw.FL * (this.canvas.height - 2 * this.marginVertical) / 410 - this.marginVertical + this.canvas.height
      })
      this.hpTrans.setCoords()

      this.hpTransText.set({
        top: -this.customSpeedLaw.FL * (this.canvas.height - 2 * this.marginVertical) / 410 - this.marginVertical + this.canvas.height
      })
      this.hpTransText.setCoords()
      this.computeFlightProfile()
      this.updateGphObjects()
      this.canvas.requestRenderAll()
    },

    computeFlightProfile: function () {
      let canvas = this.canvas
      this.points = []
      this.pointsMaxAlt = []
      this.profilePoints = this.points

      this.climbPoints = []
      this.cruisePoints = []
      this.descentPoints = []
      let lastAnchor
      let fullList

      let profileObject = this.flightProfile
      let profile = profileObject.full
      this.profileObject = profileObject.full

      for (let point of profile) {
          let coords = this.toCanvas(point.dist, point.alt)
          let coordsMaxAlt = this.toCanvas(point.dist, point.maxAlt)
          this.points.push({
            profilePoint: point,
            x: coords.x,
            y: coords.y,
          })
          this.pointsMaxAlt.push({
            x: coordsMaxAlt.x,
            y: coordsMaxAlt.y,
          })
        }
      for (let point of profileObject.climb) {
        let coords = this.toCanvas(point.dist, point.alt)
        this.climbPoints.push({
          profilePoint: point,
          x: coords.x,
          y: coords.y,
        })
      }
      this.climbPoints.push({
        x: this.climbPoints[this.climbPoints.length - 1].x,
        y: canvas.height
      })
      lastAnchor = this.climbPoints[this.climbPoints.length - 1].x

      for (let point of profileObject.cruise) {
        let coords = this.toCanvas(point.dist, point.alt)
        this.cruisePoints.push({
          profilePoint: point,
          x: coords.x,
          y: coords.y,
        })
      }

      fullList = this.climbPoints.concat(this.cruisePoints)
      this.cruisePoints.push({
        x: fullList[fullList.length - 1].x,
        y: canvas.height
      })
      this.cruisePoints.push({
        x: lastAnchor,
        y: canvas.height
      })

      lastAnchor = fullList[fullList.length - 1].x

      for (let point of profileObject.descent) {
        let coords = this.toCanvas(point.dist, point.alt)
        this.descentPoints.push({
          profilePoint: point,
          x: coords.x,
          y: coords.y,
        })
      }
      fullList = fullList.concat(this.descentPoints)

      this.descentPoints.push({
        x: fullList[fullList.length - 1].x,
        y: canvas.height
      })
      this.descentPoints.push({
        x: lastAnchor,
        y: canvas.height
      })

      // console.log(points)

    },

    updateGphObjects : function (){
      this.profilePoints = this.points
      this.gphProfile.set({points: this.points})
      this.gphProfile.setCoords()
      this.gphClimbPhase.set({points: this.climbPoints})
      this.gphClimbPhase.setCoords()
      this.gphMaxAlt.set({points: this.pointsMaxAlt})
      this.gphMaxAlt.setCoords()
      this.gphCruisePhase.set({points: this.cruisePoints})
      this.gphCruisePhase.setCoords()
      this.gphDescentPhase.set({points: this.descentPoints})
      this.gphDescentPhase.setCoords()
      this.gphFollowLine.set({points: this.points})
      this.gphFollowLine.setCoords()
    },

    updateStaticObjects : function (){
      this.gphVScale.set({left:this.canvas.width - 10 , height: this.canvas.height - 2 * this.marginVertical, top: this.marginVertical,})
      this.gphVScale.setCoords()
      this.gphVCursorText.set({left:this.canvas.width - 40})
      this.gphVCursorText.setCoords()
      this.gphVCursor.set({left:this.canvas.width - 10})
      this.gphVCursor.setCoords()
      this.hpTransText.set({left:this.canvas.width - 80})
      this.hpTransText.setCoords()
      this.hpTrans.set({left:this.canvas.width - 10})
      this.hpTrans.setCoords()
      this.gphGroundLabel.set({left : this.canvas.width - 50})
      this.gphGroundLabel.setCoords()
      this.gphDescentLabel.set({left : 2.5 * (this.canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,})
      this.gphCruiseLabel.set({left : 1.5 * (this.canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,})
      this.gphClimbLabel.set({left : 0.5 * (this.canvas.width - this.marginHorizontalRight - this.marginHorizontalLeft) / 3 + this.marginHorizontalLeft - 20,})
    },

    findConjonctionPoint: function () {
      let conjonctionPoint
      let minDistanceToConjonctionAltitude = Infinity
      for (let point of this.profilePoints) {
        if (!point.profilePoint) {
          continue
        }
        let profilePoint = point.profilePoint
        let vDist = Math.abs(profilePoint.hpTrans - profilePoint.alt * 100)
        if (vDist < minDistanceToConjonctionAltitude) {
          minDistanceToConjonctionAltitude = vDist
          conjonctionPoint = point
        }
      }
      return conjonctionPoint
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


    createRipple(event) {
      createRipple(event)
    },

    updatePhaseDisplay: function () {
      let canvas = this.canvas
      Object.keys(this.phaseObjects).forEach((key) => {
        if (key === this.currentPhase) {
          this.phaseObjects[key].label.animate({
            opacity: 1,
            fill: 'rgb(180,171,218)',
            top: canvas.height - this.marginVertical - 10,
          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },
            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 500
          })
          this.phaseObjects[key].graph.animate({
            opacity: 1,
          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },
            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 500
          });
          this.phaseObjects[key].label.setCoords()
        } else {
          this.phaseObjects[key].graph.animate({
            opacity: 0,
          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },
            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 500
          });
          this.phaseObjects[key].label.animate({
            opacity: 0.3,
            fill: 'rgb(69,59,113)',
            top: canvas.height - this.marginVertical + 10,
          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },
            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 500
          })
        }
      })
    },

    getPoint: function (x) {
      let minVert = Infinity
      let pt
      for (let point of this.profilePoints) {
        if (Math.abs(x - point.x) < minVert) {
          minVert = Math.abs(x - point.x)
          pt = point

        }
      }
      return pt
    },
  }

}
</script>

<style scoped>


.pop-in-enter-active,
.pop-in-leave-active {
  transition: all 0.6s cubic-bezier(.52, .02, .44, 1.18) .7s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transition: all 0.6s ease-in-out 1s;
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}

.pop-in-frame-enter-active,
.pop-in-frame-leave-active {
  transition: all 0.3s cubic-bezier(.52, .02, .44, 1.18) .0s;
}

.pop-in-frame-enter-from,
.pop-in-frame-leave-to {
  transition: all 0.3s ease-in-out 0s;
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.appear-in-enter-active,
.appear-in-leave-active {
  transition: all 0.6s cubic-bezier(.72, .02, .44, 1.38) 1s;
}

.appear-in-enter-from,
.appear-in-leave-to {
  transition: all 0.6s ease-in-out 1s;
  /*transform: scale(0.8) translateY(20px);*/
  opacity: 0;
}

.add-point {
  right: 0;
  bottom: 0;
  /*position: absolute;*/
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

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

.current-frame {
  position: absolute;
  /*margin: 20px;*/
  /*box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;*/
  width: calc(100% - 40px);
  /*top: 0%;*/
  height: max-content;
  /*position: relative;*/
  /*left: 1%;*/
  /*background: rgba(10,10,10,0.1);*/
  /*border: 1px solid rgba(169, 163, 163, 0.001);*/
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: inherit;
}

.add-box {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  background: #b1a1dd;
  box-shadow: rgba(11, 10, 10, 0.44) 0px 8px 8px 1px;
  cursor: pointer;

}

.add-box:hover img {
  transform: rotate(180deg);
}

.add-point:hover .box {
  transform: scale(1);
}

.add-box img {
  margin: 8px;
  width: 32px;
  transition: transform cubic-bezier(.72, .02, .44, 1.38) 0.7s;
  filter: invert(10%);
  height: 32px;
}

.more-box {
  margin-bottom: 10px;
}

.box {
  width: 36px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 10px;
  height: 36px;
  border-radius: 30px;
  transform: scale(0);
  transition: transform cubic-bezier(.72, .02, .44, 1.38) 0.7s;
  transform-origin: center;
  background: #2e292e;
  box-shadow: rgba(16, 16, 16, 0.44) 0px 8px 8px 1px;
}

.box img {
  /*filter: invert(50%);*/
  width: 24px;
  margin: 6px;
  filter: invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(92%) contrast(88%);
  height: 24px;
}


.ctn1 {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: min-content;
}

.information-box-container {
  position: relative;
  padding: 20px;
  z-index: 999;
  box-sizing: border-box;
  width: 250px;
  display: flex;
  /*min-height: 0;*/
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
  justify-content: flex-start;
  /*height: calc(100% - 160px)*/
}

.unit-selector-container {
  width: 100%;
  margin-top: 0px;
  height: 20px;
  display: flex;
  position: relative;
  top: -4px;
  padding-right: 10px;
  box-sizing: border-box;
  justify-content: flex-end;
}

.unit-selector {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  background: #524a56;
  border: 1px solid rgba(101, 143, 206, 0);
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #b6a0d0;
  cursor: pointer;
}

.unit-selector.selected {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  border: 1px solid #e1dfff;
  background: #222428;
  color: #cec9fb;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  cursor: pointer;
}


.box__container.debug-box {
  display: none;
}

.unit-selector:hover {
  background: #282c31;
}

.flight-state-info {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
}

.information-box {
  position: relative;
  margin-bottom: 10px;
  width: 210px;
  /*min-height: 100px;*/
  height: auto;
}

#infoboxAtm {
  justify-content: space-between;
  /*display: none;*/
}

#infoboxDist {
  /*display: none ;*/
}

.infoboxType {

  /*TEMPORAIRE*/

  margin-top: 15px;
  padding-left: 15px;
  display: flex;
  height: 55px;
  flex-direction: column;

  font-family: "Product Sans", sans-serif;
  /*font-weight: bold;*/
  /*text-transform: uppercase;*/
  letter-spacing: 1px;
  color: #787082;
  font-size: 12px;
}

.infoboxTypeValue {
  margin-top: 5px;
  display: flex;
  text-align: right;
  text-transform: none;
  padding-right: 15px;
  letter-spacing: 1px;
  flex-direction: column;
  font-family: "Product Sans", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #be97f8;
}

.infoboxTypeValue span {
  color: #aba7bc;
}


.infoboxTypeValueBis {
  margin-top: 5px;
  display: flex;
  text-align: right;
  padding-right: 17px;
  flex-direction: column;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  font-size: 11px;
  color: #6f747f;
}

.information-box-otherInfo {

  border-radius: 9px;
  display: flex
}

.information-box.information-box--active .box__container {
  box-shadow: rgba(5, 5, 5, 0.59) 0px 2px 10px 1px;
  width: calc(100% - 10px);
  transform: translateY(-5px);
  margin: 5px;
}

.information-box.information-box--active .box__border {
  opacity: 1;
}

.information-box.information-box--brown .box__container {
  background: linear-gradient(45deg, rgb(146, 134, 158) -0%, rgb(171, 162, 202) 110%);
}

.information-box.information-box--blue.information-box--active .box__container {
  background: linear-gradient(45deg, rgb(50, 68, 97) -0%, rgb(139, 170, 216) 110%);
}

.information-box.information-box--blue .flight-state-value {
  background: rgb(86, 124, 176);
}

.information-box.information-box--brown .flight-state-value {
  background: rgba(166, 98, 77, 1);
}

.information-box.information-box--active .flight-state-value {
  background: rgba(38, 42, 46, 1);
}

.information-box.information-box--brown.information-box--active .color-text {
  color: rgb(229, 190, 237);
}

.information-box.information-box--blue.information-box--active .color-text {
  color: rgb(86, 124, 176);
}

.information-box.information-box--blue.information-box--active .flight-state-value {
  color: rgb(86, 124, 176);
}

.information-box.information-box--brown.information-box--active .flight-state-value {
  color: rgb(213, 189, 239);
}

.box__container {
  overflow: hidden;
}


.h-button-container {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  margin-bottom: 10px;
}

.h-button-container .container {
  margin-right: 10px;
}


.law-edit-circle {
  position: absolute;
  background: #2b2d33;
  right: 10px;
  box-shadow: rgba(5, 5, 5, 0.5) 0px 1px 2px 0px;
  bottom: 35px;
  height: 40px;
  width: 40px;
  border-radius: 30px;
  cursor: pointer;
}

.law-edit-circle:hover {
  background: #202227;
}


.law-edit-circle input {
  height: 100%;
  z-index: 99;
  position: absolute;
  cursor: pointer;
  width: 100%;
  opacity: 0;
}

.law-edit .law-edit-circle img.check {
  margin: 8px;
  filter: invert(81%) sepia(20%) saturate(1041%) hue-rotate(84deg) brightness(92%) contrast(88%);
}


.law-edit .law-edit-circle img.nocheck {
  margin: 8px;
  filter: invert(23%) sepia(69%) saturate(2645%) hue-rotate(327deg) brightness(92%) contrast(83%);
}

.lawEdit-container {
  width: 300px;
  height: 300px;
  left: calc(50% - 150px);
  top: calc(50% - 150px);
  z-index: 99999;
  background: #24262a;
  box-shadow: #1a1a1a 0 0 20px 0px;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
  position: absolute;
  border-radius: 14px;
}

.law-edit-frame {
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh
}

.overlay {
  width: 100vw;
  position: fixed;
  z-index:999;
  left: 0;
  top: 0;
  backdrop-filter: blur(2px);
  height: 100vh;
  background: rgba(26, 24, 24, 0.52);
}


.params-frame {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 9999;
  position: fixed;
  height: 100vh;
}

.params-overlay {
  width: 100%;
  backdrop-filter: blur(5px);
  height: 100%;
}

.validate img {
  margin: 8px;
}

.box__container {
  width: 100%;
  display: flex;
  background: rgba(52, 49, 61, 0.64);
  flex-direction: column;
  backdrop-filter: blur(1px);
  border-radius: 14px;
  margin: 0px;
  position: relative;
  top: 0;
  left: 0;
  box-shadow: rgba(5, 5, 5, 0.03) 0px 1px 10px 3px;
  height: max-content;
  transform: translateY(0px);
  justify-content: space-between;
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

.flight-state-value .value-param{
  font-size: 14px;
  margin: 0;
  color: #c6b5de;
}
.flight-state-value .unit{
  font-size: 10px;
  margin-left: 3px;
  color: #9486a7;
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


.debug-box {
  height: 300%;
  display: flex;
  width: 250px;
  overflow-y: scroll;
}

.box__border {
  width: 100%;
  position: absolute;
  top: 5px;
  height: calc(100% - 10px);
  border-radius: 14px;
  filter: ;
  opacity: 0;
  border: #282828 1px solid;
}

.box__label {
  right: 0px;
  text-align: right;
  margin-bottom: 50px;
  padding-right: 15px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  /*position: absolute;*/
  color: rgba(38, 42, 46, 1);
  font-weight: bold;
}

.footer {
  z-index: 999;
  pointer-events: none;
  align-items: flex-end;
  position: absolute;
  width: auto;
  bottom: 0;
  right: 0;
  height: auto;
  display: flex;
}

.adv-params {
  top: 0;
  position: absolute;
  margin-right: 20px;
  margin-top: 10px;
  right: 0;
}


.law-edit {
  pointer-events: auto;
  /*position: absolute;*/
  transform-origin: center;
  width: auto;
  right: 0;
  bottom: 0;
  margin-right: 20px;
  margin-bottom: 20px;
  /*margin-top: 40px;*/
}

.law-edit-box {
  /*margin-right: 20px;*/
  /*margin-top: 40px;*/
  position: relative;
  overflow: hidden;
  width: 200px;
  height: 48px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  background: #3c333f;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 5px 10px 1px;
}

.law-edit-box:hover {
  background: #5d4f6a;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 10px 1px;
}

.law-edit-box span {
  color: #b5a6e1;

  padding-right: 20px;
  padding-top: 14px;
}

.law-edit img {
  margin: 13px;
  filter: invert(87%) sepia(30%) saturate(5049%) hue-rotate(205deg) brightness(80%) contrast(80%);
  height: 24px;
}


#flightProfile {
  /*display: none;*/
  height: calc(100% - 104px);
  width: 100%;
}


.frame__title {
  position: relative;
  /*border: #2f7fff 1px solid;*/
  height: 60px;
  display: flex;
}

.frame__icon-title {
  position: relative;
  height: 100%;
  width: 60px;
  /*display: inline;*/
}

.frame__text-title {
  /*display: inline;*/
  padding-top: 20px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
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

.flight-state-label {
  padding-top: 6px;

  color: rgb(23, 22, 25);
  font-weight: bold;
  font-size: 14px;
}

.box__label .flight-phase-label {
  text-transform: capitalize;
}

.box__label .flight-phase-comment {
  font-size: 10px;
}

.box__flight-state-value-container {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  justify-content: space-between;
}

.flight-state-value {
  background: rgba(38, 42, 46, 1);
  color: rgb(196, 162, 218);
  font-weight: bold;
  font-size: 12px;
  border-radius: 9px;
  height: 34px;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 2px 0px;
  padding-left: 14px;
  padding-right: 14px;
  box-sizing: border-box;
  padding-top: 9px;
}

canvas {
  background: rgba(1, 1, 1, 0.001);
  box-sizing: border-box;
  /*border : 1px blue solid;*/
  height: 100%;
  width: 100%;
}
</style>
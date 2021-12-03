<template>
  <div class="frame-container">
    <div class="law-edit-frame" v-show="lawEditing">
      <div class="law-edit-overlay"></div>
      <law-edit @close="lawEditing = false" @getLaw="setCustomSpeedLaw"></law-edit>
    </div>
    <div class="params-frame" v-show="params">
      <div class="law-edit-overlay"></div>
      <parameters @close="params = false" @setParams="setCustomParams" :mass="this.coefficient.aircraftStandardMass" @getLaw="setCustomSpeedLaw"></parameters>
    </div>
    <div id="flightProfile" class="current-frame frame">
      <transition name="pop-in" appear>
        <div class="information-box-container">
          <div id="infoboxFlightState"   class="information-box information-box--active information-box--brown">
            <div class="box__border"></div>
            <div class="box__container">
              <div class="box__label">
                <span class="flight-phase-label">{{ currentPhase }}</span>
                <span class="flight-phase-comment">Montée à 250kts (IAS)</span>
              </div>
              <div class="flight-state-info">
                <div class="box__flight-state-value-container">
                  <span class="flight-state-label">Speed</span>
                  <div class="flight-state-value" v-if="selectedUnit.unit === 'IAS'">{{ currentProfilePoint.speed }}
                    kts
                  </div>
                  <div class="flight-state-value" v-else-if="selectedUnit.unit === 'TAS'">
                    {{ currentProfilePoint.speedTAS }} kts
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
                  <span class="flight-state-label">Rate</span>
                  <div class="flight-state-value">{{ currentProfilePoint.rate }} ft/min</div>
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
            <div class="box__container">
              <div class="infoboxType">
                <!--                  <img src="../assets/thermometer.svg"/>-->
                <span>Température</span>
                <div class="infoboxTypeValue">
                  <span>{{ Math.round((currentProfilePoint.SAT - 273.15) * 10) / 10 }} °C</span>
                </div>

              </div>
              <div class="infoboxType">
                <!--                  <img src="../assets/gauge.svg"/>-->
                <span>Pression</span>
                <div class="infoboxTypeValue">
                  <span>{{ Math.round(currentProfilePoint.atmPressure / 100) }} hPa</span>
                </div>
              </div>
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
        <AppButton class="adv-params"  @mousedown="createRipple" @click="params = true" text="Paramètres avancés" icon="settings_black_24dp.svg"/>
      </transition>

    </div>
    <div class="footer">
      <transition name="pop-in" appear>
        <div class="law-edit">
          <div class="law-edit-box" @mousedown="createRipple" @click="lawEditing = true">
            <img src="../assets/edit_black_24dp.svg"/>
            <span>Loi de montée</span>

          </div>


          <!--            <div class="law-edit-circle">-->
          <!--              <input type="checkbox" v-model="checked">-->
          <!--              <img class="check" v-if="checked" src="../assets/check.svg"/>-->
          <!--              <img class="nocheck" v-if="!checked" src="../assets/clear_black_24dp.svg"/>-->
          <!--            </div>-->
          <span>{{ customSpeedLaw }}</span>
        </div>
      </transition>

      <transition name="pop-in" appear>
        <div class="add-point">
          <div class="add-box" @mousedown="createRipple">
            <img src="../assets/add_black_24dp.svg"/>
          </div>
          <div class="more-box" >
            <div class="climb-box box" @mousedown="createRipple">
              <img src="../assets/vertical_align_top_black_24dp.svg"/>
            </div>
            <div class="level-box box" @mousedown="createRipple">
              <img src="../assets/add_black_24dp.svg"/>
            </div>
            <div class="descent-box box" @mousedown="createRipple">
              <img src="../assets/vertical_align_bottom_black_24dp.svg"/>
            </div>
          </div>


          <!--            <div class="law-edit-circle">-->
          <!--              <input type="checkbox" v-model="checked">-->
          <!--              <img class="check" v-if="checked" src="../assets/check.svg"/>-->
          <!--              <img class="nocheck" v-if="!checked" src="../assets/clear_black_24dp.svg"/>-->
          <!--            </div>-->
        </div>
      </transition>

    </div>
  </div>


</template>

<script>
import HButton from "@/components/hButton"
import LawEdit from "@/components/lawEdit"
import AppButton from "@/components/appButton"
import {flightProfile} from "@/BADA/perfomanceFile"
// import {profileSampling} from "@/BADA/sampling"
import {createRipple} from "@/BADA/ripple"
import Parameters from "@/components/Parameters"

export default {
  name: "flightProfile",
  components: {
    HButton,
    LawEdit,
    AppButton,
    Parameters,
  },

  data (){
    return {
      selectedUnit: {
        element: null,
        unit: 'CAS'
      },
      lawEditing: false,
      params : false,
      selectedMass: "",
      currentProfilePoint: 0,
      currentPhase : "",
      customSpeedLaw : "",
      law: {speed: 280, mach: 0.75},
    }
  },

  props : ["coefficient"],

  beforeMount() {

  },

  computed: {
    flightProfile: function () {
      return flightProfile(this.climbSequence, this.cruiseSequence, this.descentSequence, this.law, this.coefficient, this.selectedMass)
    },
  },

  mounted() {
    // let coefficients = this.coefficient
    // this.masses = this.coefficient.aircraftStandardMass
    this.profileObject = []
    this.pointObject = ""
    // let slider = document.getElementById("myRange");
    // let output = document.getElementById("fl-value");
    let frame = document.getElementsByClassName('frame__content')[0]
    // output.innerHTML = slider.value; // Display the default slider value
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

    window.addEventListener('resize', function () {
      canvas.setWidth(frame.offsetWidth);
      canvas.setHeight(frame.offsetHeight);
      let points = []
      ref.profileObject.forEach((point) => {
        points.push({
          profilePoint: point,
          x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
          y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
        })
      })
      ref.pointObject.set({points:points})
      ref.pointObject.setCoords()
      canvas.requestRenderAll()
      // canvas.calcOffset();
    });




    this.marginVertical = canvas.height / 4
    let marginVertical = canvas.height / 4
    let marginHorizontalLeft = 300
    this.marginHorizontalLeft = 300
    let marginHorizontalRight = 50
    this.marginHorizontalRight = 50


    let climbSequence = [
      {
        type: 'climb',
        speedInstruction: 'law',
        FLTarget: 360,
      },
    ]
    this.climbSequence = climbSequence
    let cruiseSequence = [
      {
        type: 'level',
        time: 1000,
      },
      {
        type: 'climb',
        FLTarget: 380,
      },
      {
        type: 'level',
        time: 1000,
      }]
    this.cruiseSequence = cruiseSequence
    let descentSequence = [
      {
        type: 'descent',
        FLTarget: 1,
      }
    ]
    this.descentSequence = descentSequence


    let points = []

    this.profilePoints = points

    let climbPoints = []
    let cruisePoints = []
    let descentPoints = []
    let lastAnchor
    let fullList

    let profileObject = this.flightProfile
    let profile = profileObject.full
    this.profileObject = profileObject.full
    let DTotal = profile[profile.length - 1].dist
    for (let point of profile) {
      points.push({
        profilePoint: point,
        x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
        y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
      })
    }
    for (let point of profileObject.climb) {
      climbPoints.push({
        profilePoint: point,
        x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
        y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
      })
    }
    climbPoints.push({
      x: climbPoints[climbPoints.length - 1].x,
      y: canvas.height
    })
    lastAnchor = climbPoints[climbPoints.length - 1].x

    for (let point of profileObject.cruise) {
      cruisePoints.push({
        profilePoint: point,
        x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
        y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
      })
    }

    fullList = climbPoints.concat(cruisePoints)
    cruisePoints.push({
      x: fullList[fullList.length - 1].x,
      y: canvas.height
    })
    cruisePoints.push({
      x: lastAnchor,
      y: canvas.height
    })

    lastAnchor =  fullList[fullList.length - 1].x


    for (let point of profileObject.descent) {
      descentPoints.push({
        profilePoint: point,
        x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
        y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
      })
    }
    fullList = fullList.concat(descentPoints)

    descentPoints.push({
      x: fullList[fullList.length - 1].x,
      y: canvas.height
    })
    descentPoints.push({
      x: lastAnchor,
      y: canvas.height
    })

    // let sampledPoints = profileSampling(fullList, 100)

    // eslint-disable-next-line no-undef
    var grad = new fabric.Gradient({
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
    var grad2 = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: canvas.width / 2,
        y1: 0,
        x2: canvas.width / 2,
        y2: 1 * canvas.height / 4,
      },
      colorStops: [
        {
          color: 'rgba(216,30,255,0.09)',
          offset: 0,
        },
        {
          color: 'rgba(80,50,39, 0.0)',
          offset: 1,
        },

      ]
    });

    // eslint-disable-next-line no-undef
    let pointObject = new fabric.Polyline(points, {
      stroke: '#ca8ee3',
      strokeWidth: 0.5,
      // evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad,
    })

    this.pointObject = pointObject

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
    //   let cursor1 = new fabric.Rect({
    //     stroke: '#ff0c0c',
    //     width:1,
    //     height:300,
    //     left: point.x-1,
    //     top: point.y-1,
    //     hoverCursor: 'pointer',
    //     selectable: false,
    //     fill: 'rgba(255,11,11,0.94)',
    //   })
    //   canvas.add(cursor1)
    // })
    // canvas.add(sampledObject)

    // eslint-disable-next-line no-undef
    let followLine = new fabric.Polyline([{x: 0, y: 0}, {x: canvas.width, y: canvas.height}], {
      stroke: '#46f4b2',
      strokeWidth: 1,
      evented: false,
      fill: 'rgba(0,0,0,0)',
      hoverCursor: 'pointer',
      selectable: false,
    })
    canvas.add(followLine)
    // eslint-disable-next-line no-undef
    let groundLabel = new fabric.Text('GROUND', {
      left: canvas.width - 50,
      fontSize: 10,
      top: canvas.height - marginVertical + 5,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      objectCaching: false,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgba(100,100,100,1)',
    })
    canvas.add(groundLabel)
    // marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft)
    // eslint-disable-next-line no-undef
    let climbLabel = new fabric.Text('Climb', {
      left: 0.5 * (canvas.width - marginHorizontalRight - marginHorizontalLeft) / 3 + marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(113,68,59)',
    })
    canvas.add(climbLabel)
    // eslint-disable-next-line no-undef
    let climbGraph = new fabric.Polygon(climbPoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad2,
    })
    canvas.add(climbGraph)
    // eslint-disable-next-line no-undef
    let cruiseLabel = new fabric.Text('Cruise', {
      left: 1.5 * (canvas.width - marginHorizontalRight - marginHorizontalLeft) / 3 + marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(133,223,196)',
    })
    canvas.add(cruiseLabel)
    // eslint-disable-next-line no-undef
    let cruiseGraph = new fabric.Polygon(cruisePoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad2,
    })
    canvas.add(cruiseGraph)
    // eslint-disable-next-line no-undef
    let descentLabel = new fabric.Text('Descent', {
      left: 2.5 * (canvas.width - marginHorizontalRight - marginHorizontalLeft) / 3 + marginHorizontalLeft - 20,
      fontSize: 15,
      objectCaching: false,
      top: canvas.height - marginVertical - 10,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(73,132,98)',
    })
    canvas.add(descentLabel)
    // eslint-disable-next-line no-undef
    let descentGraph = new fabric.Polygon(descentPoints, {
      stroke: '#764637',
      strokeWidth: 0.0002,
      evented: false,
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: grad2,
    })
    canvas.add(descentGraph)

    this.phaseObjects = {
      climb: {
        label: climbLabel,
        graph: climbGraph,
      },
      cruise: {
        label: cruiseLabel,
        graph: cruiseGraph,
      },
      descent: {
        label: descentLabel,
        graph: descentGraph,
      }

    }

    canvas.requestRenderAll()
    // eslint-disable-next-line no-undef
    let verticalScale = new fabric.Rect({
      fill: 'rgba(100,100,100,1)',
      width: 0.5,
      height: canvas.height - 2 * marginVertical,
      left: canvas.width - 10,
      top: marginVertical,
    })
    canvas.add(verticalScale)
    // eslint-disable-next-line no-undef
    let verticalCursor = new fabric.Rect({
      selectable: false,
      fill: 'rgb(86,199,156)',
      width: 10,
      height: 2,
      left: canvas.width - 10,
      top: marginVertical,
    })
    canvas.add(verticalCursor)
    // eslint-disable-next-line no-undef
    let verticalCursorText = new fabric.Text('400', {
      left: canvas.width - 40,
      fontSize: 14,
      top: canvas.height - marginVertical,
      fontFamily: 'Product Sans',
      fontWeight: "bold",
      radius: 1,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgb(200,200,200)',
    })
    canvas.add(verticalCursorText)
    // eslint-disable-next-line no-undef
    let cursor1 = new fabric.Circle({
      stroke: '#4eaa81',
      radius: 10,
      left: canvas.width / 2,
      hoverCursor: 'pointer',
      selectable: false,
      fill: 'rgba(79,255,176,0.1)',
    })


    // eslint-disable-next-line no-undef
    let cursor2 = new fabric.Circle({
      // stroke : '#AA644E',
      // strokeWidth : 2,
      radius: 4,
      hoverCursor: 'pointer',
      selectable: false,
      fill: '#85dfca',
    })

    // eslint-disable-next-line no-undef
    let cursorLine = new fabric.Rect({
      fill: '#85eac3',
      width: 0.5,
      opacity: 0.2,
      objectCaching: false,
      height: canvas.height,
      left: canvas.width - 10,
      top: marginVertical,
    })

    canvas.add(pointObject)
    canvas.add(cursor1)
    canvas.add(cursorLine)

    canvas.add(pointObject)
    canvas.add(cursor1)
    canvas.add(cursor2)

    // eslint-disable-next-line no-undef
    this.hpTrans = new fabric.Rect({
      fill: 'rgba(137,207,255,0.98)',
      height: 2,
      width: 10,
      left: canvas.width - 10,
      selectable: false,
      top: -profile[0].hpTrans / 100 * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height,
    })
    canvas.add(this.hpTrans)

    // eslint-disable-next-line no-undef
    this.hpTransText = new fabric.Text('CONJONCTION', {
      fill: 'rgba(137,207,255,0.98)',
      opacity: 0.6,
      fontSize: 9,
      objectCaching: false,
      fontFamily: 'Product Sans',
      fontWeight: 'Bold',
      selectable: false,
      left: canvas.width - 80,
      top: -profile[0].hpTrans / 100 * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height + 2,
    })
    canvas.add(this.hpTransText)

//     let hpTransLevel = new fabric.Text('FL' + (Math.round(profile[0].hpTrans / 100).toString()), {
//       fill: 'rgba(137,207,255,0.98)',
//
//       fontSize: 10,
//       objectCaching: false,
//       fontFamily: 'Product Sans',
//       fontWeight: 'Bold',
//
//       left: 2,
//       top: -profile[0].hpTrans / 100 * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height - 12,
//     })

    let PRESSED = false

    let GRABBING = false
    canvas.on("mouse:down", (event) => {

      if (event.target === cursor1 || event.target === cursor2) {
        GRABBING = true
        if (!PRESSED) {
          cursor1.animate({
            radius: 20,
            left: this.currentPoint.x - 20,
            top: this.currentPoint.y - 20,
            fill: "rgba(100,188,162,0.52)"

          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },

            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 100
          });
          // cursor1.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
          cursor1.setCoords()
          canvas.requestRenderAll()
          PRESSED = true
        }

      }
      canvas.requestRenderAll()
    })

    canvas.on("mouse:up", (event) => {
      if (GRABBING) {
        GRABBING = false
        if (PRESSED) {
          cursor1.animate({
            fill: "rgba(10,10,10,0.01)"

          }, {
            onChange: function () {
              canvas.requestRenderAll()
            },

            easing: // eslint-disable-next-line no-unused-vars,no-undef
                fabric.util.ease['easeOutQuad'],
            duration: 100
          });
          // cursor1.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
          cursor1.setCoords()
          canvas.requestRenderAll()
        }

        if (!HOVER) {
          cursor1.animate({
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
          // cursor1.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
          cursor1.setCoords()
          canvas.requestRenderAll()
        }
        PRESSED = false
      } else {
        if (event.target !== this.pointObject && event.target !== cursor2 && event.target !== cursor1) {
          HOVER = false
        }
        let pointer = canvas.getPointer(event.e);

        // eslint-disable-next-line no-unused-vars
        this.currentPoint = this.getPoint(pointer.x)
        this.currentProfilePoint = this.currentPoint.profilePoint
        if (this.currentPhase != this.currentProfilePoint.phase) {
          this.currentPhase = this.currentProfilePoint.phase
          this.updatePhaseDisplay()
        }
        let pt = this.currentPoint
        let followPoints = this.profilePoints.slice(0, this.profilePoints.indexOf(pt))
        followLine.points = followPoints
        followLine.dirty = true
        followLine.setCoords()


        verticalCursor.set({top: pt.y - 2})
        verticalCursorText.set({top: pt.y - 9, text: Math.round(this.currentProfilePoint.alt).toString()})
        cursor1.set({left: pt.x - cursor1.radius, top: pt.y - cursor1.radius})
        cursor1.setCoords()
        cursor2.set({left: pt.x - 4, top: pt.y - 4})
        cursor2.setCoords()
        cursorLine.set({left: pt.x, top: pt.y})
        cursorLine.setCoords()
        canvas.requestRenderAll()
      }


    })

    canvas.on("mouse:move", (event) => {
      if (GRABBING) {
        let pointer = canvas.getPointer(event.e);
        this.currentPoint = this.getPoint(pointer.x)
        let pt = this.currentPoint
        this.currentProfilePoint = this.currentPoint.profilePoint
        if (this.currentPhase != this.currentProfilePoint.phase) {
          this.currentPhase = this.currentProfilePoint.phase
          this.updatePhaseDisplay()
        }

        let followPoints = this.profilePoints.slice(0, this.profilePoints.indexOf(pt))
        followLine.points = followPoints
        followLine.dirty = true
        followLine.setCoords()


        verticalCursor.set({top: pt.y - 2})
        verticalCursorText.set({top: pt.y - 9, text: Math.round(this.currentProfilePoint.alt).toString()})
        cursor1.set({left: pt.x - cursor1.radius, top: pt.y - cursor1.radius})
        cursor1.setCoords()
        cursor2.set({left: pt.x - 4, top: pt.y - 4})
        cursor2.setCoords()
        cursorLine.set({left: pt.x, top: pt.y})
        cursorLine.setCoords()
        canvas.requestRenderAll()
      }

    })

    let HOVER = false

    canvas.on("mouse:over", (event) => {
      if (event.target === this.pointObject || event.target === cursor2 || event.target === cursor1) {
        if (HOVER) {
          return
        }
        HOVER = true
        if (GRABBING) {
          return
        }
        cursor1.animate({
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
        // cursor1.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
        cursor1.setCoords()
        canvas.requestRenderAll()
      }
    })


    let group = [this.pointObject, cursor1, cursor2]
    // console.log(group)
    canvas.on("mouse:out", (event) => {
      // console.log(event.nextTarget)

      if ((event.target === this.pointObject || event.target === cursor2 || event.target === cursor1) && (!group.includes(event.nextTarget))) {
        if (HOVER && !GRABBING) {
          // console.log("MOUSE OUT")
          cursor1.animate({
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
          cursor1.setCoords()
          canvas.requestRenderAll()
        }
        HOVER = false
        if (GRABBING) {
          return
        }

      }
    })

    canvas.requestRenderAll()

  },

  methods : {
    setCustomParams : function (parameters) {
      console.log(parameters)
      this.selectedMass = parseFloat(parameters.mass)
      this.selectedISAdev = parameters.ISA
      this.selectedQNH = parameters.QNH
      this.computeFlightProfile()
      this.canvas.requestRenderAll()
    },

    setCustomSpeedLaw : function (lawParameters) {
      this.customSpeedLaw = lawParameters
      this.law = this.customSpeedLaw
      // console.log(this.customSpeedLaw)
      this.hpTrans.set({
        top: -this.customSpeedLaw.FL * (this.canvasHeight - 2 * this.marginVertical) / 410 - this.marginVertical + this.canvasHeight
      })
      this.hpTrans.setCoords()

      this.hpTransText.set({
        top: -this.customSpeedLaw.FL * (this.canvasHeight - 2 * this.marginVertical) / 410 - this.marginVertical + this.canvasHeight
      })
      this.hpTransText.setCoords()
      this.computeFlightProfile()
      this.canvas.requestRenderAll()
    },

    computeFlightProfile: function () {
      let canvas = this.canvas
      let marginVertical = this.marginVertical
      let marginHorizontalLeft = this.marginHorizontalLeft
      let marginHorizontalRight = this.marginHorizontalRight
      let points = []

      this.profilePoints = points

      let climbPoints = []
      let cruisePoints = []
      let descentPoints = []
      let lastAnchor
      let fullList

      let profileObject = this.flightProfile
      let profile = profileObject.full
      this.profileObject = profileObject.full
      let DTotal = profile[profile.length - 1].dist
      for (let point of profile) {
        points.push({
          profilePoint: point,
          x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
          y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
        })
      }
      for (let point of profileObject.climb) {
        climbPoints.push({
          profilePoint: point,
          x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
          y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
        })
      }
      climbPoints.push({
        x: climbPoints[climbPoints.length - 1].x,
        y: canvas.height
      })
      lastAnchor = climbPoints[climbPoints.length - 1].x

      for (let point of profileObject.cruise) {
        cruisePoints.push({
          profilePoint: point,
          x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
          y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
        })
      }

      fullList = climbPoints.concat(cruisePoints)
      cruisePoints.push({
        x: fullList[fullList.length - 1].x,
        y: canvas.height
      })
      cruisePoints.push({
        x: lastAnchor,
        y: canvas.height
      })

      lastAnchor =  fullList[fullList.length - 1].x


      for (let point of profileObject.descent) {
        descentPoints.push({
          profilePoint: point,
          x: marginHorizontalLeft + (canvas.width - marginHorizontalRight - marginHorizontalLeft) / DTotal * point.dist,
          y: -point.alt * (canvas.height - 2 * marginVertical) / 410 - marginVertical + canvas.height
        })
      }
      fullList = fullList.concat(descentPoints)

      descentPoints.push({
        x: fullList[fullList.length - 1].x,
        y: canvas.height
      })
      descentPoints.push({
        x: lastAnchor,
        y: canvas.height
      })

      // console.log(points)
      this.profilePoints = points
      this.pointObject.set({points: points})
      let conjonctionPoint = this.findConjonctionPoint()
      // eslint-disable-next-line no-unused-vars,no-undef
      let conjonctionBug = new fabric.Circle({
        selectable: false,
        fill: 'rgb(125,201,255)',
        radius: 2,
        left: conjonctionPoint.x - 2,
        top: conjonctionPoint.y - 2,
      })
      canvas.add(conjonctionBug)
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


    createRipple(event){
      createRipple(event)
    },

    updatePhaseDisplay: function () {
      let canvas = this.canvas
      let marginVertical = this.marginVertical
      Object.keys(this.phaseObjects).forEach((key) => {
        if (key === this.currentPhase) {
          this.phaseObjects[key].label.animate({
            opacity: 1,
            fill: 'rgb(103,199,165)',
            top: canvas.height - marginVertical - 10,
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
            fill: 'rgb(59,113,84)',
            top: canvas.height - marginVertical + 10,
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
  transition: all 0.6s cubic-bezier(.72, .02, .44, 1.38) 1s;
}

.pop-in-enter-from,
.pop-in-leave-to {
  transition: all 0.6s ease-in-out 1s;
  transform: scale(0.8) translateY(20px);
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

.add-box {
  width: 48px;
  height: 48px;
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  background: #b786ce;
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


.information-box-container {
  position: absolute;
  padding: 20px;
  z-index: 999;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100% - 160px)
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
  background: #3e3543;
  border: 1px solid rgba(101, 143, 206, 0);
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #b48fc1;
  cursor: pointer;
}

.unit-selector.selected {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  border: 1px solid #65cebb;
  background: #222428;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #65ceb6;
  cursor: pointer;
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

  /*border: #6b6f71 1px solid;*/
  /*top: 40px;*/
  /*margin: 60px;*/
  margin-bottom: 10px;
  width: 210px;
  min-height: 100px;
  height: auto;
}

.infoboxType {
  margin-top: 15px;
  padding-left: 15px;
  display: flex;
  height: 55px;
  flex-direction: column;

  font-family: "Roboto", sans-serif;
  font-weight: normal;
  color: #e4cae8;
  font-size: 14px;
}

.infoboxTypeValue {
  margin-top: 5px;
  display: flex;
  text-align: right;
  padding-right: 15px;
  letter-spacing: 1px;
  flex-direction: column;
  font-family: "Product Sans", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #c292ea;
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
  box-shadow: rgba(5, 5, 5, 0.45) 0px 1px 3px 1px;
  width: calc(100% - 10px);
  transform: translateY(-5px);
  margin: 5px;
}

.information-box.information-box--active .box__border {
  opacity: 1;
}

.information-box.information-box--brown .box__container {
  background: linear-gradient(45deg, rgb(66, 60, 67) -0%, rgb(199, 148, 241) 110%);
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
  color: rgb(220, 159, 234);
}

.information-box.information-box--blue.information-box--active .color-text {
  color: rgb(86, 124, 176);
}

.information-box.information-box--blue.information-box--active .flight-state-value {
  color: rgb(86, 124, 176);
}

.information-box.information-box--brown.information-box--active .flight-state-value {
  color: rgb(202, 159, 248);
}

.box__container{
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
  width: 100%;
  z-index: 9999;
  position: absolute;
  height: calc(100% - 104px)
}

.law-edit-overlay {
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  backdrop-filter: blur(2px);
  height: 100vh;
  background: rgba(25, 24, 24, 0.52);
}


.validate img {
  margin: 8px;
}

.box__container {
  width: 100%;
  display: flex;
  background: rgba(83, 85, 91, 0.20);
  flex-direction: column;
  backdrop-filter: blur(5px);
  border-radius: 14px;
  margin: 0px;
  position: relative;
  top: 0;
  left: 0;
  height: max-content;
  transform: translateY(0px);
  justify-content: space-between;
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
  align-items: flex-end;
   position: absolute;
   width: auto;
   bottom: 0;
  right: 0;
  height:auto;
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
  color: #be7fd0;

  padding-right: 20px;
  padding-top: 14px;
}

.law-edit img {
  margin: 13px;
  filter: invert(97%) sepia(97%) saturate(2849%) hue-rotate(225deg) brightness(92%) contrast(80%);
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

  color: rgba(38, 42, 46, 1);
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
  color: rgb(151, 77, 168);
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
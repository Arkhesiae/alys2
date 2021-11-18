<template>
  <div id="page">
    <MenuButton/>
    <Background/>
    <nav class="nav-bar">
      <div class="nav-button active">Static</div>
      <div class="nav-button">Dynamic</div>
      <div class="select-bar"></div>
      <div class="searchbar-container">
        <div id="searchbar">
          <!--              STATIC-->
          <label for="search"></label>
          <input  autocomplete="off" placeholder="Search..." id="search" v-model="search">
          <div class="search-icon"  @click="erase()"><img v-if="search!==''" src="../assets/clear_black_24dp.svg" alt=""></div>
        </div>
        <ul class="wrapper">
          <li class="card" v-bind:key="post.title" v-for="post in filteredList">
            <div class="text-container">
              <p>
                {{ post.title.slice(0, post.title.indexOf(search.toUpperCase())) }}</p>
              <p class="highlight"> {{ search.toUpperCase() }}</p>
              <p>
                {{ post.title.slice(post.title.indexOf(search.toUpperCase()) + search.length, 8) }}</p>
              <a v-bind:href="post.link" target="_blank">

              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>


    <div class="content-container">
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
                    <div class="information__value">{{climbPerf.rate}} ft/min</div>

                    <div class="information__value selectedValue" v-on:wheel="changeSelection">{{ selectedClimbRate }} ft/min</div>
                    <div class="information__context" v-show="!checked">Vy : {{climbPerf.speed}} kts FLmax : {{maxFLROCD}}</div>
                  </div>
                  <div class="information__content">
                    <img src="../assets/vertical_align_bottom_black_24dp.svg"/>
                    <span class="information__label">Rate of Descent</span>
                    <div class="information__value">{{descentPerf.rate}} ft/min</div>
                    <div class="information__context">V : {{descentPerf.speed}} kts </div>
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
                        <div>{{displayedSpeed}}</div>
                        <div class="stopbar-container" v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }">
                          <div class="min">
                            <div class="stopbar"></div>
                            <span class="speed-value">{{speedRange.minSpeed}}</span>
                          </div>

                          <div class="max">
                            <div class="stopbar"></div>
                            <span class="speed-value">{{speedRange.maxSpeed}}</span>
                          </div>
                        </div>


                      </div>
                      <div class="slider-background"></div>
                      <div class="speed slidecontainer">

                        <input type="range" :min="minSpeed" :max="maxSpeed" v-bind:style="{ width : sliderWidthInPx+'px', marginLeft : sliderMarginLeftInPx+'px'  }" step="1" class="slider" v-model="speed">
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
            <div class="section fl">
              <div class="text1" v-bind:style="{ bottom: computedHeight }">{{climbPerf.maxFL}}</div>
              <div class="bar1" v-bind:style="{ height: computedHeight }"></div>
              <div class="bar3" v-bind:style="{ bottom: computedHeightScale(computedHpTrans(this.checked ? this.law : '')) }"></div>
              <div class="text2" v-bind:style="{ bottom: computedBottom }">{{climbPerf.absoluteMaxFL}}</div>
              <div class="bar2" v-bind:style="{ height: computedHeight2 , bottom : computedBottom }"></div>
              <div id="fl-value">FL{{this.FLinput}}</div>
              <div class="fl slidecontainer">
                <input type="range" min="60" max="410" step="10" class="slider" orient="vertical" id="myRange" v-model="FLinput">
              </div>
            </div>
          </div>
        </div>
        <div id="flightProfile" class="current-frame frame">
          <div class="information-box">
            <div class="box__border"></div>
            <div class="box__container">
               <div class="box__label">Climb</div>
            </div>
            <div class="box__control-container">
                  <div class="control">{{currentProfilePoint.speed}} kts</div>
                  <div class="control">{{currentProfilePoint.rate}} ft/min</div>
            </div>
          </div>
          <!--          <div class = "switch"></div>-->
          <!--          <div class="frame__title">-->
          <!--            <div class="frame__icon-title">-->
          <!--              <img src="../assets/insert_chart_black_24dp.svg" alt=""/>-->
          <!--            </div>-->
          <!--            <span class="frame__text-title">Profil de vol</span>-->
          <!--          </div>-->
          <div class="frame__content">
            <canvas id="flightProfile-canvas"></canvas>
          </div>
        </div>


        <div class="footer">

          <div class="content-container__app-button-container">
            <AppButton text="Profil de Vol" icon="show_chart_black_24dp.svg"/>
            <AppButton text="Paramètres avancés" icon="settings_black_24dp.svg"/>

            <!--          <div class="content__app-button">-->
            <!--            <div class="content-container__app-button-text">Paramètres avancés</div>-->
            <!--            <div class="content-container__app-button-icon-container">-->
            <!--              <img src="../assets/settings_black_24dp.svg"/>-->
            <!--            </div>-->
            <!--          </div>-->
          </div>
          <div class="law-edit">
            <img src="../assets/edit_black_24dp.svg"/>
            <span>Loi de montée</span>
          </div>
          <input type="checkbox" v-model="checked"/>
          <div>{{checked}}</div>
        </div>

        <!--        <div class = "lower-frame"></div>-->
      </div>

      <div class ="sideBar">
        <div class="presentation">
          <div class="header">
            <div class="name">AIRBUS A319</div>
            <div class="lower-header">
              <div class="bar"/>
              <div class="ICAO-code">A319</div>
            </div>


            <div class="menu-option"></div>
          </div>
          <div class="picture">
            <img src="../assets/airbus.jpg"/>
          </div>
        </div>
        <div class="charac">
          <img src="../assets/jet.svg"/><p class="actype">JET</p>
          <div class="description">
            <h2>Wing position</h2>
            <p>Low wing</p>
            <h2>Engine position</h2>
            <p>Underwing mounted</p>
            <h2>Tail configuration</h2>
            <p>Regular tail, mid set Landing gear</p>
          </div>

        </div>
        <div class="type">
          <div class="description">
            <h2>Masse a vide</h2>
            <p>60 000kg</p>
          </div>
        </div>
        <div class="misc">
          <p>
            L'Airbus A319 est une version raccourcie de l'A320
          </p>
        </div>

      </div>
    </div>

  </div>
</template>
<!--<script src=></script>-->
<script>


import MenuButton from "@/components/MenuButton"
import Background from "@/components/Background"
import {calcPerf, speedRange} from "@/BADA/perfomanceFile"
import {calcPerfbis} from "@/BADA/perfomanceFile"
import AppButton from "@/components/appButton"
import {HpTrans, knotToMs} from "../BADA/func";
import {flightProfile, getPlaneMach, maxFLAtROCD, range} from "../BADA/perfomanceFile";
require('fabric')

export default {
  name: "TestView",
  components: {
    HButton,
    LawEdit,
    AppButton,
    MenuButton,
    Background,
  },

  data() {
    return {
      // climbROCD: 0,
      FLinput: 0,
      minFL:60,
      maxFL:350,
      speed : 0,
      isSelected : false,
      selectedClimbRate: 0,
      currentProfilePoint : 0,
      checked:false,
      law : {speed: 280, mach:0.75},

    }
  },

  beforeMount() {

  },

  mounted() {
    let slider = document.getElementById("myRange");
    let output = document.getElementById("fl-value");
    //let canvasElement = document.getElementById("flightProfile-canvas");
    let frame = document.getElementsByClassName('frame__content')[1]

    output.innerHTML = slider.value; // Display the default slider value
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


    window.addEventListener('resize', function () {
      // canvas.width = frame.offsetWidth
      // canvas.height = frame.offsetHeight
      canvas.setWidth(frame.offsetWidth);
      canvas.setHeight(frame.offsetHeight);
      // canvas.calcOffset();
    });
    canvas.setHeight(frame.offsetHeight)
    canvas.setWidth(frame.offsetWidth)
    let marginVertical = 200
    let marginHorizontal= canvas.width/10
    let sequence = [
      {
        type: 'climb',
        speedInstruction: 250,
        treshold: 'speed',
        FLTarget: 100,
      },
      {
        type: 'climb',
        treshold: 'speed',
        FLTarget : 100,
      },
      {
        type: 'climb',
        treshold: 'speed',
        speedInstruction: 300,
        FLTarget : 360,
      },
      {
        type: 'climb',
        treshold: 'speed',
        //speedInstruction: 300,
        FLTarget : 360,
      },
      {
        type: 'level',
        treshold: 'speed',
        //speedInstruction: 300,
        time : 600,
      },
      {
        type: 'climb',
        treshold: 'speed',
        //speedInstruction: 300,
        FLTarget: 380,
      },
      {
        type: 'level',
        treshold: 'speed',
        //speedInstruction: 300,
        time : 300,
      },
      {
        type: 'descent',


        //speedInstruction: 300,
        FLTarget: 110,
      },
      {
        type: 'descent',
        speedInstruction: 250,
        treshold: 'speed',
        //speedInstruction: 300,
        FLTarget: 0,
      },
      {
        type: 'descent',

        treshold: 'speed',
        //speedInstruction: 300,
        FLTarget: 0,
      },
    ]

    let points = [
      {
        x: canvas.width+1,
        y: canvas.height - marginVertical,
      },
      {
        x: canvas.width+1,
        y: canvas.height,
      },
      {
        x: -1,
        y: canvas.height,
      },
      {
        x: -1,
        y: canvas.height-marginVertical,
      },

    ]

    let profile = flightProfile(sequence)
    let DTotal = profile[profile.length-1].dist
    for (let point of profile){
      points.push({
        profilePoint : point,
        x : marginHorizontal + (canvas.width-2*marginHorizontal)/DTotal * point.dist,
        y : -point.alt * (canvas.height - 2*marginVertical)/410 - marginVertical + canvas.height
      })
    }
    // eslint-disable-next-line no-undef
    var grad = new fabric.Gradient({
      type: 'linear',
      coords: {
        x1: canvas.width/2,
        y1: 0,
        x2: canvas.width/2,
        y2: 2*canvas.height/4,
      },
      colorStops: [
        {
          color: 'rgba(170,100,78,0.7)',
          offset: 0,
        },
        {
          color: 'rgba(80,50,39, 0.0)',
          offset: 1,
        },

      ]});
    // eslint-disable-next-line no-undef
    let pointObject = new fabric.Polygon(points, {
      stroke : '#AA644E',
      evented:false,
      radius :1,
      hoverCursor: 'pointer',
      selectable:false,
      fill : grad,

    })
    // eslint-disable-next-line no-undef
    let groundLabel = new fabric.Text('GROUND', {

      left : 10,
      fontSize:10,
      top : canvas.height - marginVertical,
      fontFamily : 'Product Sans',
      radius :1,
      hoverCursor: 'pointer',
      selectable:false,
      fill : 'rgba(100,100,100,1)',
    })
    canvas.add(groundLabel)
    // eslint-disable-next-line no-undef
    let verticalScale = new fabric.Rect({
      fill : 'rgba(100,100,100,1)',
      width : 1,
      height : canvas.height - 2 * marginVertical,
      left : canvas.width - 10,
      top : marginVertical,
    })
    canvas.add(verticalScale)
    // eslint-disable-next-line no-undef
    let verticalCursor = new fabric.Rect({
      fill : 'rgb(255,148,79)',
      width : 10,
      height : 2,
      left : canvas.width - 10,
      top : marginVertical,
    })
    canvas.add(verticalCursor)
    // eslint-disable-next-line no-undef
    let verticalCursorText =new fabric.Text('400', {
      left : canvas.width - 40,
      fontSize:10,
      top : canvas.height - marginVertical,
      fontFamily : 'Product Sans',
      radius :1,
      hoverCursor: 'pointer',
      selectable:false,
      fill : 'rgb(255,148,79)',
    })
    canvas.add(verticalCursorText)
    // eslint-disable-next-line no-undef
    let cursor = new fabric.Circle({
      // stroke : '#AA644E',
      radius :10,
      hoverCursor: 'pointer',
      selectable:false,
      fill : '#ea8c6f',
    })

    canvas.add(pointObject)
    canvas.add(cursor)

    // eslint-disable-next-line no-undef
    let hpTrans = new fabric.Rect({
      fill : 'rgba(137,207,255,0.98)',
      height: 1,
      width : canvas.width/3.69,
      left : 0,
      top : -profile[0].hpTrans/100 * (canvas.height - 2*marginVertical)/410 - marginVertical + canvas.height,
    })
    canvas.add(this.hpTrans)

    // eslint-disable-next-line no-undef
    let hpTransText = new fabric.Text('CONJONCTION',{
      fill : 'rgba(137,207,255,0.98)',

      fontSize:10,
      objectCaching :false,
      fontFamily : 'Product Sans',
      fontWeight : 'Bold',

      left : 2,
      top : -profile[0].hpTrans/100 * (canvas.height - 2*marginVertical)/410 - marginVertical + canvas.height+2,
    })
    canvas.add(hpTransText)
// eslint-disable-next-line no-undef
    let hpTransLevel = new fabric.Text('FL'+(Math.round(profile[0].hpTrans/100).toString()),{
      fill : 'rgba(137,207,255,0.98)',

      fontSize:10,
      objectCaching :false,
      fontFamily : 'Product Sans',
      fontWeight : 'Bold',

      left : 2,
      top : -profile[0].hpTrans/100 * (canvas.height - 2*marginVertical)/410 - marginVertical + canvas.height-12,
    })
    canvas.add(hpTransLevel)

    let GRABBING = false
    canvas.on("mouse:down", (event) => {
      console.log(event)
      if (event.target === cursor){
        GRABBING = true
        if (!PRESSED) {
          cursor1.animate({
            radius: 20,
            left: this.currentPoint.x - 20,
            top: this.currentPoint.y - 20,
            fill: "rgba(188,123,100,0.52)"

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

        // if (!HOVER){
        //   cursor1.animate({
        //     radius: 20,
        //     left: this.currentPoint.x - 20,
        //     top: this.currentPoint.y - 20
        //     // text : trackObject.ETA.toString()
        //
        //   }, {
        //     onChange: function () {
        //       canvas.requestRenderAll()
        //     },
        //
        //     easing: // eslint-disable-next-line no-unused-vars,no-undef
        //         fabric.util.ease['easeOutQuad'],
        //     duration: 500
        //   });
        //   // cursor1.set({'radius' : 20, 'left': this.currentPoint.x - 20, 'top': this.currentPoint.y - 20})
        //   cursor1.setCoords()
        //   canvas.requestRenderAll()
        // }
      }

      let pointer = canvas.getPointer(event.e);
      let minVert = Infinity
      // eslint-disable-next-line no-unused-vars
      let pt
      for (let point of points){
        if (Math.abs(pointer.x - point.x)<minVert){
          minVert = Math.abs(pointer.x - point.x)
          pt = point
        }
      }
     // verticalCursor.set({top : pt.y-2})
      //verticalCursorText.set({top : pt.y-6})
      //cursor.set({left : pointer.x-10, top : pt.y-10})
      canvas.requestRenderAll()
    })

    canvas.on("mouse:up", () => {
      GRABBING = false

    })



    canvas.on("mouse:move", (event) => {
      if (GRABBING){
        let pointer = canvas.getPointer(event.e);

        let minVert = Infinity
        // eslint-disable-next-line no-unused-vars
        let pt
        for (let point of points){
          if (Math.abs(pointer.x - point.x)<minVert){
            minVert = Math.abs(pointer.x - point.x)
            pt = point

          }
        }
        this.currentProfilePoint = pt.profilePoint
        verticalCursor.set({top : pt.y-2})
        verticalCursorText.set({top : pt.y-6, text :Math.round(this.currentProfilePoint.alt).toString()})
        cursor.set({left : pointer.x-10, top : pt.y-10})
        cursor.setCoords()
        canvas.requestRenderAll()
      }

    })

    let HOVER = false

    canvas.on("mouse:over", (event) => {
      console.log(event)


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
          // text : trackObject.ETA.toString()

        }, {
          onChange: function () {
            canvas.requestRenderAll()
          },

          // onComplete : function(){
          //   cursor1.set({'left': 'this.currentPoint.x - 20', 'top' : 'this.currentPoint.y - 20',})
          // },


    canvas.requestRenderAll()

  },

  created() {


  },

  methods : {
    select : function (){
      this.isSelected = !this.isSelected
    },

    changeSelection : function(event){
      if (event.deltaY<0){
        this.selectedClimbRate = Math.min(this.selectedClimbRate+100, this.climbPerf.rate)
      }
      else {
        this.selectedClimbRate = Math.max(this.selectedClimbRate-100, 0)
      }

    },

    computedHpTrans : function (law) {
      if (law){
        console.log( Math.floor(HpTrans(knotToMs(law.speed), law.mach)/100))
        return Math.floor(HpTrans(knotToMs(law.speed), law.mach)/100)

      }
      else return 290
    },

    computedHeightScale : function (FL) {
      return (FL-this.minFL)/(this.maxFL - this.minFL)*200+15+"px"
    },
  },

  computed: {
    speedRangeAtZero : function (){
      return range(0)
    },

    displayedSpeed : function (){
      if (this.FLinput>this.computedHpTrans(this.law)){
        return Math.round(getPlaneMach(this.FLinput, this.speed)*100) / 100
      }
      else return this.speed
    },

    minSpeed : function (){
      return range(this.FLinput).minSpeed
    },

    maxSpeed : function (){
      return range(this.FLinput).maxSpeed
    },

    sliderWidthInPx : function (){
      return 400*(range(this.FLinput).maxSpeed-range(this.FLinput).minSpeed)/(this.speedRangeAtZero.maxSpeed -this.speedRangeAtZero.minSpeed)
    },

    sliderMarginLeftInPx : function (){
      return 400*(range(this.FLinput).minSpeed-this.speedRangeAtZero.minSpeed)/(this.speedRangeAtZero.maxSpeed -this.speedRangeAtZero.minSpeed)
    },

    climbPerf: function () {
      if (this.checked){
        console.log("hi")
        return calcPerf(this.FLinput, this.law, this.speed)
      }
      else return calcPerf(this.FLinput, "", this.speed)
    },

    computedHeight : function () {
      return (this.maxFLROCD-60)/350*200+"px"
    },

    computedHeight2 : function () {
      return (this.climbPerf.absoluteMaxFL-60)/350*200 - (this.climbPerf.maxFL-60)/350*200 - 2 +"px"
    },

    computedBottom : function () {
      return (this.climbPerf.maxFL-60)/350*200 + 34 +"px"
    },

    maxFLROCD : function (){
      return maxFLAtROCD(this.FLinput, this.speed, this.law, this.selectedClimbRate/197)
    },

    descentPerf: function () {
      return calcPerfbis(this.FLinput, this.law, this.speed)
    },

    speedRange: function () {
      return speedRange(this.FLinput)
    },
  }
}


</script>

<style scoped>


@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

#perf{
  display: none;
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
  background: #353a40;
  border: 1px solid rgba(101, 143, 206, 0);
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #658fce;
  cursor: pointer;
}

.unit-selector.selected {
  /*width: 50px;*/
  margin-left: 5px;
  border-radius: 50px;
  border: 1px solid #658fce;
  background: #222428;
  height: 18px;
  font-size: 11px;
  font-weight: bold;
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 4px;
  color: #658fce;
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
  font-weight: 400;
  color: #c0aea9;
  font-size: 15px;
}

.infoboxTypeValue {
  margin-top: 5px;
  display: flex;
  text-align: right;
  padding-right: 15px;
  flex-direction: column;
  font-family: "Product Sans", sans-serif;
  font-weight: 600;
  font-size: 13px;
  color: #d1836b;
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
  background: linear-gradient(45deg, rgba(72, 55, 48, 1) -0%, rgba(166, 98, 77, 1) 110%);
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
  color: rgba(166, 98, 77, 1);
}

.information-box.information-box--blue.information-box--active .color-text {
  color: rgb(86, 124, 176);
}

.information-box.information-box--blue.information-box--active .flight-state-value {
  color: rgb(86, 124, 176);
}

.information-box.information-box--brown.information-box--active .flight-state-value {
  color: rgba(166, 98, 77, 1);
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
  /*border: #2f7fff 1px solid;*/
  top : 40px;
  margin: 60px;
  width: 210px;
  height: 115px;
}

.box__label{
  right: 0px;
  padding-right: 15px;
  padding-top: 15px;
  position: absolute;
  color: rgba(38,42,46,1);
  font-weight: bold;
}

.box__control-container{
  display: flex;
  position: absolute;
  bottom: 15px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  justify-content: space-around;
}

.control{
  background: rgba(38,42,46,1);
  color: rgba(168,98,77,1);
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

.box__container{
  background: linear-gradient(45deg, rgba(72, 55, 48, 1) -0%, rgba(166, 98, 77, 1) 110%);
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  width: calc(100% - 10px);
  border-radius: 14px;
  margin: 5px;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transform: translateY(-10px);
}

.box__border{
  width: 100%;
  height: 100%;
  border-radius: 14px;
  filter: ;
  border: #282828 1px solid;
}

.content-container{
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
}

.frame-container{
  position: relative;
  padding-top: 104px;
  /*width: 100%;*/
  box-sizing: border-box;
  height: 100%;
  flex: 1 1 auto;
}

.sideBar{
  /*flex: 0 0 auto;*/
}

.footer{
  position: absolute;
  bottom: 0;
  display: flex;
}

.slider-background{
  background: #5f303d;
  position: relative;
  margin-top: 15px;
  width: 400px;
  border-radius: 30px;
  height: 2px;
}

.speed-slider{
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

.speed.slidecontainer{
  margin: 0;
  position: absolute;
  top: 3px;
  height: 100%;
  z-index: 999;
}

.content-container__app-button-container{

  display: flex;
  margin-top: 20px;
  width: 100%;
  padding: 20px;
}

.law-edit {
  width: 300px;
  margin-right: 20px;
  margin-top: 40px;
}

.law-edit{
  margin-top: 40px;
  width: 300px;
  height: 50px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-radius: 30px;
  background: #493630;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 2px 1px;
}

.law-edit:hover{
  background: #6d5449;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 10px 1px;
}

.law-edit-box span {
  color: #d09e7f;

  padding-right: 20px;
  padding-top : 14px;
}

.law-edit img{
  margin:13px;
  filter: invert(97%) sepia(97%) saturate(2849%) hue-rotate(297deg) brightness(92%) contrast(80%);
  height: 24px;
}

.bar1{
  width: 2px;
  height: 150px;
  z-index: 99;
  position: absolute;
  bottom: 32px;
  background: #86b3d5;
  transition: all 0.5s ease-in-out;
}

.text1{
  position: absolute;
  left : -40px;
  font-size: 12px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  transition: all 0.5s ease-in-out;
}

.text2{
  left : -40px;
  font-size: 12px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  position: absolute;
  transition: all 0.5s ease-in-out;
}

.bar2{
  width: 2px;
  height: 150px;
  position: absolute;
  bottom: 32px;
  transition: all 0.5s ease-in-out;
  background: #713a43;
}

.bar3{
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
.speed input[type=range]{
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
#page{
  width: 100%;
  position: relative;
  height: 100%
}

.sideBar{
  /*position: absolute;*/
  width: 320px;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  border-left: 1px solid #3c3c3c;
  background: rgba(40, 43, 51, 0.99);
  /*top:0;*/
  height: 100%;
  display: flex;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-around;
  flex-direction: column;
  /*right: 0px;*/
}

.current-frame{
  position: absolute;
  /*margin: 20px;*/
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  width: calc(100% - 40px);
  /*top: 0%;*/
  height: max-content;
  /*position: relative;*/
  /*left: 1%;*/
  /*background: rgba(10,10,10,0.1);*/
  border:1px solid rgba(169, 163, 163, 0.001);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: inherit;
}

#flightProfile{
  /*display: none;*/
  height: calc(100% - 104px);
  width: 100%;
}


.frame__title{
  position: relative;
  /*border: #2f7fff 1px solid;*/
  height: 60px;
  display: flex;
}

.frame__icon-title{
  position: relative;
  height: 100%;
  width: 60px;
  /*display: inline;*/
}

.frame__text-title{
  /*display: inline;*/
  padding-top: 20px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
}

.frame__icon-title img{
  position: relative;
  margin: 15px;
  height: 30px;
  width: 30px;
}


.frame__content{
  height: 100%;
  width: 100%;
  position: relative;

  /*border: #2f7fff 1px solid;*/
  justify-content: space-between;
}

canvas{
  background: rgba(1,1,1,0.001);
  box-sizing: border-box;
  /*border : 1px blue solid;*/
  height: 100%;
  width: 100%;
}

.section{
  /*border: #5ee187 1px solid;*/
}

.section.fl{
  position: relative;
  width: 60px;
  height: auto;
}

.section.value{
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

.stopbar-container{
  display: flex;
  width: 400px;
  top :-20px;
  justify-content: space-between;
  position: absolute;
  left:0;
}

.information__value.speed-value {
  position: relative;

  width: 100px;
}

.min {
  height: 20px;
  width : 50px;
  border: 1px solid rgba(200,200,200,0.3);
}
.max {
  height: 20px;
  width : 50px;
  border: 1px solid rgba(200,200,200,0.3);
}

.information{
  width: 100%;
  margin-bottom: 50px;
  margin-top: 20px;
  height: max-content;
  flex-direction: column;
  /*background: rgba(0,0,0,0.1);*/
  display: flex;
}

.information__general{
  display: flex;
  /*justify-content: space-around;*/
  padding-top: 20px;
}

.information__general.speed{
  align-content: center;
}

.information-container{
  display: flex;
  position: relative;
}

.information__content{
  position: relative;
  margin-right: 15px;
  background: #35373f;
  border-radius: 4px;
  height: 35px;
  width: min-content;
  display: flex;
  align-content: center;
}

.information__content.active{
  border: #2f7fff 1px solid;
}

.information__content .information__value.selectedValue{
  opacity: 0;
}

.information__content.active .information__value.selectedValue{
  position: relative;
  opacity: 1;
  top : 0px;
}


.information__content.active .information__value{
  position: relative;
  top : -30px;
}

.information__label{
  position: relative;
  height: 100%;
  width:200px;
  box-sizing: border-box;
  padding-left: 10px;
  padding-top:  7px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  color: #D59D84;
  /*background: #d1836b;*/
}

.information__content:hover .information__label{
  color : #98b9ed;
}

.information__content:hover .information__value{
  color : #98b9ed;
  background: #2b2d33;
  border: 1px solid #98b9ed;
}

.information__content:hover img {
  filter :  invert(82%) sepia(5%) saturate(5587%) hue-rotate(183deg) brightness(97%) contrast(91%);
}

.information__title{
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  font-size: 11px;
}

.information__content img{
  filter: invert(97%) sepia(97%) saturate(2849%) hue-rotate(297deg) brightness(92%) contrast(80%);
  height: 20px;
  width: 20px;
  margin: 8px;
}

.information__value__contener{
  width : 400px;
  position: absolute;
  display: flex;
  font-size: 10px;
  justify-content: space-between;
}

.information__value{
  cursor: pointer;
  height: 100%;
  padding-left: 10px;
  border-radius: 4px;
  padding-top: 7px;
  box-sizing: border-box;
  border: 1px solid rgba(0,0,0,0);
  color : #212328;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  width:110px;
  background: #D59D84;
}

.information__value:hover{
  width: 120px;
  background: #c79179;
}



.gauge{
  width: 200px;
  background: #4e535e;}

.stopbar{
  width: 2px;
  background: #2b2d33;
}

.information__context{
  position: absolute;
  right: 0px;
  font-weight: bold;
  font-size: 12px;
  bottom: -20px;
}

.misc{
  border-radius: 8px;
  background: rgb(33, 33, 39);
  border-left: 8px solid rgba(223, 122, 91, 1);
  height: 80px;
}

.misc p{
  width: 90%;
  margin: 5%;
  font-style: italic;
  letter-spacing: 0px;
  color: #abb2c0;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
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


.lower-frame{
  bottom: 0px;
  position: absolute;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  width: 72%;
  /*top: 15%;*/
  height: 6%;
  left: 1%;
  background: #282b33;
  border-radius: 30px 30px 0 0 ;
}

.charac{
  height: 250px;
  border-radius: 8px;
  background: rgb(33, 33, 39);
  /*box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;*/
  width: 80%;
}

.description{
  display: flex;
  padding-right: 20px;
  text-align: right;
  flex-direction: column;
}

.actype{
  width: 50px;
  font-size: 10px;
  display: inline;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;

}

.charac .description h2{
  font-size: 15px;
  line-height: 15px;
  color: #d1836b;
  margin: 0;
  padding: 0;
}

.charac .description p{
  font-size: 12px;
  margin-top: 5px;
  line-height: 15px;
}

.type h2{
  font-size: 15px;
  line-height: 15px;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
}

.type p{
  font-size: 12px;
  margin-top: 5px;
  color: #1a1a1a;
  line-height: 15px;
}


.charac img{
  margin-left: 5px;
  width: 50px;
  height: 50px;
}

.type{
  height: 130px;
  padding-top: 20px;
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  background: linear-gradient(237deg, rgba(48, 48, 48, 1) -30%, rgba(223, 122, 91, 1) 150%);
  border-radius: 8px;
  /*background: #aeb9d5;*/
}

.picture{
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  width: auto;
  overflow: hidden;
  height: 180px;
  border-radius: 8px;
  /*background: #6480ca;*/
}

.name{
  font-family: "Product Sans", sans-serif;
  color: #9da6ba;
  font-size: 30px;
}

.bar{
  width: 5px;
  /*display: inline;*/
  height: 20px;
  margin : 3px;
  margin-left:5px;
  background: #ca8364;
  border-radius: 20px;
}

.picture img{
  width: 100%;
}

.header{
  display: flex;
  width: max-content;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 5px;
}

.lower-header{
  width: auto;
  display: flex;
  justify-content: space-between;
}

.ICAO-code{
  color : #4b4e56;
  margin-left: 50px;
  /*margin-bottom: 20px;*/
  top:0;
  /*position: absolute;*/
  font-size: 20px;
  line-height: 25px;
  /*padding-bottom: 5px;*/
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  /*display: inline*/
}

.presentation{
  /*height: 500px;*/
}


.nav-bar{
  display: flex;
  color: #6f747f;
  justify-content: space-around;
  box-sizing: border-box;
  /*border: 2px #ff2525 solid;*/
  width: 60%;
  left : 10%;
  z-index: 100;
  margin-top:20px;
  position: absolute;
  height: 64px;
  font-size: 22px;
}

.nav-bar .nav-button{
  padding-top: 20px;
  cursor: pointer;
}

.nav-button.active{
  color: #ba7b5e;
}

.select-bar{
  background: #ba7b5e;
  position: absolute;
  bottom: 10px;
  left:40px;
  width: 60px;
  height: 2px;
}


.searchbar-container{
  position: relative;
  margin-right: 20px;
}

#searchbar {
  transition: all 0.7s ease-in-out;
  position: relative;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 0px 1px 1px;
  /*width: 500px;*/
  height: 60px;
  overflow: hidden;
  border: 1px solid #3c3c3c;
  background: rgba(40, 43, 51, 0.99);
  /*display: inline;*/
  width: min-content;
  display: flex;
  z-index: 400;
  border-radius: 16px;
}

#searchbar input {
  position: relative;
  border: none;
  background: none;
  color: #979696;
  font-family: inherit;
  font-size: inherit;
  /*font-weight: bold;*/
  box-sizing: border-box;
  outline: none;
  padding-left: 40px;
  /*display: inline;*/

  width: 400px;

  /*border-radius: 60px;*/
  height: 60px;
  font-size: 20px;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
}

.search-icon {
  position: relative;
  width: 60px;
  height: 60px;
  /*display: inline;*/
  cursor: pointer;
}


.search-icon img {
  width: 30px;
  height: 30px;
  margin: 15px;
  filter: invert(55%);
  /*display: inline;*/
  cursor: pointer;
}

.wrapper {
  margin: 0;
  position: absolute;
  top: 0;
  list-style: none;
  display: flex;
  /*z-index: 1000;*/
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  transition: all 0.7s ease-in-out;
  width: 400px;
  height: auto;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 8px 8px 8px 8px;
  overflow: hidden;
  background: #2B2F37;
  padding-top: 60px;
  padding-left: 0;
}

.card {
  font-size: 20px;
  color: #afafaf;
  font-family: inherit;
  /*font-size: inherit;*/
  /*font-weight: bold;*/
  box-sizing: border-box;
  /*outline: none;*/
  padding-top: 20px;
  cursor: pointer;
  padding-left: 40px;
  /*background: #2B2F37;*/
  /*box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;*/
  width: 560px;
  height: 60px;
  /*transition: .3s all ease-in-out;*/

}

.card:hover {
  background: #292b32;
}

.card .text-container {
  display: flex;
}

.card p, .card h1 {
  font-size: 20px;
  color: #808080;
  padding: 0;
  margin: 0;

}

.card .highlight {
  color: #afafaf;
}

</style>
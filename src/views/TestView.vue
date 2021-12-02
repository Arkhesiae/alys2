<template>
  <div id="page">
    <div class="content-container">
<!--      <router-view class="plane-view" :coefficient="aircraftCoef"></router-view>-->
      <router-view :coefficient="coefficient"/>

      <transition name="side-in" appear>
        <SideBar></SideBar>
      </transition>

    </div>

  </div>
</template>
<!--<script src=></script>-->
<script>


// import MenuButton from "@/components/MenuButton"
// import Background from "@/components/Background"
import {calcPerf, speedRange} from "@/BADA/perfomanceFile"
import {calcPerfbis} from "@/BADA/perfomanceFile"
import AppButton from "@/components/appButton"
import {_getPhotoByQueryANET, HpTrans, knotToMs} from "../BADA/func";
import {flightProfile, getPlaneMach, maxFLAtROCD, range} from "../BADA/perfomanceFile";
require('fabric')

export default {
  name: "TestView",
  components: {
    SideBar,
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
    console.log(_getPhotoByQueryANET('A320'))
    let slider = document.getElementById("myRange");
    let output = document.getElementById("fl-value");
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
    console.log(group)
    canvas.on("mouse:out", (event) => {
      console.log(event.nextTarget)

      if ((event.target === this.pointObject || event.target === cursor2 || event.target === cursor1) && (!group.includes(event.nextTarget))) {
        if (HOVER && !GRABBING) {
          console.log("MOUSE OUT")
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

<style>

</style>

<style scoped>

* {
  user-select: none;
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

.nav-bar {
  width: calc(100% - 360px) !important;
}

.add-point {
  right: 0;
  bottom: 0;
  position: absolute;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;

}

.add-box {
  width: 48px;
  height: 48px;
  border-radius: 48px;
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

@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

.content-container{
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
}

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



</style>
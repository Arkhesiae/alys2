<template>
  <div class="sideBar">
    <div class="ctn-all">
      <div class="picture">
        <img alt="" :src="this.imageURL"/>
<!--        <span>{{imageRef.imageIDs[0]}}</span>-->
<!--        <img src="../assets/images/{{ ref.imageIDs[0]}}jpg"/>-->
      </div>
      <div class="content">
<!--        <div class="engine">-->
<!--          <img :src="this.imageSVG"/>-->
<!--          <div class="engine-number">{{ coefficient.acTypeData.numberOfEngines }}</div>-->
<!--          <div class="engine-description">{{ coefficient.acTypeData.engineType.toLowerCase() }}</div>-->
<!--          <div class="wake-turbulence">{{ coefficient.acTypeData.wakeTurbulenceCategory.slice(0,1) }}</div>-->
<!--        </div>-->
<!--        <div class="presentation">-->

<!--          <div class="header">-->
<!--            <div class="name">{{ aircraft.aircraftModel }}</div>-->
<!--            <div class="lower-header">-->
<!--              <div class="bar"/>-->
<!--              <div class="ICAO-code">{{ aircraft.ICAO }}</div>-->
<!--            </div>-->
<!--            &lt;!&ndash;            <div class="class-icon"><img src="../assets/jet.svg"/></div>&ndash;&gt;-->
<!--            <div class="menu-option"></div>-->
<!--          </div>-->
<!--        </div>-->
        <PlaneTile  :ICAO="aircraft.ICAO" :name="aircraft.aircraftModel" img=""
                    :manufactuer="aircraft.manufacturer" :engineType="aircraft.engineType" style="height : 80px ; width: 100%"></PlaneTile>
        <div class="container">

          <div class="charac">
            <div class="description">
              <h2>Wing position</h2>
              <p>Low wing</p>
              <h2>Engine position</h2>
              <p>Underwing mounted</p>
              <h2>Tail configuration</h2>
              <p>Regular tail, mid set Landing gear</p>
            </div>
          </div>
        </div>

        <div class="type">
          <div class="description">
            <h2>Information techniques</h2>
            <p>Masses, limitations</p>
          </div>
          <img src="../assets/icons/chevron-right.svg">
        </div>
        <div class="misc">
          <img src="../assets/icons/information-outline.svg"/>
          <p>
            L'Airbus A319 est une version raccourcie de l'A320
          </p>
        </div>
      </div>

    </div>
<!--    <div class="picture">-->
<!--      -->
<!--    </div>-->


  </div>
</template>

<script>
// import {imageData} from "@/BADA/Data/imagesRef"

import PlaneTile from "@/components/Browse/PlaneTile"

export default {
  name: "SideBar",
  props : ["aircraft", "imageRef", "coefficient"],
  components: {PlaneTile},
  data() {
    return {
      icons:
          {
            jet: "jet",
            turboprop: "option2",
            piston: "piston"
          },
    }
  },
  beforeMount() {
    console.log(this.coefficient)
    this.icon = this.icons[this.coefficient.acTypeData.engineType.toLowerCase()]
      // console.log('@/assets/images/'+this.imageRef.imageIDs[0].toString()+'.jpg')
  },
  computed : {
    imageID : function (){
      if (this.imageRef){
        return this.imageRef.imageIDs[0].toString()
      }
      else return ""
    },

    imageSVG : function (){
      try {
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/icons/' + this.icon + '.svg')
        return url
      }
      catch (e) {
        console.log('No Image')
        console.log(e)
        return ""
      }
      // return  ""
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
        return ""
      }
      // return  ""
    },
  }
}
</script>

<style scoped>
.sideBar {
  /*position: absolute;*/
  width: 320px;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  /*border-left: 1px solid rgba(60, 60, 60, 0.07);*/
  background: rgba(29, 28, 30, 1);
  /*background-size: auto 100%;*/
  /*top:0;*/
  height: 100%;
  /*overflow: hidden;*/
  display: flex;
  /*padding-top: 50px;*/
  /*padding: 20px;*/
  box-sizing: border-box;
  justify-content: space-between;
  flex-direction: column;
  /*right: 0px;*/
}


.misc {
  position: relative;
  border-radius: 8px;
  background: rgb(33, 33, 39);
  background: linear-gradient(45deg, rgba(45,49,60,1) 0%, rgba(65,72,88,1) 100%);
  box-shadow: rgba(5, 5, 5, 0.2) 0px 10px 15px 2px;
  height: 80px;
}

.misc p {
  width: 90%;
  box-sizing: border-box;
  margin: 20px;
  padding-left: 40px;
  font-style: italic;
  letter-spacing: 0px;
  color: #abb2c0;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
}

.misc img{
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  width: 20px;
  filter: invert(70%);
}

.container{
  display: flex;
  align-items: center;
  flex-direction: column;
}

.charac {
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  align-self: center;
  border-radius: 8px;
  background: linear-gradient(45deg, rgb(88, 65, 80) 0%, rgb(88, 65, 80) 100%);
  /*box-shadow: rgba(5, 5, 5, 0.052) 0px 10px 15px 2px;*/
  width: 100%;
}

.engine{
  /*align-self: center;*/
  position: absolute;
  top:-15px;
  margin-left: 5%;
  height: 40px;
  margin-bottom: 10px;
  /*margin-right: 10px;*/
  backdrop-filter: blur(5px);
  justify-content: space-between;
  display: flex;
  border-radius: 8px;
  background: linear-gradient(45deg, rgba(59, 53, 62, 0.9) 0%, rgb(51, 48, 50) 100%);
  box-shadow: rgba(5, 5, 5, 0.07) 0px 10px 15px 2px;
  width: 80%;
}

.engine .wake-turbulence{
  width: 30px;
  margin: 5px;
  box-sizing: border-box;
  text-align: center;
  padding-top: 8px;
  font-weight: bold;
  color: #202020;
  font-size: 13px;

  height: 30px;
  border-radius: 30px;
  background:linear-gradient(45deg, rgb(166, 155, 195) 0%, rgb(190, 167, 182) 100%); ;

}

.engine .engine-number{
  position: absolute;
  font-weight: 900;
  font-family: Arial;
  left : 22px;
  text-shadow: black 0 0 5px;
  width: 10px;
  height: 10px;
  border-radius: 4px;
  /*background: #9da6ba;*/
  font-size: 9px;
  top : 13px;
  color: #ffffff;
}

.engine-description{
  margin-right: 10px;
  font-weight: bold;
  text-transform: capitalize;
  padding-top: 11px;
  font-size: 14Px;
  flex: 1 1 auto;
  margin-left: 10px;
  text-align: left;
  color: #a99bb5;
}

.engine img{
  margin: 5px;
  filter: invert(71%) sepia(20%) saturate(641%) hue-rotate(220deg) brightness(82%) contrast(88%);
  margin-left: 10px;
  width: 30px;
  height: 30px;
}

.charac, .misc{
  background: linear-gradient(45deg, rgb(46, 42, 43) 0%, rgb(46, 42, 44) 100%);
  box-shadow: rgba(5, 5, 5, 0.05) 0px 10px 15px 2px;
}

.charac .description{
  /*margin-top: 20px;*/

  /*margin-bottom: 20px;*/
}

.description {
  display: flex;

  padding-right: 20px;
  text-align: right;
  flex-direction: column;
}

.actype {
  width: 50px;
  font-size: 10px;
  display: inline;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
}

.charac .description h2 {
  font-size: 15px;
  line-height: 15px;
  color: #b7a5d3;
  margin: 0;
  padding: 0;
}

.charac .description p {
  font-size: 12px;
  margin-top: 5px;
  color: #9e8fa1;
  line-height: 15px;
}

.type h2 {
  font-size: 15px;
  line-height: 15px;
  color: #36333a;
  margin: 0;
  padding: 0;
}

.type p {
  font-size: 12px;
  margin-top: 2px;
  /*font-weight: bold;*/
  color: #413d3d;
  line-height: 12px;
}


.charac img {
  margin-left: 5px;
  width: 50px;
  height: 50px;
}

.type {
  justify-content: space-between;
  display: flex;
  height: 60px;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 8px 8px 2px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  background: linear-gradient(237deg, rgb(146, 141, 164) -30%, rgb(206, 178, 248) 150%);
  border-radius: 8px;
}

.type .description{
  padding-top: 13px;
  padding-left: 15px;
  text-align: left;
}

.type img{
  filter: invert(10%);
  margin-right: 10px;
  align-self: center;
}

.ctn-all{
  display: flex;
  height: 100%;
  flex-direction: column;
}

.content{
  /*background: white;*/
  border-radius: 16px;
  position: relative;
  margin-top: -20px;
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  background: rgba(29, 28, 30, 1);
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
}

.picture {
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  width: 100%;
  height: auto;
  overflow: hidden;
  /*height: 180px;*/
  border-radius: 16px 16px 0 0 ;
}

.picture img {
  width: 100%;
  height: auto;
  min-height: 65px;
  max-height: 500px;
  /*max-width: 100%;*/
  display: block;
}

.name {
  /*max-width: 200px;*/
  text-align: right;
  align-self: center;
  font-size: 15px;
  letter-spacing: 3px;
  font-weight: bold;
  font-family: "Product Sans", sans-serif;
  color: #a39dba;
}

.bar {
  width: 2px;
  height: 24px;
  margin: 3px;
  margin-left: 5px;
  background: #ecccf6;
  border-radius: 20px;
}



.header {
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 20px;
  width: max-content;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 5px;
}

.class-icon{
  width: 40px;
  border-radius: 40px;
  background: #3b3e48;
  box-shadow: #232323 0px 5px 5px 0px;
  height: 40px;
}

.lower-header {
  width: auto;
  display: flex;
  justify-content: space-between;
}

.ICAO-code {
  color: #b0b7c8;
  align-self: center;
  margin-left: 10px;
  top: 0;
  font-size: 30px;
  line-height: 25px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
}

.presentation {
  display: flex;
  font-family: "Montserrat";
  flex-direction: column;
}

</style>
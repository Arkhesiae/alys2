<template>
  <div :id=type class="tile">
    <div class="tile-lower-container">
      <img class="rruaa" :src="this.imageURL">
<!--      <div class="tile-title-decoration"></div>-->
      <p>{{type}}</p>
      <img class="rrua" src="@/assets/icons/chevron-right.svg" alt="">
    </div>
<!--    <div class="tile-bubble-container">-->
<!--      <div class="bubble" id="bubble1"></div>-->
<!--      <div class="bubble" id="bubble2"></div>-->
<!--      <div class="bubble" id="bubble3"></div>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: "Tile",
  props : ['type'],

  computed : {
    imageURL : function (){
      let icon = ""
      console.warn(this.type)
      switch (this.type){
        case "Profil de vol":

          icon = "show_chart_black_24dp.svg"
          break
        case "Performances et taux":
          icon = "insert_chart_black_24dp.svg"
          break
      }
      try {
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/icons/' + icon)
        return url
      }
      catch (e) {
        console.log('No Image')
        // console.log(e)
        return ""
      }

      // return  ""
    },
  }
}


</script>

<style scoped>


.rrua{
  filter: invert(11%) sepia(20%) saturate(141%) hue-rotate(250deg) brightness(82%) contrast(88%);
}
.rruaa{
  width: 16px;
  filter: invert(11%) sepia(20%) saturate(141%) hue-rotate(250deg) brightness(82%) contrast(88%);
}


.tile {
  width: 250px;
  height: 42px;
  margin: 20px;
  cursor: pointer;
  border-radius: 12px;
  background: linear-gradient(237deg, rgb(144, 141, 178) -30%, rgb(190, 174, 206) 150%);
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  font-size: 14px;
  letter-spacing: 1px;
  font-family: Roboto,serif;
  /*text-transform: uppercase;*/
  /*font-weight: bold;*/
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  color: rgb(35, 30, 40);

}

.tile:hover {
  box-shadow: rgba(5, 5, 5, 0.4) 0px 2px 2px 0px, rgba(5, 5, 5, 0.3) 0px 2px 20px 4px;
  filter: saturate(100%);
}


#background {
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  background: linear-gradient(237deg, rgba(39, 42, 51, 1) -00%, rgba(30, 30, 36, 1) 50%);
  /*background: linear-gradient(237deg, rgb(88, 76, 67) -100%, rgba(30,30,36,1) 80%);*/
}

.tile-title-decoration {
  width: 62px;
  height: 6px;
  border-radius: 4px;

  background: rgba(30, 30, 36, 1);
}

.tile-lower-container {
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
}

.tile-lower-container p {
  padding-left: 12px;
}
.tile-lower-container p:first-letter {
  text-transform: capitalize;
}


.bubble {
  width: 80px;
  position: absolute;
  height: 80px;
  transition: all 2s ease-in-out;
  opacity: 0.45;
  background-size: 300px;
  border-radius: 2000px;
  animation: 10s linear 1s infinite running slidein;
  background: linear-gradient(237deg, rgb(184, 113, 89) 00%, rgba(48, 48, 48, 0) 100%);
  /*background: linear-gradient(237deg, rgba(48,48,48,0) 00%, rgb(184, 113, 89) 100%);*/
}

#static .bubble {
  animation: 10s linear 0s infinite running pulsating;
}

#static #bubble1 {
  animation-delay: 1s;
}

#static #bubble2 {
  animation-delay: 2s;
}

#static #bubble1 {
  bottom: -80px;
  left: -75px;
  width: 200px;
  height: 200px;
  filter: blur(1px);
}

#static #bubble2 {
  top: -20px;
  right: 25px;
  filter: blur(1px);
}

#static #bubble3 {
  bottom: -10px;
  right: 40px;
  filter: blur(3px);
}

#dynamic .bubble {
  height: 20px;
}

#dynamic #bubble1 {
  top: 60px;
  left: 25px;
  filter: blur(3px);
  width: 175px;

}

#dynamic #bubble2 {
  top: 25px;
  left: -45px;
  width: 175px;

}

#dynamic #bubble3 {
  top: 10px;
  left: -15px;
  width: 175px;
  filter: blur(1px);
}

#dynamic #bubble1 {
  animation-delay: 0.5s;
}

#dynamic #bubble2 {
  animation-delay: 1s;
}


#dynamic .bubble {
  -webkit-mask-image: linear-gradient(-75deg, rgba(0, 0, 0, .6) 30%, #000 50%, rgba(0, 0, 0, .6) 70%);
  -webkit-mask-size: 200%;
  animation: shine 4s infinite ease, fadeIn 0s;
  transition: all 1s ease;
}

@-webkit-keyframes shine {
  0% {
    -webkit-mask-position: 150%;
    transform: translateX(0px);
  }
  50% {
    transform: translateX(4px);
  }
  100% {
    -webkit-mask-position: -50%;
    transform: translateX(0px);
  }
}


#dynamic {
  filter: hue-rotate(220deg) saturate(50%) brightness(70%);
}




@keyframes pulsating {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }

}
</style>
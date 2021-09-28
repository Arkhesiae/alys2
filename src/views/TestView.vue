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
        <div class="current-frame frame">
<!--          <div class = "switch"></div>-->
          <div class="frame__title">
            <div class="frame__icon-title">
              <img src="../assets/insert_chart_black_24dp.svg" alt=""/>
            </div>
            <span class="frame__text-title">Expected Performances</span>
          </div>
          <div class="frame__content">
            <div class="section value">
              <div class="information">
                <span class="information__title">RATES</span>
                <div class="information__general">
                  <div class="information__content">
                    <img src="../assets/vertical_align_top_black_24dp.svg"/>
                    <span class="information__label">Rate of Climb</span>
                    <div class="information__value">{{climbPerf.rate}} ft/min</div>
                    <div class="information__context">Vy : {{climbPerf.speed}} kts FLmax : {{climbPerf.maxFL}}</div>
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
                <div class="information__general">
                  <div class="information__content">
                    <img src="../assets/vertical_align_top_black_24dp.svg"/>
                    <span class="information__label">Speed range</span>
                    <div class="information__value__contener">
                      <span class="information__value speed-value">{{speedRange.minSpeed}}</span>
                      <span class="information__value speed-value">{{speedRange.maxSpeed}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section fl">
              <div class="text1" v-bind:style="{ bottom: computedHeight }">{{climbPerf.maxFL}}</div>
              <div class="bar1" v-bind:style="{ height: computedHeight }"></div>
              <div class="text2" v-bind:style="{ bottom: computedBottom }">{{climbPerf.absoluteMaxFL}}</div>
              <div class="bar2" v-bind:style="{ height: computedHeight2 , bottom : computedBottom }"></div>
              <div id="fl-value">FL{{this.FLinput}}</div>
              <div class="slidecontainer">
                <input type="range" min="60" max="410" step="10" class="slider" orient="vertical" id="myRange" v-model="FLinput">
              </div>
            </div>
          </div>
        </div>
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

<script>

import MenuButton from "@/components/MenuButton"
import Background from "@/components/Background"
import {calcPerf, speedRange} from "@/BADA/perfomanceFile"
import {calcPerfbis} from "@/BADA/perfomanceFile"
import AppButton from "@/components/appButton"

export default {
  name: "TestView",
  components: {
    AppButton,
    MenuButton,
    Background,
  },

  data() {
    return {
      // climbROCD: 0,
      FLinput: 0,
    }
  },

  mounted() {
    let slider = document.getElementById("myRange");
    let output = document.getElementById("fl-value");
    output.innerHTML = slider.value; // Display the default slider value

    // slider.oninput = function() {
    //   // this.climbROCD = calcPerf(FLInput)
    //   // console.log(this.climbROCD)
    //   output.innerHTML = "FL" ;
    // }
  },

  computed: {
    computedHeight : function () {
      return (calcPerf(this.FLinput).maxFL-60)/350*200+"px"
    },

    computedHeight2 : function () {
      return (calcPerf(this.FLinput).absoluteMaxFL-60)/350*200 - (calcPerf(this.FLinput).maxFL-60)/350*200 - 2 +"px"
    },

    computedBottom : function () {
      return (calcPerf(this.FLinput).maxFL-60)/350*200 + 34 +"px"
    },

    climbPerf: function () {
      return calcPerf(this.FLinput)
    },
    descentPerf: function () {
      return calcPerfbis(this.FLinput)
    },
    speedRange: function () {
      return speedRange(this.FLinput)
    },
  }
}


</script>

<style scoped>

.content-container{
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
}

.frame-container{
  position: relative;
  flex: 1 1 auto;
}

.sideBar{
  /*flex: 0 0 auto;*/
}

.slidecontainer {
  display: inline-block;
  width: 20px;
  padding: 0;
  margin: 15px;
  height: 90%;
  /*width: 100%; !* Width of the outside container *!*/
}

.content-container__app-button-container{
  display: flex;
  margin-top: 20px;
  width: 100%;
  padding: 20px;

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


/* The slider itself */
input[type=range] {
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
  width: 380px;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  /*top:0;*/
  height: 100%;
  display: flex;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-around;
  flex-direction: column;
  background: #282b33;
  /*right: 0px;*/
}

.current-frame{
  /*position: absolute;*/
  margin: 0px auto auto;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  width: calc(100% - 40px);
  /*top: 15%;*/
  height: max-content;
  position: relative;
  /*left: 1%;*/
  /*background: rgba(10,10,10,0.1);*/
  border:1px solid rgba(169, 163, 163, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: inherit;
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
  position: relative;
  display: flex;
  /*border: #2f7fff 1px solid;*/
  justify-content: space-between;
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

.information__content{
  position: relative;
  margin-right: 15px;
  background: #35373f;
  border-radius: 4px;
  height: 35px;
  width: min-content;
  display: flex;
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
  width : 210px;
  display: flex;
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

.information__value.speed-value {
  width: 90px;
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
}

#searchbar {
  transition: all 0.7s ease-in-out;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;*/
  /*width: 500px;*/
  height: 60px;
  overflow: hidden;
  background: #A4A8B1;
  /*display: inline;*/
  width: min-content;
  display: flex;
  z-index: 400;
  border-radius: 8px;
}

#searchbar input {
  position: relative;
  border: none;
  background: none;
  color: #4f4e4e;
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
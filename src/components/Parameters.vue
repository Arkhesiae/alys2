<template>



  <div class="params-container">
    <div class="params-title">
      <span>Paramètres avancés</span>
    </div>
    <div class="params-close" @click="close()">
      <img src="../assets/icons/clear_black_24dp.svg">
    </div>
    <div class="params">
    </div>
    <div class="params-picker-container">

      <div class="params-box">
        <div class="picker-label">
          Mass
        </div>

        <div class="params-content">
          <div class="slider-container">
            <input type="range" :min="(4*parseFloat(this.mass.minimumMass)+parseFloat(this.mass.referenceMass))/5"
                   :max="parseFloat(this.mass.maximumMass)"
                   v-bind:style="{  }"
                   step="10" class="slider" v-model="selectedMass">
          </div>
          <div class="visual">
            <div class="cursor" v-bind:style="{ width: (selectedMass) / this.mass.maximumMass * 100 + '%' }"></div>
          </div>
          <div class="selectedMass">
            <span>{{ selectedMass + " kg" }}</span>
          </div>
        </div>


      </div>
      <div class="params-box">
        <div class="picker-label">
          ISA deviation
        </div>
        <div class="params-content">
          <div class="slider-container">
            <input type="range" :min=-20 :max=20
                   v-bind:style="{  }"
                   step="1" class="slider" v-model="selectedISADev">
          </div>
          <div class="value-holder">
            <span class="value-param">{{ parseInt(selectedISADev) }}</span>
            <span class="unit">°C</span>

          </div>
        </div>
      </div>
      <div class="params-box">
        <div class="picker-label">
          QNH
        </div>
        <div class="params-content">
          <div class="slide-container">
            <input type="range" :min="950" :max="1050"
                   v-bind:style="{  }"
                   step="1" class="slider" v-model="selectedQNH">
          </div>
          <div class="value-holder">
            <span class="value-param">{{ parseInt(selectedQNH) }}</span>
            <span class="unit">hPa</span>
<!--            <span>{{ (parseInt(selectedQNH)) + "hPa" }}</span>-->
          </div>
        </div>


      </div>
      <div class="std-button-box">
        <span>Reset to standard parameters</span>
      </div>
      <div class="ctn-button">
        <div class="btn no" @click="close()">
          <span class="btn-label">Annuler</span>
          <!--        <img src="../assets/icons/check.svg">-->
        </div>
        <div class="btn yes" @click="passParams()">
          <span class="btn-label">Définir</span>
          <!--        <img src="../assets/icons/check.svg">-->
        </div>
      </div>
    </div>
  </div>
<!--  </transition>-->
</template>

<script>


export default {
  name: "Parameters",
  props: ["mass"],
  data() {
    return {
      selectedMass: 0,
      selectedISADev: 0,
      selectedQNH: 1013,
    }
  },

  mounted() {
    // eslint-disable-next-line no-unused-vars
    console.log(this.mass)


  },

  methods: {
    close() {
      this.$emit('close', 'someValue')
    },

    passParams() {
      this.close()
      this.$emit('setParams', {mass: this.selectedMass, ISA: this.selectedISADev, QNH: this.selectedQNH})
    },
  },

  computed: {},

}
</script>

<style scoped>
.appear-in-enter-active,
.appear-in-leave-active {
  transition: all 0.6s cubic-bezier(.72, .02, .44, 1.38) 1s;
}

.appear-in-enter-from,
.appear-in-leave-to {
  transition: all 0.6s ease-in-out 1s;
  transform: scale(0.8) translateY(20px);
  opacity: 0;
}


.ctn-button{
  display: flex;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 20px;
  justify-content: space-between;
  height: 30px;
}

.btn{
  margin-left: 10px;
  height: 100%;
  line-height: 100%;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  font-family: Roboto,serif;
  font-size: 12px;
  font-weight: 600;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

.btn-label{
  line-height: 100%;
}

.btn.yes{
  background: #cfc1ef;
  color: #2a2a2a;
}

.btn.no{
  border: 1px solid #3a3a3a;
  background: none;
  color: #bca8dc;
}

.params-content {
  width: 100%;
  padding-top: 20px;
  box-sizing: border-box;
  padding-left: 40px;
  padding-right: 40px;
  justify-content: space-between;
  display: flex;
}

.slider-container {
  width: 70%;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  padding-top: 1px;
  background: rgba(43, 45, 51, 0.007);
  border-radius: 6px;
  box-shadow: rgba(5, 5, 5, 0.01) 0px 10px 15px 2px;
}

.visual {
  height: 30px;
  width: 140px;
  border-radius: 8px;
  background: #2d3241;
  overflow: hidden;
}

.value-holder {
  /*height: 100px;*/
  /*padding-top: 15px;*/
  letter-spacing: 1px;
  padding-left: 15px;
  font-size: 26px;
  color: #d4c9f6;
  font-weight: bold;
  box-sizing: border-box;
  /*width: 120px;*/
  border-radius: 8px;
  /*background: linear-gradient(45deg, rgb(91, 41, 50) -0%, rgb(197, 183, 202) 110%);*/
  overflow: hidden;
}

.value-holder .unit{
  font-size: 16px;
  margin-left: 10px;
  font-weight: bold;
  color: #7a808e;
}


.selectedMass {
  position: absolute;
  right: 105px;
  top: 52px;
  font-size: 12px;
  letter-spacing: 1px;
  color: #191818;
  font-weight: bold;
}

.cursor {
  height: 100%;
  border-radius: 8px;
  width: 100%;
  box-shadow: rgba(5, 5, 5, 0.15) 0px 10px 15px 2px;
  background: linear-gradient(45deg, rgb(66, 60, 67) -0%, rgb(220, 190, 244) 110%);
}

/*input[type=range]::-webkit-slider-runnable-track {*/
/*  height: 2px;*/
/*  border: none;*/
/*  border-radius: 0;*/
/*  background : linear-gradient(45deg, rgb(66, 60, 67) -0%, rgb(199, 148, 241) 110%);  !* supprimé définie sur l'input *!*/
/*}*/

input[type=range] {
  /*transform-origin: center;*/
  width: 100%;
  height: 2px;

  /*margin: 10px;*/

  /*transform: rotateZ(270deg);*/
  /*padding: 0 5px;*/
  /*-webkit-appearance: slider-vertical;  !* Override default CSS styles *!*/
  appearance: none;
  background: #534a6b; /* Grey background */
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
  background: linear-gradient(45deg, rgb(187, 152, 230) -0%, rgb(184, 166, 241) 110%); /* Green background */
  border: 3px #202020 solid;
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  appearance: none;
  width: 16px; /* Set a specific slider handle width */
  height: 16px; /* Slider handle height */
  background: #04AA6D; /* Green background */
  cursor: pointer; /* Cursor on hover */
}


.params-container {
  max-width: 400px;
  height: 450px;
  flex: 1 1 auto;
  margin: 20px;
  /*left: calc(50% - 200px);*/
  /*top: calc(50% - 200px);*/
  z-index: 99999;
  background: #222125;
  box-shadow: rgba(0, 0, 0, 0.42) 0 1px 4px 0px, rgba(0, 0, 0, 0.32) 0 0 20px 4px;
  opacity: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
  position: absolute;
  border-radius: 10px;
}

.params-conjonction {
  margin-top: 10px;
  font-size: 12px;
  font-family: "Roboto", sans-serif;
  position: absolute;
  font-weight: 1000;
  font-size: 8px;
  /*text-transform: uppercase;*/
  left: 0;
  bottom: 0;
  color: #959595;
  margin: 15px;

}

.value {
  font-size: 12px;
  font-weight: 800;
  color: #be89d8;
}


.title {
  font-size: 10px;
  height: 20px;
  display: flex;
  color: #bfc3c8;
}

.title img {
  margin: 2px;
  filter: invert(70%);
}

.title span {
  padding-top: 3px;
  padding-left: 10px;
}

.params-close {
  position: absolute;
  right: 0px;
  border-radius: 20px;
  /*background: #423b4d;*/
  width: 24px;
  height: 24px;
  top: 0px;

  cursor: pointer;
  margin: 20px;
}

.params-close:hover{
  background: #423b4d;
}

.params-close img{
  margin: 3px;
  width: 18px;
  filter: invert(80%);
}

.params-box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.std-button-box {
  position: absolute;
  bottom: 0;
  /*background: #be89d8;*/
  width: 200px;
  height: 20px;
  margin: 15px;
  border-radius: 12px;
  /*margin: 10px;*/
  /*padding-left: 8px;*/
  font-family: "Roboto", sans-serif;

  /*font-weight: bold;*/
  font-size: 14px;
  color: #aea0e8;
}


.validate img {
  margin: 8px;
}

.picker-stopbar {
  position: absolute;
  width: 80px;
  left: 5px;
  top: 50px;
  height: 1px;
  background: #abb1b9;
}

.picker-label {
  /*position: absolute;*/
  /*top:-10px*/
  box-shadow: rgba(5, 5, 5, 0.002) 0px 10px 15px 2px;
  background: linear-gradient(45deg, rgba(127, 111, 130, 0.001) -0%, rgba(199, 148, 241, 0.008) 110%);
  width: max-content;
  padding-left: 20px;
  border-radius: 0 12px 12px 0;
  padding-top: 5px;
  padding-right: 10px;
  font-family: "Product Sans", sans-serif;
  font-weight: 800;
  font-size: 12px;
  /*padding-left: 2px;*/
  color: #a8abb9;
  padding-bottom: 5px;
}


.params-title {
  margin-top: 20px;
  font-size: 14px;
  font-family: "Product Sans", sans-serif;
  /*font-weight: bold;*/
  color: rgba(193, 189, 199, 0.86);
}

.params {
  display: flex;
  font-size: 12px;

  margin-top: 25px;
}


.picker-label.selected {
  color: #c188f6;
}

.param-option.selected span {
  color: #c994f4;

}

.param-option.selected .bar {
  background: #c38def;
}

.param-option span {
  height: 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  box-sizing: border-box;
  padding-left: 30px;
}

.param-option .bar {
  width: 100%;
  position: absolute;
  height: 2px;
  bottom: 0;
  background: #36383f;
}


.params-picker-container {
  width: 100%;
  min-height: 300px;
  margin-top: 10px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /*border: 1px blue solid;*/
}


.validate {
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: rgba(5, 5, 5, 0.4) 0px 1px 3px 0px;
  background: #b1a1dd;
  border-radius: 20px;
  margin: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
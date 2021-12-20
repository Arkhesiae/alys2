<template>
  <div class="law-edit-container">
    <div class="law-edit-title">
      <span>Loi de vitesse</span>
    </div>
    <div class="law-edit-close" @click="close()">
      <img src="../assets/icons/clear_black_24dp.svg">
    </div>
    <div class="params">
      <div class="param-option selected">
        <span>CLIMB</span>
        <div class="bar"></div>
      </div>
      <div class="param-option">
        <span>DESCENT</span>
        <div class="bar"></div>
      </div>
    </div>
    <div class="law-edit-picker-container">

      <div class="law-edit-box">
        <div class="picker-label">
          Speed
        </div>

        <div class="law-edit-picker law-edit-pickerSpeed">

          <div class="picker-stopbar top"></div>
          <div class="picker-stopbar bottom"></div>
          <ul class="figure-list" id="speed">
            <li class="figure" v-bind:key="speed.value" v-for="speed in speedList">{{ speed.value }}</li>
          </ul>

        </div>
      </div>
      <div class="law-edit-box">
        <div class="picker-label">
          Mach number
        </div>
        <div class="law-edit-picker law-edit-pickerMach">

          <div class="picker-stopbar top"></div>
          <div class="picker-stopbar bottom"></div>
          <ul class="figure-list" id="mach">
            <li class="figure" v-bind:key="mach.value" v-for="mach in machList">{{ mach.value }}</li>
          </ul>
        </div>
      </div>

    </div>
    <div class="law-edit-conjonction">
      <span>Altitude de conjonction</span>
      <div class="title">
        <img src="../assets/icons/chart-multiline.svg">
        <span class="value-label">FL</span>
        <span class="value">{{ conjonctionAltitude }}</span>

      </div>

    </div>
    <div class="validate" @click="setCustomSpeedLaw()">
      <img src="../assets/icons/check.svg">
    </div>
  </div>
</template>

<script>


import {HpTrans, knotToMs, msToKnot} from "@/BADA/Misc/func"

export default {
  name: "lawEdit",
  props: ["icon", "speedRange"],
  data() {
    return {
      // speedList: [],
      selectedValue: 0,
      selectedSpeed: 0,
      selectedMach: 0,

      customSpeedLaw : null
    }
  },


  mounted() {
    // eslint-disable-next-line no-unused-vars
    let drag_time = 0




    let figureLists = document.getElementsByClassName('figure-list')

    // var elements = document.getElementsByClassName("classname");

    // var myFunction = function() {
    //   var attribute = this.getAttribute("data-myattribute");
    //   alert(attribute);
    // };


    for (var i = 0; i < figureLists.length; i++) {
      let ref = this
      let list = {
        id: i,
        type : figureLists[i].id,
        listElement: figureLists[i],
        currentCell: 0,
        lastCell: 0,
        mouseDown: false,
        originY: 0,
        deltaY: 0,
        maxIndex: this.maxIndex(figureLists[i].id) - 1
      }

      // console.log(list.maxIndex)

      list.listElement.addEventListener('click', function (event) {
        for (let n = 0; n < list.listElement.children.length; n++) {
          if (list.listElement.children.item(n) === event.target) {
            list.currentCell = n
            list.lastCell = n
            list.listElement.style.transform = 'translateY(' + (-n * 50 + 50) + 'px)'
            for (let n = 0; n < list.listElement.children.length; n++) {
              let distance = Math.abs(n - list.currentCell)
              list.listElement.children.item(n).style.opacity = 1 - distance / 1.2

            }
          }
        }
        ref.setSelectedValue(list.type, list.currentCell)
      }, false);


      list.listElement.addEventListener('mousedown', function (event) {
        list.originY = event.clientY
        list.mouseDown = true
        drag_time = (new Date).getTime();
      })

      // let centerCell
      // let speed = 0
      // let lastClient = 0

      window.addEventListener('mousemove', function (event) {
        list.deltaY = list.originY - event.clientY
        if (list.mouseDown) {
          list.listElement.style.transition = 'all 0s ease'
          list.listElement.style.transform = 'translateY(' + (-list.lastCell * 50 + 50 - list.deltaY) + 'px)'


          list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 50 + 50 - list.deltaY - 50) / 50), 0), list.maxIndex)
          ref.setSelectedValue(list.type, list.currentCell)
          for (let n = 0; n < list.listElement.children.length; n++) {
            let distance = Math.abs(n - list.currentCell)
            list.listElement.children.item(n).style.opacity = 1 - distance / 1.2

          }
        }
      })

      window.addEventListener('mouseup', function (event) {
        if (list.mouseDown) {
          list.deltaY = list.originY - event.clientY
          let duration = ((new Date).getTime() - drag_time);
          let speed = list.deltaY / duration
          list.mouseDown = false
          if (list.deltaY != 0) {
            // centerCell =  -Math.round((-currentSel * 50 + 50 - deltaY - speed * 5 - 50) / 50)
            list.originY = 0
            list.listElement.style.transition = 'all ' + Math.abs(speed / 2) + 's ease-out'
            list.listElement.style.transform = 'translateY(' + (-list.lastCell * 50 + 50 - list.deltaY - speed * 400) + 'px)'
            list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 50 + 50 - list.deltaY - speed * 400 - 50) / 50), 0), list.maxIndex)
            list.listElement.style.transform = 'translateY(' + (-list.currentCell * 50 + 50) + 'px)'
            ref.setSelectedValue(list.type, list.currentCell)
            for (let n = 0; n < list.listElement.children.length; n++) {
              let distance = Math.abs(n - list.currentCell)
              list.listElement.children.item(n).style.opacity = Math.max(1 - distance / 1.2, 0.1)

            }
            list.lastCell = list.currentCell

          }
        }

      })


      list.listElement.addEventListener('touchstart', function (event) {
        // console.log(event.e)
        list.originY = event.touches[0].clientY
        list.mouseDown = true
        drag_time = (new Date).getTime();
      })

      // let centerCell
      // let speed = 0
      // let lastClient = 0
      let lastMove

      window.addEventListener('touchmove', function (event) {

        list.deltaY = list.originY - event.touches[0].clientY
        if (list.mouseDown) {
          list.listElement.style.transition = 'all 0s ease'
          list.listElement.style.transform = 'translateY(' + (-list.lastCell * 50 + 50 - list.deltaY) + 'px)'


          list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 50 + 50 - list.deltaY - 50) / 50), 0), list.maxIndex)
          ref.setSelectedValue(list.type, list.currentCell)
          for (let n = 0; n < list.listElement.children.length; n++) {
            let distance = Math.abs(n - list.currentCell)
            list.listElement.children.item(n).style.opacity = 1 - distance / 1.2

          }
        }
        lastMove = event
      })

      window.addEventListener('touchend', function () {
        if (list.mouseDown) {
          // console.log(event.touches)
          list.deltaY = list.originY - lastMove.touches[0].clientY
          let duration = ((new Date).getTime() - drag_time);
          let speed = list.deltaY / duration
          list.mouseDown = false
          if (list.deltaY != 0) {
            // centerCell =  -Math.round((-currentSel * 50 + 50 - deltaY - speed * 5 - 50) / 50)
            list.originY = 0
            list.listElement.style.transition = 'all ' + Math.abs(speed / 2) + 's ease-out'
            list.listElement.style.transform = 'translateY(' + (-list.lastCell * 50 + 50 - list.deltaY - speed * 400) + 'px)'
            list.currentCell = Math.min(Math.max(-Math.round((-list.lastCell * 50 + 50 - list.deltaY - speed * 400 - 50) / 50), 0), list.maxIndex)
            list.listElement.style.transform = 'translateY(' + (-list.currentCell * 50 + 50) + 'px)'
            ref.setSelectedValue(list.type, list.currentCell)
            for (let n = 0; n < list.listElement.children.length; n++) {
              let distance = Math.abs(n - list.currentCell)
              list.listElement.children.item(n).style.opacity = Math.max(1 - distance / 1.2, 0.1)

            }
            list.lastCell = list.currentCell

          }
        }

      })

    }

  },

  methods: {
    close() {
      this.$emit('close', 'someValue')
    },

    law() {
      this.$emit('getLaw', this.customSpeedLaw)
    },

    setSelectedValue: function (type, n) {
      switch (type) {
        case "mach" :
          this.selectedMach = this.machList[n].value
          break
        case "speed" :
          this.selectedSpeed = this.speedList[n].value
          break
      }
    },
    maxIndex: function (type) {
      let index
      switch (type) {
        case "mach" :
          index = this.machList.length
          break
        case "speed" :
          index = this.speedList.length
          break
      }
      return index
    },

    setCustomSpeedLaw : function (){
      this.customSpeedLaw ={
        speed : this.selectedSpeed,
        mach : this.selectedMach,
        FL : this.conjonctionAltitude
      }
      this.law()
      this.close()
    }
  },

  computed: {
    speedList : function (){
      let minSpeed = msToKnot(this.speedRange.minSpeed)
      let maxSpeed = (this.speedRange.VMO)

      let speedValues = []
      for (let speed = minSpeed; speed <= maxSpeed; speed++) {
        speedValues.push({
          value: Math.floor(speed)
        })
      }
      return speedValues
    },

    machList : function (){
      let minMach = Math.floor(this.speedRange.buffetingMach * 100)
      let maxMach = this.speedRange.maxMach * 100
      console.log(minMach, maxMach)
      let machValues = []
      for (let mach = minMach; mach <= maxMach; mach++) {
        machValues.push({
          value: mach / 100
        })
      }
      return machValues
    },





    conjonctionAltitude: function () {
      return Math.round(HpTrans(knotToMs(this.selectedSpeed), this.selectedMach)/100)
    }
  },

}
</script>

<style scoped>
.law-edit-container {
  width: 300px;
  height: 400px;
  left: calc(50% - 150px);
  top: calc(50% - 200px);
  z-index: 99999;
  background: #1f2023;
  box-shadow: #1a1a1a 0 0 10px 0px;
  opacity: 0.95;
  display: flex;
  flex-direction: column;
  align-items: center;
  /*justify-content: center;*/
  position: absolute;
  border-radius: 14px;
}

.law-edit-conjonction {
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

.law-edit-close {
  position: absolute;
  right: 0px;
  top: 0px;
  filter: invert(90%);
  cursor: pointer;
  margin: 10px;
}

.law-edit-box {
  position: relative;
  display: flex;
  flex-direction: column;
}

.law-edit-frame {
  width: 100%;
  z-index: 9999;
  position: absolute;
  height: calc(100% - 104px)
}

.law-edit-overlay {
  width: 100%;
  backdrop-filter: blur(5px);
  height: 100%;
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
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  font-size: 8px;
  padding-left: 2px;
  color: #737d86;
  padding-bottom: 2px;
}

.picker-stopbar.top {
  top: 50px;
}

.picker-stopbar.bottom {
  top: 100px;
}

.law-edit-title {
  margin-top: 12px;
  font-size: 14px;
  font-family: "Product Sans", sans-serif;
  /*font-weight: bold;*/
  color: rgba(220, 226, 232, 0.86);
}

.params {
  display: flex;
  font-size: 12px;

  margin-top: 25px;
}

.param-option {
  width: 100px;
  position: relative;
  height: 20px;
  box-sizing: border-box;
}


.law-edit-picker.selected {
  border: 2px solid #bf8cef;
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


.law-edit-picker-container {
  width: 100%;
  min-height: 100px;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
  /*border: 1px blue solid;*/
}

.law-edit-picker {
  width: 90px;
  overflow: hidden;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px;*/
  height: 150px;
  border-radius: 4px;
  border: 2px solid rgb(45, 46, 47);
  /*background: #2f353c;*/
}

.figure-list {
  width: 100%;
  margin: 0;
  padding: 0;
  list-style-type: none;
  list-style: none;
  transition: all 0.4s ease-in-out;
  text-decoration: none;
  transform: translateY(50px);
}

.figure-list li {
  height: 50px;
  user-select: none;
  /*border: 1px #48485d solid;*/
  box-sizing: border-box;
  padding-left: 30px;
  padding-top: 15px;
  cursor: pointer;
  display: flex;
  color: white;
}

.validate {
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: rgba(5, 5, 5, 0.4) 0px 1px 3px 0px;
  background: #d4a2f4;
  border-radius: 20px;
  margin: 10px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>
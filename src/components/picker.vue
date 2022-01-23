<template>
  <div class="picker" id="picker" ref="picker" :style="{height : 3 * size + 'px'}">

    <div class="picker-stopbar top" :style="{top : size - 1 + 'px'}"></div>
    <div class="picker-stopbar bottom" :style="{top : size*2 - 1+ 'px'}"></div>
    <ul class="figure-list" id="figure-list" ref="figure-list" @wheel="scroll" @click="click"
        :style="{  transform: 'translateY(' + size + 'px)'}">
      <li class="figure" :style="{height : size + 'px', lineHeight : size + 'px', color:color}" v-bind:key="o.value"
          v-for="o in values">{{ o.value }}
      </li>
    </ul>

  </div>
</template>

<script>

function toCell(cell, listElement, picker) {
  listElement.style.transition = 'all 0.5s ease'
  listElement.style.transform = 'translateY(' + (-cell * picker.offsetHeight / 3 + picker.offsetHeight / 3) + 'px)'
  for (let n = 0; n < listElement.children.length; n++) {
    listElement.children.item(n).style.transition = "opacity 0.2s ease"
    let distance = Math.abs(listElement.children.item(cell).offsetTop - n * picker.offsetHeight / 3)
    listElement.children.item(n).style.opacity = 1 - distance / (picker.offsetHeight / 1.5)
  }
}

function getCellValue(cell, listElement) {
  return parseFloat(listElement.children.item(cell).innerText)
}

export default {
  name: "picker",

  data() {
    return {
      values: [],
      selectedValue: 0,
      // currentCell: 0,
      // id: 0,
      // type: figureLists[0].id,
      // listElement: figureLists[0],
      target : "",
      currentCell: 0,
      lastCell: 0,
      touch: false,
      originY: 0,
      deltaY: 0,
      maxIndex: 0,
    }
  },
  props: ["valueList", "size", "minValue", "maxValue", "step", "color", "type"],
  mounted() {
    let figureLists = this.$refs["figure-list"]
    this.element = figureLists
    let picker = this.$refs["picker"]
    this.picker = picker
    if (this.valueList && this.valueList.length !== 0) {
      for (let i of this.valueList) {
        this.values.push({
          value: i.value
        })
      }
    } else {
      for (let FL = this.maxValue; FL >= this.minValue; FL -= this.step) {
        this.values.push({
          value: FL === 0 ? "GROUND" : FL,
        })
      }
    }
    this.maxIndex = this.values.length
    // let maxValue = Math.max.apply(null, this.values);
    let ref = this
    // eslint-disable-next-line no-unused-vars
    let drag_time = 0
    // let currentCell
    // var elements = document.getElementsByClassName("classname");
    // var myFunction = function() {
    //   var attribute = this.getAttribute("data-myattribute");
    //   alert(attribute);
    // }
    // let ref = this
    // eslint-disable-next-line no-unused-vars
    let target
    // eslint-disable-next-line no-unused-vars
    let lastMove
    // eslint-disable-next-line no-unused-vars
    let movedBy
    // eslint-disable-next-line no-unused-vars
    let lastTime
    // eslint-disable-next-line no-unused-vars
    let speed
    // eslint-disable-next-line no-unused-vars
    let eTime
    let lastPos

    this.element.addEventListener('touchstart', function (event){
      ref.target = event.target
      ref.originY = event.touches[0].clientY
      ref.touch = true
    })

    window.addEventListener('touchmove', function (event) {
      movedBy = lastPos - event.touches[0].clientY
      // console.log("movint")
      // eTime = lastTime - event.timeStamp
      // lastTime = event.timeStamp
      lastPos = event.touches[0].clientY
      ref.deltaY = ref.originY - event.touches[0].clientY
      // console.log(ref.size)
      if (ref.touch) {
        ref.element.style.transition = 'all 0s ease'
        console.log(-ref.lastCell * ref.size )
        console.log(ref.size - ref.deltaY)
        console.log((-ref.lastCell * ref.size) + (ref.size - ref.deltaY) )
        ref.element.style.transform = 'translateY(' + ((-ref.lastCell * ref.size) + (ref.size - ref.deltaY)) + 'px)'
        ref.currentCell = Math.min(Math.max(-Math.round((-ref.lastCell * ref.size - ref.deltaY) / ref.size), 0), ref.maxIndex)
        ref.selectedValue = getCellValue(ref.currentCell, ref.element)
        ref.getValue(ref.selectedValue)
        for (let n = 0; n < ref.element.children.length; n++) {
          ref.element.children.item(n).style.transition = "opacity 0s ease"
          let distance = Math.abs(ref.element.children.item(n).getBoundingClientRect().y - picker.getBoundingClientRect().y - ref.element.children.item(n).getBoundingClientRect().height)
          ref.element.children.item(n).style.opacity = 1 - distance / 100
        }
      }
    })

    window.addEventListener('touchend', function () {
      if (ref.touch) {
        ref.touch = false
        if (ref.deltaY != 0) {
          ref.originY = 0
          ref.currentCell = Math.min(Math.max(-Math.round((-ref.lastCell * ref.size - ref.deltaY) / ref.size), 0), ref.maxIndex)
          console.log(ref.currentCell)
          ref.lastCell = ref.currentCell
          // ref.element.style.transition = 'all ' + Math.abs(0.2) + 's ease-out'
          toCell(ref.currentCell, ref.element, picker)
          ref.selectedValue = getCellValue(ref.currentCell, ref.element)
          ref.getValue(ref.selectedValue)
        }
        ref.target = ""
      }
    })


  },

  methods: {
    getValue(e) {
      this.$emit(this.type, e)
    },

    click(event) {
      let ref = this
      for (let n = 0; n < this.element.children.length; n++) {
        if (this.element.children.item(n) === event.target) {
          this.currentCell = n
          toCell(this.currentCell, this.element, this.picker)
          ref.selectedValue = getCellValue(this.currentCell, this.element)
          ref.getValue(ref.selectedValue)
          break
        }
      }
    },

    scroll(e) {
      let ref = this
      this.currentCell += (e.deltaY > 0) ? 1 : -1
      this.currentCell = Math.min(Math.max(this.currentCell,0), ref.maxIndex-1)
      for (let n = 0; n < this.element.children.length; n++) {
        this.element.children.item(n).style.transition = "opacity 0s ease"
      }
      toCell(this.currentCell, this.element, this.picker)
      ref.selectedValue = getCellValue(this.currentCell, this.element)
      ref.getValue(ref.selectedValue)
    }

  }
}
</script>

<style scoped>
.picker {
  width: 90px;
  margin-right: 45px;
  overflow: hidden;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px;*/
  /*height: 180px;*/
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
  /*transform: translateY(60px);*/
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
  /*padding-top: 22px;*/
  cursor: pointer;
  line-height: 30px;
  font-size: 18px;
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
</style>
<template>
  <div class="tile">
    <img class="png" :src="imagePNG(img)">
    <div class="ctn">
      <div class="txt txt-name">
        <span class="ICAO">{{ ICAO }}</span>
        <span class="name">{{ name }}</span>
      </div>
      <div class="txt txt-details">
        <div class="engine-type">
          <img class="engine-type-icon" :src="image(this.icons[engineType.toLowerCase()])">
          <span class="engine-type-name">{{ engineType.toLowerCase() }}</span>
        </div>
        <div class="manufacturer">
          <img :src="image('hammer-wrench')" >
          <span class="manufacturer-name">{{ manufactuer }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>




export default {
  name: "PlaneTile",
  props: ["name", "ICAO", "img", "manufactuer", "engineType"],
  data() {
    return {
      manufacturers: "",
      highlights : [],
      icons :
        {
          jet : "jet",
          turboprop: "option2",
          piston : "piston"
        },

    }
  },
  methods : {
    image(url){
      try {
        // a path we KNOW is totally bogus and not a module
        let imageUrl = require('@/assets/icons/' + url + '.svg')
        return imageUrl
      } catch (e) {
        let imageUrl = require('@/assets/icons/airplane-edit.svg')

        return imageUrl
      }

    },

    imagePNG(url){
      try {
        // a path we KNOW is totally bogus and not a module
        let imageUrl = require('@/assets/png/' + url + '.png')
        return imageUrl
      } catch (e) {
        let imageUrl = require('@/assets/icons/airplane-edit.svg')

        return imageUrl
      }

    }
  }
}
</script>

<style scoped>

.png{
  width: 90%;
  position: absolute;
  top:-20px;
  right: -30px;
  /*box-shadow: rgba(4, 4, 4, 0.1) 0px 1px 5px 1px;*/
}



.ctn{
  display: flex;
  width: 100%;
  position: absolute;
  box-sizing: border-box;
  padding: 16px;
  justify-content: space-between;
  bottom: 0;
}

.txt{
  display: flex;
  color: #1d1d1d;
  justify-content: space-between;
  flex-direction: column;
}

.txt-name .ICAO{
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;

  letter-spacing: 1px;
}

.manufacturer{
  color: #cbc3e3;
  height: 16px;
  display: flex;
}

.manufacturer img{
  height: 16px;
  filter: invert(95%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);

  width: 16px;
  margin-right: 5px;
}

.manufacturer span{
  line-height: 16px;
  font-size: 16px !important;
  padding: 0;
  margin: 0;
}

.txt-details{
  align-items: flex-end;
}

.txt-name .name{
  color: rgba(29, 29, 29, 0.6);
}

.txt-details .engine-type{
  background: rgba(29, 29, 29, 0.78);
  height: 26px;
  display: flex;
  padding-left: 4px;
  padding-right: 10px;
  border-radius: 4px;
}

.txt-details .engine-type-name{
  color: #beb8c7;
  text-transform: capitalize;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
  line-height: 26px;
}

.engine-type img{
  height: 16px;
  filter: invert(95%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);
  margin:5px;
  width: 16px;
  margin-right: 8px;
  /*margin-right: 5px;*/
}

.tile{
  position: relative;
  margin-right: 40px;

  flex: 0 0 auto;
  width: 270px;
  height: 160px;
  border-radius: 8px;
  background: linear-gradient(225deg, rgb(82, 75, 98) -0%, rgb(212, 200, 248) 110%);
}
</style>
<template>
  <div class="category">
    <img :src="image(icon)">
    <div class="txt">
      <span>{{name}}</span>
      <span class="count">{{ count }} appareils</span>

    </div>


  </div>
</template>

<script>
// import url from "@/assets/icons/airplane-edit.svg"

export default {
  name: "Category",
  props: ["name", "icon", "count"],

  data() {
    return {
      iconURL : "",
    }
  },

  beforeMount() {

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

    }
  }
}


</script>

<style scoped>

img{
  width: 28px;
  filter: invert(90%) sepia(20%) saturate(1041%) hue-rotate(200deg) brightness(80%) contrast(88%);
  margin: 10px;
  height: 28px;
}

.category {
  margin-bottom: 5px;
  display: flex;
  width: 200px;
  height: 75px;
  margin-right: 20px;
  flex: 0 0 auto;
  /*justify-content: space-between;*/
  box-shadow: rgba(0, 0, 0, 0.18) 0px 1px 10px 5px;
  align-items: center;
  box-sizing: border-box;
  border-radius: 8px;
  background: #302D39;
}

.txt{
  display: flex;
  flex-direction: column;
}

.category span{
  line-height: 28px;
  height: 28px;
  margin-left: 20px;
  /*width: 100px;*/
  font-weight: bold;
  letter-spacing: 1px;
}

.count{
  font-weight: 400 !important;
  color: #917ea2;
  font-size: 12px;
}
</style>
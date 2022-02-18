<template>
  <div class="container" :class="{filter : isFilter}">
    <img :src="imageSVG(icon)"/>
    <span>{{ text }}</span>
  </div>
</template>

<script>
// import imageUrl from "@/assets/icons/airplane-edit.svg"

export default {
  name: "hButton",
  props : ['text', 'icon', 'baseColor', 'isFilter'],
  methods: {

    imageSVG(url) {
      try {
        // a path we KNOW is totally bogus and not a module
        let imageUrl = require('@/assets/icons/' + url)
        return imageUrl
      } catch (e) {
        let imageUrl = require('@/assets/icons/airplane-edit.svg')

        return imageUrl
      }

    },
  }
}
</script>

<style scoped>
.container{
  cursor: pointer;
height: 28px;
  display: flex;
  background: #1a1a1a;
  box-sizing: border-box;
  border: 1px solid rgb(44, 40, 40);
  border-radius: 28px;
}

.container.filter{
  color: #dddaf3;
  background: #27252f;
}

.container.filter img{
  filter: invert(89%) sepia(14%) saturate(1299%) hue-rotate(200deg) brightness(99%) contrast(98%);
}

.container.filter.selected{
  color: #cdc1e5;
  background: #615c76;
}

.container.filter.selected img{
  filter: invert(69%) sepia(14%) saturate(1299%) hue-rotate(220deg) brightness(99%) contrast(98%);
}

img{
  margin: 7px;
  filter: invert(69%) sepia(14%) saturate(1299%) hue-rotate(225deg) brightness(99%) contrast(98%);
}

span {
  font-family: "Roboto", sans-serif;
  padding-top: 5px;
  padding-left: 2px;
  font-size: 13px;
  padding-right: 9px;
}
</style>
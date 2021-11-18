<template>
  <div class="container">
    <img :src="require(`@/assets/${icon}`)"/>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "hButton",
  props : ['text', 'icon', 'baseColor']
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

img{
  margin: 7px;
  filter: invert(69%) sepia(14%) saturate(1299%) hue-rotate(172deg) brightness(99%) contrast(98%);
}

span {
  font-family: "Roboto", sans-serif;
  padding-top: 5px;
  padding-left: 2px;
  font-size: 13px;
  padding-right: 9px;
}
</style>
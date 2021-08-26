<template>
  <div id="tile-container">
    <router-link to="/static">
      <div id="static-tile" class="tile">

        <div class="tile-lower-container">
          <div class="tile-title-decoration"></div>
          <p>Static</p>
        </div>
        <div class="tile-bubble-container">
          <div class="bubble" id="bubble1"></div>
          <div class="bubble" id="bubble2"></div>
          <div class="bubble" id="bubble3"></div>
        </div>
      </div>
    </router-link>
    <div id="dynamic-tile" class="tile">
      <div class="tile-lower-container">
        <div class="tile-title-decoration"></div>
        <p>Dynamic</p>
      </div>
      <div class="tile-bubble-container">
        <div class="bubble" id="bubble1"></div>
        <div class="bubble" id="bubble2"></div>
        <div class="bubble" id="bubble3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style scoped>

</style>
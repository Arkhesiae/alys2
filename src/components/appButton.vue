<template>
  <div class="app-button">
    <div class="app-button-text">{{text}}</div>
    <div class="app-button-icon-container">
      <img :src="require(`@/assets/${icon}`)">
    </div>
  </div>
</template>

<script>
export default {
  name: "AppButton",
  props: ["text", "icon"],
}

</script>

<style scoped>
.app-button-icon-container{
  width: 48px; border-radius: 50px;
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  background: rgba(204,134,113,1);
  box-shadow: rgba(5, 5, 5, 0.5) 0px 2px 4px 0px;
  margin-left: 20px;
  margin-right: 20px;
}

.app-button{
  cursor: pointer;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 2px 2px 0px;
  height: 100px;
  font-weight: bold;
  box-sizing: border-box;
  /*padding-top: 40px;*/
  margin-right: 40px;
  padding-left: 28px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  width: max-content;
  transition: 0.2s all ease-in-out;
  background: rgb(69, 59, 58);
}

.app-button:hover{
  background: #413735;
}

</style>
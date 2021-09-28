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
  background: #D59D84;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
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
  background: #323640;
}

.app-button:hover{
  background: #2f333c;
}

</style>
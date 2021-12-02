<template>
  <div class="app-button">

    <div class="app-button-icon-container">
      <img :src="require(`@/assets/${icon}`)">
    </div>
    <div class="app-button-text">{{text}}</div>
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
  z-index: 99;
  position: relative;
  width: 48px; border-radius: 50px;
  height: 48px;
  box-sizing: border-box;
  padding: 12px;
  background: rgba(135, 84, 149, 0.1);
  box-shadow: rgba(5, 5, 5, 0.1) 0px 2px 4px 0px;
  /*margin-left: 20px;*/
  /*margin-right: 20px;*/
}

.app-button-icon-container img{
  filter : invert(81%) sepia(20%) saturate(1041%) hue-rotate(250deg) brightness(92%) contrast(88%);
  transition: transform cubic-bezier(.72, .02, .44, 1.38) 0.7s;
}

.app-button-text{
  /*display: none;*/
  position: relative;

  transition: all cubic-bezier(.72, .02, .44, 1.38) 0.7s 0.8s, opacity ease 0.5s 0.5s;
  z-index: 98;
  opacity: 0;
  white-space: nowrap;
  width: 0px;
}

.app-button:hover img{
  transform: rotate(180deg);
}

.app-button:hover .app-button-text{
  transition: all cubic-bezier(.72, .02, .44, 1.38) 0.4s, opacity ease 0.5s 0.35s;
  /*display : block;*/
  opacity: 1;
  padding-left: 20px;
  width: 150px;
}

.app-button{
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(5, 5, 5, 0.15) 0px 10px 10px 2px;
  height: 48px;
  color: #9578a5;
  /*font-weight: bold;*/
  box-sizing: border-box;
  /*padding-top: 40px;*/
  margin-right: 40px;
  /*padding-left: 28px;*/
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  border-radius: 24px;
  width: max-content;
  transition: 0.2s all ease-in-out;
  background: rgba(68, 58, 69, 0.2);
}

.app-button:hover{
  background: rgba(37, 34, 35, 0.35);
}

</style>
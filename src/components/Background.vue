<template>
  <div id="background">
    <div id="upper-circle"></div>
    <div id="lower-circle"></div>
  </div>
</template>

<script>
export default {
  name: "Background"
}
</script>

<style scoped>
#background{
  position: absolute;
  width: 100%;
  overflow: hidden;
  height: 100%;
  /*background: linear-gradient(237deg, rgba(39,42,51,1) -00%, rgba(30,30,36,1) 50%);*/
  background: linear-gradient(205deg, rgba(42,43,51,1) 11%, rgb(38, 40, 50) 28%, rgba(33,32,36,1) 53%, rgba(22,21,21,1) 100%);
  /*background: linear-gradient(237deg, rgb(88, 76, 67) -100%, rgba(30,30,36,1) 80%);*/
}

#upper-circle{
  position: absolute;
  left: -30vw;
  top:-45vw;
  height: 90vw;
  border-radius: 45vw;
  width: 90vw;
  opacity: 0.1;
  filter: blur(5px);
  background: #1E1E24;
}

#lower-circle{
  position: absolute;
  right: -15vw;
  bottom:-20vw;
  height: 40vw;
  border-radius: 40vw;
  opacity: 0.3;
  width: 40vw;
  filter: blur(1px);
  box-shadow: #1a1a1a -20px -20px 20px 2px;
  background: linear-gradient(237deg, rgba(48,48,48,0.2) -30%, rgba(223,122,91,0.5) 150%);
}

</style>
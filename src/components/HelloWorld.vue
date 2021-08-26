<template>
  <div id="tile-container">
    <router-link :to="{ name: 'SelectScreen', params: { type:'static' }}">
      <Tile type="static"></Tile>
    </router-link>
    <router-link :to="{ name: 'SelectScreen', params: { type:'dynamic' }}">
      <Tile type="dynamic"></Tile>
    </router-link>
  </div>
</template>

<script>
import Tile from "./Tile"
export default {
  name: 'HelloWorld',
  components: {Tile},
  props: {
    msg: String,
    type : String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@media screen and (max-width: 1024px) {
  #tile-container {
    flex-direction: column;
  }
}

#tile-container {
  transition: all 0.4s ease-in-out;
  width: 100%;
  display: flex;
  align-self: center;
  /*flex-direction: column;*/
  justify-content: center;
  align-content: space-evenly;
  align-items: center;
  height: 100vh;
  position: absolute;
  /*backdrop-filter: blur(1px);*/
  /*top: calc(50% - 150px);*/
}



.page-container {
  position: absolute;
  height: 100%;
  transition: all 0.4s ease-in-out;
  display: flex;
  z-index: 99;
  overflow: hidden;
}

.page-container:nth-child(2) .page-content {

}

.page {
  width: 100vw;
  position: relative;
  height: 100vh;
  /*outline: 1px solid #7f7f7f;*/
  display: flex;
  justify-content: center;
  align-items: center;

}

.page-content {
  position: absolute;
  width: 98%;
  border-radius: 16px;
  height: 700px;
  background: rgba(0, 0, 0, .1);
  /*backdrop-filter: blur(5px);*/

}

</style>

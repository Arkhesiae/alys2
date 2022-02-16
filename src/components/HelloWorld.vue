<template>

</template>

<script>
import Tile from "./Tile"
import {createRipple} from "@/BADA/Misc/ripple"
export default {
  name: 'HelloWorld',
  components: {Tile},
  props: {
    msg: String,
    type : String,
  },
  methods: {
    createRipple(event){
      console.warn("bite")
      console.warn("bite")
      console.warn("bite")
      console.warn("bite")
      console.warn("bite")
      console.warn("bite")
      console.warn("bite")
      createRipple(event)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tile{
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
}

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
  margin-top: 40vh;
  /*flex-direction: column;*/
  justify-content: center;
  align-content: space-evenly;
  align-items: center;
  height: auto;
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

<template>
  <div class="button"  @mousedown="createRipple">
    <img src="@/assets/icons/arrow-left.svg">
  </div>

</template>

<script>
import {createRipple} from "@/BADA/Misc/ripple"

export default {
  name: "BackButton",
  methods: {
    createRipple(event) {
      console.log("bite")
      createRipple(event)
    },
  }
}
</script>

<style scoped>

@media (max-width: 737px) and (min-width: 100px) {
  .button{
    width: 48px !important;
    height: 48px !important;
  }

  img {
    width: 48px !important;
    height: 48px !important;
  }
}


.button {
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 60px;
  /*background: rgba(87, 81, 88, 0.27);*/
  height: 60px;
  width: 60px;
  /*padding: 10px;*/
  box-sizing: border-box;

}

img {
  box-sizing: border-box;
  filter: invert(90%);
  padding: 15px;
  height: 60px;
  width: 60px;

}
</style>
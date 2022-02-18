<template>
  <div class="button"  @touchstart="createRipple" @mousedown="createRipple" @touchend="stop" @mouseup="removeRipple">
    <img src="@/assets/icons/menu.svg">
  </div>
</template>

<script>
import {createRipple} from "@/BADA/Misc/ripple"

export default {
  name: "HamburgerButton",
  methods: {

    createRipple(event) {
      createRipple(event)
    },

    stop(event){
      this.removeRipple(event)
      event.preventDefault()
      event.stopPropagation()
    },

    removeRipple(event){
      let button = event.currentTarget;
      const ripple = button.getElementsByClassName("Gripple")[0];
      if (ripple) {
        ripple.remove()
      }

    }
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
  cursor: pointer;
  flex: 0 0 auto;
  margin-right: 10px;
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

/*img{*/
/*  margin: 20px;*/
/*  filter: invert(90%);*/
/*}*/
</style>
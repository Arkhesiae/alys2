<template>
  <div id="page">
    <div class="content-container">
<!--      <router-view class="plane-view" :coefficient="aircraftCoef"></router-view>-->
      <router-view :coefficient="coefficient"/>

      <transition name="side-in" appear>
        <SideBar :aircraft="aircraft"></SideBar>
      </transition>

    </div>

  </div>
</template>
<!--<script src=></script>-->
<script>


// import MenuButton from "@/components/MenuButton"
// import Background from "@/components/Background"

import SideBar from "@/components/SideBar"

// import {profileSampling} from "@/BADA/sampling"

require('fabric')

export default {
  name: "TestView",
  props : ["coefficient", "aircraft"],
  components: {
    SideBar,
  },



  beforeMount() {
  },

  mounted() {
  },

  created() {

  },


}


</script>

<style>

</style>

<style scoped>

* {
  user-select: none;
}

.side-in-enter-active,
.side-in-leave-active {
  transition: all 1s ease-in-out 0s;
}

.side-in-enter-from,
.side-in-leave-to {
  transition: all 1s ease-in-out 0s;
  transform: translateX(400px);
  opacity: 0;
}



@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

@font-face {
  font-family: "Product Sans";
  src: url("../assets/fonts/ProductSansRegular.ttf") format("truetype");
}

.content-container {
  display: flex;
  position: relative;
  align-items: center;
  width: 100%;
  height: 100%;
}

#page {
  width: 100%;
  position: relative;
  height: 100%
}



</style>
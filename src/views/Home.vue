<template>
<!--  <MenuButton/>-->
  <div>
    <Background/>
  </div>

  <div id="home">
    <transition name="fade" appear>
      <HelloWorld  v-if="show"/>
    </transition>
  </div>
  <router-view></router-view>
<div class="truc" @click="show=!show"></div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Background from "../components/Background"
// import MenuButton from "../components/MenuButton"

// Vue.createApp(Demo).mount('#home')


export default {
  name: 'Home',
  data() {
    return {
      show: true
    }
  },
  components: {
    // MenuButton,
    Background,
    HelloWorld
  }
}
</script>

<style>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-in-out 1s;
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

.truc{
  z-index: 100;
  position: absolute;
  width: 20px;
  height: 20px;
  background: #2f7fff;
}

</style>

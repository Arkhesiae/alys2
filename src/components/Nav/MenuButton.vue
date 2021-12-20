<template>

  <router-link to="/">
    <transition name="home-in" appear>
      <div id="home-button">
        <img src="../../assets/icons/home_black_24dp.svg" alt="">
      </div>
    </transition>
  </router-link>

</template>

<script>
export default {
  name: "MenuButton"
}
</script>

<style scoped>



#home-button img {
  width: 32px;
  margin: 16px;
  height: 32px;
  filter: invert(70%);
}

#home-button {
  /*position: absolute;*/
  width: 64px;
  height: 64px;
  border-radius: 64px;
  z-index: 999;
  cursor: pointer;
  transition: all 1s ease-in-out 0s;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  background: #2b282c;

}

.home-in-enter-active,
.home-in-leave-active {
  transition: all 1s ease-in-out 0s;
}

.home-in-enter-from,
.home-in-leave-to {
  transition: all 1s ease-in-out 0s;
  transform: scale(0.9) translateX(-100px);
  opacity: 0;
}

#home-button:hover {


  background: #25252a;

}
</style>
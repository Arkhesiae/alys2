<template>
  <div>
    <MenuButton/>
    <Background/>
    <nav class="nav-bar">
      <div> Static</div>
      <div> Dynamic</div>

<!--      <h1>Dynamic</h1>-->
    </nav>
  </div>

  <div id="rendered-items-flexbox" :class="transitionClass" :style="{ transform: transformStyle }">
    <transition-group name="static" appear mode="in-out">
<!--        <div class="container">-->
          <Static class="static" key="saved"></Static>
          <Dynamic class="dynamic" key="savzed"></Dynamic>
<!--        </div>-->
    </transition-group>

  </div>
</template>

<script>
import Background from "../components/Background"
import MenuButton from "../components/MenuButton"
// import router from "../router"
import Static from "./HomePage"
import Dynamic from "./Dynamic"

export default {
  name: "SelectScreen",

  components: {
    Static,
    Dynamic,
    MenuButton,
    Background,
  },

  props : {},

  data() {
    return {
      currentSet:["static", "dynamic"],
      currentIndex : 0,
      transformStyle: 'translateX(0)',
      transitionClass: 'transition-initial',
      maxIndex : 1,
      routeName:"static"
    };
  },

  watch: {
    '$route' () {
      this.transformStyle = this.$route.params.type === 'static' ? 'translateX(0vw)' : 'translateX(-100vw)';
    }
  },

  mounted(){
    window.addEventListener("keydown", (event)=>{
      if (event.code==="ArrowRight"){
        this.currentIndex = this.currentIndex < this.maxIndex ? this.currentIndex+1 : this.maxIndex
        this.next()
      }
      else if (event.code==="ArrowLeft"){
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex-1 : 0
        this.previous()
      }
      // this.changeCard()
    })
  },

  methods : {
    changeCard(){
      const {  upcomingIndex, currentSet} = this
      const id = currentSet[upcomingIndex];
      this.$router.replace({ name: "select-screen", params: { id } });
    },
    previous() {


      this.transitionClass = 'transition-item';
      // this.transformStyle = 'translateX(100vw)';
      this.$router.push({ name: 'SelectScreen', params: {type: 'static' }})
      // const prevIndex = currentIndex === 0 ? currentSet.length - 1 : currentIndex - 1;
      // this.upcomingIndex = prevIndex;
      // if (isTranslationDisabled) {
      //   this.changeCard();
      // }
    },
    next() {


      this.transitionClass = 'transition-item';
      // this.transformStyle = 'translateX(-100vw)';
      // setTimeout(()=>{
        this.$router.push({ name: 'SelectScreen', params: {type: 'dynamic' }})
        // this.transformStyle = 'translateX(0vw)';
      // },500)

      // const prevIndex = currentIndex === 0 ? currentSet.length - 1 : currentIndex - 1;
      // this.upcomingIndex = prevIndex;
      // if (isTranslationDisabled) {
      //   this.changeCard();
      // }
    },

  },
  computed : {

  },

}


</script>

<style scoped>

.static-enter-active,
.static-leave-active {
  transition: all 1s ease-in-out 0s;
}

.static-enter-from,
.static-leave-to {
  /*transition: all 1s ease-in-out 0s;*/
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

#rendered-items-flexbox {
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: fit-content;
  width: 100vw;
  box-sizing: border-box;
  touch-action: pan-y;
}

.transition-initial {
  transition: transform 0s ease;
}
.transition-item {
  transition: transform 500ms cubic-bezier(0, 0, 0.2, 1);
}

.transition-edge {
  transition: transform 1000ms ease-out;
}

.container{
  width: 200vw;
}

.dynamic{
  position: absolute;
  left: 100vw;
}

.nav-bar{
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  /*border: 2px #ff2525 solid;*/
  width: 20%;
  left : 40%;
  z-index: 100;
  padding-top: 35px;
  position: absolute;
  height: 100px;
  font-size: 22px;
}



.nav-bar div{
  cursor: pointer;
}

#nav2{
   box-sizing: border-box;
   border: 2px #2f7fff solid;
   width: 100%;
   position: absolute;
   left: 100%;
   height: 100%;
 }
</style>
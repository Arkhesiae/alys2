<!--<template>-->
<!--  <div-->
<!--      id="touch-container"-->
<!--      :class="{ fullscreen: fullscreen }"-->
<!--      :style="{ maxHeight: containerHeight }"-->
<!--  >-->
<!--    <div-->
<!--        id="rendered-items-flexbox"-->
<!--        :class="transitionClass"-->
<!--        :style="{ transform: transformStyle }"-->
<!--    >-->
<!--      <div-->
<!--          v-for="item in renderedSet"-->
<!--          :id="item.key"-->
<!--          :ref="item.id"-->
<!--          :key="item.key"-->
<!--          class="rendered-item"-->
<!--      >-->
<!--        <Card v-if="routeName === 'Card'" :card-id="item.id" />-->
<!--        <HelpCard v-else-if="routeName === 'Help'" :help-id="item.id" />-->
<!--        <GetStarted v-else-if="routeName === 'GetStarted'" />-->
<!--        <Welcome v-else-if="routeName === 'Welcome'" :welcome-id="item.id" :index="+currentIndex" />-->
<!--      </div>-->
<!--    </div>-->
<!--    <div-->
<!--        class="touch-tap-left"-->
<!--        role="button"-->
<!--        aria-label="Previous"-->
<!--        :tabindex="$mq === 'sm' ? 0 : -1"-->

<!--    >-->
<!--      <svg-->
<!--          xmlns="http://www.w3.org/2000/svg"-->
<!--          x="0px"-->
<!--          y="0px"-->
<!--          viewBox="0 0 10 100"-->
<!--          height="100%"-->
<!--          width="40px"-->
<!--          preserveAspectRatio="none"-->
<!--          class="left-edge-shape"-->
<!--          :class="transitionClass"-->
<!--          :style="{ transform: 'scaleX(' + leftEdgeScale + ')' }"-->
<!--      >-->
<!--        <path d="M0,0v100h5.2c3-14.1,4.8-31.4,4.8-50S8.2,14.1,5.2,0H0z" />-->
<!--      </svg>-->
<!--      <v-btn-->
<!--          aria-label="Previous"-->
<!--          class="icon-button white"-->
<!--          :class="{ hidden: !isPreviousAvailable || (routeName === 'Welcome' && currentIndex === 0) }"-->
<!--      >-->
<!--        <Left class="icon" />-->
<!--      </v-btn>-->
<!--    </div>-->
<!--    <div-->
<!--        class="touch-tap-right"-->
<!--        role="button"-->
<!--        aria-label="Next"-->
<!--        :tabindex="$mq === 'sm' ? 0 : -1"-->
<!--        @click="next"-->
<!--        @keyup.enter="next"-->
<!--        @keyup.space="next"-->
<!--    >-->
<!--      <svg-->
<!--          xmlns="http://www.w3.org/2000/svg"-->
<!--          x="0px"-->
<!--          y="0px"-->
<!--          viewBox="0 0 10 100"-->
<!--          height="100%"-->
<!--          width="40px"-->
<!--          preserveAspectRatio="none"-->
<!--          class="right-edge-shape"-->
<!--          :class="transitionClass"-->
<!--          :style="{ transform: 'scaleX(' + rightEdgeScale + ')' }"-->
<!--      >-->
<!--        <path d="M10,100V0L4.8,0C1.8,14.1,0,31.4,0,50c0,18.6,1.8,35.9,4.8,50H10z" />-->
<!--      </svg>-->
<!--      <v-btn aria-label="Next" class="icon-button white" :class="{ hidden: !isNextAvailable }">-->
<!--        <Right class="icon" />-->
<!--      </v-btn>-->
<!--    </div>-->

<!--    <ProgressDots-->
<!--        v-if="routeName === 'Welcome'"-->
<!--        :num-dots="3"-->
<!--        :index="+currentIndex"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Hammer from 'hammerjs';-->
<!--import { mapState } from 'vuex';-->

<!--import Card from '@/components/app/Card.vue';-->
<!--import HelpCard from '@/components/app/HelpCard.vue';-->
<!--import GetStarted from '@/components/app/GetStarted.vue';-->
<!--import Welcome from '@/components/app/Welcome.vue';-->
<!--import ProgressDots from '@/components/app/ProgressDots.vue';-->
<!--export default {-->
<!--  name: 'ContentView',-->
<!--  components: {-->

<!--    Card,-->
<!--    HelpCard,-->
<!--    GetStarted,-->
<!--    Welcome,-->
<!--    ProgressDots,-->
<!--  },-->
<!--  props: {},-->
<!--  data() {-->
<!--    return {-->
<!--      upcomingIndex: 0,-->
<!--      translateX: 0,-->
<!--      maxTranslateX: 0,-->
<!--      transformStyle: 'translateX(0)',-->
<!--      transitionClass: 'transition-initial',-->
<!--      isTransitioning: false,-->
<!--      containerHeight: '100%',-->
<!--      leftEdgeScale: 0,-->
<!--      rightEdgeScale: 0,-->
<!--      isTranslationDisabled: false,-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('ui', ['currentSet', 'currentIndex', 'currentId', 'routeName']),-->
<!--    fullscreen() {-->
<!--      return this.routeName === 'Welcome';-->
<!--    },-->
<!--    infoSet() {-->
<!--      const { currentSet } = this;-->
<!--      // If there are only 2 items, double array to always have odd number in displayItems-->
<!--      let set = [...currentSet];-->
<!--      if (set.length === 2 || set.length === 3) {-->
<!--        set = [...set, ...set];-->
<!--      }-->
<!--      return set.map((id, index) => ({-->
<!--        id,-->
<!--        key: `${id}-${index}`,-->
<!--      }));-->
<!--    },-->
<!--    renderedSet() {-->
<!--      const { currentIndex: i, infoSet } = this;-->
<!--      if (infoSet.length === 1) {-->
<!--        return [infoSet[i]];-->
<!--      }-->
<!--      const lastIndex = infoSet.length - 1;-->
<!--      const prevIndex = i === 0 ? lastIndex : i - 1;-->
<!--      const nextIndex = i === lastIndex ? 0 : i + 1;-->
<!--      return [infoSet[prevIndex], infoSet[i], infoSet[nextIndex]];-->
<!--    },-->
<!--    isInfiniteLoop() {-->
<!--      return this.routeName !== 'Help';-->
<!--    },-->
<!--    isNextAvailable() {-->
<!--      const { currentSet, currentIndex, isInfiniteLoop } = this;-->
<!--      return currentIndex < currentSet.length - 1 || (isInfiniteLoop && currentSet.length !== 1);-->
<!--    },-->
<!--    isPreviousAvailable() {-->
<!--      const { currentSet, currentIndex, isInfiniteLoop } = this;-->
<!--      return currentIndex > 0 || (isInfiniteLoop && currentSet.length !== 1);-->
<!--    },-->
<!--  },-->
<!--  mounted() {-->
<!--    const touchContainer = document.getElementById('touch-container');-->
<!--    const hammer = new Hammer.Manager(touchContainer, {-->
<!--      recognizers: [-->
<!--        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],-->
<!--        [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],-->
<!--      ],-->
<!--    });-->
<!--    hammer.on('pan swipe', this.handleTouchEvents);-->
<!--    const itemsContainer = document.getElementById('rendered-items-flexbox');-->
<!--    itemsContainer.addEventListener('transitionstart', () => {-->
<!--      this.isTransitioning = true;-->
<!--    });-->
<!--    itemsContainer.addEventListener('transitionend', () => {-->
<!--      this.changeCard();-->
<!--    });-->
<!--    // For users who prefer reduced motion or on larger screens,-->
<!--    // can't rely on transition to change items-->
<!--    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || this.$mq !== 'sm') {-->
<!--      this.isTranslationDisabled = true;-->
<!--    }-->
<!--    // Set height of touch-container to current item-->
<!--    this.setHeightOfTouchContainer(this.currentId);-->
<!--  },-->
<!--  methods: {-->
<!--    handleTouchEvents(e) {-->
<!--      const {-->
<!--        isTransitioning,-->
<!--        isPreviousAvailable,-->
<!--        isNextAvailable,-->
<!--        translateX,-->
<!--        leftEdgeScale,-->
<!--        rightEdgeScale,-->
<!--      } = this;-->
<!--      const { deltaX, deltaY, isFinal } = e;-->
<!--      if (isTransitioning) {-->
<!--        return;-->
<!--      }-->
<!--      // Don't respond to gestures that are more vertical than horizontal-->
<!--      // Unless the gesture started horizontal-->
<!--      if (-->
<!--          (Math.abs(deltaX) < 8 || Math.abs(deltaY) - Math.abs(deltaX) > -1) &&-->
<!--          !translateX &&-->
<!--          !leftEdgeScale &&-->
<!--          !rightEdgeScale-->
<!--      ) {-->
<!--        return;-->
<!--      }-->
<!--      if ((!isPreviousAvailable && deltaX > 0) || (!isNextAvailable && deltaX < 0)) {-->
<!--        this.updateEdgeEffect(deltaX, isFinal);-->
<!--      } else if (isFinal) {-->
<!--        this.handleGestureEnd(deltaX);-->
<!--      } else {-->
<!--        this.handleGestureMove(deltaX);-->
<!--      }-->
<!--    },-->
<!--    handleGestureMove(deltaX) {-->
<!--      const { maxTranslateX } = this;-->
<!--      if (Math.abs(deltaX) > Math.abs(maxTranslateX)) {-->
<!--        this.maxTranslateX = deltaX;-->
<!--      }-->
<!--      this.translateX = deltaX;-->
<!--      this.transitionClass = 'transition-initial';-->
<!--      this.transformStyle = `translateX(${deltaX}px)`;-->
<!--    },-->
<!--    handleGestureEnd() {-->
<!--      const { translateX, maxTranslateX } = this;-->
<!--      if (Math.abs(translateX) - Math.abs(maxTranslateX) < -1) {-->
<!--        // If gesture goes too much in oposite direction, stay on current slide-->
<!--        this.transitionClass = 'transition-item';-->
<!--        this.transformStyle = 'translateX(0)';-->
<!--      } else if (translateX > 0) {-->
<!--        this.previous();-->
<!--      } else if (translateX < 0) {-->
<!--        this.next();-->
<!--      }-->
<!--    },-->
<!--    updateEdgeEffect(deltaX = 0, isFinal = false) {-->
<!--      if (isFinal) {-->
<!--        this.transitionClass = 'transition-edge';-->
<!--        this.leftEdgeScale = 0;-->
<!--        this.rightEdgeScale = 0;-->
<!--      } else {-->
<!--        this.transitionClass = 'transition-initial';-->
<!--        const scaleVal = Math.min(0.2 + Math.abs(deltaX) / 50, 1);-->
<!--        if (deltaX > 0) {-->
<!--          this.leftEdgeScale = scaleVal;-->
<!--        }-->
<!--        if (deltaX < 0) {-->
<!--          this.rightEdgeScale = scaleVal;-->
<!--        }-->
<!--      }-->
<!--    },-->

<!--    changeCard() {-->
<!--      const { currentIndex, upcomingIndex, currentSet, routeName } = this;-->
<!--      if (currentIndex !== upcomingIndex) {-->
<!--        const id = currentSet[upcomingIndex];-->
<!--        this.$router.replace({ name: routeName, params: { id } });-->
<!--        this.$store.commit('ui/setCurrentIndex', upcomingIndex);-->
<!--        this.setHeightOfTouchContainer(id);-->
<!--      }-->
<!--      this.resetTranslate();-->
<!--    },-->
<!--    resetTranslate() {-->
<!--      this.isTransitioning = false;-->
<!--      this.transitionClass = 'transition-initial';-->
<!--      this.transformStyle = 'translateX(0)';-->
<!--      this.translateX = 0;-->
<!--      this.maxTranslateX = 0;-->
<!--    },-->
<!--    // If two cards are different heights,-->
<!--    // the smaller one will let you scroll past content-->
<!--    // To fix, set height of container to height of current item-->
<!--    setHeightOfTouchContainer(id) {-->
<!--      const $current = this.$refs[id] ? this.$refs[id][0] : {};-->
<!--      const height = $current.clientHeight;-->
<!--      this.containerHeight = height ? `${height}px` : '100%';-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->


<!--<style lang="scss" scoped>-->
<!--@import '@/styles/constants.scss';-->
<!--#touch-container {-->
<!--  position: relative;-->
<!--  flex: 1;-->
<!--  min-width: 100%;-->
<!--  overflow-x: hidden;-->
<!--  overflow-y: hidden;-->
<!--  .md &,-->
<!--  .lg &,-->
<!--  .xl & {-->
<!--    height: calc(100vh - #{$top-bar-height});-->
<!--  }-->
<!--  &.fullscreen {-->
<!--    margin-top: calc(1rem - #{$top-bar-height});-->
<!--    margin-bottom: calc(#{$top-bar-height} - 1rem);-->
<!--  }-->
<!--}-->
<!--#rendered-items-flexbox {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  height: 100%;-->
<!--  min-height: fit-content;-->
<!--  width: 100vw;-->
<!--  box-sizing: border-box;-->
<!--  touch-action: pan-y;-->
<!--  .md &,-->
<!--  .lg &,-->
<!--  .xl & {-->
<!--    transform: none !important;-->
<!--  }-->
<!--}-->
<!--@media (prefers-reduced-motion: reduce) {-->
<!--  #rendered-items-flexbox {-->
<!--    transform: none !important;-->
<!--  }-->
<!--}-->
<!--// Transition classes-->
<!--.transition-initial {-->
<!--  transition: transform 0s ease;-->
<!--}-->
<!--.transition-item {-->
<!--  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1); // ease-out timing function-->
<!--}-->
<!--.transition-edge {-->
<!--  transition: transform 500ms ease-out;-->
<!--}-->
<!--.rendered-item {-->
<!--  height: 100%;-->
<!--  min-height: fit-content;-->
<!--  width: 360px;-->
<!--  min-width: 100vw;-->
<!--  padding: 1rem;-->
<!--  padding-top: 0;-->
<!--  box-sizing: border-box;-->
<!--  .sm & {-->
<!--    width: 100vw;-->
<!--  }-->
<!--}-->
<!--.touch-tap-left,-->
<!--.touch-tap-right {-->
<!--  position: absolute;-->
<!--  top: 0;-->
<!--  display: flex;-->
<!--  width: 20%;-->
<!--  height: 100%;-->
<!--}-->
<!--.touch-tap-left {-->
<!--  left: 0;-->
<!--  justify-content: flex-end;-->
<!--}-->
<!--.touch-tap-right {-->
<!--  right: 0;-->
<!--  justify-content: flex-start;-->
<!--}-->
<!--.icon-button {-->
<!--  height: 80px;-->
<!--  width: 80px;-->
<!--  min-width: 80px;-->
<!--  padding: 8px;-->
<!--  box-sizing: content-box;-->
<!--  border-radius: 50%;-->
<!--  transform: translateY(290px);-->
<!--  .sm & {-->
<!--    display: none;-->
<!--  }-->
<!--}-->
<!--.icon {-->
<!--  color: currentColor;-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--}-->
<!--.left-edge-shape,-->
<!--.right-edge-shape {-->
<!--  position: absolute;-->
<!--  fill: white;-->
<!--  opacity: 0.5;-->
<!--  .md &,-->
<!--  .lg &,-->
<!--  .xl & {-->
<!--    display: none;-->
<!--  }-->
<!--}-->
<!--.left-edge-shape {-->
<!--  left: 0;-->
<!--  transform-origin: left;-->
<!--}-->
<!--.right-edge-shape {-->
<!--  right: 0;-->
<!--  transform-origin: right;-->
<!--}-->
<!--</style>-->
<!--to join this conversation on GitHub. Already have an account? Sign in to comment-->
<!--© 2021 GitHub, Inc.-->
<!--Terms-->
<!--Privacy-->
<!--Security-->
<!--Status-->
<!--Docs-->
<!--Contact GitHub-->
<!--Pricing-->
<!--API-->
<!--Training-->
<!--Blog-->
<!--About-->

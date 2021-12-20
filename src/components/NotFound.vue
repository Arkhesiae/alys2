<template>
  <Background>
  </Background>
  <div class="pt">g pa trouvé dézo</div>
</template>

<script>
import Background from "@/components/Nav/Background"
export default {
  name: "NotFound",
  components: {Background}
}
</script>

<style scoped>

.pt{
  padding: 10%;
  position: relative;
  z-index: 999;
  font-size: 40px;
}

</style>
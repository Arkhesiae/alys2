<template>
  <div class="infoboxType">
    <span>{{this.clef}}</span>
    <div class="infoboxTypeValue">
      <span>{{this.value}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoboxType",
  props : ["clef", "value"]
}
</script>

<style scoped>

</style>
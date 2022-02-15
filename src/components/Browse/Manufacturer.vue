<template>
<div class="manufacturer">
  <span>{{name}}</span>
</div>
</template>

<script>
export default {
  name: "Manufacturer",
  props:["name"],
}
</script>

<style scoped>
.manufacturer{
  /*width: ;*/
  flex: 10 0 auto;
  line-height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  height: 40px;
  margin-bottom: 10px;
  margin-right: 10px;
  border-radius: 8px;
  background: #302e38;
}

span{
  color: rgba(205, 203, 213, 0.75);
}
</style>
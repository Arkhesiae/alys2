<template>
  <div class="container">
    <div class="info-header">
      <span>{{ label }}</span>
      <img src="@/assets/icons/information-outline.svg" v-show="infoIcon" alt="">

    </div>
    <div class="info-value">
      <span>{{ value }}</span>
      <span class="unit">{{ unit }}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "InfoTile",
  props: ["label", "value", "infoIcon", "unit"]
}
</script>

<style scoped>

.info-value{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.info-value span{
  color: #ccc0fd;
  font-size: 32px;
  letter-spacing: 2px;
  font-weight: bold;
}

span.unit{
  font-size: 20px;
  margin-left: 10px;
  color: #7c7786;
}

.info-header {
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  height: 60px;
  justify-content: space-between;
}

.info-header span {
  color: #8f89a2;
  letter-spacing: 1px;

}

.info-header img {
  filter: invert(80%);
  width: 20px;
}

.container {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;
  display: flex;
  align-items: flex-end;
  /*justify-content: space-evenly;*/
  flex-direction: column;
  height: 110px;
  /*flex: 1 1 auto;*/
  min-width: 200px;
  max-width: 300px;
  border-radius: 14px;
  background: #34313D;
}
</style>
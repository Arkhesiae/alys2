<template>
  <div class="info-tile-container" :style="{background : background}">
    <div class="info-header">
      <span :style="{color : color}">{{ label }}</span>
      <img src="@/assets/icons/information-outline.svg" v-show="infoIcon" alt="">

    </div>
    <div class="info-value">
      <span :style="{color : color}">{{ value }}</span>
      <span :style="{color : color}" class="unit">{{ unit }}</span>

    </div>
  </div>
</template>

<script>
export default {
  name: "InfoTile",
  props: ["label", "value", "infoIcon", "unit", "background", "color"]
}
</script>

<style scoped>

.info-value{
  display: flex;

  align-items: flex-end;
  margin-right: 20px;
}

.info-value span{
  color: #ccc0fd;
  font-size: 28px;
  line-height: 100%;
  opacity: 0.9;
  letter-spacing: 2px;
  font-weight: bold;
}

span.unit{
  font-size: 20px;
  margin-left: 10px;
  padding-bottom: 1px;
  color: #a494c5;
  opacity: 0.7;
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
  opacity: 0.5;
  letter-spacing: 1px;

}

.info-header img {
  filter: invert(80%);
  width: 20px;
}

.info-tile-container {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 2px 8px 1px;
  display: flex;
  margin-right: 10px;
  align-items: flex-end;
  /*justify-content: space-evenly;*/
  flex-direction: column;
  height: 100px;
  flex: 1 1 auto;
  min-width: 100px;
  max-width: 300px;
  border-radius: 14px;
  background: #2c2934;
}
</style>
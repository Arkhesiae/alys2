<template>

  <div class="panel">
    <div class="" id="chart-container">
      <div class="canvas-container">
        <canvas height="250" id="altitude" width="400"></canvas>
      </div>

      <div class="canvas-container" id="sector-load">
        <canvas height="250" id="speed" width="400"></canvas>
      </div>

      <div class="canvas-container">
        <canvas height="250" id="mach" width="400"></canvas>
      </div>

      <div class="canvas-container" >
        <canvas height="250" id="force" width="400"></canvas>
      </div>

      <div class="canvas-container" >
        <canvas height="250" id="ROCD" width="400"></canvas>
      </div>
    </div>
    <div id="interface">
      <div class="instruction" id="climb">
        <div class="label">CLIMB</div>
        <label>
          <input id="climbInput" placeholder="Temps de montée">
        </label>
        <div>
          <button id="button-montee-vitesse">CAS / Mach constant</button>
        </div>
        <div>
          <button id="button-montee-acc">Accel</button>
        </div>
        <div>
          <button id="button-montee-dec">Decel</button>
        </div>
        <div>  <input class="ROCD" id="ROCDCLBtgt" placeholder="Target ROCD">
          <button class="ROCD" id="button-montee-ROCD">ROCD Constant</button>
        </div>
      </div>
      <div class="instruction" id="descent">
        <div class="label">DESCENT</div>
        <label>
          <input id="inputTempsDescent" placeholder="Temps de descente">
        </label>
        <div>
          <button id="button-descent-vitesse">CAS / Mach constant</button>
        </div>
        <div>
          <button id="button-descent-acc">Accel</button>
        </div>
        <div>
          <button id="button-descent-dec">Decel</button>
        </div>
        <div>  <input class="ROCD" id="ROCDEStgt" placeholder="Target ROCD">
          <button class="ROCD" id="button-descent-ROCD">ROCD Constant</button>
        </div>
      </div>
      <div class="instruction" id="speedy">
        <div class="label">SPEED</div>
        <label>
          <input placeholder="Target speed CAS">
        </label>
        <div>
          <button>Go target CAS</button>
        </div>
        <label>
          <input placeholder="Target speed Mach">
        </label>
        <div>
          <button>Go target Mach</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Graphe",
  components: {

  },
}
</script>
<style scoped>
* {
  margin:0;
  padding: 0;

}

body{
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  background: linear-gradient(200deg, rgb(54, 56, 70) 0%, rgba(22,21,21,1) 100%);
}

#panel{
  margin: 20px;
  position: relative;
  display: flex;
  height: 100%;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(200deg, rgb(122, 137, 236) 0%, rgba(22,21,21,1) 100%);
}

#interface{
  margin:20px;
  /*flex-grow: inherit;*/
  color: #6ea7c3;
  font-family: "Product Sans";
  font-size: 12px;
  display: flex;
  justify-content: space-around;
  font-weight: bold;
  box-sizing: border-box;
  padding: 50px;
  border-radius: 4px;
  height: 300px;
  /*width: 100%;*/
  box-shadow: rgba(0,0,0,0.51) 0px 2px 3px 0px;
  background: linear-gradient(200deg, rgb(30, 30, 39) 0%, rgba(22,21,21,1) 100%);
}

.instruction{
  color: #77878e;
  /*border: solid 1px blue;*/
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

#descent button{
  background: linear-gradient(200deg, rgb(95, 130, 148) 0%, rgba(22,21,21,1) 100%);
}

button{
  width: 160px;
  height: 30px;
  font-family: "Product Sans";
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  color: #1e1e1e;
  border-radius: 50px;
  box-shadow: rgba(0,0,0,0.21) 0px 2px 1px 0px;
  background: linear-gradient(200deg, rgb(236, 180, 149) 0%, rgb(90, 76, 65) 100%);
  transition: 0.5s all ease-in-out;
  border: none;
}

button:hover{
  /*width: 160px;*/
  height: 30px;
  font-family: "Product Sans";
  font-size: 10px;
  font-weight: bold;
  color: #1e1e1e;
  border-radius: 50px;
  box-shadow: rgba(0,0,0,0.51) 0px 2px 6px 0px;
  background: linear-gradient(200deg, rgba(190, 149, 127, 1) 0%, rgba(22,21,21,1) 100%);
  border: none;
}

.ROCD{
  width: 100px;
}

input.ROCD{
  width: 60px;
}

input{
  width: 80px;
  height: 30px;
  font-family: "Product Sans";
  font-size: 10px;
  padding-left: 10px;
  box-sizing: border-box;
  font-weight: bold;
  border: none;
  color: #949494;
  border-radius: 4px;
  outline: none;
  /*box-shadow: rgba(0,0,0,0.51) 0px 2px 3px 0px;*/
  background: linear-gradient(200deg, rgba(14, 14, 16, 0.5) 0%, rgba(22,21,21,0.9) 100%);
}

input:focus{
  border: none;
}

#chart-container{
  /*flex-grow: initial;*/
  /*border: 1px solid rgba(100, 100, 200,0.51);*/
  /*background: aliceblue;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.canvas-container{
  border-radius: 4px;
  width: 400px;
  box-sizing: border-box;
  margin: 5px;
  border: 1px solid rgba(100, 100, 200,0.0);
  box-shadow: rgba(0,0,0,0.51) 0px 2px 3px 0px;
  background: linear-gradient(200deg, rgb(28, 29, 37) 0%, rgba(22,21,21,1) 100%);
  transition: all 0.2s ease-in-out;
}

.canvas-container:hover{
  border-radius: 4px;

  margin: 5px;
  border: 1px solid rgba(100, 100, 200,0.01);
  box-shadow: rgba(0,0,0,0.51) 0px 2px 10px 3px;
  background: linear-gradient(200deg, rgb(28, 29, 37) 0%, rgba(22,21,21,1) 100%);
  /*background: rgb(26, 26, 26);*/
}
</style>
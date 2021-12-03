<template>
  <div class="sideBar">
    <div class="presentation">
      <div class="picture">
        <img src="../assets/airbus.jpg"/>
      </div>
      <div class="header">
        <div class="name">{{ aircraft.aircraftModel }}</div>
        <div class="lower-header">
          <div class="bar"/>
          <div class="ICAO-code">{{ aircraft.ICAO }}</div>
        </div>
        <!--            <div class="class-icon"><img src="../assets/jet.svg"/></div>-->
        <div class="menu-option"></div>
      </div>
    </div>
    <div class="container">
      <div class="engine">
        <img src="../assets/jet.svg"/>
        <div class="engine-number">2</div>
        <div class="engine-description">Réacteur</div>

      </div>
      <div class="charac">
        <div class="description">
          <h2>Wing position</h2>
          <p>Low wing</p>
          <h2>Engine position</h2>
          <p>Underwing mounted</p>
          <h2>Tail configuration</h2>
          <p>Regular tail, mid set Landing gear</p>
        </div>
      </div>
    </div>

    <div class="type">
      <div class="description">
        <h2>Information techniques</h2>
        <p>Masses, limitations</p>
      </div>
      <img src="../assets/chevron-right.svg">
    </div>
    <div class="misc">
      <img src="../assets/information-outline.svg"/>
      <p>
        L'Airbus A319 est une version raccourcie de l'A320
      </p>
    </div>

  </div>
</template>

<script>
export default {
  name: "SideBar",
  props : ["aircraft"]
}
</script>

<style scoped>
.sideBar {
  /*position: absolute;*/
  width: 320px;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 1px 3px 1px;
  border-left: 1px solid rgba(60, 60, 60, 0.07);
  background: rgba(25, 23, 23, 0.99);
  background-size: auto 100%;
  /*top:0;*/
  height: 100%;
  display: flex;
  /*padding-top: 50px;*/
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-around;
  flex-direction: column;
  /*right: 0px;*/
}


.misc {
  position: relative;
  border-radius: 8px;
  background: rgb(33, 33, 39);
  background: linear-gradient(45deg, rgba(45,49,60,1) 0%, rgba(65,72,88,1) 100%);
  box-shadow: rgba(5, 5, 5, 0.2) 0px 10px 15px 2px;
  height: 80px;
}

.misc p {
  width: 90%;
  box-sizing: border-box;
  margin: 20px;
  padding-left: 40px;
  font-style: italic;
  letter-spacing: 0px;
  color: #abb2c0;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
}

.misc img{
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  width: 20px;
  filter: invert(70%);
}

.container{
  display: flex;
  align-items: flex-start;
}

.charac {
  padding-top: 20px;
  padding-bottom: 20px;
  position: relative;
  align-self: center;
  border-radius: 8px;
  background: linear-gradient(45deg, rgb(88, 65, 80) 0%, rgb(88, 65, 80) 100%);
  box-shadow: rgba(5, 5, 5, 0.2) 0px 10px 15px 2px;
  width: 80%;
}

.engine{
  /*align-self: center;*/
  position: relative;
  height: 40px;
  margin-bottom: 10px;
  margin-right: 10px;
  justify-content: space-between;
  display: flex;
  border-radius: 8px;
  background: linear-gradient(45deg, rgb(169, 129, 183) 0%, rgb(46, 42, 44) 100%);
  box-shadow: rgba(5, 5, 5, 0.07) 0px 10px 15px 2px;
  width: 60%;
}

.engine .engine-number{
  position: absolute;
  font-weight: 900;
  font-family: Arial;
  left : 22px;
  font-size: 9px;
  top : 13px;
  color: #252424;
}

.engine-description{
  margin-right: 10px;
  font-weight: bold;
  padding-top: 10px;
  font-size: 14Px;
  color: #26212a;
}

.engine img{
  margin: 5px;
  filter: invert(15%);
  margin-left: 10px;
  width: 30px;
  height: 30px;
}

.charac, .misc{
  background: linear-gradient(45deg, rgb(46, 42, 43) 0%, rgb(46, 42, 44) 100%);
  box-shadow: rgba(5, 5, 5, 0.2) 0px 10px 15px 2px;
}

.charac .description{
  /*margin-top: 20px;*/

  /*margin-bottom: 20px;*/
}

.description {
  display: flex;

  padding-right: 20px;
  text-align: right;
  flex-direction: column;
}

.actype {
  width: 50px;
  font-size: 10px;
  display: inline;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
}

.charac .description h2 {
  font-size: 15px;
  line-height: 15px;
  color: #cab1f3;
  margin: 0;
  padding: 0;
}

.charac .description p {
  font-size: 12px;
  margin-top: 5px;
  color: #9e8fa1;
  line-height: 15px;
}

.type h2 {
  font-size: 15px;
  line-height: 15px;
  color: #1d102c;
  margin: 0;
  padding: 0;
}

.type p {
  font-size: 12px;
  margin-top: 2px;
  font-weight: bold;
  color: #3d274f;
  line-height: 12px;
}


.charac img {
  margin-left: 5px;
  width: 50px;
  height: 50px;
}

.type {
  justify-content: space-between;
  display: flex;
  height: 60px;
  box-shadow: rgba(5, 5, 5, 0.1) 0px 8px 8px 2px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  background: linear-gradient(237deg, rgba(48, 48, 48, 1) -30%, rgb(206, 178, 248) 150%);
  border-radius: 8px;
}

.type .description{
  padding-top: 13px;
  padding-left: 15px;
  text-align: left;
}

.type img{
  filter: invert(10%);
  margin-right: 10px;
  align-self: center;
}

.picture {
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  width: auto;
  overflow: hidden;
  height: 180px;
  border-radius: 8px;
}

.name {
  /*max-width: 200px;*/
  text-align: right;
  align-self: center;
  font-size: 15px;
  letter-spacing: 3px;
  font-weight: bold;
  font-family: "Product Sans", sans-serif;
  color: #9da6ba;
}

.bar {
  width: 3px;
  height: 24px;
  margin: 3px;
  margin-left: 5px;
  background: #d38eea;
  border-radius: 20px;
}

.picture img {
  width: 100%;
}

.header {
  display: flex;
  align-self: center;
  align-items: center;
  margin-top: 20px;
  width: max-content;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 5px;
}

.class-icon{
  width: 40px;
  border-radius: 40px;
  background: #3b3e48;
  box-shadow: #232323 0px 5px 5px 0px;
  height: 40px;
}

.lower-header {
  width: auto;
  display: flex;
  justify-content: space-between;
}

.ICAO-code {
  color: #b0b7c8;
  align-self: center;
  margin-left: 10px;
  top: 0;
  font-size: 30px;
  line-height: 25px;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
}

.presentation {
  display: flex;
  font-family: "Montserrat";
  flex-direction: column;
}

</style>
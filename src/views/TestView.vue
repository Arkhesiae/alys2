<template>
  <div id="page">
    <MenuButton/>
    <Background/>
    <nav class="nav-bar">
      <div class="nav-button active">Static</div>
      <div class="nav-button">Dynamic</div>
      <div class="select-bar"></div>
      <div class="searchbar-container">
        <div id="searchbar">
          <!--              STATIC-->
          <label for="search"></label>
          <input  autocomplete="off" placeholder="Search..." id="search" v-model="search">
          <div class="search-icon"  @click="erase()"><img v-if="search!==''" src="../assets/clear_black_24dp.svg" alt=""></div>
        </div>
        <ul class="wrapper">
          <li class="card" v-bind:key="post.title" v-for="post in filteredList">
            <div class="text-container">
              <p>
                {{ post.title.slice(0, post.title.indexOf(search.toUpperCase())) }}</p>
              <p class="highlight"> {{ search.toUpperCase() }}</p>
              <p>
                {{ post.title.slice(post.title.indexOf(search.toUpperCase()) + search.length, 8) }}</p>
              <a v-bind:href="post.link" target="_blank">

              </a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <div class = "current-frame"></div>
    <div class = "lower-frame"></div>
    <div class = "switch"></div>
    <div class="sideBar">
      <div class="presentation">
        <div class="header">
          <div class="name">AIRBUS A319</div>
          <div class="lower-header">
            <div class="bar"/>
            <div class="ICAO-code">A319</div>
          </div>


          <div class="menu-option"></div>
        </div>
        <div class="picture">
          <img src="../assets/airbus.jpg"/>
        </div>
      </div>
      <div class="charac">
        <img src="../assets/jet.svg"/><p class="actype">JET</p>
        <div class="description">
          <h2>Wing position</h2>
          <p>Low wing</p>
          <h2>Engine position</h2>
          <p>Underwing mounted</p>
          <h2>Tail configuration</h2>
          <p>Regular tail, mid set Landing gear</p>
        </div>

      </div>
      <div class="type">
        <div class="description">
        <h2>Masse a vide</h2>
        <p>60 000kg</p>
        </div>
      </div>
      <div class="misc">
        <p>
          L'Airbus A319 est une version raccourcie de l'A320
        </p>
      </div>

    </div>
  </div>
</template>

<script>

import MenuButton from "@/components/MenuButton"
import Background from "@/components/Background"

export default {
  name: "TestView",
  components: {
    MenuButton,
    Background,
  },

}
</script>

<style scoped>

/**{*/
/*  border: 1px solid blue;*/
/*}*/
#page{
  width: 100%;
  position: relative;
  height: 100%
}

.sideBar{
  position: absolute;
  width: 380px;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  top:0;
  height: 100%;
  display: flex;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  justify-content: space-around;
  flex-direction: column;
  background: #282b33;
  right: 0px;
}


.misc{
  border-radius: 8px;
  background: rgb(33, 33, 39);
  border-left: 8px solid rgba(223, 122, 91, 1);
  height: 80px;
}

.misc p{
  width: 90%;
  margin: 5%;
  font-style: italic;
  letter-spacing: 0px;
  color: #abb2c0;
  font-family: "Product Sans", sans-serif;
  font-size: 14px;
}

.switch {
  width: 64px;
  position: absolute;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  left: 35%;
  bottom: 3%;
  height: 64px;
  border-radius: 50%;
  background: rgb(167, 106, 88);

}

.current-frame{
  position: absolute;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  width: 72%;
  top: 15%;
  height: 60%;
  left: 1%;
  background: #282b33;
  border-radius: 16px;
}

.lower-frame{
  bottom: 0px;
  position: absolute;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  width: 72%;
  /*top: 15%;*/
  height: 6%;
  left: 1%;
  background: #282b33;
  border-radius: 30px 30px 0 0 ;
}

.charac{
  height: 250px;
  border-radius: 8px;
  background: rgb(33, 33, 39);
  /*box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;*/
  width: 80%;
}

.description{
  display: flex;
  padding-right: 20px;
  text-align: right;
  flex-direction: column;
}

.actype{
  width: 50px;
  font-size: 10px;
  display: inline;
  font-family: "Product Sans", sans-serif;
  font-weight: bold;

}

.charac .description h2{
  font-size: 15px;
  line-height: 15px;
  color: #d1836b;
  margin: 0;
  padding: 0;
}

.charac .description p{
  font-size: 12px;
  margin-top: 5px;
  line-height: 15px;
}

.type h2{
  font-size: 15px;
  line-height: 15px;
  color: #1a1a1a;
  margin: 0;
  padding: 0;
}

.type p{
  font-size: 12px;
  margin-top: 5px;
  color: #1a1a1a;
  line-height: 15px;
}


.charac img{
  margin-left: 5px;
  width: 50px;
  height: 50px;
}

.type{
  height: 130px;
  padding-top: 20px;
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  background: linear-gradient(237deg, rgba(48, 48, 48, 1) -30%, rgba(223, 122, 91, 1) 150%);
  border-radius: 8px;
  /*background: #aeb9d5;*/
}

.picture{
  box-shadow: rgba(5, 5, 5, 0.2) 0px 1px 2px 0px, rgba(5, 5, 5, 0.2) 0px 2px 4px 2px;
  width: auto;
  overflow: hidden;
  height: 180px;
  border-radius: 8px;
  /*background: #6480ca;*/
}

.name{
  font-family: "Product Sans", sans-serif;
  color: #9da6ba;
  font-size: 30px;
}

.bar{
  width: 5px;
  /*display: inline;*/
  height: 20px;
  margin : 3px;
  margin-left:5px;
  background: #ca8364;
  border-radius: 20px;
}

.picture img{
  width: 100%;
}

.header{
  display: flex;
  width: max-content;
  flex-direction: column;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 5px;
}

.lower-header{
  width: auto;
  display: flex;
  justify-content: space-between;
}

.ICAO-code{
  color : #4b4e56;
  margin-left: 50px;
  /*margin-bottom: 20px;*/
  top:0;
  /*position: absolute;*/
  font-size: 20px;
  line-height: 25px;
  /*padding-bottom: 5px;*/
  font-family: "Product Sans", sans-serif;
  font-weight: bold;
  /*display: inline*/
}

.presentation{
  /*height: 500px;*/
}


.nav-bar{
  display: flex;
  color: #6f747f;
  justify-content: space-around;
  box-sizing: border-box;
  /*border: 2px #ff2525 solid;*/
  width: 60%;
  left : 10%;
  z-index: 100;
  margin-top:20px;
  position: absolute;
  height: 64px;
  font-size: 22px;
}

.nav-bar .nav-button{
  padding-top: 20px;
  cursor: pointer;
}

.nav-button.active{
  color: #ba7b5e;
}

.select-bar{
  background: #ba7b5e;
  position: absolute;
  bottom: 10px;
  left:40px;
  width: 60px;
  height: 2px;
}


.searchbar-container{
  position: relative;
}

#searchbar {
  transition: all 0.7s ease-in-out;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;*/
  /*width: 500px;*/
  height: 60px;
  overflow: hidden;
  background: #A4A8B1;
  /*display: inline;*/
  width: min-content;
  display: flex;
  z-index: 400;
  border-radius: 8px;
}

#searchbar input {
  position: relative;
  border: none;
  background: none;
  color: #4f4e4e;
  font-family: inherit;
  font-size: inherit;
  /*font-weight: bold;*/
  box-sizing: border-box;
  outline: none;
  padding-left: 40px;
  /*display: inline;*/

  width: 400px;

  /*border-radius: 60px;*/
  height: 60px;
  font-size: 20px;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
}

.search-icon {
  position: relative;
  width: 60px;
  height: 60px;
  /*display: inline;*/
  cursor: pointer;
}


.search-icon img {
  width: 30px;
  height: 30px;
  margin: 15px;
  /*display: inline;*/
  cursor: pointer;
}

.wrapper {
  margin: 0;
  position: absolute;
  top: 0;
  list-style: none;
  display: flex;
  /*z-index: 1000;*/
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  transition: all 0.7s ease-in-out;
  width: 400px;
  height: auto;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 8px 8px 8px 8px;
  overflow: hidden;
  background: #2B2F37;
  padding-top: 60px;
  padding-left: 0;
}

.card {
  font-size: 20px;
  color: #afafaf;
  font-family: inherit;
  /*font-size: inherit;*/
  /*font-weight: bold;*/
  box-sizing: border-box;
  /*outline: none;*/
  padding-top: 20px;
  cursor: pointer;
  padding-left: 40px;
  /*background: #2B2F37;*/
  /*box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;*/
  width: 560px;
  height: 60px;
  /*transition: .3s all ease-in-out;*/

}

.card:hover {
  background: #292b32;
}

.card .text-container {
  display: flex;
}

.card p, .card h1 {
  font-size: 20px;
  color: #808080;
  padding: 0;
  margin: 0;

}

.card .highlight {
  color: #afafaf;
}

</style>
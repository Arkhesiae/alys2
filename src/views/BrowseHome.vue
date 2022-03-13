<template>
  <Background></Background>
  <div class="nav-bar">
    <router-link style="text-decoration: none; color: inherit; position: relative" :to="{ name: 'BrowseHome'}">
      <HamburgerButton @touchstart="showMenu = !showMenu" @mousedown="showMenu = !showMenu"></HamburgerButton>
    </router-link>

  </div>
  <Menu :class="{visible : showMenu}"></Menu>
  <div class="ctn">
    <div class="elmt">
      <div class="header">
        <div class="name">
          <span>Parcourir</span>
        </div>
        <router-link style="text-decoration: none; color: inherit; position: relative" :to="{ name: 'PlaneList'}">
        <div class="option">
          <span>Voir tout</span>
          <img src="@/assets/icons/chevron-right.svg" alt="">
        </div>
          </router-link>
      </div>
      <ul class="content">
        <li v-bind:key="ac.name" v-for="ac in tileList">
          <router-link style="text-decoration: none; color: inherit; position: relative"  :to="'/plane/'+ac.ICAO+'/'">
          <PlaneTile  :ICAO="ac.ICAO" :name="ac.aircraftModel" :img="ac.png"
                     :manufactuer="ac.manufacturer" :engineType="ac.engineType" style="height : 160px"></PlaneTile>
         </router-link>
        </li>

      </ul>
    </div>


    <div class="elmt">
      <div class="header">
        <div class="name">
          <span>Catégorie</span>
        </div>
      </div>
      <ul class="content">
        <Category v-bind:key="cat.name" v-for="cat in categories" :name="cat.name" :icon="cat.icon"
                  :count="cat.count"></Category>
      </ul>
    </div>


    <div class="elmt">
      <div class="header">
        <div class="name">
          <span>Constructeur</span>
        </div>
      </div>
      <ul class="content man">
        <Manufacturer v-bind:key="man" v-for="man in manufacturers" :name="man"></Manufacturer>
      </ul>
    </div>
  </div>
</template>

<script>
import HamburgerButton from "@/components/Nav/HamburgerButton"
import Background from "@/components/Nav/Background"
import Category from "@/components/Browse/Category"
import {formattedList, Manufacturers} from "@/BADA/Data/dataFormatting"
import Manufacturer from "@/components/Browse/Manufacturer"
import PlaneTile from "@/components/Browse/PlaneTile"
import {imageData} from "@/BADA/Data/imagesRef"
import Menu from "@/components/Nav/Menu"

export default {
  name: "BrowseHome",
  components: {PlaneTile, Manufacturer, Category, Background, HamburgerButton, Menu},
  data() {
    return {
      showMenu : false,
      manufacturers: "",
      highlights : [],
      categories: [
        {
          name: "Réacteur",
          icon: "jet",
        },
        {
          name: "Turboprop.",
          icon: "option2",
          count: "",
        },
        {
          name: "Piston",
          icon: "piston",
        }
      ],
    }
  },
  beforeMount() {
    this.imageRef = imageData
    this.highlights = imageData.filter((ac) => ac.png !== undefined)
    this.tileList = []

    this.highlights.forEach((ac)=>{
        let acInfo = formattedList.find((obj) => obj.ICAO === ac.ICAO);
        acInfo.png = ac.png
        this.tileList.push(acInfo)
    })
    console.log(this.tileList)

    this.manufacturers = Manufacturers
    this.categories[1].count = formattedList.filter((obj) => obj.engineType === "TURBOPROP").length;
    this.categories[0].count = formattedList.filter((obj) => obj.engineType === "JET").length;
    this.categories[2].count = formattedList.filter((obj) => obj.engineType === "PISTON").length;
  },
}
</script>

<style scoped>
.ctn {
  box-sizing: border-box;
  /*padding-left: 20px;*/
  /*padding-right: 20px;*/
  margin-top: 60px;
  height: 100%;
  width: 100%;
  display: flex;
  /*justify-content: space-between;*/
  flex-direction: column;
}

.content {
  padding-left: 20px;
  display: flex;
  overflow-x: auto;
  overflow-y: auto;
  padding-top: 40px;
  box-sizing: border-box;
}

ul {
  padding: 0;
  margin: 0;
}

.elmt {
  margin-bottom: 40px;
}


.content.man {
  flex-wrap: wrap;
  /*height: 200px;*/
  /*overflow-y: hidden;*/
  /*overflow-x: auto;*/
  width: 300vw;
}


.header {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}

.name span {
  font-size: 18px;
  font-family: "Product Sans";
  letter-spacing: 1px;
  color: #b6b4be;
  font-weight: bold;
}

.option span {
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  font-family: "Product Sans";
  letter-spacing: 1px;
  /*font-weight: bold;*/
  color: #aba0d5;
}

.option{
  display: flex;
  align-items: center;
}

.option img{
  width: 20px;
  filter: invert(95%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);
}



</style>
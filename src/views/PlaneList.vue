<template>
  <Background></Background>
  <div class="nav-bar">
    <router-link style="text-decoration: none; color: inherit; position: relative" :to="{ name: 'BrowseHome'}">
      <BackButton></BackButton>
    </router-link>
    <div class="ctn">
      <div class="searchbar-container">
        <div id="searchbar">
          <!--              STATIC-->
          <label for="search"></label>

          <span class="placeholder" :class="{collapsed : collapse}">Type d'appareil</span>
          <input autocomplete="off" placeholder="" id="search" v-model="search" @blur="focused = false" @focus="magic_flag = true; focused = true">
<!--          <input autocomplete="off" placeholder="Search..." id="search" v-model="search" @focus="magic_flag = true">-->
          <div class="search-icon" @click="erase()"><img v-if="search!==''" src="@/assets/icons/clear_black_24dp.svg"
                                                         alt=""></div>
        </div>
      </div>
    </div>

  </div>
  <div class="filters">
    <HButton @click="filter.active = !filter.active" :icon="filter.icon" :text="filter.name" :is-filter="true"
             :class="{selected : filter.active}" v-bind:key="filter.name" v-for="filter in filters"></HButton>
  </div>
  <div class="ctn-all">

    <ul class="ctn-cards">

      <li class="card" v-bind:key="post.ICAO" v-for="post in this.filteredList.slice(0,500)">
        <router-link style="text-decoration: none; color: inherit; width: 100%; height: 100%"
                     :to="'/plane/'+post.ICAO+'/'">
          <!--        <img alt="" :src="image(post)"/>-->
          <div class="ctn">
            <div class="description">
              <span class="ICAO">{{ post.ICAO }}</span>
              <span class="model">{{ post.aircraftModel }}</span>
            </div>

            <div class="details">
              <!--              <span class="engine">{{ post.engineType }}</span>-->
              <img :src="imageSVG(icons[post.engineType.toLowerCase()])" alt="">
              <div class="manufacturer">
                <img src="@/assets/icons/hammer-wrench.svg" alt="">
                <span class="manufacturer-name">{{ post.manufacturer }}</span>
              </div>

            </div>
          </div>

        </router-link>
        <!--          <div >-->
        <!--            -->
        <!--          </div>-->
        <!--          <router-link @click="magic_flag=false" style="text-decoration: none; color: inherit; width: 100%; height: 100%"-->
        <!--                       :to="'/plane/'+post.ICAO+'/'">-->
        <!--            <div class="text-container">-->
        <!--              <p>-->
        <!--                {{ post.ICAO.slice(0, post.ICAO.indexOf(search.toUpperCase())) }}</p>-->
        <!--              <p class="highlight"> {{ search.toUpperCase() }}</p>-->
        <!--              <p>-->
        <!--                {{ post.ICAO.slice(post.ICAO.indexOf(search.toUpperCase()) + search.length, 8) }}</p>-->
        <!--              <p class="fullName">{{ post.aircraftModel }}</p>-->

        <!--            </div>-->
        <!--          </router-link>-->
      </li>

    </ul>
  </div>

</template>

<script>
import Background from "@/components/Nav/Background"
import {formattedList} from "@/BADA/Data/dataFormatting"
import {imageData} from "@/BADA/Data/imagesRef"
// import HamburgerButton from "@/components/Nav/HamburgerButton"
import BackButton from "@/components/Nav/BackButton"
import HButton from "@/components/Nav/hButton"
// import url from "@/assets/icons/airplane-edit.svg"

export default {
  name: "PlaneList",
  components: {HButton, BackButton, Background},
  data() {
    return {
      filters: {
        jet: {
          active: false,
          icon: "jet.svg",
          name: "Réacteur"
        },
        turboprop: {
          active: false,
          icon: "option.svg",
          name: "Turboprop."
        },
        piston: {
          active: false,
          icon: "piston.svg",
          name: "Piston"
        },
        airbus: {
          active: false,
          icon: "aircraft-edit.svg",
          name: "Airbus"
        },
        boeing: {
          active: false,
          icon: "aircraft-edit.svg",
          name: "Boeing"
        },
      },
      search: '',
      focused: false,
      magic_flag: false,
      postList: [],
      icons:
          {
            jet: "jet",
            turboprop: "option2",
            piston: "piston"
          },

    }
  },
  mounted() {
    this.postList = formattedList
  },

  beforeMount() {
    // this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)

  },


  computed: {
    collapse(){
      return (this.focused || this.search !== "")
    },
    // imageID : function (){
    //
    // },
    //
    // activeFilters() {
    //
    //     console.log(this.filters)
    //     return Object.keys(this.filters).find((object)=>object.active)
    // },

    searchList(){
      if (this.search == "") {
        return this.postList
      }


      return this.postList.filter(post => {
        return (((post.ICAO.toLowerCase().includes(this.search.toLowerCase())) || (post.aircraftModel?.toLowerCase().includes(this.search.toLowerCase()))))
      })
    },

    filteredList() {
      let activeFilters = []
      Object.keys(this.filters).forEach((filter) => {
        // console.log(filter)
        if (this.filters[filter].active) {
          activeFilters.push(filter)
        }
      })

      if (activeFilters.length === 0){
        return this.searchList
      } else{
        return  this.searchList.filter(post => {
          return activeFilters.includes(post.engineType.toLowerCase())
        })
      }



    },

  },
  methods: {

    imageSVG(url) {
      try {
        // a path we KNOW is totally bogus and not a module
        let imageUrl = require('@/assets/icons/' + url + '.svg')
        return imageUrl
      } catch (e) {
        let imageUrl = require('@/assets/icons/airplane-edit.svg')

        return imageUrl
      }

    },
    image(post) {
      let imageID = ""
      let imageRef = imageData.find(AC => AC.ICAO === post.ICAO)
      if (imageRef) {
        imageID = imageRef.imageIDs[Math.floor(Math.random() * imageRef.imageIDs.length)].toString()
      }
      // else imageID =  ""
      try {
        // a path we KNOW is totally bogus and not a module
        let url = require('@/assets/Images/' + imageID + '.jpg')
        return url
      } catch (e) {
        let url = require('@/assets/icons/airplane-edit.svg')

        return url
      }
    },

    erase() {
      this.search = ""
// document.getElementById('search').value = ""
    },

  },

}
</script>


<style scoped>
ul {
  list-style: none;
}

* {
  user-select: none;
}

.filters {
  display: flex;
  padding-left: 40px;
  overflow-x: auto;
}

.filters .container {
  margin-right: 10px;
}

@media (max-width: 737px) and (min-width: 100px) {
  .ctn-all {
    padding-left: 5px !important;
    padding-right: 5px !important;
  }
}

.nav-bar {
  padding: 20px !important;
  width: 100% !important;
  box-sizing: border-box;
  margin: 0 !important;
}

.ctn-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*padding: 20px;*/
  width: 100%;
  /*padding-top: 30px;*/
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
  height: 100%;
}

.card img {
  width: 100%;
  height: 140px;
}

.card {
  overflow: hidden;
  /*max-width: 200px;*/
  width: 100%;
  flex: 0 1 auto;
  height: 60px;
  border-radius: 8px;
  margin: 5px;

  /*border: 1px solid #272727;*/
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.09) 0 1px 3px 1px;
  background: #2b2937;
}

.card .ctn {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
}

.card .details {
  margin-right: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
  flex-direction: column;
}

.details img {
  width: 20px;
  height: 20px;
  filter: invert(95%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);
}

.manufacturer {
  color: rgba(137, 138, 208, 0.53);
  height: 16px;
  display: flex;
}

.manufacturer img {
  height: 16px;
  filter: invert(45%) sepia(20%) saturate(841%) hue-rotate(200deg) brightness(90%) contrast(88%);

  width: 16px;
  margin-right: 5px;
}

.manufacturer span {
  line-height: 16px;
  font-size: 16px !important;
  padding: 0;
  margin: 0;
}

.card .description {
  display: flex;
  padding: 10px;
  /*height: 200px;*/
  box-sizing: border-box;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: space-evenly;
}

.card .ICAO {
  font-size: 20px;
  color: rgba(191, 187, 199, 0.89);
  font-weight: bold;
}

.card .model {
  color: rgba(167, 161, 197, 0.63);
  font-size: 12px;
  /*font-weight: bold;*/
}


.ctn-cards {

  overflow-y: auto;
  z-index: 10;
  align-items: center;
  padding: 0;
  /*padding-top: 20px;*/
  /*padding-right: 10px;*/
  /*padding-left: 10px;*/
  margin: 0;
  padding-top: 30px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  /*flex: 1 1 auto;*/
  width: calc(100% - 40px);
}


.searchbar-container {
  flex-basis: auto;
  border-radius: 12px;
  flex-grow: 1;
  background: #2c2a32;
  min-width: 300px;
  /*max-width: 50%;*/
  position: relative;
}

#searchbar {
  transition: all 0.7s ease-in-out;
  position: relative;
  /*box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;*/
  /*width: 500px;*/
  box-sizing: border-box;
  /*border: 1px rgba(86, 86, 86, 0.04) solid;*/
  height: 60px;
  /*overflow: hidden;*/
  /*background: rgba(43, 47, 55, 0.06);*/
  /*display: inline;*/
  width: calc(100%);
  display: flex;
  z-index: 400;
  border-radius: 8px;
}

#searchbar input {
  position: relative;
  border: none;
  background: none;
  color: rgba(197, 194, 206, 0.93);
  font-family: inherit;
  /*font-size: inherit;*/
  font-weight: normal !important;
  box-sizing: border-box;
  outline: none;
  letter-spacing: 1px;
  padding-left: 40px;
  /*display: inline;*/
  width: calc(100% - 60px);
  /*width: 500px;*/

  /*border-radius: 60px;*/
  height: 60px;
  font-size: 16px;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
}

#searchbar .placeholder {
  position: absolute;
  height: 60px;
  line-height: 60px;
  pointer-events: none;
  padding-left: 40px;
  top: 0px;
  font-size: 16px;
  color: rgba(110, 106, 123, 0.93);
  transition: all 0.4s ease-in-out;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
}

span.placeholder.collapsed {
  top: -40px !important;
  padding-left: 20px !important;
  font-size: 12px !important;
}

.search-icon {
  position: relative;
  width: 60px;
  height: 100%;
  /*display: inline;*/
  cursor: pointer;
  display: flex;
  justify-content: space-around;
  align-items: center;
}


.search-icon img {
  width: 30px;
  height: 40%;
  margin: auto;
  filter: invert(70%);
  /*display: inline;*/
  cursor: pointer;
}

.wrapper {
  margin: 0;
  position: absolute;
  top: 0;
  list-style: none;
  display: flex;
  /*border: 1px #3b3e41 solid;*/
  box-sizing: border-box;
  /*z-index: 1000;*/
  /*box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;*/
  transition: all 0.7s ease-in-out;
  width: 100%;
  height: auto;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(29, 28, 30, 1);
  padding-top: 60px;
  padding-left: 0;
}

/*.card {*/
/*  font-size: 20px;*/
/*  color: #afafaf;*/
/*  font-family: inherit;*/
/*  !*font-size: inherit;*!*/
/*  !*font-weight: bold;*!*/
/*  box-sizing: border-box;*/
/*  !*outline: none;*!*/
/*  padding-top: 20px;*/
/*  cursor: pointer;*/
/*  padding-left: 40px;*/
/*  !*background: #2B2F37;*!*/
/*  !*box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px;*!*/
/*  width: 100%;*/
/*  height: 60px;*/
/*  !*transition: .3s all ease-in-out;*!*/

/*}*/

.card:hover {
  background: #292b32;
}

.card .text-container {
  display: flex;
}

.card p, .card h1 {
  font-size: 20px;
  color: #595064;
  padding: 0;
  margin: 0;

}

p.fullName {


  color: #886599;
  font-size: 14px !important;
  padding-left: 20px !important;
  padding-top: 5px !important;
}

.card .highlight {
  color: #dfa8ec;
}
</style>
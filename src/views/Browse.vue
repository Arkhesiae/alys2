<template>
  <Background></Background>
  <div class="ctn-all">
    <div class="searchbar-container">
      <div id="searchbar">
        <!--              STATIC-->
        <label for="search"></label>
        <input autocomplete="off" placeholder="Search..." id="search" v-model="search" @focus="magic_flag = true">
        <div class="search-icon" @click="erase()"><img v-if="search!==''" src="@/assets/icons/clear_black_24dp.svg"
                                                       alt=""></div>
      </div>
      <!--      <ul class="wrapper">-->
      <!--        <li class="card" v-show="this.magic_flag" v-bind:key="post.ICAO" v-for="post in filteredList">-->
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
      <!--        </li>-->
      <!--      </ul>-->
    </div>
    <ul class="ctn-cards">

      <li class="card" v-bind:key="post.ICAO" v-for="post in this.postList.slice(0, 900)">
        <img alt="" :src="image(post)"/>
        <div class="description">
              <span class="ICAO">{{ post.ICAO }}</span>
              <span class="model">{{ post.aircraftModel }}</span>
        </div>
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
// import url from "@/assets/icons/airplane-edit.svg"

export default {
  name: "Browse",
  components: {Background},
  data() {
    return {
      search: '',
      magic_flag: false,
      postList: []
    }
  },
  mounted() {
    let ref = this
    this.postList = formattedList
    // this.postList = formattedList
    window.addEventListener('click', function () {
      console.log(ref.magic_flag)
    })
  },

  beforeMount() {
    console.warn("MOUNT")
    // this.imageRef = imageData.find(AC => AC.ICAO === this.aircraft.ICAO)

  },


  computed: {
    // imageID : function (){
    //
    // },
    //
    // imageURL : function (){
    //
    //   // return  ""
    // },

    filteredList() {
      if (this.search == "") {
        return
      }
      return this.postList.filter(post => {
        return (post.ICAO.toLowerCase().includes(this.search.toLowerCase()))
      }).slice(0, 7)
    },

  },
  methods: {
    image(post) {
      let imageID = ""
      let imageRef = imageData.find(AC => AC.ICAO === post.ICAO)
      if (imageRef) {
        imageID = imageRef.imageIDs[Math.floor(Math.random( )*imageRef.imageIDs.length)].toString()
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
* {
  user-select: none;
}

.ctn-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*padding: 20px;*/
  width: 100%;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  height: 100%;
}

.card img {
  width: 100%;
  height: 140px;
}

.card {
  overflow: hidden;
  max-width: 200px;
  width: 200px;
  flex: 0 1 auto;
  height: 220px;
  border-radius: 8px;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.59) 0 1px 3px 1px;
  background: linear-gradient(45deg, rgb(39, 37, 40) -0%, rgb(42, 41, 46) 110%);

}

.card .description{
  display: flex;
  padding: 10px;
  /*height: 200px;*/
  box-sizing: border-box;
  flex:1 1 auto;
  flex-direction: column;
  justify-content: space-evenly;
}

.card .ICAO{
  font-size: 20px;
  color: #d1cbcb;
  font-weight: bold;
}

.card .model {
  color: #a5a4a4;
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
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex: 1 1 auto;
  width: calc(100% - 40px);
}


.searchbar-container {
  flex-basis: auto;
  border-radius: 12px;
  flex-grow: 1;
  background: #1a1a1a;
  min-width: 300px;
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
  overflow: hidden;
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
  color: #afafaf;
  font-family: inherit;
  font-size: inherit;
  /*font-weight: bold;*/
  box-sizing: border-box;
  outline: none;
  padding-left: 40px;
  /*display: inline;*/
  width: calc(100% - 60px);
  /*width: 500px;*/

  /*border-radius: 60px;*/
  height: 60px;
  font-size: 20px;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
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
<template>
  <div class="searchbar-container">
    <div id="searchbar">
      <!--              STATIC-->
      <label for="search"></label>
      <input autocomplete="off" placeholder="Search..." id="search" v-model="search">
      <div class="search-icon" @click="erase()"><img v-if="search!==''" src="../assets/clear_black_24dp.svg"
                                                     alt=""></div>
    </div>
    <ul class="wrapper">
      <li class="card" v-bind:key="post.ICAO" v-for="post in filteredList">
        <router-link style="text-decoration: none; color: inherit"
                     :to="'/plane/'+post.ICAO+'/'">
          <div class="text-container">
            <p>
              {{ post.ICAO.slice(0, post.ICAO.indexOf(search.toUpperCase())) }}</p>
            <p class="highlight"> {{ search.toUpperCase() }}</p>
            <p>
              {{ post.ICAO.slice(post.ICAO.indexOf(search.toUpperCase()) + search.length, 8) }}</p>
            <p class="fullName">{{ post.aircraftModel }}</p>

          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {formattedList} from "@/BADA/dataFormatting"


// class Post {
//   constructor(title, link, author, img) {
//     this.title = title;
//     this.fullname = link;
//     this.link = title;
//     this.author = author;
//     this.img = img;
//   }
// }

export default {
  name: "Searchbar",
  data() {
    return {
      search: '',
      postList: []
    }
  },

  mounted() {
     this.postList = formattedList
  },

  computed: {
    filteredList() {
      if (this.search == "") {
        return
      }
      return this.postList.filter(post => {
        return (post.ICAO.toLowerCase().includes(this.search.toLowerCase()))
      }).slice(0,7)
    },

  },
  methods: {
    erase() {
      this.search = ""
      // document.getElementById('search').value = ""
    },

  },
}
</script>

<style scoped>
*{
  user-select: none;
}

.searchbar-container {
  flex-basis: auto;
  flex-grow: 1;
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
  height: 60px;
  /*display: inline;*/
  cursor: pointer;
}


.search-icon img {
  width: 30px;
  height: 30px;
  margin: 15px;
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
  background: #191819;
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
  width: 100%;
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
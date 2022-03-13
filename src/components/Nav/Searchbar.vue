<template>
  <div class="searchbar-container purple" >
    <div id="searchbar">
      <!--              STATIC-->
      <label for="search"></label>
      <input autocomplete="off" placeholder="" id="search" v-model="search" @blur="focused = false" @focus="magic_flag = true; focused = true">
      <span class="placeholder" :class="{collapsed : collapse}">Type d'appareil</span>
      <div class="search-icon" @click="erase()"><img v-if="search!==''" src="../../assets/icons/clear_black_24dp.svg"
                                                     alt=""></div>
    </div>
    <ul class="wrapper">
        <li class="card" v-show="this.magic_flag" v-bind:key="post.ICAO" v-for="post in filteredList">
        <router-link @click="magic_flag=false" style="text-decoration: none; color: inherit; width: 100%; height: 100%"
                     :to="'/plane/'+post.ICAO+'/'">
          <div class="text-container">
            <p>{{ beforeHighlight(post.ICAO) }}</p>
<!--            <p>{{ post.ICAO.slice(0, post.ICAO.indexOf(search.toUpperCase())) }}</p>-->
            <p class="highlight">{{ highlight(post.ICAO) }}</p>
            <p >{{ afterHighlight(post.ICAO) }}</p>
<!--            <p>{{ post.ICAO.slice(post.ICAO.indexOf(search.toUpperCase()) + search.length, 8) }}</p>-->


            <p class="fullName">{{ post.aircraftModel }}</p>
<!--            <p class="fullName highlight">{{ post.aircraftModel?.slice(post.aircraftModel?.indexOf(search.toUpperCase()), post.aircraftModel?.indexOf(search.toUpperCase()) + search.length ) }}</p>-->
<!--            <p class="fullName">{{ post.aircraftModel?.slice(post.aircraftModel?.indexOf(search.toUpperCase()) + search.length, 9) }}</p>-->

          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {formattedList} from "@/BADA/Data/dataFormatting"


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
      focused : false,
      search: '',
      magic_flag : false,
      postList: []
    }
  },

  mounted() {
    this.postList = formattedList
  },

  computed: {




    collapse(){
      return (this.focused || this.search !== "")
    },

    filteredList() {
      if (this.search == "") {
        return
      }
      return this.postList.filter(post => {
        return (((post.ICAO.toLowerCase().includes(this.search.toLowerCase())) || (post.aircraftModel?.toLowerCase().includes(this.search.toLowerCase()))))
      }).slice(0,5)
    },

  },
  methods: {
    beforeHighlight(text){
      // console.log(text, this.search)
      if (text.indexOf(this.search.toUpperCase()) === -1){
        return text
      } else return text.slice(0, text.indexOf(this.search.toUpperCase()))
    },

    highlight(text){
      // console.log(text, this.search)
      if (text.indexOf(this.search.toUpperCase()) === -1){
        // console.log("bite")
        return ""
      } else return text.slice(text.indexOf(this.search.toUpperCase()), text.indexOf(this.search.toUpperCase()) + this.search.length)
    },

    afterHighlight(text){
      if (text.indexOf(this.search.toUpperCase()) === -1){
        return ""
      } else return text.slice(text.indexOf(this.search.toUpperCase()) + this.search.length, 8)
    },

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
  min-width: 400px;
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



/*#searchbar input:focus input::placeholder {*/
/*  !*position: absolute;*!*/
/*  display: none;*/
/*  !*left : 50px;*!*/
/*  !*opacity: 1;*!*/
/*  !*color: rgba(110, 106, 123, 0.93);*!*/

/*  !*box-shadow: #ffffff 2px 2px 5px 5px;*!*/
/*}*/

/*.wrapper {*/
/*  background: #3A354A !important;*/
/*}*/

.searchbar-container.purple .wrapper {
  background: rgb(45, 42, 55) !important;
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
  position: relative;
}

.card p, .card h1 {
  font-size: 20px;
  color: #8c7f9b;
  padding: 0;
  margin: 0;

}

p.fullName {


  color: #5f5766;
 right: 0;
  text-align: right;

  position: absolute;
  padding-right: 20px;
  /*bottom: -15px;*/
  font-size: 12px !important;
  /*padding-left: 20px !important;*/
  /*padding-top: 5px !important;*/
}

.card .highlight {
  color: #ddc3f8;
}

</style>
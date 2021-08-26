<template>

  <!--    <MenuButton/>-->
  <!---->
  <!--  <Background/>-->
  <div >

    <div class="page-container">
      <div class="page">
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
        <div id="browse">
          Browse
        </div>
      </div>

      <!--      <div class="page">-->
      <!--        <div class="page-content">-->
      <!--          <div class="searchbar-container">-->
      <!--            <div id="searchbar">-->
      <!--              <label for="search"></label><input placeholder="Search..." id="search">-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->
      <!--      <div class="page">-->
      <!--        <div class="page-content"></div>-->
      <!--      </div>-->
    </div>
    <!--    </transition>-->
  </div>


  <!--  <router-view v-slot="{ Component }">-->


</template>

<script>
// @ is an alias to /src
// import Background from "../components/Background"
// import MenuButton from "../components/MenuButton"
class Post {
  constructor(title, link, author, img) {
    this.title = title;
    this.link = link;
    this.author = author;
    this.img = img;
  }
}
export default {

  name: 'Static',
  data (){
    return{
      // empty:true,
      search: '',
      postList: [
        new Post(
            'A318',
        ),
        new Post(
            'A320',
        ),
        new Post(
            'A321',
        ),
        new Post(
            'B747',
        ),
        new Post(
            'B744',
        ),
        new Post(
            'B764',
        ),
        new Post(
            'B789',
        ),
        new Post(
            'B756',
        ),
        new Post(
            'B73M',
        ),
      ]
    }
  },
  computed: {
    filteredList() {
      if (this.search == "") {
        return
      }
      return this.postList.filter(post => {
        return post.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },


  },
  methods : {
    erase(){
      this.search = ""
      // document.getElementById('search').value = ""
    },
  },

  watch : {
    // search : function (){
    //    this.empty = document.getElementById('search').value === "";
    // }
  },
  components: {
    // MenuButton,
    // Background,
  }
}


</script>

<style scoped>







#nav {
  box-sizing: border-box;
  border: 2px #000000 solid;
  width: 100%;
  position: absolute;
  left: 100%;
  height: 100%;
}

.page-container {
  /*position: absolute;*/
  height: 100%;
  /*transition: all 1s ease-in-out 0s;*/
  display: flex;
  z-index: 99;
  overflow: hidden;
}

.page-container:nth-child(2) .page-content {

}

.page {
  width: 100vw;
  padding-top: 49vh;
  box-sizing: border-box;
  position: relative;
  height: 100vh;
  /*outline: 1px solid #7f7f7f;*/
  display: flex;
  justify-content: center;
  align-items: start;

}

.page-content {
  display: flex;
  transition: all 0.7s ease-in-out;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 98%;
  border-radius: 16px;
  height: 700px;
  /*background: rgba(0, 0, 0, .1);*/
  /*backdrop-filter: blur(5px);*/

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
  background: #2B2F37;
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
  color: #afafaf;
  font-family: inherit;
  font-size: inherit;
  /*font-weight: bold;*/
  box-sizing: border-box;
  outline: none;
  padding-left: 40px;
  /*display: inline;*/

  width: 500px;

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
  width: 560px;
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

#browse{
  margin-left: 50px;
  width: 200px;
  cursor: pointer;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  /*width: 500px;*/
  height: 60px;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  color: rgb(31, 31, 31);
  padding-top: 20px;
  font-size: 20px;
  overflow: hidden;
  background: linear-gradient(237deg, rgba(48, 48, 48, 1) -30%, rgba(223, 122, 91, 1) 150%);
}

#browse:hover{
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 6px 3px;
}

</style>

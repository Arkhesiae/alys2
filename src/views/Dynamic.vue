<template>
<!--  <MenuButton/>-->
<!--  <Background/>-->
  <div>
    <transition name="search-in" appear>
    <div class="page-container" >
      <div class="page">
        <div class="page-content">
          <div id="searchbar">
<!--            Dynamic-->
            <label for="search"></label>
            <div id="search" >Awaiting data...</div>
<!--            <div class="search-icon"><img src="clear_black_24dp.svg" alt=""></div>-->
          </div>
          <ul class="wrapper">
            <!--        <li class="card" v-bind:key="" v-for="post in filteredList">-->
            <!--          <div class="text-container">-->
            <!--            <p>-->
            <!--              {{ post.title.slice(0, post.title.indexOf(search.toUpperCase())) }}</p>-->
            <!--            <p class="highlight"> {{ search.toUpperCase() }}</p>-->
            <!--            <p>-->
            <!--              {{ post.title.slice(post.title.indexOf(search.toUpperCase()) + search.length, 8) }}</p>-->
            <!--            <a v-bind:href="post.link" target="_blank">-->

            <!--            </a>-->
            <!--          </div>-->
            <!--        </li>-->
          </ul>

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
    </transition>
  </div>


    <!--  <router-view v-slot="{ Component }">-->





</template>

<script>
// @ is an alias to /src
// import Background from "../components/Background"
// import MenuButton from "../components/MenuButton"

export default {
  name: 'Static',
  components: {
    // MenuButton,
    // Background,
  }
}
</script>

<style scoped>
.search-in-enter-active,
.search-in-leave-active {
  transition: all 1s ease-in-out 0s;
}

.search-in-enter-from,
.search-in-leave-to {
  transform: scale(0.9) translateY(20px);
  opacity: 0;
}

#nav{
  box-sizing: border-box;
  border: 2px #000000 solid;
  width: 100%;
  position: absolute;
  left: 100%;
  height: 100%;
}
.page-container{
  /*position: absolute;*/
  height: 100%;
  transition: all 0.4s ease-in-out;
  display: flex;
  z-index: 99;
  overflow: hidden;
}

.page-container:nth-child(2) .page-content{

}

.page{
  width: 100vw;
  position: relative;
  height: 100vh;
  /*outline: 1px solid #7f7f7f;*/
  display: flex;
  justify-content: center;
  align-items: center;

}

.page-content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 98%;
  border-radius: 16px;
  height: 700px;
  /*background: rgba(0,0,0,.1);*/
  /*backdrop-filter: blur(5px);*/

}

#searchbar{
  margin-top: 40px;
  position: relative;
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;
  /*width: 500px;*/
  height: 60px;
  overflow: hidden;
  background: linear-gradient(237deg, #2b2d33 0%, rgba(73, 80, 103, 1) 100%);
  /*display: inline;*/
  width: min-content;
  display: flex;
  border-radius:8px;
}

#searchbar {
  position: relative;
  border: none;
  /*background: none;*/
  color: #242424;
  font-family: inherit;
  font-size: inherit;
  /*font-weight: bold;*/
  /*font-weight: bold;*/
  box-sizing: border-box;
  outline: none;
  padding-top: 18px;
  padding-left: 40px;
  /*display: inline;*/

  width: 500px;

  /*border-radius: 60px;*/
  height: 60px;
  font-size: 20px;
  /*box-shadow: #ffffff 2px 2px 5px 5px;*/
}

.search-icon{
  position: relative;
  width: 60px;
  height: 60px;
  /*display: inline;*/
  cursor: pointer;
}


.search-icon img{
  width: 30px;
  height: 30px;
  margin: 15px;
  /*display: inline;*/
  cursor: pointer;
}

.wrapper {
  margin: 0;
  list-style: none;
  display: flex;
  width: 560px;
  flex-direction: column;
  border-radius: 0 0  8px 8px;
  overflow: hidden;
  background: #2B2F37;
  padding: 0;

}

.card {
  font-size: 20px ;
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

.card:hover{
  background: #212128;
}

.card .text-container{
  display: flex;
}

.card p, .card h1{
  font-size: 20px ;
  color: #808080;
  padding: 0;
  margin: 0;

}

.card .highlight{
  color: #afafaf;
}
</style>

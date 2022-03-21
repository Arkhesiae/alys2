<template>
  <div class="ctn-menu">
    <div class="alice-logo"><img src="@/assets/fullLogo.png" alt=""/></div>
    <ul class="menu-nav">
      <router-link style="text-decoration: none; color: inherit; position: relative" :to="'/'">
        <li>Accueil</li>
      </router-link>
      <router-link style="text-decoration: none; color: inherit; position: relative" :to="'/browse'">
        <li>Catalogue</li>
      </router-link>

    </ul>
    <ul class="menu-more">
      <li>Paramètres</li>
      <li>A propos</li>
      <li>Nous contacter</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style scoped>
.alice-logo {
  position: absolute;
  left: 120px;
  top: 20px
  /*top: 40px;*/

}

.alice-logo img {
  width: 60px;
}

.ctn-menu {
  position: absolute;
  width : 240px;
  box-sizing: border-box;
  z-index: 9999;
  height: calc(100%);
  top:0;
  opacity: 0.8;
  transform: translateX(-240px);
  transition: all ease-in-out 0.4s;
  background: linear-gradient(183deg, rgb(32 30 37) 0%, #252327 100%);
}

.menu-nav{
  display: flex;
  flex-direction: column;
  margin-top: 200px;
  width: 100%;
  box-sizing: border-box;
}

.menu-more{
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
}

.menu-more li{
  height: 30px;
  cursor: pointer;
  font-size: 14px;
}

.menu-nav li{
  cursor: pointer;
  box-sizing: border-box;
  font-size: 16px;
  letter-spacing: 1px;
  color: #b7b3d1;
  height: 40px;
  width: 100%;
}

.ctn-menu.visible {
  opacity: 1;
  transform: translateX(0px);
}
</style>
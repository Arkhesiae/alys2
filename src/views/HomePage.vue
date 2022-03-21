<template>
  <Background/>
  <div class="page-container" id="container">
    <div class="page" id="home">
      <div class="alice-logo"><img src="../assets/fullLogo.png" alt=""/></div>
      <div class="nav-container">
        <Searchbar></Searchbar>
        <router-link style="text-decoration: none; color: inherit; position: relative" :to="{ name: 'BrowseHome'}">
          <div id="browse" @click="createRipple">
            Parcourir
          </div>
        </router-link>
      </div>
<!--      <div class="discover-container" @click="discover()">-->
<!--        <span>Discover ALICE</span>-->
<!--        <div class="discover-button">-->
<!--          <div class="bg">-->
<!--            <img src="../assets/icons/chevron-double-down.svg">-->
<!--          </div>-->
<!--          <div class="ripple ripple1"></div>-->
<!--          <div class="ripple ripple2"></div>-->
<!--        </div>-->
<!--      </div>-->

    </div>
    <div class="page hidden" id="about-us">
      <div class="page-content-text">
        <div class="text-box">
          <span class="title"></span>
          <p></p>
        </div>
      </div>
    </div>
  </div>
  <!--    </transition>-->
<!--  <div class="page-displayer">-->
<!--    <div class="pg-number selected" @click="select"></div>-->
<!--    <div class="pg-number" @click="select"></div>-->
<!--    <div class="pg-number" @click="select"></div>-->
<!--    <div class="pg-number" @click="select"></div>-->
<!--    <div class="pg-number" @click="select"></div>-->
<!--    &lt;!&ndash;    <div class="pg-number" @click="select()"></div>&ndash;&gt;-->
<!--  </div>-->

  <!--  <router-view v-slot="{ Component }">-->
</template>

<script>
// @ is an alias to /src
import Background from "../components/Nav/Background"
import Searchbar from "@/components/Nav/Searchbar"
import {createRipple} from "@/BADA/Misc/ripple"
// import * as all from "@/BADA/Misc/convertToJson"
// import MenuButton from "../components/MenuButton"
// console.log(all)


export default {

  name: 'HomePage',

  components: {
    Searchbar,
    Background,
  },

  data() {
    return {
      // empty:true,
      pages: [
        {
          title: "A propos",
          text: [
            "La préservation d’un haut niveau de sécurité face à la croissance du trafic aérien est le principal moteur de l’innovation au sein de l’aviation civile.",
            "Malgré une crise sanitaire internationale sans précédent clouant au sol la flotte mondiale, de nombreux scénarios envisagent une reprise de l’activité à laquelle les acteurs concernés doivent se préparer."
          ],
        },
        {
          title: "Défis à venir",
          text: [
            "Au cœur de la sécurité, le contrôle aérien se doit de faire face à l’augmentation du trafic en repoussant les limites des moyens humains et techniques qu’il met en œuvre.",
            "Le niveau d’exigence environnemental et économique en perpétuelle augmentation engage la responsabilité des contrôleurs dans l’optimisation des trajectoires des avions afin de réduire au plus bas les émissions de polluants ainsi que les coûts d’exploitation des compagnies."
          ],
        },
        {
          title: "",
          text: [
            "L’optimisation de ces trajectoires repose, dans un premier temps, sur l’amélioration du système de routes ATS, par l’accord de « directes » pour raccourcir la distance à parcourir ou encore par l’implémentation du free route au sein de l’espace européen."
          ],
        },
        {
          title: "",
          text: [
            "Cependant, la composante verticale des trajectoires n’est pas négligeable si l’on souhaite réduire davantage l’impact environnemental du trafic aérien. Il existe pour chaque vol un profil vertical optimal minimisant la consommation de l’appareil s’il est assidument suivipar les pilotes, néanmoins, les contraintes, stratégiques ou tactiques, imposées par le contrôle aérien nesont généralement pas compatibles avec cette trajectoire verticale."
          ],
        },

        {
          title: "",
          text: [
            "Faire cohabiter la sécurité et l’optimisation des trajectoires verticales passe dans un premier temps par l’anticipation et la maîtrise de ces profils de vol parfois mal connus des contrôleurs aériens et des systèmes sur lesquels ils s’appuient.",
            "Avec l’arrivée de nouveaux systèmes informatiques tels que 4Flight, comment permettre aux contrôleurs de mieux anticiper les profils de vol avec des outils informatiques ergonomiques et fiable ?"
          ],
        },
      ],
      SCROLL: false,

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
    scrollVariable() {
      return this.SCROLL
    }
  },
  methods: {
    createRipple(event) {
      console.log("bite")
      createRipple(event)
    },

    erase() {
      this.search = ""
      // document.getElementById('search').value = ""
    },

    discover() {
      document.getElementById("home").classList.add("hidden")
      document.getElementById("about-us").classList.remove("hidden")
      // let height = window.innerHeight
      // let container = document.getElementById("container")
      // container.style.top = -height + "px"
      // setTimeout(() => {
      //   this.SCROLL = !this.SCROLL
      //   let illus = document.getElementById("illus")
      //   illus.style.position = "fixed"
      //   illus.style.top = "-70vh"
      // }, 1000)
    },

    select(event) {
      console.log(event)
      document.getElementsByClassName("pg-number").forEach((element) => {
        element.classList.remove("selected")
      })
      event.target.classList.add("selected")
    }
  },

  mounted() {
    // let home = document.getElementById("home")
    // let container = document.getElementById("container")
    // container.style.top = 0
    // let height = window.innerHeight
    // let width = window.innerWidth
    // console.log(width)
    // window.addEventListener("resize", function () {
    //   height = window.innerHeight
    //   width = window.innerWidth
    //
    // })
    // let ref = this
    // window.addEventListener("mousewheel", function (e) {
    //   if (!ref.SCROLL) {
    //
    //     return
    //   }
    //   // console.log(Math.abs(parseInt(container.style.top.replace("px", "")) - e.deltaY) <= height && e.delta < 0)
    //   let illus = document.getElementById("illus")
    //   e.preventDefault();
    //   e.stopPropagation();
    //   if (Math.abs(parseInt(container.style.top.replace("px", "")) - e.deltaY) <= height / 1.2 && e.deltaY < 0) {
    //     container.style.transition = "all 0.5s ease-in-out"
    //     container.style.top = -0 + "px"
    //     illus.style.position = "absolute"
    //     illus.style.top = "30vh"
    //     ref.SCROLL = false
    //     return
    //   }
    //   container.style.transition = "all ease-out 0.2s"
    //   container.style.top = Math.min(parseInt(container.style.top.replace("px", "")) - e.deltaY, 0) + "px"
    //   let top = parseInt(container.style.top.replace("px", ""))
    //   let objects = document.getElementsByClassName('p')
    //   let objectToActivate = []
    //   for (let i = 0; i < Math.floor(Math.abs(top) / height); i++) {
    //     let object = document.getElementsByClassName('p' + (i + 1))[0]
    //     objectToActivate.push(object)
    //   }
    //
    //
    //   let wire = document.getElementsByClassName('wire')[0]
    //   wire.style.strokeDashoffset = Math.floor(Math.min(Math.max(2 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire2 = document.getElementsByClassName('mini-wire')[0]
    //   wire2.style.strokeDashoffset = Math.floor(Math.min(Math.max(6 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire3 = document.getElementsByClassName('wire')[2]
    //   wire3.style.strokeDashoffset = Math.floor(Math.min(Math.max(4 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire4 = document.getElementsByClassName('mini-wire')[1]
    //   wire4.style.strokeDashoffset = Math.floor(Math.min(Math.max(6 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire5 = document.getElementsByClassName('wire')[4]
    //   wire5.style.strokeDashoffset = Math.floor(Math.min(Math.max(4 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire6 = document.getElementsByClassName('mini-wire')[2]
    //   wire6.style.strokeDashoffset = Math.floor(Math.min(Math.max(6 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire7 = document.getElementsByClassName('wire')[6]
    //   wire7.style.strokeDashoffset = Math.floor(Math.min(Math.max(6 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //   let wire8 = document.getElementsByClassName('mini-wire')[3]
    //   wire8.style.strokeDashoffset = Math.floor(Math.min(Math.max(6 - (Math.abs(top) / height), 0) * 100, 100)) + '%'
    //
    //
    //   objects.forEach((object) => {
    //     if (objectToActivate.includes(object)) {
    //       if (!object.classList.contains('active')) {
    //         object.classList.add('active')
    //       }
    //     } else {
    //       object.classList.remove('active')
    //     }
    //   })
    //
    //
    // })
  },

  watch: {
    // search : function (){
    //    this.empty = document.getElementById('search').value === "";
    // }
  },

}

</script>

<style scoped>

html, html body, body #container {
  width: 100% !important;
  min-width: 0 !important;
  max-width: none !important;
  overflow-x: hidden;
}

.wire {
  opacity: 0.24;
  fill: none;
  stroke: #62778C;
  stroke-miterlimit: 10;
  stroke-dasharray: 100%;
  stroke-dashoffset: 100%;
  transition: all 0.6s ease-out;
}

svg {
  filter: hue-rotate(283deg) brightness(1.8) saturate(0.7);
  position: absolute;
  height: 165vh;
  left: -250px;
  top: 30vh;
}

.st38 {
  fill: #131316;
}

.st39 {
  fill: #1A1A1E;
}

.st40 {
  fill: #8E3443;
}

.st54 {
  opacity: 0.39;
  fill: #858585;
}

.st73 {
  opacity: 0.43;
  fill: #151616;
}

.st310 {
  opacity: 0.24;
  fill: none;
  stroke: #62778C;
  stroke-miterlimit: 10;
}

.st316 {
  fill: #ED4962;
}

.st356 {
  fill: #858585;
}

.st357 {
  font-family: 'ProductSans-Regular';
}

.st358 {
  font-size: 1.552px;
}

.st403 {
  opacity: 0.5;
  fill: url(#SVGID_331_);
}

.st404 {
  opacity: 0.33;
  fill: url(#SVGID_332_);
}

.st405 {
  opacity: 0.21;
  fill: url(#SVGID_333_);
}

.st406 {
  fill: #BD424C;
}

.st407 {
  fill: url(#SVGID_334_);
}

.st408 {
  fill: url(#SVGID_335_);
}

.st409 {
  fill: url(#SVGID_336_);
}

.st410 {
  fill: url(#SVGID_337_);
}

.st411 {
  fill: #9D3343;
}

.st412 {
  fill: #E85169;
}

.st413 {
  fill: url(#SVGID_338_);
}

.st414 {
  fill: url(#SVGID_339_);
}

.st415 {
  fill: url(#SVGID_340_);
}

.st416 {
  fill: url(#SVGID_341_);
}

.st417 {
  fill: url(#SVGID_342_);
}

.st418 {
  fill: url(#SVGID_343_);
}

.st419 {
  fill: url(#SVGID_344_);
}

.st420 {
  fill: url(#SVGID_345_);
}

.st421 {
  fill: url(#SVGID_346_);
}

.st422 {
  fill: url(#SVGID_347_);
}

.st423 {
  opacity: 0.13;
  fill: none;
  stroke: #87656A;
  stroke-width: 0.25;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st424 {
  opacity: 0.31;
  fill: none;
  stroke: #87656A;
  stroke-width: 0.25;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st425 {
  fill: none;
  stroke: #332628;
  stroke-width: 0.25;
  stroke-miterlimit: 10;
}

.st426 {
  opacity: 0.29;
  fill: none;
  stroke: #8C5058;
  stroke-width: 0.25;
  stroke-miterlimit: 10;
}

.st427 {
  fill: url(#SVGID_348_);
}

.st428 {
  fill: url(#SVGID_349_);
}

.st429 {
  fill: url(#SVGID_350_);
}

.st430 {
  fill: #26262B;
}

.st431 {
  opacity: 0.4;
  fill: url(#SVGID_351_);
}

.st432 {
  fill: url(#SVGID_352_);
}

.st433 {
  fill: url(#SVGID_353_);
}

.st434 {
  fill: url(#SVGID_354_);
}

.st435 {
  fill: url(#SVGID_355_);
}

.st436 {
  opacity: 0.43;
  fill: #E64754;
}

.st437 {
  fill: #FF9FA6;
}

.st438 {
  fill: url(#SVGID_356_);
}

.st439 {
  fill: url(#SVGID_357_);
}

.st440 {
  opacity: 0.88;
}

.st441 {
  fill: url(#SVGID_358_);
}

.st442 {
  fill: url(#SVGID_359_);
}

.st443 {
  fill: url(#SVGID_360_);
}

.st444 {
  opacity: 0.63;
}

.st445 {
  fill: url(#SVGID_361_);
}

.st446 {
  fill: url(#SVGID_362_);
}

.st447 {
  fill: url(#SVGID_363_);
}

.st448 {
  fill: url(#SVGID_364_);
}

.st449 {
  fill: url(#SVGID_365_);
}

.st450 {
  fill: #F0FFF4;
}

.st451 {
  fill: #FF6363;
}

.st452 {
  fill: url(#SVGID_366_);
}

.st453 {
  fill: url(#SVGID_367_);
}

.st454 {
  fill: url(#SVGID_368_);
}

.st455 {
  fill: url(#SVGID_369_);
}

.st456 {
  fill: url(#SVGID_370_);
}

.st457 {
  fill: #7A4D50;
}

.st458 {
  opacity: 0.65;
  fill: #964B4F;
}

.st459 {
  font-size: 0.732px;
}

.st460 {
  opacity: 0.39;
  fill: #545454;
}

.st461 {
  opacity: 0.47;
  fill: url(#SVGID_371_);
}

.st462 {
  fill: #3B2226;
}

.st463 {
  fill: url(#SVGID_372_);
}

.st464 {
  fill: url(#SVGID_373_);
}

.st465 {
  fill: url(#SVGID_374_);
}

.st466 {
  fill: url(#SVGID_375_);
}

.st467 {
  fill: url(#SVGID_376_);
}

.st468 {
  fill: url(#SVGID_377_);
}

.st469 {
  enable-background: new;
}

.st470 {
  fill: #6A242E;
}

.st471 {
  clip-path: url(#SVGID_379_);
  enable-background: new;
}

.st472 {
  fill: #62212A;
}

.st473 {
  clip-path: url(#SVGID_381_);
  enable-background: new;
}

.st474 {
  clip-path: url(#SVGID_383_);
  enable-background: new;
}

.st475 {
  fill: #69232D;
}

.st476 {
  clip-path: url(#SVGID_385_);
  enable-background: new;
}

.st477 {
  fill: #66222C;
}

.st478 {
  clip-path: url(#SVGID_387_);
  enable-background: new;
}

.st479 {
  clip-path: url(#SVGID_389_);
  enable-background: new;
}

.st480 {
  fill: #732631;
}

.st481 {
  clip-path: url(#SVGID_391_);
  enable-background: new;
}

.st482 {
  clip-path: url(#SVGID_393_);
  enable-background: new;
}

.st483 {
  clip-path: url(#SVGID_395_);
  enable-background: new;
}

.st484 {
  clip-path: url(#SVGID_397_);
  enable-background: new;
}

.st485 {
  fill: #752732;
}

.st486 {
  clip-path: url(#SVGID_399_);
  enable-background: new;
}

.st487 {
  clip-path: url(#SVGID_401_);
  enable-background: new;
}

.st488 {
  clip-path: url(#SVGID_403_);
  enable-background: new;
}

.st489 {
  fill: #61212A;
}

.st490 {
  clip-path: url(#SVGID_405_);
  enable-background: new;
}

.st491 {
  clip-path: url(#SVGID_407_);
  enable-background: new;
}

.st492 {
  clip-path: url(#SVGID_409_);
  enable-background: new;
}

.st493 {
  clip-path: url(#SVGID_411_);
  enable-background: new;
}

.st494 {
  clip-path: url(#SVGID_413_);
  enable-background: new;
}

.st495 {
  clip-path: url(#SVGID_415_);
  enable-background: new;
}

.st496 {
  clip-path: url(#SVGID_417_);
  enable-background: new;
}

.st497 {
  clip-path: url(#SVGID_419_);
  enable-background: new;
}

.st498 {
  fill: #BA3E50;
}

.st499 {
  clip-path: url(#SVGID_421_);
  enable-background: new;
}

.st500 {
  opacity: 0.5;
  fill: none;
  stroke: #E3A8B3;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-miterlimit: 10;
}

.st501 {
  fill: #232329;
}

.st502 {
  fill: url(#SVGID_422_);
}

.st503 {
  fill: url(#SVGID_423_);
}

.st504 {
  fill: url(#SVGID_424_);
}

.st505 {
  fill: url(#SVGID_425_);
}

.st506 {
  fill: url(#SVGID_426_);
}

.st507 {
  fill: url(#SVGID_427_);
}

.st508 {
  fill: url(#SVGID_428_);
}

.st509 {
  fill: url(#SVGID_429_);
}

.st510 {
  fill: url(#SVGID_430_);
}

.st511 {
  fill: url(#SVGID_431_);
}

.st512 {
  fill: url(#SVGID_432_);
}

.st513 {
  fill: url(#SVGID_433_);
}

.st514 {
  fill: url(#SVGID_434_);
}

.st515 {
  fill: url(#SVGID_435_);
}

.st516 {
  fill: url(#SVGID_436_);
}

.st517 {
  fill: url(#SVGID_437_);
}

.st518 {
  fill: url(#SVGID_438_);
}

.st519 {
  fill: url(#SVGID_439_);
}

.st520 {
  fill: url(#SVGID_440_);
}

.st521 {
  fill: url(#SVGID_441_);
}

.st522 {
  fill: url(#SVGID_442_);
}

.st523 {
  fill: url(#SVGID_443_);
}

.st524 {
  fill: url(#SVGID_444_);
}

.st525 {
  fill: url(#SVGID_445_);
}

.st526 {
  fill: url(#SVGID_446_);
}

.st527 {
  fill: url(#SVGID_447_);
}

.st528 {
  fill: url(#SVGID_448_);
}

.st529 {
  fill: url(#SVGID_449_);
}

.st530 {
  fill: url(#SVGID_450_);
}

.st531 {
  fill: url(#SVGID_451_);
}

.st532 {
  fill: url(#SVGID_452_);
}

.st533 {
  fill: url(#SVGID_453_);
}

.st534 {
  fill: url(#SVGID_454_);
}

.st535 {
  fill: url(#SVGID_455_);
}

.st536 {
  fill: url(#SVGID_456_);
}

.st537 {
  fill: url(#SVGID_457_);
}

.st538 {
  fill: url(#SVGID_458_);
}

.st539 {
  fill: url(#SVGID_459_);
}

.st540 {
  fill: url(#SVGID_460_);
}

.st541 {
  fill: url(#SVGID_461_);
}

.st542 {
  fill: url(#SVGID_462_);
}

.st543 {
  fill: url(#SVGID_463_);
}

.st544 {
  fill: url(#SVGID_464_);
}

.st545 {
  fill: url(#SVGID_465_);
}

.st546 {
  fill: url(#SVGID_466_);
}

.st547 {
  fill: url(#SVGID_467_);
}

.st548 {
  fill: url(#SVGID_468_);
}

.st549 {
  fill: url(#SVGID_469_);
}

.st550 {
  fill: url(#SVGID_470_);
}

.st551 {
  fill: url(#SVGID_471_);
}

.st552 {
  fill: url(#SVGID_472_);
}

.st553 {
  fill: url(#SVGID_473_);
}

.st554 {
  fill: url(#SVGID_474_);
}

.st555 {
  fill: url(#SVGID_475_);
}

.st556 {
  fill: url(#SVGID_476_);
}

.st557 {
  opacity: 0.47;
  fill: url(#SVGID_477_);
}

.st558 {
  opacity: 0.47;
  fill: url(#SVGID_478_);
}

.st559 {
  fill: url(#SVGID_479_);
}

.st560 {
  fill: url(#SVGID_480_);
}

.st561 {
  fill: url(#SVGID_481_);
}

.st562 {
  fill: url(#SVGID_482_);
}

.st563 {
  fill: #380E14;
}

.st564 {
  fill: #421A21;
}

.st565 {
  fill: url(#SVGID_483_);
}

.st566 {
  fill: #402428;
}


.cls-1 {
  isolation: isolate;
}

.cls-10, .cls-5, .cls-4 {
  opacity: 0.24;
}

.cls-10, .cls-4, .cls-5, .cls-54, .cls-8, .cls-9 {
  fill: none;
}

.cls-4, .cls-5, .cls-9 {
  stroke: #62778c;
}

.cls-10, .cls-4, .cls-5, .cls-8, .cls-9 {
  stroke-miterlimit: 10;
}

.cls-8 {
  stroke: url(#Dégradé_sans_nom_79);
}

.cls-9 {
  stroke-width: 0.5px;
  opacity: 0.17;
}

.cls-10 {
  stroke: url(#Dégradé_sans_nom_86);
}

.cls-11 {
  fill: url(#Dégradé_sans_nom_403);
}

.cls-12 {
  fill: url(#Dégradé_sans_nom_403-2);
}

.cls-13 {
  fill: url(#Dégradé_sans_nom_403-3);
}

.cls-47 {
  opacity: 0.6;
}

.cls-15 {
  fill: #ed4962;
}

.cls-16 {
  fill: #962e3e;
}

.cls-17 {
  opacity: 0.5;
  fill: url(#Dégradé_sans_nom_880);
}

.cls-18 {
  opacity: 0.33;
  fill: url(#Dégradé_sans_nom_880-2);
}

.cls-19 {
  opacity: 0.21;
  fill: url(#Dégradé_sans_nom_880-3);
}

.cls-22 {
  fill: #131316;
}

.cls-23, .cls-47 {
  fill: #1a1a1e;
}

.cls-24 {
  fill: #8e3443;
}

.cls-25 {
  fill: url(#Dégradé_sans_nom_312);
}

.cls-26 {
  fill: #63242f;
}

.cls-27 {
  fill: #943241;
}

.cls-28 {
  fill: #242424;
}

.cls-29 {
  fill: #1a1a18;
}

.cls-30 {
  fill: #252a30;
}

.cls-31 {
  fill: #2c2e30;
}

.cls-32 {
  fill: #1b1c1c;
}

.cls-33 {
  fill: #3b3b3b;
}

.cls-34 {
  fill: #333;
}

.cls-35 {
  fill: #292929;
}

.cls-36 {
  fill: #1b1c19;
}

.cls-37 {
  fill: url(#Dégradé_sans_nom_883);
}

.cls-38 {
  fill: url(#Dégradé_sans_nom_874);
}

.cls-39 {
  opacity: 0.41;
  fill: url(#Dégradé_sans_nom_73);
}


.cls-42 {
  fill: #4d1c24;
}

.cls-43 {
  fill: #802b38;
}

.cls-44, .cls-69 {
  fill: #151616;
}

.cls-45 {
  fill: url(#Dégradé_sans_nom_422);
}

.cls-46 {
  fill: #852e3a;
}

.cls-48 {
  fill: #101317;
}

.cls-49 {
  fill: url(#Dégradé_sans_nom_373);
}

.cls-50 {
  fill: url(#Dégradé_sans_nom_144);
}

.cls-51 {
  fill: url(#Dégradé_sans_nom_496);
}

.cls-52 {
  fill: url(#Dégradé_sans_nom_493);
}

.cls-53 {
  fill: url(#Dégradé_sans_nom_492);
}

.cls-55 {
  fill: url(#Dégradé_sans_nom_221);
}

.cls-56 {
  fill: url(#Dégradé_sans_nom_221-2);
}

.cls-57 {
  fill: url(#Dégradé_sans_nom_221-3);
}

.cls-58 {
  fill: url(#Dégradé_sans_nom_221-4);
}

.cls-59 {
  fill: url(#Dégradé_sans_nom_495);
}

.cls-60 {
  fill: url(#Dégradé_sans_nom_312-2);
}

.cls-61 {
  fill: url(#Dégradé_sans_nom_373-2);
}

.cls-62 {
  fill: url(#Dégradé_sans_nom_403-4);
}

.cls-63 {
  fill: #161616;
  opacity: 0.51;
}

.cls-64 {
  fill: url(#Dégradé_sans_nom_373-3);
}

.cls-65 {
  fill: url(#Dégradé_sans_nom_403-5);
}

.cls-66 {
  fill: url(#Dégradé_sans_nom_312-3);
}

.cls-68, .cls-70 {
  fill: #858585;
}

.cls-68 {
  opacity: 0.39;
}

.cls-69 {
  opacity: 0.43;
}


.cls-72 {
  fill: url(#Dégradé_sans_nom_373-4);
}

.cls-73 {
  fill: url(#Dégradé_sans_nom_312-4);
}

.cls-74 {
  fill: url(#Dégradé_sans_nom_424);
}

.cls-75 {
  fill: url(#Dégradé_sans_nom_425);
}

.cls-76 {
  fill: url(#Dégradé_sans_nom_425-2);
}

.st112 {
  fill: #86333B;
}

.st113 {
  fill: #753E44;
}

.st114 {
  fill: #9E4855;
}

.st115 {
  fill: #9E3741;
}

.st116 {
  fill: #C95062;
}

.st117 {
  fill: #9E5B60;
}

.st118 {
  fill: #D67684;
}

.object {
  transform-box: fill-box;
  transform-origin: 50% 85%;
  /*transition: filter ease-in-out 0.2s;*/
  transform: scale(0);
  animation: pop-in cubic-bezier(.72, .02, .44, 1.38) 1.2s forwards;
}

.object.hidden {
  animation: "";
  transform: scale(0);
  transition: transform cubic-bezier(.72, .02, .44, 1.38) 1.2s;
}

.object.hidden.active {
  animation: "";
  transform: scale(1);
  transition: transform cubic-bezier(.72, .02, .44, 1.38) 1.2s;
}


.object:hover {
  cursor: pointer;
  transform: scale(1.1);
  filter: hue-rotate(280deg) brightness(110%);
}

.blob .ball {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  transform: translateY(-20px);
}

.ball {
  animation: oscillate ease-in-out 10s infinite;
}

.blob {
  animation: oscillate ease-in-out 16s infinite;
}

.b1 {
  animation-delay: 0s;
}

.b2 {
  animation-delay: 2s;
}

.b3 {
  animation-delay: 3s;
}

#ball3 {
  animation-delay: 1s;
}

#ball1 {
  animation-delay: 0s;
}


#ball2 {
  animation-delay: 2s;
}


#ball3 {
  animation-delay: 1s;
}

#center-console {
  animation-delay: 0.4s;
}

@keyframes oscillate {
  0% {
    transform: translateY(-20px);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(-20px);

  }
}


.wave {
  transform-box: fill-box;
  transform-origin: 50% 40%;
  transform: scale(0) translateY(-40px);
  animation: grow ease-in-out 10s infinite;
}

#wave1 {
  animation-delay: 2s;
}


#wave2 {
  animation-delay: 2.5s;
}


#wave3 {
  animation-delay: 3s;
}

@keyframes oscillate {
  0% {
    transform: translateY(-20px);
  }

  50% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(-20px);

  }
}

@keyframes grow {
  0% {
    transform: scale(0) translateY(-40px);
    opacity: 1;
  }

  50% {
    transform: scale(2) translateY(-40px);
    opacity: 0;
  }

  100% {
    transform: scale(2) translateY(-40px);
    opacity: 0;
  }
}

@keyframes pop-in {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

#wires {
  transform: scale(0.8);
  animation: fade-in ease-out 1.2s forwards;
}

#left-console {
  animation-delay: .8s;
}

.panel1 {
  animation-delay: 1.5s;
}

.panel2 {
  animation-delay: 1.7s;
}

#panels {
  animation-delay: 1.4s;
}

#antena {
  animation-delay: 1.2s;
}

body {
  /*overflow: hidden !important;*/
}

@media screen and (max-width: 1200px) {
  #losange-container {
    top: 85vh;
    width: 5vh;
    height: 20vh;
    right: 49% !important;

    transform: rotate(-90deg);
    z-index: 99;
  }
}

.ripple {
  /*position: absolute;*/
  /*top: 0;*/
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background: rgba(212, 139, 241, 0.61);
  transform: scale(1.1);
}

.ripple2 {
  transform: scale(1.3);
  animation: shine 4s infinite ease;
  transition: all 1s ease;
}

.ripple1 {
  transform: scale(1.3);
  animation: shine 4s infinite ease;
  animation-delay: 0.3s;
  transition: all 1s ease;
}

@keyframes shine {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

.bg {
  /*position: absolute;*/
  /*top: 0px;*/
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background: linear-gradient(45deg, rgb(66, 60, 67) -0%, rgb(193, 176, 244) 110%);
  z-index: 99;
  box-shadow: #1a1a1a 0px 1px 3px 1px;
}

.discover-button .bg:hover {
  background: #4b4e54;
}

.discover-container {
  /*height: 100px;*/
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  position: absolute;
  /*left: calc(50% - 80px);*/
  bottom: 0;
}

.discover-container span {
  /*position: relative;*/
  font-family: Roboto;
  font-weight: 500;
  color: #9da6ba;
  font-size: 16px;
  letter-spacing: 1px;
  /*left: 15px;*/
  /*top: -25px;*/
  /*width: 100px;*/
}

.discover-button {
  /*bottom: 0px;*/
  cursor: pointer;
  /*left: 40px;*/
  width: 80px;
  height: 80px;
  border-radius: 50px;
  background: #34363a;
  /*position: absolute;*/
}


.discover-button img {
  margin: 20px;
  width: 40px;
  height: 40px;
  animation: move 3s infinite ease;
}

@-webkit-keyframes move {
  0% {
    transform: translateY(3px);
    opacity: 1;
  }
  50% {
    transform: translateY(-3px);
    opacity: .8;
  }
  100% {
    transform: translateY(3px);
    opacity: 1;
  }
}

.discover-button img {
  filter: invert(5%);
}

.page-container {
  position: absolute;
  height: 100vh;
  width: 100vw;

  transition: all ease-in-out 1s;
  /*background: url("../assets/bg.svg") no-repeat;*/
  /*background-position: top -20%;*/
  /*background-size: auto 200vh;*/
  /*transition: all 1s ease-in-out 0s;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  z-index: 99;
  /*overflow: hidden;*/
}

.page-container:nth-child(2) .page-content {

}

.alice-logo {
  position: absolute;
  left: 40px;
  top: 40px;

}

.alice-logo img {
  width: 80px;
}

.page {
  width: 100%;
  position: absolute;
  /*padding-top: 49vh;*/
  box-sizing: border-box;
  left: 0;
  top: 0;
  /*position: relative;*/
  height: 100%;
  /*border: 1px solid #7f7f7f;*/
  /*display: flex;*/
  /*background: #1a1a1a;*/
  justify-content: center;
  align-items: flex-start;
}

.page.hidden {
  display: none;
}

.page-displayer {
  z-index: 9999999999;
  position: fixed;
  bottom: 0px;
  margin: 10px;
  /*width: 100%;*/
  /*padding: 40%;*/
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pg-number {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  transition: all 0.5s ease;
  border-radius: 20px;
  background: #424046;
}

.pg-number.selected {
  width: 20px;
  background: #e9d4fb;
}

.page-content-text {
  width: 100%;
  height: 100%;
  /*margin-left: 10%;*/
}

.text-box {
  /*background: #58585821;*/
  /*margin-top: 10%;*/
  /*margin-left: 10%;*/
  /*margin-right: 20%;*/
  color: #87848b;
  font-family: "Roboto", sans-serif !important;
  /*border: 1px #323232 solid;*/
  /*backdrop-filter: blur(3px);*/
  /* box-shadow: #00000040 0px 2px 3px 2px; */
  width: 100%;
  font-size: 16px;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 12px;
  /*height: 80%;*/
}

.text-box p {
  font-family: "Roboto", sans-serif !important
}

.title {
  color: #e2d7f6;
  letter-spacing: 1px;
  font-family: "Roboto", sans-serif !important;
  /*position: absolute;*/
  text-align: right;
  right: 0;
  font-weight: bold;

}

.nav-container {
  display: flex;
  height: 100%;
  align-items: center;
  z-index: 999;
  /*margin-top: 40vh;*/
  justify-content: space-between;
  position: absolute;
  box-sizing: border-box;
  /*width: 100%;*/
  /*padding-left: 40%;*/
  right: 0;
  padding-right: 100px;
  transition: all 1s ease-in-out;
}

@media screen and (max-width: 1024px) {

}

@media screen and (max-width: 737px) {
  .nav-container{
    height: auto;
    width: 100% !important;
    justify-content: flex-start !important;
    padding: 0;
    margin: 0 !important;
    margin-top: 20vh !important;
    align-items: center;
    flex-direction: column;
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  /*.nav-container {*/
  /*  display: flex;*/
  /*  padding-right: 50px;*/
  /*  padding-left: 50px;*/
  /*  z-index: 999;*/
  /*  !*margin-top: 10vh;*!*/
  /*  justify-content: space-between;*/
  /*  position: absolute;*/
  /*  width: 100%;*/
  /*  !*left: 0;*!*/
  /*  flex-direction: column;*/
  /*  !*margin-right: 100px;*!*/
  /*  !*margin-left: 100px;*!*/
  /*}*/

  .nav-container .wrapper {
    border-radius: 30px;
  }


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


#browse {
  text-decoration: none;
  margin-left: 50px;
  width: 200px;
  cursor: pointer;
  /*box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 3px 1px;*/
  /*width: 500px;*/
  border: 0px solid rgb(183, 134, 216);
  height: 60px;
  box-sizing: border-box;
  border-radius: 8px;
  text-align: center;
  color: rgb(165, 156, 204);
  padding-top: 18px;
  font-family: Roboto;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  /*font-weight: bold;*/
  letter-spacing: 1px;
  z-index: -1;
  /*background: linear-gradient(237deg, rgb(121, 118, 132) -30%, rgb(196, 176, 236) 150%);*/
}

#browse:hover {
  box-shadow: rgba(5, 5, 5, 0.3) 0px 1px 6px 3px;
}


</style>

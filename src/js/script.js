import modernizr from "./modules/modernizr.js";
import validate from "./modules/validate.js";
import burgerMenu from "./modules/burgerMenu.js";
import rippleEffect from "./modules/rippleEffect.js";
import cards from "./modules/cards.js";

import Swiper, {
  Navigation,
  Keyboard,
  Lazy,
  Autoplay,
  Mousewheel,
  Scrollbar,
  EffectFade,
} from "swiper";

/* SETTINGS SWIPER SLIDER */
let swiper = new Swiper(".swiper", {
  // configure Swiper to use modules
  modules: [
    Navigation,
    Keyboard,
    Lazy,
    Autoplay,
    Mousewheel,
    EffectFade,
    Scrollbar,
  ],
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: false,
  /* autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }, */
  keyboard: {
    enabled: true,
    pageUpDown: true,
  },
  preloadImages: false,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  // Enable lazy loading
  lazy: true,
  // Navigation arrows
  navigation: {
    nextEl: ".btn-next",
    prevEl: ".btn-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

/* ----------------------------- */

document
  .querySelector("#products-submenu")
  .addEventListener("click", function () {
    document.querySelector(".submenu").classList.toggle("submenu--active");
    document
      .querySelector(".icon-dropdown")
      .classList.toggle("icon-dropdown--rotate");
  });

// *************************************
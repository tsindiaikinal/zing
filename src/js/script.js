import modernizr from "./modules/modernizr.js";
import { products, category } from "./modules/products.js";

import Swiper, {
  Navigation,
  Keyboard,
  Lazy,
  Autoplay,
  Mousewheel,
  Scrollbar,
  EffectFade,
} from "swiper";

const swiper = new Swiper(".swiper", {
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

const viewArea = document.querySelector(".products__view");
products.forEach((product) => {
  if (product.active) {
    let card = `<div class="card">
                <div class="card__body">
                  <img src="${product.image}" alt="Product" class="card__img" />
                  <div class="card__description">
                    <strong class="card__product-name">${product.name}</strong>
                    <span class="card__price">$${product.price}</span>
                    <a href="#" class="card__link"
                      ><img class="icon-arrow" src="img/icons/icons.svg#arrow-right"></a>
                  </div>
                </div>
              </div>`;
    viewArea.innerHTML += card;
  }
});

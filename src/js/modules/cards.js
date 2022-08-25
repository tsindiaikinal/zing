import { PRODUCTS, CATEGORY } from "./products.js";

export default (function () {
  let prod = [...PRODUCTS];

  document.addEventListener("DOMContentLoaded", function () {
    document
      .querySelector('.tab__link[data-category="0"]')
      .classList.add("active-link");
    printProductCards(prod);
  });
/* DISPLAY CARDS ON THE PAGE */
  function printProductCards(products) {
    const viewArea = document.querySelector(".products__view");
    viewArea.innerHTML = "";
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
      if (!product.active) {
        let card = `<div class="card" style="opacity: .5">
                  <div class="card__body">
                    <img src="${
                      product.image
                    }" alt="Product" class="card__img" />
                    <div class="card__description">
                      <strong class="card__product-name">${
                        product.name
                      }</strong>
                      <span class="card__price">${(product.price =
                        "Not available")}</span>
                    </div>
                  </div>
                </div>`;
        viewArea.innerHTML += card;
      }
    });
  }
/* TABS. FILTER PRODUCT BY CATEGORY */
  document.querySelector(".tab").addEventListener("click", function (e) {
    let tabLinks = document.querySelectorAll(".tab .tab__link");
    tabLinks.forEach((elem) => {
      if (elem.classList.contains("active-link")) {
        elem.classList.remove("active-link");
      }
    });
    e.target.classList.add("active-link");
    let products = [...prod].filter(function (product) {
      return product.categoryId === parseInt(e.target.dataset.category);
    });
    if (e.target.dataset.category === "0") {
      printProductCards(prod);
    } else {
      printProductCards(products);
    }
  });
})();

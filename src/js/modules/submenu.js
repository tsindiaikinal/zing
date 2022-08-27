export default (function () {
  let submenu = document.querySelector(".submenu");
  let dropdown = document.querySelector(".icon-dropdown");
  
  document
    .querySelector("#products-submenu")
    .addEventListener("click", function () {
      submenu.classList.toggle("submenu--active");
      dropdown.classList.toggle("icon-dropdown--rotate");
    });

  submenu.addEventListener("click", function (e) {
    e.preventDefault();
    /* let shiftElems = this.querySelectorAll(".submenu--shift");
    shiftElems.forEach((el) => {
      el.classList.remove("submenu--shift");
    }); */

    e.target.closest(".submenu__item").classList.add("submenu--shift");

    let tabLinks = document.querySelectorAll(".tab .tab__link");
    tabLinks.forEach((el) => {
        el.classList.remove("tab__link--backlight");
      if (el.dataset.category === e.target.dataset.category) {
        window.scrollTo({
          left: 0,
          top: el.getBoundingClientRect().top - 120,
          behavior: "smooth",
        });
        el.classList.add("tab__link--backlight");
      }
    });
    removeClassActive(e);
});

function removeClassActive(event) {
    setTimeout(() => {
      event.target.closest(".submenu__item").classList.remove("submenu--shift");
      dropdown.classList.remove("icon-dropdown--rotate");
      submenu.classList.remove("submenu--active");
    }, 500);
  }
})();

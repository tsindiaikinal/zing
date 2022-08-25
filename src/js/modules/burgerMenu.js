export default (function () {
  let burger = document.querySelector(".icon-menu");

  burger.addEventListener("click", dropdownMenu);

  function dropdownMenu() {
    this.classList.toggle("icon-close");
    document.querySelector("#main-menu").classList.toggle("show");
  }
})();

export default (function () {
  let accordions = Array.from(document.querySelectorAll(".accordion"));
  accordions.forEach((accordion) => {
    accordion.addEventListener("click", findElements);
  });

  function findElements() {
    this.querySelector(".accordion__body").classList.toggle("item-active");
    this.classList.toggle("accordion--rotate");
  }
})();

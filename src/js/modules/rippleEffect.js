export default (function () {
  document.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("ripple-effect") &&
      !e.target.querySelector(".ripple-container")
    ) {
      createRippleElement(e);
    }
  });
  function createRippleElement(event) {
    let container = document.createElement("span");
    let animation = document.createElement("span");

    container.classList.add("ripple-container");
    animation.classList.add("ripple-animation");
    container.appendChild(animation);
    event.target.appendChild(container);
    addEffect(event);
  }

  function addEffect(e) {
    let animation = e.target.querySelector(".ripple-animation");
    animation.style.left = `${e.offsetX}px`;
    animation.style.top = `${e.offsetY}px`;
    setTimeout(() => {
      e.target.querySelector(".ripple-container").remove();
    }, 500);
  }
})();

document.getElementById("weather").addEventListener("click", function (event) {
  event.stopPropagation();
  this.classList.toggle("active");
});
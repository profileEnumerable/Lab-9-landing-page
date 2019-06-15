(function() {
  var openFormButt = document.querySelector(".arrow-down");

  if (openFormButt) {
    openFormButt.addEventListener("click", function(e) {
      e.preventDefault();
      form.open();
    });
  }
})();

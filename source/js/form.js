(function() {
  var formWorker = {};

  var form = document.querySelector(".form__container");
  var closeFormButt = document.querySelector(".close-butt");

  formWorker.open = function() {
    form.classList.remove("hidden-block"); //hide form

    closeFormButt.addEventListener("click", formWorker.close);
  };

  formWorker.close = function() {
    form.classList.add("hidden-block");
    closeFormButt.removeEventListener("click", formWorker.close);
  };
  window.form = formWorker;
})();

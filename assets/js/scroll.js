(function () {
  "use strict";

  //Wait for the document to be ready
  document.addEventListener("DOMContentLoaded", function () {
    //Select the progress path
    var progressPath = document.querySelector(".progress-wrap path");
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = "none";
    progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = "stroke-dashoffset 10ms linear";

    //Update the progress on scroll
    var updateProgress = function () {
      var scroll = window.pageYOffset;
      var height = document.body.scrollHeight - window.innerHeight;
      var progress = pathLength - (scroll * pathLength) / height;
      progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress);

    //Handle the active progress class
    var offset = 50;
    var duration = 550;
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > offset) {
        document
          .querySelector(".progress-wrap")
          .classList.add("active-progress");
      } else {
        document
          .querySelector(".progress-wrap")
          .classList.remove("active-progress");
      }
    });

    //Handle the click event
    document
      .querySelector(".progress-wrap")
      .addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
  });
})();

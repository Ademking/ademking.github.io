let cookieElems = document.querySelectorAll(".em-cookie");
cookieElems.forEach((elem) => {
  elem.style.cursor = "pointer";
  elem.addEventListener("click", (ev) => {
    ev.preventDefault();
    const jsConfetti = new JSConfetti();

    const img = new Image();
    img.src = "/assets/icons/cookie2.png";
    let imgWidth = window.innerWidth / 20;
    console.log("imgWidth", imgWidth);

    jsConfetti.addConfetti({
      images: [
        {
          src: img,
          width: imgWidth,
        },
      ],
      confettiRadius: 1,
      confettiNumber: 20,
    });
  });
});

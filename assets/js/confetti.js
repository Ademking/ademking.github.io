let cookieElems = document.querySelectorAll(".em-cookie");
cookieElems.forEach((elem) => {
  elem.style.cursor = "pointer";
  elem.addEventListener("click", (ev) => {
    ev.preventDefault();
    const jsConfetti = new JSConfetti();

    const cookieImg = new Image();
    //const coffeeImg = new Image();
    cookieImg.src = "/assets/icons/cookie2.png";
    //coffeeImg.src = "/assets/icons/coffee.png";
    let imgWidth = window.innerWidth / 20;

    jsConfetti.addConfetti({
      images: [
        {
          src: cookieImg,
          width: imgWidth,
        },
        // {
        //   src: coffeeImg,
        //   width: imgWidth,
        // },
      ],
      confettiRadius: 10,
      confettiNumber: 5,
    });
  });
});

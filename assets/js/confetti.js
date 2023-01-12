let cookieElem = document.querySelector("#cookie-emoji");
cookieElem.addEventListener("click", () => {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti({
    emojis: ["🍪"],
    emojiSize: 100,
    confettiRadius: 1,
    confettiNumber: 20,
  });
});

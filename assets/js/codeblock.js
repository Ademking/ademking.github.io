document.querySelectorAll("div.highlight").forEach(function (pre) {
  var button = document.createElement("button");
  var copyText = "Copy";
  button.className = "copy";
  button.type = "button";
  button.ariaLabel = "Copy code to clipboard";
  button.innerText = copyText;
  button.addEventListener("click", function () {
    var code = pre.querySelector("code").innerText.trim();
    navigator.clipboard.writeText(code);
    button.innerText = "Copied!";
    button.style.left = "calc(100% - 6.5rem)";
    setTimeout(function () {
      button.innerText = copyText;
      button.style.left = "calc(100% - 4.5rem)";
    }, 4000);
  });
  pre.prepend(button);
});

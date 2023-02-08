---
title: "Let Your Jekyll Blog Speak for Itself: Implementing Speech Synthesis"
date: 2023-02-01 01:00:00
categories: [jekyll, tutorial]
cover_image: /assets/images/add-audio-to-jekyll.png
tags: "jekyll, tutorial"
canonical_url: null
published: false
description: "Let Your Jekyll Blog Speak for Itself: Implementing Speech Synthesis"
---

In this blog post, I will show you how to add Speech Synthesis to your Jekyll blog. This feature is available in all modern browsers and is a great way to add accessibility to your blog. It is also a great way to add a little bit of fun to your blog. I will show you how to add a button to your blog that will read the content of the blog post aloud.

## What is Speech Synthesis?

Speech Synthesis is a web API that allows you to convert text to speech. You can read more about it here: [https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)

## How to add Speech Synthesis to your Jekyll blog

To add Speech Synthesis to your Jekyll blog, you will need create a new file in your `_includes` folder called `audio.html`. This file will contain the HTML and JavaScript that will add the Speech Synthesis feature to your blog.

### HTML

The HTML for the Speech Synthesis feature is pretty simple. You will need a button that will trigger the speech synthesis.

```html
<div class="audio-block">
  <p style="text-align: center;">🔊 PLAY THIS ARTICLE</p>
  <div class="audio-btn"></div>
</div>
```

### JavaScript

You will need to add a click event listener to the button that will trigger the speech synthesis. You will also need to add a `beforeunload` event listener to the window that will cancel the speech synthesis when the user navigates away from the page.

```javascript
// get the button
const audioBtn = document.querySelector(".audio-block");
// set the default state of the button
let isPlaying = false;
// get the default title of the tab (so we can change it later)
let defaultTabTitle = document.title;
// check if speechSynthesis is available in the browser
const isSynthAvailable = window.speechSynthesis !== undefined;
// if speechSynthesis is not available, hide the button
if (!isSynthAvailable) {
  audioBtn.style.display = "none";
}
// speak the text passed in as a parameter, and call the onend function when the speech is finished
function speak(text, onend) {
  window.speechSynthesis.cancel();
  var ssu = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(ssu);
  function _wait() {
    if (!window.speechSynthesis.speaking) {
      onend();
      return;
    }
    window.setTimeout(_wait, 200);
  }
  _wait();
}

// get the text from the blog post
function getBlogText() {
  const text = document.querySelectorAll(".content > *");
  let textArray = [];
  text.forEach((elem) => {
    textArray.push(elem.innerText);
  });
  // remove "Copy" from the start of the text
  textArray.forEach((elem, index) => {
    // if the text starts with "Copy", remove it
    if (elem.startsWith("Copy")) textArray[index] = elem.replace("Copy\n", "");
  });
  return textArray.join("\n");
}
// add click event listener to the button
audioBtn.addEventListener("click", () => {
  isPlaying = !isPlaying;
  if (isPlaying) {
    let text = getBlogText();
    speak(text, () => {
      isPlaying = false;
      audioBtn.classList.remove("active");
    });
  } else {
    window.speechSynthesis.cancel();
  }
  audioBtn.classList.toggle("active");
});

// stop audio when user navigates away from the page
window.addEventListener("beforeunload", () => {
  window.speechSynthesis.cancel();
});

// change title of the tab when audio is playing (to show that audio is playing)
window.setInterval(() => {
  if (isPlaying) {
    document.title = "🔊 Playing... " + defaultTabTitle;
  } else {
    document.title = defaultTabTitle;
  }
}, 500);
```

I made this sandbox to show you how the Speech Synthesis feature works. You can play around with the code and see how it works. You can also see how the Speech Synthesis feature works on my blog.

<iframe style="width: 100%; height: 500px; border: none; padding-bottom: 20px" src="https://stackblitz.com/edit/web-platform-jsyt32?embed=1&file=App.tsx&hideDevTools=1&theme=dark"></iframe>

# Conclusion

Without using any third-party APIs, you can add Speech Synthesis to your Jekyll blog. This is a great way to add accessibility to your blog and also a great way to add a little bit of fun to your blog. I hope you enjoyed this tutorial and learned something new. If you have any questions, feel free to leave a comment below.

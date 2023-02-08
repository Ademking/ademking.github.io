---
title: "UnoCSS: The instant on-demand Atomic CSS engine"
date: 2023-02-07 01:00:00
categories: [css, tutorial]
cover_image: /assets/images/unocss-prev.png
tags: "css, tutorial"
canonical_url: null
published: true
description: "UnoCSS: The instant on-demand Atomic CSS engine"
---

# What is UnoCSS?

UnoCSS is a modern CSS engine that's designed with flexibility and performance in mind. Unlike traditional CSS frameworks, UnoCSS focuses on providing the core functionalities of CSS through the use of presets. This allows developers to quickly and easily add style to their applications without sacrificing performance or flexibility.

At its core, UnoCSS is an atomic CSS engine. This means that it's built around the idea of creating small, reusable styles that can be combined to form complex designs. This allows for a high degree of customization and control over the look and feel of an application. With UnoCSS, developers can create styles for their applications without having to worry about the limitations of a rigid framework.

One of the key benefits of using UnoCSS is its focus on performance. The atomic nature of the engine means that styles are only loaded and applied when they're needed, which can help to significantly reduce the amount of time it takes for a page to load. Additionally, the lack of core utilities means that the CSS file size is kept to a minimum, which also helps to improve performance.

Another great feature of UnoCSS is its flexibility. With its modular design, developers can easily add or remove presets as needed. This allows for a high degree of customization and control over the look and feel of an application. Additionally, developers can easily create their own presets to add new functionalities to the engine.

# What is Atomic CSS?

Atomic CSS is the approach to CSS architecture that favors small, single-purpose classes with names based on visual function.

Some might also call it Functional CSS, or CSS utilities. Basically, you can say an Atomic CSS framework is a collection of the CSS like these:

```css
.mt-4 {
  margin-top: 1rem;
}
.mr-4 {
  margin-right: 1rem;
}
.text-center {
  text-align: center;
}
```

# Bechmark

```
11/5/2021, 4:26:57 AM
1656 utilities | x50 runs (min build time)

none                              8.30 ms / delta.      0.00 ms
unocss       v0.4.15             13.58 ms / delta.      5.28 ms (x1.00)
windicss     v3.2.1             989.57 ms / delta.    981.27 ms (x185.94)
tailwindcss  v3.0.0-alpha.1    1290.96 ms / delta.   1282.66 ms (x243.05)
```

As you can see, UnoCSS is the fastest CSS framework in the benchmark. It's also the only framework that doesn't require a build step, which means that it's much faster to get started with.

# How to use UnoCSS?

Let's suppose you use [Vite](https://vitejs.dev/) as your build tool. You can install UnoCSS with the following command:

```bash
npm i -D unocss
```

```js
// vite.config.ts
import UnoCSS from "unocss/vite";

export default {
  plugins: [
    UnoCSS({
      /* options */
    }),
  ],
};
```

and then add the following to your main entry file:

```js
import "uno.css";
```

If you don't use Vite, you can read the [documentation](https://github.com/unocss/unocss) for other build tools.

# Example

```html
<div h-full text-center flex select-none all:transition-400>
  <div ma>
    <div
      text-5xl
      fw100
      animate-bounce-alt
      animate-count-infinite
      animate-duration-1s
    >
      UnoCSS
    </div>
    <div op30 text-lg fw300 m1>The instant on-demand Atomic CSS engine.</div>
    <div m2 flex justify-center text-2xl op30 hover="op80">
      <a
        i-carbon-logo-github
        text-inherit
        href="https://github.com/unocss/unocss"
        target="_blank"
      ></a>
    </div>
  </div>
</div>
<div absolute bottom-5 right-0 left-0 text-center op30 fw300>
  on-demand · instant · fully customizable
</div>
```

![](/assets/images/UnoCSS.jpg)

You can see the full example [https://uno.antfu.me/play](https://uno.antfu.me/play/)

# Conclusion

UnoCSS is a great CSS framework that's designed with performance and flexibility in mind. It's also the fastest CSS framework in the benchmark. If you're looking for a CSS framework that's fast and easy to use, UnoCSS is a great choice. However, Tailwind is more popular and has a larger community... So it's up to you to decide which one to use.

---
title: "BetterViewer: The Ultimate Image Viewing Experience For Your Browser"
date: 2023-02-04 01:00:00
categories: [extensions]
cover_image: /../assets/images/betterviewer.png
tags: "extensions"
canonical_url: null
published: true
description: "BetterViewer: The Ultimate Image Viewing Experience For Your Browser"
---

In this blog post, we'll take a look at BetterViewer, a Chrome extension I created that allows you to view images in a more convenient and customizable way.

## Why I Created BetterViewer

I created BetterViewer because I was tired of the basic image viewing experience that comes with web browsers.

If you want to view an image in your browser, you have to open the image in a new tab. This is inconvenient because it takes up a lot of space and you can't view multiple images at the same time. You also can't zoom in or out, rotate, or flip the image. I wanted to be able to view images in a way that was more convenient and intuitive. I also wanted to be able to view images in a way that was more customizable. I couldn't find any extensions that met my needs, so I decided to create my own.

![](https://user-images.githubusercontent.com/12462188/141027643-e478175a-6c4f-41ec-b9dd-c0c8b754f703.png)

## Features

- Zoom in / Zoom Out / Reset
- Fullscreen
- Rotate Left / Rotate Right
- Flip Horizontal / Flip Vertical
- Crop Image
- Photo Editor (Adjust, Draw, Watermark, Filters, Finetune, Resize, Export As PNG, JPEG, JPG, WEBP)
- Download Image
- Upload Image to imgBB or imgur
- Color picker
- Image Details
- Change background color (Dark / Light / Blurred)
- Print Image
- Extract Text from Image
- Edit in Photopea
- Reverse Image Search
- QR Code Scanner
- Settings to customize Toolbar

## How to Install

You can install BetterViewer from the [Chrome Web Store](https://chrome.google.com/webstore/detail/betterviewer/llcpfkbjgkpmapiidpnohffjmmnhpmpb) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/betterviewer/) or [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/betterviewer/jfladbainajdjpmdjpgndbgmkgibeddg).

## How does it work?

BetterViewer works by replacing the default image viewer with a custom image viewer. It's powered by a number of powerful libraries, including [Viewer.js](https://fengyuanchen.github.io/viewerjs/), [WinBox.js](https://nextapps-de.github.io/winbox/), and [Tesseract.js](https://tesseract.projectnaptha.com/). These libraries work together to provide an unparalleled image viewing experience.

The extension uses background scripts to detect if an image is being opened in a new tab by checking the MIME type of the image. If the MIME type is an image, the extension will inject the BetterViewer script into the page. The BetterViewer script will then replace the default image viewer with a custom image viewer. Easy!

Briefly, here's how the background script works: _(Full source code [here](https://github.com/Ademking/BetterViewer/blob/master/background.js))_

```js
// Background script

// when request is made
chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    if (details.tabId !== -1) {
      let header = getHeaderFromHeaders(
        details.responseHeaders,
        "content-type"
      );

      // check if content-disposition is attachment, if it is, do not inject
      let contentDispositionHeader = getHeaderFromHeaders(
        details.responseHeaders,
        "content-disposition"
      );
      let isContentDispositionAttachment =
        contentDispositionHeader &&
        contentDispositionHeader.value.toLowerCase().includes("attachment");

      let res = header && header.value.split(";", 1)[0];

      if (res.indexOf("image") === -1) {
        // remove from injected list
        InjectedTabs = InjectedTabs.filter(function (item) {
          return item !== details.tabId;
        });
      }

      // check if image
      if (
        res &&
        res.indexOf("image") !== -1 &&
        InjectedTabs.indexOf(details.tabId) === -1 &&
        !isContentDispositionAttachment
      ) {
        // add tab to injected list
        InjectedTabs.push(details.tabId);

        // clear 'content-security-policy'
        for (let respHeader of details.responseHeaders) {
          if (respHeader.name.toLowerCase() === "content-security-policy") {
            respHeader.value = "";
          }
        }

        return {
          responseHeaders: details.responseHeaders,
        };
      }
    }
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame"],
  },
  ["responseHeaders", "blocking"]
);
```

## Reviews

Many users have left positive reviews and articles about BetterViewer. Here are some of them:

[Product Hunt](https://www.producthunt.com/posts/betterviewer)

[BetterViewer – Prenez du plaisir à visualiser et éditer vos images sous Chrome / Edge](https://korben.info/betterviewer-visualiser-editer-images-sous-chrome-edge.html)

[Reddit - BetterViewer is an incredible add-on for viewing images.](https://www.reddit.com/r/firefox/comments/uoubin/betterviewer_is_an_incredible_addon_for_viewing/)

[Youtube - Ver imagens e editar no Google Chrome ficou muito melhor, confira o BetterViewer](https://www.youtube.com/watch?v=w7X6M_Xm1vE&ab_channel=JulioSardinha)

[BetterViewer - traiter rapidement une image téléchargée sur internet](https://www.libellules.net/post/betterviewer-traiter-rapidement-une-image-t%C3%A9l%C3%A9charg%C3%A9e-sur-internet)

[BetterViewer: mejora el visualizador de imágenes del navegador Chrome](https://www.softandapps.info/2021/11/18/betterviewer-mejora-el-visualizador-de-imagenes-del-navegador-chrome/?utm_source=linkedin&utm_medium=bloguersnet)

[Trabalhar com imagens no Google Chrome ficou mais fácil](https://js.art.br/betterviewer/)

[إضافة لعرض الصور في متصفح كروم بطريقة احترافية مع إمكانية التعديل](http://www.igli5.com/2021/11/blog-post_293.html)

[BetterViewer – Enjoy viewing and editing your images in Chrome / Edge](https://www.easy-tutorials.com/betterviewer-enjoy-viewing-and-editing-your-images-in-chrome-edge/)

[Dùng BetterViewer xem ảnh trên trình duyệt thích hơn](https://www.linhkienmaytinhvungtau.com/2021/12/dung-betterviewer-xem-anh-tren-trinh.html)

[推荐 50 个实用的 Chrome 扩展，建议收藏！](https://os.51cto.com/article/705864.html#:~:text=49%E3%80%81-,BetterViewer,-BetterViewer%20%E5%8F%AF%E4%BB%A5%E6%8F%90%E4%BE%9B)

[Chrome の画像ビューワー機能を大幅に機能拡張する拡張機能 『BetterViewer』](https://pc.mogeringo.com/archives/88205)

[تبديل عارض صور كروم الافتراضي بآخر متطور يوفر كافة أدوات الرسم والتعديل](https://www.pcfacile1.com/archives/21506)

[BetterViewer 的使用方法详解,最全面的教程](https://blog.chinaoc.com.cn/p/2238366.html)

[Telegram - Как редактировать изображения прямо в браузере](https://t.me/bugnotfeature/3242)

[Nützliche Firefox-Add-ons für diejenigen, denen Anonymität im Internet wichtig ist](https://seyler.eksisozluk.com/internette-anonimligine-onem-verenler-icin-birbirinden-kullanisli-firefox-eklentileri)

## Conclusion

I'm very happy to see that BetterViewer is being used by many people. I hope that it will continue to be useful for many people. I will continue to improve it and add new features. If you have any suggestions or ideas, please let me know. Thank you for your support!

---
title: "JS: Find Nearest Color from Array"
date: 2023-02-22 01:00:00
categories: [tutorial]
image: /assets/images/default-blog-post.png
---

Hey there! In this short post, we'll explore how to find the nearest color from an array of colors using JavaScript. No fancy libraries, just plain old JavaScript. Let's get started.

## Problem

When working with colors, you may need to find the nearest color from an array of colors. For example, you may have a list of colors and you want to find the nearest color to a given color.

## Solution

```js
// List of base colors
const baseColors = [
  {
    hex: "#FFFFFF",
    name: "White",
  },
  {
    hex: "#000000",
    name: "Black",
  },
  {
    hex: "#808080",
    name: "Grey",
  },
  {
    hex: "#ff0000",
    name: "Red",
  },
  {
    hex: "#ffa500",
    name: "Orange",
  },
  {
    hex: "#ffff00",
    name: "Yellow",
  },
  {
    hex: "#008000",
    name: "Green",
  },
  {
    hex: "#0000ff",
    name: "Blue",
  },
  {
    hex: "#4b0082",
    name: "Indigo",
  },
  {
    hex: "#ee82ee",
    name: "Violet",
  },
];

// Convert hex to RGB

function hexToRgb(hex) {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Distance between 2 colors (in RGB)
// Read more: https://stackoverflow.com/questions/23990802/find-nearest-color-from-a-colors-list
function distance(a, b) {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2)
  );
}

// return nearest color from array
function nearestColor(colorHex) {
  let lowest = Number.POSITIVE_INFINITY;
  let tmp;
  let index = 0;
  baseColors.forEach((el, i) => {
    tmp = distance(hexToRgb(colorHex), hexToRgb(el.hex));
    if (tmp < lowest) {
      lowest = tmp;
      index = i;
    }
  });
  return baseColors[index];
}

// Test it!
console.log(nearestColor("#FFFFFF")); // { hex: "#FFFFFF", name: "White" }
```

## Conclusion

Sometimes, using a library is overkill. In this case, we can use plain old JavaScript to find the nearest color from an array of colors. I hope you enjoyed this post. If you have any questions, feel free to leave a comment below. Thanks for reading!

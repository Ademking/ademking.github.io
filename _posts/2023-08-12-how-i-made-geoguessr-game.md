---
title: "How I made a GeoGuessr-like game"
date: 2023-07-18 01:00:00
categories: [general]
image: /assets/images/entiwin.png
---

In 2018, TailwindCSS was a new thing and I was looking for a project to try it out. I was also a big fan of GeoGuessr, a game where you are dropped in a random location in the world and you have to guess where you are. I decided to make a similar game, but with a twist: only locations from the country of Tunisia.

<p align="center">
  <img height="100" src="https://raw.githubusercontent.com/Ademking/Entiwin/main/src/assets/maplogo.png">
  <h1 align="center">Entiwin</h1>
  <h4 align="center">GeoGuessr-like game (Tunisian version) </h4>
</p>

# ⚡ Demo

You can play the game here: [https://entiwin.surge.sh/](https://entiwin.surge.sh/)

![](https://raw.githubusercontent.com/Ademking/Entiwin/main/screenshots/5.png)

# 👉 Game Concept

Just like GeoGuessr, the game would drop you in a random location in Tunisia and you would have to guess where you are. The closer you are to the actual location, the more points you get. The game would be played in 10 rounds and you must get a minimum score to win.

# 📍 Game Design

I wanted to keep the game simple and focus on the core gameplay. I decided to use a minimalistic design with a fullscreen map and a text input for the player to enter their guess. I also added a score counter and a timer to keep track of the player's progress.

![](https://raw.githubusercontent.com/Ademking/Entiwin/main/screenshots/3.png)

The screen is split into two parts: the map and the street view. The player will select a location on the map (left side) and the street view will show the actual location (right side). The player will then enter their guess in the text input and the game will calculate the distance between the two locations. The closer the player is to the actual location, the more points they will get.

![](https://raw.githubusercontent.com/Ademking/Entiwin/main/screenshots/4.png)

The game is multilingual and supports French, English, and Arabic. The player can change the language at any time by clicking on the language button in the top right corner.

![](https://raw.githubusercontent.com/Ademking/Entiwin/main/screenshots/5.png)

# 👨‍💻 Technical Stuff

The game is built with Angular and TailwindCSS. I used Angular because I was already familiar with it and I wanted to try out TailwindCSS. It was a good opportunity to learn TailwindCSS and see how it compares to Bootstrap. I also used the following libraries:

- [tailwindcss](https://www.npmjs.com/package/tailwindcss) for the CSS framework
- [leaflet](https://www.npmjs.com/package/leaflet) for the map
- [ngx-sharebuttons](https://www.npmjs.com/package/ngx-sharebuttons) for social media sharing
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) for the confetti effect (when the player wins)
- [angular-resize-event](https://www.npmjs.com/package/angular-resize-event) for the resize event (to resize the map when the window is resized)
- [ngx-device-detector](https://www.npmjs.com/package/ngx-device-detector) to detect the device type (mobile or desktop).
- [ngx-joyride](https://www.npmjs.com/package/ngx-joyride) for the step-by-step tutorial
- [ng2-tooltip-directive](https://www.npmjs.com/package/ng2-tooltip-directive) for the tooltips (when the player hovers over the buttons)
- [@ngx-translate/core](https://www.npmjs.com/package/@ngx-translate/core) for the multilingual support

#### 🗺️ Map (Left Side)

I used ["Leaflet"](https://www.npmjs.com/package/leaflet) to display the map. Leaflet is an open-source JavaScript library for mobile-friendly interactive maps. It is lightweight, easy to use, and supports all major browsers.

The map is initialized with the following code:

```js
this.leafletOptions = {
  attributionControl: false,
  layers: [
    tileLayer(
      `https://{s}.google.com/vt/lyrs=m&hl=ar&x={x}&y={y}&z={z}&hl=${lang}`, // Google Maps Tile Layer
      {
        attribution: "", // Hide the attribution
        subdomains: ["mt0", "mt1", "mt2", "mt3"], // Google Maps Subdomains, if any of the subdomains is down, the map will still work
      }
    ),
  ],
  zoom: 7, // Initial zoom level
  center: latLng([35.0, 9.503173828125]), // Initial center of the map, this is the center of Tunisia
};
```

Latitute and longitude are the coordinates of the location the player selected. I got these coordinates by using a library called ["random-streetview"](https://www.npmjs.com/package/random-streetview). This allows you to generate a random valid (on a road with StreetView or PhotoSphere) StreetView location in a given polygon. The code below generates a random location in Tunisia.

```js
async function getData() {
  await randomStreetView.setParameters({
    polygon: [
      // This is the polygon of Tunisia, you can get the polygon of any country from https://nominatim.openstreetmap.org/
      [
        [37.4661386, 9.4408466],
        [33.4222723, 7.8030656],
        [33.7334767, 11.1225948],
        [37.0200982, 11.0786276],
        [37.4748581, 9.4408466],
      ],
    ],
    type: "sv", // sv = StreetView, ps = PhotoSphere
    distribution: "uniform",
  });
  let locations = await randomStreetView.getRandomLocations(100); // Generate 100 random locations in Tunisia, you can change this number to generate more or less locations
  return locations;
}
```

After getting the coordinates, I stored them in a one single JSON file. This file contains the coordinates of all the locations in the game. Then, I used the following code to get a random location from the JSON file.

```ts
type Place {
        lat: number;
        long: number;
}

// Return random place from list
get place(): Place {
    return this.list_places[Math.floor(Math.random() * this.list_places.length)];
}
```

#### 🌆 Street View (Right Side)

I used Google Maps Iframe to display the street view. I used the following code to generate the URL of the street view.

```js
let mapUrl = `https://maps.google.com/maps?layer=c&cbll=${lat},${long}&cbp=12,20.09,,0,5&source=embed&output=svembed`;
```

#### 📱 Mobile Support

I disabled the game on mobile devices because the map is too small and it's hard to play. I used the following code to detect the device type.

```ts
if (this.deviceService.isMobile()) {
  this.router.navigate(["ismobile"]);
}
```

#### 🎉 Confetti Effect

```js
celebrate() {
    let count = 200;
    let defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    };
    const fire = (particleRatio, opts) => {
      confetti(Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio)
      }));
    }
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
```

#### Game Layout

I tried to change the idea of the game layout. Instead of having a mini-map and a street view, I decided to put the map and the street view side by side. I used the following code to do that.

```html
<div class="flex flex-wrap overflow-hidden">
  <!-- Map -->
  <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 bg-gray-500"></div>
  <!--  StreetView -->
  <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 bg-gray-500"></div>
</div>
```

#### 📝 Tutorial

Using [ngx-joyride](https://www.npmjs.com/package/ngx-joyride) I created a step-by-step tutorial to explain how to play the game. I used the following code to do that.

```ts
this.joyrideService.startTour({
  steps: ["firstStep", "secondStep", "thirdStep"],
  showPrevButton: false,
  customTexts: {
    next: "Next",
    prev: "Previous",
    done: "Done",
  },
  stepDefaultPosition: "top",
  showCounter: true,
});
```

### Future Improvements (I'm sure not gonna do them 😂)

- [ ]ㅤAdd a leaderboard
- [ ]ㅤAdd a timer
- [ ]ㅤAdd a score system
- [ ]ㅤAdd a hint system
- [ ]ㅤPersist the game state (so the player can continue the game later)
- [ ]ㅤBetter UI/UX
- [ ]ㅤUse better latitute and longitude coordinates (not in a road / on a building / ...)
- [ ]ㅤOther modes maybe ?

### Final Words

The code is not perfect and old, as I said before, I made this game in 2018 and I was learning so many things at that time. I'm sure there are better ways to do the things I did in this game. If you have any suggestions or improvements, feel free to open an issue or a pull request.

[https://github.com/Ademking/Entiwin](https://github.com/Ademking/Entiwin)

Feel free to use the code in your projects, I don't mind. I hope you enjoyed reading this article and learned something new. If you have any questions, feel free to contact me or leave a comment below.

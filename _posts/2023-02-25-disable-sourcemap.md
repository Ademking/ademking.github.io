---
title: "Why You Should Disable Source Maps in Production"
date: 2023-02-25 01:00:00
categories: [javascript, pentest, tutorial]
image: /assets/images/sourcemaps-bad.png
---

Sourcemap is a powerful tool for developers when debugging their JavaScript code. They provide a way to map the minified, production code back to the original, unminified source code.

However, while source maps are useful during development, they can pose a security risk if they are enabled in production.

## But Why?

You ask me why? Client-side code is supposed to be executed on the client's browser, not on the server. Anyone can access the source code of a website by simply opening the developer tools in their browser. Then why should we disable source maps in production?

As a pentester, having access to the source code of a website is a gold mine. It allows me to find vulnerabilities in the code that I would not have been able to find otherwise.

![](https://i.imgur.com/dYd99GO.png)

As you can see in the above image, Acunetix says that source maps should not be accesible for an attacker.

Comments are stripped from the production code. This means that if you have the sourcemap enabled, you can see the comments in the source code.

Developers often leave comments in the code that contain sensitive information like API keys, database credentials, etc. This information can be used by an attacker to gain access to the website.

Example:

![](https://i.imgur.com/MAP7t9Z.png)

As you can see in the above image, the source code contains a key that can be used to access the API

## I'm convinced. How do I disable source maps?

Easiest way to disable source maps is to remove map files from the production build.

### Delete the map files manually

Just delete the map files from the production build.

### React (Create React App)

In your package.json file, add `GENERATE_SOURCEMAP=false` to the build script.

```js
"scripts": {
    "start": "react-scripts start",
    "build": "GENERATE_SOURCEMAP=false react-scripts build", // Modify this line
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
```

or if you're using .env file, add `GENERATE_SOURCEMAP=false` to the .env file.

### React (Vite)

In your vite.config.js file:

```js
build: {
  sourcemap: false;
} // Add this line
```

### Angular

In your angular.json file, add `sourceMap: false` to the production build.

```js
"configurations": {
    "production": {
        "sourceMap": false // Add this line
    }
}
```

### Vue

In your vue.config.js file, add `productionSourceMap: false` to the production build.

```js
module.exports = {
  productionSourceMap: false, // Add this line
};
```

### Next.js

In your next.config.js file, add `productionBrowserSourceMaps: false` to the production build.

```js
module.exports = {
  productionBrowserSourceMaps: false, // Add this line
};
```

### Other frameworks

If you're using other frameworks, just search for how to disable source maps in production for that framework. You'll find the answer. If you can't find it, let me know in the comments and I'll add it to the article.

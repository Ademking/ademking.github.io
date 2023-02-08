---
layout: post
title: "Replacing Remote Images with Local Ones: How I made ImgSaver"
date: 2023-01-11 10:00:00
categories: [nodejs, libraries, tutorial]
cover_image: /../assets/images/1673405581014.png
tags: "nodejs, libraries, tutorial"
canonical_url: null
published: true
description: "Replacing Remote Images with Local Ones: How I made ImgSaver"
---

I was working on a project that involves a lot of images, some from my own server, and some from external sources.
I soon realized that loading images from external sources was taking a long time and was causing a significant delay in the loading of the website.
I started to look for a solution that would allow me to download these remote images and replace them with local images.

I couldn't find anything that did exactly what I wanted, so I decided to create my own tool. I called it [ImgSaver](https://github.com/Ademking/imgsaver).

GitHub: [https://github.com/Ademking/imgsaver](https://github.com/Ademking/imgsaver)

NPM: [https://www.npmjs.com/package/imgsaver](https://www.npmjs.com/package/imgsaver)

![](/../assets/images/1673405581017.png)

In this post, I want to share with you how I created ImgSaver and how you can use it in your projects.

## Why ImgSaver? 🤔

If an image that's hosted on a remote server is deleted or moved to a different location, it will no longer be displayed on the website since it's not available anymore. As you don't have control over the remote server, you can't ensure that the image will always be accessible.

## How I made ImgSaver? 🛠️

I made this tool using NodeJs. I could use Python or any other language, but I decided to use NodeJs because I wanted to create it as fast as possible.

I started by creating a new project using the following command:

```
npm init -y
```

then I installed those required packages:

```bash
npm i request commander chalk
```

- **request**: allows you to make HTTP requests.
- **commander**: allows you to create a CLI application.
- **chalk**: allows you to add colors to the console output.

In package.json, I changed the following lines:

```json
{
  "name": "imgsaver",
  "version": "1.0.0",
  "description": "a tool that downloads remote images and replaces them with local versions",
  "main": "/lib/index.js", // 📍 change this line to point to the entry point
  "preferGlobal": true,
  "type": "module", // 📍 add this line to enable ES6 modules
  "scripts": {
    "start": "node lib/index.js", // 📍 add this line
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "bin": {
    "imgsaver": "./lib/index.js" // 📍 add this line to make the package executable
  },
  "keywords": ["imgsaver"],
  "repository": {
    "type": "git",
    "url": "https://github.com/Ademking/imgsaver.git"
  },
  "author": "Adem Kouki",
  "license": "MIT",
  "dependencies": {
    "chalk": "^5.2.0",
    "commander": "^9.5.0",
    "request": "^2.88.2"
  }
}
```

I created a new file called index.js and added the following code:

We start by importing the necessary libraries (fs, path, request, commander, and chalk) at the top of the file. Then we assign a variable for different types of logging events error, success, warning for later use.

The defined options are directory, output, prefix, ignore, and silent.

The option directory is used to specify the directory where the tool will look for files.

The option output is used to specify the directory where the downloaded images will be stored.

The option prefix allows to specify a prefix for the downloaded images,

The option ignore allows to ignore files with a specific extension, and the option silent to not output any logs.

```js
#!/usr/bin/env node
import fs from "fs";
import path from "path";
import request from "request";
import { program } from "commander";
import chalk from "chalk";

const error = chalk.red;
const success = chalk.green;
const warning = chalk.yellow;
```

Then the program object is defined and its command options like version, name, description and command-line options are defined with the help of commander module.

```js
program
  .version("1.0.1")
  .name("imgsaver")
  .description(
    "a tool that downloads remote images and replaces them with local versions"
  )
  .option("-d, --directory <directory>", "directory to search for files in")
  .option("-o, --output <output>", "output directory for downloaded images")
  .option(
    "-p, --prefix <prefix>",
    '(Optional) prefix for downloaded images, when specified, the prefix will be prepended to the image name and the output directory will be ignored. For example, if the prefix is "images/", the image will be replaced with "images/myimage.png"'
  )
  .option(
    "-i, --ignore [ignore]",
    "(Optional) ignore files with the specified extension. For example: '.md' will ignore all markdown files",
    (val) => val.trim().split(","),
    []
  )
  .option("-s, --silent", "(Optional) do not output any logs")
  .parse(process.argv);

const options = program.opts();
```

Then we check if the directory and output options are specified, if not, we output an error message and exit the process.

```js
if (!options.directory) {
  console.error(
    error("Error: Please specify a directory to search for files in")
  );
  process.exit(1);
}

if (!options.output) {
  console.error(
    error("Please specify an output directory for downloaded images")
  );
  process.exit(1);
}
```

Then we define the function that will be used to download the remote images and replace them with local images.

The idea behind this code is to recursively search the files in the specified directory and its subdirectories, and then search those files for URLs to remote images and download them locally, replacing the URLs in the files with the new local URLs.

```js
// The directory to search for files in
const directory = options.directory;

// Function to search for remote images in files
const searchForRemoteImages = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      // Recursively search for files in subdirectories
      searchForRemoteImages(filePath);
    } else if (options.ignore.includes(path.extname(filePath))) {
      // ignore files with the specified extension
      return;
    } else {
      // Read the contents of the file
      let fileData = fs.readFileSync(filePath, "utf-8");

      // find all the urls
      // Regex from here: https://regexr.com/39nr7
      let urls = fileData.match(
        /(http(s)?)[:\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi
      );

      if (urls) {
        urls.forEach((url) => {
          // clean the url
          // sometimes, the url will have a '(' at the start
          url = url.replace("(", "");
          request.head(url, async (err, res) => {
            if (err) {
              //return console.error(err)
            }
            // Check if the Content-Type header indicates that the URL is an image
            if (
              res &&
              res.headers &&
              res.headers["content-type"] &&
              res.headers["content-type"].startsWith("image")
            ) {
              // download the remote image
              let fileName = await downloadRemoteImage(url);

              // replace the remote image url with local
              // use prefix if exists
              if (options.prefix) {
                fileData = fileData.replace(
                  url,
                  `${options.prefix}${fileName}`
                );
              } else {
                fileData = fileData.replace(
                  url,
                  `${options.output}/${fileName}`
                );
              }

              const msg =
                warning(`[+] ${filePath}`) +
                ` Replaced ${success(url)} with ${success(
                  `${options.output}/${fileName}`
                )}`;
              !options.silent && console.log(msg);
              // write the contents of the file back to the file
              fs.writeFileSync(filePath, fileData);
            }
          });
        });
      }
    }
  });
};

const downloadRemoteImage = (url) => {
  return new Promise((resolve, reject) => {
    request.head(url, (err, res) => {
      if (err) {
        return reject(err);
      }
      // Determine the file extension from the Content-Type header
      let extension = "." + res.headers["content-type"].split("/")[1];
      // Generate a random file name
      // let fileName = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      // use timestamp for name
      let fileName = Date.now();

      request(url)
        .pipe(
          fs.createWriteStream(path.join(options.output, fileName + extension))
        )
        .on("close", () => {
          resolve(fileName + extension);
        });
    });
  });
};
```

Finally, we call the searchForRemoteImages function and pass the directory to search for files in as an argument.

```js
// show starting message
options.silent &&
  console.log(`${success("[*]")} Searching for remote images in ${directory}`);

// Create the output directory if it doesn't exist
if (!fs.existsSync(options.output)) {
  options.silent &&
    console.log(
      `${success("[+]")} Creating output directory ${options.output}`
    );
  fs.mkdirSync(options.output);
}

// Start the search
try {
  searchForRemoteImages(directory);
} catch (error) {}
```

## How to publish this tool

To publish this tool, we need to publish this package.json using this command:

```bash
npm publish
```

This is a good tutorial: [How to Create an NPX Tool](https://blog.shahednasser.com/how-to-create-a-npx-tool/)

## How to use it

To install this tool, simply run:

```bash
npm install -g imgsaver
```

Then you can run the tool using the command

```bash
imgsaver -d <directory> -o <output>
```

For example, if you want to download all the images in the current directory and save them in a folder called images, you can run:

```bash
imgsaver -d . -o ./images
```

![](/../assets/images/1673405581045.png)

## Conclusion

I made this tool to help me download all the images in a directory and its subdirectories, and replace the remote URLs with local URLs. I hope you find it useful. If you have any questions or suggestions, please leave a comment below.

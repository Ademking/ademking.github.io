---
layout: post
title: "Making Report Generation a Piece of Cake"
date: 2023-01-16 01:00:00
categories: [nodejs, libraries, tutorial]
cover_image: /assets/images/1673870544850.jpeg
tags: "nodejs, libraries, tutorial"
canonical_url: null
published: false
description: "Making Report Generation a Piece of Cake"
---

It was a typical Monday morning and I was assigned a new task, to create an application that generates reports from user input data. The catch was that the input data was coming from a WYSIWYG editor and it was in the form of HTML.

![](/assets/images/1673870544546.png)

The users were inserting tables inside tables, images, custom fonts and it was all HTML. I knew right away that parsing HTML with all those nested elements and custom formatting is not an easy task, but I was determined to find a solution.
![](/assets/images/1673870544547.jpeg)

I tried many programming languages like Python, PHP, (I hate Java... I'm not using it)...
I spent hours trying to find a solution, but nothing seemed to work.

Then I decided to give JavaScript a try. As I researched, I stumbled upon a library called [docx-templates](https://www.npmjs.com/package/docx-templates) that promised to make the generation of Word documents using Node.js a breeze. I decided to give it a try, and I was pleasantly surprised by how easy it was to convert the HTML data into a format that could be used for the reports.

With docx-templates, I was able to handle all the nested elements, custom formatting and images with ease...

However, this library is not perfect and it has many issues, some of the formatting and styles were not working as expected, and some of the images were not showing up in the generated document. But with some tweaking, it still was a great solution and saved me a lot of time compared to other languages and libraries I tried.

The first step is to install the docx-templates library. You can do this by running the following command in your terminal:

```bash
npn install docx-templates
```

This code snippet is an example of how to use the `docx-templates` library to generate a Word document using a docx template file and data in a JSON

```js
const { createReport } = require("docx-templates");
const fs = require("fs");
const data = require("./user_data.json");

const generate_report = async () => {
  // read docx template
  const template = fs.readFileSync("template.docx");

  // process template
  const buffer = await createReport({
    template,
    data: data,
    processLineBreaks: false,
    noSandbox: true,
    failFast: true,
  }).catch((err) => {
    console.log(err);
  });
  const fileName = `report-${Date.now()}.docx`;
  // save generated docx
  fs.writeFileSync("./reports/" + fileName, buffer);
};

generate_report();
```

It's important to note that this is just an example and the code might need some adjustments to work with the specific project.

One of its best features is the support of loops and if statements, which allows for dynamic data to be easily inserted into the document. However, it's worth noting that using these features can be tricky and small changes in the template or data can cause the document to collapse...

![](/assets/images/1673870544536.gif)

For more detailed documentation and examples on how to use the docx-templates library, please visit the GitHub repository at [https://github.com/guigrpa/docx-templates](https://github.com/guigrpa/docx-templates).

If you have another solution or suggestion, feel free to leave a comment below and let me know.

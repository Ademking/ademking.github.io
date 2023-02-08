---
title: "Simplifying Syntax: The Coming of the Pipeline Operator to JavaScript"
date: 2023-01-23 01:00:00
categories: [javascript]
cover_image: /../assets/images/pipeline.jpg
tags: "javascript"
canonical_url: null
published: true
description: "Simplifying Syntax: The Coming of the Pipeline Operator to JavaScript"
---

Pipeline operator is a new feature that is coming to JavaScript in the future. It is a new operator that allows you to chain functions together. It is similar to the Unix pipe operator, which allows you to chain commands together.

For example, if you have a function that adds 1 to a number, and another function that multiplies a number by 2, you can use the pipe operator to chain them together:

```js
const addOne = (x) => x + 1;
const multiplyByTwo = (x) => x * 2;

const result = addOne(1) |> multiplyByTwo;
console.log(result); // 4
```

The pipe operator is currently in stage 2 of the TC39 process, which means that it is still being discussed and is not yet finalized. However, it is expected to be included in the next version of JavaScript. You can read more about the pipeline operator [here](https://github.com/tc39/proposal-pipeline-operator)

I think the pipeline operator is a great addition to JavaScript. It makes it much easier to chain functions together and makes your code more readable.

In the future, your code will be able to look something like this:

```js
func1
  |> func2
  |> func3
  |> func4
  |> func5
  |> func6
  |> func7
  |> func8
  |> func9
  |> func10;
```

instead of this:

```js
func10(func9(func8(func7(func6(func5(func4(func3(func2(func1())))))))));
```

What do you think? Do you have any other tips for using the pipeline operator? Let me know in the comments below

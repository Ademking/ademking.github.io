---
title: "Expect the Unexpected: Unusual JavaScript Behaviors You Need to Know"
date: 2023-02-11 01:00:00
categories: [javascript]
image: /assets/images/js-meme.png
---

JavaScript is a powerful and widely-used programming language, but it's not without its quirks and oddities. Whether you're an experienced developer or just starting out, it's important to be aware of some of the weird behaviors that can trip you up when working with JavaScript. In this blog post, we'll explore some of the strangest aspects of the language, and provide examples to help you understand the unexpected behaviors that can occur.

## 1. Handling of Data Types

One of the most surprising things about JavaScript is how it handles certain types of data. For example, did you know that adding a string to a number can result in unexpected output? Take a look at the following code:

```js
const a = 5;
const b = "10";
const result = a + b;
console.log(result); // "510"
```

In this example, we're adding the number 5 to the string '10'. Instead of throwing an error, JavaScript simply concatenates the two values, resulting in the string '510'. This behavior can catch you off-guard if you're not careful, so be sure to pay close attention to the data types you're working with.

## 2. Handling of Undefined / NaN Values

Another weird behavior of JavaScript is how it handles comparisons. In particular, comparing certain values can result in unexpected outcomes. For example, consider the following code:

```js
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(NaN === NaN); // false
```

In this code, we're comparing null to undefined, as well as NaN to NaN. While you might expect these comparisons to be straightforward, the truth is that JavaScript handles them in a somewhat unusual way. In the first comparison, null and undefined are considered equal, even though they're technically different values.

In the second comparison, the strict equality operator (===) returns false, since null and undefined are not the same data type.

And in the third comparison, two instances of NaN are not considered equal, even though they're both "not-a-number" values.

NaN is not NaN: NaN is not equal to NaN even when we use strict equality operator (===).

## 3. NaN is not NaN: NaN is not equal to NaN even when we use strict equality operator (===).

```js
let a = NaN;
let b = NaN;
console.log(a == b); // false
console.log(a === b); // false
```

## 4. I don't know WTF is going on here and I don't want to know...

```js
[,] + [,]; // -> ""
[] + [] === [,] + [,]; // -> true
[, , ,] + [, , ,]; // -> ",,,,"
([, , ,] + [, , ,]).length === [, , , ,].length; // -> true
```

```js
[1, 2, 3] + [4, 5, 6]; // -> "1,2,34,5,6"
```

```js
0.2 + 0.1; // -> 0.30000000000000004;
0.2 + 0.1 > 0.3; // -> true
```

```js
parseInt(0.5); // -> 0
parseInt(0.05); // -> 0
parseInt(0.005); // -> 0
parseInt(0.0005); // -> 0
parseInt(0.00005); // -> 0
parseInt(0.000005); // -> 0
parseInt(0.0000005); // -> 5
```

## Conclusion

![](https://i.imgur.com/jscrazy.png)

No more JavaScript for me. I'm going to use Java instead. It's much more predictable... _(Just kidding! I HATE JAVA... JVM and all that crap)_

No matter how weird JavaScript can be, it's still a great language to work with. Coding in JavaScript is a lot of fun, and I'm always learning new things about the language.

I hope you enjoyed this post. If you found it helpful, please share it with your friends and colleagues. And if you have any questions or comments, feel free to leave them below. Thanks for reading, and happy coding!

---
title: "Improving Angular Performance: Using Decorators to Track Method Invocations"
date: 2023-09-19 01:00:00
categories: [general, angular, programming]
image: /assets/images/angular_decorators.png
---

# The story behind this post

I was working on an old Angular project and I noticed that the developer was calling a lot of functions inside the template. The template was full of functions like this:

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";

@logger
@Component({
  selector: "my-app",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 *ngFor="let firstname of getFirstnames()">{{ firstname }}</h1>
      <h1 *ngFor="let lastname of getLastnames()">{{ lastname }}</h1>
      <button (click)="onBtnClick()">Click me</button>
    </div>
  `,
})
export class App {
  getFirstnames() {
    return ["John", "Jane", "Jack"];
  }
  getLastnames() {
    return ["Doe", "Eoe", "Foe"];
  }
  onBtnClick() {
    console.log("Button clicked");
  }
}

bootstrapApplication(App);
```

which is not a good practice. The functions are called every time the change detection runs. So I decided to refactor the code and move the functions to the component class.
The main problem was that the functions were called from different places in the template. I need to find a way to detech which function is called and how many times it is called.

The browser's dev tools are not very helpful in this case. I can put a breakpoint in the function and see the call stack, but I need to do this for every function.

Also, I can use the `console.trace()` function to print the call stack, but this will print the call stack every time the function is called. I need to print the call stack only once.

# The problem

I need to find a way to detect when a method is called and from where it is called (Component, Template, Service, etc.) and the number of times it is called without changing the code of the method (adding `console.trace()` or `console.log()` every time the method is called) and without using the browser's dev tools (putting a breakpoint in the method and inspecting the call stack).

# The solution

The solution is to use a decorator. A decorator is a function that can be used to modify a class, a method, a property, a parameter, etc. The decorator is called when the class, method, property, parameter, etc. is defined.

In my case, I need to create a decorator that will be called when a method is defined and will print the name of the method / class.

```typescript
export function logger(target: any) {
  const methods = Object.getOwnPropertyNames(target.prototype).filter(
    (item) => typeof target.prototype[item] === "function"
  );

  methods.forEach((method) => {
    const original = target.prototype[method];

    target.prototype[method] = function (...args: any[]) {
      console.log(`Class: ${target.name} - Method: ${method}`);
      const result = original.apply(this as unknown, args);
      return result;
    };
  });

  return target;
}
```

Explanation:

The `logger` function is a decorator that takes as parameter the class that contains the methods that need to be logged. The decorator will return the same class, but the methods will be modified.

The `methods` constant will contain the names of all the methods of the class.

We loop through the methods and for each method we replace it with a new method that will print the name of the class and the name of the method and then it will call the original method with `original.apply(this, args)`.

Now, we can use the `logger` decorator to print the name of the class and the name of the method every time a method is called.

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { bootstrapApplication } from "@angular/platform-browser";
import { logger } from "./logger.decorator";

/**
 * The logger decorator will print the name of the class and the name of the method every time a method is called.
 * NB: Don't use parenthesis when using the decorator on a class:  "logger" not "logger()"
 */
@logger
@Component({
  selector: "my-app",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1 *ngFor="let firstname of getFirstnames()">{{ firstname }}</h1>
      <h1 *ngFor="let lastname of getLastnames()">{{ lastname }}</h1>
      <button (click)="onBtnClick()">Click me</button>
    </div>
  `,
})
export class App {
  getFirstnames() {
    return ["John", "Jane", "Jack"];
  }
  getLastnames() {
    return ["Doe", "Eoe", "Foe"];
  }
  onBtnClick() {
    console.log("Button clicked");
  }
}

bootstrapApplication(App);
```

The console will be full of messages like this:

![](/assets/images/screenshot_angular_decorator.png)

# What did we learn?

Decorators are a powerful feature of TypeScript. They can be used to modify a class, a method, a property, a parameter, etc.

In this post, we learned how to create a decorator that will print the name of the class and the name of the method every time a method is called. This is useful when we need to find out which method is called and how many times it is called without changing the code of the method (adding `console.trace()` or `console.log()` every time the method is called) and without using the browser's dev tools (putting a breakpoint in the method and inspecting the call stack).

Decorators can be used to implement cross-cutting concerns like logging, caching, etc. Many frameworks use decorators to implement cross-cutting concerns. For example, Angular uses decorators to implement dependency injection, routing, etc.

# References

[https://www.typescriptlang.org/docs/handbook/decorators.html](https://www.typescriptlang.org/docs/handbook/decorators.html)

[https://blog.logrocket.com/practical-guide-typescript-decorators/](https://blog.logrocket.com/practical-guide-typescript-decorators/)

I hope you enjoyed reading this article and learned something new. If you have any questions, feel free to contact me or leave a comment below.

---
title: "Maximizing Performance in Angular Applications: Proven Tips and Techniques"
date: 2023-02-03 01:00:00
categories: [angular, tips]
cover_image: /assets/images/angular.png
tags: "angular, tips"
canonical_url: null
published: true
description: "Maximizing Performance in Angular Applications: Proven Tips and Techniques"
---

Angular is a widely used TypeScript-based framework for building complex and feature-rich single-page applications.

In this article, we'll take a look at some of the best practices for optimizing performance in Angular applications.

## 0. Don't Use Angular (I'm an Angular Developer... Don't Kill Me)

I hate to say it, but if you're building a high-performance application, you should probably consider using a different framework. Angular is not the fastest framework out there...

![](https://athemes.com/wp-content/uploads/Screenshot-from-2020-09-20-13-19-39-3-2-1-768x417.png)

If your app requires high performance, consider using a framework that is specifically designed for performance, such as [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), or [React](https://reactjs.org/). If you insist on using Angular, you can still optimize your application by following the tips below...

## 1. Use Ahead-of-Time Compilation (AoT)

(This is the default starting in Angular 9+)

Ahead-of-Time (AoT) compilation is a process that compiles Angular applications at build time instead of at runtime. This results in faster application startup times and smaller bundle sizes. AoT compilation also improves security by preventing the execution of malicious code. To enable AoT compilation, add the following to your `angular.json` file:

```json
"build": {
  "builder": "@angular-devkit/build-angular:browser",
  "options": {
    "aot": true
  }
}
```

## Lazy Loading

Lazy loading is a technique that allows you to load modules on demand. This can improve performance by reducing the initial bundle size and only loading the modules that are needed for the current page. To enable lazy loading, add the following to your `app-routing.module.ts` file:

```typescript
const routes: Routes = [
  {
    path: "lazy",
    loadChildren: () => import("./lazy/lazy.module").then((m) => m.LazyModule),
  },
];
```

## 3. Use the OnPush Change Detection Strategy

Angular uses a change detection strategy to determine when to update the view. The default change detection strategy is `ChangeDetectionStrategy.Default`, which checks for changes on every tick. This can be inefficient if the component doesn't need to be updated on every tick. The `ChangeDetectionStrategy.OnPush` strategy only checks for changes when the component's inputs change. This can improve performance by reducing the number of change detection cycles. To use the `OnPush` strategy, add the following to your component:

```typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Add this line
})
```

## 4. Use the TrackBy Function

The `TrackBy` function is a function that allows you to track changes in a list of items. This can improve performance by reducing the number of change detection cycles. To use the `TrackBy` function, add the following to your component:

```html
<ul>
  <li *ngFor="let item of items; trackBy: trackByFn">{{ item }}</li>
</ul>
```

```typescript
trackByFn(index: number, item: any): number {
  return index;
}
```

## 5. Use the NgZone Service

The `NgZone` service is a service that allows you to run code outside of the Angular zone. This can improve performance by reducing the number of change detection cycles. To use the `NgZone` service, add the following to your component:

```typescript
constructor(private ngZone: NgZone) {}

ngOnInit() {
  this.ngZone.runOutsideAngular(() => {
    // Run code outside of the Angular zone
  });
}
```

## 6. Unsubscribe from Observables

Observables are a common way to handle asynchronous operations in Angular applications. However, if you don't unsubscribe from observables, they can cause memory leaks. To unsubscribe from observables, add the following to your component:

```typescript
ngOnInit() {
  this.subscription = this.observable.subscribe((value) => {
    // Do something with value
  });
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}
```

## 7. Use the Async Pipe

The `Async` pipe is a pipe that allows you to subscribe to observables in your template. This can improve performance by reducing the number of change detection cycles. To use the `Async` pipe, add the following to your component:

```html
<div *ngIf="observable | async as value">{{ value }}</div>
```

## 8. Angular Checklist

If you're building an Angular application, you can use the [Angular Checklist](https://angular-checklist.io/) to optimize your application. The Angular Checklist is a tool that analyzes your application and provides a list of optimizations that you can make.

## Conclusion

I didn't talk about SSR (Server Side Rendering) in this article, but it's also a great way to improve performance in Angular applications. If you want to learn more about SSR, check out [this article](https://angular.io/guide/universal).

If you enjoyed this article, don't forget to share it with your friends and colleagues. If you have any questions or comments, feel free to leave them below.

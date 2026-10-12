---
title: "Laravel + HTMX + Alpine: A Match Made in Heaven"
date: 2024-01-03 01:00:00
categories: [general, laravel]
image: /assets/images/laravel-htmx-alpine.png
---

Hello again! It's been a while since my last article. I've been busy with life and work. It's been a crazy year so far. I hope you're doing well.

Today I want to talk about Laravel, HTMX, and Alpine. These are three technologies that I've been digging into lately. I think they're a perfect match for each other. Let me explain why.

## Laravel

I'm a big fan of [Laravel](https://laravel.com/). I've been using it for 6 years now and it's my go-to framework for any new project.

I've tried other frameworks, but I always come back to Laravel. I've tried Django, Express, Spring Boot, Symfony, and many others. They're all great frameworks (except Spring Boot 🤢 Don't ask me why), but I always find myself missing Laravel's simplicity and elegance.

The only bad thing about Laravel is that they change the version number very often. It's hard to keep up with all the new features and changes... One day you're using Laravel 5.8, the next day you're using Laravel 8.0. It's a bit overwhelming.

Anyway, I'm not here to talk about Laravel. Here's what I want to talk about:

## HTMX

[HTMX](https://htmx.org/) is a new JavaScript library that makes it easy to build dynamic web applications.

It's a bit like LiveWire, but it's not tied to Laravel. You can use it with any framework or even without a framework.

HTMX is using the old-school approach of using HTML attributes to add functionality to your web pages.

For example, if you want to add a button that will send an AJAX request when clicked, you can do it like this:

```html
<button hx-get="/api/users">Get Users</button>

<div hx-swap="outerHTML" hx-target="#users">
  <p>Loading...</p>
</div>
```

This will send an AJAX request to `/api/users` when the button is clicked. The response will be inserted into the `#users` element.

HTMX is very easy to use and it's very powerful. It's also very lightweight (only 3KB gzipped).

Have a look at the [HTMX documentation](https://htmx.org/docs/) for more information.

## Alpine

[Alpine](https://alpinejs.dev/) is a JavaScript library that makes it easy to build interactive web applications.

It makes it easy to add interactivity to your web pages without writing any JavaScript code.

For example, if you want to add a button that will toggle a div when clicked, you can do it like this:

```html
<button x-on:click="show = !show">Toggle</button>

<div x-show="show">
  <p>Hello World!</p>
</div>
```

This will toggle the `div` when the button is clicked.

You can add transitions and animations to your elements using Alpine easily. No need to write any JavaScript code.

Have a look at the [Alpine documentation](https://alpinejs.dev/start-here) for more information.

## Laravel + HTMX + Alpine = ❤️

Imagine if you could combine the power of Laravel, HTMX, and Alpine together... Laravel for the backend, HTMX for the frontend, and Alpine for the interactivity. That would be awesome, right? Well, that's exactly what I'm going to show you in this article.

Let's forget about JSX and tons of JavaScript code. Let's go back to the old-school approach.

Step 1: Add Alpine to your Laravel project

```html
<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>
```

Step 2: Add HTMX to your Laravel project

```html
<script src="https://unpkg.com/htmx.org/dist/htmx.min.js" defer></script>
```

Step 3: Create blade components for your views

```html
<div x-data="{ show: false }">
  <button x-on:click="show = !show">Toggle</button>

  <div x-show="show" hx-get="/users" hx-swap="outerHTML" hx-target="#users">
    <p>Loading...</p>
  </div>
</div>

<div id="users">
  <!-- Users will be inserted here -->
</div>
```

Step 4: Create a controller for your views

```php
class UserController extends Controller
{
    public function index()
    {
        return view('users.index');
    }
}
```

Step 5: Create a route for your controller

```php
Route::get('/users', [UserController::class, 'index']);
```

That's it! You can now use HTMX and Alpine in your Laravel project.

## Tutorial Video

If you prefer watching a video instead of reading, here's a tutorial video I found on YouTube:

<iframe style="width: 100%; height: 500px; border: none; padding-bottom: 20px" src="https://www.youtube.com/embed/ZUGejA3qRgI?si=937YR2uNNQVj7FaN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Conclusion

I hope you enjoyed this article. If you have any questions or comments, please leave them below.

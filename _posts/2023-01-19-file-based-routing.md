---
title: "File-based Routing: This is why I don't like it"
date: 2023-01-19 01:00:00
categories: [programming]
image: /assets/images/1674126954956.png
---

```
⚠️ This is my personal opinion, based on my little experience with Next.js and other frameworks that use file-based routing. I am not trying to offend anyone, and I am open to any feedback. If you have a different opinion, please let me know in the comments.
```

When I first started using Next.js, I was excited about all the features it offered for building server-rendered React applications.

However, as I dove deeper into the framework, I quickly realized that there was one aspect of it that I couldn't stand: **the file-based routing**.

![](/assets/images/1674127435396.png)

The trend of file-based routing started with the introduction of the JAMstack. The idea behind the JAMstack is to build static websites using JavaScript, APIs, and Markup. The static websites are then hosted on a CDN and served to the users.

File-based routing, as used in Next.js, and other frameworks... organizes routes based on the file structure of the application.

Additionally, naming files based on the last route section can also be confusing and make it difficult to keep track of the different pages and components in the application.

For example, you will end up with a file structure like this:

```
[+] pages
    [+] about
        - index.js
        - contact.js
    [+] blog
        - [id].js
        - index.js
    - index.js
```

Many files with the same name, and it's difficult to keep track of the different pages and components in the application.

I didn't want a million files named "index.js" or "[id].js" it gets pretty confusing fast, in my opinion.

I also didn't want to have to create a new folder for every new route. I wanted to be able to create a new page and add it to the existing folder structure.

In the other hand, centralized routing is a more traditional approach to routing. It's the way we've been doing it for years, and it's the way I prefer to do it.

In centralized routing, you define all the routes in a single file, and then you can use the routes in your application.

Let's imagine that we have a store application, and we want to create a page with sorting and filtering options.

```
https://store.com/shop/CATEGORY_GENERAL/[CATEGORY_SPECIFIC]/[SORT_ORDER]/[FILTERS]/[PAGINATION_PAGE]
```

It would be a lot easier to define the routes in a single file, and then use them in the application...

What do you think? Do you prefer file-based routing or centralized routing?

If you have any questions, please let me know in the comments.

---
layout: post
title: "Laravel and MongoDB: A Combination to Avoid"
date: 2023-01-08 10:00:00
categories: [laravel, mongodb]
cover_image: /assets/images/1673405580928.png
tags: "laravel, mongodb"
canonical_url: null
published: false
description: "Laravel and MongoDB: A Combination to Avoid"
---

If you're thinking about using Laravel and MongoDB together in your next project, I have three words for you:

### Don't do that.

![](/assets/images/1673405581160.gif)

Trust me, I've been there and it's not pretty.

In this article, I'll explain why you should avoid using Laravel and MongoDB together, and what you should do instead.

```
⚠️ This is my personal opinion, based on my experience working with Laravel and MongoDB. I'm not trying to say that Laravel and MongoDB are bad technologies, or that you should never use them together. I'm just saying that they are not a good fit for each other. If you want to use Laravel and MongoDB together, that's fine, but you should be aware of the issues and challenges that you may encounter.
```

I've worked with Laravel and MongoDB together for a few years, and I've run into a number of issues. I've also seen a lot of people asking for help on StackOverflow and other forums, and I've seen a lot of people complaining about the issues that they've encountered.

## Why You Should Avoid Using Laravel and MongoDB Together

Laravel is a PHP web framework designed to use a traditional SQL database (such as MySQL or PostgreSQL) as its data store. It has built-in support for these databases and provides a number of tools and features to make working with them easier.

MongoDB, on the other hand, is a NoSQL database that stores data in the form of JSON-like documents. It is designed to be flexible and scale horizontally, but does not offer the same level of support for transactions and ACID compliance as a traditional SQL database.

When you try to use Laravel and MongoDB together, you may run into a number of issues. For example:

- Laravel's ORM (Eloquent) is not designed to work with a NoSQL database like MongoDB, so you may have to use a separate library or write your own queries to interact with the database.

The most popular library for working with MongoDB in Laravel is [jenssegers/laravel-mongodb](jensegers/laravel-mongodb), which provides a MongoDB implementation of Eloquent. However, this library is not officially supported by Laravel, and it is not compatible with all of Laravel's features.
For example, it does not support Laravel's [Eloquent Collections](https://laravel.com/docs/8.x/eloquent-collections), which are used to group and manipulate collections of Eloquent models.

- Auto incrementing IDs are not supported by MongoDB, so you may have to use a different approach to generate unique IDs for your models. I used this hack (3 years ago) to generate unique IDs for my models, but it's not ideal. [Laravel How to use Auto Increment with MongoDB (jenssegers)](https://gist.github.com/Ademking/ef99bb8abf04afda6baabd5fc5d22659).

- Transactions are not supported by MongoDB (only version 4.0+). If you need to use transactions in your application, you should use a traditional SQL database instead.

- Sanctum implements a token-based authentication system for Laravel. However, it is not compatible with MongoDB, so you may have to use a different approach to handle authentication. [See this issue for more details](https://github.com/jenssegers/laravel-mongodb/issues/2233).

- Relationships in MongoDB are not as easy to use as relationships in a traditional SQL database. The only available relationships are: hasOne, hasMany, and belongsTo, belongsToMany. If you need to use more complex relationships, you may have to use a different approach or write your own code.

- Take a look at the number of [open issues](https://github.com/jenssegers/laravel-mongodb/issues) on the jenssegers/laravel-mongodb repository. Many of them are related to compatibility with Laravel's features. As I mentioned earlier, this library is not officially supported by Laravel, so you may run into issues that are not fixed quickly.

I'm not a hater of the work that Jenssegers has done with this library. I'm a big fan of his work, and I think he did a great job. I'm just saying that you should be aware of the issues and challenges that you may encounter when using Laravel and MongoDB together.

## What You Should Do Instead

If you have a project that requires a NoSQL database, you should use a framework that is designed to work with a NoSQL database.

If you want to use Laravel, you should use a traditional SQL database instead.

I invite you to leave a comment and share your experiences. Maybe I'm just a grump and things went smoothly for you. In any case, I hope this post has given you something to consider before embarking on your next project.

---
layout: post
title: "The Readability-Performance Paradox: My Experience as a Small Team Developer"
date: 2023-01-29 01:00:00
categories: [programming]
image: /assets/images/perf.png
---

As a software developer working in a small team, maintaining a balance between code readability and performance is a constant challenge. On one hand, code readability is crucial for ensuring that other team members can understand and work with our code. On the other hand, performance is essential for delivering a seamless user experience.

In this post, I will share my experience of balancing these competing priorities and provide some tips for achieving a balance in your own work.

In my experience, code readability has been especially important in a small team setting. We often work on projects with tight deadlines and limited resources, so it's crucial that everyone on the team can understand and work with our code. This is where code readability comes in - by using clear and meaningful variable and function names, breaking up complex code into smaller chunks, and using comments to explain what our code is doing, we can make our code more manageable and easier to understand.

However, this does not mean that we can neglect performance. In fact, in a small team setting, performance is even more crucial as it can directly impact the user experience and the overall success of the project. To balance this, we make sure to optimize only the parts of our code that are causing performance issues, rather than trying to optimize everything. Performance optimization is a complex topic, and there are many different ways to approach it.

In my experience, the most effective way to optimize performance is to use a combination of tools and techniques.
I mainly program in TypeScript (Angular, Node) and PHP (Laravel), so I will focus on these languages in this post. However, the same principles apply to other languages as well.

## TypeScript

In TypeScript, there are a number of tools and techniques that can help you to optimize performance. For example, using [ESlint](https://eslint.org/) with your team can help you to maintain a consistent coding style and avoid common mistakes. It can also help you to identify and fix performance issues in your code. However, it's important to remember that ESlint is not a silver bullet - it can't fix all of your performance issues, and it can't make your code more readable. So, while it's a great tool to have in your toolbox, it's not a replacement for good coding practices.

![](https://raw.githubusercontent.com/upleveled/eslint-config-upleveled/HEAD/screenshot.png)

## Angular Performance Checklist

The [Angular Performance Checklist](https://github.com/mgechev/angular-performance-checklist) is a great resource for optimizing performance in Angular. It provides a list of common performance issues and best practices for avoiding them. It also provides a list of tools and techniques that can help you to identify and fix performance issues in your code.

## Observables and RxJS

Always double check if you really need to use Observables and RxJS. They are great tools, but they can also be a source of performance issues. You should make sure that you are unsubscribing from the Observable when you no longer need the data. Otherwise, you will end up with a memory leak.

## Change Detection

Change detection is a process that Angular uses to detect changes in your application. It's triggered whenever a change is detected in your application. However, it can also be triggered by events that are not related to your application. For example, if you have a button that triggers a change detection, it will also trigger a change detection when the user clicks on it. This can cause performance issues, so it's important to make sure that you are only triggering change detection when it's necessary.

## Laravel Performance

When using Laravel's "with" method, you should make sure that you are only loading the data that you need. Otherwise, you will end up with a performance issue. For example, if you have a "users" with many "posts", you should make sure that you are only loading the "posts" that you need.

More information about this can be found in the [https://kinsta.com/blog/laravel-performance/](https://kinsta.com/blog/laravel-performance/)

## Update Your Dependencies Regularly

It's important to make sure that you are regularly updating your dependencies. This will ensure that you are using the latest version of the library, which will help you to avoid performance issues.

## SonarQube to the Rescue

[SonarQube](https://www.sonarsource.com/products/sonarqube/) is another tool that can help you to identify and fix performance issues in your code. It's a static code analysis tool that can be used to analyze your code and identify potential performance issues. It can also be used to identify and fix security vulnerabilities in your code. However, it's important to remember that SonarQube is not a silver bullet - it can't fix all of your performance issues, and it can't make your code more readable. So, while it's a great tool to have in your toolbox, it's not a replacement for good coding practices.

![](https://dx.appirio.com/quality-sonarqube/granting-permissions/SonarQube-ProjectIssues-1.png)

## Conclusion

Balancing code readability and performance is a constant challenge. By using clear and meaningful variable and function names, breaking up complex code into smaller chunks, and using comments to explain what our code is doing, we can make our code more manageable and easier to understand. Additionally, by focusing on optimizing only the parts of the code that are causing performance issues and regularly reviewing our code, we can ensure that our code meets the standards for both readability and performance.

![](https://media.tenor.com/odyVsZbC-OYAAAAC/why-not-both-why-not.gif)

I hope that you found this post useful and that it will help you to improve your own work. If you have any suggestions or feedback, please leave a comment below.

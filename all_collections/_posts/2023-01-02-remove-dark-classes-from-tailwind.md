---
layout: post
title: Removing Dark Classes from a Tailwind CSS code
date: 2023-01-02 10:00:00
categories: [tailwind, tricks, css]
image: https://i.ytimg.com/vi/o4Prej0wIZA/maxresdefault.jpg
---

If you're using the popular CSS framework Tailwind CSS, you may have noticed that it includes a number of "dark" classes that are prefixed with `dark-.` These classes are designed to be used in conjunction with the @dark variant, which changes the appearance of your site when the user has chosen a "dark" theme.

While these classes can be useful in some cases, you may decide that you want to remove them from your stylesheets in order to simplify your code or to make it easier to maintain. In this post, I'll show you how you can use a regular expression (regex) to quickly and easily remove all of the dark- classes from your code.

Regex: `dark:\w+([-:\w]*\w)`

Or use this tool that I made: [Tailwind Dark Mode Remover](https://ademking.github.io/Tailwind-Dark-Mode-Remover/)

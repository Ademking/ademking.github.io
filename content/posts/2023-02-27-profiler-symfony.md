---
title: "Symfony: Disable the Symfony Profiler in Production"
date: 2023-02-27 01:00:00
categories: [symfony, pentest]
image: /assets/images/exploit.png
---

Hey there! If you're using Symfony, please disable the Symfony Profiler in production.

_I don't know why developers (especially Tunisian/French developers) love this framework so much. Try to use Laravel instead. It's better... I promise._

## The security issue

If you found a web application that uses the Symfony web framework, do not forget to check debug mode and profiler.

Developer often forget to disable debug mode and profiler in production.

```
https://example.com/_profiler
https://example.com/app_dev.php/_profiler
https://example.com/app_dev.php
```

This is a security issue because it allows attackers to gain access to sensitive information about your application, including database credentials and user data.

## Why?

The images talk for themselves...

![](https://www.synacktiv.com/sites/default/files/inline-images/phpinfo.png)

![](https://www.synacktiv.com/sites/default/files/inline-images/creds_0.png)

You can read more about this vulnerability here [https://www.synacktiv.com/en/publications/looting-symfony-with-eos.html](https://www.synacktiv.com/en/publications/looting-symfony-with-eos.html)

As you can see, if you forget to disable debug mode and profiler in production, attackers can easily access sensitive information about your application.

## How to exploit this vulnerability?

There is a simple way to exploit this vulnerability using an automated tool called [synacktiv/eos](https://github.com/synacktiv/eos)

![](https://www.synacktiv.com/sites/default/files/styles/blog_grid_view/public/2020-06/eos_660x330.png)

You can use this tool to:

- download the victim's source code
- extract credentials from request logs

## How to fix this issue

Disable the debug mode by setting `APP_DEBUG` to false. Debug mode should be disabled in the production environment.

## Why do developers forget to disable dev mode in production?

So why do so many developers forget to disable dev mode in production? There are a few reasons:

- Lack of awareness: Some developers simply aren't aware of the risks associated with leaving dev mode enabled in production.

- Wrong configuration: Some developers enable dev mode in production by accident.

- Lack of security: Some developers don't care about security.

## Conclusion

In this post, we explored how to disable the Symfony Profiler in production. I hope you found it useful. If you have any questions, please leave a comment below.

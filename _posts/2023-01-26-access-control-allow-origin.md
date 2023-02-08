---
title: "The perils of wildcard CORS: How to protect your web application"
date: 2023-01-26 01:00:00
categories: [pentest, security]
cover_image: /assets/images/cors-explained.gif
tags: "pentest, security"
canonical_url: null
published: false
description: "The perils of wildcard CORS: How to protect your web application"
---

When building a web application, it is important to consider the security implications of the "Access-Control-Allow-Origin" header.

Setting this header to "\*" means that any origin is allowed to access the resource, which can be dangerous as it leaves the resource open to cross-site scripting (XSS) attacks.

XSS attacks occur when an attacker is able to inject malicious code into a website, which is then executed by the victim's browser. By setting the "Access-Control-Allow-Origin" header to "\*", an attacker could potentially inject malicious code into a website and gain access to sensitive information. This can include user login credentials, personal information, and other sensitive data.

To mitigate this risk, it is recommended to explicitly list the allowed origins in the "Access-Control-Allow-Origin" header. This limits the potential attack surface and helps to protect against XSS attacks. Additionally, it is also important to validate user input and sanitize it to prevent XSS attacks from occurring.

![](/assets/images/cors-explained.gif)

However, in some cases, it may be necessary to use "" when building APIs. For example, if you are building a public API that should be accessible by any client, you may want to use "" as the value for the "Access-Control-Allow-Origin" header. This allows any client to access the API, but it is important to note that this also increases the potential attack surface.

In such cases, it's better to use token based authentication and limit the scope of the token to the specific resource being accessed and also have a rate limit for the number of requests that can be made by a user.

In conclusion, when building a web application, it is important to consider the security implications of the "Access-Control-Allow-Origin" header. While it may be necessary to use "\*" when building public APIs, it is generally recommended to explicitly list the allowed origins in the header to limit the potential attack surface and protect against XSS attacks. Additionally, it is important to validate user input and sanitize it to prevent XSS attacks from occurring.

## References

[https://portswigger.net/web-security/cors/access-control-allow-origin](https://portswigger.net/web-security/cors/access-control-allow-origin)

[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

[https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/](https://www.freecodecamp.org/news/access-control-allow-origin-header-explained/)

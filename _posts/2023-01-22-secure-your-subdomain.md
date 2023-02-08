---
title: "Subdomains and Security: How to Keep Your Development and Pre-Prod Environments Safe"
date: 2023-01-22 01:00:00
categories: [pentest]
cover_image: /../assets/images/security.jpg
tags: "pentest"
canonical_url: null
published: true
description: "Subdomains and Security: How to Keep Your Development and Pre-Prod Environments Safe"
---

As a business, it's important to have a strong online presence and use modern technologies to develop and test your apps.

However, when it comes to using subdomains for development and pre-production purposes, it can be easy to overlook the potential security risks.

When I was working as a penetration tester, I often came across companies that had exposed their development and pre-production subdomains to the public...

One common mistake many companies make is using their main domain for development and pre-production subdomains. This means that these subdomains, which often contain sensitive information such as source code and login credentials, are publicly accessible to anyone who knows the main domain. This can lead to data leaks and even serious security breaches.

For example, if you have a website at `example.com`, you should not use subdomains such as `dev.example.com` or `preprod.example.com` and make them publicly accessible.

So, what can you do to protect your subdomains and the sensitive information they contain?

One solution is to use a different domain entirely for development and pre-production purposes. This way, even if the subdomains are accidentally exposed, they will be separate from your main domain and the sensitive information will not be easily accessible or discoverable.

Another solution is to implement IP whitelisting on the subdomains. This means that only specific IP addresses are allowed to access the subdomains, making it much more difficult for unauthorized individuals to gain access.

In addition to these solutions, it's also important to regularly conduct security assessments and penetration testing on your subdomains. This will help identify any potential vulnerabilities and allow you to address them before they can be exploited by attackers.

What do you think? Do you have any other tips for protecting your development and pre-production subdomains? Let me know in the comments below!

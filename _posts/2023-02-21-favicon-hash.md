---
title: "Using Favicon Hashes to Spot Vulnerabilities"
date: 2023-02-21 01:00:00
categories: [pentest]
image: /assets/images/favicons.jpeg
---

Have you ever heard of `favicon`? It's that little icon that appears in your browser tab when you visit a website.

Did you know that this tiny image can hold valuable information that can be used to improve your target reconnaissance?

In this post, we'll explore the power of favicon.ico and how it can be used in your reconnaissance efforts.

## What is a favicon?

A favicon is a small icon that is displayed in the browser's address bar and tab. It is a small image that is used to identify a website or a page.

The favicon was first introduced in 1999 by Microsoft (Internet Explorer 5) and was later adopted by other browsers. Read more about the history of favicon [here](https://en.wikipedia.org/wiki/Favicon). This is a blog not a history lesson, so let's get to the good stuff.

## How can we use it?

We can use the favicon to:

- Identify the CMS: The favicon.ico file can reveal the content management system (CMS) used by a website. By examining the URL of the favicon.ico file, you can determine which CMS the website is using. This information can be used to identify potential vulnerabilities and security issues associated with the CMS.

- Finding Subdomains: Favicon.ico can also reveal the presence of subdomains associated with the website. You may notice a subdomain name that you were previously unaware of. This can provide valuable information about the website's infrastructure and potential attack surfaces.

- Finding new assets/IPs: Favicon.ico can also reveal the presence of new assets or IP addresses associated with the website.

## Get the hash

The first step is to get the hash of the favicon.ico file. You can do this by using this cool tool called [favirecon](https://github.com/edoardottt/favirecon)

```bash
go install github.com/edoardottt/favirecon/cmd/favirecon@latest
favirecon -u https://www.github.com
```

The output will look something like

```bash
    ____            _
   / __/___  __  __(_)_______  _________  ____
  / /_/ __ \/ | / / / ___/ _ \/ ___/ __ \/ __ \
 / __/ /_/ /| |/ / / /  /  __/ /__/ /_/ / / / /
/_/  \__,_/ |___/_/_/   \___/\___/\____/_/ /_/


[1848946384] [GitHub] https://www.github.com/favicon.ico
```

You can chain the output to a file and use it for further analysis.

Example:

![](https://i.ibb.co/7QcSyLd/34f9f6fdcc39.png)

## Shodan search

Now that we have the hash, we can use it to search for other websites that use the same favicon. This can be done by using the Shodan search engine.

```
http.favicon.hash:1848946384
```

![](https://i.imgur.com/BK6pWo6.png)

## Conclusion

Favicon hash can help pentesters and bug bounty hunters to identify the CMS, subdomains, and other assets associated with a website. This information can be used to identify potential vulnerabilities and security issues associated with the website.

If you have any questions or suggestions, write them in the comments below. I'll be happy to answer them.

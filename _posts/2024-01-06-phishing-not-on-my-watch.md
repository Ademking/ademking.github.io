---
title: "Phishing? Not on My Watch! How I found a phishing site and How I took it down"
date: 2024-01-03 01:00:00
categories: [general, hacking]
image: /assets/images/angry-hacker.png
---

Hello Again!

Today I will tell you a short story about how I found a phishing site and how I took it down.

## Chapter 0: Why I'm writing this

I'm writing this article because I want to raise awareness about phishing sites. Especially phishing sites that target Facebook users. Many people fall for these scams and lose their accounts.

Recently, I've seen many tunisian facebook pages that were hacked. Even big pages with millions of followers. I don't want this to happen to me or to anyone else.

## Chapter 1: How I found the phishing site

Have you ever imagined turning the tables on a hacker? Picture this: you're browsing Facebook and you come across this post:

![](https://i.imgur.com/tqntZY3.png)

For those who don't speak Arabic, it says:

```
⚠️Final warning
We've reviewed your account and noticed some unusual activity that goes against our Community Standards and Advertising Policies. Therefore, we have decided to suspend your account for the next 30 days.
This suspension will take effect within 24 hours. If you think this is a bug, click the button below to open a support ticket and let us know.
Check info on: https://facebook.com/l.php...
Please note that if we do not receive any response within 24 hours, the decision will be made by our team. Any advertising campaign can be canceled and you will no longer be able to access ads.
to thank,
Meta For Business Support Team
```

For the non-tech-savvy, the link looks legit. It's a `facebook.com` link, so it must be safe, right? Wrong! It's a phishing link.

`l.php?u=<<URL_HERE>>` is a facebook redirecting link.

The `u` parameter is the URL that the user will be redirected to.

If you click on it, you'll be redirected to a fake facebook form where you'll be asked to enter your username, password, and other personal information.

If you do that, the hacker will have access to your account and will be able to do whatever he wants with it.

## Chapter 2: Pretending to be a victim

I decided to play along and see what happens next. I clicked on the link and visited the fake facebook form page.

```
⚠️ Disclaimer: I will not share the link to the phishing site. I will only share screenshots.
```

![](https://i.imgur.com/k3adMG5.png)

As you can see, the page looks legit. It has the facebook logo, the facebook colors, and the facebook font.

I opened DevTools and inspected the page. It was built using Vue.js. I've searched for "https" links where the good stuff is usually hidden. I found a few interesting links:

![](https://i.imgur.com/gfuOVcN.png)

Let me explain what is happening here:

https://api.db-ip.com is a public website that provides IP geolocation data. It's used to get the user's IP address.

The developer is getting the victim's IP address and sending it to the hacker's server.

https://api.telegram.org is a the Telegram API. The hacker is using telegram to store the victim's data.

The hacker is sending the victim's data to his telegram account. He is even putting the API Key in the source code.

The API key looks like this: `123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ`

What a noob! 🤣 You should never put your API Key in the source code. Never!

So let's recap what we have so far:

1. The hacker is using a fake facebook form to steal the victim's data.
2. The hacker is using Vue.js to build the fake facebook form.
3. The hacker is using https://api.db-ip.com to get the victim's IP address.
4. The hacker is using Telegram to send the victim's data to his telegram account.
5. The hacker is putting his Telegram API Key in the source code.

Let's see what happens next...

## Chapter 3: The hacker's telegram account

I decided to read Telegram's API documentation to see what we can do with the API Key. Surprisingly, we can do a lot of things with it.

I've found a Swagger documentation for the Telegram API. You can find it here: [https://telegram-bot-api.vercel.app/](https://telegram-bot-api.vercel.app/)

![](https://i.imgur.com/2ijzlsT.png)

So I decided to play around with the API and see what happens. I've sent a few requests to the API and I've found something interesting.

![](https://i.imgur.com/8ixOrJa.png)

I found a list of victims. Email addresses, passwords, IP addresses, and other personal information.

Most of the victims are from Arab countries. Tunisia, Algeria, Jordan, Morocco, Egypt, etc...

Using the API Key, I was able to get the invite link for the hacker's telegram group.

![](https://i.imgur.com/lVaLcQ1.png)

Let's see what's inside...

This is the hacker's telegram group. It has 10 members.

![](https://i.imgur.com/dWs6IoM.png)

I think the hacker is from Vietnam. I don't speak Vietnamese, so I can't be sure.

![](https://i.imgur.com/XX5AjWC.png)

## Chapter 4: It's time to take action

I've deleted the hacker's telegram group and reported the hacker to Telegram.

![](https://i.imgur.com/hRCN2Tr.png)

The API key is also invalid now. So the hacker can't use it anymore. 😁

![](https://i.imgur.com/nKIKyDu.png)

Also, I've reported the hacker's website to the hosting provider and they've taken it down.

![](https://i.imgur.com/S6qmDFg.png)

Thanks to the hosting provider for taking action so quickly. 👏👏👏

![](https://i.imgur.com/TInOvzu.png)

## Chapter 5: Conclusion

Phishing is a serious problem. Many people fall for these scams and lose their accounts.

If you see a suspicious link on Facebook, don't click on it. Report it to Facebook and they will take it down.

If you have some knowledge about web development, check the source code of the page. You might find something interesting (like I did).

And if you're a hacker, please stop hacking people. It's not cool. It's not funny. It's not worth it. Also, don't put your API Key in the source code. Never! 🤣🤣

That's all for today. I hope you enjoyed this article. If you have any questions or comments, please leave them below.

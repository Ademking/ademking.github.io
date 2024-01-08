---
title: "Episode 2: Phishing? Not on My Watch!"
date: 2024-01-07 01:00:00
categories: [general, hacking]
image: /assets/images/phishing-2.png
---

Another day, another phishing site. Those hackers are getting on my nerves. I'm tired of seeing people fall for these scams. I want to do something about it.

I think this is my new hobby. I'm addicted to finding phishing sites and taking them down.

Let's have some fun!

## Chapter 0: Where I found the phishing site

I found this phishing site on Facebook (again). Facebook is full of phishing sites. If you didn't read my previous article, you can read it [here](/posts/phishing-not-on-my-watch/).

Someone posted a screenshot of a phishing site on a Facebook group and asked if it's legit. I decided to investigate.

![](https://i.imgur.com/eTPe2hU.png)

Let's see what this is all about.

Same old story. The link looks legit for the non-tech-savvy. It's a `facebook.com` link, so it must be safe, right? Wrong! It's a phishing link.

![](https://i.imgur.com/MRK6pT6.png)

Let's see the source code.

![](https://i.imgur.com/x1zHL9p.png)

Those hackers are getting smarter. There are using Iframe inside another Iframe. But why ?

Why not just using one Iframe ? or just using a simple form ?

My guess is that they are trying to bypass facebook's phishing detection system. They are trying to make the page look as legit as possible. Making an Iframe inside another Iframe is a good way to do that.

Also they can change the source of the Iframe without changing the source of the main page. This way, they can change the phishing site without changing the link.

Smart, but not smart enough.

## Chapter 1: Pretending to be a victim

I decided to play along and see what happens next.

I've opened the developer tools and listened to the network requests.

![](https://i.imgur.com/qvwe32k.png)

There is a lot happening here. Let's break it down.

The hacker is using Firebase database to store the data. `/.ws` is websocket. Firebase is using websocket to communicate. You can read the messages in the websocket by clicking on "Messages" tab.

![](https://i.imgur.com/lJBtpRH.png)

Also, the hacker is sending an email to notify himself when someone falls for the scam. The email contains the victim's IP address, browser, and other information.

![](https://i.imgur.com/G8Ep2ju.png)

The hacker is also storing the data in an excel file on Google Drive. Using Macros, he can send the data and add a new row (victim) to the excel file.

![](https://i.imgur.com/gCcG0AW.png)

Let's recap what we have so far:

1. The hacker is using a fake facebook form to steal the victim's data.
2. The hacker is using Iframe inside another iframe to bypass facebook's phishing detection system.
3. The hacker is using Firebase database to store the victim's data.
4. The hacker is sending an email to notify himself when someone falls for the scam.
5. The hacker is storing the victim's data in an excel file on Google Drive.

Hmmm... What can we do with this information ?

## Chapter 2: Let's read some code

I've opened the source code and started reading it. What I've found is:

2. The hacker is using React to build the fake facebook form.

![](https://i.imgur.com/26R5axp.png)

Ok, that's interesting. Usually, when someone is using React, he will have a routing system. Unless he is using React for no reason.

Let's see if we can find the routes. The routes are usually in `path:` or `to:`.

![](https://i.imgur.com/SQFsesF.png)

Bingo! We've found the routes. Let's see what we have here.

`/admin/manage` looks interesting. Let's see what's inside.

![](https://i.imgur.com/qfG2KwR.png)

What is this ? A login page ? And what language is this ? let's translate it...

![](https://i.imgur.com/0Y8Qbzd.png)

It's Vietnamese again. I'm starting to learn Vietnamese. 🤣🤣 Those vietnamese hackers are everywhere.

So, we have a admin login page. If we type a random password. No request will be sent. The hacker is using javascript to validate the password. No backend is involved. Strange... ? How is he going to login without a backend ? Or is he ?

Let's reverse engineer the javascript code and see what happens.

![](https://i.imgur.com/IWnZR9g.png)

This string looks suspicious. Let's decode it.

`FcS9Hj'96gl4:nZQmirxS6q)j3F2Nxdj`

No luck. It's not an encoded string. I think it's a password. A very long password.

Let's use it and see what happens.

Bingo! We've found the admin panel. Let's see what's inside.

![](https://i.imgur.com/x41N7Pl.png)

![](https://i.imgur.com/5Lr7ySy.png)

This is a gold mine. The hacker is storing the victim's data in a database.

The hacker is also waiting for the 2FA code. He can't login without it.

```
📌 2FA stands for Two Factor Authentication. It's a security feature that adds an extra layer of protection to your account. It requires you to enter a code from your phone in addition to your password.
```

## Chapter 3: It's action time

We know that the hacker is using Firebase database to store the victim's data. Let's try to access it using API Key.

Let's go back to the source code and see if we can find the API Key.

![](https://i.imgur.com/Ei26u6r.png)

Bingo! We've found the API Key. Let's hope that we have permission to access the database.

Fun fact: The hacker is playing an mp3 file when someone falls for the scam. The mp3 file is called `notify.mp3`. 🤣🤣🤣

Using those Firebase credentials, I will try to access the database and see what happens.

I will use this Python library called `pyrebase`. You can find it here: [https://github.com/thisbejim/Pyrebase](https://github.com/thisbejim/Pyrebase)

With this library, we can perform CRUD operations on the database.

```python
import pyrebase

config = {
  "apiKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "authDomain": "XXXXXXXXXXXXX.firebaseapp.com",
  "databaseURL": "https://XXXXXXXXXXXXXXX.firebaseio.com",
  "storageBucket": "XXXXXXXXXXXXX.appspot.com",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()
print(db.get().val())
```

![](https://i.imgur.com/OowIPzm.png)

We can access the database. Can we delete it ? Let's try.

![](https://i.imgur.com/lcsksFE.png)

![](https://i.imgur.com/hO6pFrF.png)

OK! We've deleted the database. But not enough. Users can still fall for the scam. We need to take down the phishing site.

I've flooded the hacker's database with this:

![](https://i.imgur.com/40mqUg8.png)

And that's it. The phishing site is down. The hacker can't access the database anymore. He can't login to the admin panel. He can't do anything.

![](https://i.imgur.com/IuK7xk1.png)

![](https://i.imgur.com/Ffzkwbk.png)

## Chapter 4: Conclusion

![](https://i.imgur.com/nnaEbQA.png)

Let me explain what happened here.

1. The victims visit the phishing site.

2. The website is using Iframe inside another Iframe to bypass facebook's phishing detection system.

3. The victims enter their email / passwords / etc...

4. The website sends a POST request to Google Script a.k.a. Google Apps Script.

5. The script will store the victim's data in a Google Sheet.

6. The google script will fire a validation algorithm to check if the victim data is valid or not.

7. The backend tries to login to the victim's account using the victim's credentials.

8. If the login is successful, then the victim's data is valid. Otherwise, wait for 2FA code from the victim.

9. The backend will change the status of the victim's data to "Valid" or "Invalid".

10. The hacker will receive a notification when someone falls for the scam.

11. The hacker will login to the admin panel and download the victim's data.

I think the workflow is clear now.

This hacker is smarter than the previous one. He is using new techniques to bypass facebook's phishing detection system.

But he is not smart enough. The security rules on Firebase database are weak. He is making read and write operations without authentication.

Also he is using a weak password for the admin panel. He is using javascript to validate the password. No backend is involved.

I hope you enjoyed this article. If you have any questions, feel free to ask me in the comments section below.

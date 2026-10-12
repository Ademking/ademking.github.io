---
title: "Smile, You’re Hacked: Pentesting Open Cameras"
date: 2024-06-28 01:00:00
categories: [general, pentest, tools]
image: /assets/images/cams.png
---

Hey folks! Ever wondered how secure those surveillance cameras watching your every move really are?

As a "pentester", I’ve seen firsthand just how vulnerable many of these devices can be. In this post, we’re diving into the world of open cameras—those unlucky gadgets left exposed on the internet, often with default passwords that are just begging to be cracked.

We’ll explore the ins and outs of identifying these cameras and testing their security using a nifty open-source tool I stumbled upon

## The Problem with Open Cameras

Open cameras are a goldmine for hackers. They’re often left unsecured, with default passwords or no passwords at all. This makes them easy targets for anyone looking to spy on unsuspecting users or launch more serious attacks.

The worst part? Many of these cameras are connected to the internet, making them accessible from anywhere in the world. This means that anyone with the right tools and know-how can tap into these devices and compromise your privacy.

But... My password is too strong, so I’m safe, right? right?

![](/assets/images/meme_cam.jpg)

Not necessarily. Many manufacturers use weak or easily guessable passwords, which can be cracked in a matter of minutes using automated tools.

Also, RTSP streams are often left open. The page has a password, but the stream is open.

What is RTSP? RTSP (Real-Time Streaming Protocol) is a network control protocol designed for use in entertainment and communications systems to control streaming media servers. It is used to establish and control media sessions between end points.

In short, it's TCP/IP based protocol for streaming media. The response is like this:

```
RTSP/1.0 200 OK
CSeq: 1
Date: Thu, 25 Jun 2024 01:00:00 GMT
Content-Base: rtsp://
```

So if you have a camera that uses RTSP, possibly you can access the stream without the need of a password.

Here is an example:

![](/assets/images/cam_schema.png)

In this example, we have a page with a password. We can access the stream without the need of a password. Crazy, right?

It's like having a gate without fence.

![](/assets/images/gate_meme.jpg)

## Identifying Open Cameras

Before we can test the security of these cameras, we need to find them first. There are several ways to identify open cameras on the internet:

1. **Search Engines**: Google, Shodan, and other search engines can help you find open cameras by searching for specific keywords or IP ranges. Some search engines have dedicated filters for finding open cameras, making the process even easier. Shodan, Censys, ZoomEye, Fofa, you name it....

2. **Port Scanning**: You can use tools like Nmap to scan IP ranges for open ports. Cameras often use specific ports for streaming video, so scanning for these ports can help you identify open cameras on the network.

3. **Keyword Searches**: Many cameras have default login pages with specific keywords in the URL. By searching for these keywords, you can find open cameras that are accessible over the internet.

For example, searching for `inurl:axis-cgi/mjpg` on Google will return a list of cameras that are using the Axis camera software.

## Let's try it out

```
Disclaimer: This is for educational purposes only. I am not responsible for any misuse of the information provided in this post. I do not support hacking or any illegal activities. The main goal of this post is to raise awareness about the security risks associated with open cameras.
```

### Step 1: Finding IPs

I will be using Censys to find open cameras in my area. You can use any other search engine.

Censys is a search engine that allows researchers to ask questions about the hosts and networks that compose the Internet. It is a great tool for finding open cameras, vulnerable devices, and other interesting things on the internet.

We need queries to find open cameras. You have 2 options:

1. Read the documentation and create your own queries.

2. Use this GPT tool to generate queries for you: [https://gpt.censys.io](https://gpt.censys.io/)

Just describe what you want to find and the tool will generate the query for you.

Here is an example of a query to find ips with port 554 open:

![](/assets/images/gpt-query.png)

![](/assets/images/censys_res.png)

We found about 4000 cameras in our area.

## Step 2: Testing the Security of the Cameras

Now that we have a list of ips, we can start testing the security of the cameras.

I will be using a tool called `RTSPbrute` to test the security of the cameras. RTSPbrute is an open-source tool that allows you to test the security of RTSP streams by brute-forcing usernames, passwords, and the path to the stream.

You can find the tool here: [https://gitlab.com/woolf/RTSPbrute](https://gitlab.com/woolf/RTSPbrute)

To use the tool, you need the following requirements:

```bash
pip install av
pip install Pillow
pip install rich
```

And then you can install the tool using pip:

```bash
pip install rtspbrute
```

The tool is very easy to use. You just need to provide a list of ips. It's also possible to provide your own list of usernames / passwords / paths / ports.

![](/assets/images/rtspbrute.png)

And that's it! The tool will start testing the security of the cameras and print the results to the screen.

But wait, there's more!

You can also get a html report with the results.

![](/assets/images/cams-list.png)

As you can see, the tool found several cameras with default passwords or no passwords at all. This is a serious security risk that could allow an attacker to spy on unsuspecting users or launch more serious attacks.

## Bonus: Another tool to scan for open cameras: "Cameradar"

![](https://raw.githubusercontent.com/Ullaakut/cameradar/master/images/Cameradar.gif)

"Cameradar" allows you to:

- Detect open RTSP hosts on any accessible target host
- Detect which device model is streaming
- Launch automated dictionary attacks to get their stream route (e.g.: /live.sdp)
- Launch automated dictionary attacks to get the username and password of the cameras
- Retrieve a complete and user-friendly report of the results

You can find the tool here: [https://github.com/Ullaakut/cameradar](https://github.com/Ullaakut/cameradar)

## What can you do to protect yourself?

1. Change the default password of your cameras. Use a strong, unique password that is not easily guessable. Avoid using common passwords like "admin", "root", or "123456". Use a password manager to generate and store strong passwords.

2. Check if your camera is exposed to the internet. If you don't need remote access to your camera, disable it. Many cameras have a setting that allows you to restrict access to the local network only. This can help protect your camera from unauthorized access.

3. Keep your cameras up to date. Many manufacturers release firmware updates that fix security vulnerabilities in their devices. Make sure to install these updates regularly to protect your cameras from known exploits.

4. Check your logs. If you have a camera that uses RTSP, check the logs to see if there are any unauthorized access attempts. This can help you identify potential security risks and take action to protect your camera.

5. Test the security of your cameras regularly. Use tools like RTSPbrute to test the security of your cameras and identify any vulnerabilities that could be exploited by attackers.

By following these tips, you can help protect your cameras from unauthorized access and keep your privacy safe.

Stay safe out there!

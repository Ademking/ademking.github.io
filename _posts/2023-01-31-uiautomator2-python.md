---
layout: post
title: "Getting Started with Uiautomator2"
date: 2023-01-30 01:00:00
categories: [python, android]
image: /assets/images/python-adb.png
---

With the use of the uiautomator2 library and the Android Debug Bridge (ADB), we can automate various tasks on an Android device from a computer.

The uiautomator2 library provides a Python wrapper for controlling the mobile device and is based on the Uiautomator2 testing framework. [openatx/uiautomator2](https://github.com/openatx/uiautomator2)

In this post, we will delve into the basics of using uiautomator2 and ADB to perform tasks such as getting the current activity and performing a press action. We will explore the power and ease of using these tools to streamline and automate tasks on an Android device.

## Install

```bash
pip3 install uiautomator2
```

## Usage

```python
import uiautomator2 as u2

d = u2.connect() # connect to device
print(d.info)
# {'currentPackageName': 'net.oneplus.launcher', 'displayHeight': 1920, 'displayRotation': 0, 'displaySizeDpX': 411, 'displaySizeDpY': 731, 'displayWidth': 1080, 'productName': 'OnePlus5', 'screenOn': True, 'sdkInt': 27, 'naturalOrientation': True}
```

## What can I do with it?

- Install an app
- Launch an app
- Stop an app
- Stop all running apps
- Get app info
- List all running apps
- Push and pull files
- Retrieve the device info
- Take a screenshot
- Get the current activity
- Key Events
- Perform a swipe / scroll / pinch / zoom / press actions
- and much more...

## Example

In this example, I will show you how to like a user on the [Muzmatch](https://play.google.com/store/apps/details?id=com.muzmatch.muzmatchapp) app.

```python
import uiautomator2 as u2
d = u2.connect()  # connect to device

def like_user():
    like_btn = d.xpath(
        '//android.widget.Button[@resource-id="com.muzmatch.muzmatchapp:id/discoverLikeButton"]').all()
    # check if the button exists
    if like_btn:
        like_btn[0].click()
    else:
        # sleep for 5 seconds
        d.sleep(5)
        btns = d.xpath('//android.widget.Button').all()
        btns[-1].click() # click on the last button (skip ad button)

if __name__ == "__main__":
    while True:
        like_user()
```

You can find more examples in the [examples](https://github.com/openatx/uiautomator2/tree/master/examples) folder.

If you have any questions, feel free to ask in the comments below.

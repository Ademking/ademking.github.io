---
title: "SSH VSCode as Root: Say Goodbye to Permission Headaches"
date: 2023-02-24 01:00:00
categories: [vscode, tutorial]
image: /assets/images/ssh-vscode-failed.png
---

When working on a remote server with VSCode, you may run into an issue where you need to modify or create files that require root privileges.

You may get an error like this:

![](/assets/images/ssh-vscode-failed.png)

> NoPermissions (FileSystemError): Error: EACCES: permission denied, open ...

Handling permissions can be a bit of a headache...

## How to Fix

There is a simple fix for this issue. You can use the extension [Save as Root in Remote - SSH
](https://marketplace.visualstudio.com/items?itemName=yy0931.save-as-root)

![](https://raw.githubusercontent.com/yy0931/save-as-root/main/screenshot.gif)

Just install the extension, and when you need to save a file as root, just ctrl+shift+p and type "Save as Root".

## How does it work?

The magic happens in this file: [extension.js](https://github.com/yy0931/save-as-root/blob/main/extension.js)

```js
 return new Promise((resolve, reject) => {

// 1. Authenticate with `sudo -S -p 'password:' sh`.
// 2. Call `echo file contents:` to inform the parent process that the authentication was successful.
// 3. Write the file contents with `cat <&0 > "$filename"`.

const p = execFile(config.get("command", "sudo"), [...(user === "root" ? [] : ["-u", user]), "-S", "-p", "password:", `filename=${filename}`, "sh", "-c", 'echo "file contents:" >&2; cat <&0 > "$filename"'])
        p.on("error", (err) => {
            stopTimer()
            reject(err)
        })
 }
```

It uses the `sudo` command to authenticate with the root user, and then writes the file contents to the file.

## Conclusion

Working with SSH and VSCode can be a bit of a headache, but this extension makes it a lot easier. I hope this post helped you fix your permission issues. If you have any questions, feel free to leave a comment below.

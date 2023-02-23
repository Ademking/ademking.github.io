---
title: "Modifying Nginx's Try_Files for Angular Redirection"
date: 2023-02-23 01:00:00
categories: [angular, tutorial]
image: /assets/images/angular.png
---

When deploying an Angular app to a server, you may run into an issue where the routing doesn't work properly.

For example, if you have a route like `/about`, and you navigate to it, the page will load properly. However, if you refresh the page, you'll get a 404 error.

You can fix this issue by modifying the `try_files` in your Nginx configuration file.

## How to Fix

1. Open your Nginx configuration file (usually located at `/etc/nginx/nginx.conf`).

Find the `try_files` directive and modify it to look like this:

```
location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
                            |
                            | You need to add this
                            v
    try_files $uri $uri/ /index.html =404;
}
```

You just needed to add your index.html in the list

2. Reload the config with

```
sudo nginx -s reload
```

That's it! Now your Angular app should work properly.

## Explanation

`$uri` will try the request as a file, if this fails, it moves to the next one.

`$uri/` will try the request as a folder `/index.html` will then be tried, which sends all requests to your index.html where your angular app will be able to route things (also make sure you use html5mode to avoid the use of # in the url.

`=404` will be your final fallback, basically saying: I've tried this as a file, folder, and via index.html. If index.html fails/does not exist for whatever reason, we will serve a 404 error.

Important:

When using this method, you basically lose the ability to serve 404 errors from your webserver, unless index.html does not exist (which is where =404 comes in).

This means that you will need to handle 'Not Found' urls and missing pages within Angular app, and you need to be ok with the fact that the error page you use will return a HTTP 200 response, rather than 404. (This is because the moment you direct to the index.html, you've served a page to the user, thus 200).

## Conclusion

I hope this post helped you fix your Angular app's routing issue. If you have any questions, feel free to leave a comment below.

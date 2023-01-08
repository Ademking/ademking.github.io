---
layout: post
title: Adding cmd-k for Quick Navigation
date: 2023-01-09 10:00:00
categories: [javascript, jekyll, tutorial]
image: https://i.imgur.com/70fWHm9.png
---

![](https://i.imgur.com/70fWHm9.png)

If you're a frequent blogger or reader, you know how time-consuming it can be to search through a long list of posts for a specific piece of content.
That's why adding a quick search feature to your blog can be a game-changer. Not only does it save time, but it also improves the user experience for your readers.

In this post, we'll walk through how to implement quick search on your Jekyll blog. By the end of this tutorial, you'll have a search bar that allows your readers to easily find what they're looking for on your site. Let's get started!

## 1) Import the Quick Search Library (Ninja-key)

While there are many ways to implement quick search on your Jekyll blog, we'll be using a library called Ninja-key. Ninja-key is a lightweight JavaScript library that allows you to add a quick search feature to your site. It's easy to use and has a lot of customization options.

To get started, we'll need to import the Ninja-key library into our site. To do this, we'll add the following script tag to the head of our default layout file:

```html
<script type="module" src="https://unpkg.com/ninja-keys?module"></script>
```

## 2) Add the Search Bar

Now that we've imported the Ninja-key library, we can add the search bar to our site. To do this, we'll add the following HTML to the head of our default layout file:

```html
<ninja-keys noAutoLoadMdIcons class="dark"></ninja-keys>
```

I've added the `noAutoLoadMdIcons` attribute to prevent the library from loading the Material Design icons. (I hate Material Design icons 😝💩)

I also added the `class="dark"` attribute to change the color of the search bar to match the color scheme of my site. You can remove this attribute if you want to use the default color scheme.

## 3) Add the Search Results

In order to display the search results, we'll need to create a new JavaScript file. To do this, we'll create a new file called `search.js` in the `assets/js` directory of our site.

Next, we'll add the following code to the `search.js` file:
{% raw %}

```javascript
---
---
// ☝️☝️ don't remove the above lines
// they are required to make the code work

// Get list of posts from Jekyll
const posts = [
    {% for post in site.posts %}
    {
        title: "{{ post.title | escape }}",
        url: "{{ site.baseurl }}{{ post.url }}",
        date: "{{ post.date | date: "%Y-%m-%d" }}",
        categories: [
            {% for category in post.categories %}
            "{{ category }}",
            {% endfor %}
        ]
    },
    {% endfor %}
];

// Custom Icons for Home and Posts Menu Items
// You can use any SVG icon you want
const articleIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z" fill="#fff"/></svg>';
const homeIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.376 3.47a2.248 2.248 0 0 0-2.752 0l-6.75 5.222A2.254 2.254 0 0 0 3 10.475v8.272A2.251 2.251 0 0 0 5.25 21h3a2.251 2.251 0 0 0 2.25-2.253v-2.252a1.5 1.5 0 1 1 3 0v2.252A2.251 2.251 0 0 0 15.75 21h3A2.251 2.251 0 0 0 21 18.747v-8.272c0-.698-.323-1.356-.874-1.783l-6.75-5.222Z" fill="#fff"/></svg>';

// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');
// map the posts to the ninja-keys data format
const myPosts =  posts.map(post => {
    return {
        id: post.title,
        title: post.title,
        icon: articleIcon,
        parent: 'posts',
        handler: () => {
            window.location.href = post.url;
        },
    };
});
// add the home and posts menu items
ninja.data = [
    {
        id: 'home',
        title: 'Home',
        icon: homeIcon,
        handler: () => {
            window.location.href = "{{ site.baseurl }}";
        },
    },
    {
        id: 'posts',
        title: 'Posts',
        icon: articleIcon,
        children: myPosts,
    }
];
// That's it!
```

## 4) Add the search.js file to the end of the body of the default layout file

```html
...
<!-- other tags -->
</body>
<ninja-keys noAutoLoadMdIcons class="dark"></ninja-keys>

<!-- Add search.js after the ninja-keys element 👇-->
<script src="{{site.baseurl}}/assets/js/search.js"></script>
```

{% endraw %}

## 5) Test it out!

Now that we've added the search bar and search results, we can test it out! To do this, open your website in a browser and press `ctrl + k` to open the search bar.

![](https://i.imgur.com/70fWHm9.png)

Don't forget to check out the [Ninja-key documentation](https://github.com/ssleptsov/ninja-keys) to learn more about the customization options.

Hope you enjoyed this tutorial! If you have any questions, feel free to leave a comment below. 👇

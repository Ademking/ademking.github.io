---
---

const posts = [
    {% for post in site.posts %}
    {
        title: "{{ post.title }}",
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

const articleIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 22H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zM7 6v4h4V6H7zm0 6v2h10v-2H7zm0 4v2h10v-2H7zm6-9v2h4V7h-4z" fill="#fff"/></svg>';
const homeIcon = '<svg style="padding-right: 10px" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.376 3.47a2.248 2.248 0 0 0-2.752 0l-6.75 5.222A2.254 2.254 0 0 0 3 10.475v8.272A2.251 2.251 0 0 0 5.25 21h3a2.251 2.251 0 0 0 2.25-2.253v-2.252a1.5 1.5 0 1 1 3 0v2.252A2.251 2.251 0 0 0 15.75 21h3A2.251 2.251 0 0 0 21 18.747v-8.272c0-.698-.323-1.356-.874-1.783l-6.75-5.222Z" fill="#fff"/></svg>';
const aboutIcon = '<svg style="padding-right: 10px"  width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M19.536 9.146c-1.373 0-2.133 1.014-2.294 2.116h4.608c-.125-1.05-.867-2.115-2.314-2.115m-2.26 3.617c.235 1.156 1.193 1.97 2.532 1.97.725 0 1.77-.27 2.384-.914l1.175 1.35c-1.064 1.11-2.653 1.426-3.74 1.426-2.64 0-4.697-1.906-4.697-4.606 0-2.535 1.894-4.62 4.57-4.62 2.585 0 4.5 1.98 4.5 4.604v.766h-6.723v.023zm-6.487 3.83v-5.69c0-.976-.435-1.536-1.338-1.536-.814 0-1.355.585-1.717 1.007v6.24h-2.35v-5.7c0-.976-.415-1.532-1.318-1.532-.813 0-1.375.586-1.717 1.006v6.24H0V7.505h2.35v1.15c.4-.463 1.302-1.26 2.71-1.26 1.247 0 2.096.526 2.477 1.59.524-.761 1.5-1.59 2.91-1.59 1.7 0 2.69 1.01 2.69 2.963v6.24h-2.353l.005-.007z"/></svg>'
const portfolioIcon = '<svg style="padding-right: 10px" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z"/></svg>'
const ninja = document.querySelector('ninja-keys');
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
ninja.data = [
    {
        id: 'home',
        title: 'Home',
        icon: homeIcon,
        section: 'Navigation',
        handler: () => {
            window.location.href = "{{ site.baseurl }}";
        },
    },
    
    {
        id: 'about',
        title: 'About',
        section: 'About',
        icon: aboutIcon,
        handler: () => {
            window.location.href = "{{ site.baseurl }}/about";
        }
    },
    {
        id: 'portfolio',
        title: 'Portfolio',
        section: 'About',
        icon: portfolioIcon,
        handler: () => {
            window.location.href = "{{ site.baseurl }}/portfolio";
        }
    },
    {
        id: 'posts',
        title: 'Posts',
        section: 'Navigation',
        icon: articleIcon,
        children: myPosts,
    },
];
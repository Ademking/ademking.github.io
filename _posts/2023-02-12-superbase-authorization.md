---
title: "Authorization is crucial in securing websites"
date: 2023-02-12 01:00:00
categories: [pentest, security]
image: /assets/images/Cyber_Security_2.jpg
---

Hey there, today I want to talk about a serious vulnerability that many developers always forget to implement in their applications which is `Authorization`.

Recently, while visiting a website, I noticed that all APIs were open without authorization.

This means that anyone could access and manipulate the APIs without any kind of authentication, authorization or validation. This is a serious security risk, as it allows malicious actors to gain unauthorized access to sensitive data and perform malicious activities on the website.

The website was using [Supabase](https://supabase.com/) as a database, authentication and authorization service. This is a great service, but it needs to be configured properly to ensure that the APIs are secure.

![](https://i.imgur.com/TFgAkEd.png)

As you can see in the image above, the APIs are open to anyone, and anyone can access them without any kind of authorization.

Without proper authorization mechanisms, websites are vulnerable to attacks that can compromise their security and put their users at risk.

This is a checklist of things that you should do to ensure that your APIs are secure:

- If you're using Supabase, or any other service that provides a database service, make sure that you're using policies to protect your data. If you're using Supabase, you can use the `auth` policy to protect your data. This policy will ensure that only authenticated users can access the data. You can read more about policies [here](https://supabase.io/docs/guides/auth#policies). If you're using another service, you should check the documentation to see if they provide a similar feature.

- Ensure that all APIs are protected by authorization mechanisms. This means that only authenticated users should be able to access the APIs. No anonymous users should be able to access the APIs. To test this, you can use a tool like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to send requests to the APIs. If you're able to access the APIs without any kind of authentication, then the APIs are vulnerable to attacks.

- Ensure that all roles are properly configured. This means that only users with the correct roles should be able to access the APIs. For example, if you have an API that allows users to delete their account, only users with the `admin` role should be able to access it.

- Ensure that filters are properly implemented. Sometimes you might want to allow users to access only a subset of the data. For example, you might want to allow users to access only their own data. In this case, you should implement filters to ensure that users can only access their own data. I remember that I once found a website that allowed users to access all the data in the database, including the data of other users by using a simple `filter=*` parameter. The string `*` is a wildcard that matches any string.

- Ensure that all APIs are protected by rate limiting. This means that users should not be able to send too many requests to the APIs. This is important to prevent [denial of service](https://en.wikipedia.org/wiki/Denial-of-service_attack) attacks.

## Conclusion

If you're a developer, you should always ensure that your APIs are secure. Please make sure that you implement proper authorization mechanisms to ensure that your APIs are secure.

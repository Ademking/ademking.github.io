---
layout: post
title: "One-liner Bug Hunting: My Favorite Commands"
date: 2023-01-17 01:00:00
categories: [commands, pentest]
cover_image: /assets/images/1673958014729.gif
tags: "commands, pentest"
canonical_url: null
published: false
description: "One-liner Bug Hunting: My Favorite Commands"
---

In this post, I will be sharing some of my favorite one-liner commands that I use for bug hunting. These commands can be used to perform reconnaissance, identify open ports, check for file inclusion vulnerabilities, and much more. I hope you find them useful.

```bash
## Find all subdomains and check if they are alive
subfinder -d example.com -all -silent | httpx -ports 80,443,8080,8443,9001,9002,9000 -follow-redirects -status-code -title -content-length
```

Explanation:

`subfinder` is a subdomain enumeration tool that can be used to find all subdomains of a given domain. The output of subfinder is piped to `httpx`, which is a tool to check if the subdomains are alive. The -ports flag specifies the ports to check.

```bash
## Discover hidden directories and files
cat domains.txt | dirsearh  --stdin
```

Explanation:

`dirsearch` is a web path scanner that will search for hidden files and directories, the --stdin flag tells the tool to read the input from the pipe.

```bash
## Scan all subdomains
amass enum -brute -passive -d https://example.com | sed 's#*.# #g' | httpx -silent -threads 10 | xargs -I@ sh -c 'ffuf -w wordlist.txt -u @/FUZZ -mc 200'
```

Explanation:

`amass` is a subdomain enumeration tool that can be used to find all subdomains of a given domain. The output of amass is piped to `httpx`, which is a tool to check if the subdomains are alive. The output of httpx is piped to `ffuf`, which is a tool to brute force directories and files.

```bash
## Gather domains from content-security-policy
curl -v -silent https://example.com --stderr - | awk '/^content-security-policy:/' | grep -Eo "[a-zA-Z0-9./?=_-]*" |  sed -e '/\./!d' -e '/[^A-Za-z0-9._-]/d' -e 's/^\.//' | sort -u
```

Explanation:

`curl` is used to make a request to the target website. The output of curl is piped to `awk`, which is used to extract the content-security-policy header. The output of awk is piped to `grep`, which is used to extract the domains from the header. The output of grep is piped to `sed`, which is used to remove the domains that don't have a dot in them. The output of sed is piped to `sort`, which is used to remove duplicates.

```bash
## Extract Endpoints from JavaScript files
cat FILE.js | grep -oh "\"\/[a-zA-Z0-9_/?=&]*\"" | sed -e 's/^"//' -e 's/"$//' | sort -u
```

More one-liners:

[https://github.com/dwisiswant0/awesome-oneliner-bugbounty](https://github.com/dwisiswant0/awesome-oneliner-bugbounty)

[https://reconshell.com/awesome-one-liner-bug-bounty/](https://reconshell.com/awesome-one-liner-bug-bounty/)

[https://infosecwriteups.com/cors-one-liner-command-exploiter-88c06903cca0](https://infosecwriteups.com/cors-one-liner-command-exploiter-88c06903cca0)

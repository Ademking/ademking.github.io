---
title: "How I Built a Tool for Extracting Domains with Go Language"
date: 2023-02-13 01:00:00
categories: [pentest, security]
image: /assets/images/domains-cli.png
---

Hey there, today I want to talk about a tool that I recently created called `domains`. This tool is a CLI tool that allows you to extract domains from a list of URLs. This tool is useful for pentesters and bug bounty hunters who want to extract domains from a list of URLs, and then use them to perform further enumeration.

I'm a beginner in Go, so this is my first Go project. I'm not sure if this is the best way to do it, but it works. I'm open to suggestions and improvements.

![](https://i.imgur.com/AxOdYRA.png)

## Installation

Well, the first thing you'll need to do is to install Go on your system. Once you've done that, you can simply run the following command:

```bash
go install github.com/Ademking/domains@latest
```

If you prefer, you can also download the source code and build it manually. Once you have "domains" installed, you can start using it by piping input to it from another command. For example:

```bash
cat urls.txt | domains
```

This will extract all the domains from the list of URLs in `urls.txt` and print them to the terminal.

## Usage

You can also use the `--prefix` or the `--suffix` flags to extract domains with a specific prefix or suffix. For example:

```bash
cat urls.txt | domains --prefix "https://" --suffix "/api"
```

The result will be something like this:

```bash
https://example.com/api
https://foo.com/api
https://bar.com/api
```

You can also use the `--input` flag to specify a file to read from without piping input to the tool. For example:

```bash
domains --input urls.txt
```

## How it works

The tool uses a regular expression to extract domains from the input. The regular expression is:

```go
func extract_domain(input string) []string {
	r, err := regexp.Compile(`(?m)([a-z0-9][a-z0-9\-]{0,61}[a-z0-9]\.)+[a-z0-9][a-z0-9\-]*[a-z0-9]`)
	if err != nil {
		return []string{}
	}
	matchs := r.FindAllString(input, -1)
	return matchs
}
```

The result will be stored in a map to remove duplicates. You don't want to see the same domain multiple times, right?

You can find the source code for this tool on [GitHub](https://github.com/Ademking/domains).

## Why did I create this tool?

I created this tool because I wanted to learn Go. I also wanted to create a tool that I could use in pentesting and bug bounty.

I want to extract domains from a stdin stream and send them to another tool.

For example:

```bash
knockpy example.com | domains | httpx -status-code -title -follow-redirects
```

## Conclusion

Go is a great language for creating CLI tools. It's fast, easy to use, and has a lot of great libraries. Maybe I'll create more tools in the future. Who knows?

If you have any suggestions or improvements, please let me know in the comments below.

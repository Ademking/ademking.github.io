---
title: "How to add a placeholder to Monaco editor"
date: 2023-01-21 01:00:00
categories: [react, programming]
cover_image: /assets/images/1674320695421.png
tags: "react, programming"
canonical_url: null
published: false
description: "How to add a placeholder to Monaco editor"
---

I was playing around with the [Monaco editor](https://microsoft.github.io/monaco-editor/) and I wanted to add a placeholder to it. Just like the placeholder in VSCode. I couldn't find any documentation on how to do it, so I decided to write this post. I will be using the Monaco editor in React, but the same concept can be applied to any other framework.

## The problem

Monaco editor is a great editor, but it doesn't have a placeholder. There is no option to add a placeholder to it.

VSCode is using Monaco, and it has a placeholder. So I decided to look at the source code of VSCode and see how they did it.

I found out how they did it...

![](/assets/images/1674320695435.png)

It's in the file [untitledTextEditorHint.ts](https://github.com/microsoft/vscode/blob/main/src/vs/workbench/contrib/codeEditor/browser/untitledTextEditorHint/untitledTextEditorHint.ts).

The idea is very simple. They are using a `div` element as overlay. When the editor is empty, the `div` element is visible. When the editor is not empty, the `div` element is hidden.

## The solution

I made this sandbox to show how to add a placeholder to Monaco editor.

<iframe style="width: 100%; height: 500px; border: none; padding-bottom: 20px" src="https://stackblitz.com/edit/react-ts-6egvre?embed=1&file=App.tsx&hideDevTools=1&theme=dark"></iframe>

The component defines two functions, "handleEditorOnChange" and "handleEditorOnMount", that are passed as props to the rendered editor.

The "handleEditorOnChange" function is invoked when the content of the editor changes, and it checks if the editor is empty or not.

If it is empty, it shows the placeholder div by setting its display property to "block", otherwise it hides it by setting the display property to "none". The "handleEditorOnMount" function is invoked when the editor is first rendered and it shows the placeholder and focuses the editor.

If you want to see the full code, you can check it out on [StackBlitz](https://stackblitz.com/edit/react-ts-6egvre?file=App.tsx).

I hope this post was helpful. If you have any questions, feel free to ask them in the comments.

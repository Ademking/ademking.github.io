---
title: "Resurrecting Lost Code: findstr + VSCode's History Can Save Your Project"
date: 2023-07-18 01:00:00
categories: [general]
image: /assets/images/default-blog-post.png
---

Have you ever accidentally deleted a crucial file in Visual Studio Code (VSCode) and felt like all hope was lost? 

Fear not, for there's a hidden gem in Windows command prompt that can potentially save your life - the findstr command!

In this blog post, we'll explore how the findstr command can be used to search for history files in VSCode, recover lost code, and breathe new life into your projects.

The findstr command is a powerful tool available in Windows command prompt that allows you to search for specific strings within files. 

Its versatility extends to searching through directories and subdirectories, making it ideal for locating lost code in VSCode.

```
findstr /i /s "string_i_remember_from_lost_file" %APPDATA%\Code\User\History
```

- `findstr`: This is the command itself.
- `/i`: This option makes the search case-insensitive, ensuring that you don't miss any results due to different letter cases.
- `/s`: This option enables searching within all subdirectories, ensuring that even deep within the VSCode history files, no stone is left unturned.
- `"string_i_remember_from_lost_file"` : Replace this with a unique string or snippet you remember from the deleted file. This is the key that will help find the lost file in the history.
- `%APPDATA%\Code\User\History`: This is the directory path where VSCode stores its history files.

By running the findstr command with the specific parameters mentioned above, you can uncover hidden history files that contain remnants of your deleted code.
The command will display the names of files where the search string was found, giving you clues about the lost project.

![](https://i.imgur.com/8FBgtNy.png)

If you're using MacOs:

```
grep -r -i "string_i_remember_from_lost_file" "$HOME/Library/Application\ Support/Code/User/History"
```

If you're using Linux:

```
grep -r -i "string_i_remember_from_lost_file" "$HOME/.config/Code/User/History"
```

Happy coding and may your future projects be well-guarded against accidental deletions!

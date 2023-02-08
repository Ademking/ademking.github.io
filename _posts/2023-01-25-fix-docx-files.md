---
title: "Fixing Corrupted DOCX Files with PowerShell: A Step-by-Step Guide"
date: 2023-01-25 01:00:00
categories: [powershell, tools]
cover_image: /assets/images/1674672825467.png
tags: "powershell, tools"
canonical_url: null
published: true
description: "Fixing Corrupted DOCX Files with PowerShell: A Step-by-Step Guide"
---

As businesses continue to rely heavily on technology, it's become increasingly important to ensure that all systems are running smoothly. One area where this is especially true is with the generation and distribution of reports. In today's fast-paced business environment, it's essential that reports are delivered on time and in a format that can be easily read and understood. Unfortunately, this isn't always the case...

One of the most commonly used document formats is the Microsoft Word DOCX file. DOCX files are prone to getting corrupted and It can cause a variety of issues such as difficulty opening the file, missing content, or unexpected error messages.

In this article, I'll show you how to use PowerShell to repair DOCX files.

## Step 1: Install Microsoft Office

Before we begin, it's essential to have Microsoft Office installed on your computer. The script we'll be using requires the Microsoft Word COM object, which is only available if you have Office installed.

## Step 2: The Script

This is the script that I wrote to repair DOCX files.

The tiny script takes two arguments, the input file path and the output file path. For example, if your corrupted DOCX file is located in "C:\old.docx" and you want to save the repaired file as "C:\new.docx," you would run the following command:

```powershell
Try {
        $InputFilePath = $args[0]
        $OutputFilePath = $args[1]

        $Doc = $InputFilePath
        $word = New-Object -ComObject word.application
        $word.Visible = $false

        #                            1      2       3       4     5   6    7     8   9 10   11     12     13   14    15        16
        [void]$word.documents.Open($Doc, $false, $false, $false, "", "", $true, "", "", 0, $null, $true, $true, 0, $false) #, $null)

        <# Open Parameters:
        Document Open(
	         1 string FileName,
	         2 bool ConfirmConversions,
	         3 bool ReadOnly,
	         4 bool AddToRecentFiles,
	         5 string PasswordDocument,
	         6 string PasswordTemplate,
	         7 bool Revert,
 	         8 string WritePasswordDocument,
	         9 string WritePasswordTemplate,
	        10 int Format,
	        11 Object Encoding,
	        12 bool Visible,
	        13 bool OpenAndRepair, <- this
	        14 int DocumentDirection,
	        15 bool NoEncodingDialog,
	        16 Object XMLTransform
        )#>

        $filenameRES = $OutputFilePath
        $saveFormat = [Microsoft.Office.Interop.Word.WdSaveFormat]::wdFormatDocumentDefault
        $word.ActiveDocument.SaveAs([ref][system.object]$filenameRES, [ref]$saveFormat)
        $word.ActiveDocument.Close();
        $word.Quit()

        # Clean up Com object
        $null = [System.Runtime.InteropServices.Marshal]::ReleaseComObject([System.__ComObject]$word)
        Remove-Variable word
}

Catch{
    # Write error to log file
    $_ | Out-File C:\fix-docs\logs.txt
}
```

## Step 3: Run the Script

To run the script, open PowerShell and navigate to the directory where the script is located. Then, run the following command:

```powershell
.\fix-docx.ps1 "C:\old.docx" -"C:\new.docx"
```

After running the script, the repaired file should now be saved to the output file path specified in the second argument. Open the newly saved file to verify that it has been repaired successfully.

## Step 4: Automate the Process

The script we just wrote can be used to repair DOCX files manually. However, it can also be used to automate the process of repairing DOCX files. For example, you could use the script to repair all DOCX files in a directory. or you could use it to repair DOCX files after they've been generated.

If you have any questions about the script, feel free to leave a comment below. I'll do my best to answer any questions you may have.

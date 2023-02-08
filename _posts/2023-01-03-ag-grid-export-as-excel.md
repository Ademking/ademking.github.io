---
layout: post
title: Export AG-Grid to Excel (without Enterprise version)
date: 2023-01-03 10:00:00
categories: [typescript, angular, tutorial]
cover_image: /../assets/images/1673405580496.jpeg
tags: "typescript, angular, tutorial"
canonical_url: null
published: true
description: Export AG-Grid to Excel (without Enterprise version)
---

Exporting data from ag-grid to Excel is a common requirement,
but did you know that this feature is only available in the Enterprise version of ag-grid?
If you are using the Community or Free version of ag-grid, you might be wondering how to export data as an Excel file.

One option is to use a library like ExcelJS to generate an xlsx file from the data in ag-grid.
In this tutorial, I will show you how to use ExcelJS with ag-grid to export data as an xlsx file in an Angular app.

1. Install file-saver and exceljs

```
npm i --save exceljs file-saver
```

2. We also need to set the path to exceljs.min so that typescript knows where to find it. Open the tsconfig.json and add the path as shown below.

```json
"compilerOptions": {
   ....

   "paths": {
     "exceljs": [
       "node_modules/exceljs/dist/exceljs.min"
     ]
   },
}
```

3. Open `tsconfig.app.json` and add `node` under the types

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": ["node"]  <==== Add This
  },
  "files": [
    "src/main.ts",
    "src/polyfills.ts"
  ],
  "include": [
    "src/**/*.d.ts"
  ]
}
```

4. Create a new service. Let's call it "ExcelService"

```js
import { Injectable } from "@angular/core";
import { Workbook, Column } from 'exceljs';
import * as ExcelProper from "exceljs";
import * as fs from 'file-saver';

@Injectable()
export class ExcelService {
    constructor() { }

    exportToExcel(gridOptions: any, options: any) {

        let { rowsToDisplay } = gridOptions.api.getModel() as any;
        let data = rowsToDisplay.map(row => row.data);

        let workbook: ExcelProper.Workbook = new Workbook();
        let worksheet = workbook.addWorksheet(options.sheetName);
        worksheet.columns = options.columns.map((column: Column) => {
            let headerCol: Partial<Column> = {
                header: column.header,
                key: column.key,
                width: column.width,
            }
            return headerCol
        });

        // Fill data
        data.forEach((row: any) => {
            let newRow = {};
            options.columns.forEach((column: any) => {
                if (column.valueGetter) {
                    newRow[column.key] = column.valueGetter(row);
                }
                else {
                    newRow[column.key] = row[column.key];
                }
            });
            worksheet.addRow(newRow);
        });

        // Set alignment for all rows (wrapText: true for the moment, but can be extended to other properties)
        let rowIndex = 1;
        for (rowIndex; rowIndex <= worksheet.rowCount; rowIndex++) {
            worksheet.getRow(rowIndex).alignment = { vertical: 'top', horizontal: 'left', wrapText: true };
        }

        // get cells of the header
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000000' },
                bgColor: { argb: '000000' }
            };
            cell.font = { color: { argb: 'FFFFFF' } };
        });

        // Add filter to the header
        worksheet.autoFilter = {
            from: {
                row: 1,
                column: 1
            },
            to: {
                row: 1,
                column: options.columns.length
            }
        };

        // Save file
        workbook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            fs.saveAs(blob, options.fileName);
        })
    }
}
```

This code defines an Angular service called `ExcelService` that has a method called `exportToExcel()`. This method takes in two arguments: `gridOptions` and `options`.

The `gridOptions` argument is an object that contains the ag-grid component's options, and the `options` argument is an object that contains various options for configuring the Excel export.

The `exportToExcel()` method first retrieves the rows of data from the ag-grid component using the api.getModel().getRow() method. It then maps this data to a new array called data.

Next, the method creates a new workbook and worksheet using the ExcelJS library. It then sets the columns of the worksheet using the columns property of the options argument.

The method then iterates through the data array and adds each row of data to the worksheet. If the valueGetter property is set for a column, the valueGetter function is used to get the value for that column. Otherwise, the value is retrieved from the key property of the column.

The method then sets the alignment for all rows in the worksheet to top and left, and sets the wrapText property to true. It also sets the header row's fill and font colors to black and white, respectively.

Finally, the method adds a filter to the header row and saves the file using the fs.saveAs() method.

5. To use this service in your component, pass the `gridOptions` and the option object like this:

```js
 constructor(private excelService: ExcelService) {}

 exportExcel() {
    this.excelService.exportToExcel(this.gridOptions, {
      fileName: 'exported_data.xlsx',
      sheetName: 'My Data',
      columns: [
        {
          header: 'Column 1',
          key: 'col1', // field name here
          width: 50 // width of the column
        },
        {
          header: 'Column 2',
          key: 'col2',
          width: 50
        },
        {
          header: 'Column 3',
          key: 'col2',
          width: 50,
          valueGetter: (row:any) => {
            // you can use custom valueGetter
            // use it when you want to modify the row
            // for this example, the row is an array of objects
            let products = row.products
            let products_str = ''
            products.forEach((product, index) => {
              products_str += product.name
              if (index != products.length - 1) {
                products_str += '\n'
              }
            })
            return products_str
          }
        }
      ]
    });
  }
```

I hope this helps! Let me know if you have any questions.

import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";




 export  const exportExcel = (data) => {


  // function Convert() {
    // var table = document.querySelector("table");
    var header = [];
    var rows = [];
    for (var i = 0; i < data?.rows[0].cells.length; i++) {
        header.push(data?.rows[0].cells[i].innerText);
    }
    for (var i = 1; i < data.rows.length; i++) {
        var row = {};
        for (var j = 0; j < data.rows[i].cells.length; j++) {
            row[header[j]] = data.rows[i].cells[j].innerText;
        }
        rows.push(row);
    }
    // alert(JSON.stringify(rows));
    // console.log(rows);
// }



  // console.log("data is",data)
    handleExport(rows).then((url) => {
      // console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "excel.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = (data) => {
    // const flattenObj = (ob) => {
    //   // The object which contains the
    //   // final result
    //   let result = {};
    //   // loop through the object "ob"
    //   for (const i in ob) {
    //     // We check the type of the i using
    //     // typeof() function and recursively
    //     // call the function again
    //     if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
    //       // console.log(ob[i])
    //       if(ob[i]?.day){
    //             result[i]=ob[i]?.day+"/"+ob[i]?.month+"/"+ob[i]?.year
    //       }
    //       else{
    //         const temp = flattenObj(ob[i]);
    //         for (const j in temp) {
    //           result[persianName[i] ? persianName[i] : i] = temp[j];
    //           // result[persianName[i]] = temp[j];
    //         }
    //       }
         
    //     }
    //     // Else store ob[i] in result directly
    //     else {
    //       // @ts-ignore
    //       // result[i] = ob[i];
    //       result[persianName[i] ? persianName[i] : i] = ob[i];
    //     }
    //   }
    //   return result;
    // };
    // const flatobj = [];
    // convert null and undefind to empty string

    
    data.map((obj) => {
      delete obj?.operation;
      delete obj?.isDeleted;
      Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined ? (obj[key] = "-") : obj[key]));
    });


    // console.log(data,"daata after convert is");
    //flat object
    // data.map((item) => {
    //   flatobj.push(flattenObj(item));
    // });
    /////////////////////////////////////////////////////////////////////////////////////////
    let headers = Object.keys(Object.assign({}, ...data));
    const obj3 = {};
    let code = 64;
    headers.forEach((element, index) => {
      const f = String.fromCharCode((code += 1));
      obj3[f] = element;
    });
    let headersAlphabetic = [obj3];
    let range = Object.keys(Object.assign({}, ...headersAlphabetic));
    /////////////////////////////////////////////////////////////////////////////////////////
    const title = [{ A: "" }, {}];
    let table1 = [obj3];
    const output = [];

    for (const o of data) {
      const updated = {};
      let code = 64;
      for (const key in o) {
        const f = String.fromCharCode((code += 1));
        updated[f] = o[key];
      }

      table1.push(updated);
    }

    // console.log(table1);
    table1 = [].concat(table1).concat([""]);
    // .concat([{ A: "Marks" }])
    // .concat(table2);

    const finalData = [...title, ...table1];

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "excel");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);
       
    var headerIndexes = [2];
    // finalData.forEach((data, index) => (data["A"] === "isActive" ? headerIndexes.push(index) : null));
    // console.log(headerIndexes, "range");
    const totalRecords = data.length;
    const dataInfo = {
      titleCell: "A2",
      titleRange: `A1:A1`,
      // titleRange: `A1:${range[range.length - 1]}2`,
      tbodyRange: `A${headerIndexes[0] + 2}:${range[range.length - 1]}${finalData.length}`,
      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:${range[range.length - 1]}${headerIndexes[0] + 1}`
          : null,
      // theadRange1: headerIndexes?.length >= 2 ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}` : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1 ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}` : null,
      tLastColumnRange:
        headerIndexes?.length >= 1 ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}` : null,
    };
    
     console.log(table1,"table1");
    return addStyle(workbookBlob, dataInfo, range);
  };

  const addStyle = (workbookBlob, dataInfo, range) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

        // fit width of cell
        for (let sheetItem of range) {
          sheet.range(`${sheetItem}1:${sheetItem}20`).reduce((max, cell) => {
            const value = cell.value();
            if (value === undefined) {
              return max;
            } else {
              // console.log(Math.max(max, value.toString().length),sheetItem)
              sheet.column(`${sheetItem}`).width(Math.max(max, value.toString().length) + 2);
              return Math.max(max, value.toString().length);
            }
          }, 0);
        }

        sheet.rightToLeft(true);
        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
            border: true,
            borderColor: "484646",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          fill: "ffeae9",
          bold: true,
          horizontalAlignment: "center",
          border: true,
          borderColor: "484646",
        });

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "808080",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tFirstColumnRange1) {
          sheet.range(dataInfo.tFirstColumnRange1).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange1) {
          sheet.range(dataInfo.tLastColumnRange1).style({
            bold: true,
          });
        }
      });

      return workbook.outputAsync().then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

//   return (
//     <SimpleButton
//       handelClick={() => createDownLoadData()}
//       text="خروجی اکسل"
//       icon={<GoDesktopDownload color="black" />}
//       className="centering rounded-lg text-black w-full"
//     />
//   );
// };

// export default ExcelExport;

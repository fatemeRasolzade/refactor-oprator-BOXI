import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";
const data =[
  {      "id": 1,
      "isActive": true,
      "isDeleted": false,
      "code": "43534",
      "name": "سرویس اول",
      "type": {
          "id": 1,
          "text": "تکمیلی"
      },
      "description": null,
      "minimumOrderQuantity": 3,
    
      "product": {
          "id": 1,
          "text": "محصول اول"
      },
      "priceList": {
          "id": 1,
          "text": "عنوان نرخ نامه"
      },

  },
  {
    "id": 61,
      "isActive": true,
      "isDeleted": false,
      "code": "1075",
      "name": "عنوان 1 ",
      "type": {
          "id": 0,
          "text": "پایه"
      },
      "description": "شرح ندارد ",
      "minimumOrderQuantity": 10,

      "product": {
          "id": 83,
          "text": "aaa"
      },
      "priceList": {
          "id": 61,
          "text": "نرخ نامه پست عادی"
      },
  
  },
  {  "id": 2,
      "isActive": true,
      "isDeleted": false,
      "code": "656",
      "name": "سرویس دوم",
      "type": {
          "id": 1,
          "text": "تکمیلی"
      },
      "description": null,
      "minimumOrderQuantity": 4,

      "product": {
          "id": 1,
          "text": "محصول اول"
      },
      "priceList": {
          "id": 2,
          "text": "نرخ نامه دوم"
      },
    
  },
  {   "id": 41,
      "isActive": true,
      "isDeleted": false,
      "code": "1005",
      "name": "سرویس پست عادی",
      "type": {
          "id": 0,
          "text": "پایه"
      },
      "description": null,
      "minimumOrderQuantity": 2,

      "product": {
          "id": 21,
          "text": "پست عادی"
      },
      "priceList": {
          "id": 61,
          "text": "نرخ نامه پست عادی"
      },
   
  },
  { "id": 42,
      "isActive": true,
      "isDeleted": false,
      "code": "1006",
      "name": "سرویس پست ویژه شهری",
      "type": {
          "id": 0,
          "text": "پایه"
      },
      "description": null,
      "minimumOrderQuantity": null,

      "product": {
          "id": 101,
          "text": "پست ویژه شهری"
      },
      "priceList": {
          "id": 63,
          "text": "پست ویژه شهری"
      },
     
  }
]

//   {
//     STUDENT_DETAILS: {
//       id: 101,
//       name: "Suman Kumar",
//       parentName: "Suresh Kumar",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 75,
//       physics: 65,
//       chemistry: 72,
//       english: 62,
//       computerScience: 80,
//     },
//   },
//   {
//     STUDENT_DETAILS: {
//       id: 102,
//       name: "Rahul Kumar",
//       parentName: "Aatma Ram",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 70,
//       physics: 75,
//       chemistry: 82,
//       english: 72,
//       computerScience: 60,
//     },
//   },
//   {
//     STUDENT_DETAILS: {
//       id: 103,
//       name: "Anuj Kumar",
//       parentName: "Ashok Kumar",
//       classroom: "12th",
//       subject: "Non Medical",
//       division: "1st",
//       status: "Pass",
//     },
//     MARKS: {
//       maths: 60,
//       physics: 65,
//       chemistry: 92,
//       english: 77,
//       computerScience: 80,
//     },
//   },
// ];
const ExcelExportHelper = () => {



  const flattenObj = (ob) => {
    // The object which contains the
    // final result
    let result = {};
    // loop through the object "ob"
    for (const i in ob) {
        // We check the type of the i using
        // typeof() function and recursively
        // call the function again
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {
                // Store temp in result
                // @ts-ignore
                result[i] = temp[j];
                // result[persianName[i]] = temp[j];
            }
        }
        // Else store ob[i] in result directly
        else {
            // @ts-ignore
            result[i] = ob[i];
            // result[persianName[i]?persianName[i]:i] = ob[i];
        }
    }
    return result;
};
const flatobj=[]
data.map((item)=>{
  flatobj.push(flattenObj(item))
})
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
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

  // let persianHeaders=headers.map((item)=>
  //     persianName[item]?persianName[item]:item
  // )

  const handleExport = () => {
    let headers = Object.keys(Object.assign({}, ...flatobj));
    const obj3 = {};
    let code = 64;
    headers.forEach((element, index) => {
      const f = String.fromCharCode((code += 1));
      obj3[f] = element;
    });
   
      

      console.log("heaers is", obj3);
    const title = [{ A: "Students and Marks details" }, {}];

    let table1 =
    [obj3]
      // [
      //   {
      //     A: "id",
      //     B: "code",
      //     C: "name",
      //     D: "description",
      //     E: "isActive",
      //     F: "isDeleted",
      //     G: "productGroup",
      //     H: "attribute"
      // },
        // {
        //   A: "id",
        //   B: " Name",
        //   C: " Name",
        //   D: "Class",
        //   E: "Subject",
        //   F: "Division",
        //   G: "Result Status",
        // },
      // ];

    let table2 = [
      {
        A: "id",
        B: "Student Name",
        C: "Mathematics",
        D: "Physics",
        E: "Chemistry",
        F: "English",
        G: "Computer Science",
        H: "Total",
      },
    ];

    const output = [];


    for (const o of flatobj) {
      const updated = {};
      let code = 64;
      for (const key in o) {
        const f = String.fromCharCode((code += 1));
        updated[f] = o[key];
      }

      table1.push(updated);
    }

    // data.forEach((row) => {
    //   const studentDetails = row.STUDENT_DETAILS;
    //   const marksDetails = row.MARKS;

    //   table1.push({
    //     A: row?.id,
    //     B: row.name,
    //     C: row.code,
    //     D: row.productGroup.text,
    //     // E: row.subject,
    //     // F: row.division,
    //     // G: row.status,
    //   });
    // });
    console.log(table1);
    table1 = [{ A: "Student Details" }]
      .concat(table1)
      .concat([""])
      .concat([{ A: "Marks" }])
      .concat(table2);

    const finalData = [...title, ...table1];

    console.log(finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "student_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.

    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) => (data["A"] === "id" ? headerIndexes.push(index) : null));

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:H2",
      tbodyRange: `A3:H${finalData.length}`,
      theadRange: headerIndexes?.length >= 1 ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}` : null,
      theadRange1: headerIndexes?.length >= 2 ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}` : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1 ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}` : null,
      tLastColumnRange:
        headerIndexes?.length >= 1 ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}` : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1 ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}` : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1 ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}` : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      workbook.sheets().forEach((sheet) => {
        sheet.usedRange().style({
          fontFamily: "Arial",
          verticalAlignment: "center",
        });

  
        // const headers=[obj3]
        // Object.keys(Object.assign({},...headers))
      
        sheet.column("A").width(20);
        sheet.column("B").width(20);
        sheet.column("C").width(20);
        sheet.column("E").width(20);
        sheet.column("F").width(20);
        sheet.column("H").width(20);
        sheet.column("G").width(20);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          fill: "FFFD04",
          bold: true,
          horizontalAlignment: "center",
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

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-primary float-end"
    >
      Export
    </button>
  );
};

export default ExcelExportHelper;

import Excel from "exceljs";
import { saveAs } from "file-saver";

const workSheetName = "Worksheet-1";
// const ExportExcel = ({ data }) => {
export const ExportExcel = async (data, columns) => {

  data.map((obj) => {
    delete obj?.operation;
    // delete obj?.isDeleted;
    // Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined ? (obj[key] = "-") : obj[key]));
  });
// columns.map(item=>item.accessor==="operation" ? delete item : item)
//    console.log(data,"data",columns);
//  const flattenObj = (ob) => {
//       // The object which contains the
//       // final result
//       let result = {};
//       // loop through the object "ob"
//       for (const i in ob) {
//         // We check the type of the i using
//         // typeof() function and recursively
//         // call the function again
//         if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
//           // console.log(ob[i])
//           if(ob[i]?.day){
//                 result[i]=ob[i]?.day+"/"+ob[i]?.month+"/"+ob[i]?.year
//           }
//           else{
//             const temp = flattenObj(ob[i]);
//             for (const j in temp) {
//               result[persianName[i]] = temp[j];
//             }
//           }
         
//         }
//         // Else store ob[i] in result directly
//         else {
//           // @ts-ignore
//           result[i] = ob[i];
//         }
//       }
//       return result;
//     };
//     const flatobj = [];

  const workbook = new Excel.Workbook();
  try {
    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet(workSheetName);

    // add worksheet columns
    // each columns contains header and its mapping key from data
    worksheet.columns = columns;

    // updated the font for first row.
    worksheet.getRow(1).font = { bold: true };

    // loop through all of the columns and set the alignment with width.
    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 25;
      column.alignment = { horizontal: "center" };
    });

    // loop through data and add each one to worksheet
    data.forEach((singleData) => {
      worksheet.addRow(singleData);
    });

    // loop through all of the rows and set the outline style.
    worksheet.eachRow({ includeEmpty: false }, (row) => {
      // store each cell to currentCell
      const currentCell = row._cells;

      // loop through currentCell to apply border only for the non-empty cell of excel
      currentCell.forEach((singleCell) => {
        // store the cell address i.e. A1, A2, A3, B1, B2, B3, ...
        const cellAddress = singleCell._address;

        // apply border
        worksheet.getCell(cellAddress).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // write the content using writeBuffer
    const buf = await workbook.xlsx.writeBuffer();
    console.log(buf);
    // download the processed file
    saveAs(new Blob([buf]), `excel.xlsx`);
  } catch (error) {
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet(workSheetName);
  }
};

// return (
//   <SimpleButton
//     handelClick={saveExcel}
//     text="خروجی اکسل"
//     icon={<GoDesktopDownload color="black" />}
//     className="centering rounded-lg text-black w-full"
//   />
// );
// };
// export default ExportExcel;

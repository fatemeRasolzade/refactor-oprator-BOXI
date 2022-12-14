import Excel from "exceljs";
import { saveAs } from "file-saver";

const workSheetName = "Worksheet-1";
// const ExportExcel = ({ data }) => {
export const ExportExcel = async (values) => {
  console.log(values);
   values.data.map((obj) => {
    delete obj?.operation;
    // delete obj?.isDeleted;
    // Object.keys(obj).forEach((key) => (obj[key] === null || obj[key] === undefined ? (obj[key] = "-") : obj[key]));
  });
const filterColumn=values.columns.filter(item=>!item.accessor.includes("operation"))

    // console.log(data,filterColumn);

  const workbook = new Excel.Workbook();
  try {
    // creating one worksheet in workbook
    const worksheet = workbook.addWorksheet();

    // add worksheet columns
    // each columns contains header and its mapping key from data
    worksheet.columns = filterColumn;

    // updated the font for first row.
    worksheet.getRow(1).font = { bold: true };

    // loop through all of the filterColumn and set the alignment with width.
    worksheet.columns.forEach((column) => {
      column.width = column.header.length + 25;
      column.alignment = { horizontal: "center"};
    });

    // loop through data and add each one to worksheet
    values.data.forEach((singleData) => {
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
    saveAs(new Blob([buf]), `${values?.title?values?.title:workSheetName}.xlsx`);
  } catch (error) {
  } finally {
    // removing worksheet's instance to create new one
    workbook.removeWorksheet(workSheetName);
  }
};

// return (
//   <SimpleButton
//     handelClick={saveExcel}
//     text="?????????? ????????"
//     icon={<GoDesktopDownload color="black" />}
//     className="centering rounded-lg text-black w-full"
//   />
// );
// };
// export default ExportExcel;

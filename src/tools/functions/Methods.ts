import * as XLSX from "xlsx-js-style";

export const ExportExcel = ({ data }: any) => {
  let row = [
    { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
    {
      v: "bold & color",
      t: "s",
      s: { font: { bold: true, color: { rgb: "#a50202" } } },
    },
    { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "#a50202" } } } },
    { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
  ];
  XLSX.utils.aoa_to_sheet([row]);

  let web = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(web, ws, "myfile");
  XLSX.writeFile(web, "MyExcel.xlsx");
};

export const ReverseArray = (arr: []) => [...arr].reverse();

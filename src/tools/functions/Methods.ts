import * as XLSX from "xlsx-js-style";

export const ExportExcel = (data: any) => {
  // let row = [
  //   { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
  //   {
  //     v: "bold & color",
  //     t: "s",
  //     s: { font: { bold: true, color: { rgb: "#a50202" } } },
  //   },
  //   { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "#a50202" } } } },
  //   { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
  // ];
  // XLSX.utils.aoa_to_sheet([row]);

  let web = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(web, ws, "myfile");
  XLSX.writeFile(web, "MyExcel.xlsx");
};

export const ReverseArray = (arr: []) => [...arr].reverse();

interface getPelakProps {
  vehicleNumber0: string | number;
  vehicleNumber1: string | number;
  vehicleNumber2: string | number;
  vehicleNumber3: string | number;
}

export const getPelak = (values: any) =>
  values.vehicleNumber3 ? `${values.vehicleNumber3} - ${values.vehicleNumber2}  ${values.vehicleNumber1}  ${values.vehicleNumber0}` : "";

interface getDayProps {
  year: string | number;
  month: string | number;
  day: string | number;
}

export const getDay = (value: getDayProps) => {
  const date = value.year + "/" + value.month + "/" + value.day;
  return date;
};
export const convertToObjects = (from: any, to: any, type: any) => {
  let arr = [];
  for (let i = 0; i < from.length; i++) {
    for (let j = 0; j < to.length; j++) {
      arr.push({ fromCountryDevision: from[i], toCountryDevision: to[j] });
    }
  }
  return arr;
};
export const convertUsingProduct = (usingProduct: any, product: any) => {
  let arr = [];
  for (let x of usingProduct) {
    arr.push({
      parent: product,
      child: x,
    });
  }
  return arr;
};



export const SplitString=(value:string)=>{
  return  value.split(/([0-9]+)/)[0]
}
export const SplitNumber=(value:string)=>{
 return value.split(/([0-9]+)/)[1]
}


export const findNode = (tree:any, value:string) => {
	let result = null
        if (value === tree.value) {
            return tree
        } else {
   
            if(tree.children ){
              
                tree.children.some((node:any )=> result = findNode(node, value));
          
            }
            return result;
        }
}
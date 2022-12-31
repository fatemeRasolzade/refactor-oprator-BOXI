import * as XLSX from "xlsx-js-style";

export const ExportExcel = (data: any) => {


  const persianName: any = {
      code: "کد ",
      name: "نام ",
      search: "کد",
      hub: "نام هاب",
      hubTypeId: "نوع هاب",
      hubCategoryId: "گونه هاب",
      parentHubId: "هاب والد",
      bagNumber: "شماره کیسه",
      selectBagType: "نوع کیسه",
      sourceHub: "هاب مقصد",
      destinationHub: "هاب مبدا",
      hubCode: "کد هاب",
      hubName: "نام هاب",
      route: "مسیر",
      pelak: "پلاک",
      description: "توضیحات",
      productGroup: "گروه محصول",
      timeUnit: "واحد",
      vehicleNumber: "شماره پلاک",
      phone: "شماره موبایل",
      email: "پست الکترونیکی",
      username: "نام کاربری",
      nationalCode: "کد ملی",
      postalCode: "کد پستی",
      address: "آدرس",
      telNumber: "شماره تلفن",
      selectParentCustomer: "مشتری والد",
      zipCode: "کد پستی",
      parentClient: "مشتری والد",
      personelCode: "کد پرسنلی",
      priceListDate: "تاریخ نرخ نامه",
      product: "محصول",
      consignmentType: "نوع مرسوله",
      classification: "نوع رده",
      source: "مبدا",
      destination: "مقصد",
      type: "نوع",
      priceList: "نرخ نامه",
      selectThirdPartyCategory: "گروه شخصیت",
      customerSegments: "مشتری ها",
      saleschannels: "کانال فروش",
      serviceDeliveryCustomers: "گروه مشتری",
      service: "سرویس",
      fromCountryDevision: "مبدا",
      toCountryDevision: "مقصد",
      vehicleMakeSelect: "مدل",
      selectRoute: "نام مسیر",
      fuelTypeSelect:"نوع سوخت",
      consignmentCapacity:"ظرفیت مرسوله",
      volumeCapacity:'ظرفیت حجمی',
      weightCapacity:"ظرفیت وزنی",
      vendorSelect:"شرکت نقلیه",
  };



  const flattenObj = (ob:any) => {
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
 let newArr:any=[]
      data.map((item:any)=>{
            newArr.push(flattenObj(item))
         })

  let headers=[]
  headers=Object.keys(Object.assign({}, ...data))
  let persianHeaders=headers.map((item:any)=>
      persianName[item]?persianName[item]:item
  )

// let myRow=datas.map((item:any)=>
//   [
//       {
//           v: item.name, s: {
//               font: {name: "Courier", sz: 10, color: {rgb: "FF0000"}}, border: {
//                   bottom: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   left: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   right: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   top: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   }
//               },
//               alignment:{readingOrder:2}
//           }
//       },
//       {
//           v: item.productGroup.text, s: {
//               font: {name: "Courier", sz: 10, color: {rgb: "FF0000"}}, border: {
//                   bottom: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   left: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   right: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   },
//                   top: {
//                       color: {rgb: "#5c5c5c"}, style: "thin"
//                   }
//               },
//               alignment:{readingOrder:2}
//           }
//       }

//   ]
// )

// let myRow:any=[]

// datas.map((item)=>{
//   Object.entries(item).forEach(([k, v]) => {
//     myRow.push(  {
// 	  v: v, s: {
// 		font: {name: "Courier", sz: 10, color: {rgb: "FF0000"}},
// 		alignment:{readingOrder:2}
// 	  }
// 	},
//   )

//   })
// })




  //  console.log(myRow);
   

    //   let web = XLSX.utils.book_new();
    //   const ws = XLSX.utils.json_to_sheet(myRow);
    //    XLSX.utils.sheet_add_aoa(ws, [persianHeaders])
    //    var wscols = [
    //     {wch:20},
    //     {wch:20},
    // ];
    // ws['!cols'] = wscols;
    //    // const max_width = data.reduce((w:any, r:any) => Math.max(w, r.name.length), 10);
    //     // ws["!cols"] = [ { wch: 20} ];
    //   XLSX.utils.book_append_sheet(web, ws, "readme demo");
    //   XLSX.writeFile(web, "xlsx-js-style-demo.xlsx");

      let web = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(newArr);
      XLSX.utils.book_append_sheet(web, ws, "myfile");
      XLSX.writeFile(web, "MyExcel.xlsx");
};

export const ReverseArray = (arr: []) => [...arr].reverse();

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

export const DateCompare = (date1: any, date2: any) => {
  let errDate;
  let isValid = false;
  const date1Format = new Date(date1.year + "-" + date1.month + "-" + date1.day);
  const date2Format = new Date(date2.year + "-" + date2.month + "-" + date2.day);
  if (date1Format > date2Format) {
    errDate = "تاریخ شروع بزرگتر از تاریخ پایان است. ";
  } else {
    isValid = true;
  }
  return [isValid, errDate];
};

export const SplitString = (value: string) => {
  return value.split(/([0-9]+)/)[0];
};
export const SplitNumber = (value: string) => {
  return value.split(/([0-9]+)/)[1];
};

export const findNode = (tree: any, value: string) => {
  let result = null;
  if (value === tree.value) {
    return tree;
  } else {
    if (tree.children) {
      tree.children.some((node: any) => (result = findNode(node, value)));
    }
    return result;
  }
};

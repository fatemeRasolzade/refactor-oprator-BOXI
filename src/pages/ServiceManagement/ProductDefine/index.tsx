import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../components/staticTable/StaticTable";
import { apiRoute } from "../../../services/apiRoute";
import ActionForms from "./view/ActionsForm";
import { ProductColumns } from "./view/Column";
import DeleteOperation from "./view/DeleteOperation";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
// import * as XLSX  from "xlsx-js-style"

const ProductDefine = () => {
  // @ts-ignore
  const [isActive,setIsACtive]=useState(true)
  const { errorMessage, productLists,isUpdating } = useSelector(
    (state: any) => state.productDefine
  );
    const exportExcel=()=>{

        // let row = [
        //     { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
        //     { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "#a50202" } } } },
        //     { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "#a50202" } } } },
        //     { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
        // ];
        // XLSX.utils.aoa_to_sheet([row])
        //
        // let web=XLSX.utils.book_new(),
        //     ws=XLSX.utils.json_to_sheet(payload.content)
        //
        // XLSX.utils.book_append_sheet(web,ws,"myfile")
        // XLSX.writeFile(web,"MyExcel.xlsx")


    }

    // useEffect(() => {
  //   dispatch(
  //     productData({
  //       code: "",
  //       name: "",
  //       isActive: isActive,
  //     }) as any
  //   );
  // }, [isUpdating]);
    const data =
    productLists?.content?.length !== 0
      ? productLists?.content?.map((item: any) => {
          return {
           ...item,
           operation: (
            <div className="flex w-full gap-3 justify-center">
        
              <DeleteOperation
                itemId={item.id}
                title={"حذف محصول"}
                route={apiRoute().delete.productDefine + `/${item.id}`}
            
                // updating={updating}
              />
              <ActionForms itemValue={item} title="تغییر مدیریت نقش" />
            </div>
          ),
          };
        })
      : [];


  return (
    <div>

      <SearchForm  isActive={isActive}/>
      <OptionsTable
          setIsACtive={setIsACtive}
          isActive={isActive}
          addComponentProps={() => (
              <ActionForms  />
          )}
          exportExcel={exportExcel}
      />
      <StaticTable data={data?data:[]}  column={ProductColumns}  pagination={productLists?.totalElements}/>
    </div>
  );
};

export default ProductDefine;
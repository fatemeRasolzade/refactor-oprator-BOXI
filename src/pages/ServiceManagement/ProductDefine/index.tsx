import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../components/staticTable/StaticTable";
import { apiRoute } from "../../../services/apiRoute";
import ActionForms from "./view/ActionsForm";
import { ProductColumns } from "./view/Column";
import DeleteOperation from "./view/DeleteOperation";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";


const ProductDefine = () => {
  const dispatch = useDispatch();
  // @ts-ignore
  const [isActive,setIsACtive]=useState(true)
  const { errorMessage, productLists,isUpdating } = useSelector(
    (state: any) => state.productDefine
  );
  
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
                title={"حذف نقش"}
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
      <OptionsTable   setIsACtive={setIsACtive} isActive={isActive}/>
      <StaticTable data={data?data:[]}  column={ProductColumns}  pagination/>
    </div>
  );
};

export default ProductDefine;

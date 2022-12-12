import axios from "axios";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { productData, updating } from "../../../redux/ProductDefineData/ProductDefineData";
import { apiRoute } from "../../../services/apiRoute";
import { ExportExcel } from "../../../tools/functions/Methods";
import ActionForms from "./view/ActionsForm";
import { ProductColumns } from "./view/Column";

import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
// import {useGetOptions} from './view/serviceProvisionData'
import {useGetOptions} from '../../../global/hooks/useFetchOptions'
// import * as XLSX  from "xlsx-js-style"

const ProductDefine = () => {
  // @ts-ignore

  // axios.get('http://boxi.local:40000/product/select?filter=')
  const {options}=useGetOptions(apiRoute().get.GET_PRODUCT_GROUPS)

  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, productLists, isUpdating } = useSelector((state: any) => state.productDefine);
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);

  const handleDeleteActionNewData = () => {
    dispatch(
      productData({
        code: "",
        name: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const datas =
    productLists?.content?.length !== 0
      ? productLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف محصول"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  // handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.productDefine + `/${item.id}`}
                  updating={updating}
                />
                <ActionForms itemValue={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="تعریف محصول" />
      <SearchForm isActive={isActive} isUpdating={isUpdating}  productOptions={options} />
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <ActionForms />}
        exportExcel={() => ExportExcel(productLists?.content)}
      />
      <StaticTable data={datas ? datas : []} column={ProductColumns} pagination={productLists?.totalElements} selectable={false}  />
    </div>
  );
};

export default ProductDefine;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../components/tableOperation/DeleteOperation";
import { useFetchOptions } from "../../../global/hooks/useFetchOptions";
import { ServiceData } from "../../../redux/ServiceDefine/ServiceDefineReducer";
import { apiRoute } from "../../../services/apiRoute";
import { ExportExcel } from "../../../tools/functions/ExportMyExcel";


import ServiceDefineActionForms from "./view/ActionsForm";
import { ServiceDefineColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";

const ServiceDefinition: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, postLists, isUpdating } = useSelector((state: any) => state.serviceDefine);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { dataOptions: productOptions } = useFetchOptions(apiRoute().get.selectProducts);
  const { dataOptions: priceOptions } = useFetchOptions(apiRoute().get.selectPriceLists);

  const handleDeleteActionNewData = () => {
    dispatch(
      ServiceData({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    postLists?.content?.length !== 0
      ? postLists?.content?.map((item: any) => {
          return {
            ...item,
            product:item?.product?.text,
            priceList:item.priceList.text,
            isActive:item.isActive?"فعال":"غیرفعال",
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف سرویس"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.serviceDefine + `/${item.id}`}
                />
                <ServiceDefineActionForms
                  currentData={item}
                  productOptions={productOptions}
                  priceOptions={priceOptions}
                />
              </div>
            ),
          };
        })
      : [];

  // const table = document.querySelector("table");
  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="تعریف سرویس" />
      <SearchForm isActive={isActive} productOptions={productOptions} priceOptions={priceOptions} />
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => (
          <ServiceDefineActionForms productOptions={productOptions} priceOptions={priceOptions} />
        )}
        exportExcel={() => ExportExcel([])}
      />
      <StaticTable
        data={data ? data : []}
        column={ServiceDefineColumns}
        pagination={postLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default ServiceDefinition;
//vendorData

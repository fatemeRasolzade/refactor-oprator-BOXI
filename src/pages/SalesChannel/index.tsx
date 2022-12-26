import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { filterSalesChannel } from "../../redux/SaleChannel/SalesChannelReducer";
import { apiRoute } from "../../services/apiRoute";
import { ExportExcel } from "../../tools/functions/Methods";
import { SaleChannelColumn } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SaleChannelActionForm from "./view/SaleChannelActionForm";
import SearchForm from "./view/SearchForm";

const SaleChannel: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { sChannelLists } = useSelector((state: any) => state?.saleChannel);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleDeleteActionNewData = () => {
    dispatch(
      filterSalesChannel({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    sChannelLists?.content?.length !== 0
      ? sChannelLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف کانال فروش"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.salesChannel + `/${item.id}`}
                />
                <SaleChannelActionForm currentData={item} />
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="تعریف کانال فروش" />

      <SearchForm isActive={isActive} />
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <SaleChannelActionForm />}
        exportExcel={() => ExportExcel(sChannelLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={SaleChannelColumn}
        pagination={sChannelLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default SaleChannel;

//vendorData

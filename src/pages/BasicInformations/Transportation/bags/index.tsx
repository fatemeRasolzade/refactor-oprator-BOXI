import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { filterBags } from "../../../../redux/Transportation/bags/Bags";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel, getPelak } from "../../../../tools/functions/Methods";
import { VehicleColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import BagActionForms from "./view/BagActionForm";
import { useFetchOptions } from "../../../../global/hooks/useFetchOptions";
const Bags: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, bagsData, isUpdating } = useSelector((state: any) => state.bags);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { dataOptions:bagOptions } = useFetchOptions(apiRoute().get.selectBagTypes);
  const { dataOptions:vendorOptions } = useFetchOptions(apiRoute().get.selectVendor);
  const { dataOptions:hubOptions } = useFetchOptions(apiRoute().get.select_hub);
  
  const handleDeleteActionNewData = () => {
    dispatch(
      filterBags({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    bagsData?.content?.length !== 0
      ? bagsData?.content?.map((item: any) => {
          return {
            ...item,
            pelak: getPelak(item),
            hubname:item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف کیسه"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.bags + `/${item.id}`}
                />
                <BagActionForms currentData={item}  bagOptions={bagOptions}  vendorOptions={vendorOptions} hubOptions={hubOptions}/>
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} bagOptions={bagOptions}  vendorOptions={vendorOptions} hubOptions={hubOptions}/>
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <BagActionForms  bagOptions={bagOptions}  vendorOptions={vendorOptions} hubOptions={hubOptions}/>}
        exportExcel={() => ExportExcel(bagsData?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={VehicleColumns}
        pagination={bagsData?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Bags;


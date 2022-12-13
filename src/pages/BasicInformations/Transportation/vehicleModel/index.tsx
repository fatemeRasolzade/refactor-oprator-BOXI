import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { vehicleModel } from "../../../../redux/Transportation/vehicleModel/VehicleModel";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/Methods";

import { VendorColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import VehicleMakeActionForms from "./view/VehicleMakeActionForm";

const VehicleModel: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, vendorLists, isUpdating } = useSelector((state: any) => state.vendor);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleDeleteActionNewData = () => {
    dispatch(
      vehicleModel({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    vendorLists?.content?.length !== 0
      ? vendorLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مدل وسیله نقلیه"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.vendor + `/${item.id}`}
                />
                <VehicleMakeActionForms currentData={item} />
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} />
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <VehicleMakeActionForms />}
        exportExcel={() => ExportExcel(vendorLists?.content)}
      />
      {/* <StaticTable
        data={data ? data : []}
        column={VendorColumns}
        pagination={vendorLists?.totalElements}
        selectable={false}
      /> */}
    </div>
  );
};

export default VehicleModel;

//vendorData

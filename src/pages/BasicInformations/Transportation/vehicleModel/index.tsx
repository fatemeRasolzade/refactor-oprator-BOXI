import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { useGetFuelTypeOptions, useGetVendorOptions } from "../../../../global/hooks/useFetchOptions";
import { vehicleModel } from "../../../../redux/Transportation/vehicleModel/VehicleModel";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { VehicleModelColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import VehicleMakeActionForms from "./view/VehicleMakeActionForm";

const VehicleModel: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, vehicleModelLists, isUpdating } = useSelector((state: any) => state.vehicleModel);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes);
  const { vendorOptions } = useGetVendorOptions(apiRoute().get.selectVendor);
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
    vehicleModelLists?.content?.length !== 0
      ? vehicleModelLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مدل وسیله نقلیه"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.VehicleModel + `/${item.id}`}
                />
                <VehicleMakeActionForms currentData={item} fuelOptions={fuelOptions} vendorOptions={vendorOptions}/>
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} fuelOptions={fuelOptions} vendorOptions={vendorOptions}/>
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <VehicleMakeActionForms  fuelOptions={fuelOptions} vendorOptions={vendorOptions}/>}
        exportExcel={() => ExportExcel(vehicleModelLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={VehicleModelColumns}
        pagination={vehicleModelLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default VehicleModel;

//vendorData

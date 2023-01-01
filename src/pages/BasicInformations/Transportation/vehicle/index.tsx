import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { useGetFuelTypeOptions, useGetVendorOptions } from "../../../../global/hooks/useFetchOptions";
import { filterVehicleModel } from "../../../../redux/Transportation/VehicleData/VehicleData";
import { apiRoute } from "../../../../services/apiRoute";
import { exportExcel } from "../../../../tools/functions/ExcelExport";
import { ExportExcel, getPelak } from "../../../../tools/functions/Methods";
import { VehicleColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import VehicleActionForms from "./view/VehicleActionForm";
const Vehicle: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, vehicleData, isUpdating } = useSelector((state: any) => state.Vehicle);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleDeleteActionNewData = () => {
    dispatch(
      filterVehicleModel({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    vehicleData?.content?.length !== 0
      ? vehicleData?.content?.map((item: any) => {
          return {
            ...item,
            pelak: getPelak(item),
            hubname:item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف وسیله نقلیه"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.Vehicle + `/${item.id}`}
                />
                <VehicleActionForms currentData={item} />
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
        addComponentProps={() => <VehicleActionForms  />}
        exportExcel={() =>  exportExcel(data)}
        // exportExcel={() => ExportExcel(vehicleData?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={VehicleColumns}
        pagination={vehicleData?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Vehicle;


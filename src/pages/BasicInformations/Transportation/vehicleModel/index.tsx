import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddExcel from "../../../../components/exel/AddExcel";
import SwitchOptionTable from "../../../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { useGetFuelTypeOptions, useGetVendorOptions } from "../../../../global/hooks/useFetchOptions";
import { vehicleModel } from "../../../../redux/Transportation/vehicleModel/VehicleModel";
import { apiRoute } from "../../../../services/apiRoute";
import { vehicleModelExcel } from "../../../../tools/services/ExcelInfoFile";
import { VehicleModelColumns } from "./view/Column";

import SearchForm from "./view/SearchForm";
import VehicleMakeActionForms from "./view/VehicleMakeActionForm";

const VehicleModel: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const [currentData, setCurrentData] = useState();
  const [actionModal, setActionModal] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const { errorMessage, vehicleModelLists, filter } = useSelector((state: any) => state.vehicleModel);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes);
  const { vendorOptions } = useGetVendorOptions(apiRoute().get.selectVendor);

  const ToggleOptions = [
    { handleClick: () => setActionModal(true), name: "افزودن مدل وسیله نقلیه" },
    { handleClick: () => setUploadExcel(!uploadExcel), name: "افزودن گروهی اکسل" },
  ];
  const refreshTable = () => {
    dispatch(
      vehicleModel({
        ...filter,
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
                  handleDeleteActionNewData={refreshTable}
                  route={apiRoute().delete.VehicleModel + `/${item.id}`}
                />
                <button
                  className=" border-none	 text-[14px]  w-[20px] h-[20px] "
                  onClick={() => {
                    setCurrentData(item);
                    setActionModal(!actionModal);
                  }}
                >
                  <AiOutlineEdit className="w-full h-full" />
                </button>
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} fuelOptions={fuelOptions} vendorOptions={vendorOptions} />
      <SwitchOptionTable
        accessPage={[
          { code: "A2", value: { ToggleOptions } },
          { code: "A3", value: { data: isActive, action: () => setIsACtive(!isActive) } },
          { code: "A1", value: { data: data, columns: VehicleModelColumns, title: "vehicleModel" } },
        ]}
      />

      <StaticTable
        data={data ? data : []}
        column={VehicleModelColumns}
        pagination={vehicleModelLists?.totalElements}
        selectable={false}
      />

      <VehicleMakeActionForms
        open={actionModal}
        setOpen={setActionModal}
        currentData={currentData}
        fuelOptions={fuelOptions}
        vendorOptions={vendorOptions}
      />
      <AddExcel
        excelInfo={vehicleModelExcel}
        OpenModal={uploadExcel}
        setUpdate={refreshTable}
        setOpenModal={setUploadExcel}
      />
    </div>
  );
};

export default VehicleModel;

//vendorData

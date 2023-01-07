import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddExcel from "../../../../components/exel/AddExcel";
import SwitchOptionTable from "../../../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";

import { filterVehicleModel } from "../../../../redux/Transportation/VehicleData/VehicleData";
import { apiRoute } from "../../../../services/apiRoute";
import { getPelak } from "../../../../tools/functions/Methods";
import { vehicleExcel } from "../../../../tools/services/ExcelInfoFile";
import { VehicleColumns } from "./view/Column";

import SearchForm from "./view/SearchForm";
import VehicleActionForms from "./view/VehicleActionForm";
const Vehicle: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);

  const dispatch = useDispatch();
  const { errorMessage, vehicleData, isUpdating } = useSelector((state: any) => state.Vehicle);
  const [currentData, setCurrentData] = useState();
  const [actionModal, setActionModal] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const ToggleOptions = [
    { handleClick: () => setActionModal(true), name: "افزودن وسیله نقلیه" },
    { handleClick: () => setUploadExcel(!uploadExcel), name: "افزودن گروهی اکسل" },
  ];
  const refreshTable = () => {
    dispatch(
      filterVehicleModel({
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
            hubname: item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف وسیله نقلیه"}
                  handleDeleteActionNewData={refreshTable}
                  route={apiRoute().delete.Vehicle + `/${item.id}`}
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
      <SearchForm isActive={isActive} />
      <SwitchOptionTable
        accessPage={[
          { code: "A2", value: { ToggleOptions } },
          { code: "A3", value: { data: isActive, action: () => setIsACtive(!isActive) } },
          { code: "A1", value: { data: data, columns: VehicleColumns, title: "vehicle" } },
        ]}
      />
      <StaticTable
        data={data ? data : []}
        column={VehicleColumns}
        pagination={vehicleData?.totalElements}
        selectable={false}
      />

      <VehicleActionForms open={actionModal} setOpen={setActionModal} currentData={currentData} />
      <AddExcel
        excelInfo={vehicleExcel}
        OpenModal={uploadExcel}
        setUpdate={refreshTable}
        setOpenModal={setUploadExcel}
      />
    </div>
  );
};

export default Vehicle;

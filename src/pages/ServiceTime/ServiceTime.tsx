import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcel, getDay, getPelak } from "../../tools/functions/Methods";
import { DELETE_ADMVEHICLE } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import { ACTIVE_OPTION, DOWNLOAD_OPTION } from "../../global/CustomOptions/CustomOptionsKeyword";
import { ServiceTimeColumn } from "./views/ServiceTimeColumn";
import { ADMVehicleData, updating } from "../../redux/ADMVehicle/ADMVehicleData";
import ADMVehicleSearchForm from "./views/ServiceTimeSearchForm";
import ADMVehicleForm from "./views/ServiceTimeForm/ServiceTimeForm";

const ServiceTime = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const handleGetExcel = () => ExportExcel(ADMVehicleList?.content);

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const { ADMVehicleList, isUpdating } = useSelector((state: any) => state.ADMVehicle);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      ADMVehicleData({
        hubCode: "",
        hubName: "",
        vehicleNumber0: "",
        vehicleNumber1: "",
        vehicleNumber2: "",
        vehicleNumber3: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    ADMVehicleList?.content?.length !== 0
      ? ADMVehicleList?.content?.map((item: any) => {
          return {
            ...item,
            pelak: getPelak(item),
            timeWork: `(${getDay(item.dayToStartWork)} - ${item.timeToStartWork}) (${getDay(item.dayToFinishWork)} - ${item.timeToFinishWork})`,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مدت ارائه خدمات"}
                  route={DELETE_ADMVEHICLE + `/${item.id}`}
                  updating={updating}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                />
                <ADMVehicleForm currentData={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="مدت ارائه خدمات" />
      <ADMVehicleSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <div className="flex-start-center gap-20 mt-6">
        <ADMVehicleForm />
        <TestCustomOptions options={options} />
      </div>
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ServiceTimeColumn}
        pagination={ADMVehicleList?.totalElements}
        loading={Loading}
      />
    </>
  );
};

export default ServiceTime;

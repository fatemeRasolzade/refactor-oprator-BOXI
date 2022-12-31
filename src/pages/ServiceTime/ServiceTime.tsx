import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcel } from "../../tools/functions/Methods";
import { DELETE_SERVICETIME, GET_TIMEUNITTIPES } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import { ACTIVE_OPTION, DOWNLOAD_OPTION } from "../../global/CustomOptions/CustomOptionsKeyword";
import { ServiceTimeColumn } from "./views/ServiceTimeColumn";
import { serviceTimeData, updating } from "../../redux/ServiceTimeData/ServiceTimeData";
import ServiceTimeSearchForm from "./views/ServiceTimeSearchForm";
import ServiceTimeForm from "./views/ServiceTimeForm/ServiceTimeForm";
import { getDataFromServer } from "../../services/Service_call";

const ServiceTime = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [TimeUnitType, setTimeUnitType] = useState([]);

  useEffect(() => {
    getDataFromServer(GET_TIMEUNITTIPES).then((res) => setTimeUnitType(res));
  }, []);

  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleGetExcel = () => ExportExcel(serviceTimeList?.content);

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const { serviceTimeList, isUpdating } = useSelector((state: any) => state.serviceTime);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      serviceTimeData({
        name: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    serviceTimeList?.content?.length !== 0
      ? serviceTimeList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مدت ارائه خدمات"}
                  route={DELETE_SERVICETIME + `/${item.id}`}
                  updating={updating}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                />
                <ServiceTimeForm currentData={item} TimeUnitType={TimeUnitType} />
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="مدت ارائه خدمات" />
      <ServiceTimeSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} TimeUnitType={TimeUnitType} />
      <div className="flex-start-center gap-20 mt-6">
        <ServiceTimeForm TimeUnitType={TimeUnitType} />
        <TestCustomOptions options={options} />
      </div>
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ServiceTimeColumn}
        pagination={serviceTimeList?.totalElements}
        loading={Loading}
      />
    </>
  );
};

export default ServiceTime;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_SERVICETIME, GET_TIMEUNITTIPES } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { ServiceTimeColumn } from "./views/ServiceTimeColumn";
import { serviceTimeData, updating } from "../../redux/ServiceTimeData/ServiceTimeData";
import ServiceTimeSearchForm from "./views/ServiceTimeSearchForm";
import ServiceTimeForm from "./views/ServiceTimeForm/ServiceTimeForm";
import { getDataFromServer } from "../../services/Service_call";
import { AiOutlineEdit } from "react-icons/ai";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";

const ServiceTime = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const [TimeUnitType, setTimeUnitType] = useState([]);

  useEffect(() => {
    getDataFromServer(GET_TIMEUNITTIPES).then((res) => setTimeUnitType(res));
  }, []);

  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);

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
                <button className=" border-none	text-[14px]  w-[20px] h-[20px] " onClick={() => handleOpenModal(item)}>
                  <AiOutlineEdit className="w-[20px] h-[20px]" size={15} />
                </button>
              </div>
            ),
          };
        })
      : [];

  const [ServiceTimeModal, setServiceTimeModal] = useState({
    isOpen: false,
    data: undefined,
  });

  const handleOpenModal = (data = undefined) => setServiceTimeModal({ isOpen: true, data });
  const handleCloseModal = (falsy: boolean) => setServiceTimeModal({ isOpen: falsy, data: undefined });

  const [OpenExcel, setOpenExcel] = useState(false);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: () => handleOpenModal(undefined), name: "افزودن مدت ارائه خدمات" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const Options = [
    {
      code: "A2",
      value: { ToggleOptions: ToggleOptions },
    },
    { code: "A3", value: { action: setIsActive, data: isActive } },
    { code: "A1", value: serviceTimeList?.content },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="مدت ارائه خدمات" />
      <ServiceTimeSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} TimeUnitType={TimeUnitType} />
      <SwitchOptionTable accessPage={Options} />
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ServiceTimeColumn}
        pagination={serviceTimeList?.totalElements}
        loading={Loading}
      />
      <ServiceTimeForm open={ServiceTimeModal.isOpen} setOpen={handleCloseModal} currentData={ServiceTimeModal.data} TimeUnitType={TimeUnitType} />
      {/* <AddExcel excelInfo={ADMVehicleExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
    </>
  );
};

export default ServiceTime;

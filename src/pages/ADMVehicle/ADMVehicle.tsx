import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDay, getPelak } from "../../tools/functions/Methods";
import { DELETE_ADMVEHICLE } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { ADMVehicleColumn } from "./views/ADMVehicleColumn";
import { ADMVehicleData, updating } from "../../redux/ADMVehicle/ADMVehicleData";
import ADMVehicleSearchForm from "./views/ADMVehicleSearchForm";
import ADMVehicleForm from "./views/ADMVehicleForm/ADMVehicleForm";
import { AiOutlineEdit } from "react-icons/ai";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";

const ADMVehicle = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);
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
                  title={"حذف وسیله نقلیه اجاره ای"}
                  route={DELETE_ADMVEHICLE + `/${item.id}`}
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

  const [ADMVehicleModal, setADMVehicleModal] = useState({
    isOpen: false,
    data: undefined,
  });

  const handleOpenModal = (data = undefined) => setADMVehicleModal({ isOpen: true, data });
  const handleCloseModal = (falsy: boolean) => setADMVehicleModal({ isOpen: falsy, data: undefined });

  const [OpenExcel, setOpenExcel] = useState(false);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: () => handleOpenModal(undefined), name: "افزودن وسیله نقلیه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const Options = [
    {
      code: "A2",
      value: { ToggleOptions: ToggleOptions },
    },
    { code: "A3", value: { action: setIsActive, data: isActive } },
    { code: "A1", value: ADMVehicleList?.content },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="وسایل نقلیه اجاره ای" />
      <ADMVehicleSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <SwitchOptionTable accessPage={Options} />
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ADMVehicleColumn}
        pagination={ADMVehicleList?.totalElements}
        loading={Loading}
      />
      <ADMVehicleForm open={ADMVehicleModal.isOpen} setOpen={handleCloseModal} currentData={ADMVehicleModal.data} />
      {/* <AddExcel excelInfo={ADMVehicleExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
    </>
  );
};

export default ADMVehicle;

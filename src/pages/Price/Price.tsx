import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcel } from "../../tools/functions/Methods";
import { PRICE_API } from "../../services/apiRoute";
import StaticTable from "../../components/staticTable/StaticTable";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { ACTIVE_OPTION, DOWNLOAD_OPTION } from "../../global/CustomOptions/CustomOptionsKeyword";
import { priceData, updating } from "../../redux/PriceData/PriceData";
import PriceForm from "./views/ServiceTimeForm/PriceForm";
import PriceSearchForm from "./views/PriceSearchForm";
import { PriceColumn } from "./views/PriceColumn";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import { AiOutlineEdit } from "react-icons/ai";

const Price = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const { priceList, isUpdating } = useSelector((state: any) => state.price);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      priceData({
        name: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    priceList?.content?.length !== 0
      ? priceList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف نرخ نامه"}
                  route={PRICE_API + `/${item.id}`}
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

  const [PriceModal, setPriceModal] = useState({
    isOpen: false,
    data: undefined,
  });

  const handleOpenModal = (data = undefined) => setPriceModal({ isOpen: true, data });
  const handleCloseModal = (falsy: boolean) => setPriceModal({ isOpen: falsy, data: undefined });

  const [OpenExcel, setOpenExcel] = useState(false);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: () => handleOpenModal(undefined), name: "افزودن نرخ نامه" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const Options = [
    {
      code: "A2",
      value: { ToggleOptions: ToggleOptions },
    },
    { code: "A3", value: { action: setIsActive, data: isActive } },
    { code: "A1", value: priceList?.content },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="نرخ نامه" />
      <PriceSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <SwitchOptionTable accessPage={Options} />
      <StaticTable selectable={false} data={data ? data : []} column={PriceColumn} pagination={priceList?.totalElements} loading={Loading} />
      <PriceForm open={PriceModal.isOpen} setOpen={handleCloseModal} currentData={PriceModal.data} />
      {/* <AddExcel excelInfo={ADMVehicleExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
    </>
  );
};

export default Price;

import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_THIRDPARTY } from "../../services/apiRoute";
import { ThirdPartyColumn } from "./views/ThirdPartyColumn";
import StaticTable from "../../components/staticTable/StaticTable";
import ThirdPartySearchForm from "./views/ThirdPartySearchForm";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ThirdPartyForm from "./views/ThirdPartyForm/ThirdPartyForm";
import { thirdPartyData, updating } from "../../redux/ThirdParty/ThirdPartyData";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import AddExcel from "../../components/exel/AddExcel";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import { ThirdPartyExcel } from "../../tools/services/ExcelInfoFile";

const Thirdparty = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const { thirdPartyList, isUpdating } = useSelector((state: any) => state.thirdParty);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      thirdPartyData({
        username: "",
        postalCode: "",
        address: "",
        name: "",
        code: "",
        telNumber: "",
        isActive: isActive,
        selectThirdPartyCategory: null,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    thirdPartyList?.content?.length !== 0
      ? thirdPartyList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف شخصیت"}
                  route={DELETE_THIRDPARTY + `/${item.id}`}
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

  const [ThirdPartyModal, setThirdPartyModal] = useState({
    isOpen: false,
    data: undefined,
  });

  const handleOpenModal = (data = undefined) => setThirdPartyModal({ isOpen: true, data });
  const handleCloseModal = (falsy: boolean) => setThirdPartyModal({ isOpen: falsy, data: undefined });

  const [OpenExcel, setOpenExcel] = useState(false);
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions: any = [
    { handleClick: () => handleOpenModal(undefined), name: "افزودن شخصیت" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const Options = [
    {
      code: "A2",
      value: { ToggleOptions: ToggleOptions },
    },
    { code: "A3", value: { action: setIsActive, data: isActive } },
    { code: "A1", value: thirdPartyList?.content },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="اشخاص حقیقی/حقوقی" />
      <ThirdPartySearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <SwitchOptionTable accessPage={Options} />
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ThirdPartyColumn}
        pagination={thirdPartyList?.totalElements}
        loading={Loading}
      />
      <ThirdPartyForm open={ThirdPartyModal.isOpen} setOpen={handleCloseModal} currentData={ThirdPartyModal.data} />
      <AddExcel excelInfo={ThirdPartyExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} />
    </>
  );
};

export default Thirdparty;

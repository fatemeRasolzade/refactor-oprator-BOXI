import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExportExcel } from "../../tools/functions/Methods";
import { DELETE_THIRDPARTY } from "../../services/apiRoute";
import { ThirdPartyColumn } from "./views/ThirdPartyColumn";
import StaticTable from "../../components/staticTable/StaticTable";
import ThirdPartySearchForm from "./views/ThirdPartySearchForm";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import ThirdPartyForm from "./views/ThirdPartyForm/ThirdPartyForm";
import { thirdPartyData, updating } from "../../redux/ThirdParty/ThirdPartyData";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import { ACTIVE_OPTION, DOWNLOAD_OPTION } from "../../global/CustomOptions/CustomOptionsKeyword";
import { AiOutlineEdit } from "react-icons/ai";
import AddExcel from "../../components/exel/AddExcel";
import AddButton from "../../global/addButton/AddButton";

const Thirdparty = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleGetExcel = () => ExportExcel(thirdPartyList?.content);

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

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

  const [OpenExcel, setOpenExcel] = useState(false);

  const handleOpenModal = (data = undefined) => setThirdPartyModal({ isOpen: true, data });
  const handleUploadFileAction = () => setOpenExcel(true);

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن شخصیت" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="اشخاص حقیقی/حقوقی" />
      <ThirdPartySearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <div className="flex-start-center gap-20 mt-6">
        {/* <AddButton ToggleOptions={ToggleOptions} /> */}
        <TestCustomOptions options={options} />
      </div>
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={ThirdPartyColumn}
        pagination={thirdPartyList?.totalElements}
        loading={Loading}
      />
      {/* <ThirdPartyForm /> */}
      {/* <AddExcel excelInfo={ThirdPartyExcel} OpenModal={OpenExcel} setOpenModal={setOpenExcel} /> */}
    </>
  );
};

export default Thirdparty;

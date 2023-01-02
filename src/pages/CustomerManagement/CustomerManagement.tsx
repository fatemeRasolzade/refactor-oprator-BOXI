import { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import { customerData, updating } from "../../redux/CustomerManagement/CustomerManagementData";
import { DELETE_CUSTOMER } from "../../services/apiRoute";
import { CustomerColumns } from "./views/CustomerColumn";
import CustomerForm from "./views/CustomerForm/CustomerForm";
import CustomerSearchForm from "./views/CustomerSearchForm";

const CustomerManagement = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const { customerList, isUpdating } = useSelector((state: any) => state.customer);

  const handleDeleteActionNewData = () => {
    setLoading(true);
    dispatch(
      customerData({
        username: "",
        postalCode: "",
        address: "",
        name: "",
        code: "",
        telNumber: "",
        isActive: isActive,
        selectParentCustomer: null,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
    setLoading(false);
  };

  const data =
    customerList?.content?.length !== 0
      ? customerList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مشتری"}
                  route={DELETE_CUSTOMER + `/${item.id}`}
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
    { handleClick: () => handleOpenModal(undefined), name: "افزودن مشتری" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const Options = [
    {
      code: "A2",
      value: { ToggleOptions: ToggleOptions },
    },
    { code: "A3", value: { action: setIsActive, data: isActive } },
    { code: "A1", value: customerList?.content },
  ];

  return (
    <>
      <Breadcrumb beforePage="برگشت" curentPage="مدیریت مشتریان" />
      <CustomerSearchForm isActive={isActive} isUpdating={isUpdating} pageNumbers={pageNumbers} />
      <SwitchOptionTable accessPage={Options} />
      <StaticTable selectable={false} data={data ? data : []} column={CustomerColumns} pagination={customerList?.totalElements} loading={Loading} />
      <CustomerForm open={ServiceTimeModal.isOpen} setOpen={handleCloseModal} currentData={ServiceTimeModal.data} />
    </>
  );
};

export default CustomerManagement;

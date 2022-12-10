import { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";
import AddButton from "../../global/addButton/AddButton";
import {
  ACTIVE_OPTION,
  DOWNLOAD_OPTION,
} from "../../global/CustomOptions/CustomOptionsKeyword";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import { updating } from "../../redux/CustomerManagement/CustomerManagementData";
import { DELETE_CUSTOMER } from "../../services/apiRoute";
import { CustomerColumns } from "./views/CustomerColumn";
import CustomerForm from "./views/CustomerForm";

import CustomerSearchForm from "./views/CustomerSearchForm";

const CustomerManagement = () => {
  const [isActive, setIsActive] = useState(true);
  const [open, setOpen] = useState(false);
  const handleGetExcel = () => {
    alert("HELOOOOOOOOOOOOOOO");
  };

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const handleOpenModal = () => setOpen(true);
  const handleUploadFileAction = () => {
    alert("second");
  };

  const ToggleOptions = [
    { handleClick: handleOpenModal, name: "افزودن مشتری" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];

  const { errorMessage, customerList, isUpdating } = useSelector(
    (state: any) => state.customerDefine
  );

  const data =
    customerList?.content?.length !== 0
      ? customerList?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                Helllllllllllow
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مشتری"}
                  route={DELETE_CUSTOMER + `/${item.id}`}
                  updating={updating}
                />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="مدیریت مشتریان" />
      <CustomerSearchForm />
      <div className="flex-start-center gap-16 mt-6">
        <AddButton ToggleOptions={ToggleOptions} />
        <TestCustomOptions options={options} />
      </div>
      <StaticTable
        data={data ? data : []}
        column={CustomerColumns}
        pagination={customerList?.totalElements}
      />
      <CustomerForm open={open} setOpen={setOpen} />
    </div>
  );
};

export default CustomerManagement;

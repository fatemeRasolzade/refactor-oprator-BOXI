import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import DeleteOperation from "../../components/tableOperation/DeleteOperation";

import {
  ACTIVE_OPTION,
  DOWNLOAD_OPTION,
} from "../../global/CustomOptions/CustomOptionsKeyword";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";
import {
  customerData,
  updating,
} from "../../redux/CustomerManagement/CustomerManagementData";
import { DELETE_CUSTOMER } from "../../services/apiRoute";
import { ExportExcel } from "../../tools/functions/Methods";
import { CustomerColumns } from "./views/CustomerColumn";
import CustomerForm from "./views/CustomerForm";
import CustomerSearchForm from "./views/CustomerSearchForm";

const CustomerManagement = () => {
  const [isActive, setIsActive] = useState(true);
  const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const handleGetExcel = () => ExportExcel(customerList?.content);

  const options = [
    {
      name: ACTIVE_OPTION,
      handleClick: () => setIsActive(!isActive),
      value: isActive,
    },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const { customerList, isUpdating } = useSelector(
    (state: any) => state.customerDefine
  );

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
                <CustomerForm currentData={item} />
              </div>
            ),
          };
        })
      : [];

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="مدیریت مشتریان" />
      <CustomerSearchForm
        isActive={isActive}
        isUpdating={isUpdating}
        pageNumbers={pageNumbers}
      />
      <div className="flex-start-center gap-20 mt-6">
        <CustomerForm />
        <TestCustomOptions options={options} />
      </div>
      <StaticTable
        selectable={false}
        data={data ? data : []}
        column={CustomerColumns}
        pagination={customerList?.totalElements}
        loading={Loading}
      />
    </div>
  );
};

export default CustomerManagement;

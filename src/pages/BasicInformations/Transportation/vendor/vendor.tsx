import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AddExcel from "../../../../components/exel/AddExcel";
import SwitchOptionTable from "../../../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import { apiRoute } from "../../../../services/apiRoute";
import { VendorExcel } from "../../../../tools/services/ExcelInfoFile";
import { VendorColumns } from "./Column";
import SearchForm from "./SearchForm";
import VendorActionForms from "./VendorActionForm";

interface modalData {
  isOpen: boolean;
  isActive: boolean;
  data: object | undefined;
}
const Vendor: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { errorMessage, vendorLists, fetchPost, filter } = useSelector((state: any) => state.vendor);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const [currentData, setCurrentData] = useState();
  const [actionModal, setActionModal] = useState(false);
  const [uploadExcel, setUploadExcel] = useState(false);

  const ToggleOptions = [
    { handleClick: () => setActionModal(true), name: "افزودن شرکت نقلیه" },
    { handleClick: () => setUploadExcel(!uploadExcel), name: "افزودن گروهی اکسل" },
  ];

  const refreshTable = () => {
    dispatch(
      vendorData({
        ...filter,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };

  const data =
    vendorLists?.content?.length !== 0
      ? vendorLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف شرکت"}
                  handleDeleteActionNewData={refreshTable}
                  route={apiRoute().delete.vendor + `/${item.id}`}
                />

                <button
                  className=" border-none	 text-[14px]  w-[20px] h-[20px] "
                  onClick={() => {
                    setCurrentData(item);
                    setActionModal(!actionModal);
                  }}
                >
                  <AiOutlineEdit className="w-full h-full" />
                </button>
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} />

      <SwitchOptionTable
        accessPage={[
          { code: "A2", value: { ToggleOptions } },
          { code: "A3", value: { data: isActive, action: () => setIsACtive(!isActive) } },
          { code: "A1", value: { data: data, columns: VendorColumns, title: "vendor" } },
        ]}
      />
      <StaticTable
        loading={fetchPost}
        data={data ? data : []}
        column={VendorColumns}
        pagination={vendorLists?.totalElements}
        selectable={false}
      />

      <VendorActionForms open={actionModal} setOpen={setActionModal} currentData={currentData} />
      <AddExcel
        excelInfo={VendorExcel}
        OpenModal={uploadExcel}
        setUpdate={refreshTable}
        setOpenModal={setUploadExcel}
      />
    </div>
  );
};
export default Vendor;

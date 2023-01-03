import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddExcel from "../../../../components/exel/AddExcel";
import SwitchOptionTable from "../../../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/ExportMyExcel";
import { VendorExcel } from "../../../../tools/services/ExcelInfoFile";

import { VendorColumns } from "./Column";
import OptionsTable from "./OptionsTable";
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
  const { errorMessage, vendorLists, isUpdating ,filter} = useSelector((state: any) => state.vendor);
  const { pageNumbers } = useSelector((state: any) => state.paginate);


  const [actionModal, setActionModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });

  const ToggleOptions = [
    { handleClick: () =>setActionModal(true), name: "افزودن شرکت نقلیه" },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];
  const handleDeleteActionNewData = () => {
    dispatch(
      vendorData({
        search: "",
        isActive: isActive,
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
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.vendor + `/${item.id}`}
                />
                {/* <VendorActionForms currentData={item} /> */}
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
          { code: "A2", value: {ToggleOptions}},
          { code: "A3",value:{data:isActive,action:()=>setIsACtive(!isActive)} },

          { code: "A1", value: [] },
        ]}
      />

      {/* <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <VendorActionForms />}
        exportExcel={() => ExportExcel(data, VendorColumns, "vendor")}
        // exportExcel={() => ExportExcel(vendorLists?.content)}
      /> */}

      <StaticTable
        data={data ? data : []}
        column={VendorColumns}
        pagination={vendorLists?.totalElements}
        selectable={false}
      />

       <VendorActionForms  open={actionModal} setOpen={setActionModal}/>
      {/* <AddExcel  excelInfo={VendorExcel} OpenModal={uploadExcel}  setUpdate={setUpdate}/>  */}

    </div>
  );
};

export default Vendor;

//vendorData

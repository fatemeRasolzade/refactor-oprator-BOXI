import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { vendorData } from "../../../../redux/Transportation/vendor/VendorData";
import { apiRoute } from "../../../../services/apiRoute";
import { exportExcel } from "../../../../tools/functions/ExcelExport";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { VendorColumns } from "./Column";
import OptionsTable from "./OptionsTable";
import SearchForm from "./SearchForm";
import VendorActionForms from "./VendorActionForm";

const Vendor: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, vendorLists, isUpdating } = useSelector((state: any) => state.vendor);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
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
                <VendorActionForms currentData={item} />
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive} />
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <VendorActionForms />}
        exportExcel={() =>  exportExcel(data)}
        // exportExcel={() => ExportExcel(vendorLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={VendorColumns}
        pagination={vendorLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Vendor;

//vendorData

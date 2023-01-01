import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/Methods";

import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import { filterGate } from "../../../../redux/Transportation/gate/GateData";
import DockActionForms from "./view/DockActionForm";
import { DockColumns } from "./view/Column";
import { exportExcel } from "../../../../tools/functions/ExcelExport";
const Dock: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, dockLists, isUpdating } = useSelector((state: any) => state.dock);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const handleDeleteActionNewData = () => {
    dispatch(
      filterGate({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    dockLists?.content?.length !== 0
      ? dockLists?.content?.map((item: any) => {
          return {
            ...item,
            // pelak: getPelak(item),
            // hubname:item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف بارانداز"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.dock + `/${item.id}`}
                />
                <DockActionForms currentData={item} />
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
        addComponentProps={() => <DockActionForms />}
        exportExcel={() =>  exportExcel(data)}
      />
      <StaticTable
        data={data ? data : []}
        column={DockColumns}
        pagination={dockLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Dock;

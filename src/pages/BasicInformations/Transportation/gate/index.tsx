import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { filterBags } from "../../../../redux/Transportation/bags/Bags";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel, getPelak } from "../../../../tools/functions/Methods";
import { GateColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";

import GateActionForms from "./view/GateActionForm";
import { filterGate } from "../../../../redux/Transportation/gate/GateData";
import { exportExcel } from "../../../../tools/functions/ExcelExport";
const Gate: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, gateLists, isUpdating } = useSelector((state: any) => state.gate);
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
    gateLists?.content?.length !== 0
      ? gateLists?.content?.map((item: any) => {
          return {
            ...item,
            // pelak: getPelak(item),
            // hubname:item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف درب"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.gate + `/${item.id}`}
                />
                <GateActionForms currentData={item} />
              </div>
            ),
          };
        })
      : [];
  return (
    <div>
      <SearchForm isActive={isActive}/>
      <OptionsTable
        setIsActive={setIsACtive}
        isActive={isActive}
        addComponentProps={() => <GateActionForms />}
        exportExcel={() =>  exportExcel(data)}
      />
      <StaticTable
        data={data ? data : []}
        column={GateColumns}
        pagination={gateLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Gate;


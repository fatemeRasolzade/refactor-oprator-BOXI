import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/Methods";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import { filterGate } from "../../../../redux/Transportation/gate/GateData";

import { ExceptionColumns } from "./view/Column";
import ExceptionActionForm from "./view/ExceptionActionForm";
import { filterException } from "../../../../redux/Transportation/exception/ExceptionData";
const Exceptions: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, exceptionLists, isUpdating } = useSelector((state: any) => state.exception);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const handleDeleteActionNewData = () => {
    dispatch(
      filterException({
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    exceptionLists?.content?.length !== 0
      ? exceptionLists?.content?.map((item: any) => {
          return {
            ...item,
            // pelak: getPelak(item),
            // hubname:item?.selectHub?.text,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف استثناء"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.exception + `/${item.id}`}
                />
                <ExceptionActionForm currentData={item} />
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
        addComponentProps={() => <ExceptionActionForm />}
        exportExcel={() => ExportExcel(exceptionLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={ExceptionColumns}
        pagination={exceptionLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Exceptions;

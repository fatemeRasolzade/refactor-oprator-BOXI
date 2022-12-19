import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StaticTable from "../../../../components/staticTable/StaticTable";
import DeleteOperation from "../../../../components/tableOperation/DeleteOperation";
import { apiRoute } from "../../../../services/apiRoute";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { RouteColumns } from "./view/Column";
import OptionsTable from "./view/OptionsTable";
import SearchForm from "./view/SearchForm";
import RouteActionForm from "./view/RouteActionForm";
import { filterRoute } from "../../../../redux/Transportation/route/RouteData";
import AddRouteForms from "./view/AddRoute";
import { useFetchOptions } from "../../../../global/hooks/useFetchOptions";

const Route: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, routeLists, isUpdating } = useSelector((state: any) => state.route);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const { dataOptions:hubOptions } = useFetchOptions(apiRoute().get.select_hub);
  const handleDeleteActionNewData = () => {
    dispatch(
      filterRoute({
        search: "",
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  };
  const data =
    routeLists?.content?.length !== 0
      ? routeLists?.content?.map((item: any) => {
          return {
            ...item,
            operation: (
              <div className="flex w-full gap-3 justify-center">
                <DeleteOperation
                  itemId={item.id}
                  title={"حذف مسیر"}
                  handleDeleteActionNewData={handleDeleteActionNewData}
                  route={apiRoute().delete.vendor + `/${item.id}`}
                />
                <RouteActionForm currentData={item} hubOptions={hubOptions}/>
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
        addComponentProps={() => <AddRouteForms  hubOptions={hubOptions}/>}
        exportExcel={() => ExportExcel(routeLists?.content)}
      />
      <StaticTable
        data={data ? data : []}
        column={RouteColumns}
        pagination={routeLists?.totalElements}
        selectable={false}
      />
    </div>
  );
};

export default Route;

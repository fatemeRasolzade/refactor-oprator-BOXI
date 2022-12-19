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
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import InputIcon from "react-multi-date-picker/components/input_icon";
import persian from "react-date-object/calendars/persian";
import "react-multi-date-picker/styles/colors/red.css";
import TimePickers from "../../../../global/DatePicker/TimePicker";
import { useFetchOptions } from "../../../../global/hooks/useFetchOptions";

const Route: React.FC = (): JSX.Element => {
  const [isActive, setIsACtive] = useState(true);
  const dispatch = useDispatch();
  const { errorMessage, routeLists, isUpdating } = useSelector((state: any) => state.route);
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
                <RouteActionForm currentData={item} />
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
      <TimePickers />
      {/* <DatePicker
        value={"02:20 1401/08/15"}
        plugins={[<TimePicker hideSeconds position="bottom" />]}
        format="HH:mm YYYY/MM/DD"
      /> */}
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

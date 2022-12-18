import React, { useCallback, useEffect, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../../components/OptionsTable/OptionsTable";
import StaticTable from "../../../components/staticTable/StaticTable";
import AddEditPinCode from "./views/AddEditPinCode";
import SearchFilter from "./views/SearchFilter";

const PinCodeManageMent = () => {
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleGetPinCode = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleGetPinCode();

    return () => {};
  }, [handleGetPinCode]);

  return (
    <div>
      <Breadcrumb curentPage="مدیریت اطلاعات پایه" beforePage="مدیریت پین کد" />
      <SearchFilter />
      <OptionsTable
        // exportExcel={() => ExportExcel(rolesList?.content)}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          //   setFilterData({
          //     permission: "",
          //     name: "",
          //     isActive: value,
          //     pageSize: 10,
          //     pageNumber: pageNumbers,
          //   });
          setIsActive(value);
        }}
        addComponentProps={() => <AddEditPinCode title="تغییر مدیریت نقش" />}
      />
      <StaticTable data={[]} column={[]} pagination={7} selectable={false} />
    </div>
  );
};

export default PinCodeManageMent;

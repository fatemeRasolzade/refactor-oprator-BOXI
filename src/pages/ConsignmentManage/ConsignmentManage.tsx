import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { ConsignmentManageCol } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import { ExportExcel } from "../../tools/functions/Methods";
import SearchConsignmentFilter from "./view/SearchConsignmentFilter";

const ConsignmentManage = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [isActive, setIsActive] = useState<boolean>(true);

  const handleDeleteActionNewData = () => {};
  return (
    <>
      <Breadcrumb curentPage="مدیریت مرسوله" />
      <SearchConsignmentFilter />
      <OptionsTable
        btnLink="/consignment-manage/add"
        exportExcel={() => ExportExcel([])}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          setIsActive(value);
        }}
      />
      <StaticTable
        data={[]}
        column={ConsignmentManageCol}
        pagination={7}
        selectable={false}
      />
      <DeleteModal
        isModalOpenDelete={isOpenModalDelete.isOpen}
        setIsModalOpenDelete={() =>
          setIsOpenModalDelete((prev) => {
            return { ...prev, isOpen: false, id: undefined };
          })
        }
        title="حذف نقش"
        itemId={isOpenModalDelete.id}
        route={""}
        handleDeleteActionNewData={handleDeleteActionNewData}
      />
    </>
  );
};

export default ConsignmentManage;

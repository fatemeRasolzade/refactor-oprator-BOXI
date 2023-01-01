import StatusBar from "../../components/StatusBar/StatusBar";

// return <StatusBar Options={Options} />;
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from "../../components/staticTable/StaticTable";
import { ConsignmentManageCol } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import { ExportExcel } from "../../tools/functions/Methods";
import SearchConsignmentFilter from "./view/SearchConsignmentFilter";
import NewOptionTable from "../../components/OptionsTable/NewOptionTable";
import SimpleButton from "../../global/SimpleButton/SimpleButton";
import { GoDesktopDownload } from "react-icons/go";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
  type: "operation" | "text" | "multiSelect" | "status" | "time";
}
const ConsignmentManage = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [isActive, setIsActive] = useState<boolean>(true);
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>([
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "کد پرسنلی",
      accessor: "personelCode",
      type: "text",
    },
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "عملیات",
      accessor: "operation",
      type: "operation",
    },
  ]);

  const handleDeleteActionNewData = () => {};

  return (
    <>
      <Breadcrumb curentPage="مدیریت مرسوله" />
      <StatusBar Options={Options} />
      <SearchConsignmentFilter
        isActive={isActive}
        selectedCol={selectedCol}
        setSelectedCol={(value: Array<SelectedColInterface>) =>
          setSelectedCol(value)
        }
      />
      <OptionsTable
        btnLink="/consignment-manage/add"
        exportExcel={() => ExportExcel([])}
        isActive={isActive}
        setIsActive={(value: boolean) => {
          setIsActive(value);
        }}
      />
      {/* <NewOptionTable
        items={[
          {
            item: <>سلام</>,
            access: "sdf",
          },
          {
            item: (
              <SimpleButton
                handelClick={() => ExportExcel([])}
                text="خروجی اکسل"
                icon={<GoDesktopDownload color="black" />}
                className="centering rounded-lg text-black w-full"
              />
            ),
            access: "sdf",
          },
        ]}
      /> */}
      <SwitchOptionTable accessPage={["A1", "A2", "A3"]} />
      <StaticTable
        data={[]}
        column={selectedCol.length > 2 ? selectedCol : ConsignmentManageCol}
        pagination={7}
        selectable={false}
        THWrapper={"min-w-[130px] w-[130px]"}
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

const Options = [
  { name: "All", value: 10000 },
  { name: "Planned", value: 1000 },
  { name: "NotPlanned", value: 1000 },
  { name: "InTransit", value: 1000 },
  { name: "SuccessfulDelivery", value: 1000 },
  { name: "UnsuccessfulDelivery", value: 1000 },
  { name: "ScanInHub", value: 1000 },
  { name: "Bagged", value: 1000 },
  { name: "Loaded", value: 1000 },
  { name: "EntranceToHub", value: 1000 },
  { name: "BackToOrigin", value: 1000 },
];

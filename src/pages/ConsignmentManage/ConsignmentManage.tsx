import StatusBar from "../../components/StatusBar/StatusBar";
import { useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import { ConsignmentManageCol } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import SearchConsignmentFilter from "./view/SearchConsignmentFilter";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import PrintLabelForm from "./view/PrintLabelForm";
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
  type: "operation" | "text" | "inputSelect" | "multiSelect" | "status" | "time";
}
const ConsignmentManage = () => {
  const [OpenPrintLabel, setOpenPrintLabel] = useState(false);
  const [OpenEntranceScan, setOpenEntranceScan] = useState(false);
  const [OpenOutPutScan, setOpenOutPutScan] = useState(false);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>([
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "شماره مرسوله",
      accessor: "code",
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

  const PrintLabelOptions = [
    { handleClick: () => setOpenPrintLabel(true), name: "انتخاب شده ها" },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];
  const EntranceScanOptions = [
    { handleClick: () => console.log(), name: "اسکن اکسل " },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];

  const OutPutScanOptions = [
    { handleClick: () => console.log(), name: "اسکن اکسل " },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];
  // const Entires
  return (
    <>
      <Breadcrumb curentPage="مدیریت مرسوله" />
      <StatusBar Options={Options} />
      <SearchConsignmentFilter selectedCol={selectedCol} setSelectedCol={(value: Array<SelectedColInterface>) => setSelectedCol(value)} />
      <SwitchOptionTable
        accessPage={[
          { code: "A7" },
          { code: "A6", value: PrintLabelOptions },
          { code: "A4", value: EntranceScanOptions },
          { code: "A5", value: OutPutScanOptions },
          { code: "A1", value: [] },
        ]}
      />
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
      <PrintLabelForm open={OpenPrintLabel} setOpen={setOpenPrintLabel} />
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

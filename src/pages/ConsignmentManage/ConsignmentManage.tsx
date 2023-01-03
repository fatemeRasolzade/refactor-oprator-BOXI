import { useCallback, useEffect, useState } from "react";
import StatusBar from "../../components/StatusBar/StatusBar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import { ConsignmentManageCol } from "../../global/Column/Columns";
import DeleteModal from "../../global/DeleteModal/DeleteModal";
import SearchConsignmentFilter from "./view/SearchConsignmentFilter";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import PrintLabelForm from "./view/PrintLabelForm";
import EntranceScanForm from "./view/EntranceScanForm";
import OutPutScanForm from "./view/OutPutScanForm";
import { useSelector } from "react-redux";
import { async } from "q";
import { filterUrls } from "../../services/api.enums";
import { filterDataAPI, filterTableDataAPI } from "../../services/CRUDServices";
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
  type:
    | "operation"
    | "text"
    | "inputSelect"
    | "multiSelect"
    | "status"
    | "time";
}
const ConsignmentManage = () => {
  const { filter } = useSelector((state: any) => state.consignment);
  const { pageNumbers } = useSelector((state: any) => state.paginate);

  const [fetchedData, setfetchedData] = useState({});
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
    { handleClick: () => setOpenEntranceScan(true), name: "اسکن اکسل " },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];

  const OutPutScanOptions = [
    { handleClick: () => setOpenOutPutScan(true), name: "اسکن اکسل " },
    { handleClick: () => console.log(), name: "افزودن گروهی اکسل" },
  ];

  const handleGetDataTable = useCallback(async () => {
    const body = {};
    try {
      const res = await filterTableDataAPI(
        filterUrls.consignment,
        pageNumbers,
        body
      );
      console.log("res", res);
      setfetchedData(res.data);
    } catch (error) {}
  }, []);

  useEffect(() => {
    handleGetDataTable();
  }, [handleGetDataTable]);

  return (
    <>
      <Breadcrumb curentPage="مدیریت مرسوله" />
      <StatusBar Options={Options} />
      <SearchConsignmentFilter
        selectedCol={selectedCol}
        setSelectedCol={(value: Array<SelectedColInterface>) =>
          setSelectedCol(value)
        }
      />
      <SwitchOptionTable
        accessPage={[
          { code: "A7" },
          { code: "A6", value: PrintLabelOptions },
          { code: "A4", value: EntranceScanOptions },
          { code: "A5", value: OutPutScanOptions },
          { code: "A8", value: [] },
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
      <EntranceScanForm open={OpenEntranceScan} setOpen={setOpenEntranceScan} />
      <OutPutScanForm open={OpenOutPutScan} setOpen={setOpenOutPutScan} />
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

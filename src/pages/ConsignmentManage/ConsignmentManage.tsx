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
import { filterUrls, getUrls } from "../../services/api.enums";
import { filterTableDataAPI, getAPI } from "../../services/CRUDServices";
import { StatusEnum } from "../../models/consigment";

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

interface ItemData {}

const ConsignmentManage = () => {
  const { filter } = useSelector((state: any) => state.consignment);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
  const [fetchedData, setfetchedData] = useState<any>([]);
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
      setIsMoreDataLoading(true);
      const res = await filterTableDataAPI(
        filterUrls.consignment,
        pageNumbers,
        body
      );
      console.log("res", res.data.payload.content);
      let contverted = await convertdataTable(res.data.payload.content);

      setfetchedData(contverted);
    } catch (error) {
    } finally {
      setIsMoreDataLoading(false);
    }
  }, [pageNumbers]);

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
        data={fetchedData}
        column={selectedCol.length > 2 ? selectedCol : ConsignmentManageCol}
        pagination={7}
        selectable={false}
        loading={isMoreDataLoading}
        THWrapper={"border border-indigo-600	 whitespace-nowrap"}
      />
      <DeleteModal
        isModalOpenDelete={isOpenModalDelete.isOpen}
        setIsModalOpenDelete={() =>
          setIsOpenModalDelete((prev) => {
            return { ...prev, isOpen: false, id: undefined };
          })
        }
        title="حذف مرسوله"
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

const convertdataTable = async (fetchedData: any) => {
  const getMoreData = async (urlApi: string) => {
    let fetchedMoreData = {};
    try {
      const res = await getAPI(urlApi);
      fetchedMoreData = res.data.payload;
    } catch (error) {}
    return fetchedMoreData;
  };

  const converted = await Promise.all(
    fetchedData.map(async (item: any) => {
      let fetchedJson: any = {};
      const AddressByUsername: any = await getMoreData(
        getUrls.customerAddressByUsername + "/hasan"
      );
      const PhoneByUsername: any = await getMoreData(
        getUrls.customerPhoneByUsername + "/hasan"
      );

      fetchedJson = {
        AddressByUsername: AddressByUsername,
        PhoneByUsername: PhoneByUsername,
      };
      console.log("sample Data", AddressByUsername);

      return {
        ...fetchedJson,
        id: item.id,
        PaymentByBanknote: item.amountPaidWithCash,
        TheAmountPayable: item.amountPaidWithCard,
        senderCity: item.senderCityName,
        SenderPhone: item.senderPhoneNumber,
        senderCityRegionName: item.senderCityRegionName,
        senderRegionName: item.senderRegionName,
        IMEI1: item.imei_1,
        IMEI2: item.imei_2,
        IMEI3: item.imei_3,

        device1: item.machine_1,
        device2: item.machine_2,
        device3: item.machine_3,

        status: StatusEnum[item.status],
        customerName: item.customerName,
        createdAt: item.createdDate,
        InternetAddressOfIssuedInvoice: item.addressOfWeb,

        DeliveryTime: item.deliveryBoundTime,
        destinationHub: item.destinationHub,
        currentHub: item.originHub,
        lastUpdate: item.updateDate,
        receiverName: item.deliveryName,
        receiverAddress: item.deliveryAddress,
        receiverPhone: item.deliveryPhone,
        receiverArea: item.receiverCityRegionName,
        recipientArea: item.receiverRegionName,
        ConsignmentType: item.selectConsignmentType,
        trip: item.isTripAssigned,
        weight: item.weight,
        volume: item.volume,
        bagId: item.bagId,
        paymentStatus: item.paymentStatus,
        RescheduleDate: item.rescheduledDate,

        TravelNumber: item.hubTripNumberId,
        DeliveryTripNumber: item.lastDeliveryTripNumberId,
        CollectionTripNumber: item.lastPickUpTripNumberId,

        nextHub: item.nextHub,
        shelfNumber: item.rackNumber,
        NumberReferralsForDelivery: item.countOfTripForDelivery,
        NumberOfReferralsForCollection: item.countOfTripForPickUp,
        deliveryType: item.deliveryType,
        PinCodeOfTheSender: item.senderPinCode,
        serviceType: item.serviceType,
        qcType: item.qcType,
      };
    })
  );

  return converted;
};

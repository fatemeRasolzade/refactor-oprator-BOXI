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
import TooltipItems from "./view/TooltipItems";

interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id: string;
  type: "operation" | "text" | "inputSelect" | "multiSelect" | "status" | "time";
}

interface ItemData {}

const ConsignmentManage = () => {
  const { filter } = useSelector((state: any) => state.consignment);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const [isMoreDataLoading, setIsMoreDataLoading] = useState(false);
  const [loadData, setloadData] = useState(false);
  const [fetchedData, setfetchedData] = useState<any>([]);
  const [OpenPrintLabel, setOpenPrintLabel] = useState(false);
  const [OpenEntranceScan, setOpenEntranceScan] = useState(false);
  const [OpenOutPutScan, setOpenOutPutScan] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const [isOpenModalDelete, setIsOpenModalDelete] = useState({
    isOpen: false,
    id: undefined,
  });
  const [selectedCol, setSelectedCol] = useState<Array<SelectedColInterface>>([
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "?????????? ????????????",
      accessor: "code",
      type: "text",
    },
    {
      id: crypto.randomUUID(),
      isRequire: true,
      Header: "????????????",
      accessor: "operation",
      type: "operation",
    },
  ]);

  const handleDeleteActionNewData = () => {};

  const PrintLabelOptions = [
    { handleClick: () => setOpenPrintLabel(true), name: "???????????? ?????? ????" },
    { handleClick: () => console.log(), name: "???????????? ?????????? ????????" },
  ];
  const EntranceScanOptions = [
    { handleClick: () => setOpenEntranceScan(true), name: "???????? ???????? " },
    { handleClick: () => console.log(), name: "???????????? ?????????? ????????" },
  ];

  const OutPutScanOptions = [
    { handleClick: () => setOpenOutPutScan(true), name: "???????? ???????? " },
    { handleClick: () => console.log(), name: "???????????? ?????????? ????????" },
  ];

  const handleGetDataTable = useCallback(async () => {
    const body = {};
    try {
      setloadData(true);
      const res = await filterTableDataAPI(
        filterUrls.consignment,
        pageNumbers,
        body
      );
      console.log("res", res.data.payload.content);
      let maindata = await mainDataTable(res.data.payload.content);
      // let contverted = await convertdataTable(res.data.payload.content);
      setfetchedData(maindata);
      setOriginalData(res.data.payload.content);
    } catch (error) {
    } finally {
      setloadData(false);
    }
  }, [pageNumbers]);

  useEffect(() => {
    handleGetDataTable();
  }, [handleGetDataTable]);

  const fetchedMoreDataHandler = useCallback(async () => {
    try {
      setIsMoreDataLoading(true);
      const convertedData = await convertdataTable(originalData);

      setfetchedData(convertedData);
    } catch (error) {
    } finally {
      setIsMoreDataLoading(false);
    }
  }, [originalData]);

  return (
    <>
      <Breadcrumb curentPage="???????????? ????????????" />
      <StatusBar Options={Options} />
      <SearchConsignmentFilter selectedCol={selectedCol} setSelectedCol={(value: Array<SelectedColInterface>) => setSelectedCol(value)} />
      <SwitchOptionTable
        accessPage={[
          { code: "A7" },
          { code: "A6", value: PrintLabelOptions },
          { code: "A4", value: EntranceScanOptions },
          { code: "A5", value: OutPutScanOptions },
          { code: "A8", value: [] },
          { code: "A1", value: [] },
          {
            code: "A9",
            value: {
              loading: isMoreDataLoading,
              fetch: () => fetchedMoreDataHandler(),
            },
          },
        ]}
      />
      <StaticTable
        data={fetchedData}
        column={selectedCol.length > 2 ? selectedCol : ConsignmentManageCol}
        pagination={7}
        selectable={false}
        loading={loadData}
        THWrapper={"border border-indigo-600	 whitespace-nowrap"}
      />
      <DeleteModal
        isModalOpenDelete={isOpenModalDelete.isOpen}
        setIsModalOpenDelete={() =>
          setIsOpenModalDelete((prev) => {
            return { ...prev, isOpen: false, id: undefined };
          })
        }
        title="?????? ????????????"
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

// convert data
const convertdataTable = async (fetchedData: any) => {
  const getMoreData = async (urlApi: string) => {
    let fetchedMoreData = {};
    try {
      const res = await getAPI(urlApi);
      console.log(urlApi, res.data);

      fetchedMoreData = res.data.payload;
    } catch (error) {}
    return fetchedMoreData;
  };

  const converted = await Promise.all(
    fetchedData?.map(async (item: any) => {
      let fetchedJson: any = {};
      // fetch customer apis
      const AddressByUsername: any = await getMoreData(
        getUrls.customerAddressByUsername + "/hasan"
      );
      const PhoneByUsername: any = await getMoreData(
        getUrls.customerPhoneByUsername + "/hasan"
      );
      // fetch prospect apis
      const AddressByUsernameprospect: any = await getMoreData(
        getUrls.prospectAddressByUsername + "/hasan"
      );
      const PhoneByUsernameprospect: any = await getMoreData(
        getUrls.prospectPhoneByUsername + "/hasan"
      );

      console.log("AddressByUsernameprospect", AddressByUsernameprospect);
      console.log("PhoneByUsernameprospect", PhoneByUsernameprospect);

      fetchedJson = {
        // AddressByUsername: AddressByUsername,
        SenderPhone: (
          <TooltipItems
            ArrayValue={PhoneByUsername?.map((item: any) => {
              return { text: item.telNumber };
            })}
          />
        ),
        senderCity: (
          <TooltipItems
            ArrayValue={AddressByUsername?.map((item: any) => {
              return { text: item.selectCity.text };
            })}
          />
        ),
        senderCityRegionName: (
          <TooltipItems
            ArrayValue={AddressByUsername?.map((item: any) => {
              return { text: item.selectRegion.text };
            })}
          />
        ),
        senderRegionName: (
          <TooltipItems
            ArrayValue={AddressByUsername?.map((item: any) => {
              return { text: item.selectRegion.text };
            })}
          />
        ),
        senderPostalCode: (
          <TooltipItems
            ArrayValue={AddressByUsername?.map((item: any) => {
              return { text: item.postalCode };
            })}
          />
        ),
        senderAdress: (
          <TooltipItems
            ArrayValue={AddressByUsername?.map((item: any) => {
              return {
                text: item.selectState.text + "??" + item.selectCity.text + "??" + item.selectRegion.text + "??????????" + item.pelak + "??????????" + item.unit,
              };
            })}
          />
        ),
        receiverPhone: (
          <TooltipItems
            ArrayValue={PhoneByUsernameprospect?.map((item: any) => {
              return { text: item.telNumber };
            })}
          />
        ),
        recipientArea: (
          <TooltipItems
            ArrayValue={AddressByUsernameprospect?.map((item: any) => {
              return { text: item.selectRegion.text };
            })}
          />
        ),
        // recipientArea: (
        //   <TooltipItems
        //     ArrayValue={AddressByUsername?.map((item: any) => {
        //       return { text: item.selectCity.text };
        //     })}
        //   />
        // ),
        receiverPostalcode: (
          <TooltipItems
            ArrayValue={AddressByUsernameprospect?.map((item: any) => {
              return { text: item.postalCode };
            })}
          />
        ),

        receiverAddress: (
          <div className="min-w-[100px]">
            <TooltipItems
              ArrayValue={AddressByUsername?.map((item: any) => {
                return {
                  text:
                    item.selectState.text + "??" + item.selectCity.text + "??" + item.selectRegion.text + "??????????" + item.pelak + "??????????" + item.unit,
                };
              })}
            />
          </div>
        ),
      };
      console.log("sample Data", AddressByUsername);

      return {
        ...fetchedJson,
        id: item.id,
        PaymentByBanknote: item.amountPaidWithCash,
        TheAmountPayable: item.amountPaidWithCard,
        // senderCity: item.senderCityName,
        // senderCityRegionName: item.senderCityRegionName,
        // senderRegionName: item.senderRegionName,
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
        // receiverAddress: item.deliveryAddress,
        // receiverPhone: item.deliveryPhone,
        // receiverArea: item.receiverCityRegionName,
        // recipientArea: item.receiverRegionName,
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

const mainDataTable = async (fetchedData: any) => {
  const converted = await Promise.all(
    fetchedData?.map(async (item: any) => {
      return {
        id: item.id,
        PaymentByBanknote: item.amountPaidWithCash,
        TheAmountPayable: item.amountPaidWithCard,
        // senderCity: item.senderCityName,
        // senderCityRegionName: item.senderCityRegionName,
        // senderRegionName: item.senderRegionName,
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
        // receiverAddress: item.deliveryAddress,
        // receiverPhone: item.deliveryPhone,
        // receiverArea: item.receiverCityRegionName,
        // recipientArea: item.receiverRegionName,
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

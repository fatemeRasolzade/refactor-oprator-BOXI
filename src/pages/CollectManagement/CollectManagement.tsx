import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../components/staticTable/StaticTable";
import StatusBar from "../../components/StatusBar/StatusBar";
import { clearPickup, pickupData } from "../../redux/PickupData/PickupData";
import { CollectColumns } from "./view/CollectColumns";
import CollectManagementFilterSearch from "./view/CollectManagementFilterSearch";

const CollectManagement = () => {
  const dispatch = useDispatch();
  const { pickupList, filter } = useSelector((state: any) => state.pickup);

  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const handleGetTableData = useCallback(async () => {
    try {
      dispatch(pickupData({ ...filter, pageNumber: pageNumbers }) as any);
    } catch (error) {}
  }, [dispatch, pageNumbers, filter]);

  useEffect(() => {
    handleGetTableData();
    return () => dispatch(clearPickup() as any);
  }, [dispatch, handleGetTableData]);

  return (
    <>
      <Breadcrumb curentPage="مدیریت جمع آوری" beforePage="بازگشت" />
      <StatusBar Options={CollectStatus} />
      <CollectManagementFilterSearch />
      <SwitchOptionTable accessPage={[{ code: "A1", value: [] }]} />
      <StaticTable
        data={pickupList?.content ? pickupList?.content : []}
        column={CollectColumns}
        pagination={7}
        selectable={true}
        THWrapper={"min-w-[130px] w-[130px]"}
      />
    </>
  );
};

export default CollectManagement;

const CollectStatus = [
  { name: "All", value: 1000 },
  { name: "AllocationToRegion", value: 1000 },
  { name: "AllocationToDriver", value: 1000 },
  { name: "Collected", value: 2000 },
  { name: "FaildedCollected", value: 2000 },
  { name: "Uncollectible", value: 2000 },
  { name: "Canceled", value: 2000 },
];

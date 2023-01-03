import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StatusBar from "../../components/StatusBar/StatusBar";
import CollectManagementFilterSearch from "./view/CollectManagementFilterSearch";

const CollectManagement = () => {
  return (
    <>
      <Breadcrumb curentPage="مدیریت جمع آوری" beforePage="بازگشت" />
      <StatusBar Options={CollectStatus} />
      <CollectManagementFilterSearch />
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

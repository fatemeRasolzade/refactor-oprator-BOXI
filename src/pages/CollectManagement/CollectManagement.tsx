import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NotFound from "../../components/NotFound/NotFound";
import StatusBar from "../../components/StatusBar/StatusBar";

const CollectManagement = () => {
  return (
    <>
      <Breadcrumb curentPage="مدیریت جمع آوری" beforePage="بازگشت" />
      <StatusBar Options={CollectStatus} />
      <NotFound/>
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

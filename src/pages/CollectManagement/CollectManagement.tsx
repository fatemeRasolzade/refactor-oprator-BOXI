import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SwitchOptionTable from "../../components/OptionsTable/SwitchOptionTable";
import StaticTable from "../../components/staticTable/StaticTable";
import StatusBar from "../../components/StatusBar/StatusBar";
import { CollectColumns } from "./view/CollectColumns";
import CollectManagementFilterSearch from "./view/CollectManagementFilterSearch";

const CollectManagement = () => {
  return (
    <>
      <Breadcrumb curentPage="مدیریت جمع آوری" beforePage="بازگشت" />
      <StatusBar Options={CollectStatus} />
      <CollectManagementFilterSearch />
      <SwitchOptionTable accessPage={[{ code: "A1", value: [] }]} />
      <StaticTable
        data={[]}
        column={CollectColumns}
        // column={[]}
        pagination={7}
        selectable={false}
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

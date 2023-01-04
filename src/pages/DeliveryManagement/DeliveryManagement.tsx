import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import StatusBar from "../../components/StatusBar/StatusBar";
import { DeliveryColumns } from "./views/DeliveryColumns";
import DeliverySearchFilter from "./views/DeliverySearchFilter";

const DeliveryManagement = () => {
  return (
    <>
      <Breadcrumb curentPage="مدیریت تحویل" beforePage="بازگشت" />
      <StatusBar Options={DeliveryStatus} />
      <DeliverySearchFilter />
      <StaticTable selectable={false} data={[]} column={DeliveryColumns} pagination={1} THWrapper={"min-w-[130px] w-[130px]"} />
    </>
  );
};

export default DeliveryManagement;

const DeliveryStatus = [
  { name: "All", value: 1000 },
  { name: "AllocationToRegion", value: 1000 },
  { name: "AllocationToDriver", value: 1000 },
  { name: "SuccessfulDelivery", value: 1000 },
  { name: "UnsuccessfulDelivery", value: 1000 },
  { name: "Undeliverable", value: 1000 },
];

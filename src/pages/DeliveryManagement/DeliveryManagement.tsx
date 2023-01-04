import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NotFound from "../../components/NotFound/NotFound";
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
      {/* <StaticTable selectable={false} data={[]} column={DeliveryColumns} pagination={1} /> */}
      <NotFound />
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

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import { ConsignmentManageCol } from "../../global/Column/Columns";
import SearchConsignmentFilter from "./view/SearchConsignmentFilter";

const ConsignmentManage = () => {
  return (
    <>
      <Breadcrumb curentPage="مدیریت مرسوله" />
      <SearchConsignmentFilter />
      <StaticTable
        data={[]}
        column={ConsignmentManageCol}
        pagination={7}
        selectable={false}
      />
    </>
  );
};

export default ConsignmentManage;

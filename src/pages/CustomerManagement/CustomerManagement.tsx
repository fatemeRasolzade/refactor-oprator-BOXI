import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import StaticTable from "../../components/staticTable/StaticTable";
import AddButton from "../../global/addButton/AddButton";
import {
  ACTIVE_OPTION,
  DOWNLOAD_OPTION,
} from "../../global/CustomOptions/CustomOptionsKeyword";
import TestCustomOptions from "../../global/CustomOptions/TestCustomOptions";

const CustomerManagement = () => {
  const handleGetExcel = () => {
    alert("HELOOOOOOOOOOOOOOO");
  };

  const options = [
    { name: ACTIVE_OPTION, handleClick: handleGetExcel },
    { name: DOWNLOAD_OPTION, handleClick: handleGetExcel },
  ];

  const handleAction = () => {
    alert("frist");
  };
  const handleUploadFileAction = () => {
    alert("second");
  };

  const ToggleOptions = [
    { handleClick: handleAction, name: "افزودن مشتری" },
    { handleClick: handleUploadFileAction, name: "افزودن گروهی اکسل" },
  ];
  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="مدیریت مشتریان" />
      <div className="flex-start-center gap-16">
        <AddButton ToggleOptions={ToggleOptions} />
        <TestCustomOptions options={options} />
      </div>
      heheee
      {/* <StaticTable data={data} column={HubColumn} pagination={payload?.totalElements}/> */}
    </div>
  );
};

export default CustomerManagement;

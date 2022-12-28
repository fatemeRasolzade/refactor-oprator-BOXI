import { FC } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ActionTabHub from "../../pages/Hub/Views/PerfetionalModalHub/ColumnsTable/ActionTabHub";
import ColumnsTable from "../../pages/Hub/Views/PerfetionalModalHub/ColumnsTable/ColumnsTable";
import SearchFilter from "../../pages/Hub/Views/PerfetionalModalHub/ColumnsTable/SearchFilter";
interface SelectedColInterface {
  accessor: string;
  Header: string;
  isRequire: boolean;
  id:string
}
interface SearchFilterInterface {
  valueName:
    | "personelCode"
    | "name"
    | "nationalCode"
    | "mobile"
    | "email"
    | "search"
    | "username"
    | "pageNumbers";

  label: string;
  isMain: boolean;
  isShow: boolean;
}
interface CustomizeModalProps {
  columns: Array<any>;
  searchFilterList: Array<any>;
  selectedCol: Array<any>;
  setSelectedCol: (selectedCol: Array<any>) => void;
  setSearchFilterList: (selectedCol: Array<any>) => void;
}
const CustomizeModal: FC<CustomizeModalProps> = ({
  columns,
  selectedCol,
  searchFilterList,
  setSelectedCol,
  setSearchFilterList,
}) => {
  return (
    <>
      <Tabs className="w-full">
        <TabList>
          <Tab>ستون های جدول</Tab>
          <Tab>فیلترهای جستجو</Tab>
          <Tab>عملیات</Tab>
        </TabList>

        <TabPanel>
          <div className="min-h-[400px] overflow-auto">
            <ColumnsTable
              columns={columns}
              selectedCol={selectedCol}
              setSelectedCol={setSelectedCol}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="min-h-[400px] overflow-auto">
            <SearchFilter
              setSearchFilterList={setSearchFilterList}
              searchFilterList={searchFilterList}
            />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="min-h-[400px] overflow-auto">
            <ActionTabHub />
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CustomizeModal;

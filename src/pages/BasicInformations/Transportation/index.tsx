import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Vendor from "./vendor/vendor";
import VehicleModel from "./vehicleModel/index";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";

const Transportation: React.FC = (): JSX.Element => {
    
  return (
    <>
      <Breadcrumb beforePage="حمل و نقل" curentPage="اطلاعات پایه " />

      <Tabs
        direction="rtl"
        className={"my-6 text-sm"}
        selectedTabClassName="selected font-bold "
        // selectedTabPanelClassName="react-tabs__tab-panel--selected bg-white p-6 shadow-md rounded-b-md rounded-tl-md"
      >
        <TabList className={"overflow-hidden flex gap-x-5 text-xl text-[#505A73] p m-10"}>
          <Tab>
            شرکت های نقلیه <span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
          <Tab>
            مدل وسیله نقلیه<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
        </TabList>
        <TabPanel>
          <Vendor />
        </TabPanel>
        <TabPanel>
          <VehicleModel />
        </TabPanel>
      </Tabs>
      <style>
        {`
	
			.selected {  border-bottom:1px solid red;  } 	
		`}
      </style>
    </>
  );
};

export default Transportation;
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import React, { Suspense } from "react";


const VehicleModel = React.lazy(() => import("./vehicleModel/index"));
const Route =React.lazy(()=>import ("./route/index"))
const Vehicle = React.lazy(() => import("./vehicle/index"));
const Bags = React.lazy(() => import("./bags/index"));
const Gate = React.lazy(() => import("./gate/index"));
const Exception = React.lazy(() => import("./exception/index"));
const Vendor = React.lazy(() => import("./vendor/vendor"));
const Dock = React.lazy(() => import("./dock/index"));
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
          <Tab>
             وسیله نقلیه<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>

        
          <Tab>
            مسیر<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
          <Tab>
             استثناء<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
          <Tab>
            کیسه بندی<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
          <Tab>
            بارانداز<span className="border  border-l-gary-200 relative right-4"></span>
          </Tab>
          <Tab>
            درب<span className=" relative "></span>
          </Tab>
        </TabList>
        <Suspense fallback={<p>...loading</p>}>
          <TabPanel>
            <Vendor />
          </TabPanel>
          <TabPanel>
            <VehicleModel />
          </TabPanel>
          <TabPanel>
            <Vehicle/> 
          </TabPanel>  
          <TabPanel>
            <Route />
          </TabPanel>
          <TabPanel>
            <Exception />
          </TabPanel>
          <TabPanel>
            <Bags />
          </TabPanel>
          <TabPanel>
            <Dock />
          </TabPanel>
          <TabPanel>
            <Gate />
          </TabPanel>
          
        </Suspense>
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

import React, { useState } from "react";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Vendor from "./vendor";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";



function Transportation() {
	return (

			<div className="relative">
				<Breadcrumb beforePage="اطلاعات پایه" curentPage="حمل و نقل" />
				{/*<div className="flex gap-4 items-center">*/}
				{/*	<div*/}
				{/*		data-aos="fade-up"*/}
				{/*		data-aos-duration={200}*/}
				{/*		className="flex items-center text-2xl leading-7 font-extrabold text-gray-900 "*/}
				{/*	>*/}
				{/*		اطلاعات پایه*/}
				{/*	</div>*/}
				{/*	/!*<IconChevronLeft />*!/*/}
				{/*	<div*/}
				{/*		data-aos="fade-up"*/}
				{/*		data-aos-duration={200}*/}
				{/*		className="flex items-center text-2xl leading-7 font-extrabold text-gray-900 "*/}
				{/*	>*/}
				{/*		حمل و نقل*/}
				{/*	</div>*/}
				{/*</div>*/}

				<div>
					<Tabs
						direction="rtl"
						className={"my-6 text-sm"}
						selectedTabClassName="selected font-bold   border    border-b-1  border-b-red-700"
						// selectedTabPanelClassName="react-tabs__tab-panel--selected bg-white p-6 shadow-md rounded-b-md rounded-tl-md"
					>
						<TabList className={"overflow-hidden flex gap-x-5 text-xl text-[#505A73]"}>
							<Tab>

								{/*شرکت های نقلیه <span className="border  border-l-gary-200 relative right-4"></span>*/}
							</Tab>
						</TabList>
						<TabPanel>
                             <Vendor />
						</TabPanel>
					</Tabs>
					<style>{`
					   .selected {  border-bottom:1px solid red;  } 
					`}</style>
				</div>
			</div>
	);
}

export default Transportation;

import React from 'react'
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input 
  } from "@material-tailwind/react";
import ColumnTable from './columnTable/ColumnTable';
import SearchFilter from './SearchFilter/SearchFilter';
import ActionProfetional from './ActionProfetional/ActionProfetional';

const CustomizeModal = () => {

 
   
  return (
    
<Tabs id="custom-animation" value="columnTable" className="w-full ">
      <TabsHeader>
       
          <Tab key={1} value={"columnTable"} onClick={(e)=>console.log(e)}>ستون های جدول</Tab>
          <Tab key={2} value={"searchFilter"} onClick={(e)=>console.log(e)}>فیلترهای جستجو</Tab>
          <Tab key={3} value={"action"} onClick={(e)=>console.log(e)}>عملیات</Tab>
      </TabsHeader>
      <TabsBody
        animate={{
          mount: { y: 0 },
          unmount: { y: 250 },
        }}
      >
      
          <TabPanel key={1} value={"columnTable"}>
        {/* column table */}
        <ColumnTable/>

       </TabPanel>
          <TabPanel key={2} value={"searchFilter"}>

          {/* searchFilter */}

        <SearchFilter/>
          </TabPanel>
          <TabPanel key={3} value={"action"}>
          <ActionProfetional/>
          </TabPanel>
       
      </TabsBody>
    </Tabs>
  
  )
}

export default CustomizeModal
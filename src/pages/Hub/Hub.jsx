import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import { PostDataParams } from "../../services/Service_call";
import { apiRoute } from "../../services/apiRoute";
import { ErrorAlert } from "../../global/alert/Alert";
import StaticTable from './../../components/staticTable/StaticTable';
import {HubColumn} from "../../global/Column/Columns"
import Table from './../../components/Table/Table';

const Hub = () => {
  const [dataTable, seDatatable] = useState([]);

  useEffect(() => {
    const params = `/filter?pageNumber=1&pageSize=20`;
    PostDataParams(apiRoute().post.hub, params, {}).then((res) => {
      if (res.status === "OK") {
        seDatatable(res.payload.content);
        console.log(res.payload.content);
      } else {
        ErrorAlert("خطای ارتباط با سرور");
      }
    });
  }, []);



const data=dataTable.map(hubItem=>{
  return{
    code:hubItem.code,
    name:hubItem.name,
    hubType:hubItem.selectHubType.text,
    category:hubItem.selectHubCategory !==null ? hubItem.selectHubCategory.text : "ناموجود",
    parentHub:hubItem.selectParentHub !== null ? hubItem.selectParentHub.text : "ناموجود",
    addressLine1:hubItem.addressLine1,
    Ragen:hubItem.selectRegion.text,
    deliver:hubItem.dropOffAllowed ? "بله" : "خیر",
    editBy:hubItem.name,
    EditTime:`${hubItem.locationStartDate.year}/${hubItem.locationStartDate.month}/${hubItem.locationStartDate.day}`
  }
})

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable />
       {/* <Table data={data} column={HubColumn}/> */}
     <StaticTable data={data} column={HubColumn}/> 
    </div>
  );
};

export default Hub;

import React, { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import NavbarSearch from "../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../components/OptionsTable/OptionsTable";
import StaticTable from './../../components/staticTable/StaticTable';
import {HubColumn} from "../../global/Column/Columns"
import {useDispatch,useSelector} from "react-redux"
import {clearHub, HubData} from "../../redux/HubData/HubData"
const Hub = () => {
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(HubData())

   return()=>dispatch(clearHub())
  },[])

  const {payload}=useSelector(state=>state.hub.postLists)



const data=payload?.content?.length > 0 ? payload.content.map(hubItem=>{
  return{
    code:hubItem.code ? hubItem.code : "",
    name:hubItem.name ? hubItem.name : "",
    hubType:hubItem.selectHubType !== null ? hubItem.selectHubType.text : "",
    category:hubItem.selectHubCategory !==null ? hubItem.selectHubCategory.text : "",
    parentHub:hubItem.selectParentHub !== null ? hubItem.selectParentHub.text : "",
    addressLine1:hubItem.addressLine1 ? hubItem.addressLine1 : "",
    Ragen:hubItem.selectRegion !==null ? hubItem.selectRegion.text :"",
    deliver:hubItem.dropOffAllowed ? "بله" : "خیر",
    editBy:hubItem.name ? hubItem.name : "",
    EditTime:hubItem.locationStartDate !==null ? `${hubItem.locationStartDate.year}/${hubItem.locationStartDate.month}/${hubItem.locationStartDate.day} ` : ""
  }
}) : []

  return (
    <div>
      <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable />
     <StaticTable data={data} column={HubColumn}/> 
    </div>
  );
};

export default Hub;

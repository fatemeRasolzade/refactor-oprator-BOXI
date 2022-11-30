import React, { useEffect, useState } from "react";

import StaticTable from '../../../../components/staticTable/StaticTable';
import {HubColumn} from "../../../../global/Column/Columns"
import {useDispatch,useSelector} from "react-redux"
import {clearHub, HubData} from "../../../../redux/HubData/HubData"
import Breadcrumb from "../../../../components//Breadcrumb/Breadcrumb";
import NavbarSearch from "../../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../../components/OptionsTable/OptionsTable";
 import * as XLSX  from "xlsx-js-style"
const Hub = () => {
  const dispatch=useDispatch()
  const {payload}=useSelector(state=>state.hub.postLists)
  const {pageNumbers} =useSelector(state=>state.paginate)

  useEffect(()=>{
    dispatch(HubData())
   return()=>dispatch(clearHub())
  },[])

  useEffect(()=>{
dispatch(HubData(pageNumbers))
  },[pageNumbers])



const data=payload?.content?.length > 0 ? payload.content.map(hubItem=>{
  return{
    code:hubItem.code ? hubItem.code : "",
    name:hubItem.name ? hubItem.name : "",
    hubType:hubItem.selectHubType !== null ? hubItem?.selectHubType?.text : "",
    category:hubItem.selectHubCategory !==null ? hubItem?.selectHubCategory?.text : "",
    parentHub:hubItem.selectParentHub !== null ? hubItem?.selectParentHub?.text : "",
    addressLine1:hubItem.addressLine1 ? hubItem?.addressLine1 : "",
    Ragen:hubItem.selectRegion !==null ? hubItem?.selectRegion?.text :"",
    deliver:hubItem.dropOffAllowed ? "بله" : "خیر",
    editBy:hubItem.name ? hubItem?.name : "",
    EditTime:hubItem.locationStartDate !==null ? `${hubItem?.locationStartDate?.year}/${hubItem?.locationStartDate?.month}/${hubItem?.locationStartDate?.day} ` : ""
  }
}) : []

const exportExcel=()=>{

  let row = [
    { v: "Courier: 24", t: "s", s: { font: { name: "Courier", sz: 24 } } },
    { v: "bold & color", t: "s", s: { font: { bold: true, color: { rgb: "#a50202" } } } },
    { v: "fill: color", t: "s", s: { fill: { fgColor: { rgb: "#a50202" } } } },
    { v: "line\nbreak", t: "s", s: { alignment: { wrapText: true } } },
  ];
  XLSX.utils.aoa_to_sheet([row])

  let web=XLSX.utils.book_new(),
  ws=XLSX.utils.json_to_sheet(payload.content)

  XLSX.utils.book_append_sheet(web,ws,"myfile")
  XLSX.writeFile(web,"MyExcel.xlsx")


}

  return (
    <div>
     <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable
       exportExcel={exportExcel}
       />
     <StaticTable data={data} column={HubColumn} pagination={payload?.totalElements}/>
    </div>
  );
};

export default Hub;

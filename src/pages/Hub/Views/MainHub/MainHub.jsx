
import  { useEffect } from "react";
import {useNavigate} from "react-router-dom"

import StaticTable from '../../../../components/staticTable/StaticTable';
import {HubColumn} from "../../../../global/Column/Columns"
import {useDispatch,useSelector} from "react-redux"
import {clearHub, HubData} from "../../../../redux/HubData/HubData"
import Breadcrumb from "../../../../components//Breadcrumb/Breadcrumb";
import NavbarSearch from "../../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../../components/OptionsTable/OptionsTable";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const Hub = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {payload}=useSelector(state=>state.hub.postLists)
  const {pageNumbers} =useSelector(state=>state.paginate)

  useEffect(()=>{
    dispatch(HubData(pageNumbers))
   return()=>dispatch(clearHub())
  },[])

  useEffect(()=>{
dispatch(HubData(pageNumbers))
  },[pageNumbers])


const handelDeleteHub=(e)=>{
console.log('yyyyyy',e)
}

  // onClick={()=>navigate('/hub/edit')}

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
    EditTime:hubItem.locationStartDate !==null ? `${hubItem?.locationStartDate?.year}/${hubItem?.locationStartDate?.month}/${hubItem?.locationStartDate?.day} ` : "",
    edit:<div className="w-full centering cursor-pointer" ><BiEditAlt onClick={()=>navigate("/hub/edit",{state:{dataEdit:hubItem}})}/></div>,
    delete:<div className="w-full centering cursor-pointer"><BiTrash onClick={()=>handelDeleteHub(hubItem.id)}/></div>
  }
}) : []

  return (
    <div>
     <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable
       exportExcel={()=>ExportExcel(payload?.content)}
       />
     <StaticTable data={data} column={HubColumn} pagination={payload?.totalElements}/>
    </div>
  );
};

export default Hub;

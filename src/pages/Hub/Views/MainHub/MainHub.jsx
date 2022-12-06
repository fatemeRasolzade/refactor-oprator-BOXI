
import  { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import StaticTable from '../../../../components/staticTable/StaticTable';
import {HubColumn} from "../../../../global/Column/Columns"
import {useDispatch,useSelector} from "react-redux"
import {clearHub, deleteRow, HubData} from "../../../../redux/HubData/HubData"
import Breadcrumb from "../../../../components//Breadcrumb/Breadcrumb";
import NavbarSearch from "../../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../../components/OptionsTable/OptionsTable";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import {DeleteDataParams} from "../../../../services/Service_call"
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
const Hub = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {payload}=useSelector(state=>state.hub.postLists)
  const {pageNumbers} =useSelector(state=>state.paginate)

  var data=payload?.content?.length > 0 ? payload.content.map(hubItem=>{
    return{
      code:hubItem.code ? hubItem.code : "",
      name:hubItem.name ? hubItem.name : "",
      hubType:hubItem.selectHubType !== null ? hubItem?.selectHubType?.text : "",
      category:hubItem.selectHubCategory !==null ? hubItem?.selectHubCategory?.text : "",
      parentHub:hubItem.selectParentHub !== null ? hubItem?.selectParentHub?.text : "",
      addressLine1:hubItem.addressLine1 ? hubItem?.addressLine1 : "",
      Ragen:hubItem.selectRegion !==null ? hubItem?.selectRegion?.text :"",
      deliver:hubItem.dropOffAllowed ? "بله" : "خیر",
      active:hubItem?.isActive,
      editBy:hubItem.name ? hubItem?.name : "",
      EditTime:hubItem.locationStartDate !==null ? `${hubItem?.locationStartDate?.year}/${hubItem?.locationStartDate?.month}/${hubItem?.locationStartDate?.day} ` : "",
      edit:<div className="w-full centering cursor-pointer" ><BiEditAlt onClick={()=>navigate("/hub/edit",{state:{dataEdit:hubItem}})} size={20}/></div>,
      delete:<div className="w-full centering cursor-pointer"><BiTrash onClick={()=>handelDeleteHub(hubItem.id)} size={20}/></div>
    }
  }) : []

  useEffect(()=>{
    dispatch(HubData(pageNumbers))
   return()=>dispatch(clearHub())
  },[])

  useEffect(()=>{
dispatch(HubData(pageNumbers))
  },[pageNumbers])


const handelDeleteHub=(id)=>{
 
  DeleteDataParams(apiRoute().delete.hubTable + `/${id}`).then(res=>{
    if(res.status==="OK"){
      SuccessAlert("با موفقیت پاک شد")
      dispatch(deleteRow(id))
     
    }else{
      ErrorAlert("خطا در برقراری ارتباط")
    }
  })


}

const handelEventSwitch=(event)=>{
  //console.log(Object.assign(data).filter(item=>item.active===true)) 

}



  return (
    <div>
     <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" />
      <OptionsTable
       exportExcel={() => ExportExcel(payload?.content)}
       handelSwitch={handelEventSwitch}
       />
     <StaticTable data={data} column={HubColumn} pagination={payload?.totalElements}/>
    </div>
  );
};

export default Hub;

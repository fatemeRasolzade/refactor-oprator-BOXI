
import  { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import StaticTable from '../../../../components/staticTable/StaticTable';
import {HubColumn} from "../../../../global/Column/Columns"
import {useDispatch,useSelector} from "react-redux"
import {clearHub, deleteRow, HubData} from "../../../../redux/HubData/HubData";
import {editHub} from "../../../../redux/HubData/EditData"
import Breadcrumb from "../../../../components//Breadcrumb/Breadcrumb";
import NavbarSearch from "../../../../components/NavbarSearch/NavbarSearch";
import OptionsTable from "../../../../components/OptionsTable/OptionsTable";
import { ExportExcel } from "../../../../tools/functions/Methods";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { apiRoute } from "../../../../services/apiRoute";
//  import {MyExport} from "../ExportMyExcel";
import DeleteModal from "../../../../global/DeleteModal/DeleteModal";

const Hub = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {payload}=useSelector(state=>state.hub.postLists)
  const {pageNumbers} =useSelector(state=>state.paginate)
  const [ActiveSwitch,setActiveSwitch]=useState(true)
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
const [deleteItemId, setdeleteItemId] = useState(0);
  const BodyData={
    code: "",
      name: "",
      hubTypeId: "",
      hubCategoryId: "",
      parentHubId: "",
      pageNumbers:pageNumbers,
      isActive:ActiveSwitch
  }

  useEffect(()=>{
   
   return()=>dispatch(clearHub())
  },[])

  useEffect(()=>{
dispatch(HubData(BodyData))
  },[pageNumbers])

  useEffect(()=>{
    dispatch(HubData(BodyData))
    
  },[ActiveSwitch])


  var data=payload?.content?.length > 0 ? payload.content.map(hubItem=>{
    return{
      isActive:hubItem?.isActive,
      code:hubItem.code ? hubItem?.code : "",
      name:hubItem.name ? hubItem?.name : "",
      hubType:hubItem.selectHubType !== null ? hubItem?.selectHubType?.text : "",
      category:hubItem.selectHubCategory !==null ? hubItem?.selectHubCategory?.text : "",
      parentHub:hubItem.selectParentHub !== null ? hubItem?.selectParentHub?.text : "",
      addressLine1:hubItem.addressLine1 ? hubItem?.addressLine1 : "",
      Ragen:hubItem.selectRegion !==null ? hubItem?.selectRegion?.text :"",
      deliver:hubItem.dropOffAllowed ? "بله" : "خیر",
      active:hubItem?.isActive === true ? "فعال" : "غیرغعال",
      editBy:hubItem.name ? hubItem?.name : "",
      EditTime:hubItem.locationStartDate !==null ? `${hubItem?.locationStartDate?.year}/${hubItem?.locationStartDate?.month}/${hubItem?.locationStartDate?.day} ` : "",
      edit:<div className="w-full centering cursor-pointer" ><BiEditAlt onClick={()=>{
        dispatch(editHub(hubItem))
       navigate("/hub/edit")
      }} size={20}/></div>,
      delete:<div className="w-full centering cursor-pointer"><BiTrash onClick={()=>{
        setdeleteItemId(hubItem?.id)
        setIsModalOpenDelete(prev=>!prev)
      }} size={20}/></div>
    }
  }) : []


const handelActionAfterDelete=()=>{
  dispatch(deleteRow(deleteItemId))
}

  return (
    <div>

     <Breadcrumb beforePage="برگشت" curentPage="هاب" />
      <NavbarSearch firstTextInput="کد قفسه" secondTextInput="کد هاب" activeChecked={ActiveSwitch}/>
      <OptionsTable
       exportExcel={() => ExportExcel(data)}
       btnLink="/hub/add"
       setIsActive={setActiveSwitch}
       isActive={ActiveSwitch}
      />
 <DeleteModal isModalOpenDelete={isModalOpenDelete} setIsModalOpenDelete={setIsModalOpenDelete} title="حذف هاب" itemId={deleteItemId} route={apiRoute().delete.hubTable} handleDeleteActionNewData={handelActionAfterDelete}/>
 {/* <MyExport data={data} columns={HubColumn}/>  */}
     <StaticTable data={data} column={HubColumn} pagination={payload?.totalElements} />
    </div>
  );
};

export default Hub;

import  { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SearchForm from '../ServiceManagement/ProductDefine/view/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import OptionTableServiceProvision from './view/OptionTableServiceProvision/OptionTableServiceProvision';
import StaticTable from './../../components/staticTable/StaticTable';
import { clearService, ServiceProvisionData } from '../../redux/ServiceProvision/ServiceProvision';
import { ServiceProvisionColumns } from '../../global/Column/Columns';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import DeleteModal from './view/DeleteModal/DeleteModal';
import {apiRoute} from "../../services/apiRoute"
import AddModalService from './view/AddModalService/AddModalService';
const ServiceProvision = () => {
  const dispatch=useDispatch()
const {serviceList} =useSelector((state:any)=>state.serviceProvision) 
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
const [deleteItemId,setdeleteItemId]=useState<number>(0)
const [isModalEdit, setIsModalEdit] = useState(false);
const [DataEditModal,setDataEditModal]=useState({})
useEffect(()=>{
  dispatch(ServiceProvisionData(pageNumbers) as any)
return()=>{
  dispatch(clearService())
}

},[])

useEffect(()=>{
  dispatch(ServiceProvisionData(pageNumbers) as any)
},[pageNumbers])

const data=serviceList?.content &&  serviceList.content.map((item:any)=>{
  return{
    id:item?.id,
    code:item?.code,
    name:item?.name,
    service:item?.service?.text,
    isActive:item?.isActive ===true ? "فعال" : "غیر فعال",
    validDateFrom:<span>{`${item?.validDateFrom.year}/${item?.validDateFrom.month}/${item?.validDateFrom.day}`}</span>,
    validDateTo:<span>{`${item?.validDateTo?.year}/${item?.validDateTo?.month}/${item?.validDateTo?.day}`}</span>,
    type:item?.type?.text,
    handover:<div className='flex justify-center items-center gap-x-2'><span className='cursor-pointer'><BiEditAlt size={20} onClick={()=>{
     
      setDataEditModal(item)
      setIsModalEdit(prev=>!prev)

    }}/></span> 
    
    <span className='cursor-pointer'><BiTrash size={20} onClick={()=>{
      setdeleteItemId(item?.id)
      setIsModalOpenDelete(prev=>!prev)
    }}/></span></div>
  }
})

const handelActionAfterDelete=()=>{
  dispatch(ServiceProvisionData(pageNumbers) as any)
}


const {isUpdating}=useSelector((state:any)=>state.serviceProvision)

  const [isActive, setIsACtive] = useState(true);
  return (
    <div>
      <Breadcrumb beforePage="مدیریت سرویس" curentPage="ارایه سرویس" />
      <SearchForm isActive={isActive} isUpdating={isUpdating} />
      <OptionTableServiceProvision/>
<DeleteModal isModalOpenDelete={isModalOpenDelete} setIsModalOpenDelete={setIsModalOpenDelete} title="حذف سرویس" itemId={deleteItemId} route={apiRoute().post.service_provision + `/${deleteItemId}`} handleDeleteActionNewData={handelActionAfterDelete}/>
<AddModalService setIsModalOpen={setIsModalEdit} isModalOpen={isModalEdit} currentData={DataEditModal}/>
<StaticTable 
data={data ? data : []}
column={ServiceProvisionColumns}
pagination={serviceList?.totalElements}
selectable={false}

/>
    </div>
  )
}

export default ServiceProvision
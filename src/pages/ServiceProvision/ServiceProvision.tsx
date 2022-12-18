import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SearchForm from '../ServiceManagement/ProductDefine/view/SearchForm';
import { useDispatch, useSelector } from 'react-redux';
import OptionTableServiceProvision from './view/OptionTableServiceProvision/OptionTableServiceProvision';
import StaticTable from './../../components/staticTable/StaticTable';
import { clearService, ServiceProvisionData } from '../../redux/ServiceProvision/ServiceProvision';
import { ServiceProvisionColumns } from '../../global/Column/Columns';
import { BiEditAlt, BiTrash } from 'react-icons/bi';

const ServiceProvision = () => {
  const dispatch=useDispatch()
const {serviceList} =useSelector((state:any)=>state.serviceProvision) 
const {pageNumbers} =useSelector((state:any)=>state.paginate)



useEffect(()=>{
  dispatch(ServiceProvisionData(pageNumbers) as any)
return()=>{
  dispatch(clearService())
}

},[])

useEffect(()=>{
  dispatch(ServiceProvisionData(pageNumbers) as any)
},[pageNumbers])

const data= serviceList?.content ? serviceList?.content.map((item:any)=>{
  return{
    code:item?.code ? item?.code :"",
    name:item?.name ? item?.name :"",
    service:item?.service ? item?.service :"",
    isActive:item?.isActive ? item?.isActive :"",
    validDateForm:item?.validDateFrom ? item?.validDateFrom :"",
    validDateTo:item?.validDateTo ? item?.validDateTo :"",
    type:item?.type ? item?.type :"",
    handover:<div><span><BiEditAlt size={20}/></span> <span></span><BiTrash size={20}/></div>

  }
}) : []


const {isUpdating}=useSelector((state:any)=>state.serviceProvision)

  const [isActive, setIsACtive] = useState(true);
  return (
    <div>



      <Breadcrumb beforePage="مدیریت سرویس" curentPage="ارایه سرویس" />
      <SearchForm isActive={isActive} isUpdating={isUpdating} />
      <OptionTableServiceProvision/>

<StaticTable
data={data}
column={ServiceProvisionColumns}
pagination={serviceList.totalElements}
selectable={false}
/>
    </div>
  )
}

export default ServiceProvision
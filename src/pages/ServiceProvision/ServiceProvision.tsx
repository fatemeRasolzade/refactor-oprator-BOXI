import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SearchForm from '../ServiceManagement/ProductDefine/view/SearchForm';
import { useSelector } from 'react-redux';
import OptionTableServiceProvision from './view/OptionTableServiceProvision/OptionTableServiceProvision';
import StaticTable from './../../components/staticTable/StaticTable';
const ServiceProvision = () => {


const {isUpdating}=useSelector((state:any)=>state.serviceProvision)

  const [isActive, setIsACtive] = useState(true);
  return (
    <div>
      <Breadcrumb beforePage="مدیریت سرویس" curentPage="ارایه سرویس" />
      <SearchForm isActive={isActive} isUpdating={isUpdating} />
      <OptionTableServiceProvision/>

{/* <StaticTable
data
column
pagination
/> */}
    </div>
  )
}

export default ServiceProvision
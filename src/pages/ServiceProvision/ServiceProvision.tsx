import React, { useState } from 'react'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import SearchForm from '../ServiceManagement/ProductDefine/view/SearchForm';
import { useSelector } from 'react-redux';
import OptionsTable from '../../components/OptionsTable/OptionsTable';
import { ExportExcel } from './../../tools/functions/Methods';
import StaticTable from './../../components/staticTable/StaticTable';
const ServiceProvision = () => {


const {isUpdating}=useSelector((state:any)=>state.serviceProvision)

  const [isActive, setIsACtive] = useState(true);
  return (
    <div>
      <Breadcrumb beforePage="مدیریت سرویس" curentPage="ارایه سرویس" />
      <SearchForm isActive={isActive} isUpdating={isUpdating} />
      <OptionsTable
     
       //exportExcel={() => ExportExcel(payload?.content)}
      // handelSwitch={handelEventSwitch}
    />

{/* <StaticTable
data
column
pagination
/> */}
    </div>
  )
}

export default ServiceProvision
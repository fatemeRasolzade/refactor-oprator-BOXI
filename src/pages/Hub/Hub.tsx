import React from 'react'
import Breadcrumb from './../../components/Breadcrumb/Breadcrumb';
import NavbarSearch from './../../components/NavbarSearch/NavbarSearch';
import OptionsTable from './../../components/OptionsTable/OptionsTable';
import Table from './../../components/Table/Table';
const Hub = () => {


  return (
    <div>
<Breadcrumb beforePage="برگشت" curentPage="هاب"/>
<NavbarSearch firstTextInput='کد قفسه' secondTextInput='کد هاب'/>
<OptionsTable/>
<Table/> 


    </div>
  )
}

export default Hub
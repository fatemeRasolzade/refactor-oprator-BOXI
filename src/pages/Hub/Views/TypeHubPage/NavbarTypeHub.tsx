import React, { useState,useEffect } from 'react'
import AutocompleteInput from '../../../../global/Autocomplete/AutocompleteInput'
import {ErrorMessage, Formik,useFormik} from "formik"
import SimpleButton from '../../../../global/SimpleButton/SimpleButton';
import { FiSearch } from 'react-icons/fi';
import PerfetionalSearchHubType from './PerfetionalSearchHubType';
import { useDispatch, useSelector } from 'react-redux';
import { filterTable, HubTypeData } from '../../../../redux/HubData/TypeHub';
import Chip from '../../../../global/Chip/Chip';

const NavbarTypeHub = () => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({});
  const {pageNumbers} =useSelector((state:any)=>state.paginate)
  const formik=useFormik({
    initialValues:{
      name:"",
        code: "",
        description:""
  },
  onSubmit: (values) => {
    console.log(values)
    dispatch(HubTypeData({...values,pageNumbers}) as any)
    setFilterData(values);
  },

  })




  return (
    <div className="flex justify-start items-start">
      <div>
    <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
  <div>
  <AutocompleteInput
      label={"عنوان"}
      items={[]}
      value={formik.values.name}
      onChange={(e) => formik.setFieldValue("name", e.target.value)}
      onSelect={(val: any) => formik.setFieldValue( "name",val,)}
    />

  </div>
   
  
    <SimpleButton
      type={'submit'}
      className="full-gray-btn"
      icon={<FiSearch size={25} className="text-darkGray" />}
      text="جستجو"
    />
  </form>

  <div>{filterData && <Chip filterData={filterData} formData={formik} />}</div>
  

        
      </div>

      <div>
      <PerfetionalSearchHubType formiks={formik}/>
      </div>

    </div>
  )
}

export default NavbarTypeHub
import React, { useState } from 'react'
import AutocompleteInput from '../../../../global/Autocomplete/AutocompleteInput'
import {ErrorMessage, Formik} from "formik"
import SimpleButton from '../../../../global/SimpleButton/SimpleButton';
import { FiSearch } from 'react-icons/fi';
import * as Yup from "yup"
import PerfetionalSearchHubType from './PerfetionalSearchHubType';
const NavbarTypeHub = () => {


    const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);

  return (
    <div>
      <div className="flex justify-start items-center flex-wrap">
        <Formik
        initialValues={{
            name:""
        }}
        validationSchema={Yup.object().shape({name:Yup.string().required("پر کردن فیلد الزامی است")})}
        
        onSubmit={(values)=>{
            console.log(values)
        }}
        
        >

    {(formik)=>(
    <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
  <div>
  <AutocompleteInput
      label={"عنوان"}
      items={[]}
      value={formik.values.name}
      onChange={(e) => formik.setFieldValue("name", e.target.value)}
      onSelect={(val: any) => formik.setFieldValue( "name",val,)}
    />
<ErrorMessage name='name' component="div" className="text-tomato"/>
  </div>
   
  
    <SimpleButton
      type={'submit'}
      className="full-gray-btn"
      icon={<FiSearch size={25} className="text-darkGray" />}
      text="جستجو"
    />
  </form>
    )}

        </Formik>


<PerfetionalSearchHubType/>


    
      </div>



    </div>
  )
}

export default NavbarTypeHub
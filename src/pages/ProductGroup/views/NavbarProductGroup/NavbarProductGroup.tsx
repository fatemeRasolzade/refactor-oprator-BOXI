import React from 'react'
import {Formik} from "formik"
import AutocompleteInput from './../../../../global/Autocomplete/AutocompleteInput';
import SimpleButton from './../../../../global/SimpleButton/SimpleButton';
import { FiSearch } from 'react-icons/fi';
const NavbarProductGroup = () => {
  return (
    <div>
        <Formik
        initialValues={{
            code:"",
            name:""


        }}
        onSubmit={(values)=>{
console.log(values)
        }}
        
        
        >

        {(formik)=>(
<div className='flex-start-center gap-2 flex-wrap'>


<AutocompleteInput
      label={"کد"}
      items={[]}
      value={formik.values.code}
      onChange={(e) => formik.setFieldValue("code", e.target.value)}
      onSelect={(val: any) => formik.setFieldValue( "code",val,)}
    />


<AutocompleteInput
      label={"عنوان"}
      items={[]}
      value={formik.values.name}
      onChange={(e) => formik.setFieldValue("name", e.target.value)}
      onSelect={(val: any) => formik.setFieldValue( "name",val,)}
    />
 <SimpleButton
      type={'submit'}
      className="full-gray-btn mb-3"
      icon={<FiSearch size={25} className="text-darkGray" />}
      text="جستجو"
      handelClick={formik.handleSubmit as any}
    />
   
</div>

        )}
         </Formik>

    </div>
  )
}

export default NavbarProductGroup
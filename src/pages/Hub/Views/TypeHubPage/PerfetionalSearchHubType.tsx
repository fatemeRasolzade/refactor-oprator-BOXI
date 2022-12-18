import { Formik } from 'formik'
import React, { useState } from 'react'
import PerfesionalSearch from '../../../../components/PerfesionalSearch/PerfesionalSearch'
import InputSelect from '../../../../global/InputSelect/InputSelect'
import InputText from '../../../../global/InputText/InputText'
import ModalPerfetional from '../ModalPerfetional/ModalPerfetional'

const PerfetionalSearchHubType = () => {

    const[active,setActive]=useState(false)
    const perfetionalClik=()=>{
        setActive(prev=>!prev)
      }


  return (
    <div>
        <Formik
initialValues={{
code:"",
detail:""

}}

onSubmit={(values)=>{
console.log(values)
}}
>
  {(formik)=>(
    <form onSubmit={formik.handleSubmit}>
    <PerfesionalSearch formData={formik.handleSubmit} perfetionalClik={perfetionalClik}>
            <div className="grid grid-cols-2 gap-3">
             <InputText label="کد" name="code" handleChange={formik.handleChange} values={formik.values.code} important/>
             <InputText label="توضیحات" name="detail" handleChange={formik.handleChange} values={formik.values.detail} important/>

            </div>
      </PerfesionalSearch> 
      </form>
  )}
      

      </Formik>


      <ModalPerfetional open={active} handleOpen={setActive}/>


    </div>
  )
}

export default PerfetionalSearchHubType
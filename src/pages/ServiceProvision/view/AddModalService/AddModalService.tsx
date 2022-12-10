import React from 'react'
import { BiXCircle } from 'react-icons/bi';
import { Formik,ErrorMessage} from "formik";
import InputText from '../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';

const AddModalService = () => {





  return (
    <div className='w-full'>
     <Formik
     initialValues={{
        title:"",
        code:"",
        service:""

     }}
     onSubmit={()=>{

     }}
     >
{(formik)=>(
<form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-2 mt-5">
<div className='col-span-2'><InputText label='عنوان' name="title" handleChange={formik.handleChange} values={formik.values.title} important type={"text"} classNames="!w-full min-w-0"/>
 <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div>
 <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} classNames="!w-full min-w-0"/>
 <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div>
{/* <div><CustomSwitch active='فعال' deactive='غیر فعال'/></div> */}
<div className='col-span-2'><InputText label='سرویس' name="service" handleChange={formik.handleChange} values={formik.values.service} important type={"text"} classNames="!w-full min-w-0"/>
 <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div>


</form>


)}
     </Formik>



    </div>
  )
}

export default AddModalService
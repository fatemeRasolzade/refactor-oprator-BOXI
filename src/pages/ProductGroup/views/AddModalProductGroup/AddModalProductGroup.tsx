import { Dialog } from '@material-tailwind/react'
import { BiXCircle } from 'react-icons/bi';
import {Formik} from "formik"
import InputText from './../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';
const AddModalProductGroup = ({isModalOpen,setIsModalOpen}:{isModalOpen:boolean,setIsModalOpen?:any}) => {
  return (
     <Dialog
    open={isModalOpen}
    handler={setIsModalOpen}
   
    size={"lg"}
  >
<div className='p-3'>

    <div className='flex justify-between items-center p-2'>
    <h5>تعریف گروه محصول</h5>
    <span onClick={setIsModalOpen} className="cursor-pointer"><BiXCircle size={20} /></span>
    </div>
<div className='w-full'>
<Formik
initialValues={{
code:"",
name:"",
isActive:true,
description:""

}}
onSubmit={(values)=>{

}}

>
{(formik)=>(
<form >

<div>
<InputText label='عنوان' wrapperClassName='w-full' name="name" handleChange={formik.handleChange} important values={formik.values.name} error={formik.touched.name && formik.errors.name}/>
</div>
<div>
<InputText label='عنوان' wrapperClassName='w-full' name="name" handleChange={formik.handleChange} important values={formik.values.name} error={formik.touched.name && formik.errors.name}/>
</div>
<div>
    <CustomSwitch active={formik.values.isActive} handleChange={(checked: any) =>formik.setFieldValue("isActive", checked)}/>
</div>


</form>
)}

</Formik>

</div>


</div>



    </Dialog>
  )
}

export default AddModalProductGroup
import { Button, Dialog } from '@material-tailwind/react'
import { BiXCircle } from 'react-icons/bi';
import {Formik} from "formik"
import InputText from './../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';
import MultiLineText from '../../../../global/MultiLineText/MultiLineText';
import * as Yup from "yup"
import { PutWithHeader } from './../../../../services/Service_call';
import { apiRoute } from '../../../../services/apiRoute';
import { ErrorAlert, SuccessAlert } from './../../../../global/alert/Alert';
import { useDispatch } from 'react-redux';
import { ProductGroupsData } from '../../../../redux/ProductGroup/ProductGroup';
import Modal from '../../../../global/Modal/Modal';

const EditModalProductGroup = ({isModalOpen,setIsModalOpen,dataInput,bodyProduct}:{isModalOpen:boolean,setIsModalOpen?:any,dataInput:any,bodyProduct?:object}) => {


    const validationSchema=Yup.object({
        name:Yup.string().required("عنوان را وارد کنید"),
        code:Yup.number().required("کد را وارد کنید"),
        description:Yup.string(),
    })

    const dispatch=useDispatch()

  return (
    <Modal visible={isModalOpen} setVisible={setIsModalOpen} title="ویرایش گروه محصول">
<div className='p-3'>

   
<div className='w-full'>
<Formik
enableReinitialize={true}
initialValues={{
  id:dataInput?.id,
code:dataInput.code ? dataInput.code : "",
name:dataInput.name ? dataInput.name : "",
isActive:dataInput?.isActive,
description:dataInput.description ? dataInput.description : ""

}}
validationSchema={validationSchema}
onSubmit={(values)=>{

 PutWithHeader(apiRoute().post.Product_Group,values).then(res=>{
  setIsModalOpen(false)
  if(res.status==="OK"){
    SuccessAlert('با موفقیت ویرایش شد')
    dispatch(ProductGroupsData(bodyProduct) as any)
  }else{
    ErrorAlert("با خطا مواجه شد")
  }
 })



 console.log(values)
}}

>
{(formik)=>(
<form className='w-full grid grid-cols-2 gap-2' onSubmit={formik.handleSubmit}>

<div>
<InputText label='کد' wrapperClassName='w-full' name="code" handleChange={formik.handleChange} important values={formik.values.code} error={formik.touched.code && formik.errors.code}/>
</div>
<div className='col-span-2'>
<InputText label='عنوان' wrapperClassName='w-full ' name="name" handleChange={formik.handleChange} important values={formik.values.name} error={formik.touched.name && formik.errors.name}/>
</div>



<div>
    <CustomSwitch active={formik.values.isActive} handleChange={(checked: any) =>formik.setFieldValue("isActive", checked)}/>
</div>

<div className='col-span-4'>
    <MultiLineText label='توضیحات' values={formik.values.description} handleChange={formik.handleChange} name="description" error={formik.touched.description && formik.errors.description} />
</div>



<div className='mt-2 flex justify-end items-center col-span-4'>
        <Button
           onClick={()=>setIsModalOpen((prev:boolean)=>!prev)}
            className="ml-2 text-dark bg-lightTomato"
          >
            <span>لغو</span>
          </Button>
          <Button type='submit'   className="!bg-tomato text-white">
            <span>ذخیره</span>
          </Button>

        </div>

</form>
)}

</Formik>

</div>


</div>



    </Modal>
  )
}

export default EditModalProductGroup
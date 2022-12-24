import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React,{memo} from 'react'
import { BiXCircle } from 'react-icons/bi'
import InputText from '../../../../global/InputText/InputText'
import { ErrorMessage, useFormik ,Formik} from 'formik';
import { apiRoute } from './../../../../services/apiRoute';
import * as Yup from "yup"
import { postDataHeaderToServer, PutWithHeader } from '../../../../services/Service_call';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import {HubTypeData } from '../../../../redux/HubData/TypeHub';
const EditModalTypeHub = ({open,handleOpen,dataEdit}:{open:boolean,handleOpen:React.Dispatch<React.SetStateAction<boolean>>,dataEdit?:any}) => {

const dispatch=useDispatch()
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const validationSchema=Yup.object({
    name:Yup.string().required("عنوان را وارد کنید"),
    code:Yup.number().required("کد را وارد کنید"),
    description:Yup.string().required("توضیحات را وارد کنید"),
})

const BodyData={
  code:"",
  name:"",
  description:"",
  pageNumbers:pageNumbers
}

  return (

    <>
    <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size={'md'}
      >
        <DialogHeader>
            <div className='flex-between-center w-full'>
            <h6 className='text-sm'>شخصی سازی</h6>
            <span  onClick={()=>handleOpen((prev:boolean)=>!prev)} className="cursor-pointer"><BiXCircle size={20}/></span>
               
            </div>
        </DialogHeader>
        <DialogBody divider>
            {/* modal form */}
        <Formik
        
        initialValues={{
          id:dataEdit?.id,
          name:dataEdit?.name ? dataEdit?.name : "",
          code:dataEdit?.code ? dataEdit?.code : "",
          description:dataEdit?.description ? dataEdit?.description : ""
        }}
             onSubmit={(values)=>{
      PutWithHeader(apiRoute().edit.Edithub_category,values).then(res=>{
       
        if(res.status==="OK"){
          SuccessAlert("با موفقیت ویرایش شد")
          dispatch(HubTypeData(BodyData) as any)
         }else{
          ErrorAlert("با خطا مواجه شد")
        }
  
       })

   }}
        
        >

          {(formik)=>(

<form onSubmit={formik.handleSubmit} className="w-full">
<div className='grid grid-cols-2 gap-4 w-full'>
    <div>
    <InputText label='عنوان' wrapperClassName='w-full' name="name" handleChange={formik.handleChange} important values={formik.values.name} error={formik.touched.name && formik.errors.name}/>
    
    </div>
   <div>
   <InputText label='کد' wrapperClassName='w-full' name="code" handleChange={formik.handleChange} important values={formik.values.code} error={formik.touched.code && formik.errors.code}/>
   </div>
    <div className='col-span-2'>
    <InputText label='توضیحات' wrapperClassName='w-full' name='description' handleChange={formik.handleChange} important values={formik.values.description} error={formik.touched.description && formik.errors.description}/>
    </div>




</div>

<div className='mt-2 flex justify-end items-center'>
<Button
onClick={()=>handleOpen((prev:boolean)=>!prev)}
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
 {/*end modal form */}
        </DialogBody>
        
      </Dialog>
      </>
  )
}

export default memo(EditModalTypeHub)
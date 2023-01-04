import { Button, Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { BiXCircle } from 'react-icons/bi'
import InputText from '../../../../global/InputText/InputText'
import {useFormik } from 'formik';
import { apiRoute } from './../../../../services/apiRoute';
import * as Yup from "yup"
import { postDataHeaderToServer } from '../../../../services/Service_call';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { HubTypeData } from '../../../../redux/HubData/TypeHub';
import Modal from '../../../../global/Modal/Modal';
const AddModalTable = ({open,handleOpen}:{open:boolean,handleOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {

const dispatch=useDispatch()
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const validationSchema=Yup.object({
    name:Yup.string().required("عنوان را وارد کنید"),
    code:Yup.number().required("کد را وارد کنید")
  })



const formok=useFormik({
    initialValues:{
        name:"",
        code:"",
        description:""
    },
    validationSchema,
     onSubmit:(values)=>{
     
      postDataHeaderToServer(apiRoute().post.Type_Hub_table,values)
     .then(res=>{
      handleOpen(false)
      if(res.status==="OK"){
        handleOpen(false)
        SuccessAlert("با موفقیت ساخته شد")
        dispatch(HubTypeData({pageNumbers:pageNumbers}) as any)
       }else{
        ErrorAlert("با خطا مواجه شد")
      }

     })
    }
})



  return (
    <Modal visible={open} setVisible={handleOpen} title="اضافه  گونه هاب">
      
            {/* modal form */}
      
            <form onSubmit={formok.handleSubmit} className="w-full">
            <div className='grid grid-cols-2 gap-4 w-full'>
                <div>
                <InputText label='عنوان' wrapperClassName='w-full' name="name" handleChange={formok.handleChange} important values={formok.values.name} error={formok.touched.name && formok.errors.name}/>
                
                </div>
               <div>
               <InputText label='کد' wrapperClassName='w-full' name="code" handleChange={formok.handleChange} important values={formok.values.code} error={formok.touched.code && formok.errors.code}/>
               </div>
                <div className='col-span-2'>
                <InputText label='توضیحات' wrapperClassName='w-full' name='description' handleChange={formok.handleChange}  values={formok.values.description}/>
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
       
 {/*end modal form */}
       
        
      </Modal>
  )
}

export default AddModalTable
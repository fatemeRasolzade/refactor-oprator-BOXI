import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { BiXCircle } from 'react-icons/bi'
import InputText from '../../../../global/InputText/InputText'
import { ErrorMessage, useFormik } from 'formik';
import { apiRoute } from './../../../../services/apiRoute';
import * as Yup from "yup"
import { postDataHeaderToServer } from '../../../../services/Service_call';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addToTableType, HubTypeData } from '../../../../redux/HubData/TypeHub';
const AddModalTable = ({open,handleOpen}:{open:boolean,handleOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {

const dispatch=useDispatch()
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const validationSchema=Yup.object({
    name:Yup.string().required("عنوان را وارد کنید"),
    code:Yup.number().required("کد را وارد کنید"),
    description:Yup.string().required("توضیحات را وارد کنید"),
})



const formok=useFormik({
    initialValues:{
        name:"",
        code:"",
        description:""
    },
    validationSchema,
     onSubmit:(values)=>{
     
      postDataHeaderToServer(apiRoute().post.Type_Hub_table,values,{ headers: { Authorization: "Bearer " + localStorage.getItem("myToken") }})
     .then(res=>{
      if(res.status==="OK"){
        SuccessAlert("با موفقیت ساخته شد")
        dispatch(HubTypeData(pageNumbers) as any)
       }else{
        ErrorAlert("با خطا مواجه شد")
      }

     })
    }
})



  return (
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
      
            <form onSubmit={formok.handleSubmit} className="w-full">
            <div className='grid grid-cols-2 gap-4 w-full'>
                <div>
                <InputText label='عنوان' wrapperClassName='w-full' name="name" handleChange={formok.handleChange} important values={formok.values.name} error={formok.touched.name && formok.errors.name}/>
                
                </div>
               <div>
               <InputText label='کد' wrapperClassName='w-full' name="code" handleChange={formok.handleChange} important values={formok.values.code} error={formok.touched.code && formok.errors.code}/>
               </div>
                <div className='col-span-2'>
                <InputText label='توضیحات' wrapperClassName='w-full' name='description' handleChange={formok.handleChange} important values={formok.values.description} error={formok.touched.description && formok.errors.description}/>
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
        </DialogBody>
        
      </Dialog>
  )
}

export default AddModalTable
import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import { Formik,ErrorMessage } from "formik";
import { Button } from '@material-tailwind/react';
import InputText from '../../../../global/InputText/InputText';
import InputSelect from '../../../../global/InputSelect/InputSelect';
import DatePickers from '../../../../global/DatePicker/DatePicker';
import Checkbox from '../../../../components/checkbox/Checkbox';
import { EditDataParams, getDataHeaderServer } from '../../../../services/Service_call';
import { apiRoute } from '../../../../services/apiRoute';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearEdit } from '../../../../redux/HubData/EditData';
const HubEdit = () => {
   
  const {editData} =useSelector((state:any)=>state.editHub)
  const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{

        function getDataSelect() {
          try {
            getDataHeaderServer(apiRoute().get.get_hub_type).then(res=>{if(res.status==="OK") settypeHub(res.payload)})
            getDataHeaderServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
            getDataHeaderServer(apiRoute().get.get_province_city).then(res=>{if(res.status==="OK") setCities(res.payload.content)})
            getDataHeaderServer(apiRoute().get.get_province_loc).then(res=>{if(res.status==="OK") setProvinceLoc(res.payload.content)})
            getDataHeaderServer(apiRoute().get.get_select_province).then(res=>{if(res.status==="OK") setSelectProvince(res.payload.content)})
            getDataHeaderServer(apiRoute().get.select_hub).then(res=>{if(res.status==="OK") setselectHub(res.payload.content)})
    
          } catch (error) {
            ErrorAlert('دریافت دیتا با خطلا مواجه شد')
          }
          
        }
        getDataSelect()

        return()=>{
          dispatch(clearEdit())
        }
    
      },[])

    const [typeHub,settypeHub]=useState([])
    const [catHub,setCatHub]=useState([])
    const [citys,setCities]=useState([])
    const [provinceLoc,setProvinceLoc]=useState([])
    const [selectProvince,setSelectProvince]=useState([])
    const [selectHub,setselectHub]=useState([])


  return (
    <>
     <Formik
    initialValues={{
      id:editData?.id,
      code: editData?.code,
      name: editData?.name,
      selectHubType: {
        id:editData?.selectHubType?.id,
        text:editData?.selectHubType?.text
      },
      selectHubCategory:{
        id:editData?.selectHubCategory?.id,
        text:editData?.selectHubCategory?.text
      },
      selectParentHub: {
        id:editData?.selectParentHub?.id,
        text:editData?.selectParentHub?.text
      },
      pinCode: editData?.pinCode,
      locationStartDate:{
        day:editData?.locationStartDate?.day,
        month:editData?.locationStartDate?.month,
        year:editData?.locationStartDate?.year
      },
      mandatoryArrivalScan:editData?.mandatoryArrivalScan,
      isActive:editData?.isActive,
      dropOffAllowed:editData?.dropOffAllowed,
      selectState:{
        id:editData?.selectState?.id,
        text:editData?.selectState?.text
      },
      selectCity:{
        id:editData?.selectCity?.id,
        text:editData?.selectCity?.text
      },
      selectRegion:{
        id:editData?.selectRegion?.id,
        text:editData?.selectRegion?.text
      },
      plateNumber:editData?.plateNumber,
      addressLine1:editData?.addressLine1,
      addressLine2:editData?.addressLine2,
      locLate: editData?.locLate,
      locLong: editData?.locLong,
     
      // fullName:"",
      // phone:"",
      // email:""
    }}
     //validationSchema={addHubschema}
    onSubmit={(values)=>{
      console.log('ttt',values)
      EditDataParams(apiRoute().post.hub,values).then(res=>{
        if(res.status==="OK"){
          SuccessAlert("با موفقیت ویرایش شد")
        }else{
          ErrorAlert("خطا در برقراری اطلاعات")
        }
      })
    }}
    >
   {(formik)=>(
     <form onSubmit={formik.handleSubmit}>
     <div className='w-11/12 grid grid-cols-5 gap-2'>
       
       <div ><InputText label='کدهاب' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full"/>
       <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
       </div>
       <div><InputText label='نام هاب' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"} wrapperClassName="!w-full"/>
       <ErrorMessage name='nameHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>

       </div>
        <div> <InputSelect label='نوع هاب' name="selectHubType" handleChange={formik.setFieldValue} values={formik.values.selectHubType} options={typeHub} wrapperClassName="!w-full"/> 
       
        <ErrorMessage name='typeHub' render={(messege)=>(<span className='text-tomato  block mt-5'>{messege}</span>)}/>
        </div>
       <div >
        <InputSelect label='گونه هاب' name="selectHubCategory" handleChange={formik.setFieldValue} values={formik.values.selectHubCategory} options={catHub} wrapperClassName="!w-full"/>
      
       </div>
        <div >
      
          <InputSelect label='هاب والد' name="selectParentHub" handleChange={formik.setFieldValue} values={formik.values.selectParentHub} options={selectHub} wrapperClassName="!w-full"/> 
       
       </div> 
       <div ><InputText label='پین کد'  name="pinCode" handleChange={formik.handleChange} values={formik.values.pinCode} type={"text"} wrapperClassName="!w-full"/>
      
       </div>
       <div ><DatePickers title='تاریخ شروع فعالیت' name="locationStartDate" handleChange={formik.setFieldValue} values={formik.values.locationStartDate}/>
       
       </div>
       <div><Checkbox title='اسکن مرسوله در ورودی هاب اجباری می باشد' name="mandatoryArrivalScan" handleChange={formik.handleChange} values={formik.values.mandatoryArrivalScan}/>
      
       </div>
       <div><Checkbox title='فعال' name="isActive" handleChange={formik.handleChange} values={formik.values.isActive}/>
      
       </div>
       <div><Checkbox title='امکان تحویل مرسوله دارد' name="dropOffAllowed" handleChange={formik.handleChange} values={formik.values.dropOffAllowed}/>
      
       </div>
      <div >
         <InputSelect label='استان' name="selectState" handleChange={formik.setFieldValue} values={formik.values.selectState} options={selectProvince} wrapperClassName="!w-full"/> 
     
      </div>
       <div >
        <InputSelect label='شهر' name="selectCity" handleChange={formik.setFieldValue} values={formik.values.selectCity} options={citys} wrapperClassName="!w-full"/> 
      
       </div>
       <div >
       <InputSelect label='منطقه' name="selectRegion" handleChange={formik.setFieldValue} values={formik.values.selectRegion} options={provinceLoc} wrapperClassName="!w-full"/> 
      
       </div> 
       <div ><InputText label='پلاک' name="plateNumber" handleChange={formik.handleChange} values={formik.values.plateNumber} type={"number"} wrapperClassName="!w-full"/>
       
       </div>
       <div ><InputText label='آدرس 1' name="addressLine1" handleChange={formik.handleChange} values={formik.values.addressLine1} type={"text"} wrapperClassName="!w-full"/>
      
       </div>
       <div className='!col-span-2 ' ><InputText label='آدرس 2' name="addressLine2" handleChange={formik.handleChange} values={formik.values.addressLine2} type={"text"} wrapperClassName="!w-full"/>
      
       </div>
       <div>نقشه</div>
 
     {/* <div className='grid col-span-5 mt-10 gap-2'>
       <div className='grid grid-cols-5 gap-3 Max-md:grid-cols-1 Max-sm:grid-cols-1 Max-xs:grid-cols-1 Max-lg:grid-cols-2'>
       <div ><InputText title='نام و نام خانوادگی' name="fullName" handleChange={formik.handleChange} values={formik.values.fullName} type={"text"}/>
      
       </div>
       <div ><InputText title='تلفن' name='phone' handleChange={formik.handleChange} values={formik.values.phone} type={"number"}/>
      
       </div>
       <div ><InputText title='پست الکترونیک' name='email' handleChange={formik.handleChange} values={formik.values.email} type={"email"}/>
      
       </div>
      </div>
     </div> */}
 
     <div className='col-span-5 flex flex-row justify-end items-center'>
       <Button className='border-none bg-secondaryColor text-dark' onClick={()=>navigate(-1)}>بازگشت</Button>
       <Button className='border-none bg-tomato mr-3' type='submit'>افزودن</Button>
 
     </div>
    
      
 </div>
 </form>
   )}
</Formik>
       
    </>
  )
}

export default HubEdit
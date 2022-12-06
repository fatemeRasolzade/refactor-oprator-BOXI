import React, { useEffect, useState } from 'react'
import {useNavigate, useLocation} from "react-router-dom"
import { Formik,ErrorMessage } from "formik";
import { Button } from '@material-tailwind/react';
import InputText from '../../../../global/InputText/InputText';
import InputSelect from '../../../../global/InputSelect/InputSelect';
import DatePickers from '../../../../global/DatePicker/DatePicker';
import Checkbox from '../../../../components/checkbox/Checkbox';
import { getDataFromServer } from '../../../../services/Service_call';
import { apiRoute } from '../../../../services/apiRoute';
import { ErrorAlert } from '../../../../global/alert/Alert';
const HubEdit = () => {
    const {state} =useLocation()
   
    const navigate=useNavigate()
    useEffect(()=>{

        function getDataSelect() {
          try {
            getDataFromServer(apiRoute().get.get_hub_type).then(res=>{if(res.status==="OK") settypeHub(res.payload)})
            getDataFromServer(apiRoute().get.select_hub_category).then(res=>{if(res.status==="OK") setCatHub(res.payload.content)})
            getDataFromServer(apiRoute().get.get_province_city).then(res=>{if(res.status==="OK") setCities(res.payload.content)})
            getDataFromServer(apiRoute().get.get_province_loc).then(res=>{if(res.status==="OK") setProvinceLoc(res.payload.content)})
            getDataFromServer(apiRoute().get.get_select_province).then(res=>{if(res.status==="OK") setSelectProvince(res.payload.content)})
            getDataFromServer(apiRoute().get.select_hub).then(res=>{if(res.status==="OK") setselectHub(res.payload.content)})
    
          } catch (error) {
            ErrorAlert('دریافت دیتا با خطلا مواجه شد')
          }
          
        }
        getDataSelect()
    
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
      code: state?.dataEdit?.code,
      name: state?.dataEdit?.name,
      selectHubType: {
        id:state?.dataEdit?.selectHubType?.id,
        text:state?.dataEdit?.selectHubType?.text
      },
      selectHubCategory:{
        id:state?.dataEdit?.selectHubCategory?.id,
        text:state?.dataEdit?.selectHubCategory?.text
      },
      selectParentHub: {
        id:state?.dataEdit?.selectParentHub.id,
        text:state?.dataEdit?.selectParentHub.text
      },
      pinCode: state?.dataEdit?.pinCode,
      locationStartDate:{
        day:state?.dataEdit?.locationStartDate?.day,
        month:state?.dataEdit?.locationStartDate?.month,
        year:state?.dataEdit?.locationStartDate?.year
      },
      mandatoryArrivalScan:state?.dataEdit?.mandatoryArrivalScan,
      isActive:state?.dataEdit?.isActive,
      dropOffAllowed:state?.dataEdit?.dropOffAllowed,
      selectState:{
        id:state?.dataEdit?.selectState?.id,
        text:state?.dataEdit?.selectState?.text
      },
      selectCity:{
        id:state?.dataEdit?.selectCity?.id,
        text:state?.dataEdit?.selectCity?.text
      },
      selectRegion:{
        id:state?.dataEdit?.selectRegion?.id,
        text:state?.dataEdit?.selectRegion?.text
      },
      plateNumber:state?.dataEdit?.plateNumber,
      addressLine1:state?.dataEdit?.addressLine1,
      addressLine2:state?.dataEdit?.addressLine2,
      locLate: state?.dataEdit?.locLate,
      locLong: state?.dataEdit?.locLong,
     
      // fullName:"",
      // phone:"",
      // email:""
    }}
     //validationSchema={addHubschema}
    onSubmit={(values)=>{
    //   PostDataParams(apiRoute().post.hub,values).then(res=>{
    //     if(res.status==="OK"){
    //       SuccessAlert("با موفقیت ساخته شد")
    //     }else{
    //       ErrorAlert("خطا در برقراری اطلاعات")
    //     }
    //   })
    }}
    >
   {(formik)=>(
     <form onSubmit={formik.handleSubmit}>
     <div className='w-11/12 grid grid-cols-5 gap-2'>
       
       <div ><InputText label='کدهاب' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"}/>
       <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
       </div>
       <div ><InputText label='نام هاب' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"}/>
       <ErrorMessage name='nameHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
       </div>
        <div> <InputSelect label='نوع هاب' name="selectHubType" handleChange={formik.setFieldValue} values={formik.values.selectHubType} options={typeHub}/> 
       
        <ErrorMessage name='typeHub' render={(messege)=>(<span className='text-tomato  block mt-5'>{messege}</span>)}/>
        </div>
       <div >
        <InputSelect label='گونه هاب' name="selectHubCategory" handleChange={formik.setFieldValue} values={formik.values.selectHubCategory} options={catHub}/>
      
       </div>
        <div >
      
          <InputSelect label='هاب والد' name="selectParentHub" handleChange={formik.setFieldValue} values={formik.values.selectParentHub} options={selectHub}/> 
       
       </div> 
       <div ><InputText label='پین کد'  name="pinCode" handleChange={formik.handleChange} values={formik.values.pinCode} type={"text"}/>
      
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
         <InputSelect label='استان' name="selectState" handleChange={formik.setFieldValue} values={formik.values.selectState} options={selectProvince}/> 
     
      </div>
       <div >
        <InputSelect label='شهر' name="selectCity" handleChange={formik.setFieldValue} values={formik.values.selectCity} options={citys}/> 
      
       </div>
       <div >
       <InputSelect label='منطقه' name="selectRegion" handleChange={formik.setFieldValue} values={formik.values.selectRegion} options={provinceLoc}/> 
      
       </div> 
       <div ><InputText label='پلاک' name="plateNumber" handleChange={formik.handleChange} values={formik.values.plateNumber} type={"number"}/>
       
       </div>
       <div ><InputText label='آدرس 1' name="addressLine1" handleChange={formik.handleChange} values={formik.values.addressLine1} type={"text"}/>
      
       </div>
       <div className='!col-span-2 ' ><InputText label='آدرس 2' name="addressLine2" handleChange={formik.handleChange} values={formik.values.addressLine2} type={"text"}/>
      
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
import React, { useState } from 'react'
import { BiXCircle } from 'react-icons/bi';
import { Formik,ErrorMessage} from "formik";
import InputText from '../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';
import DatePickers from '../../../../global/DatePicker/DatePicker';
import InputSelect from "../../../../global/InputSelect/InputSelect"
import { Button } from '@material-tailwind/react';
import SubTableForm from './SubTableForm';
import { serviceProvitionSchema } from '../validationService/validationService';
const AddModalService = ({isModal}:{isModal:React.Dispatch<React.SetStateAction<boolean>>}) => {

const [isActive,setIsActive]=useState(true)
const [subForm,setSubForm]=useState(false)

const option =[
  {id:1,text:"test"}
]
const dicountType=[
  {
    id:1,
    text:"ثابت"
  },
  {
    id:2,
    text:"محاسباتی"
  }
]

  return (
    <div className='w-full'>
     <Formik
     initialValues={{
      isActive: isActive,
      isDeleted: false,
      code: "",
      name: "",
      discountPercent:"",
      type: {
      id: 0,
      text: ""
      },
      description: "",
      validDateFrom: {
      day: "",
      month: "",
      year: ""
      },
      validDateTo: {
      day: "",
      month: "",
      year: ""
      },
      service: {
      id: 0,
      text: ""
      },
      saleschannels: [
      {
      id: 0,
      text: ""
      }
      ],
      customerSegments: [
      {
      id: 0,
      text: ""
      }
      ],
      serviceDeliveryCustomers: [
      {
      id: 0,
      text: ""
      }
      ],
      deliveryDiscounts: [
      {
      type: {
      id: 0,
      text: ""
      },
      discountFrom: "",
      discountTo: "",
      discountPercent: "",
      serviceDelivery: {
      id: 0,
      text: ""
      }
      },
      ]
      }}
      validationSchema={serviceProvitionSchema}
     onSubmit={(values)=>{
console.log(values)
     }}
     >
{(formik)=>(
<form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-2 mt-5">
<div className='col-span-2'><InputText label='عنوان' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"} wrapperClassName="!w-full"/>
 <ErrorMessage name='name' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div>

 <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
 <ErrorMessage name='code' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div>

 <div><CustomSwitch active={isActive} handleChange={()=>setIsActive(prev=>!prev)} /></div> 

<div className='col-span-2'>
  <InputSelect label='گونه هاب' name="type"
 //handleChange={formik.setFieldValue} values={formik.values.type}
  options={option} wrapperClassName="w-full"
  /></div>

<div><DatePickers name='validDateFrom'  handleChange={formik.setFieldValue} values={formik.values.validDateFrom}/>
<ErrorMessage name='validDateFrom' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
</div>
<div><DatePickers name='validDateTo'  handleChange={formik.setFieldValue} values={formik.values.validDateTo}/>
<ErrorMessage name='validDateTo' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
</div>
<div className='col-span-2'>
  <InputSelect label='مشتری' name="customerSegments" handleChange={formik.setFieldValue} values={formik.values.customerSegments} options={option} wrapperClassName="w-full" isMulti/>
  <ErrorMessage name='customerSegments' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
  </div>
<div>
  <InputSelect label='گروه مشتری' name="serviceDeliveryCustomers" handleChange={formik.setFieldValue} values={formik.values.serviceDeliveryCustomers} options={option} wrapperClassName="w-full" isMulti/>
  <ErrorMessage name='serviceDeliveryCustomers' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
  </div>
<div>
  <InputSelect label='کانال فروش' name="saleschannels" handleChange={formik.setFieldValue} values={formik.values.saleschannels} options={option} wrapperClassName="w-full" isMulti/>
  <ErrorMessage name='saleschannels' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
  </div>

<div className='col-span-4 grid grid-cols-4 gap-2'>
<div>
  <InputSelect label='نوع تخفیف' name="type" handleChange={formik.setFieldValue} values={formik.values.type} options={dicountType} wrapperClassName="w-full"/>
  <ErrorMessage name='type' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
  </div>
{
  formik.values.type.text !=="محاسباتی" ?    <div ><InputText label='درصد' name="discountPercent" handleChange={formik.handleChange} values={formik.values.discountPercent} important type={"text"} wrapperClassName="!w-full min-w-0"/>
  <ErrorMessage name='discountPercent' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/></div> : null
}


</div>


{formik.values.type.text==="محاسباتی" ? 
<div className='col-span-4 grid grid-cols-2 gap-2'>
<SubTableForm title="تعداد" formik={formik}/>
<SubTableForm title="ریال" formik={formik}/>

</div> 

: null}



<div className="col-span-5 flex flex-row justify-end items-center">
                <Button
                  className="border-none bg-secondaryColor text-dark"
                  onClick={() =>isModal(prev=>!prev)}
                >
                  بازگشت
                </Button>
                <Button className="border-none bg-tomato mr-3" type="submit">
                  افزودن
                </Button>
              </div>
</form>


)}
     </Formik>



    </div>
  )
}

export default AddModalService
import { Button } from '@material-tailwind/react'
import React from 'react'
import { BiSearch } from 'react-icons/bi'
import Checkbox from '../../../components/checkbox/Checkbox'
import DatePickers from '../../../global/DatePicker/DatePicker'
import InputText from '../../../global/Input/Input'
import InputSelect from '../../../global/InputSelect/InputSelect'
import { Formik,ErrorMessage } from "formik";
import {useNavigate} from "react-router-dom"
import { addHubschema } from '../../../global/Validation/Validation'
import Select from 'react-select'
const HubAdd = () => {
  const options:any = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const navigate=useNavigate()

 

  return (
<>
    <Formik
    initialValues={{
      codeHub: "test",
      nameHub: "",
      typeHub: "select",
      catHub: "",
      parentHub: "",
      pinHub: "",
      dateHub:"",
      scanProduct:false,
      active:false,
      deliver:false,
      province:"",
      city:"",
      state:"",
      Plaque:"",
      addressOne:"",
      addressTwo:"",
      map:"",
      fullName:"",
      phone:"",
      email:""
    }}
    validationSchema={addHubschema}
    onSubmit={(values)=>console.log(values)}
    >
   {(formik)=>(
     <form onSubmit={formik.handleSubmit}>
     <div className='w-11/12 grid grid-cols-5 gap-2'>
       
       <div ><InputText title='کدهاب' name="codeHub" handelChange={formik.handleChange} values={formik.values.codeHub}/>
       <ErrorMessage name='codeHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
       </div>
       <div ><InputText title='نام هاب' name="nameHub" handelChange={formik.handleChange} values={formik.values.nameHub}/>
       <ErrorMessage name='nameHub' render={(messege)=>(<span className='text-tomato'>{messege}</span>)}/>
       </div>
        <div>
        
          <InputSelect text='نوع هاب' name="typeHub" handelChange={formik.setFieldValue} values={formik.values.typeHub}/>
       
        <ErrorMessage name='typeHub' render={(messege)=>(<span className='text-tomato  block mt-5'>{messege}</span>)}/>
        </div>
       <div ><InputSelect text='گونه هاب' name="catHub" handelChange={formik.handleChange} values={formik.values.catHub}/>
      
       </div>
       <div ><InputSelect text='هاب والد' name="parentHub" handelChange={formik.handleChange} values={formik.values.parentHub}/>
       
       </div> 
       <div ><InputText title='پین کد'  name="pinHub" handelChange={formik.handleChange} values={formik.values.pinHub}/>
      
       </div>
       <div ><DatePickers title='تاریخ شروع فعالیت' name="dateHub" handelChange={formik.handleChange} values={formik.values.dateHub}/>
       
       </div>
       <div><Checkbox title='اسکن مرسوله در ورودی هاب اجباری می باشد' name="scanProduct" handelChange={formik.handleChange} values={formik.values.scanProduct}/>
      
       </div>
       <div><Checkbox title='فعال' name="active" handelChange={formik.handleChange} values={formik.values.active}/>
      
       </div>
       <div><Checkbox title='امکان تحویل مرسوله دارد' name="deliver" handelChange={formik.handleChange} values={formik.values.deliver}/>
      
       </div>
      <div ><InputSelect text='استان' name="province" handelChange={formik.handleChange} values={formik.values.province}/>
     
      </div>
       <div ><InputSelect text='شهر' name="city" handelChange={formik.handleChange} values={formik.values.city}/>
      
       </div>
       <div ><InputSelect text='منطقه' name="state" handelChange={formik.handleChange} values={formik.values.state}/>
      
       </div> 
       <div ><InputText title='پلاک' name="Plaque" handelChange={formik.handleChange} values={formik.values.Plaque}/>
       
       </div>
       <div ><InputText title='آدرس 1' name="addressOne" handelChange={formik.handleChange} values={formik.values.addressOne}/>
      
       </div>
       <div className='!col-span-2 ' ><InputText title='آدرس 2' name="addressTwo" handelChange={formik.handleChange} values={formik.values.addressTwo}/>
      
       </div>
       <div>نقشه</div>
 
     <div className='grid col-span-5 mt-10 gap-2'>
       <div className='grid grid-cols-5 gap-3 Max-md:grid-cols-1 Max-sm:grid-cols-1 Max-xs:grid-cols-1 Max-lg:grid-cols-2'>
       <div ><InputText title='نام و نام خانوادگی' name="fullName" handelChange={formik.handleChange} values={formik.values.fullName}/>
      
       </div>
       <div ><InputText title='تلفن' name='phone' handelChange={formik.handleChange} values={formik.values.phone}/>
      
       </div>
       <div ><InputText title='پست الکترونیک' name='email' handelChange={formik.handleChange} values={formik.values.email}/>
      
       </div>
      </div>
     </div>
 
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

export default HubAdd
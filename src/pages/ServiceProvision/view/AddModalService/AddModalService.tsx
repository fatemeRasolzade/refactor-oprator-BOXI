import React, { useEffect, useState } from 'react'
import { BiXCircle } from 'react-icons/bi';
import { Formik,ErrorMessage,useFormik} from "formik";
import InputText from '../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';
import DatePickers from '../../../../global/DatePicker/DatePicker';
import InputSelect from "../../../../global/InputSelect/InputSelect"
import { Button } from '@material-tailwind/react';
import { serviceProvitionSchema } from '../validationService/validationService';
import { postDataHeaderToServer, selectDataFromServerWithHeader } from '../../../../services/Service_call';
import { apiRoute } from '../../../../services/apiRoute';
import { ErrorAlert } from '../../../../global/alert/Alert';
import MultiSelect from '../../../../global/multiselect/MultiSelect';
import SubTableFormTwo from './SubTableFormTwo';
import SubTableOne from './SubTableOne';
const AddModalService = ({isModal}:{isModal:React.Dispatch<React.SetStateAction<boolean>>}) => {

const [isActive,setIsActive]=useState(true)
const [subForm,setSubForm]=useState(false)
const [deliveryDiscountsState,setdeliveryDiscountsState]=useState([])
const [ChanelSale,setChanelSale]=useState([])
const [DeliveryService,setDeliveryService]=useState([])
const [SegmentCustomer,setSegmentCustomer]=useState([])
const [catHub, setCatHub] = useState([]);
useEffect(()=>{
  selectDataFromServerWithHeader(apiRoute().get.Filter_saleschannel).then(res=>{
    if(res.status==="OK"){setChanelSale(res.payload)}else{ErrorAlert("دیتای کانال فروش بارگزاری نشد")}
  })
  selectDataFromServerWithHeader(apiRoute().get.Fliter_customerSegment).then(res=>{
    if(res.status==="OK"){setSegmentCustomer(res.payload)}else{ErrorAlert("دیتای کانال فروش بارگزاری نشد")}
  })
  selectDataFromServerWithHeader(apiRoute().get.Filter_servicedeliverycustomers).then(res=>{
    if(res.status==="OK"){setDeliveryService(res.payload)}else{ErrorAlert("دیتای کانال فروش بارگزاری نشد")}
  })
  selectDataFromServerWithHeader(apiRoute().get.select_hub_category).then((res) => {
    if (res.status === "OK") setCatHub(res.payload.content);
  });

},[])



const dicountType=[
  {
    id:0,
    text:"ثابت"
  },
  {
    id:1,
    text:"محاسباتی"
  }
]

const formik=useFormik({
  initialValues:{
    code:"",
    type:{
        id: "",
        text: ""
    },
    name:"",
    description:"",
    validDateFrom:{
       day: "",
       month: "",
       year: ""
       },
    validDateTo:{
       day: "",
       month: "",
       year: ""
       },
    deliveryDiscounts:deliveryDiscountsState,
    service:null,
    customerSegments:null,
    serviceDeliveryCustomers:null,
    saleschannels:null,
    discountPercent:"",
    isActive:isActive
    },
    // validationSchema:{serviceProvitionSchema},
    onSubmit:(values)=>{
console.log(values)
    }
})

  return (
    <div className='w-full'>
 
<form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-2 mt-5">
<div className='col-span-2'><InputText label='عنوان' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"} wrapperClassName="!w-full"/></div>
 

 <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
</div>

 <div><CustomSwitch active={isActive} handleChange={()=>setIsActive(prev=>!prev)} /></div> 

<div className='col-span-2'>
  <InputSelect label='سرویس' name="service"
 handleChange={formik.setFieldValue} values={formik.values.service}
  options={catHub} wrapperClassName="w-full"
  error={formik.touched.service && formik.errors.service}
  /></div>

<div><DatePickers name='validDateFrom'  handleChange={formik.setFieldValue} values={formik.values.validDateFrom} title="تاریخ اعتبار از"/>
</div>
<div><DatePickers name='validDateTo'  handleChange={formik.setFieldValue} values={formik.values.validDateTo} title="تاریخ اعتبار تا"/>
</div>
<div className='col-span-2'>

<MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label='مشتری'
          name="customerSegments"
          handleChange={formik.setFieldValue}
          values={formik.values.customerSegments}
          options={SegmentCustomer}
          error={
            formik.touched.customerSegments && formik.errors.customerSegments
          }
        />
  
  </div>
<div>
<MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label='گروه مشتری'
          name="serviceDeliveryCustomers"
          handleChange={formik.setFieldValue}
          values={formik.values.serviceDeliveryCustomers}
          options={DeliveryService}
          error={
            formik.touched.serviceDeliveryCustomers && formik.errors.serviceDeliveryCustomers
          }
        />
  </div>
<div>
<MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label="کانال فروش"
          name="saleschannels"
          handleChange={formik.setFieldValue}
          values={formik.values.saleschannels}
          options={ChanelSale}
          error={
            formik.touched.saleschannels && formik.errors.saleschannels
          }
        />
   </div>

<div className='col-span-4 grid grid-cols-4 gap-2'>
<div>
  <InputSelect label='نوع تخفیف' name="type" handleChange={formik.setFieldValue} values={formik.values.type} options={dicountType} wrapperClassName="w-full"/>
  
  </div>
{
  formik.values.type.text ==="ثابت" ? <div ><InputText label='درصد' name="discountPercent" handleChange={formik.handleChange} values={formik.values.discountPercent} important type={"text"} wrapperClassName="!w-full min-w-0"/></div> : null
}


</div>



</form>




     {formik.values.type.text==="محاسباتی" ? 
<div className='col-span-4 grid grid-cols-2 gap-2'>
<SubTableOne title="تعداد" setdeliveryDiscountsState={setdeliveryDiscountsState} deliveryDiscountsState={deliveryDiscountsState}/>
<SubTableFormTwo title="ریال"/>

</div> 

: null}


<div className="col-span-5 flex flex-row justify-end items-center mt-3">
                <Button
                  className="border-none bg-secondaryColor text-dark"
                  onClick={() =>isModal(prev=>!prev)}
                >
                  بازگشت
                </Button>
                <Button className="border-none bg-tomato mr-3" type="submit" onClick={()=>formik.handleSubmit}>
                  افزودن
                </Button>
              </div>
    </div>
  )
}

export default AddModalService
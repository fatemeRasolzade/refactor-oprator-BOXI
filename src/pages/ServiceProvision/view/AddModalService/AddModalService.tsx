import React, { useEffect, useState } from 'react'
import { BiXCircle } from 'react-icons/bi';
import { Formik} from "formik";
import InputText from '../../../../global/InputText/InputText';
import CustomSwitch from '../../../../global/Switch/Switch';
import DatePickers from '../../../../global/DatePicker/DatePicker';
import InputSelect from "../../../../global/InputSelect/InputSelect"
import { Button, Dialog } from '@material-tailwind/react';
// import { serviceProvitionSchema } from '../validationService/validationService';
import {  postDataHeaderToServer, selectDataFromServerWithHeader,PutWithHeader } from '../../../../services/Service_call';
import { apiRoute } from '../../../../services/apiRoute';
import { ErrorAlert, SuccessAlert } from '../../../../global/alert/Alert';
import MultiSelect from '../../../../global/multiselect/MultiSelect';
import SubTableFormTwo from './SubTableFormTwo';
import SubTableOne from './SubTableOne';
import {useDispatch,useSelector} from "react-redux"
import { clearService, ServiceProvisionData } from '../../../../redux/ServiceProvision/ServiceProvision';
const AddModalService = ({setIsModalOpen,isModalOpen,currentData}:{setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>,isModalOpen?:any,currentData?:any}) => {
const dispatch=useDispatch()
const {pageNumbers} =useSelector((state:any)=>state.paginate)
const [isActive,setIsActive]=useState(true)
const [ChanelSale,setChanelSale]=useState([])
const [DeliveryService,setDeliveryService]=useState([])
const [SegmentCustomer,setSegmentCustomer]=useState([])
const [ServiceList, setServiceList] = useState([]);
const [deliveryTableOne,setdeliveryTableOne]=useState([])
const [deleveryTableTwo,setdeleveryTableTwo]=useState([])



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
  selectDataFromServerWithHeader(apiRoute().get.Fliter_Service).then((res) => {
    if (res.status === "OK") setServiceList(res.payload);
  });


return()=>{
  dispatch(clearService())
  setChanelSale([])
  setDeliveryService([])
  setSegmentCustomer([])
}

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


  return (
<>
    <Dialog open={isModalOpen} handler={setIsModalOpen} className="p-5 !w-[80%] max-w-[60%] overflow-visible">
    <div className='flex-between-start'>
    <h3>ارائه سرویس</h3>
    <span className='cursor-pointer' onClick={()=>setIsModalOpen(prev=>!prev)}><BiXCircle size={20}/></span>
    </div>
    <div className='w-full'>
 <Formik
 initialValues={
  currentData ? {
    id:currentData?.id ? currentData?.id : null,
    code:currentData?.code ? currentData?.code : "",
    type:currentData?.type ?  currentData?.type : {
        id: "",
        text: ""
    },
    name:currentData?.name ? currentData?.name : "",
    description:currentData?.description ? currentData?.description : "",
    validDateFrom:currentData?.validDateFrom ? currentData?.validDateFrom : {
       day: "",
       month: "",
       year: ""
       },
    validDateTo:currentData?.validDateTo ? currentData?.validDateTo : {
       day: "",
       month: "",
       year: ""
       },
     deliveryDiscounts:currentData?.deliveryDiscounts ? currentData?.deliveryDiscounts : [],
    service:currentData?.service ? currentData?.service : null,
    customerSegments:currentData?.customerSegments ? currentData?.customerSegments : null,
    serviceDeliveryCustomers:currentData?.serviceDeliveryCustomers ? currentData?.serviceDeliveryCustomers : null,
    saleschannels:currentData?.saleschannels ? currentData?.saleschannels : null,
    discountPercent:currentData?.discountPercent ? currentData?.discountPercent : 0,
    isActive:currentData?.isActive ? currentData?.isActive : isActive
   }:{
 
    code:currentData?.code ? currentData?.code : "",
    type:currentData?.type ?  currentData?.type : {
        id: "",
        text: ""
    },
    name:currentData?.name ? currentData?.name : "",
    description:currentData?.description ? currentData?.description : "",
    validDateFrom:currentData?.validDateFrom ? currentData?.validDateFrom : {
       day: "",
       month: "",
       year: ""
       },
    validDateTo:currentData?.validDateTo ? currentData?.validDateTo : {
       day: "",
       month: "",
       year: ""
       },
     deliveryDiscounts:currentData?.deliveryDiscounts ? currentData?.deliveryDiscounts : [],
    service:currentData?.service ? currentData?.service : null,
    customerSegments:currentData?.customerSegments ? currentData?.customerSegments : null,
    serviceDeliveryCustomers:currentData?.serviceDeliveryCustomers ? currentData?.serviceDeliveryCustomers : null,
    saleschannels:currentData?.saleschannels ? currentData?.saleschannels : null,
    discountPercent:currentData?.discountPercent ? currentData?.discountPercent : 0,
    isActive:currentData?.isActive ? currentData?.isActive : isActive

   }

}
 onSubmit={(values)=>{
  values.deliveryDiscounts=[...deliveryTableOne ,...deleveryTableTwo]
  if(currentData){
   
    PutWithHeader(apiRoute().post.service_provision,values).then(res=>{
      if(res.status==="OK"){
        SuccessAlert("با موفقیت ایجاد شد")
        dispatch(ServiceProvisionData({pageNumbers:pageNumbers}) as any)
      }else{
        ErrorAlert("با خطا مواجه شد")
      }
    })

  }else{
   
postDataHeaderToServer(apiRoute().post.service_provision,values).then(res=>{
    if(res.status==="OK"){
      SuccessAlert("با موفقیت ایجاد شد")
      dispatch(ServiceProvisionData({pageNumbers:pageNumbers}) as any)
    }else{
      ErrorAlert("با خطا مواجه شد")
    }
  })

  }
 
 }}
 >{(formik)=>(
<>

<form onSubmit={formik.handleSubmit} className="grid grid-cols-4 gap-2 mt-5">
<div className='col-span-2'><InputText label='عنوان' name="name" handleChange={formik.handleChange} values={formik.values.name} important type={"text"} wrapperClassName="!w-full"/></div>
 

 <div ><InputText label='کد' name="code" handleChange={formik.handleChange} values={formik.values.code} important type={"text"} wrapperClassName="!w-full min-w-0"/>
</div>

 <div><CustomSwitch active={isActive} handleChange={()=>setIsActive(prev=>!prev)} /></div> 

<div className='col-span-2'>
  <InputSelect label='سرویس' name="service"
 handleChange={formik.setFieldValue} values={formik.values.service}
  options={ServiceList} wrapperClassName="w-full"
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
<SubTableOne title="تعداد" setTableOne={setdeliveryTableOne}/>
<SubTableFormTwo title="ریال" setTableTwo={setdeleveryTableTwo}/>

</div> 

: null}

<div className="col-span-5 flex flex-row justify-end items-center mt-3">
                <Button
                  className="border-none bg-secondaryColor text-dark"
                  onClick={() =>setIsModalOpen(prev=>!prev)}>
                  بازگشت
                </Button>
                <Button className="border-none bg-tomato mr-3"  onClick={()=>formik.handleSubmit()}>
                  افزودن
                </Button>
              </div>
</>
 )}</Formik>
  
 
    </div>
    </Dialog>
    </>
  )
}

export default AddModalService
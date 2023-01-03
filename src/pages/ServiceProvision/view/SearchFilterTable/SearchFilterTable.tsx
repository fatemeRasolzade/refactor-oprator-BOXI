import React, {useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../../../global/Chip/Chip";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { FiSearch } from "react-icons/fi";
import { clearService, ServiceProvisionData } from "../../../../redux/ServiceProvision/ServiceProvision";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { selectDataFromServerWithHeader } from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert } from "../../../../global/alert/Alert";
import MultiSelect from "../../../../global/multiselect/MultiSelect";



const SearchFilterTable:React.FC  = (): JSX.Element => {
  const dispatch = useDispatch();
   // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const [ChanelSale,setChanelSale]=useState([])
const [DeliveryService,setDeliveryService]=useState([])
const [SegmentCustomer,setSegmentCustomer]=useState([])
const [ServiceList, setServiceList] = useState([]);


  useEffect(()=>{
    selectDataFromServerWithHeader(apiRoute().get.Filter_saleschannel).then(res=>{
      if(res.status==="OK"){setChanelSale(res.payload)}else{ErrorAlert("دیتای کانال فروش بارگزاری نشد")}
    })
    selectDataFromServerWithHeader(apiRoute().get.Filter_servicedeliverycustomers).then(res=>{
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
    setServiceList([])
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

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      code: "",
      name: "",
      service:null,
      customerSegments:null,
      serviceDeliveryCustomers:null,
      saleschannels:null,
      type:null

    },
    onSubmit: (values) => {
       
       dispatch(ServiceProvisionData({pageNumbers:pageNumbers,...values}) as any)
       setFilterData(values);
    },
  });

  


  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
          <AutocompleteInput
            label={"کد"}
            items={[]}
            value={formik.values.code}
            onChange={(e) =>formik.setFieldValue("code", e.target.value)}
            onSelect={(val: any) => formik.setFieldValue("code",val )}
          />
          <AutocompleteInput
            label={"عنوان"}
            items={[]}
            value={formik.values.name}
            onChange={(e) =>formik.setFieldValue("name", e.target.value)}
            onSelect={(val: any) => formik.setFieldValue("name",val )}
          />

         
          <SimpleButton
            type={'submit'}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
        </form>


        <form onSubmit={formik.handleSubmit}>
          <PerfesionalSearch
            formData={formik.handleSubmit}
           // perfetionalClik={perfetionalClik}
          >
           
            <div className="grid grid-cols-2 gap-4">
            <InputSelect
                label="سرویس"
                handleChange={formik.setFieldValue}
                name="service"
                values={formik.values.service}
                options={ServiceList}
              />
           <MultiSelect
          wrapperClassName="w-full z-[100]"
          label='مشتری'
          name="customerSegments"
          handleChange={formik.setFieldValue}
          values={formik.values.customerSegments}
          options={SegmentCustomer}
          error={
            formik.touched.customerSegments && formik.errors.customerSegments
          }
        />
              <MultiSelect
          wrapperClassName="w-full z-[100]"
          label='گروه مشتری'
          name="serviceDeliveryCustomers"
          handleChange={formik.setFieldValue}
          values={formik.values.serviceDeliveryCustomers}
          options={DeliveryService}
          error={
            formik.touched.serviceDeliveryCustomers && formik.errors.serviceDeliveryCustomers
          }
        />
              <InputSelect
                label="نوع تخفیف"
                handleChange={formik.setFieldValue}
                name="type"
                values={formik.values.type}
                options={dicountType}
              />
             <MultiSelect
          wrapperClassName="w-full z-[100]"
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
          </PerfesionalSearch>
        </form>




      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchFilterTable;



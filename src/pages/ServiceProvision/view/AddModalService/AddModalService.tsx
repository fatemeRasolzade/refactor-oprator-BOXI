import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import InputText from "../../../../global/InputText/InputText";
import CustomSwitch from "../../../../global/Switch/Switch";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { selectDataFromServerWithHeader } from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert, SuccessAlert } from "../../../../global/alert/Alert";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SubTableFormTwo from "./SubTableFormTwo";
import SubTableOne from "./SubTableOne";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { addEditDataAPI } from "../../../../services/CRUDServices";
import { addEditUrls } from "../../../../services/api.enums";
import {useDispatch,useSelector} from "react-redux"
import { ServiceProvisionData } from "../../../../redux/ServiceProvision/ServiceProvision";
import * as Yup from "yup"
const AddModalService = ({
  setIsModalOpen,
  isModalOpen,
  currentData,
}: {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen?: any;
  currentData?: any;
}) => {

  const [isActive, setIsActive] = useState(true);
  const [ChanelSale, setChanelSale] = useState([]);
  const [serviceSelect,setserviceSelect]=useState([])
  const [customer,setCustomer]=useState([])
  const [customerSegments,setcustomerSegments]=useState([])
  const [deliveryTableOne, setdeliveryTableOne] = useState([]);
  const [deleveryTableTwo, setdeleveryTableTwo] = useState([]);
  const { pageNumbers } = useSelector((state: any) => state.paginate);
const dispatch=useDispatch()
  useEffect(() => {
    selectDataFromServerWithHeader(apiRoute().get.Filter_saleschannel).then((res) => {
      if (res.status === "OK") {
        setChanelSale(res.payload);
      } else {
        ErrorAlert("دیتای کانال فروش بارگزاری نشد");
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.Fliter_Service).then((res) => {
      if (res.status === "OK") {
       setserviceSelect(res.payload);
      } else {
        
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.Fliter_customer).then((res) => {
      if (res.status === "OK") {
        setCustomer(res.payload.content);
      } else {
       
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.Filter_servicedeliverycustomers).then((res) => {
      if (res.status === "OK") setcustomerSegments(res.payload);
    });
  }, []);

  const dicountType = [
    {
      id: 0,
      text: "ثابت",
    },
    {
      id: 1,
      text: "محاسباتی",
    },
  ];


  const validateSchema=Yup.object().shape({
    code:Yup.number().required(),
    name:Yup.string().required(),
      service: Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    type:Yup.object().shape({
      text: Yup.string().required(),
      id: Yup.string().required(),
    }),
    discountPercent:Yup.string().required()
    // validDateFrom:Yup.object().shape({
    //   day: Yup.string().required(),
    //   month:Yup.string().required(),
    //   year: Yup.string().required(),
    // })
   
  })

  return (
    <Modal visible={isModalOpen} setVisible={setIsModalOpen} title="ارائه سرویس">
      <div className="w-full">
        <Formik
        enableReinitialize={true}
          initialValues={
            currentData ? 
            { 
              id:currentData?.id,
              code:currentData?.code ? currentData?.code : "",
              type: currentData?.type
                ? currentData?.type
                : {
                    id: "",
                    text: "",
                  },
              name: currentData?.name ? currentData?.name : "",
              description: currentData?.description ? currentData?.description : "",
              validDateFrom: currentData?.validDateFrom
                ? currentData?.validDateFrom
                : {
                    day: "",
                    month: "",
                    year: "",
                  },
              validDateTo: currentData?.validDateTo
                ? currentData?.validDateTo
                : {
                    day: "",
                    month: "",
                    year: "",
                  },
              deliveryDiscounts: currentData?.deliveryDiscounts ? currentData?.deliveryDiscounts : [],
              service: currentData?.service ? currentData?.service : [],
              customerSegments: currentData?.customerSegments ? currentData?.customerSegments : [],
              serviceDeliveryCustomers: currentData?.serviceDeliveryCustomers ? currentData?.serviceDeliveryCustomers : [],
              saleschannels: currentData?.saleschannels ? currentData?.saleschannels : [],
              discountPercent: currentData?.discountPercent ? currentData?.discountPercent : "",
              isActive: currentData?.isActive ? currentData?.isActive : isActive,
              isDeleted: null,
            }:
            {
              code:"",
              type:{
                    id: "",
                    text: "",
                  },
              name: "",
              description:"",
              validDateFrom:{
                    day: "",
                    month: "",
                    year: "",
                  },
              validDateTo:{
                    day: "",
                    month: "",
                    year: "",
                  },
              deliveryDiscounts:[],
              service:null,
              customerSegments:null,
              serviceDeliveryCustomers: null,
              saleschannels:null,
              discountPercent:"",
              isActive: isActive,
              isDeleted: null,
            }
          }
          onSubmit={(values, { resetForm }) => {
            values.deliveryDiscounts = [...deliveryTableOne, ...deleveryTableTwo];
          
             addEditDataAPI(addEditUrls.serviceProvision,currentData ? "put" : "post",values).then(res=>{
               setIsModalOpen(false)
              if(res.data.status==="OK"){
               
                resetForm()
                 dispatch(ServiceProvisionData({pageNumbers:pageNumbers}) as any)
                SuccessAlert("با موفقیت انجام شد")
              }else{
                ErrorAlert("خطا در ارتباط");
              }

             })
            
          }}
          validationSchema={validateSchema}
        >
          {(formik) => (
            <>
              <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-5 mt-5">
                <InputText
                  wrapperClassName="col-span-2"
                  label="عنوان"
                  name="name"
                  handleChange={formik.handleChange}
                  values={formik.values.name}
                  important
                  error={formik.touched.name && formik.errors.name}
                />
                <InputText label="کد" name="code" handleChange={formik.handleChange} values={formik.values.code} important error={formik.touched.code && formik.errors.code}/>
                <CustomSwitch active={isActive} handleChange={() => setIsActive((prev) => !prev)} />
                <InputSelect
                  wrapperClassName="col-span-2 z-[99]"
                  label="سرویس"
                  important
                  name="service"
                  handleChange={formik.setFieldValue}
                  values={formik.values.service}
                  options={serviceSelect}
                  error={formik.touched.service && formik.errors.service}
                />
                <DatePickers
                  WrapperClassName="col-span-2 xl:col-span-1"
                  name="validDateFrom"
                  handleChange={formik.setFieldValue}
                  values={formik.values.validDateFrom}
                  title="تاریخ اعتبار از"
                  error={formik.touched.validDateFrom && formik.errors.validDateFrom}
                />
                <DatePickers
                  WrapperClassName="col-span-2 xl:col-span-1"
                  name="validDateTo"
                  handleChange={formik.setFieldValue}
                  values={formik.values.validDateTo}
                  title="تاریخ اعتبار تا"
                />
                <MultiSelect
                  wrapperClassName="col-span-2 z-[97] "
                  label="مشتری"
                  name="serviceDeliveryCustomers"
                  handleChange={formik.setFieldValue}
                  values={formik.values.serviceDeliveryCustomers}
                  options={customer}
                  error={formik.touched.serviceDeliveryCustomers && formik.errors.serviceDeliveryCustomers}
                />
                <MultiSelect
                  wrapperClassName="col-span-2 xl:col-span-1 z-[96]"
                  label="گروه مشتری"
                  name="customerSegments"
                  handleChange={formik.setFieldValue}
                  values={formik.values.customerSegments}
                  options={customerSegments}
                  error={formik.touched.customerSegments && formik.errors.customerSegments}
                />
                <MultiSelect
                  wrapperClassName="col-span-2 xl:col-span-1 z-[95]"
                  label="کانال فروش"
                  name="saleschannels"
                  handleChange={formik.setFieldValue}
                  values={formik.values.saleschannels}
                  options={ChanelSale}
                  error={formik.touched.saleschannels && formik.errors.saleschannels}
                />
                <InputSelect
                  label="نوع تخفیف"
                  name="type"
                  important
                  handleChange={formik.setFieldValue}
                  values={formik.values.type}
                  options={dicountType}
                  wrapperClassName="col-span-2 xl:col-span-1"
                  error={formik.touched.type && formik.errors.type}
                />
                {formik.values.type.text === "ثابت" ? (
                  <InputText
                    label="درصد"
                    name="discountPercent"
                    handleChange={formik.handleChange}
                    values={formik.values.discountPercent}
                    important
                    wrapperClassName="col-span-2 2xl:col-span-1"
                    error={formik.touched.discountPercent && formik.errors.discountPercent}
                  />
                ) : null}
              </form>
              {formik.values.type.text === "محاسباتی" ? (
                <div className=" grid lg:grid-cols-2 gap-3">
                  <SubTableOne title="تعداد" setTableOne={setdeliveryTableOne} />
                  <SubTableFormTwo title="ریال" setTableTwo={setdeleveryTableTwo} />
                </div>
              ) : null}
              <div className="flex-end-center mt-5 gap-3">
                <SimpleButton text="لغو" className="full-lightTomato-btn" handelClick={() => setIsModalOpen((prev) => !prev)} />
                <SimpleButton text={currentData ? "ویرایش" : "افزودن"} className="full-tomato-btn" handelClick={() => formik.handleSubmit()} />
              </div>
            </>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddModalService;

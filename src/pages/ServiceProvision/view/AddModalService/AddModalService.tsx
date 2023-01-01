import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import InputText from "../../../../global/InputText/InputText";
import CustomSwitch from "../../../../global/Switch/Switch";
import DatePickers from "../../../../global/DatePicker/DatePicker";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { selectDataFromServerWithHeader } from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import { ErrorAlert } from "../../../../global/alert/Alert";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SubTableFormTwo from "./SubTableFormTwo";
import SubTableOne from "./SubTableOne";
import Modal from "../../../../global/Modal/Modal";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
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
  const [subForm, setSubForm] = useState(false);

  const [ChanelSale, setChanelSale] = useState([]);
  const [DeliveryService, setDeliveryService] = useState([]);
  const [SegmentCustomer, setSegmentCustomer] = useState([]);
  const [catHub, setCatHub] = useState([]);

  const [deliveryTableOne, setdeliveryTableOne] = useState([]);
  const [deleveryTableTwo, setdeleveryTableTwo] = useState([]);

  useEffect(() => {
    selectDataFromServerWithHeader(apiRoute().get.Filter_saleschannel).then((res) => {
      if (res.status === "OK") {
        setChanelSale(res.payload);
      } else {
        ErrorAlert("دیتای کانال فروش بارگزاری نشد");
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.Fliter_customerSegment).then((res) => {
      if (res.status === "OK") {
        setSegmentCustomer(res.payload);
      } else {
        ErrorAlert("دیتای کانال فروش بارگزاری نشد");
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.Filter_servicedeliverycustomers).then((res) => {
      if (res.status === "OK") {
        setDeliveryService(res.payload);
      } else {
        ErrorAlert("دیتای کانال فروش بارگزاری نشد");
      }
    });
    selectDataFromServerWithHeader(apiRoute().get.select_hub_category).then((res) => {
      if (res.status === "OK") setCatHub(res.payload.content);
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

  // const formik=useFormik({
  //   // enableReinitialize:true,

  //   initialValues:{
  //     code:"",
  //     type:{
  //         id: "",
  //         text: ""
  //     },
  //     name:"",
  //     description:"",
  //     validDateFrom:{
  //        day: "",
  //        month: "",
  //        year: ""
  //        },
  //     validDateTo:{
  //        day: "",
  //        month: "",
  //        year: ""
  //        },
  //      deliveryDiscounts:[],
  //     service:null,
  //     customerSegments:null,
  //     serviceDeliveryCustomers:null,
  //     saleschannels:null,
  //     discountPercent:"",
  //     isActive:isActive
  //    },

  //    onSubmit:(values)=>{
  //  // console.log(values)
  //  values.deliveryDiscounts=[...deliveryTableOne ,...deleveryTableTwo]
  //  console.log("oooooo",values)
  //    }
  // })

  return (
    <Modal visible={isModalOpen} setVisible={setIsModalOpen} title="ارائه سرویس">
      <div className="w-full">
        <Formik
          initialValues={{
            code: currentData?.code ? currentData?.code : "",
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
            service: currentData?.service ? currentData?.service : null,
            customerSegments: currentData?.customerSegments ? currentData?.customerSegments : null,
            serviceDeliveryCustomers: currentData?.serviceDeliveryCustomers ? currentData?.serviceDeliveryCustomers : null,
            saleschannels: currentData?.saleschannels ? currentData?.saleschannels : null,
            discountPercent: currentData?.discountPercent ? currentData?.discountPercent : "",
            isActive: currentData?.isActive ? currentData?.isActive : isActive,
          }}
          onSubmit={(values) => {
            values.deliveryDiscounts = [...deliveryTableOne, ...deleveryTableTwo];
            console.log("oooooo", values);
          }}
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
                />
                <InputText label="کد" name="code" handleChange={formik.handleChange} values={formik.values.code} important />
                <CustomSwitch active={isActive} handleChange={() => setIsActive((prev) => !prev)} />
                <InputSelect
                  wrapperClassName="col-span-2 z-[99]"
                  label="سرویس"
                  name="service"
                  handleChange={formik.setFieldValue}
                  values={formik.values.service}
                  options={catHub}
                  error={formik.touched.service && formik.errors.service}
                />
                <DatePickers
                  WrapperClassName="col-span-2 xl:col-span-1"
                  name="validDateFrom"
                  handleChange={formik.setFieldValue}
                  values={formik.values.validDateFrom}
                  title="تاریخ اعتبار از"
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
                  name="customerSegments"
                  handleChange={formik.setFieldValue}
                  values={formik.values.customerSegments}
                  options={SegmentCustomer}
                  error={formik.touched.customerSegments && formik.errors.customerSegments}
                />
                <MultiSelect
                  wrapperClassName="col-span-2 xl:col-span-1 z-[96]"
                  label="گروه مشتری"
                  name="serviceDeliveryCustomers"
                  handleChange={formik.setFieldValue}
                  values={formik.values.serviceDeliveryCustomers}
                  options={DeliveryService}
                  error={formik.touched.serviceDeliveryCustomers && formik.errors.serviceDeliveryCustomers}
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
                  handleChange={formik.setFieldValue}
                  values={formik.values.type}
                  options={dicountType}
                  wrapperClassName="col-span-2 xl:col-span-1"
                />
                {formik.values.type.text === "ثابت" ? (
                  <InputText
                    label="درصد"
                    name="discountPercent"
                    handleChange={formik.handleChange}
                    values={formik.values.discountPercent}
                    important
                    wrapperClassName="col-span-2 2xl:col-span-1"
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
                <SimpleButton text="افزودن" className="full-tomato-btn" handelClick={() => formik.handleSubmit()} />
              </div>
            </>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddModalService;

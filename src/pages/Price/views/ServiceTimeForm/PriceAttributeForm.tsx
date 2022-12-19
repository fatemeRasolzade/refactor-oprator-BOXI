import { useFormik } from "formik";
import { useEffect, useState } from "react";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { getDataFromServer } from "../../../../services/Service_call";
import { GET_PRODUCT_SELECT } from "../../../../services/apiRoute";
import CustomSwitch from "../../../../global/Switch/Switch";
import InputText from "../../../../global/InputText/InputText";
import { PriceAttributeFormInitialValues, PriceAttributeFormValidation } from "./PriceAttributeVariable";

const PriceAttributeForm = () => {
  const [Product, setProduct] = useState([]);

  const initProduct = () => {
    getDataFromServer(GET_PRODUCT_SELECT).then((res) => setProduct(res.content));
  };

  useEffect(() => {
    initProduct();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: PriceAttributeFormValidation,
    initialValues: PriceAttributeFormInitialValues,
    // currentData ? ServiceTimeFormCurrentValues(currentData) : ServiceTimeFormInitialValues,
    onSubmit: (values: any) => {
      //   setLoading(true);
      //   if (currentData) {
      //     EditDataParams(EDIT_SERVICETIME, {
      //       ...values,
      //       id: currentData.id,
      //     })
      //       .then(() => {
      //         dispatch(serviceTimeData({}) as any);
      //         setOpen(false);
      //         toast.success("نرخ نامه ویرایش شد");
      //       })
      //       .catch(() => {})
      //       .finally(() => setLoading(false));
      //   } else {
      //     postDataToServer(CREATE_SERVICETIME, values)
      //       .then(() => {
      //         dispatch(serviceTimeData({}) as any);
      //         setOpen(false);
      //         toast.success("نرخ نامه افزوده شد");
      //       })
      //       .finally(() => setLoading(false));
      //   }
    },
  });

  const { values, errors, touched, handleChange, setFieldValue }: any = formik;

  return (
    <div>
      <div className="inputRow">
        <InputSelect
          important
          options={Product}
          label="محصول  "
          values={values.product}
          name="product"
          handleChange={setFieldValue}
          error={touched.product && errors.product}
        />
        <div className="mb-5 w-60 centering">
          <CustomSwitch label="قیمت مقطوع" active={values.isParametric} handleChange={() => setFieldValue("isParametric", !values.isParametric)} />
        </div>
        <div className="mb-5 w-60 centering">
          <CustomSwitch label="محاسباتی" active={values.fixedPrice} handleChange={() => setFieldValue("fixedPrice", !values.fixedPrice)} />
        </div>

        {/* 
        {!values.fixedPrice ? (
								<FormGroup
									required={true}
									error={touched.price && errors.price}
									input={{
										name: "price",
										value: values.price,
										onChange: handleChange,
										// onChange:(e)=>{
										//
										//   const {value}=e.target
										//   !values.fixedPrice?
										// 	formik.setFieldValue("price", value)
										// 	:
										// 	formik.setFieldValue("price", '')
										//
										// } ,
									}}
									label="قیمت"
								/>
							) : (
								<FormGroup
									width="w-full"
									// error={touched.priceFormule && errors.priceFormule}
									input={{
										type: "textarea",
										name: "priceFormule",
										value: values.priceFormule,
										onChange: handleChange,
									}}
									label="ویرایشگر"
								/>
							)} */}

        <InputText important label=" قیمت " values={values.price} name="price" handleChange={handleChange} error={touched.price && errors.price} />
      </div>
    </div>
  );
};

export default PriceAttributeForm;

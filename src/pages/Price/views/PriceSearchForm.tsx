import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import { priceData } from "../../../redux/PriceData/PriceData";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import PricePerfesionalFilter from "./PricePerfesionalFilter";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  pageNumbers: any;
}

const PriceSearchForm: React.FC<PropsData> = ({ isActive, isUpdating, pageNumbers }): JSX.Element => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;

  useEffect(() => {
    const priceListDetails = values?.product ? { product: values?.product } : undefined;
    delete values?.product;
    dispatch(
      priceData({
        ...values,
        priceListDetails,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating, pageNumbers, dispatch]);

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={handleSubmit}>
          <AutocompleteInput label="شماره نرخ نامه" value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
          <AutocompleteInput label="عنوان" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
          <SimpleButton searchBtn />
          <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
            <PricePerfesionalFilter formik={formik} />
          </PerfesionalSearch>
        </form>
      </div>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(PriceSearchForm);

// <FormGroup label="محصول">
// <Select
//   name="product"
//   options={productOptions}
//   // isLoading={hubLoading}
//   onChange={(value) => {
//     setFieldValue("product", { id: value.value, text: value.label });
//   }}
//   value={{
//     value: values?.product?.id,
//     label: values?.product?.text,
//   }}
// />
// </FormGroup>
// <FormGroup
// // error={touched.selectHub && errors.selectHub && errors.selectHub.id}
// label="نوع مرسوله"
// // required={true}
// >
// <Select
//   name="consignmentType"
//   placeholder=""
//   options={consignmenTypeOptins}
//   // isLoading={hubLoading}
//   onChange={(value) => {
//     setFieldValue("consignmentType", {
//       id: value.value,
//       text: value.label,
//     });
//   }}
//   value={{
//     value: values?.consignmentType?.id,
//     label: values?.consignmentType?.text,
//   }}
// />
// </FormGroup>
// </div>

// <div className="formInputSection   flex-wrap md:flex-nowrap">
// <FormGroup labelStyle="z-[110]" label="تاریخ نرخ نامه">
// <DatePicker
//   value={values.priceListDate}
//   // inputPlaceholder="تاریخ گزارش"
//   onChange={(value) => {
//     setFieldValue("priceListDate", value);
//   }}
// />
// </FormGroup>
// <FormGroup label="نوع رده">
// <Select
//   name="classification"
//   placeholder=""
//   options={[
//     { value: "1", label: "سفارشی" },
//     { value: "2", label: "استاندارد" },
//   ]}
//   // isLoading={hubLoading}
//   onChange={(value) => {
//     setFieldValue("classification", { id: value.value, text: value.label });
//   }}
//   value={{
//     value: values?.classification?.id,
//     label: values?.classification?.text,
//   }}
// />
// </FormGroup>

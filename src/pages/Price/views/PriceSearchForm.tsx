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
      <form className="searchForm" onSubmit={handleSubmit}>
        <AutocompleteInput label="شماره نرخ نامه" value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
        <AutocompleteInput label="عنوان" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
          <PricePerfesionalFilter formik={formik} />
        </PerfesionalSearch>
      </form>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(PriceSearchForm);

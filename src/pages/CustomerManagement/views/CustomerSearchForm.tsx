import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import CustomerPerfesionalFilter from "./CustomerPerfesionalFilter";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import { customerData } from "../../../redux/CustomerManagement/CustomerManagementData";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  pageNumbers: any;
}

const CustomerSearchForm: React.FC<PropsData> = ({ isActive, isUpdating, pageNumbers }): JSX.Element => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    initialValues: {
      username: "",
      postalCode: "",
      address: "",
      name: "",
      code: "",
      telNumber: "",
      isActive: isActive,
      selectParentCustomer: null,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;

  useEffect(() => {
    dispatch(
      customerData({
        ...values,
        isActive: isActive,
        telNumber: parseInt(values.telNumber),
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating, pageNumbers, dispatch]);

  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <AutocompleteInput label={"کد مشتری"} value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
        <AutocompleteInput label={"نام مشتری"} value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
        <AutocompleteInput label={"شماره تماس"} value={values.telNumber} onChange={(e) => setFieldValue("telNumber", e.target.value)} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
          <CustomerPerfesionalFilter values={values} setFieldValue={setFieldValue} />
        </PerfesionalSearch>
      </form>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(CustomerSearchForm);

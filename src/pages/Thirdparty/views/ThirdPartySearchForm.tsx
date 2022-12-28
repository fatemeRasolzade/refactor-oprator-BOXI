import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import ThirdPartyPerfesionalFilter from "./ThirdPartyPerfesionalFilter";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import { thirdPartyData } from "../../../redux/ThirdParty/ThirdPartyData";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  pageNumbers: any;
}

const ThirdPartySearchForm: React.FC<PropsData> = ({ isActive, isUpdating, pageNumbers }): JSX.Element => {
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
      selectThirdPartyCategory: null,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;

  useEffect(() => {
    dispatch(
      thirdPartyData({
        ...values,
        isActive: isActive,
        telNumber: parseInt(values.telNumber),
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating, pageNumbers]);

  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <AutocompleteInput label={"کد شخصیت"} value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
        <AutocompleteInput label={"نام شخصیت"} value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
        <AutocompleteInput label={"شماره تماس"} value={values.telNumber} onChange={(e) => setFieldValue("telNumber", e.target.value)} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
          <ThirdPartyPerfesionalFilter values={values} setFieldValue={setFieldValue} />
        </PerfesionalSearch>
      </form>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(ThirdPartySearchForm);

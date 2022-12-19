import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import { serviceTimeData } from "../../../redux/ServiceTimeData/ServiceTimeData";
import { priceData } from "../../../redux/PriceData/PriceData";

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

  const { values, handleSubmit, setFieldValue }: any = formik;

  useEffect(() => {
    dispatch(
      priceData({
        ...values,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating, pageNumbers]);

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={handleSubmit}>
          <AutocompleteInput label="شماره نرخ نامه" value={values.code} onChange={(e) => setFieldValue("code", e.target.value)} />
          <AutocompleteInput label="عنوان" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
          <SimpleButton searchBtn />
        </form>
      </div>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(PriceSearchForm);

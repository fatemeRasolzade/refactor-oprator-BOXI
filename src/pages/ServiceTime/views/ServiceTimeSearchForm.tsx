import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import InputSelect from "../../../global/InputSelect/InputSelect";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import { serviceTimeData } from "../../../redux/ServiceTimeData/ServiceTimeData";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  pageNumbers: any;
  TimeUnitType: any;
}

const ServiceTimeSearchForm: React.FC<PropsData> = ({ isActive, isUpdating, pageNumbers, TimeUnitType }): JSX.Element => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const { values, handleSubmit, setFieldValue }: any = formik;

  useEffect(() => {
    dispatch(
      serviceTimeData({
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
          <AutocompleteInput label="عنوان" value={values.name} onChange={(e) => setFieldValue("name", e.target.value)} />
          <InputSelect options={TimeUnitType} label="واحد  " values={values.timeUnit} name="timeUnit" handleChange={setFieldValue} />
          <SimpleButton searchBtn />
        </form>
      </div>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(ServiceTimeSearchForm);

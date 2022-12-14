import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import ADMVehiclePerfesionalFilter from "./ADMVehiclePerfesionalFilter";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import { ADMVehicleData } from "../../../redux/ADMVehicle/ADMVehicleData";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  pageNumbers: any;
}

const ADMVehicleSearchForm: React.FC<PropsData> = ({ isActive, isUpdating, pageNumbers }): JSX.Element => {
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    initialValues: {
      vehicleNumber: "",
      hubName: "",
      hubCode: "",
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const { values, handleSubmit, setFieldValue, handleReset }: any = formik;

  useEffect(() => {
    dispatch(
      ADMVehicleData({
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
          <AutocompleteInput label={"شماره پلاک"} value={values.vehicleNumber} onChange={(e) => setFieldValue("vehicleNumber", e.target.value)} />
          <AutocompleteInput label={"هاب مرکز گزارش"} value={values.vehicleNumber} onChange={(e) => setFieldValue("vehicleNumber", e.target.value)} />
          <SimpleButton searchBtn />
          <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
            <ADMVehiclePerfesionalFilter values={values} setFieldValue={setFieldValue} />
          </PerfesionalSearch>
        </form>
      </div>
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(ADMVehicleSearchForm);

import React, { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import ADMVehiclePerfesionalFilter from "./ADMVehiclePerfesionalFilter";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import { ADMVehicleData } from "../../../redux/ADMVehicle/ADMVehicleData";
import VehiclePelak from "../../../global/VehiclePelak/VehiclePelak";
import { getPelak } from "../../../tools/functions/Methods";

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
      vehicleNumber0: "",
      vehicleNumber1: "",
      vehicleNumber2: "",
      vehicleNumber3: "",
      hubName: "",
      hubCode: "",
      vehicleMakeSelect: "",
      selectRoute: undefined,
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
      <form className="searchForm" onSubmit={handleSubmit}>
        <VehiclePelak formik={formik} Search WrapperClassName="w-72" />
        <AutocompleteInput label="هاب مرکز گزارش" value={values.hubName} onChange={(e) => setFieldValue("hubName", e.target.value)} />
        <SimpleButton searchBtn />
        <PerfesionalSearch formData={handleSubmit} handleReset={handleReset}>
          <ADMVehiclePerfesionalFilter formik={formik} />
        </PerfesionalSearch>
      </form>

      {filterData && <Chip filterData={{ ...filterData, pelak: getPelak(filterData) }} formData={formik} />}
    </>
  );
};

export default memo(ADMVehicleSearchForm);

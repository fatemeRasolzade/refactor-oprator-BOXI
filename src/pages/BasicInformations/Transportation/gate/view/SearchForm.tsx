import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { FiSearch } from "react-icons/fi";

import AutocompleteInput from "../../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import Chip from "../../../../../global/Chip/Chip";

import PerfesionalSearch from "../../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import VehiclePelak from "../../../../../global/VehiclePelak/VehiclePelak";
import { getPelak } from "../../../../../tools/functions/Methods";
import { filterBags } from "../../../../../redux/Transportation/bags/Bags";
import { filterGate } from "../../../../../redux/Transportation/gate/GateData";

interface PropsData {
  isActive: Boolean | string;
}

const SearchForm: React.FC<PropsData> = ({ isActive }): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  // const [searchData,setSearchData]=useState({})
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      isActive: isActive,
      code: "",
      hub: "",
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    dispatch(
      filterGate({
        ...formik.values,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    formik.setFieldValue(name, val);
  };

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
          <AutocompleteInput
            label={"کد درب"}
            // items={serviceCodeOptions}
            value={formik.values.code}
            onChange={(e) => handleChangeCode(e, "code")}
            onSelect={(val: any) => handleSelect(val, "code")}
          />
          <AutocompleteInput
            label={"نام هاب"}
            // items={serviceCodeOptions}
            value={formik.values.hub}
            onChange={(e) => handleChangeCode(e, "hub")}
            onSelect={(val: any) => handleSelect(val, "hub")}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
        </form>
      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchForm;

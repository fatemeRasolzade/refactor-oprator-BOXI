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

interface PropsData {
  isActive: Boolean | string;
  vendorOptions: any;
  bagOptions: any;
  hubOptions: any;
}

const SearchForm: React.FC<PropsData> = ({ isActive, vendorOptions, bagOptions, hubOptions }): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  // const [searchData,setSearchData]=useState({})
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      isActive: isActive,
      bagNumber: "",
      selectBagType: null,
      bagTypeOptins: "",
      vehicleNumber0: "",
      vehicleNumber1: "",
      vehicleNumber2: "",
      vehicleNumber3: "",
      selectdestinationHub: null,
      selectsourceHub:null,
    },
    onSubmit: (values) => {
      const pelak = getPelak(values);
      const finalData = { ...values, pelak };
      setFilterData(finalData);
    },
  });

  useEffect(() => {
    dispatch(
      filterBags({
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
            label={"شماره کیسه"}
            // items={serviceCodeOptions}
            value={formik.values.bagNumber}
            onChange={(e) => handleChangeCode(e, "bagNumber")}
            onSelect={(val: any) => handleSelect(val, "bagNumber")}
          />
          <InputSelect
            label="هاب مبدا"
            name="selectsourceHub"
            handleChange={formik.setFieldValue}
            values={formik.values.selectsourceHub}
            error={formik.touched.selectsourceHub && formik.errors.selectsourceHub}
            options={hubOptions.options}
          />
          <InputSelect
            label="هاب مقصد"
            name="selectdestinationHub"
            handleChange={formik.setFieldValue}
            values={formik.values.selectdestinationHub}
            error={formik.touched.selectdestinationHub && formik.errors.selectdestinationHub}
            options={hubOptions.options}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
          <PerfesionalSearch formData={formik.handleSubmit}>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
                <InputSelect
                  label="نوع کیسه"
          
                  name="selectBagType"
                  handleChange={formik.setFieldValue}
                  values={formik.values.selectBagType}
                  error={formik.touched.selectBagType && formik.errors.selectBagType}
                  options={bagOptions.options}
                />
                <VehiclePelak formik={formik} />
              
            </div>
          </PerfesionalSearch>
        </form>
      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchForm;

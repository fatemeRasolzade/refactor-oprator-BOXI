import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { FiSearch } from "react-icons/fi";
import { vendorData } from "../../../../../redux/Transportation/vendor/VendorData";
import { apiRoute } from "../../../../../services/apiRoute";
import { GetDataParams } from "../../../../../services/Service_call";
import AutocompleteInput from "../../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import Chip from "../../../../../global/Chip/Chip";
import { vehicleModel } from "../../../../../redux/Transportation/vehicleModel/VehicleModel";
import PerfesionalSearch from "../../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import { useGetFuelTypeOptions, useGetVendorOptions } from "../../../../../global/hooks/useFetchOptions";

interface PropsData {
  isActive: Boolean | string;
}

const SearchForm: React.FC<PropsData> = ({ isActive }): JSX.Element => {
  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  const { fuelOptions } = useGetFuelTypeOptions(apiRoute().get.selectfuelTypes);
  const { vendorOptions } = useGetVendorOptions(apiRoute().get.selectVendor);
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      search: "",
      isActive: isActive,
      productGroup: "" as any,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    dispatch(
      vehicleModel({
        search: formik.values.search,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
    const params = `${e.target.value}`;
    // setOptions(data.filter(item=>item.text.includes(e.target.value)))
    GetDataParams(apiRoute().get.GET_PRODUCT + params).then((res) => {
      //  console.log(res)
      setServiceCodeOptions(
        res.payload.content.map((item: { text: any }) => {
          return {
            label: item?.text,
          };
        })
      );
    });
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
            label={"کد"}
            items={serviceCodeOptions}
            value={formik.values.search}
            onChange={(e) => handleChangeCode(e, "search")}
            onSelect={(val: any) => handleSelect(val, "search")}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
          <PerfesionalSearch formData={formik.handleSubmit}>
              <>
              {/* <InputSelect    
                label="نوع سوخت"
                important
                name="fuelTypeSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.fuelTypeSelect}
                error={formik.touched.fuelTypeSelect && formik.errors.fuelTypeSelect}
                options={fuelOptions.options || []}
              />
              <InputSelect
                label="نام شرکت نقلیه"
                // important
                name="vendorSelect"
                handleChange={formik.setFieldValue}
                values={formik.values.vendorSelect}
                error={formik.touched.vendorSelect && formik.errors.vendorSelect}
                options={vendorOptions.options}
              /> */}
              </>

   
          </PerfesionalSearch>
        </form>
      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchForm;

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
import InputText from "../../../../../global/InputText/InputText";
import { filterRoute } from "../../../../../redux/Transportation/route/RouteData";

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
      fuelTypeSelect:'',
      vendorSelect:"",
      volumeCapacity:'',
      weightCapacity:'',
      consignmentCapacity:""
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    dispatch(
      filterRoute({
        search: formik.values.search,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
        fuelTypeSelect:formik.values.fuelTypeSelect,
        vendorSelect:formik.values.vendorSelect,
        volumeCapacity:formik.values.volumeCapacity,
        weightCapacity:formik.values.weightCapacity,
        consignmentCapacity:formik.values.consignmentCapacity
      }) as any
    );
  }, [isActive, filterData, pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
    const params = `${e.target.value}`;
    // GetDataParams(apiRoute().get.GET_PRODUCT + params).then((res) => {
    //   //  console.log(res)
    //   setServiceCodeOptions(
    //     res.payload.content.map((item: { text: any }) => {
    //       return {
    //         label: item?.text,
    //       };
    //     })
    //   );
    // });
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
              <div className='flex flex-wrap gap-x-4 gap-y-2'>
                  <div>
                      <InputSelect
                          label="نوع سوخت"
                          name="fuelTypeSelect"
                          handleChange={formik.setFieldValue}
                          values={formik.values.fuelTypeSelect}
                          error={formik.touched.fuelTypeSelect && formik.errors.fuelTypeSelect}
                          options={fuelOptions.options || []}
                      />
                      <InputSelect
                          label="نام شرکت نقلیه"
                          //
                          name="vendorSelect"
                          handleChange={formik.setFieldValue}
                          values={formik.values.vendorSelect}
                          error={formik.touched.vendorSelect && formik.errors.vendorSelect}
                          options={vendorOptions.options}
                      />
                  </div>
                  <div>
                      <InputText
                          label=" ظرفیت وزنی (کیلوگرم)"
                          // className="w-full"
                          name="weightCapacity"
                          handleChange={formik.handleChange}
                          values={formik.values.weightCapacity}
                          type={"text"}

                      />

                      <InputText
                          label=" ظرفیت حجمی (متر مکعب)"
                          // className="w-full"
                          name="volumeCapacity"
                          handleChange={formik.handleChange}
                          values={formik.values.volumeCapacity}
                          type={"text"}

                      />
                  </div>
                  <div>
                      <InputText
                          label="ظرفیت مرسوله (تعداد)"
                          // className="w-full"
                          name="consignmentCapacity"
                          handleChange={formik.handleChange}
                          values={formik.values.consignmentCapacity}
                          type={"text"}

                      />
                  </div>
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

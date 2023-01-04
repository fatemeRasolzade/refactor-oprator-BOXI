import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import { FiSearch } from "react-icons/fi";
import AutocompleteInput from "../../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import Chip from "../../../../../global/Chip/Chip";

import { filterVehicleModel } from "../../../../../redux/Transportation/VehicleData/VehicleData";
import VehiclePelak from "../../../../../global/VehiclePelak/VehiclePelak";
import { getPelak } from "../../../../../tools/functions/Methods";

interface PropsData {
  isActive: Boolean | string;


}

const SearchForm: React.FC<PropsData> = ({ isActive }): JSX.Element => {

  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  // const [searchData,setSearchData]=useState({})
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      isActive: isActive,
      hubName: "",
      vehicleNumber0: "",
      vehicleNumber1: "",
      vehicleNumber2: "",
      vehicleNumber3: "",
    },
    onSubmit: (values) => {
      
      const  pelak=getPelak(values)
      const finalData={...values,pelak}
  
      // setSearchData(values)
      setFilterData(finalData);


    },
  });

  useEffect(() => {
    dispatch(
      filterVehicleModel({
        ...formik.values,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
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
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit} >
         <VehiclePelak formik={formik} />
          <AutocompleteInput
            label={"نام هاب"}
            items={serviceCodeOptions}
            value={formik.values.hubName}
            onChange={(e) => handleChangeCode(e, "hubName")}
            onSelect={(val: any) => handleSelect(val, "hubName")}
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

import React, { useEffect, useState } from "react";
import { BiSearch, BiX, BiChevronDown } from "react-icons/bi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import Select from "react-select";
import Chip from "../../../../global/Chip/Chip";
import { ServiceData } from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import { GetDataParams } from "../../../../services/Service_call";
import { apiRoute } from "../../../../services/apiRoute";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import { productData } from "../../../../redux/ProductDefineData/ProductDefineData";

interface PropsData{
  isActive:Boolean | string
}

const SearchForm = ({isActive}:PropsData): JSX.Element => {
  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      code: "",
      name: "",
      isActive:isActive
    },
    onSubmit: (values) => {
      setFilterData(values);
      // //@ts-ignore
      // dispatch(productData(formik.values));
    },
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(productData({...formik.values,isActive}));
  }, [isActive,filterData]);
  const data = [
    { id: 1, text: "product" },
    { id: 2, text: "price" },
    { id: 3, text: "vemdor" },
  ];
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
    const filterData = data.filter((item) => item.text.includes(e.target.value));
    setServiceCodeOptions(
      filterData.map((item) => {
        return {
          label: item?.text,
        };
      })
    );
    //mr hash please dont delete this comments//
    // const params = `${e.target.value}`;
    // setOptions(data.filter(item=>item.text.includes(e.target.value)))
    // GetDataParams(apiRoute().get.GET_SERVICES+ params)
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    formik.setFieldValue(name, val);
  };
  return (
    <>
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <AutocompleteInput
              label={"کد"}
              items={serviceCodeOptions}
              value={formik.values.code}
              onChange={(e) => handleChangeCode(e, "code")}
              onSelect={(val: any) => handleSelect(val, "code")}
            />
            <AutocompleteInput
              label={"عنوان"}
              items={[]}
              value={formik.values.name}
              onChange={(e) => handleChangeName(e, "name")}
              onSelect={(val: any) => handleSelect(val, "name")}
            />
            {/*<InputIcon text='عنوان' handleOnSelect={handleOnSelect} handleOnSearch={setName}/>*/}
            <SimpleButton className="full-gray-btn" icon={<BiSearch size={20} />} text="جستجو" />
          </div>
        </form>
      </div>
      {/* list of chip */}
      {filterData  && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default SearchForm;

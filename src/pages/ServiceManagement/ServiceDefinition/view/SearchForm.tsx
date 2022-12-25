import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { ServiceData } from "../../../../redux/ServiceDefine/ServiceDefineReducer";
import Chip from "../../../../global/Chip/Chip";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import InputSelect from "../../../../global/InputSelect/InputSelect";

import InputText from "../../../../global/InputText/InputText";

interface PropsData {
  isActive: Boolean | string;
  productOptions: any;
  priceOptions: any;
}

const SearchForm: React.FC<PropsData> = ({ isActive, productOptions, priceOptions }): JSX.Element => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      code: "",
      name: "",
      // product: null as any,
      // type: null as any,
      // priceList: null as any,
      // description: "",
      // isActive: true,
    },
    onSubmit: (values) => {
      // const updateData = {
      //   product: values?.product?.text || null,
      //   type: values?.type?.text || null,
      //   priceList: values?.priceList?.text || null,
      // };
      setFilterData(values);
    },
  });
  useEffect(() => {
    dispatch(
      ServiceData({
        ...filterData,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
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
            items={[]}
            value={formik.values.code}
            onChange={(e) => handleChangeCode(e, "code")}
            onSelect={(val: any) => handleSelect(val, "code")}
          />
          <AutocompleteInput
            label={"عنوان"}
            items={[]}
            value={formik.values.name}
            onChange={(e) => handleChangeCode(e, "name")}
            onSelect={(val: any) => handleSelect(val, "name")}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
          <PerfesionalSearch formData={formik.handleSubmit}>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <div>
                <InputSelect
                  label="محصول"
                  name="product"
                  handleChange={formik.setFieldValue}
                  // @ts-ignore
                  values={formik.values.product}
                  options={productOptions?.options}
                />
                <InputSelect
                  label="نوع"
            
                  name="type"
                  handleChange={formik.setFieldValue}
                  // @ts-ignore
                  values={formik.values.type}
                  options={[
                    { id: "0", text: "پایه" },
                    { id: "1", text: "تکمیلی" },
                  ]}
             
                />
              </div>
              <div>
                <InputSelect
                  label="نرخ نامه"
                  name="priceList"
                  handleChange={formik.setFieldValue}
                  // @ts-ignore
                  values={formik.values.priceList}
                  options={priceOptions?.options}
                />

                <InputText
                  label=" توضیحات"
                  // @ts-ignore
                  values={formik.values.description}
                  name="description"
                  handleChange={formik.handleChange}
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

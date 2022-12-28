import React, { memo, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../../../global/Chip/Chip";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { productData } from "../../../../redux/ProductDefineData/ProductDefineData";
import { apiRoute } from "../../../../services/apiRoute";
import { GetDataParams, selectDataFromServer } from "../../../../services/Service_call";
import { FiSearch } from "react-icons/fi";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import { ErrorAlert } from "../../../../global/alert/Alert";


interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
  productOptions?:any
}

const SearchForm:React.FC <PropsData> = ({ isActive, isUpdating,productOptions }): JSX.Element => {

  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
   // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      code: "",
      name: "",
      isActive: isActive,
      productGroup: "" as any,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
   
    dispatch(
      productData({
        code: formik.values.code,
        name: formik.values.name,
        productGroup:formik.values.productGroup.id,
        isActive: isActive,
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating,pageNumbers]);
  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
    // const filterData = data.filter((item) => item.text.includes(e.target.value));
    // setServiceCodeOptions(
    //   filterData.map((item) => {
    //     return {
    //       label: item?.text,
    //     };
    //   })
    // );
    //mr hash please dont delete this comments//
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

          <InputSelect
            label="گروه بندی محصول"
            name="productGroup"
            handleChange={formik.setFieldValue}
            values={formik.values?.productGroup}
            options={productOptions}
          />
          <SimpleButton
            type={'submit'}
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



import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { filterSalesChannel } from "../../../redux/SaleChannel/SalesChannelReducer";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import Chip from "../../../global/Chip/Chip";

interface PropsData {
  isActive: Boolean | string;
}
const SearchForm: React.FC<PropsData> = ({ isActive }): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      search: "",
      // name:"",
      isActive: isActive,

    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    dispatch(
      filterSalesChannel({
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
            value={formik.values.search}
            onChange={(e) => handleChangeCode(e, "search")}
            onSelect={(val: any) => handleSelect(val, "search")}
          />
          {/* <AutocompleteInput
            label={"عنوان"}
            items={[]}
            value={formik.values.name}
            onChange={(e) => handleChangeCode(e, "name")}
            onSelect={(val: any) => handleSelect(val, "name")}
          /> */}
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

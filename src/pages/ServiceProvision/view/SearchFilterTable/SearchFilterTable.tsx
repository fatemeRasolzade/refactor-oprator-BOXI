import React, {useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Chip from "../../../../global/Chip/Chip";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import { FiSearch } from "react-icons/fi";
import { ServiceProvisionData } from "../../../../redux/ServiceProvision/ServiceProvision";



const SearchFilterTable:React.FC  = (): JSX.Element => {
  const dispatch = useDispatch();
   // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      code: "",
      name: ""
    },
    onSubmit: (values) => {
        dispatch(ServiceProvisionData({pageNumbers:pageNumbers,...values}) as any)
      setFilterData(values);
    },
  });

  


  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
          <AutocompleteInput
            label={"کد"}
            items={[]}
            value={formik.values.code}
            onChange={(e) =>formik.setFieldValue("code", e.target.value)}
            onSelect={(val: any) => formik.setFieldValue("code",val )}
          />
          <AutocompleteInput
            label={"عنوان"}
            items={[]}
            value={formik.values.name}
            onChange={(e) =>formik.setFieldValue("name", e.target.value)}
            onSelect={(val: any) => formik.setFieldValue("name",val )}
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

export default SearchFilterTable;



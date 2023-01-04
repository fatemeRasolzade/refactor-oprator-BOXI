import React, { useState } from "react";
import { Formik } from "formik";
import AutocompleteInput from "./../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "./../../../../global/SimpleButton/SimpleButton";
import { FiSearch } from "react-icons/fi";
import Chip from "../../../../global/Chip/Chip";
import { useSelector, useDispatch } from "react-redux";
import { ProductGroupsData } from "./../../../../redux/ProductGroup/ProductGroup";
const NavbarProductGroup = () => {
  const [filterData, setfilterData] = useState({});
  const { pageNumbers } = useSelector((state: any) => state.paginate);
  const dispatch = useDispatch();
  return (
    <div>
      <Formik
        initialValues={{
          code: "",
          name: "",
        }}
        onSubmit={(values) => {
          setfilterData(values);
          dispatch(ProductGroupsData({ ...values, pageNumbers: pageNumbers }) as any);
        }}
      >
        {(formik) => (
          <>
            <div className="searchForm">
              <AutocompleteInput
                label={"کد"}
                items={[]}
                value={formik.values.code}
                onChange={(e) => formik.setFieldValue("code", e.target.value)}
                onSelect={(val: any) => formik.setFieldValue("code", val)}
              />

              <AutocompleteInput
                label={"عنوان"}
                items={[]}
                value={formik.values.name}
                onChange={(e) => formik.setFieldValue("name", e.target.value)}
                onSelect={(val: any) => formik.setFieldValue("name", val)}
              />
              <SimpleButton
                type={"submit"}
                className="full-gray-btn mb-3"
                icon={<FiSearch size={25} className="text-darkGray" />}
                text="جستجو"
                handelClick={formik.handleSubmit as any}
              />
            </div>
            <div>{filterData && <Chip filterData={filterData} formData={formik} />}</div>
          </>
        )}
      </Formik>
    </div>
  );
};

export default NavbarProductGroup;

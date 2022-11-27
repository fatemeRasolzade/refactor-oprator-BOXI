import { useFormik } from "formik";
import React, { ChangeEvent, FC, useState } from "react";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

interface MyFormValues {
  code: string;
  name: string;
}

interface SearchFilterProps {}

const SearchFilter: FC<SearchFilterProps> = (): JSX.Element => {
  const initialValues: MyFormValues = { code: "", name: "" };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {},
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("code", e.target.value);
  };
  const selectHandler = (val: any) => {
    formik.setFieldValue("code", val);
  };

  return (
    <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
      <form onSubmit={formik.handleSubmit}>
        <div className=" flex gap-3 justify-start items-center flex-wrap">
          <div className="Max-sm:mb-3">
            <AutocompleteInput
              label={"عنوان نقش"}
              items={[]}
              value={formik.values.name}
              onChange={handleChange}
              onSelect={selectHandler}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

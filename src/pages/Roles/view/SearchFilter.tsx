import { useFormik } from "formik";
import React, { ChangeEvent, FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

import InputIcon from "../../../global/InputIcon/InputIcon";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { RoleData } from "../../../redux/RolsData/RolesData";

interface MyFormValues {
  code: string;
  name: string;
  isActive?: boolean;
  setIsActive?: (value: boolean) => void;
}

interface SearchFilterProps {
  isActive: boolean;
}

const SearchFilter: FC<SearchFilterProps> = ({ isActive }): JSX.Element => {
  const dispatch = useDispatch();

  const initialValues: MyFormValues = { code: "", name: "" };
  const [role, setRole] = useState<string>("");
  const [hub, setAccess] = useState<string>("");

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: (values) => {},
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(e.target.name, e.target.value);
  };
  const selectHandler = (val: any) => {
    formik.setFieldValue("code", val);
  };
  const handelSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(
        RoleData({
          code: hub,
          name: role,
          isActive: isActive,
          pageSize: 10,
          pageNumber: 1,
        }) as any
      );
    } catch (error) {}
  };
  const { values, errors, handleSubmit, setFieldValue } = formik;

  return (
    <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
      <form onSubmit={handelSubmit}>
        <div className=" flex gap-3 justify-start items-center flex-wrap">
          <div className="Max-sm:mb-3">
            <AutocompleteInput
              items={[]}
              label="نقش"
              value={values.name}
              onSelect={() => console.log()}
              onChange={handleChange}
            />
          </div>
          <div>
            <AutocompleteInput
              items={[]}
              label="دسترسی ها"
              onSelect={() => console.log()}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <SimpleButton
            className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
            icon={<BiSearch size={20} />}
            text="جستجو"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

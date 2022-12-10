import { FC, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { BiSearch } from "react-icons/bi";

import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

import InputSelect from "../../../global/InputSelect/InputSelect";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface MyFormValues {
  permission: Array<any>;
  name: string;
  isActive?: boolean;
}

interface SearchFilterProps {
  isActive: boolean;
  setFilterData: (newFilter: any) => void;
}

const SearchFilter: FC<SearchFilterProps> = ({
  isActive,
  setFilterData,
}): JSX.Element => {
  const initialValues: MyFormValues = { permission: [], name: "" };

  const [permissionOptions, setPermissionOptions] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      setFilterData({
        permission: values.permission as any,
        name: values.name,
        isActive: isActive,
        pageSize: 10,
        pageNumber: 1,
      });
    },
  });

  const getRoleFilterData = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://boxi.local:40000/resource-api/permission/select"
      );
      setPermissionOptions(
        res.data.payload.content ? res.data.payload.content : []
      );
    } catch (error) {}
  }, []);

  const handleSelect = (name: string, value: any) => {
    let newArray = [...values.permission];
    newArray.push(value);

    formik.setFieldValue(name, newArray);
  };

  useEffect(() => {
    getRoleFilterData();
  }, [getRoleFilterData]);

  const { values, handleSubmit } = formik;

  return (
    <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
      <form onSubmit={handleSubmit}>
        <div className=" flex gap-3 justify-start items-center flex-wrap">
          <div className="Max-sm:mb-3 mb-4">
            <AutocompleteInput
              items={[]}
              label="نقش"
              value={values.name}
              onSelect={() => console.log()}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
            />
          </div>
          <div>
            <InputSelect
              isMulti
              label="دسترسی ها"
              name="permission"
              handleChange={(value: any) => console.log("value", value)}
              values={formik.values?.permission}
              options={permissionOptions}
            />
          </div>
          <div className="mb-4">
            <SimpleButton
              className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
              icon={<BiSearch size={20} />}
              text="جستجو"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

import axios from "axios";
import { useFormik } from "formik";
import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";

import InputIcon from "../../../global/InputIcon/InputIcon";
import InputSelect from "../../../global/InputSelect/InputSelect";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { RoleData } from "../../../redux/RolsData/RolesData";

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
  const dispatch = useDispatch();

  const initialValues: MyFormValues = { permission: [], name: "" };

  const [permissionOptions, setPermissionOptions] = useState([]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit: async (values) => {
      try {
        setFilterData({
          permission: values.permission as any,
          name: values.name,
          isActive: isActive,
          pageSize: 10,
          pageNumber: 1,
        });
      } catch (error) {
        debugger;
      }
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

    formik.setFieldValue("permission", newArray);
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
              label="دسترسی ها"
              name="permission"
              handleChange={handleSelect}
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

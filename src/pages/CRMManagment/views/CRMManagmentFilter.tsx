import { useFormik } from "formik";

import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { setFilter } from "../../../redux/CRMCustomerGroup/CRMCustomerGroupReducer";

const CRMManagmentFilter = () => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: any) => state.crmCustomer);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
      name: "",
    },
    onSubmit: async (values) => {
      dispatch(setFilter({ ...filter, name: values.name, code: values.code }));
    },
  });
  return (
    <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
      <form onSubmit={formik.handleSubmit}>
        <div className=" flex gap-3 justify-start items-start flex-wrap">
          <div className="Max-sm:mb-3">
            <AutocompleteInput
              items={[]}
              label="کد"
              value={formik.values.code}
              onSelect={() => console.log()}
              onChange={(e) => formik.setFieldValue("code", e.target.value)}
            />
          </div>
          <div>
            <AutocompleteInput
              items={[]}
              label="عنوان"
              value={formik.values.name}
              onSelect={() => console.log()}
              onChange={(e) => formik.setFieldValue("name", e.target.value)}
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

export default CRMManagmentFilter;

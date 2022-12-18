import { useFormik } from "formik";
import React, { FC } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import PerfesionalSearch from "../../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../../global/Autocomplete/AutocompleteInput";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

interface SearchFilterProps {}
const SearchFilter: FC<SearchFilterProps> = (): JSX.Element => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      pinCode: "",
    },
    onSubmit: async (values) => {},
  });
  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit} className="flex">
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <div>
              <AutocompleteInput
                items={[]}
                value={formik.values.pinCode}
                label={"پین کد"}
                onChange={(e) =>
                  formik.setFieldValue("pinCode", e.target.value)
                }
              />
            </div>
            <div className="mb-5">
              <SimpleButton
                type="submit"
                className="full-gray-btn w-[160px] h-[40px] centering rounded-md"
                icon={<BiSearch size={20} />}
                text="جستجو"
              />
            </div>
          </div>
          <PerfesionalSearch
            text="جستجوی پیشرفته"
            LeftIcon={<BiChevronDown />}
            formData={() => {
              formik.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6 my-6">
              <div className="flex gap-6">
                <AutocompleteInput
                  items={[]}
                  value={formik.values.pinCode}
                  label={"کد هاب"}
                  onChange={(e) =>
                    formik.setFieldValue("pinCode", e.target.value)
                  }
                />
                <AutocompleteInput
                  items={[]}
                  value={formik.values.pinCode}
                  label={"نام هاب"}
                  onChange={(e) =>
                    formik.setFieldValue("pinCode", e.target.value)
                  }
                />
              </div>
              <div className="flex gap-6">
                <MultiSelect
                  wrapperClassName="w-fit"
                  label="شهر"
                  name="permission"
                  handleChange={(valueName: any, value: any) =>
                    formik.setFieldValue(valueName, value)
                  }
                  //   values={formik.values?.permission}
                  options={[]}
                />
                <MultiSelect
                  wrapperClassName="w-fit"
                  label="نوع سوخت"
                  name="permission"
                  handleChange={(valueName: any, value: any) =>
                    formik.setFieldValue(valueName, value)
                  }
                  //   values={formik.values?.permission}
                  options={[]}
                />
              </div>
            </div>
          </PerfesionalSearch>
        </form>
      </div>
    </div>
  );
};

export default SearchFilter;

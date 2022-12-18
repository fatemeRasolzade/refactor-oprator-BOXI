import { useFormik } from "formik";
import React from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

const SearchFilter = () => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      code: "",
    },
    onSubmit: async (values) => {},
  });

  return (
    <div className="flex flex-col">
      <div className="flex justify-start items-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit} className="flex">
          <div className=" flex gap-3 justify-start items-center flex-wrap">
            <div className="Max-sm:mb-3">
              <AutocompleteInput
                items={[]}
                value={formik.values.code}
                label={"کد "}
                onChange={(e) =>
                  formik.setFieldValue("personelCode", e.target.value)
                }
              />
            </div>
            <div>
              <AutocompleteInput
                items={[]}
                value={formik.values.code}
                label={"عنوان"}
                onChange={(e) =>
                  formik.setFieldValue("personelCode", e.target.value)
                }
              />
            </div>
            <div className="mb-4">
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
                  value={formik.values.code}
                  label={"عنوان"}
                  onChange={(e) =>
                    formik.setFieldValue("personelCode", e.target.value)
                  }
                />
                <AutocompleteInput
                  items={[]}
                  value={formik.values.code}
                  label={"عنوان"}
                  onChange={(e) =>
                    formik.setFieldValue("personelCode", e.target.value)
                  }
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

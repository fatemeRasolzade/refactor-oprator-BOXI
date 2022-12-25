import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import AutocompleteInput from "../../../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../../../global/SimpleButton/SimpleButton";
import Chip from "../../../../../global/Chip/Chip";
import InputSelect from "../../../../../global/InputSelect/InputSelect";
import { filterRoute } from "../../../../../redux/Transportation/route/RouteData";

interface PropsData {
  isActive: Boolean | string;
  hubOptions: any;
}

const SearchForm: React.FC<PropsData> = ({ isActive, hubOptions }): JSX.Element => {
  const dispatch = useDispatch();
  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  const [targethubOptions, setTargetHubOptions] = useState(hubOptions.options);
  const [desthubOptions, setdesttHubOptions] = useState(hubOptions.options);

  const formik = useFormik({
    // enableReinitialize: true,
    initialValues: {
      name: "",
      hubName: "",
      targetHub: null,
      sourceHub: null,
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });
  useEffect(() => {
    setTargetHubOptions(hubOptions.options);
    setdesttHubOptions(hubOptions.options);
  }, [hubOptions?.options?.length, filterData]);
  useEffect(() => {
    dispatch(
      filterRoute({
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
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    formik.setFieldValue(name, val);
  };

  const filterOptions = (item: any, route: any) => {
    if (route === "source") {
      const filter = hubOptions.options.filter((hub: any) => hub.id !== item.id);
      setTargetHubOptions(filter);
    } else if (route === "target") {
      const filter = hubOptions.options.filter((hub: any) => hub.id !== item.id);
      setdesttHubOptions(filter);
    }
  };
  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form className="flex-start-start flex-wrap gap-5" onSubmit={formik.handleSubmit}>
          <AutocompleteInput
            label={"نام هاب"}
            items={[]}
            value={formik.values.hubName}
            onChange={(e) => handleChangeCode(e, "hubName")}
            onSelect={(val: any) => handleSelect(val, "hubName")}
          />
          <AutocompleteInput
            label={"نام مسیر"}
            items={[]}
            value={formik.values.name}
            onChange={(e) => handleChangeCode(e, "name")}
            onSelect={(val: any) => handleSelect(val, "name")}
          />

          <div>
            <InputSelect
              label="مبدا"
              name="sourceHub"
              options={desthubOptions}
              handleChange={(name: string, value: any) => {
                filterOptions(value, "source");
                formik.setFieldValue("sourceHub", { id: value.id, text: value.text });
              }}

              values={formik.values.sourceHub}
              error={formik.touched.sourceHub && formik.errors.sourceHub}
            />
          </div>

          <div>
            <InputSelect
              label="مقصد"
              name="targetHub"

              handleChange={(name: string, value: any) => {
                filterOptions(value, "target");
                formik.setFieldValue("targetHub", { id: value.id, text: value.text });
              }}
              values={formik.values.targetHub}
              error={formik.touched.targetHub && formik.errors.targetHub}
              options={targethubOptions}
            />
          </div>
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

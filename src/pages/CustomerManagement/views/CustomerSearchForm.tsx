import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import Chip from "../../../global/Chip/Chip";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { customerData } from "../../../redux/CustomerManagement/CustomerManagementData";

type CustomerSearchFormProps = {
  isActive?: Boolean | string;
  isUpdating?: Boolean;
};
const CustomerSearchForm = ({
  isActive,
  isUpdating,
}: CustomerSearchFormProps) => {
  const dispatch = useDispatch();
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
  const [filterData, setFilterData] = useState({});
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      isActive: isActive,
      telNumber: "",
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  useEffect(() => {
    // @ts-ignore
    dispatch(customerData({ ...formik.values, isActive }));
  }, [isActive, filterData, isUpdating]);
  const data = [
    { id: 1, text: "product" },
    { id: 2, text: "price" },
    { id: 3, text: "vemdor" },
  ];
  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    formik.setFieldValue(name, e.target.value);
    const filterData = data.filter((item) =>
      item.text.includes(e.target.value)
    );
    setServiceCodeOptions(
      filterData.map((item) => {
        return {
          label: item?.text,
        };
      })
    );
    //mr hash please dont delete this comments//
    // const params = `${e.target.value}`;
    // setOptions(data.filter(item=>item.text.includes(e.target.value)))
    // GetDataParams(apiRoute().get.GET_PRODUCT + params);
  };
  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    formik.setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    formik.setFieldValue(name, val);
  };

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col">
        <form
          className="flex-start-center flex-wrap gap-5"
          onSubmit={formik.handleSubmit}
        >
          <AutocompleteInput
            label={"کد مشتری"}
            items={serviceCodeOptions}
            value={formik.values.code}
            onChange={(e) => handleChangeCode(e, "code")}
            onSelect={(val: any) => handleSelect(val, "code")}
          />
          <AutocompleteInput
            label={"نام مشتری"}
            items={[]}
            value={formik.values.name}
            onChange={(e) => handleChangeName(e, "name")}
            onSelect={(val: any) => handleSelect(val, "name")}
          />
          <AutocompleteInput
            label={"شماره تماس"}
            items={[]}
            value={formik.values.telNumber}
            onChange={(e) => handleChangeName(e, "telNumber")}
            onSelect={(val: any) => handleSelect(val, "telNumber")}
          />
          <SimpleButton
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
          <PerfesionalSearch />
        </form>
      </div>

      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default CustomerSearchForm;

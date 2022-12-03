import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
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
      <div className="flex-start-center mt-6 gap-4 flex-wrap">
        <form onSubmit={formik.handleSubmit}>
          <div className=" flex-start-center gap-3 flex-wrap">
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

            {/* <InputIcon text='عنوان' handleOnSelect={undefined} handleOnSearch={()=>formik.setFieldValue("name", formik.values.name)}/> */}
            <SimpleButton
              className="full-gray-btn"
              icon={<BiSearch size={20} />}
              text="جستجو"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerSearchForm;

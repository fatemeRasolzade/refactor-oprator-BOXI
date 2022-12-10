import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import PerfesionalSearch from "../../../components/PerfesionalSearch/PerfesionalSearch";
import { customerData } from "../../../redux/CustomerManagement/CustomerManagementData";
import { GetDataParams } from "../../../services/Service_call";
import { CREATE_CUSTOMER } from "../../../services/apiRoute";
import AutocompleteInput from "../../../global/Autocomplete/AutocompleteInput";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";
import { FiSearch } from "react-icons/fi";
import Chip from "../../../global/Chip/Chip";

interface PropsData {
  isActive: Boolean | string;
  isUpdating: Boolean;
}

const CustomerSearchForm: React.FC<PropsData> = ({
  isActive,
  isUpdating,
}): JSX.Element => {
  const dispatch = useDispatch();

  // @ts-ignore
  const { pageNumbers } = useSelector((state) => state.paginate);
  const [filterData, setFilterData] = useState({});
  // const [productOptions, setProductOptions] = useState([]);
  const formik = useFormik({
    initialValues: {
      // username: "",
      // postalCode: "",
      // address: "",
      name: "",
      code: "",
      telNumber: "",
      isActive: isActive,
      // selectParentCustomer: {
      //   id: 0,
      //   text: "",
      // },
    },
    onSubmit: (values) => {
      setFilterData(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: any = formik;

  useEffect(() => {
    dispatch(
      customerData({
        ...values,
        telNumber: parseInt(values.telNumber),
        pageSize: 10,
        pageNumber: pageNumbers,
      }) as any
    );
  }, [isActive, filterData, isUpdating, pageNumbers]);

  const handleChangeCode = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFieldValue(name, e.target.value);
  };

  return (
    <>
      <div className="flex-center-start mt-6 gap-4 flex-wrap flex-col ">
        <form
          className="flex-start-center flex-wrap gap-5 items-center"
          onSubmit={handleSubmit}
        >
          <AutocompleteInput
            label={"کد مشتری"}
            value={values.code}
            onChange={(e) => setFieldValue("code", e.target.value)}
          />
          <AutocompleteInput
            label={"نام مشتری"}
            value={values.name}
            onChange={(e) => setFieldValue("name", e.target.value)}
          />
          <AutocompleteInput
            label={"شماره تماس"}
            value={values.telNumber}
            onChange={(e) => setFieldValue("telNumber", e.target.value)}
          />
          <SimpleButton
            type={"submit"}
            className="full-gray-btn"
            icon={<FiSearch size={25} className="text-darkGray" />}
            text="جستجو"
          />
          <PerfesionalSearch />
        </form>
      </div>
      {/* list of chip */}
      {filterData && <Chip filterData={filterData} formData={formik} />}
    </>
  );
};

export default memo(CustomerSearchForm);

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
  const [serviceCodeOptions, setServiceCodeOptions] = useState<any>([]);
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

  const { values, setFieldValue, handleSubmit }: any = formik;

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
  const handleChangeName = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    setFieldValue(name, e.target.value);
  };
  const handleSelect = (val: any, name: string) => {
    setFieldValue(name, val);
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
            items={serviceCodeOptions}
            value={values.code}
            onChange={(e) => handleChangeCode(e, "code")}
            onSelect={(val: any) => handleSelect(val, "code")}
          />
          <AutocompleteInput
            label={"نام مشتری"}
            items={[]}
            value={values.name}
            onChange={(e) => handleChangeName(e, "name")}
            onSelect={(val: any) => handleSelect(val, "name")}
          />
          <AutocompleteInput
            label={"شماره تماس"}
            items={[]}
            value={values.telNumber}
            onChange={(e) => handleChangeName(e, "telNumber")}
            onSelect={(val: any) => handleSelect(val, "telNumber")}
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

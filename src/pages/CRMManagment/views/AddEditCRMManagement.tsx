import { FC, useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomSwitch from "../../../global/Switch/Switch";
import InputText from "../../../global/InputText/InputText";
import axios from "axios";
import MultiSelect from "../../../global/multiselect/MultiSelect";
import MultiLineText from "../../../global/MultiLineText/MultiLineText";
import SimpleButton from "../../../global/SimpleButton/SimpleButton";

interface SetIsModalAddEditInterface {
  isOpen: boolean;
  data: any;
}
interface AddEditCRMManagementProps {
  currentData?: any;
  setIsModalAddEdit: (currentData: SetIsModalAddEditInterface) => void;
}
const AddEditCRMManagement: FC<AddEditCRMManagementProps> = ({
  currentData,
}): JSX.Element => {
  const [selectOptions, setSelectOptions] = useState([]);
  const validation = Yup.object().shape({});

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {},
    onSubmit: async (values, { resetForm }) => {},
  });

  const handleGetSelectData = useCallback(async () => {
    try {
      const res = await axios({
        url: "http://boxi.local:40000/core-api/customersegment/select?filter=",
        method: "GET",
      });
      setSelectOptions(res.data?.payload);
    } catch (error) {}
  }, []);
  useEffect(() => {
    handleGetSelectData();
  }, [handleGetSelectData]);

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="p-6 ">
        <div className="grid grid-cols-5 gap-6 my-6">
          <div className="col-span-2 ">
            <InputText
              wrapperClassName="w-full"
              label="کد پرسنلی"
              name="personelCode"
              handleChange={formik.handleChange}
              // values={formik.values.personelCode}
              important
              type={"text"}
              // error={formik.errors.personelCode}
            />
          </div>
          <div className="col-span-2 ">
            <InputText
              wrapperClassName="w-full"
              label="کد پرسنلی"
              name="personelCode"
              handleChange={formik.handleChange}
              // values={formik.values.personelCode}
              important
              type={"text"}
              // error={formik.errors.personelCode}
            />
          </div>
          <div className={"col-span-1 h-[40px] mb-[20px]"}>
            <CustomSwitch
              active={true}
              handleChange={(value) => formik.setFieldValue("isActive", value)}
            />
          </div>
          <div className="col-span-5">
            <MultiSelect wrapperClassName="w-full" options={selectOptions} />
          </div>
          <div className="col-span-5">
            <MultiLineText
              label=" ویرایشگر"
              values={"sd"}
              name="description"
              handleChange={formik.handleChange}
              //   error={formik.touched.description && formik.errors.description}
            />
          </div>
          <div className="col-span-5">
            <MultiLineText
              label=" توضیحات"
              values={"sd"}
              name="description"
              handleChange={formik.handleChange}
              //   error={formik.touched.description && formik.errors.description}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 ">
          <div className="col-span-4 flex gap-4 w-full justify-end">
            <SimpleButton
              type="submit"
              text="بله"
              className="full-tomato-btn px-[90px] "
            />
            <SimpleButton
              type="button"
              text="خیر"
              className="full-lightTomato-btn px-[90px]"
              handelClick={() => {
                // setIsModalOpen(false);
                formik.resetForm();
              }}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEditCRMManagement;

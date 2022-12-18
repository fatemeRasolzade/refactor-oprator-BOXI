import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Provinces from "../../../../components/provinces/Provinces";
import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";

interface AddFormToListProps {}
const AddFormToList: FC<AddFormToListProps> = (): JSX.Element => {
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {},
    onSubmit: async (values, { resetForm }) => {},
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="w-10/12 grid grid-cols-5 gap-2">
        <div className="col-span-2">
          <InputText
            wrapperClassName="w-full col-span-2"
            label="کد "
            name="personelCode"
            handleChange={formik.handleChange}
            values={""}
            important
            type={"text"}
            // error={formik.errors.personelCode}
          />
        </div>
        <div className="col-span-3">
          <InputText
            wrapperClassName="w-full "
            label="عنوان"
            name="personelCode"
            handleChange={formik.handleChange}
            values={""}
            important
            type={"text"}
            // error={formik.errors.personelCode}
          />
        </div>
      </div>
      <div className="w-10/12 grid grid-cols-5 gap-2">
        <div className="col-span-4">
          <fieldset className="border rounded-xl p-6">
            <legend className="px-3"> جزئیات رده جغرافیایی</legend>
            <div className="grid grid-cols-2 gap-6">
              <Provinces form={formik} />
            </div>
          </fieldset>
        </div>
        <div className={` col-span-1  h-[40px] mt-[10px]`}>
          <CustomSwitch
            active={true}
            handleChange={(value) => formik.setFieldValue("isActive", value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-end my-6">
        <SimpleButton
          icon={<BiPlus color="white" />}
          type="submit"
          text="درج در لیست"
          className="full-tomato-btn px-[50px] w-fit "
        />
      </div>
    </form>
  );
};

export default AddFormToList;

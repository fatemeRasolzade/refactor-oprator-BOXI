import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import React, { FC } from "react";
import { BiPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

import Provinces from "../../../../components/provinces/Provinces";
import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";
import { convertToObjects } from "../../../../tools/functions/Methods";

interface AddFormToListProps {
  setTableList: (values: any) => void;
}
const AddFormToList: FC<AddFormToListProps> = ({
  setTableList,
}): JSX.Element => {
  const navigate = useNavigate();

  const validation = Yup.object().shape(
    {

      fromCountryDevision: Yup.array().required(),
      toCountryDevision: Yup.array().required(),

      fromSourceCity: Yup.array().when(
        "fromDestinationCity",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromDestinationCity: Yup.array().when(
        "fromSourceCity",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromDestinationLocation: Yup.array().when(
        "fromSourceLocation",
        (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
      fromSourceLocation: Yup.array().when(
        "fromDestinationLocation",
        (val: any, schema: any) => {
          if (val) {
            return Yup.array().required();
          } else {
            return Yup.array().notRequired();
          }
        }
      ),
    },
    [
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromSourceCity", "fromDestinationCity"],
    ]
  );
  const validationTitle = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.number().required(),
  });
  const formikTitle = useFormik({
    enableReinitialize: true,
    validationSchema: validationTitle,
    initialValues: {
      isActive: true,
      code: "",
      name: "",
    },
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      id: "",
      fromCountryDevision: "",
      toCountryDevision: "",
      fromDestinationCity: "",
      fromSourceCity: "",
      fromSourceLocation: "",
      fromDestinationLocation: "",
    },
    onSubmit: async (values, { resetForm }) => {
      let fromCountryDevisiondsdsd: any = [];
      let toCountryDevisiond: any = [];
      let attributeDivition;
      fromCountryDevisiondsdsd =
        values.fromDestinationLocation?.length !== 0
          ? values.fromDestinationLocation
          : values.fromDestinationCity.length !== 0
          ? values.fromDestinationCity
          : values.fromCountryDevision.length !== 0
          ? values.fromCountryDevision
          : [];
      toCountryDevisiond =
        values.fromSourceLocation.length !== 0
          ? values.fromSourceLocation
          : values.fromSourceCity.length !== 0
          ? values.fromSourceCity
          : values.toCountryDevision.length !== 0
          ? values.toCountryDevision
          : [];
      attributeDivition =
        fromCountryDevisiondsdsd.length !== 0
          ? convertToObjects(
              fromCountryDevisiondsdsd,
              toCountryDevisiond,
              "from"
            )
          : [];

      let data = {
        id: values?.id ? values.id : uuid(),
        customDevisionDetails: attributeDivition,
      };
      setTableList(data);
      resetForm();
    },
  });
  return (
    <>
      <form onSubmit={formikTitle.handleSubmit}>
        <div className="w-10/12 grid grid-cols-5 gap-2">
          <div className="col-span-2">
            <InputText
              wrapperClassName="w-full col-span-2"
              label="کد "
              name="code"
              handleChange={formikTitle.handleChange}
              values={formikTitle.values.code}
              important
              type={"text"}
              error={formikTitle.touched.code && formikTitle.errors.code}
            />
          </div>
          <div className="col-span-3">
            <InputText
              wrapperClassName="w-full "
              label="عنوان"
              name="name"
              handleChange={formikTitle.handleChange}
              values={formikTitle.values.name}
              important
              type={"text"}
              error={formikTitle.touched.name && formikTitle.errors.name}
            />
          </div>
        </div>
      </form>
      <form onSubmit={formik.handleSubmit}>
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
              handleChange={(value) => formikTitle.setFieldValue("isActive", value)}
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
    </>
  );
};

export default AddFormToList;

import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

import LocationForm from "./LocationForm";

const GeoWrapper = () => {
  const validationTitle = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.number().required(),
  });

  const [tableList, setTableList] = useState<Array<any>>([]);

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
  return (
    <div>
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
      <LocationForm
        tableList={tableList}
        setTableList={(value) => setTableList((prev) => [...prev, value])}
        formikTitle={formikTitle}
      />
      <div className="my-6">
        <div className="flex w-full justify-end gap-4">
          <SimpleButton
            type="submit"
            text="لغو"
            className="full-lightTomato-btn w-28 "
            //   handelClick={() => setIsModalOpen(false)}
          />
          <SimpleButton
            type="submit"
            text="افزودن"
            className="full-tomato-btn w-28 "
            handelClick={() => formikTitle.handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default GeoWrapper;

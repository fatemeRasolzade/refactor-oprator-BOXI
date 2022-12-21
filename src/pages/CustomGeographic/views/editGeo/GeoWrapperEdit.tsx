import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import InputText from "../../../../global/InputText/InputText";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";

import LocationForm from "./LocationForm";

const GeoWrapperEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location.state);
  console.log(
    "updateRespone",
    updateRespone(location?.state?.customDevisionDetails)
  );

  const validationTitle = Yup.object().shape({
    name: Yup.string().required(),
    code: Yup.number().required(),
  });
  const updatedData = location?.state
    ? updateRespone(location?.state?.customDevisionDetails)
    : [];
  const [tableList, setTableList] = useState<Array<any>>(updatedData);

  const formikTitle = useFormik({
    enableReinitialize: true,
    validationSchema: validationTitle,
    initialValues: {
      isActive: location?.state ? location?.state?.isActive : true,
      code: location?.state ? location?.state?.code : "",
      name: location?.state ? location?.state?.name : "",
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: location.state.id,
        code: values?.code,
        isActive: values?.isActive,
        name: values?.name,
        customDevisionDetails: tableList
          .map((item) => item.customDevisionDetails)
          .flat(1),
      };
      try {
        await axios({
          url: "http://boxi.local:40000/core-api/customcountrydevision",
          method: "put",
          data: data,
        });

        toast.success("رده جغرافیایی با موفقیت ویرایش شد ");
        resetForm();
        navigate("/basic-information/custom-geographic-category");
      } catch (error: any) {
        toast.error(error?.response?.data?.errors?.message || "مشکلی پیش آمده");
      }
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
            handelClick={() => {
              formikTitle.resetForm();
              setTableList([]);
              navigate("/basic-information/custom-geographic-category");
            }}
          />
          <SimpleButton
            type="submit"
            text="افزودن"
            className="full-tomato-btn w-28 "
            handelClick={() => {
              formikTitle.submitForm();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default GeoWrapperEdit;

const updateRespone = (response: any) => {
  const data = response.map((item: any) => ({
    id: item.id,
    isActive: item?.isActive,
    customDevision: item?.customDevision,
    fromDestinationState: item.fromCountryDevision
      // .map(from=>from.fromCountryDevision).flat(1)
      .filter((division: any) => division.countryType === "PROVINCE")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
    fromDestinationLocation: item.fromCountryDevision
      .filter((division: any) => division.countryType === "REGION")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
    fromDestinationCity: item.fromCountryDevision
      .filter((division: any) => division.countryType === "CITY")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
    fromSourceState: item.toCountryDevision
      .filter((division: any) => division.countryType === "PROVINCE")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
    fromSourceLocation: item.toCountryDevision
      .filter((division: any) => division.countryType === "REGION")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
    fromSourceCity: item.toCountryDevision
      .filter((division: any) => division.countryType === "CITY")
      .filter(
        (elem: any, index: number, arr: any) =>
          index === arr.findIndex((t: any) => t.id === elem.id)
      ),
  }));

  const finalData = data.map((item: any) => ({
    ...item,
    customDevisionDetails:
      item.fromDestinationLocation && item.fromDestinationLocation.length !== 0
        ? convertResponseToObjects(
            item.fromDestinationLocation,
            item.fromSourceLocation,
            item.id,
            item.customDevision,
            item.isActive,
            "test",
            null
          )
        : item.fromDestinationCity && item.fromDestinationCity.length !== 0
        ? convertResponseToObjects(
            item.fromDestinationCity,
            item.fromSourceCity,
            item.id,
            item.customDevision,
            item.isActive,
            "test",
            null
          )
        : item.fromDestinationState && item.fromDestinationState.length !== 0
        ? convertResponseToObjects(
            item.fromDestinationState,
            item.fromSourceState,
            item.id,
            item.customDevision,
            item.isActive,
            "test",
            null
          )
        : [],
    fromCountryDevision: item.fromDestinationState,
    toCountryDevision: item.fromSourceState,
  }));

  return finalData;
};

const convertResponseToObjects = (
  from: any,
  to: any,
  id: any,
  customDevision: any,
  isActive: any,
  type: any,
  consignmenType: any | undefined
) => {
  let arr = [];
  for (let i = 0; i < from.length; i++) {
    for (let j = 0; j < to.length; j++) {
      if (type === "pricelists") {
        arr.push({
          fromCountryDevision: from[i],
          toCountryDevision: to[j],
          id: id,
          isActive: isActive,
          consignmenType: consignmenType || null,
        });
      } else {
        arr.push({
          fromCountryDevision: from[i],
          toCountryDevision: to[j],
          id: id,
          isActive: isActive,
          customDevision: customDevision || { id: "", text: "" },
        });
      }
    }
  }
  return arr;
};

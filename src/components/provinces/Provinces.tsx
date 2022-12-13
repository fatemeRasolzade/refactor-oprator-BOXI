import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import InputSelect from "../../global/InputSelect/InputSelect";
import MultiSelect from "../../global/multiselect/MultiSelect";

const Provinces = () => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);

  const [cityOption, setCityOption] = useState({
    fromCity: [],
    toCity: [],
  });
  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: {},
    initialValues: {
      toCountryDevision: undefined,
      fromCountryDevision: undefined,
      fromDestinationCity: undefined,
      fromSourceCity: undefined,
      fromSourceLocation: undefined,
    },
    onSubmit: async (values, { resetForm }) => {},
  });
  const getOptionsData = useCallback(async () => {
    const countryDevision =
      "http://boxi.local:40000/core-api/countryDevision?filter";
    // const province = "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";
    // const city = "http://boxi.local:40000/core-api/countryDevision/city/13/loc?filter=";
    try {
      const res = await axios({
        url: countryDevision,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
      });
      setCountryOptions(res?.data?.payload?.content);
    } catch (error) {}
  }, []);

  const getOptionsCity = useCallback(async () => {
    const province =
      "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";

    try {
      const res = await axios({
        url: province,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
      });
      setCountryOptions(res?.data?.payload?.content);
    } catch (error) {}
  }, []);
  
  const getOptionsZone = useCallback(async () => {
    const province =
      "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";

    try {
      const res = await axios({
        url: province,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
      });
      setCountryOptions(res?.data?.payload?.content);
    } catch (error) {}
  }, []);
  useEffect(() => {
    getOptionsData();
    console.log("loop");
  }, [getOptionsData]);

  useEffect(() => {
    getOptionsCity();
  }, [getOptionsCity]);

  return (
    <>
      <fieldset className="border rounded-xl p-6">
        <legend className="px-3">مبداء</legend>
        <MultiSelect
          wrapperClassName="w-full z-[300]"
          label="استان"
          name="fromCountryDevision"
          handleChange={formik.setFieldValue}
          values={formik.values.fromCountryDevision}
          options={countryOptions}
          error={
            formik.touched.fromCountryDevision &&
            formik.errors.fromCountryDevision
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[200]"
          label="شهر"
          name="fromSourceCity"
          handleChange={formik.setFieldValue}
          values={formik.values.fromSourceCity}
          options={cityOption.fromCity}
          error={formik.touched.fromSourceCity && formik.errors.fromSourceCity}
        />

        <MultiSelect
          wrapperClassName="w-full z-[100]"
          label="منطقه"
          name="fromSourceLocation"
          handleChange={formik.setFieldValue}
          options={[]}
          error={
            formik.touched.fromSourceLocation &&
            formik.errors.fromSourceLocation
          }
        />
      </fieldset>
      <fieldset className="border rounded-xl p-6">
        <legend className="px-3">مقصد</legend>
        <MultiSelect
          wrapperClassName="w-full z-[300]"
          label="استان"
          name="toCountryDevision"
          handleChange={formik.setFieldValue}
          values={formik.values.toCountryDevision}
          options={countryOptions}
          error={
            formik.touched.toCountryDevision && formik.errors.toCountryDevision
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[200]"
          label="شهر"
          name="fromDestinationCity"
          handleChange={formik.setFieldValue}
          values={formik.values.fromDestinationCity}
          options={cityOption.toCity}
          error={
            formik.touched.fromDestinationCity &&
            formik.errors.fromDestinationCity
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[100]"
          label="منطقه"
          name="fromSourceLocation"
          handleChange={formik.setFieldValue}
          values={formik.values.fromSourceLocation}
          options={[]}
          error={
            formik.touched.fromSourceLocation &&
            formik.errors.fromSourceLocation
          }
        />
      </fieldset>
    </>
  );
};

export default Provinces;

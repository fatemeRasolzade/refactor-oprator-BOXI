import axios from "axios";
import React, { FC, useCallback, useEffect, useState } from "react";
import InputSelect from "../../global/InputSelect/InputSelect";
import MultiSelect from "../../global/multiselect/MultiSelect";

interface ProvincesProps {
  form: any;
}
const Provinces: FC<ProvincesProps> = ({ form }): JSX.Element => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [cityOptions, setcityOptions] = useState([]);

  const [cityOption, setCityOption] = useState({
    fromCity: [],
    toCity: [],
  });

  const getOptionsData = useCallback(async () => {
    const countryDevision =
      "http://boxi.local:40000/core-api/countryDevision?filter";
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

  const getOptionsFromCity = useCallback(async () => {
    const province =
      "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";

    try {
      const res = await axios({
        url: province,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
      });
      setCityOption((prev) => {
        return { ...prev, fromCity: res?.data?.payload?.content };
      });
    } catch (error) {}
  }, []);
  const getOptionsToCity = useCallback(async () => {
    const province =
      "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";

    try {
      const res = await axios({
        url: province,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("myToken"),
        },
      });
      setCityOption((prev) => {
        return { ...prev, toCity: res?.data?.payload?.content };
      });
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
    getOptionsFromCity();
    getOptionsToCity();
  }, [getOptionsFromCity, getOptionsToCity]);

  return (
    <>
      <fieldset className="border rounded-xl p-6">
        <legend className="px-3">مبداء</legend>
        <MultiSelect
          wrapperClassName="w-full z-[300] py-4"
          label="استان"
          name="fromCountryDevision"
          handleChange={form.setFieldValue}
          values={form.values.fromCountryDevision}
          options={countryOptions}
          error={
            form.touched.fromCountryDevision && form.errors.fromCountryDevision
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[200] py-4"
          label="شهر"
          name="fromSourceCity"
          handleChange={form.setFieldValue}
          values={form.values.fromSourceCity}
          options={cityOption.fromCity}
          error={form.touched.fromSourceCity && form.errors.fromSourceCity}
        />

        <MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label="منطقه"
          name="fromSourceLocation"
          handleChange={form.setFieldValue}
          options={[]}
          error={
            form.touched.fromSourceLocation && form.errors.fromSourceLocation
          }
        />
      </fieldset>
      <fieldset className="border rounded-xl p-6">
        <legend className="px-3">مقصد</legend>
        <MultiSelect
          wrapperClassName="w-full z-[300] py-4"
          label="استان"
          name="toCountryDevision"
          handleChange={form.setFieldValue}
          values={form.values.toCountryDevision}
          options={countryOptions}
          error={
            form.touched.toCountryDevision && form.errors.toCountryDevision
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[200] py-4"
          label="شهر"
          name="fromDestinationCity"
          handleChange={form.setFieldValue}
          values={form.values.fromDestinationCity}
          options={cityOption.toCity}
          error={
            form.touched.fromDestinationCity && form.errors.fromDestinationCity
          }
        />
        <MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label="منطقه"
          name="fromDestinationLocation"
          handleChange={form.setFieldValue}
          values={form.values.fromDestinationLocation}
          options={[]}
          error={
            form.touched.fromDestinationLocation &&
            form.errors.fromDestinationLocation
          }
        />
      </fieldset>
    </>
  );
};

export default Provinces;

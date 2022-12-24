import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import MultiSelect from "../../global/multiselect/MultiSelect";

interface ProvincesProps {
  form: any;
}
const Provinces: FC<ProvincesProps> = ({ form }): JSX.Element => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [locationOption, setLocationOption] = useState({
    fromLocation: [],
    toLocation: [],
  });

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

  const getOptionsFromCity = useCallback(
    async (data: any, type: "from" | "to") => {
      const province = "http://boxi.local:40000/core-api/countryDevision";

      try {
        const res = await axios({
          method: "POST",
          url: province,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
          data: data,
        });
        if (type === "from") {
          setCityOption((prev) => {
            return { ...prev, fromCity: res?.data?.payload };
          });
        } else {
          setCityOption((prev) => {
            return { ...prev, toCity: res?.data?.payload };
          });
        }
      } catch (error) {}
    },
    []
  );
  const getOptionsFromLocation = useCallback(
    async (data: any, type: "from" | "to") => {
      const province = "http://boxi.local:40000/core-api/countryDevision";

      try {
        const res = await axios({
          method: "POST",
          url: province,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
          data: data,
        });
        if (type === "from") {
          setLocationOption((prev) => {
            return { ...prev, fromLocation: res?.data?.payload };
          });
        } else {
          setLocationOption((prev) => {
            return { ...prev, toLocation: res?.data?.payload };
          });
        }
      } catch (error) {}
    },
    []
  );
  useEffect(() => {
    getOptionsData();
  }, [getOptionsData]);

  return (
    <>
      <fieldset className="border rounded-xl p-6">
        <legend className="px-3">مبداء</legend>
        <MultiSelect
          wrapperClassName="w-full z-[300] py-4"
          label="استان"
          name="fromCountryDevision"
          handleChange={(name: "string", value: any) => {
            getOptionsFromCity(value, "from");
            form.setFieldValue(name, value);
          }}
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
          handleChange={(name: "string", value: any) => {
            getOptionsFromLocation(value, "from");
            form.setFieldValue(name, value);
          }}
          values={form.values.fromSourceCity}
          options={cityOption.fromCity}
          error={form.touched.fromSourceCity && form.errors.fromSourceCity}
        />

        <MultiSelect
          wrapperClassName="w-full z-[100] py-4"
          label="منطقه"
          name="fromSourceLocation"
          handleChange={form.setFieldValue}
          values={form.values.fromSourceLocation}
          options={locationOption.fromLocation}
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
          handleChange={(name: "string", value: any) => {
            getOptionsFromCity(value, "to");
            form.setFieldValue(name, value);
          }}
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
          handleChange={(name: "string", value: any) => {
            getOptionsFromLocation(value, "to");
            form.setFieldValue(name, value);
          }}
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
          options={locationOption.toLocation}
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

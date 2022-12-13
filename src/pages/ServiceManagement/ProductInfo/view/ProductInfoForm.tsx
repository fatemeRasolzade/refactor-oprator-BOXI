import axios from "axios";
import { useFormik } from "formik";
import React, { useCallback, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import * as Yup from "yup";

import InputSelect from "../../../../global/InputSelect/InputSelect";
import InputText from "../../../../global/InputText/InputText";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";

const ProductInfoForm = () => {
  const validation = Yup.object().shape(
    {
      toWeight: Yup.number().min(0),
      fromWeight: Yup.number()
        .min(0)
        .when("toWeight", {
          is: (value: number) => value,
          then: Yup.number().nullable().required(),
        }),
      toDimension: Yup.number().min(0),
      fromDim: Yup.number()
        .min(0)

        .when("toDimension", {
          is: (value: number) => value,
          then: Yup.number().nullable().required(),
        }),
      toValue: Yup.number().min(0),
      fromValue: Yup.number()
        .min(0)
        .when("toValue", {
          is: (value: number) => value,
          then: Yup.number().nullable().required(),
        }),

      product: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      timeCommitment: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      toCountryDevision: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      fromCountryDevision: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      fromDestinationCity: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      fromSourceCity: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
    },
    [
      ["fromSourceCity", "fromDestinationCity"],
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromWeight", "toWeight"],
      ["toDimension", "fromDim"],
      ["fromValue", "toValue"],
    ]
  );
  const [valuesData, setValuesData] = useState({
    product: [],
    timeCommitment: [],
    countryDevision: [],
  });

  const getOptionsData = useCallback(async () => {
    const product = "http://boxi.local:40000/core-api/product/select?filter=";
    const timeCommitment =
      "http://boxi.local:40000/core-api/timecommitment/select?filter=";
    const countryDevision =
      "http://boxi.local:40000/core-api/countryDevision?filter";
    // const province = "http://boxi.local:40000/core-api/countryDevision/province/1/city?filter=";
    // const city = "http://boxi.local:40000/core-api/countryDevision/city/13/loc?filter=";
    try {
      const res = Promise.all([
        await axios({
          url: product,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
        }),
        await axios({
          url: timeCommitment,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
        }),
        await axios({
          url: countryDevision,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("myToken"),
          },
        }),
      ]);
      res.then((response) =>
        setValuesData({
          product: response[0].data?.payload?.content,
          timeCommitment: response[1].data?.payload?.content,
          countryDevision: response[2].data?.payload?.content,
        })
      );
    } catch (error) {}
  }, []);
  const getOptionFromCity = useCallback(async () => {}, []);
  const getOptionToCity = useCallback(async () => {}, []);

  const getOptionFromScope = useCallback(async () => {}, []);
  const getOptionToScope = useCallback(async () => {}, []);

  const saveData = useCallback(async () => {
    try {
    } catch (error) {}
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    validationSchema: validation,
    initialValues: {
      isActive: true,
      totalValue: "",
      totalWight: "",
      fromDim: "",
      toDimension: "",
      fromValue: "",
      toValue: "",
      fromWeight: "",
      toWeight: "",
      usingProduct: [],
      product: undefined,
      timeCommitment: undefined,
      toCountryDevision: undefined,
      fromCountryDevision: undefined,
      fromDestinationCity: undefined,
      fromSourceCity: undefined,
      fromSourceLocation: undefined,
    },
    onSubmit: async (values, { resetForm }) => {},
  });

  useEffect(() => {
    getOptionsData();
    console.log("loop");
  }, [getOptionsData]);

  return (
    <form className=" w-full">
      <div className="grid grid-cols-7 my-6 border rounded-xl gap-6 pt-6 px-6">
        <div className="col-span-2">
          <InputSelect
            important
            wrapperClassName="w-full z-[300]"
            name="product"
            label="محصول"
            values={formik.values.product}
            handleChange={formik.setFieldValue}
            options={valuesData.product}
            error={formik.touched.product && formik.errors.product}
          />
        </div>
        <div className="col-span-2">
          <MultiSelect
            wrapperClassName="w-full z-[300]"
            label="قابل ارائه در محصولات"
            name="usingProduct"
            handleChange={formik.setFieldValue}
            values={formik.values.usingProduct}
            options={valuesData.product}
            error={formik.errors.product}
          />
        </div>
        <div className="col-span-2">
          <InputSelect
            important
            wrapperClassName="w-full"
            name="timeCommitment"
            label="مدت ارائه خدمات"
            values={formik.values.timeCommitment}
            handleChange={formik.setFieldValue}
            options={valuesData.timeCommitment}
            error={
              formik.touched.timeCommitment && formik.errors.timeCommitment
            }
          />
        </div>
        <div className="py-3 col-span-1">
          <CustomSwitch
            active={formik.values.isActive}
            handleChange={(checked: any) =>
              formik.setFieldValue("isActive", checked)
            }
          />
        </div>
      </div>
      <div className="grid grid-cols-5 gap-6">
        <fieldset className="border rounded-xl p-6">
          <legend className="px-3">مبداء</legend>
          <InputSelect
            important
            wrapperClassName="w-full  z-[200]"
            name="fromCountryDevision"
            label="استان"
            values={formik.values.fromCountryDevision}
            handleChange={formik.setFieldValue}
            options={valuesData.countryDevision}
            error={
              formik.touched.fromCountryDevision &&
              formik.errors.fromCountryDevision
            }
          />
          <InputSelect
            important
            wrapperClassName="w-full z-[100]"
            name="fromSourceCity"
            label="شهر"
            values={formik.values.fromSourceCity}
            handleChange={formik.setFieldValue}
            options={[]}
            error={
              formik.touched.fromSourceCity && formik.errors.fromSourceCity
            }
          />
          <InputSelect
            important
            wrapperClassName="w-full"
            name="fromSourceLocation"
            label="منطقه"
            values={formik.values.fromSourceLocation}
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
          <InputSelect
            important
            wrapperClassName="w-full  z-[200]"
            name="toCountryDevision"
            label="استان"
            values={formik.values.toCountryDevision}
            handleChange={formik.setFieldValue}
            options={valuesData.countryDevision}
            error={
              formik.touched.toCountryDevision &&
              formik.errors.toCountryDevision
            }
          />
          <InputSelect
            important
            wrapperClassName="w-full z-[100]"
            name="fromDestinationCity"
            label="شهر"
            values={formik.values.fromDestinationCity}
            handleChange={formik.setFieldValue}
            options={[]}
            error={
              formik.touched.fromDestinationCity &&
              formik.errors.fromDestinationCity
            }
          />
          <InputSelect
            important
            wrapperClassName="w-full"
            name="fromSourceLocation"
            label="منطقه"
            values={formik.values.fromSourceLocation}
            handleChange={formik.setFieldValue}
            options={[]}
            error={
              formik.touched.fromSourceLocation &&
              formik.errors.fromSourceLocation
            }
          />
        </fieldset>
        <fieldset className="border rounded-xl p-6">
          <legend className="px-3">وزن کیلو گرم</legend>
          <InputText
            wrapperClassName="w-full"
            important
            label="از"
            values={formik.values.fromWeight}
            name="fromWeight"
            handleChange={formik.handleChange}
            error={formik.touched.fromWeight && formik.errors.fromWeight}
          />
          <InputText
            wrapperClassName="w-full"
            important
            label="تا"
            values={formik.values.toWeight}
            name="toWeight"
            handleChange={formik.handleChange}
            error={formik.touched.toWeight && formik.errors.toWeight}
          />
        </fieldset>
        <fieldset className="border rounded-xl p-6">
          <legend className="px-3">ابعاد (سانتی متر)</legend>
          <InputText
            wrapperClassName="w-full"
            important
            label="از"
            values={formik.values.fromDim}
            name="fromDim"
            handleChange={formik.handleChange}
            error={formik.touched.fromDim && formik.errors.fromDim}
          />
          <InputText
            wrapperClassName="w-full"
            important
            label="تا"
            values={formik.values.toDimension}
            name="toDimension"
            handleChange={formik.handleChange}
            error={formik.touched.toDimension && formik.errors.toDimension}
          />
        </fieldset>
        <fieldset className="border rounded-xl p-6">
          <legend className="px-3">ارزش (ریال)</legend>
          <InputText
            wrapperClassName="w-full"
            important
            label="از"
            values={formik.values.fromValue}
            name="fromValue"
            handleChange={formik.handleChange}
            error={formik.touched.fromValue && formik.errors.fromValue}
          />
          <InputText
            wrapperClassName="w-full"
            important
            label="تا"
            values={formik.values.toValue}
            name="toValue"
            handleChange={formik.handleChange}
            error={formik.touched.toValue && formik.errors.toValue}
          />
        </fieldset>
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

export default ProductInfoForm;

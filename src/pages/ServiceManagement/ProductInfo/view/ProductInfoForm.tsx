import axios from "axios";
import { useFormik } from "formik";
import React, { FC, useCallback, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";

import Provinces from "../../../../components/provinces/Provinces";
import InputSelect from "../../../../global/InputSelect/InputSelect";
import InputText from "../../../../global/InputText/InputText";
import MultiSelect from "../../../../global/multiselect/MultiSelect";
import SimpleButton from "../../../../global/SimpleButton/SimpleButton";
import CustomSwitch from "../../../../global/Switch/Switch";

interface ProductInfoFormProps {
  tableList: any;
  setTableList: (values: any) => void;
}
const ProductInfoForm: FC<ProductInfoFormProps> = ({
  tableList,
  setTableList,
}): JSX.Element => {
  const validation = Yup.object().shape(
    {
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
      fromCountryDevision: Yup.array().required(),
      toCountryDevision: Yup.array().required(),
      usingProduct: Yup.array().required(),
      timeCommitment: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      product: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      toWeight: Yup.number().min(0),
      fromWeight: Yup.number()
        .min(0)
        .when("toWeight", (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.number().nullable().required();
          } else {
            return Yup.number().notRequired();
          }
        }),
      fromDim: Yup.number()
        .min(0)
        .when("toDimension", (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.number().nullable().required();
          } else {
            return Yup.number().notRequired();
          }
        }),
      toDimension: Yup.number().min(0),
      fromValue: Yup.number()
        .min(0)
        // .ensure()
        .when("toValue", (val: any, schema: any) => {
          if (val?.length > 0) {
            return Yup.number().nullable().required();
          } else {
            return Yup.number().notRequired();
          }
        }),
      toValue: Yup.number().min(0),
    },
    [
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromSourceCity", "fromDestinationCity"],
      ["fromWeight", "toWeight"],
      ["toDimension", "fromDim"],
      ["fromValue", "toValue"],
    ]
  );
  const [valuesData, setValuesData] = useState({
    product: [],
    timeCommitment: [],
  });

  const [cityOption, setCityOption] = useState({
    fromCity: [],
    toCity: [],
  });

  const getOptionsData = useCallback(async () => {
    const product = "http://boxi.local:40000/core-api/product/select?filter=";
    const timeCommitment =
      "http://boxi.local:40000/core-api/timecommitment/select?filter=";
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
      ]);
      res.then((response) =>
        setValuesData({
          product: response[0].data?.payload?.content,
          timeCommitment: response[1].data?.payload?.content,
        })
      );
    } catch (error) {}
  }, []);

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
      usingProduct: "",
      product: undefined,
      timeCommitment: undefined,
      fromCountryDevision: "",
      toCountryDevision: "",
      fromDestinationCity: "",
      fromSourceCity: "",
      fromSourceLocation: "",
      fromDestinationLocation: "",
    },
    validate: (values) => {
      let errors: any = {};

      const [isValidDigit, errDigit] = DigitCompare(
        values.fromWeight,
        values.toWeight
      );
      const [isValidValue, errValue] = ValueCompare(
        values.fromValue,
        values.toValue
      );
      const [isValidDim, errDim] = dimCompare(
        values.fromDim,
        values.toDimension
      );

      if (!isValidValue) {
        errors["fromValue"] = errValue;
      }
      if (!isValidDigit) {
        errors.fromWeight = errDigit;
      }
      if (!isValidDim) {
        errors.fromDim = errDim;
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("values table", values);
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
      console.log("attributeDivition", attributeDivition);

      const data = {
        ...values,
        attributeDivition: attributeDivition ? attributeDivition : [],
        usingProduct: convertUsingProduct(values.usingProduct, values.product),
      };
      console.log("data", data);

      setTableList(data);
      resetForm();
    },
  });

  useEffect(() => {
    getOptionsData();
    console.log("loop");
  }, [getOptionsData]);
  console.log("tableList", formik.values.product);

  return (
    <form className=" w-full" onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-7 my-6 border rounded-xl gap-6 pt-6 px-6">
        <div className="col-span-2">
          <InputSelect
            important
            wrapperClassName="w-full"
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
            wrapperClassName="w-full z-[600]"
            label="قابل ارائه در محصولات"
            name="usingProduct"
            handleChange={formik.setFieldValue}
            values={formik.values.usingProduct}
            options={valuesData.product}
            error={formik.touched.usingProduct && formik.errors.usingProduct}
          />
        </div>
        <div className="col-span-2">
          <InputSelect
            important
            wrapperClassName="w-full "
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
        <Provinces form={formik} />
        <fieldset className="border rounded-xl p-6">
          <legend className="px-3">وزن کیلو گرم</legend>
          <InputText
            wrapperClassName="w-full  py-4"
            important
            label="از"
            values={formik.values.fromWeight}
            name="fromWeight"
            handleChange={formik.handleChange}
            error={formik.touched.fromWeight && formik.errors.fromWeight}
          />
          <InputText
            wrapperClassName="w-full py-4"
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
            wrapperClassName="w-full  py-4"
            important
            label="از"
            values={formik.values.fromDim}
            name="fromDim"
            handleChange={formik.handleChange}
            error={formik.touched.fromDim && formik.errors.fromDim}
          />
          <InputText
            wrapperClassName="w-full  py-4"
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
            wrapperClassName="w-full  py-4"
            important
            label="از"
            values={formik.values.fromValue}
            name="fromValue"
            handleChange={formik.handleChange}
            error={formik.touched.fromValue && formik.errors.fromValue}
          />
          <InputText
            wrapperClassName="w-full  py-4"
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

const dimCompare = (digit1: string, digit2: string) => {
  let isValidDim = false;
  let errDim;
  if (digit1 === "" || digit2 === "") {
    isValidDim = true;
  }
  if (Number(digit1) > Number(digit2)) {
    errDim = "عدد اول بزرگ تر از عدد دوم است";
  }

  if (!errDim) {
    isValidDim = true;
  }
  return [isValidDim, errDim];
};
export const DigitCompare = (digit1: string, digit2: string) => {
  let isValidDigit = false;
  let errDigit;
  if (digit1 === "" || digit2 === "") {
    isValidDigit = true;
  }
  if (Number(digit1) > Number(digit2)) {
    errDigit = "عدد اول بزرگ تر از عدد دوم است";
  }

  if (!errDigit) {
    isValidDigit = true;
  }
  return [isValidDigit, errDigit];
};

export const ValueCompare = (digit1: string, digit2: string) => {
  let isValidValue = false;
  let errValue;
  if (digit1 === "" || digit2 === "") {
    isValidValue = true;
  }
  if (Number(digit1) > Number(digit2)) {
    errValue = "عدد اول بزرگ تر از عدد دوم است";
  }

  if (!errValue) {
    isValidValue = true;
  }
  return [isValidValue, errValue];
};
const convertToObjects = (from: any, to: any, type: any) => {
  let arr = [];
  for (let i = 0; i < from.length; i++) {
    for (let j = 0; j < to.length; j++) {
      arr.push({ fromCountryDevision: from[i], toCountryDevision: to[j] });
    }
  }
  return arr;
};
const convertUsingProduct = (usingProduct: any, product: any) => {
  let arr = [];
  for (let x of usingProduct) {
    arr.push({
      parent: product,
      child: x,
    });
  }
  return arr;
};

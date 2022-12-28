import * as Yup from "yup";

export const PriceAttributeFormValidation = () =>
  Yup.object().shape(
    {
      product: Yup.object().shape({
        text: Yup.string().required(),
        id: Yup.string().required(),
      }),
      consignmentType: Yup.string()
        .ensure()
        .when("isParametric", (val: any, schema: any) => {
          if (val === false) {
            return Yup.object().required();
          } else {
            return Yup.string().nullable(true);
          }
        }),
      isParametric: Yup.boolean(),
      fromCountryDevision: Yup.string()
        .ensure()
        .when("classification", (val: any, schema: any) => {
          if (val.id === 2) {
            return Yup.array().required();
          } else {
            return Yup.string().nullable(true);
          }
        }),
      toCountryDevision: Yup.string()
        .ensure()
        .when("classification", (val: any, schema: any) => {
          if (val.id === 2) {
            return Yup.array().required();
          } else {
            return Yup.string().nullable(true);
          }
        }),

      fromSourceCity: Yup.array().when("fromDestinationCity", (val: any, schema: any) => {
        if (val?.length > 0) {
          return Yup.array().required();
        } else {
          return Yup.array().notRequired();
        }
      }),
      fromDestinationCity: Yup.array().when("fromSourceCity", (val: any, schema: any) => {
        if (val?.length > 0) {
          return Yup.array().required();
        } else {
          return Yup.array().notRequired();
        }
      }),
      fromDestinationLocation: Yup.array().when("fromSourceLocation", (val: any, schema: any) => {
        if (val?.length > 0) {
          return Yup.array().required();
        } else {
          return Yup.array().notRequired();
        }
      }),
      fromSourceLocation: Yup.array().when("fromDestinationLocation", (val: any, schema: any) => {
        if (val) {
          return Yup.array().required();
        } else {
          return Yup.array().notRequired();
        }
      }),
      price: Yup.number()
        .min(0)
        .when("fixedPrice", {
          is: false,
          then: Yup.number().nullable(true).default(null).required(),
        }),
      fromWeight: Yup.number().min(0),
      toWeight: Yup.number().min(0),
      fromValue: Yup.number().min(0),
      toValue: Yup.number().min(0),
      fromNumber: Yup.number().min(0),
      toNumber: Yup.number().min(0),
    },
    [
      ["fromSourceCity", "fromDestinationCity"],
      ["fromSourceLocation", "fromDestinationLocation"],
      ["fromWeight", "isParametric"],
      ["toWeight", "isParametric"],
      ["fromNumber", "isParametric"],
      ["toNumber", "isParametric"],
      ["isParametric", "toValue"],
      ["isParametric", "fromValue"],
      ["price", "fixedPrice"],
    ]
  );

export const PriceAttributeFormInitialValues = {
  product: "",
  priceFormule: "",
  price: "",
  fixedPrice: false,
  isParametric: true,
  fromWeight: "",
  toWeight: "",
  fromDim: "",
  toDimension: "",
  fromValue: "",
  toValue: "",
  fromNumber: "",
  toNumber: "",
  consignmentType: undefined,
  priceList: null,
  customDevision: null,
  isActive: true,
  fromCountryDevision: "",
  toCountryDevision: "",
  fromDestinationCity: "",
  fromSourceCity: "",
  fromSourceLocation: "",
  fromDestinationLocation: "",
  priceDetailDevisions: [],
  classification: { id: "", text: "" },
  totalWight: { from: "", to: "" },
  totalDim: { from: "", to: "" },
  totalValue: { from: "", to: "" },
  totalNumber: { from: "", to: "" },
};
